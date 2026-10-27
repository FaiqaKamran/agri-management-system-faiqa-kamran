import { useSelector } from "react-redux";
import { formatDate, getDaysRemaining } from "../../utils/formatters";

const CuttingSchedule = () => {
  const crops = useSelector((state) => state.crops);

  const upcomingCrops = [...crops]
    .filter((crop) => crop.cuttingDate)
    .sort(
      (a, b) =>
        new Date(a.cuttingDate) -
        new Date(b.cuttingDate)
    )
    .slice(0, 5);

  const getScheduleStatus = (date) => {
    const days = getDaysRemaining(date);

    if (days < 0) {
      return {
        text: "Overdue",
        className: "text-danger",
      };
    }

    if (days === 0) {
      return {
        text: "Today",
        className: "text-warning",
      };
    }

    if (days <= 7) {
      return {
        text: `${days} days`,
        className: "text-warning",
      };
    }

    return {
      text: `${days} days`,
      className: "text-success",
    };
  };

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <div>
          <h5>Upcoming Harvests</h5>
          <p>Scheduled crop cutting dates</p>
        </div>

        <span className="dashboard-card-icon">
          <i className="bi bi-calendar-check"></i>
        </span>
      </div>

      {upcomingCrops.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-calendar-x"></i>
          <p>No upcoming harvests.</p>
        </div>
      ) : (
        <div className="schedule-list">
          {upcomingCrops.map((crop) => {
            const status = getScheduleStatus(
              crop.cuttingDate
            );

            return (
              <div
                className="schedule-item"
                key={crop.id}
              >
                <div className="schedule-icon">
                  <i className="bi bi-flower1"></i>
                </div>

                <div className="schedule-info">
                  <h6>{crop.name}</h6>

                  <span>
                    {formatDate(crop.cuttingDate)}
                  </span>
                </div>

                <div className={status.className}>
                  {status.text}
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