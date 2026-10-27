import { createSlice } from "@reduxjs/toolkit";
import { seedOrders } from "../../data/seedData";

const ordersSlice = createSlice({
  name: "orders",
  initialState: seedOrders,

  reducers: {
    addOrder: (state, action) => {
      state.push({
        ...action.payload,
        id: Date.now(),
      });
    },

    updateOrder: (state, action) => {
      const { id, data } = action.payload;

      const index = state.findIndex(
        (order) => order.id === id
      );

      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...data,
        };
      }
    },

    removeOrder: (state, action) => {
      return state.filter(
        (order) => order.id !== action.payload
      );
    },
  },
});

export const {
  addOrder,
  updateOrder,
  removeOrder,
} = ordersSlice.actions;

export default ordersSlice.reducer;