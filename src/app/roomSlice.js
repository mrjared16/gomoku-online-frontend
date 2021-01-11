import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentRoomID: null,
	passwordRoom: localStorage.getItem('passwordRoom'),
	roomIDCreated: localStorage.getItem('roomIDCreated'),
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
		setPasswordRoom: (state, action) => {
			state.passwordRoom = action.payload;
			localStorage.setItem('passwordRoom', action.payload);
		},
		removePasswordRoom: (state, action) => {
			state.passwordRoom = null;
			localStorage.removeItem('passwordRoom');
		},
		setRoomIDCreated: (state, action) => {
			state.roomIDCreated = action.payload;
			localStorage.setItem('roomIDCreated', action.payload);
		}
  },
});

const { reducer, actions } = roomSlice;
export const {
  setRoomID,
	removeRoomID,
	setPasswordRoom,
	removePasswordRoom,
	setRoomIDCreated,
} = actions;
export default reducer;