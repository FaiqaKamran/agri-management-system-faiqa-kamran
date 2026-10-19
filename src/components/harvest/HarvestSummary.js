import React from "react";

const HarvestSummary = ({ crops }) => {
  const totalHarvest = crops.reduce(
    (sum, crop) =>
      sum + Number(crop.harvestQty || 0),
    0
  );

  return (
    <div className="summary-card">
      <div className="summary-icon">
        <i className="bi bi-basket"></i>
      </div>

      <div>
        <span>Total Harvest</span>

        <h3>
          {totalHarvest.toLocaleString()} kg
        </h3>

        <small>
          From {crops.length} registered crops
        </small>
      </div>
    </div>
  );
};

export default HarvestSummary;