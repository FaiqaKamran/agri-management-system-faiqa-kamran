import { useSelector } from "react-redux";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const CropHealthChart = () => {
  const crops = useSelector((state) => state.crops);

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
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <div>
          <h5>Crop Health Distribution</h5>
          <p>Overall health condition of your crops</p>
        </div>

        <span className="dashboard-card-icon">
          <i className="bi bi-pie-chart"></i>
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: "300px",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={50}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CropHealthChart;