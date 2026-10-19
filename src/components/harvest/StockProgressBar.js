import React from "react";

const StockProgressBar = ({ crops }) => {
  const totalHarvest = crops.reduce(
    (sum, crop) =>
      sum + Number(crop.harvestQty || 0),
    0
  );

  const totalSold = crops.reduce(
    (sum, crop) =>
      sum + Number(crop.soldQty || 0),
    0
  );

  const percentage =
    totalHarvest > 0
      ? Math.round(
          (totalSold / totalHarvest) * 100
        )
      : 0;

  const remaining =
    totalHarvest - totalSold;

  return (
    <div className="summary-card stock-card">
      <div className="summary-icon stock">
        <i className="bi bi-box-seam"></i>
      </div>

      <div className="stock-content">
        <span>Available Stock</span>

        <h3>
          {remaining.toLocaleString()} kg
        </h3>

        <div className="stock-progress">
          <div
            className="progress"
          >
            <div
              className="progress-bar"
              style={{
                width: `${percentage}%`,
              }}
            ></div>
          </div>

          <small>
            {percentage}% sold
          </small>
        </div>
      </div>
    </div>
  );
};

export default StockProgressBar;