import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";

const Tasks = () => {
  const tasks = useSelector((state) => state.tasks);
  const crops = useSelector((state) => state.crops);

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const tasksWithCropNames = useMemo(() => {
    return tasks.map((task) => {
      const crop = crops.find(
        (item) =>
          Number(item.id) === Number(task.cropId)
      );

      return {
        ...task,
        cropName: crop?.name || "-",
      };
    });
  }, [tasks, crops]);

  const filteredTasks = useMemo(() => {
    return tasksWithCropNames.filter((task) => {
      const searchValue = search
        .trim()
        .toLowerCase();

      const matchesSearch =
        !searchValue ||
        task.title
          ?.toLowerCase()
          .includes(searchValue) ||
        task.description
          ?.toLowerCase()
          .includes(searchValue) ||
        task.assignee
          ?.toLowerCase()
          .includes(searchValue) ||
        task.cropName
          ?.toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        task.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    tasksWithCropNames,
    search,
    statusFilter,
    priorityFilter,
  ]);

  const pendingCount = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progressCount = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedCount = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const overdueCount = tasks.filter((task) => {
    if (task.status === "Done" || !task.dueDate) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    return dueDate < today;
  }).length;

  const handleAdd = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div>
      <div className="page-heading d-flex justify-content-between align-items-center">
        <div>
          <h1>Farm Tasks</h1>

          <p>
            Schedule and monitor daily farm activities.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-success"
          onClick={handleAdd}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Task
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <p className="text-muted mb-1">
                    Pending
                  </p>

                  <h3 className="mb-0">
                    {pendingCount}
                  </h3>
                </div>

                <i className="bi bi-hourglass-split fs-2 text-warning"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <p className="text-muted mb-1">
                    In Progress
                  </p>

                  <h3 className="mb-0">
                    {progressCount}
                  </h3>
                </div>

                <i className="bi bi-arrow-repeat fs-2 text-primary"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <p className="text-muted mb-1">
                    Completed
                  </p>

                  <h3 className="mb-0">
                    {completedCount}
                  </h3>
                </div>

                <i className="bi bi-check-circle fs-2 text-success"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <p className="text-muted mb-1">
                    Overdue
                  </p>

                  <h3 className="mb-0">
                    {overdueCount}
                  </h3>
                </div>

                <i className="bi bi-exclamation-triangle fs-2 text-danger"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <TaskForm
          editingTask={editingTask}
          onClose={handleClose}
        />
      )}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-lg-6">
              <label className="form-label">
                Search Tasks
              </label>

              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by task, crop or assignee..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                />
              </div>
            </div>

            <div className="col-lg-3">
              <label className="form-label">
                Status
              </label>

              <select
                className="form-select"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
              >
                <option value="All">
                  All Statuses
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Done">
                  Done
                </option>
              </select>
            </div>

            <div className="col-lg-3">
              <label className="form-label">
                Priority
              </label>

              <select
                className="form-select"
                value={priorityFilter}
                onChange={(event) =>
                  setPriorityFilter(event.target.value)
                }
              >
                <option value="All">
                  All Priorities
                </option>

                <option value="High">
                  High
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Low">
                  Low
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <TaskList
        tasks={filteredTasks}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default Tasks;