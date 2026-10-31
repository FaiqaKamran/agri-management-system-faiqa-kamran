import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AttendanceForm from "../components/workers/AttendanceForm";
import AttendanceTable from "../components/workers/AttendanceTable";
import AttendanceSummary from "../components/workers/AttendanceSummary";

import {
  markAllAttendance,
} from "../store/reducers/attendanceReducer";

const Attendance = () => {
  const dispatch = useDispatch();

  const workers = useSelector(
    (state) => state.workers || []
  );

  const attendance = useSelector(
    (state) => state.attendance || []
  );

  const [selectedDate, setSelectedDate] =
    useState(
      new Date().toISOString().split("T")[0]
    );

  const [selectedMonth, setSelectedMonth] =
    useState(
      new Date().toISOString().slice(0, 7)
    );

  const [showForm, setShowForm] =
    useState(false);

  const [editingAttendance, setEditingAttendance] =
    useState(null);

  const todayRecords = useMemo(() => {
    return attendance.filter(
      (item) => item.date === selectedDate
    );
  }, [attendance, selectedDate]);

  const presentCount = todayRecords.filter(
    (item) => item.status === "Present"
  ).length;

  const absentCount = todayRecords.filter(
    (item) => item.status === "Absent"
  ).length;

  const halfDayCount = todayRecords.filter(
    (item) => item.status === "Half-day"
  ).length;

  const leaveCount = todayRecords.filter(
    (item) => item.status === "Leave"
  ).length;

  const handleMarkAll = (status) => {
    const activeWorkers = workers.filter(
      (worker) => worker.status === "Active"
    );

    if (activeWorkers.length === 0) {
      window.alert(
        "There are no active workers to mark."
      );
      return;
    }

    dispatch(
      markAllAttendance({
        workers: activeWorkers,
        date: selectedDate,
        status,
      })
    );
  };

  const handleEdit = (record) => {
    setEditingAttendance(record);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setEditingAttendance(null);
    setShowForm(false);
  };

  return (
    <div>

      <div className="page-heading">
        <div>
          <h1>Attendance Register</h1>

          <p>
            Track daily worker attendance and monthly summaries.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            setEditingAttendance(null);
            setShowForm(true);
          }}
        >
          <i className="bi bi-calendar-plus me-2"></i>
          Mark Attendance
        </button>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">

          <div className="row g-3 align-items-end">

            <div className="col-md-4">
              <label className="form-label">
                Attendance Date
              </label>

              <input
                type="date"
                className="form-control"
                value={selectedDate}
                onChange={(event) =>
                  setSelectedDate(
                    event.target.value
                  )
                }
              />
            </div>

            <div className="col-md-8">
              <label className="form-label">
                Quick Mark Attendance
              </label>

              <div className="d-flex flex-wrap gap-2">

                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() =>
                    handleMarkAll("Present")
                  }
                >
                  <i className="bi bi-check-circle me-1"></i>
                  Mark All Present
                </button>

                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() =>
                    handleMarkAll("Absent")
                  }
                >
                  <i className="bi bi-x-circle me-1"></i>
                  Mark All Absent
                </button>

                <button
                  type="button"
                  className="btn btn-outline-warning"
                  onClick={() =>
                    handleMarkAll("Half-day")
                  }
                >
                  Mark All Half-day
                </button>

              </div>
            </div>

          </div>

        </div>
      </div>

      <div className="row g-4 mb-4">

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted mb-1">
                Present
              </p>

              <h3 className="text-success mb-0">
                {presentCount}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted mb-1">
                Absent
              </p>

              <h3 className="text-danger mb-0">
                {absentCount}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted mb-1">
                Half-day
              </p>

              <h3 className="text-warning mb-0">
                {halfDayCount}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <p className="text-muted mb-1">
                Leave
              </p>

              <h3 className="text-secondary mb-0">
                {leaveCount}
              </h3>
            </div>
          </div>
        </div>

      </div>

      {showForm && (
        <AttendanceForm
          editingAttendance={
            editingAttendance
          }
          selectedDate={selectedDate}
          onClose={handleCloseForm}
        />
      )}

      <AttendanceTable
        date={selectedDate}
        onEdit={handleEdit}
      />

      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body p-4">

          <div className="row align-items-end">

            <div className="col-md-4">
              <label className="form-label">
                Summary Month
              </label>

              <input
                type="month"
                className="form-control"
                value={selectedMonth}
                onChange={(event) =>
                  setSelectedMonth(
                    event.target.value
                  )
                }
              />
            </div>

          </div>

        </div>
      </div>

      <AttendanceSummary
        selectedMonth={selectedMonth}
      />

    </div>
  );
};

export default Attendance;