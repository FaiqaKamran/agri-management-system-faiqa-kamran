import { createSlice } from "@reduxjs/toolkit";

const alertsSlice = createSlice({
  name: "alerts",

  initialState: [],

  reducers: {
    setAlerts: (state, action) => {
      return action.payload;
    },

    clearAlerts: () => {
      return [];
    },
  },
});

export const {
  setAlerts,
  clearAlerts,
} = alertsSlice.actions;

export default alertsSlice.reducer;