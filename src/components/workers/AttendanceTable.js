import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../common/ConfirmModal";

import {
  removeAttendance,
} from "../../store/reducers/attendanceReducer";

const AttendanceTable = ({
  date,
  onEdit,
}) => {
  const dispatch = useDispatch();

  const workers = useSelector(
    (state) => state.workers || []
  );

  const attendance = useSelector(
    (state) => state.attendance || []
  );

  const role = useSelector(
    (state) => state.auth?.role
  );

  // Selected record for delete confirmation
  const [deleteRecord, setDeleteRecord] =
    useState(null);

  const selectedRecords = attendance.filter(
    (item) => item.date === date
  );

  const getWorkerName = (workerId) => {
    const worker = workers.find(
      (item) =>
        Number(item.id) === Number(workerId)
    );

    return worker?.fullName || "Unknown Worker";
  };

  const handleDelete = (record) => {
    setDeleteRecord(record);
  };

  const confirmDelete = () => {
    if (!deleteRecord) {
      return;
    }

    dispatch(
      removeAttendance(deleteRecord.id)
    );

    setDeleteRecord(null);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Present":
        return "bg-success";

      case "Absent":
        return "bg-danger";

      case "Half-day":
        return "bg-warning text-dark";

      case "Leave":
        return "bg-secondary";

      default:
        return "bg-light text-dark";
    }
  };

  return (
    <>
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">

          <div className="mb-4">
            <h5 className="mb-1">
              Attendance Register
            </h5>

            <p className="text-muted mb-0">
              Attendance for {date}
            </p>
          </div>

          {selectedRecords.length === 0 ? (
            <div className="text-center py-5">

              <i className="bi bi-calendar-check fs-1 text-muted"></i>

              <h6 className="mt-3">
                No attendance records
              </h6>

              <p className="text-muted mb-0">
                Mark attendance for workers to see
                records here.
              </p>

            </div>
          ) : (
            <div className="table-responsive">

              <table className="table align-middle mb-0">

                <thead>
                  <tr>
                    <th>Worker</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Note</th>
                    <th className="text-end">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {selectedRecords.map(
                    (record) => (
                      <tr key={record.id}>

                        <td>
                          <strong>
                            {getWorkerName(
                              record.workerId
                            )}
                          </strong>
                        </td>

                        <td>
                          {record.date}
                        </td>

                        <td>
                          <span
                            className={`badge ${getStatusClass(
                              record.status
                            )}`}
                          >
                            {record.status}
                          </span>
                        </td>

                        <td>
                          {record.note || "-"}
                        </td>

                        <td className="text-end">

                          {role === "Admin" && (
                            <div className="d-flex justify-content-end gap-2">

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() =>
                                  onEdit(record)
                                }
                              >
                                <i className="bi bi-pencil"></i>
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  handleDelete(record)
                                }
                              >
                                <i className="bi bi-trash"></i>
                              </button>

                            </div>
                          )}

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        show={Boolean(deleteRecord)}
        title="Delete Attendance Record"
        message={
          deleteRecord
            ? `Are you sure you want to delete the attendance record for ${getWorkerName(
                deleteRecord.workerId
              )} on ${deleteRecord.date}?`
            : ""
        }
        onConfirm={confirmDelete}
        onCancel={() =>
          setDeleteRecord(null)
        }
      />
    </>
  );
};

export default AttendanceTable;