import React from "react";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import {
  formatDate,
  getDaysRemaining,
} from "../../utils/formatters";

const CuttingSchedule = () => {
  const { crops } = useContext(AppContext);

  const upcomingCrops = [...crops]
    .sort(
      (a, b) =>
        new Date(a.cuttingDate) -
        new Date(b.cuttingDate)
    )
    .slice(0, 5);

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <div>
          <h5>Upcoming Harvests</h5>
          <p>Cutting schedule</p>
        </div>

        <i className="bi bi-calendar3 card-header-icon"></i>
      </div>

      {upcomingCrops.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-calendar-x"></i>
          <p>No upcoming harvests.</p>
        </div>
      ) : (
        <div className="schedule-list">
          {upcomingCrops.map((crop) => {
            const days = getDaysRemaining(
              crop.cuttingDate
            );

            return (
              <div
                className="schedule-item"
                key={crop.id}
              >
                <div className="schedule-date">
                  <strong>
                    {new Date(
                      crop.cuttingDate
                    ).getDate()}
                  </strong>

                  <span>
                    {new Date(
                      crop.cuttingDate
                    ).toLocaleDateString(
                      "en-PK",
                      {
                        month: "short",
                      }
                    )}
                  </span>
                </div>

                <div className="schedule-info">
                  <strong>{crop.name}</strong>
                  <span>{crop.field}</span>
                  <small>
                    {formatDate(crop.cuttingDate)}
                  </small>
                </div>

                <div
                  className={`days-left ${
                    days <= 7
                      ? "urgent"
                      : ""
                  }`}
                >
                  {days < 0
                    ? "Overdue"
                    : days === 0
                    ? "Today"
                    : `${days} days`}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CuttingSchedule;