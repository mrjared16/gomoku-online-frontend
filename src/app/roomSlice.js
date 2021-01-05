import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentRoomID: null,
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
  },
});

const { reducer, actions } = roomSlice;
export const {
  setRoomID,
  removeRoomID,
} = actions;
export default reducer;