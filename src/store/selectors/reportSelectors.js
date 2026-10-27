export const selectReportData = (state) => {
  const crops = state.crops || [];
  const orders = state.orders || [];
  const expenses = state.expenses || [];

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

  const totalExpenses = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount || 0),
    0
  );

  const totalRevenue = orders.reduce(
    (sum, order) =>
      sum +
      Number(
        order.totalAmount ||
          order.revenue ||
          0
      ),
    0
  );

  const profitLoss =
    totalRevenue - totalExpenses;

  return {
    totalHarvest,
    totalSold,
    totalExpenses,
    totalRevenue,
    profitLoss,
    totalOrders: orders.length,
    totalCrops: crops.length,
  };
};

export const selectMonthlyExpenses = (
  state,
  month
) => {
  const expenses = state.expenses || [];

  return expenses.filter((expense) => {
    if (!expense.date) return false;

    return expense.date.startsWith(month);
  });
};

export const selectMonthlyOrders = (
  state,
  month
) => {
  const orders = state.orders || [];

  return orders.filter((order) => {
    if (!order.orderDate) return false;

    return order.orderDate.startsWith(month);
  });
};

export const selectActivityLog = (state) =>
  state.activity || [];