export const selectDashboardStats = (state) => {
  const crops = state.crops || [];
  const orders = state.orders || [];
  const tasks = state.tasks || [];
  const expenses = state.expenses || [];
  const inventory = state.inventory || [];

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

  const totalExpenses = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount || 0),
    0
  );

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) =>
      task.status === "In Progress"
  ).length;

  const lowStockItems = inventory.filter(
    (item) =>
      Number(item.quantity || 0) <=
      Number(item.minimumQuantity || 0)
  ).length;

  const profitLoss =
    totalRevenue - totalExpenses;

  return {
    totalHarvest,
    totalSold,
    totalRevenue,
    totalExpenses,
    profitLoss,
    pendingTasks,
    inProgressTasks,
    lowStockItems,
    totalOrders: orders.length,
    totalCrops: crops.length,
  };
};