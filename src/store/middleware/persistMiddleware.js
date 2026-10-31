import { writeStorage } from "../../api/storageApi";

const persistMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Do not persist while Redux is loading saved data
  if (action.meta?.rehydrating) {
    return result;
  }

  const state = store.getState();

  writeStorage("agri_crops", state.crops);
  writeStorage("agri_orders", state.orders);
  writeStorage("agri_buyers", state.buyers);
  writeStorage("agri_tasks", state.tasks);
  writeStorage("agri_expenses", state.expenses);
  writeStorage("agri_inventory", state.inventory);

  writeStorage("agri_workers", state.workers);
  writeStorage("agri_attendance", state.attendance);
  writeStorage("agri_equipment", state.equipment);
  writeStorage("agri_maintenance", state.maintenance);

  writeStorage("agri_activity", state.activity);

  if (state.auth?.isAuthenticated) {
    writeStorage("agri_session", {
      user: state.auth.user,
      role: state.auth.role,
      isAuthenticated: true,
    });
  } else {
    localStorage.removeItem("agri_session");
  }

  return result;
};

export default persistMiddleware;