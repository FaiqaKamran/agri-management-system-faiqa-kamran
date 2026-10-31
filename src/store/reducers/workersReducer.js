import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const workersSlice = createSlice({
  name: "workers",

  initialState,

  reducers: {
    setWorkers: (state, action) => {
      return Array.isArray(action.payload)
        ? action.payload
        : [];
    },

    addWorker: (state, action) => {
      state.push({
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    },

    updateWorker: (state, action) => {
      const { id, data } = action.payload;

      const index = state.findIndex(
        (worker) =>
          Number(worker.id) === Number(id)
      );

      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...data,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    removeWorker: (state, action) => {
      return state.filter(
        (worker) =>
          Number(worker.id) !==
          Number(action.payload)
      );
    },
  },
});

export const {
  setWorkers,
  addWorker,
  updateWorker,
  removeWorker,
} = workersSlice.actions;

export default workersSlice.reducer;