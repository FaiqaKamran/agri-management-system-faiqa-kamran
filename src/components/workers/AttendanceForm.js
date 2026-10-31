import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addAttendance,
  updateAttendance,
} from "../../store/reducers/attendanceReducer";

const AttendanceForm = ({
  editingAttendance,
  selectedDate,
  onClose,
}) => {
  const dispatch = useDispatch();

  const workers = useSelector(
    (state) => state.workers || []
  );

  const attendance = useSelector(
    (state) => state.attendance || []
  );

  const [formData, setFormData] = useState({
    workerId: "",
    date: selectedDate,
    status: "Present",
    note: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingAttendance) {
      setFormData({
        workerId: editingAttendance.workerId,
        date: editingAttendance.date,
        status: editingAttendance.status,
        note: editingAttendance.note || "",
      });
    } else {
      setFormData({
        workerId: "",
        date: selectedDate,
        status: "Present",
        note: "",
      });
    }

    setError("");
  }, [editingAttendance, selectedDate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.workerId) {
      setError("Please select a worker.");
      return;
    }

    if (!formData.date) {
      setError("Please select a date.");
      return;
    }

    const duplicate = attendance.some(
      (item) =>
        Number(item.workerId) ===
          Number(formData.workerId) &&
        item.date === formData.date &&
        item.id !== editingAttendance?.id
    );

    if (duplicate) {
      setError(
        "Attendance for this worker on this date already exists."
      );
      return;
    }

    if (editingAttendance) {
      dispatch(
        updateAttendance({
          id: editingAttendance.id,
          data: formData,
        })
      );
    } else {
      dispatch(addAttendance(formData));
    }

    onClose();
  };

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="mb-1">
              {editingAttendance
                ? "Edit Attendance"
                : "Mark Attendance"}
            </h5>

            <p className="text-muted mb-0">
              Record worker attendance for a specific date.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-light"
            onClick={onClose}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {error && (
          <div className="alert alert-danger">
            <i className="bi bi-exclamation-circle me-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">

            <div className="col-md-6">
              <label className="form-label">
                Worker
              </label>

              <select
                name="workerId"
                className="form-select"
                value={formData.workerId}
                onChange={handleChange}
              >
                <option value="">
                  Select Worker
                </option>

                {workers
                  .filter(
                    (worker) =>
                      worker.status === "Active"
                  )
                  .map((worker) => (
                    <option
                      key={worker.id}
                      value={worker.id}
                    >
                      {worker.fullName}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Date
              </label>

              <input
                type="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Attendance Status
              </label>

              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Present">
                  Present
                </option>

                <option value="Absent">
                  Absent
                </option>

                <option value="Half-day">
                  Half-day
                </option>

                <option value="Leave">
                  Leave
                </option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Note
              </label>

              <input
                type="text"
                name="note"
                className="form-control"
                value={formData.note}
                onChange={handleChange}
                placeholder="Optional note"
              />
            </div>

          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-light"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-success"
            >
              <i className="bi bi-check2 me-1"></i>

              {editingAttendance
                ? "Update Attendance"
                : "Save Attendance"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AttendanceForm;