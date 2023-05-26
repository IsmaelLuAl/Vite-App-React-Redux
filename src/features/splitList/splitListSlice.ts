import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../app/store"

export interface NormalTextState {
   value: string
}

export interface SplitTextState {
   value: []
}

const initialTextState : NormalTextState = {
   value: ""
}

const  initialSplitText : SplitTextState = {
   value: []
}

export const normalTextSlice = createSlice({
   name: "normalText",
   initialState: initialTextState,
   reducers: {
      writeText: (state, action: PayloadAction<string>) => {
         state.value = action.payload
      },
   }
})

// export const splitedTextSlice = createSlice({
//    name: "splitedText",
//    initial
// })

export const { writeText } = normalTextSlice.actions

//Selectors
export const selectNormalText = (state: RootState) => state.normalText.value

export default normalTextSlice.reducer