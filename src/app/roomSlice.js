import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentRoomID: null,
	isHost: false,
};

const roomSlice = createSlice({
  name: "room",
  initialState: initialState,
  reducers: {
    setRoomID: (state, action) => {
			state.currentRoomID = action.payload;
    },
    removeRoomID: (state, action) => {
			state.currentRoomID = null;
		},
		setIsHost: (state, action) => {
			state.isHost = action.payload;
		},
  },
});

const { reducer, actions } = roomSlice;
export const {
  setRoomID,
	removeRoomID,
	setIsHost,
} = actions;
export default reducer;