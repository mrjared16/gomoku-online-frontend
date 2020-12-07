import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    setNotification: (state, action) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    removeNotification: (state, action) => {
      state.type = "";
      state.message = "";
    },
  },
});

const { reducer, actions } = notificationSlice;
export const { setNotification, removeNotification } = actions;
export default reducer;