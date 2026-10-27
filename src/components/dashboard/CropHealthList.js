import { useSelector } from "react-redux";

const CropHealthList = () => {
  const crops = useSelector((state) => state.crops);

  if (!crops || crops.length === 0) {
    return (
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <div>
            <h5>Crop Health</h5>
            <p>Current health status of your crops</p>
          </div>
        </div>

        <div className="empty-state">
          <i className="bi bi-flower1"></i>
          <p>No crops available.</p>
        </div>
      </div>
    );
  }

  const getHealthClass = (score) => {
    if (score >= 80) return "healthy";
    if (score >= 60) return "attention";
    return "critical";
  };

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <div>
          <h5>Crop Health</h5>
          <p>Current health status of your crops</p>
        </div>

        <span className="dashboard-card-icon">
          <i className="bi bi-heart-pulse"></i>
        </span>
      </div>

      <div className="crop-health-list">
        {crops.map((crop) => {
          const score = Number(crop.healthScore || 0);

          return (
            <div className="crop-health-item" key={crop.id}>
              <div className="crop-health-info">
                <div>
                  <h6>{crop.name}</h6>
                  <span>{crop.field || "Farm Field"}</span>
                </div>

                <strong>{score}%</strong>
              </div>

              <div className="health-progress">
                <div
                  className={`health-progress-bar ${getHealthClass(score)}`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>

              <div className="crop-health-footer">
                <span>{crop.status || "Not specified"}</span>
                <span>
                  {score >= 80
                    ? "Good condition"
                    : score >= 60
                    ? "Needs attention"
                    : "Critical"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CropHealthList;