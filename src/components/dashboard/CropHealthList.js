import { useContext } from "react";
import AppContext from "../../context/AppContext";
import StatusBadge from "../common/StatusBadge";

const CropHealthList = () => {
  const { crops } = useContext(AppContext);

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <div>
          <h5>Crop Health</h5>
          <p>Current health status of crops</p>
        </div>
      </div>

      {crops.length === 0 ? (
        <div className="empty-state">
          <i className="bi bi-tree"></i>
          <p>No crops available.</p>
        </div>
      ) : (
        <div className="crop-health-list">
          {crops.map((crop) => (
            <div
              className="crop-health-item"
              key={crop.id}
            >
              <div className="crop-health-icon">
                <i className="bi bi-tree"></i>
              </div>

              <div className="crop-health-info">
                <div className="d-flex justify-content-between">
                  <strong>{crop.name}</strong>

                  <span>
                    {crop.healthScore}%
                  </span>
                </div>

                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${crop.healthScore}%`,
                    }}
                  ></div>
                </div>

                <StatusBadge status={crop.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CropHealthList;