import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const attendanceSlice = createSlice({
  name: "attendance",

  initialState,

  reducers: {
    setAttendance: (state, action) => {
      return Array.isArray(action.payload)
        ? action.payload
        : [];
    },

    addAttendance: (state, action) => {
      state.push({
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      });
    },

    updateAttendance: (state, action) => {
      const { id, data } = action.payload;

      const index = state.findIndex(
        (item) =>
          Number(item.id) === Number(id)
      );

      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...data,
        };
      }
    },

    removeAttendance: (state, action) => {
      return state.filter(
        (item) =>
          Number(item.id) !==
          Number(action.payload)
      );
    },

    markAllAttendance: (state, action) => {
      const {
        workers,
        date,
        status,
      } = action.payload;

      workers.forEach((worker) => {
        const existing = state.find(
          (item) =>
            Number(item.workerId) ===
              Number(worker.id) &&
            item.date === date
        );

        if (existing) {
          existing.status = status;
          existing.note = "";
        } else {
          state.push({
            id:
              Date.now() +
              Math.random(),

            workerId: worker.id,
            date,
            status,
            note: "",
            createdAt:
              new Date().toISOString(),
          });
        }
      });
    },
  },
});

export const {
  setAttendance,
  addAttendance,
  updateAttendance,
  removeAttendance,
  markAllAttendance,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;