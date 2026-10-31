import { createSelector } from "@reduxjs/toolkit";

export const selectWorkersForWages = createSelector(
  [
    (state) => state.workers || [],
    (state) => state.attendance || [],
  ],
  (workers, attendance) => {
    return workers.map((worker) => {
      const workerAttendance = attendance.filter(
        (item) =>
          Number(item.workerId) === Number(worker.id)
      );

      const presentDays = workerAttendance.filter(
        (item) => item.status === "Present"
      ).length;

      const halfDays = workerAttendance.filter(
        (item) => item.status === "Half-day"
      ).length;

      const absentDays = workerAttendance.filter(
        (item) => item.status === "Absent"
      ).length;

      const leaveDays = workerAttendance.filter(
        (item) => item.status === "Leave"
      ).length;

      const payableDays =
        presentDays + halfDays * 0.5;

      const wage =
        payableDays * Number(worker.dailyWage || 0);

      return {
        ...worker,
        presentDays,
        halfDays,
        absentDays,
        leaveDays,
        payableDays,
        wage,
      };
    });
  }
);

export const selectTotalWagesPayable = createSelector(
  [selectWorkersForWages],
  (workers) =>
    workers.reduce(
      (total, worker) => total + worker.wage,
      0
    )
);

export const selectWageWorkerCount = createSelector(
  [selectWorkersForWages],
  (workers) =>
    workers.filter(
      (worker) => worker.wage > 0
    ).length
);