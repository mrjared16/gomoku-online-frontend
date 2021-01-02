import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentRoomID: localStorage.getItem('currentRoomID'),
};

const roomSlice = createSlice({
  name: "room",
  initialState: initialState,
  reducers: {
    setRoomID: (state, action) => {
			state.currentRoomID = action.payload;
			localStorage.setItem('currentRoomID', action.payload);
    },
    removeRoomID: (state, action) => {
			state.currentRoomID = null;
			localStorage.removeItem('currentRoomID');
			
    },
  },
});

const { reducer, actions } = roomSlice;
export const {
  setRoomID,
  removeRoomID,
} = actions;
export default reducer;