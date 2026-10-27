import { createSlice } from "@reduxjs/toolkit";
import { seedBuyers } from "../../data/seedData";

const buyersSlice = createSlice({
  name: "buyers",
  initialState: seedBuyers,

  reducers: {
    addBuyer: (state, action) => {
      state.push({
        ...action.payload,
        id: Date.now(),
      });
    },

    updateBuyer: (state, action) => {
      const { id, data } = action.payload;

      const index = state.findIndex(
        (buyer) => buyer.id === id
      );

      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...data,
        };
      }
    },

    removeBuyer: (state, action) => {
      return state.filter(
        (buyer) => buyer.id !== action.payload
      );
    },
  },
});

export const {
  addBuyer,
  updateBuyer,
  removeBuyer,
} = buyersSlice.actions;

export default buyersSlice.reducer;