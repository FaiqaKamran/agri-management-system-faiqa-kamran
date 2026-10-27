import React from "react";
import { useDispatch } from "react-redux";

import {
  completeTask,
  removeTask,
} from "../../store/reducers/tasksReducer";

const TaskList = ({ tasks, onEdit }) => {
  const dispatch = useDispatch();

  const getPriorityClass = (priority) => {
    if (priority === "High") return "bg-danger";
    if (priority === "Medium") return "bg-warning text-dark";
    return "bg-success";
  };

  const getStatusClass = (status) => {
    if (status === "Done") return "bg-success";
    if (status === "In Progress") return "bg-primary";
    return "bg-secondary";
  };

  const isOverdue = (task) => {
    if (!task.dueDate || task.status === "Done") {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    return dueDate < today;
  };

  if (tasks.length === 0) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body text-center py-5">
          <i className="bi bi-list-check fs-1 text-muted"></i>

          <h5 className="mt-3">
            No tasks found
          </h5>

          <p className="text-muted mb-0">
            Create a farm task to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Task</th>
                <th>Crop</th>
                <th>Assignee</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th className="text-end">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <div>
                      <strong>{task.title}</strong>

                      {task.description && (
                        <div className="small text-muted mt-1">
                          {task.description}
                        </div>
                      )}

                      {isOverdue(task) && (
                        <span className="badge bg-danger mt-1">
                          Overdue
                        </span>
                      )}
                    </div>
                  </td>

                  <td>
                    {task.cropName || "-"}
                  </td>

                  <td>
                    {task.assignee}
                  </td>

                  <td>
                    {task.dueDate
                      ? new Date(
                          task.dueDate
                        ).toLocaleDateString(
                          "en-PK",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "-"}
                  </td>

                  <td>
                    <span
                      className={`badge ${getPriorityClass(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`badge ${getStatusClass(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                  </td>

                  <td>
                    <div className="d-flex justify-content-end gap-2">
                      {task.status !== "Done" && (
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-success"
                          title="Mark as done"
                          onClick={() =>
                            dispatch(
                              completeTask(task.id)
                            )
                          }
                        >
                          <i className="bi bi-check-lg"></i>
                        </button>
                      )}

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        title="Edit"
                        onClick={() => onEdit(task)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        title="Delete"
                        onClick={() => {
                          const confirmed =
                            window.confirm(
                              "Are you sure you want to delete this task?"
                            );

                          if (confirmed) {
                            dispatch(
                              removeTask(task.id)
                            );
                          }
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskList;