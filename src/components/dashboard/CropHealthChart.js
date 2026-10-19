import { useContext } from "react";
import AppContext from "../../context/AppContext";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CropHealthChart = () => {
  const { crops } = useContext(AppContext);

  const healthy = crops.filter(
    (crop) => crop.status === "Healthy"
  ).length;

  const needsAttention = crops.filter(
    (crop) => crop.status === "Needs Attention"
  ).length;

  const critical = crops.filter(
    (crop) => crop.status === "Critical"
  ).length;

  const data = [
    {
      name: "Healthy",
      value: healthy,
    },
    {
      name: "Needs Attention",
      value: needsAttention,
    },
    {
      name: "Critical",
      value: critical,
    },
  ];

  return (
    <div className="dashboard-card chart-card">
      <div className="card-header">
        <div>
          <h5>Crop Health Distribution</h5>
          <p>Overall crop condition</p>
        </div>
      </div>

      {crops.length === 0 ? (
        <div className="empty-state py-5">
          <i className="bi bi-pie-chart"></i>
          <p>No crop health data.</p>
        </div>
      ) : (
        <div className="health-chart-wrapper">
          <ResponsiveContainer
            width="100%"
            height={280}
          >
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={105}
                paddingAngle={4}
                dataKey="value"
              >
                <Cell />
                <Cell />
                <Cell />
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="chart-legend">
            {data.map((item) => (
              <div key={item.name}>
                <span
                  className={`legend-dot legend-${item.name
                    .toLowerCase()
                    .replace(" ", "-")}`}
                ></span>

                <span>{item.name}</span>

                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CropHealthChart;