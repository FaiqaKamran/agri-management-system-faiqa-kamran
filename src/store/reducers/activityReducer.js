import { createSlice } from "@reduxjs/toolkit";

const activitySlice = createSlice({
  name: "activity",

  initialState: [],

  reducers: {
    addActivity: (state, action) => {
      state.unshift({
        ...action.payload,
        id: Date.now(),
        timestamp: new Date().toISOString(),
      });
    },

    clearActivity: () => {
      return [];
    },
  },
});

export const { addActivity, clearActivity } = activitySlice.actions;

export default activitySlice.reducer;