import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const expensesSlice = createSlice({
  name: "expenses",

  initialState,

  reducers: {
    addExpense: (state, action) => {
      state.push({
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      });
    },

    updateExpense: (state, action) => {
      const { id, data } = action.payload;

      const index = state.findIndex(
        (expense) => expense.id === id
      );

      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...data,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    removeExpense: (state, action) => {
      return state.filter(
        (expense) => expense.id !== action.payload
      );
    },
  },
});

export const {
  addExpense,
  updateExpense,
  removeExpense,
} = expensesSlice.actions;

export default expensesSlice.reducer;