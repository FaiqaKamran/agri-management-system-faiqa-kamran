export const selectTasks = (state) => state.tasks;

export const selectPendingTasks = (state) =>
  state.tasks.filter(
    (task) => task.status === "Pending"
  );

export const selectInProgressTasks = (state) =>
  state.tasks.filter(
    (task) => task.status === "In Progress"
  );

export const selectCompletedTasks = (state) =>
  state.tasks.filter(
    (task) => task.status === "Done"
  );

export const selectOverdueTasks = (state) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return state.tasks.filter((task) => {
    if (task.status === "Done") return false;

    if (!task.dueDate) return false;

    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    return dueDate < today;
  });
};

export const selectTodayTasks = (state) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return state.tasks.filter((task) => {
    if (task.status === "Done") return false;

    if (!task.dueDate) return false;

    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    return dueDate.getTime() === today.getTime();
  });
};