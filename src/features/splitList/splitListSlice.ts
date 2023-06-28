import { combineReducers, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface NormalTextState {
	value: string
}
export interface SplitTextState {
	value: string[]
}
const initialTextState: NormalTextState = {
	value: "",
}
const initialSplitText: SplitTextState = {
	value: [""],
}

export const normalTextSlice = createSlice({
	name: "normalTextSlice",
	initialState: initialTextState,
	reducers: {
		writeText: (state, action: PayloadAction<string>) => {
			state.value = action.payload
		},
	},
})

export const splitedTextSlice = createSlice({
	name: "splitedTextSlice",
	initialState: initialSplitText,
	reducers: {
		split: (state, action: PayloadAction<any>) => {
			state.value = action.payload
		},
	},
})

export const { writeText } = normalTextSlice.actions
export const { split } = splitedTextSlice.actions

//Selectors
export const selectNormalText = (state: RootState) =>
	state.normalTextStore.normalTextReducer.value
export const selectSplitedText = (state: RootState) =>
	state.splitedTextStore.splitedTextReducer.value

export default combineReducers({
	normalTextReducer: normalTextSlice.reducer,
	splitedTextReducer: splitedTextSlice.reducer,
})
