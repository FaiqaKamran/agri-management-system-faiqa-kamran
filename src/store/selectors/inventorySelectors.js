export const selectInventory = (state) =>
  state.inventory;

export const selectLowStock = (state) =>
  state.inventory.filter(
    (item) =>
      Number(item.quantity || 0) <=
      Number(item.minimumQuantity || 0)
  );

export const selectLowStockCount = (state) =>
  state.inventory.filter(
    (item) =>
      Number(item.quantity || 0) <=
      Number(item.minimumQuantity || 0)
  ).length;

export const selectInventoryByCategory = (
  state,
  category
) =>
  state.inventory.filter(
    (item) => item.category === category
  );

export const selectTotalInventoryItems = (
  state
) => state.inventory.length;

export const selectInventoryValue = (state) =>
  state.inventory.reduce(
    (total, item) =>
      total +
      Number(item.quantity || 0),
    0
  );