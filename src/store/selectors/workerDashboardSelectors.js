import { createSelector } from "@reduxjs/toolkit";

const getWorkers = (state) => state.workers || [];
const getAttendance = (state) => state.attendance || [];
const getExpenses = (state) => state.expenses || [];

export const selectTotalWorkers = createSelector(
  [getWorkers],
  (workers) => workers.length
);

export const selectActiveWorkers = createSelector(
  [getWorkers],
  (workers) =>
    workers.filter(
      (worker) => worker.status === "Active"
    )
);

export const selectPresentToday = createSelector(
  [getWorkers, getAttendance],
  (workers, attendance) => {
    const today = new Date()
      .toISOString()
      .split("T")[0];

    return attendance.filter(
      (record) =>
        record.date === today &&
        record.status === "Present" &&
        workers.some(
          (worker) =>
            Number(worker.id) ===
            Number(record.workerId) &&
            worker.status === "Active"
        )
    ).length;
  }
);

export const selectAbsentToday = createSelector(
  [getWorkers, getAttendance],
  (workers, attendance) => {
    const today = new Date()
      .toISOString()
      .split("T")[0];

    return attendance.filter(
      (record) =>
        record.date === today &&
        record.status === "Absent" &&
        workers.some(
          (worker) =>
            Number(worker.id) ===
            Number(record.workerId) &&
            worker.status === "Active"
        )
    ).length;
  }
);

export const selectWagesPayableThisMonth =
  createSelector(
    [getWorkers, getAttendance],
    (workers, attendance) => {
      const currentMonth = new Date()
        .toISOString()
        .slice(0, 7);

      return workers.reduce((total, worker) => {
        const records = attendance.filter(
          (record) =>
            Number(record.workerId) ===
              Number(worker.id) &&
            record.date.startsWith(currentMonth)
        );

        const presentDays = records.filter(
          (record) =>
            record.status === "Present"
        ).length;

        const halfDays = records.filter(
          (record) =>
            record.status === "Half-day"
        ).length;

        const payableDays =
          presentDays + halfDays * 0.5;

        return (
          total +
          payableDays *
            Number(worker.dailyWage || 0)
        );
      }, 0);
    }
  );

export const selectAttendanceWarning =
  createSelector(
    [
      selectActiveWorkers,
      selectAbsentToday,
    ],
    (activeWorkers, absentToday) => {
      if (activeWorkers.length === 0) {
        return false;
      }

      const percentage =
        (absentToday / activeWorkers.length) *
        100;

      return percentage > 30;
    }
  );

export const selectAbsencePercentage =
  createSelector(
    [
      selectActiveWorkers,
      selectAbsentToday,
    ],
    (activeWorkers, absentToday) => {
      if (activeWorkers.length === 0) {
        return 0;
      }

      return Math.round(
        (absentToday / activeWorkers.length) *
          100
      );
    }
  );

export const selectAttendanceLast7Days =
  createSelector(
    [getWorkers, getAttendance],
    (workers, attendance) => {
      const activeWorkerIds = workers
        .filter(
          (worker) => worker.status === "Active"
        )
        .map((worker) => Number(worker.id));

      const result = [];

      for (let i = 6; i >= 0; i--) {
        const date = new Date();

        date.setDate(
          date.getDate() - i
        );

        const dateString = date
          .toISOString()
          .split("T")[0];

        const records = attendance.filter(
          (record) =>
            record.date === dateString &&
            activeWorkerIds.includes(
              Number(record.workerId)
            )
        );

        result.push({
          date: dateString,
          label: date.toLocaleDateString(
            "en-US",
            {
              weekday: "short",
            }
          ),
          present: records.filter(
            (record) =>
              record.status === "Present"
          ).length,
          absent: records.filter(
            (record) =>
              record.status === "Absent"
          ).length,
        });
      }

      return result;
    }
  );