import { createSlice } from "@reduxjs/toolkit";
import { seedCrops } from "../../data/seedData";

const initialState = seedCrops;

const cropsSlice = createSlice({
  name: "crops",
  initialState,
  reducers: {
    addCrop: (state, action) => {
      state.push({
        ...action.payload,
        id: Date.now(),
        soldQty: 0,
      });
    },

    updateCrop: (state, action) => {
      const { id, data } = action.payload;

      const index = state.findIndex(
        (crop) => crop.id === id
      );

      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...data,
        };
      }
    },

    removeCrop: (state, action) => {
      return state.filter(
        (crop) => crop.id !== action.payload
      );
    },

    updateSoldQuantity: (state, action) => {
      const { cropId, quantity } = action.payload;

      const crop = state.find(
        (item) => item.id === Number(cropId)
      );

      if (crop) {
        crop.soldQty =
          Number(crop.soldQty || 0) +
          Number(quantity || 0);
      }
    },
  },
});

export const {
  addCrop,
  updateCrop,
  removeCrop,
  updateSoldQuantity,
} = cropsSlice.actions;

export default cropsSlice.reducer;