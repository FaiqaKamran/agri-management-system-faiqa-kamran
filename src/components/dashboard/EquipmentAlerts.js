import React from "react";
import { useSelector } from "react-redux";

import {
  selectOverdueEquipment,
  selectDueSoonEquipment,
  selectEquipmentRepairAlerts,
} from "../../store/selectors/equipmentDashboardSelectors";

const EquipmentAlerts = () => {
  const overdue = useSelector(
    selectOverdueEquipment
  );

  const dueSoon = useSelector(
    selectDueSoonEquipment
  );

  const underRepair = useSelector(
    selectEquipmentRepairAlerts
  );

  const hasAlerts =
    overdue.length > 0 ||
    dueSoon.length > 0 ||
    underRepair.length > 0;

  return (
    <div className="card border-0 shadow-sm h-100">

      <div className="card-body p-4">

        <div className="mb-4">
          <h5 className="mb-1">
            Equipment Alerts
          </h5>

          <p className="text-muted mb-0">
            Equipment requiring attention
          </p>
        </div>

        {!hasAlerts ? (
          <div className="alert alert-success mb-0">
            <i className="bi bi-check-circle me-2"></i>
            No equipment alerts at the moment.
          </div>
        ) : (
          <div className="d-flex flex-column gap-2">

            {overdue.map((item) => (
              <div
                key={`overdue-${item.id}`}
                className="alert alert-danger mb-0"
              >
                <strong>
                  {item.name}
                </strong>{" "}
                service is overdue.
              </div>
            ))}

            {dueSoon.map((item) => (
              <div
                key={`due-${item.id}`}
                className="alert alert-warning mb-0"
              >
                <strong>
                  {item.name}
                </strong>{" "}
                service is due within 7 days.
              </div>
            ))}

            {underRepair.map((item) => (
              <div
                key={`repair-${item.id}`}
                className="alert alert-info mb-0"
              >
                <strong>
                  {item.name}
                </strong>{" "}
                is currently under repair.
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default EquipmentAlerts;