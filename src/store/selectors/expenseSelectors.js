export const selectExpenses = (
  state
) => state.expenses || [];

export const selectTotalExpenses = (
  state
) =>
  (state.expenses || []).reduce(
    (total, expense) =>
      total +
      Number(expense.amount || 0),
    0
  );

export const selectExpensesByCategory = (
  state,
  category
) =>
  (state.expenses || []).filter(
    (expense) =>
      expense.category === category
  );

export const selectExpensesByCrop = (
  state,
  cropId
) =>
  (state.expenses || []).filter(
    (expense) =>
      String(expense.cropId) ===
      String(cropId)
  );