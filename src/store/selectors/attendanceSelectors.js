export const selectAttendance = (state) =>
  state.attendance || [];

export const selectTodayAttendance = (state) => {
  const attendance = state.attendance || [];

  const today = new Date()
    .toISOString()
    .split("T")[0];

  return attendance.filter(
    (item) => item.date === today
  );
};

export const selectPresentToday = (state) =>
  selectTodayAttendance(state).filter(
    (item) => item.status === "Present"
  );

export const selectAbsentToday = (state) =>
  selectTodayAttendance(state).filter(
    (item) => item.status === "Absent"
  );

export const selectHalfDayToday = (state) =>
  selectTodayAttendance(state).filter(
    (item) => item.status === "Half-day"
  );

export const selectLeaveToday = (state) =>
  selectTodayAttendance(state).filter(
    (item) => item.status === "Leave"
  );

export const selectWorkerAttendance = (
  state,
  workerId
) =>
  (state.attendance || []).filter(
    (item) =>
      Number(item.workerId) === Number(workerId)
  );