import React from "react";
import { useSelector } from "react-redux";

import {
  selectNextFiveServices,
} from "../../store/selectors/equipmentDashboardSelectors";

const EquipmentServiceSchedule = () => {
  const services = useSelector(
    selectNextFiveServices
  );

  const getStatusBadge = (item) => {
    if (item.serviceStatus === "Overdue") {
      return (
        <span className="badge bg-danger">
          Overdue
        </span>
      );
    }

    if (item.serviceStatus === "Due in 7 days") {
      return (
        <span className="badge bg-warning text-dark">
          Due in {item.daysRemaining} day
          {item.daysRemaining === 1 ? "" : "s"}
        </span>
      );
    }

    return (
      <span className="badge bg-success">
        {item.daysRemaining} days
      </span>
    );
  };

  return (
    <div className="card border-0 shadow-sm h-100">

      <div className="card-body p-4">

        <div className="mb-4">
          <h5 className="mb-1">
            Upcoming Equipment Services
          </h5>

          <p className="text-muted mb-0">
            Next scheduled maintenance
          </p>
        </div>

        {services.length === 0 ? (
          <div className="text-center text-muted py-4">
            No service schedules available.
          </div>
        ) : (
          <div className="table-responsive">

            <table className="table align-middle mb-0">

              <thead>
                <tr>
                  <th>Equipment</th>
                  <th>Next Service</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {services.map((item) => (
                  <tr key={item.id}>

                    <td>
                      <strong>
                        {item.name}
                      </strong>

                      <small className="d-block text-muted">
                        {item.type}
                      </small>
                    </td>

                    <td>
                      {item.nextServiceDate}
                    </td>

                    <td>
                      {getStatusBadge(item)}
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

export default EquipmentServiceSchedule;