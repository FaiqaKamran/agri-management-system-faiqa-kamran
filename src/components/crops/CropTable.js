import StatusBadge from "../common/StatusBadge";
import EmptyState from "../common/EmptyState";

import {
  formatDate,
  formatNumber,
} from "../../utils/formatters";

const CropTable = ({
  crops,
  onEdit,
  onDelete,
}) => {
  if (crops.length === 0) {
    return (
      <div className="dashboard-card">
        <EmptyState
          icon="bi-tree"
          title="No crops found"
          message="Try changing your search or add a new crop."
        />
      </div>
    );
  }

  return (
    <div className="dashboard-card table-card">
      <div className="card-header">
        <div>
          <h5>Crop Records</h5>
          <p>
            {crops.length} crop
            {crops.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr>
              <th>Crop</th>
              <th>Field</th>
              <th>Planting</th>
              <th>Cutting</th>
              <th>Health</th>
              <th>Harvest</th>
              <th>Sold</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {crops.map((crop) => {
              const remaining =
                Number(crop.harvestQty || 0) -
                Number(crop.soldQty || 0);

              return (
                <tr key={crop.id}>
                  <td>
                    <div className="table-primary">
                      <div className="table-icon">
                        <i className="bi bi-tree"></i>
                      </div>

                      <strong>{crop.name}</strong>
                    </div>
                  </td>

                  <td>{crop.field}</td>

                  <td>
                    {formatDate(
                      crop.plantingDate
                    )}
                  </td>

                  <td>
                    {formatDate(
                      crop.cuttingDate
                    )}
                  </td>

                  <td>
                    <div className="health-score">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{
                            width: `${crop.healthScore}%`,
                          }}
                        ></div>
                      </div>

                      <span>
                        {crop.healthScore}%
                      </span>
                    </div>
                  </td>

                  <td>
                    {formatNumber(
                      crop.harvestQty
                    )}{" "}
                    kg
                  </td>

                  <td>
                    {formatNumber(
                      crop.soldQty
                    )}{" "}
                    kg
                  </td>

                  <td>
                    <strong>
                      {formatNumber(remaining)} kg
                    </strong>
                  </td>

                  <td>
                    <StatusBadge
                      status={crop.status}
                    />
                  </td>

                  <td>
                    <div className="table-actions">
                      <button
                        className="action-btn edit"
                        onClick={() =>
                          onEdit(crop)
                        }
                        title="Edit"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>

                      <button
                        className="action-btn delete"
                        onClick={() =>
                          onDelete(crop.id)
                        }
                        title="Delete"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CropTable;