import { configureStore } from "@reduxjs/toolkit";
import userReducer from "app/userSlice";
import roomReducer from "app/roomSlice";
import historyReducer from "app/historySlice";

const rootReducer = {
	user: userReducer,
	room: roomReducer,
	history: historyReducer,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
