import React from "react";
import { useSelector } from "react-redux";

import {
  selectAttendanceLast7Days,
} from "../../store/selectors/workerDashboardSelectors";

const AttendanceChart = () => {
  const data = useSelector(
    selectAttendanceLast7Days
  );

  const maxValue = Math.max(
    ...data.flatMap((item) => [
      item.present,
      item.absent,
    ]),
    1
  );

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body p-4">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="mb-1">
              Attendance Overview
            </h5>

            <p className="text-muted mb-0">
              Last 7 days
            </p>
          </div>

          <div className="d-flex gap-3 small">
            <span>
              <i className="bi bi-circle-fill text-success me-1"></i>
              Present
            </span>

            <span>
              <i className="bi bi-circle-fill text-danger me-1"></i>
              Absent
            </span>
          </div>
        </div>

        <div
          className="d-flex align-items-end justify-content-between"
          style={{
            height: "220px",
            gap: "10px",
          }}
        >
          {data.map((item) => {
            const presentHeight =
              (item.present / maxValue) * 150;

            const absentHeight =
              (item.absent / maxValue) * 150;

            return (
              <div
                key={item.date}
                className="d-flex flex-column align-items-center flex-grow-1"
              >
                <div
                  className="d-flex align-items-end justify-content-center"
                  style={{
                    height: "170px",
                    gap: "4px",
                  }}
                >
                  <div
                    title={`Present: ${item.present}`}
                    style={{
                      width: "16px",
                      height: `${Math.max(
                        presentHeight,
                        item.present > 0 ? 8 : 2
                      )}px`,
                      backgroundColor:
                        "#198754",
                      borderRadius:
                        "4px 4px 0 0",
                    }}
                  />

                  <div
                    title={`Absent: ${item.absent}`}
                    style={{
                      width: "16px",
                      height: `${Math.max(
                        absentHeight,
                        item.absent > 0 ? 8 : 2
                      )}px`,
                      backgroundColor:
                        "#dc3545",
                      borderRadius:
                        "4px 4px 0 0",
                    }}
                  />
                </div>

                <small className="text-muted mt-2">
                  {item.label}
                </small>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default AttendanceChart;