import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const equipmentSlice = createSlice({
  name: "equipment",

  initialState,

  reducers: {
    setEquipment: (state, action) => {
      return Array.isArray(action.payload)
        ? action.payload
        : [];
    },

    addEquipment: (state, action) => {
      state.push({
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    },

    updateEquipment: (state, action) => {
      const { id, data } = action.payload;

      const index = state.findIndex(
        (equipment) =>
          Number(equipment.id) ===
          Number(id)
      );

      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...data,
          updatedAt:
            new Date().toISOString(),
        };
      }
    },

    removeEquipment: (state, action) => {
      return state.filter(
        (equipment) =>
          Number(equipment.id) !==
          Number(action.payload)
      );
    },

    updateLastServiceDate: (
      state,
      action
    ) => {
      const {
        equipmentId,
        lastServiceDate,
      } = action.payload;

      const equipment = state.find(
        (item) =>
          Number(item.id) ===
          Number(equipmentId)
      );

      if (equipment) {
        equipment.lastServiceDate =
          lastServiceDate;

        equipment.updatedAt =
          new Date().toISOString();
      }
    },
  },
});

export const {
  setEquipment,
  addEquipment,
  updateEquipment,
  removeEquipment,
  updateLastServiceDate,
} = equipmentSlice.actions;

export default equipmentSlice.reducer;