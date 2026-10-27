import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getLahoreWeather,
} from "../../api/weatherApi";

const fallbackWeather = {
  current: {
    temperature_2m: 28,
    relative_humidity_2m: 55,
    wind_speed_10m: 12,
    rain: 0,
  },

  daily: {
    time: [
      "2026-10-27",
      "2026-10-28",
      "2026-10-29",
      "2026-10-30",
      "2026-10-31",
    ],

    temperature_2m_max: [
      30,
      31,
      29,
      30,
      32,
    ],

    temperature_2m_min: [
      20,
      21,
      19,
      20,
      21,
    ],

    weather_code: [
      1,
      2,
      3,
      1,
      0,
    ],
  },
};

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",

  async (_, { rejectWithValue }) => {
    try {
      const data = await getLahoreWeather();

      return {
        ...data,
        source: "Open-Meteo",
      };
    } catch (error) {
      console.error(
        "Weather API failed:",
        error
      );

      return {
        ...fallbackWeather,
        source: "Demo Fallback",
      };
    }
  }
);