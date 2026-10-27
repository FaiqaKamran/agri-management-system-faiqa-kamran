import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",

  initialState: {
    darkMode: false,
    sidebarOpen: true,
    toast: null,
  },

  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },

    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },

    showToast: (state, action) => {
      state.toast = action.payload;
    },

    clearToast: (state) => {
      state.toast = null;
    },
  },
});

export const {
  toggleDarkMode,
  setSidebarOpen,
  showToast,
  clearToast,
} = uiSlice.actions;

export default uiSlice.reducer;