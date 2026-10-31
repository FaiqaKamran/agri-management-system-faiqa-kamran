import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const maintenanceSlice = createSlice({
  name: "maintenance",

  initialState,

  reducers: {
    setMaintenance: (state, action) => {
      return Array.isArray(action.payload)
        ? action.payload
        : [];
    },

    addMaintenance: (state, action) => {
      state.push({
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      });
    },

    updateMaintenance: (
      state,
      action
    ) => {
      const { id, data } = action.payload;

      const index = state.findIndex(
        (item) =>
          Number(item.id) ===
          Number(id)
      );

      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...data,
        };
      }
    },

    removeMaintenance: (
      state,
      action
    ) => {
      return state.filter(
        (item) =>
          Number(item.id) !==
          Number(action.payload)
      );
    },
  },
});

export const {
  setMaintenance,
  addMaintenance,
  updateMaintenance,
  removeMaintenance,
} = maintenanceSlice.actions;

export default maintenanceSlice.reducer;