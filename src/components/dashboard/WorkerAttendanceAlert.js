import React from "react";
import { useSelector } from "react-redux";

import {
  selectAttendanceWarning,
  selectAbsencePercentage,
} from "../../store/selectors/workerDashboardSelectors";

const WorkerAttendanceAlert = () => {
  const showWarning = useSelector(
    selectAttendanceWarning
  );

  const absencePercentage = useSelector(
    selectAbsencePercentage
  );

  if (!showWarning) {
    return null;
  }

  return (
    <div className="alert alert-warning border-0 shadow-sm d-flex align-items-center mb-4">
      <i className="bi bi-exclamation-triangle-fill fs-4 me-3"></i>

      <div>
        <strong>
          High Worker Absence
        </strong>

        <div>
          {absencePercentage}% of active workers
          are absent today.
        </div>
      </div>
    </div>
  );
};

export default WorkerAttendanceAlert;