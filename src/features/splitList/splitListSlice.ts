import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../app/store"

export interface SplitedTextState {
   value: string
}

const initialState : SplitedTextState = {
   value: ""
}

export const splitedTextSlice = createSlice({
   name: "splitText",
   initialState,
   reducers: {
      split: (state, action: PayloadAction<string>) => {
         state.value = action.payload
         console.log(state.value)
         console.log(action.payload)
         
      }
   }
})

export const { split } = splitedTextSlice.actions

export const selectSplitedText = (state: RootState) => state.textSplit.value

export default splitedTextSlice.reducer