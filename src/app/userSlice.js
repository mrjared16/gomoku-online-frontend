import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
  token: cookies.get("token", { path: "/" }),
  currentUserInfo: {}
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      cookies.set("token", action.payload, { path: "/" });
    },
    removeToken: (state, action) => {
      state.token = "";
      cookies.remove("token", { path: "/" });
    },
    setUser: (state, action) => {
      state.currentUserInfo = action.payload;
    }
  },
});

const { reducer, actions } = userSlice;
export const {
  setToken,
  removeToken,
  setUser
} = actions;
export default reducer;