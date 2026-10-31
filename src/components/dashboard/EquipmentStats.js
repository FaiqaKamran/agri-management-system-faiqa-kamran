import React from "react";
import { useSelector } from "react-redux";

import {
  selectEquipmentDashboardStats,
} from "../../store/selectors/equipmentDashboardSelectors";

const EquipmentStats = () => {
  const stats = useSelector(
    selectEquipmentDashboardStats
  );

  const cards = [
    {
      title: "Total Equipment",
      value: stats.total,
      icon: "bi-tools",
    },
    {
      title: "Active",
      value: stats.active,
      icon: "bi-check-circle",
    },
    {
      title: "Under Repair",
      value: stats.underRepair,
      icon: "bi-wrench",
    },
    {
      title: "Idle",
      value: stats.idle,
      icon: "bi-pause-circle",
    },
  ];

  return (
    <div className="row g-3 mb-4">

      {cards.map((card) => (
        <div
          className="col-md-6 col-xl-3"
          key={card.title}
        >
          <div className="card border-0 shadow-sm h-100">

            <div className="card-body d-flex align-items-center">

              <div className="me-3">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "48px",
                    height: "48px",
                    background: "#f1f5f3",
                  }}
                >
                  <i
                    className={`bi ${card.icon} fs-5`}
                  ></i>
                </div>
              </div>

              <div>
                <small className="text-muted">
                  {card.title}
                </small>

                <h4 className="mb-0 mt-1">
                  {card.value}
                </h4>
              </div>

            </div>
          </div>
        </div>
      ))}

    </div>
  );
};

export default EquipmentStats;