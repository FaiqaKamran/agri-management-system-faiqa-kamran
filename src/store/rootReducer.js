import { combineReducers } from "@reduxjs/toolkit";
import equipmentReducer from "./reducers/equipmentReducer";
import maintenanceReducer from "./reducers/maintenanceReducer";
import cropsReducer from "./reducers/cropsReducer";
import ordersReducer from "./reducers/ordersReducer";
import buyersReducer from "./reducers/buyersReducer";
import weatherReducer from "./reducers/weatherReducer";
import tasksReducer from "./reducers/tasksReducer";
import expensesReducer from "./reducers/expensesReducer";
import inventoryReducer from "./reducers/inventoryReducer";
import authReducer from "./reducers/authReducer";
import alertsReducer from "./reducers/alertsReducer";
import activityReducer from "./reducers/activityReducer";
import uiReducer from "./reducers/uiReducer";
import workersReducer from "./reducers/workersReducer";
import attendanceReducer from "./reducers/attendanceReducer";
const rootReducer = combineReducers({
  crops: cropsReducer,
  orders: ordersReducer,
  buyers: buyersReducer,
  weather: weatherReducer,
  tasks: tasksReducer,
  expenses: expensesReducer,
  inventory: inventoryReducer,
  auth: authReducer,
  alerts: alertsReducer,
  activity: activityReducer,
  ui: uiReducer,
  workers: workersReducer,
  attendance: attendanceReducer,
  equipment: equipmentReducer,
  maintenance: maintenanceReducer,
});

export default rootReducer;