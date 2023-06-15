import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../app/store"

export interface NormalTextState {
   value: string
}

export interface SplitTextState {
   value: {}
}

const initialTextState : NormalTextState = {
   value: ""
}

const  initialSplitText : SplitTextState = {
   value: [{ id: 1, code: 'Temp' }]
}

interface RowsInterface {
   id: number,
   code: string
}
/////////////////////////////////////////////////////////////////////////////////////////////

export const getGeneID = () => {
   const url = "http://cellbase.clinbioinfosspa.es/cellbase-4.6.3/webservices/rest/v4/hsapiens/feature/gene/search?assembly=grch37&limit=-1&skip=-1&skipCount=false&count=false&Output%20format=json&name=BRCA2"
   const petition = fetch(url)

   petition
      .then((data) => data.json())
      .then((reading) => {
         console.log(reading.value)
      })
      .catch()
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

// export const incrementAsync = createAsyncThunk(
//    "counter/fetchCount",
//    async (amount: number) => {
//       const response = await fetchCount(amount)
//      // The value we return becomes the `fulfilled` action payload
//       return response.data
//    },
//    )

//    const [joke, setJoke] = useState("There's still no jokes");

//    function nextjoke() {
//       const url = "https://api.chucknorris.io/jokes/random/";
//       const peticion = fetch(url);

//       peticion
//       .then((datos) => datos.json())
//       .then((lectura) => {
//          setJoke(lectura.value)
//       })
//       .catch(console.log("Error"));
//    }

//    useEffect(() => {
//       nextjoke();
//    }, []);

//    return (
//       <>
//       <div>{joke}</div>
//       <button onClick={nextjoke} value="Next Joke!">
//          Next joke!
//       </button>
//       </>
//    )

 /////////////////////////////////////////////////////////////////////////////////////////////
export const normalTextSlice = createSlice({
   name: "normalTextSlice",
   initialState: initialTextState,
   reducers: {
      writeText: (state, action: PayloadAction<string>) => {
         state.value = action.payload
      }
   }
})

export const splitedTextSlice = createSlice({
   name: "splitedTextSlice",
   initialState: initialSplitText,
   reducers: {
      split: (state, action: PayloadAction<string>) => {
         let trimmedPayload = action.payload.replace(/[" "!;:,.\s\t\n_]+$/, '');
         let duplicatedArray = trimmedPayload.split(/[" "!;:,.\s\t\n_]+/)
         let tempArray = duplicatedArray.filter((e, i) => {
            return duplicatedArray.indexOf(e) === i
         })
         let rowsArray: RowsInterface[] = tempArray.map((e, indice) => {
            return {id: indice, code:e};
         })
         state.value = rowsArray;
      }
   }
})

export const { writeText } = normalTextSlice.actions
export const { split } = splitedTextSlice.actions

//Selectors
export const selectNormalText = (state: RootState) => state.normalTextStore.normalTextReducer.value
export const selectSplitedText = (state: RootState) => state.splitedTextStore.splitedTextReducer.value

export default combineReducers({
   normalTextReducer: normalTextSlice.reducer, 
   splitedTextReducer: splitedTextSlice.reducer
})