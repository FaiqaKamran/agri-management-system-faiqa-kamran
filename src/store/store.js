import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer";

import persistMiddleware from "./middleware/persistMiddleware";
import activityLogger from "./middleware/activityLogger";

import { readStorage } from "../api/storageApi";

const loadState = () => {
  const savedState = {};

  const crops = readStorage("agri_crops", null);
  const orders = readStorage("agri_orders", null);
  const buyers = readStorage("agri_buyers", null);
  const tasks = readStorage("agri_tasks", null);
  const expenses = readStorage("agri_expenses", null);
  const inventory = readStorage("agri_inventory", null);
  const activity = readStorage("agri_activity", null);
  const session = readStorage("agri_session", null);

  if (crops !== null) {
    savedState.crops = crops;
  }

  if (orders !== null) {
    savedState.orders = orders;
  }

  if (buyers !== null) {
    savedState.buyers = buyers;
  }

  if (tasks !== null) {
    savedState.tasks = tasks;
  }

  if (expenses !== null) {
    savedState.expenses = expenses;
  }

  if (inventory !== null) {
    savedState.inventory = inventory;
  }

  if (activity !== null) {
    savedState.activity = activity;
  }

  /*
    Only restore auth if a valid saved session exists.
    Otherwise authReducer will use its normal initial state.
  */

  if (session !== null) {
    savedState.auth = session;
  }

  return Object.keys(savedState).length > 0
    ? savedState
    : undefined;
};

const preloadedState = loadState();

const store = configureStore({
  reducer: rootReducer,

  preloadedState,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      persistMiddleware,
      activityLogger
    ),

  devTools: true,
});

export default store;