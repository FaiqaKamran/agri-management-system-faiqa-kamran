import React from "react";
import { useSelector } from "react-redux";

import {
  selectTotalWorkers,
  selectPresentToday,
  selectAbsentToday,
  selectWagesPayableThisMonth,
} from "../../store/selectors/workerDashboardSelectors";

const WorkerStats = () => {
  const totalWorkers = useSelector(
    selectTotalWorkers
  );

  const presentToday = useSelector(
    selectPresentToday
  );

  const absentToday = useSelector(
    selectAbsentToday
  );

  const wagesPayable = useSelector(
    selectWagesPayableThisMonth
  );

  const cards = [
    {
      title: "Total Workers",
      value: totalWorkers,
      icon: "bi-people",
      className: "text-primary",
    },
    {
      title: "Present Today",
      value: presentToday,
      icon: "bi-person-check",
      className: "text-success",
    },
    {
      title: "Absent Today",
      value: absentToday,
      icon: "bi-person-x",
      className: "text-danger",
    },
    {
      title: "Wages Payable",
      value: `Rs. ${wagesPayable.toLocaleString()}`,
      icon: "bi-cash-stack",
      className: "text-warning",
    },
  ];

  return (
    <div className="row g-4 mb-4">
      {cards.map((card) => (
        <div
          className="col-xl-3 col-md-6"
          key={card.title}
        >
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-2">
                    {card.title}
                  </p>

                  <h3 className="mb-0">
                    {card.value}
                  </h3>
                </div>

                <div
                  className={`fs-2 ${card.className}`}
                >
                  <i
                    className={`bi ${card.icon}`}
                  ></i>
                </div>
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkerStats;