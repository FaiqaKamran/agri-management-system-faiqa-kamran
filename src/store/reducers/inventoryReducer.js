import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const inventorySlice = createSlice({
  name: "inventory",

  initialState,

  reducers: {
    addInventoryItem: (state, action) => {
      state.push({
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        usageHistory: [],
      });
    },

    updateInventoryItem: (state, action) => {
      const { id, data } = action.payload;

      const index = state.findIndex(
        (item) => item.id === id
      );

      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...data,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    removeInventoryItem: (state, action) => {
      return state.filter(
        (item) => item.id !== action.payload
      );
    },

    updateInventoryQuantity: (state, action) => {
      const {
        id,
        quantity,
        type = "usage",
      } = action.payload;

      const item = state.find(
        (inventoryItem) => inventoryItem.id === id
      );

      if (!item) return;

      const oldQuantity = Number(item.quantity || 0);
      const newQuantity = Number(quantity);

      item.quantity = newQuantity;
      item.updatedAt = new Date().toISOString();

      if (!item.usageHistory) {
        item.usageHistory = [];
      }

      item.usageHistory.unshift({
        id: Date.now(),
        type,
        previousQuantity: oldQuantity,
        newQuantity,
        difference: newQuantity - oldQuantity,
        date: new Date().toISOString(),
      });
    },

    deductInventoryQuantity: (state, action) => {
      const {
        id,
        quantity,
      } = action.payload;

      const item = state.find(
        (inventoryItem) => inventoryItem.id === id
      );

      if (!item) return;

      const usedQuantity = Number(quantity || 0);
      const currentQuantity = Number(
        item.quantity || 0
      );

      if (usedQuantity <= 0) return;

      if (usedQuantity > currentQuantity) {
        return;
      }

      item.quantity =
        currentQuantity - usedQuantity;

      item.updatedAt =
        new Date().toISOString();

      if (!item.usageHistory) {
        item.usageHistory = [];
      }

      item.usageHistory.unshift({
        id: Date.now(),
        type: "usage",
        quantityUsed: usedQuantity,
        previousQuantity: currentQuantity,
        remainingQuantity: item.quantity,
        date: new Date().toISOString(),
      });
    },
  },
});

export const {
  addInventoryItem,
  updateInventoryItem,
  removeInventoryItem,
  updateInventoryQuantity,
  deductInventoryQuantity,
} = inventorySlice.actions;

export default inventorySlice.reducer;