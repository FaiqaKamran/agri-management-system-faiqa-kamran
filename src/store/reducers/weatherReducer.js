import { createSlice } from "@reduxjs/toolkit";
import { fetchWeather } from "../thunks/fetchWeather";

const initialState = {
  data: null,
  status: "idle",
  error: null,
  lastUpdated: null,
};

const weatherSlice = createSlice({
  name: "weather",

  initialState,

  reducers: {
    clearWeather: (state) => {
      state.data = null;
      state.status = "idle";
      state.error = null;
      state.lastUpdated = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(
        fetchWeather.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.data = action.payload;
          state.lastUpdated = new Date().toISOString();
        }
      )

      .addCase(
        fetchWeather.rejected,
        (state, action) => {
          state.status = "failed";
          state.error =
            action.payload || "Unable to load weather.";
        }
      );
  },
});

export const {
  clearWeather,
} = weatherSlice.actions;

export default weatherSlice.reducer;