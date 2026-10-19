import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { getDaysRemaining } from "../../utils/formatters";

const AlertsPanel = () => {
  const { crops } = useContext(AppContext);

  const criticalCrops = crops.filter(
    (crop) => crop.status === "Critical"
  );

  const attentionCrops = crops.filter(
    (crop) => crop.status === "Needs Attention"
  );

  const upcomingCrops = crops.filter(
    (crop) => {
      const days = getDaysRemaining(
        crop.cuttingDate
      );

      return days >= 0 && days <= 7;
    }
  );

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <div>
          <h5>Alerts</h5>
          <p>Important farm notifications</p>
        </div>

        <i className="bi bi-bell card-header-icon"></i>
      </div>

      <div className="alerts-list">
        {criticalCrops.length > 0 && (
          <div className="alert-item alert-danger">
            <div className="alert-icon">
              <i className="bi bi-exclamation-triangle"></i>
            </div>

            <div>
              <strong>
                Critical Crop Health
              </strong>

              <p>
                {criticalCrops.length} crop
                {criticalCrops.length > 1
                  ? "s"
                  : ""}{" "}
                require immediate attention.
              </p>
            </div>
          </div>
        )}

        {attentionCrops.length > 0 && (
          <div className="alert-item alert-warning">
            <div className="alert-icon">
              <i className="bi bi-exclamation-circle"></i>
            </div>

            <div>
              <strong>
                Health Monitoring Required
              </strong>

              <p>
                {attentionCrops.length} crop
                {attentionCrops.length > 1
                  ? "s"
                  : ""}{" "}
                need monitoring.
              </p>
            </div>
          </div>
        )}

        {upcomingCrops.length > 0 && (
          <div className="alert-item alert-info">
            <div className="alert-icon">
              <i className="bi bi-calendar-event"></i>
            </div>

            <div>
              <strong>Harvest Approaching</strong>

              <p>
                {upcomingCrops.length} crop
                {upcomingCrops.length > 1
                  ? "s"
                  : ""}{" "}
                scheduled within 7 days.
              </p>
            </div>
          </div>
        )}

        {criticalCrops.length === 0 &&
          attentionCrops.length === 0 &&
          upcomingCrops.length === 0 && (
            <div className="no-alerts">
              <i className="bi bi-check-circle"></i>
              <strong>All Good!</strong>
              <p>
                No critical alerts at the moment.
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default AlertsPanel;