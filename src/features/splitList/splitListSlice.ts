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

// const rowsArray = any[]
// const rowsArray = new Array<{}>()

interface RowsInterface {
   id: number,
   code: string
}

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
         //Cortar el texto en partes y incluirlas en un array
         let tempArray = action.payload.split(/[" "!;:,.\s\t\n_]+/)
         let rowsArray: RowsInterface[] = []
         tempArray.map((e, indice) => {
            // rowsArray.push({id: indice, code:e})
            rowsArray = [...rowsArray, {id: indice, code:e}];         
         })
         state.value = rowsArray
      }
   }
})

export const { writeText } = normalTextSlice.actions
export const { split } = splitedTextSlice.actions

//Selectors
export const selectNormalText = (state: RootState) => state.normalTextStore.normalTextReducer.value
export const selectSplitedText = (state: RootState) => state.splitedTextStore.splitedTextReducer.value

// export default normalTextSlice.reducer

export default combineReducers({
   normalTextReducer: normalTextSlice.reducer, 
   splitedTextReducer: splitedTextSlice.reducer
})