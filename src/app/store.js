import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'app/userSlice';
import roomReducer from 'app/roomSlice';
import historyReducer from 'app/historySlice';
import darkModeReducer from 'app/darkModeSlice';

const rootReducer = {
  user: userReducer,
  room: roomReducer,
  history: historyReducer,
  darkMode: darkModeReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
