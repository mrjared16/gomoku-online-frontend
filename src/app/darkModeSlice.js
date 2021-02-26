import { createSlice } from '@reduxjs/toolkit';

const darkModeLocal = localStorage.getItem('darkMode');
const darkModeParse = darkModeLocal ? JSON.parse(darkModeLocal) : false;

const initialState = {
  darkMode: darkModeParse,
};

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      localStorage.setItem('darkMode', action.payload);
    },
  },
});

const { reducer, actions } = darkModeSlice;
export const { setDarkMode } = actions;
export default reducer;
