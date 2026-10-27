import { useSelector } from "react-redux";

const AlertsPanel = () => {
  const crops = useSelector((state) => state.crops);
  const tasks = useSelector((state) => state.tasks);
  const inventory = useSelector((state) => state.inventory);

  const alerts = [];

  // Critical crops
  crops
    .filter(
      (crop) =>
        crop.status === "Critical" ||
        Number(crop.healthScore || 0) < 50
    )
    .forEach((crop) => {
      alerts.push({
        id: `crop-${crop.id}`,
        type: "danger",
        icon: "bi-exclamation-circle",
        title: "Crop needs attention",
        message: `${crop.name} has a critical health status.`,
      });
    });

  // Due / overdue tasks
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  tasks
    .filter((task) => {
      if (!task.dueDate || task.status === "Done") {
        return false;
      }

      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);

      return dueDate <= today;
    })
    .forEach((task) => {
      alerts.push({
        id: `task-${task.id}`,
        type: "warning",
        icon: "bi-list-check",
        title: "Task due",
        message: `${task.title} requires attention.`,
      });
    });

  // Low inventory
  inventory
    .filter(
      (item) =>
        Number(item.qty || 0) <=
        Number(item.minimumQty || 0)
    )
    .forEach((item) => {
      alerts.push({
        id: `inventory-${item.id}`,
        type: "info",
        icon: "bi-box-seam",
        title: "Low inventory",
        message: `${item.item} is running low.`,
      });
    });

  const visibleAlerts = alerts.slice(0, 5);

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <div>
          <h5>Alerts</h5>
          <p>Important farm notifications</p>
        </div>

        <span className="dashboard-card-icon">
          <i className="bi bi-bell"></i>
        </span>
      </div>

      {visibleAlerts.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-check-circle"></i>
          <p>No active alerts.</p>
        </div>
      ) : (
        <div className="alerts-list">
          {visibleAlerts.map((alert) => (
            <div
              className={`alert-item alert-${alert.type}`}
              key={alert.id}
            >
              <div className="alert-icon">
                <i className={`bi ${alert.icon}`}></i>
              </div>

              <div>
                <h6>{alert.title}</h6>
                <p>{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;