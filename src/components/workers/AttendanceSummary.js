import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const AttendanceSummary = ({
  selectedMonth,
}) => {
  const workers = useSelector(
    (state) => state.workers || []
  );

  const attendance = useSelector(
    (state) => state.attendance || []
  );

  const summary = useMemo(() => {
    return workers.map((worker) => {
      const records = attendance.filter(
        (item) =>
          Number(item.workerId) ===
            Number(worker.id) &&
          item.date.startsWith(selectedMonth)
      );

      const present = records.filter(
        (item) => item.status === "Present"
      ).length;

      const absent = records.filter(
        (item) => item.status === "Absent"
      ).length;

      const halfDays = records.filter(
        (item) => item.status === "Half-day"
      ).length;

      const leave = records.filter(
        (item) => item.status === "Leave"
      ).length;

      return {
        ...worker,
        present,
        absent,
        halfDays,
        leave,
      };
    });
  }, [workers, attendance, selectedMonth]);

  return (
    <div className="card border-0 shadow-sm mt-4">
      <div className="card-body p-4">

        <div className="mb-4">
          <h5 className="mb-1">
            Monthly Attendance Summary
          </h5>

          <p className="text-muted mb-0">
            Worker attendance summary for{" "}
            {selectedMonth}
          </p>
        </div>

        {summary.length === 0 ? (
          <div className="text-center py-4 text-muted">
            No workers available.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle mb-0">

              <thead>
                <tr>
                  <th>Worker</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Half Days</th>
                  <th>Leave</th>
                </tr>
              </thead>

              <tbody>
                {summary.map((worker) => (
                  <tr key={worker.id}>

                    <td>
                      <strong>
                        {worker.fullName}
                      </strong>
                    </td>

                    <td>
                      <span className="badge bg-success">
                        {worker.present}
                      </span>
                    </td>

                    <td>
                      <span className="badge bg-danger">
                        {worker.absent}
                      </span>
                    </td>

                    <td>
                      <span className="badge bg-warning text-dark">
                        {worker.halfDays}
                      </span>
                    </td>

                    <td>
                      <span className="badge bg-secondary">
                        {worker.leave}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default AttendanceSummary;