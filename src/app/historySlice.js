import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isWatchingHistory: false,
	moveHistory: [],
	historyID: null,
};

const historySlice = createSlice({
  name: "room",
  initialState: initialState,
  reducers: {
    setIsWatchingHistory: (state, action) => {
			state.isWatchingHistory = action.payload;
    },
    setMoveHistory: (state, action) => {
			state.moveHistory = action.payload;
		},
		setIdHistory: (state, action) => {
			state.historyID = action.payload;
    },
  },
});

const { reducer, actions } = historySlice;
export const {
  setIsWatchingHistory,
	setMoveHistory,
	setIdHistory,
} = actions;
export default reducer;