import { createSlice } from "@reduxjs/toolkit";

import { readStorage } from "../../api/storageApi";

const savedSession = readStorage(
  "agri_session",
  null
);

const initialState = savedSession || {
  user: null,
  role: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  login,
  logout,
} = authSlice.actions;

export default authSlice.reducer;