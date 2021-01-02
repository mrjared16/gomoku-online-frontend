import { configureStore } from "@reduxjs/toolkit";
import userReducer from "app/userSlice";
import roomReducer from "app/roomSlice";

const rootReducer = {
	user: userReducer,
	room: roomReducer,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
