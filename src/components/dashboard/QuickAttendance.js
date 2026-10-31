import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  markAllAttendance,
} from "../../store/reducers/attendanceReducer";

const QuickAttendance = () => {
  const dispatch = useDispatch();

  const workers = useSelector(
    (state) => state.workers || []
  );

  const handleMark = (status) => {
    const activeWorkers = workers.filter(
      (worker) => worker.status === "Active"
    );

    if (activeWorkers.length === 0) {
      window.alert(
        "No active workers available."
      );
      return;
    }

    const today = new Date()
      .toISOString()
      .split("T")[0];

    dispatch(
      markAllAttendance({
        workers: activeWorkers,
        date: today,
        status,
      })
    );

    window.alert(
      `All active workers marked as ${status}.`
    );
  };

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body p-4">

        <h5 className="mb-1">
          Quick Attendance
        </h5>

        <p className="text-muted mb-4">
          Quickly mark all active workers for today.
        </p>

        <div className="d-grid gap-2">

          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() =>
              handleMark("Present")
            }
          >
            <i className="bi bi-check-circle me-2"></i>
            Mark All Present
          </button>

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() =>
              handleMark("Absent")
            }
          >
            <i className="bi bi-x-circle me-2"></i>
            Mark All Absent
          </button>

          <button
            type="button"
            className="btn btn-outline-warning"
            onClick={() =>
              handleMark("Half-day")
            }
          >
            <i className="bi bi-clock me-2"></i>
            Mark All Half-day
          </button>

        </div>

      </div>
    </div>
  );
};

export default QuickAttendance;