import React from "react";

const ActivityLog = ({
  activities,
}) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return "-";

    return new Date(
      timestamp
    ).toLocaleString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAction = (action) => {
    if (!action) return "-";

    const parts =
      action.split("/");

    if (parts.length < 2) {
      return action;
    }

    const entity = parts[0];
    const operation = parts[1];

    return `${operation} ${entity}`;
  };

  if (!activities.length) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body text-center py-5">
          <i className="bi bi-clock-history fs-1 text-muted"></i>

          <h5 className="mt-3">
            No activity yet
          </h5>

          <p className="text-muted mb-0">
            User actions will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-0">
        <div className="p-4 border-bottom">
          <h5 className="mb-1">
            Activity Log
          </h5>

          <p className="text-muted small mb-0">
            Recent add, update and delete actions.
          </p>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Entity</th>
                <th>Date & Time</th>
              </tr>
            </thead>

            <tbody>
              {activities.map(
                (activity) => (
                  <tr key={activity.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="activity-avatar me-2">
                          {(
                            activity.user ||
                            "S"
                          )
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <strong>
                          {activity.user ||
                            "System"}
                        </strong>
                      </div>
                    </td>

                    <td>
                      <span className="badge bg-light text-dark border">
                        {formatAction(
                          activity.action
                        )}
                      </span>
                    </td>

                    <td>
                      {activity.entity ||
                        "-"}
                    </td>

                    <td className="text-muted">
                      {formatDate(
                        activity.timestamp
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;