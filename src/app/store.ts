import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import normalTextReducer from "../features/splitList/splitListSlice"
import splitedTextReducer from "../features/splitList/splitListSlice"

export const store = configureStore({
  reducer: {
    counterStore: counterReducer,
    normalTextStore: normalTextReducer,
    splitedTextStore: splitedTextReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
