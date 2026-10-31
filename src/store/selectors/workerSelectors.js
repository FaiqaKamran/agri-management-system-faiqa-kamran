export const selectWorkers = (state) =>
  state.workers || [];

export const selectActiveWorkers = (state) =>
  (state.workers || []).filter(
    (worker) => worker.status === "Active"
  );

export const selectInactiveWorkers = (state) =>
  (state.workers || []).filter(
    (worker) => worker.status === "Inactive"
  );

export const selectTotalWorkers = (state) =>
  (state.workers || []).length;

export const selectActiveWorkerCount = (state) =>
  (state.workers || []).filter(
    (worker) => worker.status === "Active"
  ).length;