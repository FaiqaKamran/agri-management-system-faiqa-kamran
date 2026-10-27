import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const tasksSlice = createSlice({
  name: "tasks",

  initialState,

  reducers: {
    addTask: (state, action) => {
      state.push({
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      });
    },

    updateTask: (state, action) => {
      const { id, data } = action.payload;

      const index = state.findIndex(
        (task) => task.id === id
      );

      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...data,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    removeTask: (state, action) => {
      return state.filter(
        (task) => task.id !== action.payload
      );
    },

    completeTask: (state, action) => {
      const task = state.find(
        (item) => item.id === action.payload
      );

      if (task) {
        task.status = "Done";
      }
    },
  },
});

export const {
  addTask,
  updateTask,
  removeTask,
  completeTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;