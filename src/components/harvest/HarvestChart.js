import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const HarvestChart = ({
  crops,
  orders,
}) => {
  const data = crops.map((crop) => {
    const soldFromOrders = orders
      .filter(
        (order) =>
          Number(order.cropId) ===
            Number(crop.id) &&
          order.status !== "Cancelled"
      )
      .reduce(
        (sum, order) =>
          sum + Number(order.quantity || 0),
        0
      );

    const sold = Math.max(
      Number(crop.soldQty || 0),
      soldFromOrders
    );

    return {
      name: crop.name,
      Harvest: Number(
        crop.harvestQty || 0
      ),
      Sales: sold,
    };
  });

  return (
    <div className="dashboard-card chart-card">
      <div className="card-header">
        <div>
          <h5>Harvest vs Sales</h5>
          <p>
            Production compared with sold quantity
          </p>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="empty-state py-5">
          <i className="bi bi-bar-chart"></i>
          <p>No harvest data available.</p>
        </div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="Harvest"
              name="Harvest"
              radius={[5, 5, 0, 0]}
            />

            <Bar
              dataKey="Sales"
              name="Sales"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default HarvestChart;