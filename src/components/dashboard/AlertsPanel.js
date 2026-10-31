import { useSelector } from "react-redux";

const AlertsPanel = () => {
  const crops = useSelector(
    (state) => state.crops || []
  );

  const tasks = useSelector(
    (state) => state.tasks || []
  );

  const inventory = useSelector(
    (state) => state.inventory || []
  );

  const workers = useSelector(
    (state) => state.workers || []
  );

  const attendance = useSelector(
    (state) => state.attendance || []
  );

  const equipment = useSelector(
    (state) => state.equipment || []
  );

  const maintenance = useSelector(
    (state) => state.maintenance || []
  );

  const alerts = [];

  // =====================================================
  // 1. Critical Crops
  // =====================================================

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

  // =====================================================
  // 2. Due / Overdue Tasks
  // =====================================================

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

  // =====================================================
  // 3. Low Inventory
  // =====================================================

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

  // =====================================================
  // 4. Workers - Attendance Warning
  // =====================================================

  const activeWorkers = workers.filter(
    (worker) => worker.status === "Active"
  );

  const todayString = new Date()
    .toISOString()
    .split("T")[0];

  const absentToday = attendance.filter(
    (record) =>
      record.date === todayString &&
      record.status === "Absent" &&
      activeWorkers.some(
        (worker) =>
          Number(worker.id) ===
          Number(record.workerId)
      )
  ).length;

  const absencePercentage =
    activeWorkers.length > 0
      ? (absentToday / activeWorkers.length) * 100
      : 0;

  // PDF requirement: warning when more than 30%
  // of active workers are absent today.
  if (
    activeWorkers.length > 0 &&
    absencePercentage > 30
  ) {
    alerts.push({
      id: "workers-absence-warning",
      type: "warning",
      icon: "bi-person-x",
      title: "High worker absence",
      message: `${Math.round(
        absencePercentage
      )}% of active workers are absent today.`,
    });
  }

  // =====================================================
  // 5. Equipment - Service Information
  // =====================================================

  const equipmentWithServiceInfo =
    equipment.map((item) => {
      const serviceRecords = maintenance
        .filter(
          (record) =>
            Number(record.equipmentId) ===
            Number(item.id)
        )
        .sort(
          (a, b) =>
            new Date(b.date) -
            new Date(a.date)
        );

      const lastServiceDate =
        serviceRecords.length > 0
          ? serviceRecords[0].date
          : item.lastServiceDate;

      let nextServiceDate = null;
      let daysRemaining = null;

      if (
        lastServiceDate &&
        item.serviceIntervalDays
      ) {
        const nextDate = new Date(
          lastServiceDate
        );

        nextDate.setDate(
          nextDate.getDate() +
            Number(item.serviceIntervalDays)
        );

        nextDate.setHours(0, 0, 0, 0);

        const todayDate = new Date();

        todayDate.setHours(0, 0, 0, 0);

        const difference =
          nextDate.getTime() -
          todayDate.getTime();

        daysRemaining = Math.ceil(
          difference /
            (1000 * 60 * 60 * 24)
        );

        nextServiceDate = nextDate;
      }

      let serviceStatus = "OK";

      if (
        daysRemaining !== null &&
        daysRemaining < 0
      ) {
        serviceStatus = "Overdue";
      } else if (
        daysRemaining !== null &&
        daysRemaining <= 7
      ) {
        serviceStatus = "Due in 7 days";
      }

      return {
        ...item,
        nextServiceDate,
        daysRemaining,
        serviceStatus,
      };
    });

  // =====================================================
  // 6. Equipment - Overdue Service
  // =====================================================

  equipmentWithServiceInfo
    .filter(
      (item) =>
        item.serviceStatus === "Overdue"
    )
    .forEach((item) => {
      alerts.push({
        id: `equipment-overdue-${item.id}`,
        type: "danger",
        icon: "bi-tools",
        title: "Equipment service overdue",
        message: `${item.name} is overdue for service.`,
      });
    });

  // =====================================================
  // 7. Equipment - Due Within 7 Days
  // =====================================================

  equipmentWithServiceInfo
    .filter(
      (item) =>
        item.serviceStatus ===
        "Due in 7 days"
    )
    .forEach((item) => {
      alerts.push({
        id: `equipment-due-${item.id}`,
        type: "warning",
        icon: "bi-wrench-adjustable",
        title: "Equipment service due",
        message: `${item.name} is due for service within 7 days.`,
      });
    });

  // =====================================================
  // 8. Equipment - Under Repair
  // =====================================================

  equipment
    .filter(
      (item) =>
        item.status === "Under Repair"
    )
    .forEach((item) => {
      alerts.push({
        id: `equipment-repair-${item.id}`,
        type: "warning",
        icon: "bi-tools",
        title: "Equipment under repair",
        message: `${item.name} is currently under repair.`,
      });
    });

  // =====================================================
  // Show maximum 5 alerts
  // =====================================================

  const visibleAlerts = alerts.slice(0, 5);

  return (
    <div className="dashboard-card">

      <div className="dashboard-card-header">

        <div>
          <h5>Alerts</h5>

          <p>
            Important farm notifications
          </p>
        </div>

        <span className="dashboard-card-icon">
          <i className="bi bi-bell"></i>
        </span>

      </div>

      {visibleAlerts.length === 0 ? (
        <div className="empty-state">

          <i className="bi bi-check-circle"></i>

          <p>
            No active alerts.
          </p>

        </div>
      ) : (
        <div className="alerts-list">

          {visibleAlerts.map(
            (alert) => (
              <div
                className={`alert-item alert-${alert.type}`}
                key={alert.id}
              >

                <div className="alert-icon">

                  <i
                    className={`bi ${alert.icon}`}
                  ></i>

                </div>

                <div>

                  <h6>
                    {alert.title}
                  </h6>

                  <p>
                    {alert.message}
                  </p>

                </div>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
};

export default AlertsPanel;