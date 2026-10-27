import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ProfitLossChart = ({
  expenses,
  revenue,
}) => {
  const chartData = useMemo(() => {
    const monthlyExpenses = {};

    expenses.forEach((expense) => {
      if (!expense.date) return;

      const month = new Date(
        expense.date
      ).toLocaleDateString("en-US", {
        month: "short",
      });

      monthlyExpenses[month] =
        (monthlyExpenses[month] || 0) +
        Number(expense.amount || 0);
    });

    const currentMonth = new Date().toLocaleDateString(
      "en-US",
      {
        month: "short",
      }
    );

    const currentExpenses =
      monthlyExpenses[currentMonth] || 0;

    return [
      {
        name: currentMonth,
        Revenue: Number(revenue || 0),
        Expenses: currentExpenses,
        Profit: Number(revenue || 0) - currentExpenses,
      },
    ];
  }, [expenses, revenue]);

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <div className="mb-3">
          <h5 className="mb-1">
            Profit & Loss
          </h5>

          <p className="text-muted small mb-0">
            Current period revenue and expenses.
          </p>
        </div>

        <div
          style={{
            width: "100%",
            height: 300,
          }}
        >
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="Revenue"
                fill="#198754"
                radius={[5, 5, 0, 0]}
              />

              <Bar
                dataKey="Expenses"
                fill="#dc3545"
                radius={[5, 5, 0, 0]}
              />

              <Bar
                dataKey="Profit"
                fill="#0d6efd"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProfitLossChart;