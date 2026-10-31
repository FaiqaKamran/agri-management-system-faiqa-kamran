import React from "react";
import { useSelector } from "react-redux";

import {
  selectMaintenanceCostByEquipment,
} from "../../store/selectors/maintenanceSelectors";

const MaintenanceCostSummary = () => {
  const equipment = useSelector(
    selectMaintenanceCostByEquipment
  );

  return (
    <div className="card border-0 shadow-sm mb-4">

      <div className="card-body p-4">

        <h5 className="mb-1">
          Maintenance Cost by Equipment
        </h5>

        <p className="text-muted mb-4">
          Total maintenance spending for each machine
        </p>

        <div className="table-responsive">

          <table className="table align-middle">

            <thead>
              <tr>
                <th>Equipment</th>
                <th>Type</th>
                <th>Services</th>
                <th>Total Cost</th>
              </tr>
            </thead>

            <tbody>

              {equipment.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-muted py-4"
                  >
                    No equipment available.
                  </td>
                </tr>
              ) : (
                equipment.map((item) => (
                  <tr key={item.id}>

                    <td>
                      <strong>{item.name}</strong>
                    </td>

                    <td>{item.type}</td>

                    <td>
                      {item.maintenanceCount}
                    </td>

                    <td>
                      <strong>
                        Rs.{" "}
                        {Number(
                          item.totalMaintenanceCost || 0
                        ).toLocaleString()}
                      </strong>
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
};

export default MaintenanceCostSummary;