import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isWatchingHistory: false,
	moveHistory: [],
	historyID: null,
	winnerID: null,
	winLine: [],
	xPlayer: null,
	oPlayer: null,
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
		setWinnerID: (state, action) => {
			state.winnerID = action.payload;
		},
		setWinLine: (state, action) => {
			state.winLine = action.payload;
		},
		setXPlayer: (state, action) => {
			state.xPlayer = action.payload;
		},
		setOPlayer: (state, action) => {
			state.oPlayer = action.payload;
		},
		resetHistory: (state, action) => initialState,
  },
});

const { reducer, actions } = historySlice;
export const {
  setIsWatchingHistory,
	setMoveHistory,
	setIdHistory,
	resetHistory,
	setWinnerID,
	setWinLine,
	setXPlayer,
	setOPlayer,
} = actions;
export default reducer;