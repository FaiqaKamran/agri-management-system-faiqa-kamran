import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addTask,
  updateTask,
} from "../../store/reducers/tasksReducer";

const TaskForm = ({ editingTask, onClose }) => {
  const dispatch = useDispatch();

  const crops = useSelector((state) => state.crops);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cropId: "",
    assignee: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        cropId: editingTask.cropId || "",
        assignee: editingTask.assignee || "",
        dueDate: editingTask.dueDate || "",
        priority: editingTask.priority || "Medium",
        status: editingTask.status || "Pending",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        cropId: "",
        assignee: "",
        dueDate: "",
        priority: "Medium",
        status: "Pending",
      });
    }

    setError("");
  }, [editingTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!formData.title.trim()) {
      setError("Task title is required.");
      return;
    }

    if (!formData.assignee.trim()) {
      setError("Assignee is required.");
      return;
    }

    if (!formData.dueDate) {
      setError("Due date is required.");
      return;
    }

    const taskData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      assignee: formData.assignee.trim(),
    };

    if (editingTask) {
      dispatch(
        updateTask({
          id: editingTask.id,
          data: taskData,
        })
      );
    } else {
      dispatch(addTask(taskData));
    }

    onClose();
  };

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="mb-1">
              {editingTask
                ? "Edit Farm Task"
                : "Create Farm Task"}
            </h5>

            <p className="text-muted mb-0 small">
              Add and manage farm activities.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-light"
            onClick={onClose}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">
                Task Title
              </label>

              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Apply fertilizer"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Assignee
              </label>

              <input
                type="text"
                name="assignee"
                className="form-control"
                value={formData.assignee}
                onChange={handleChange}
                placeholder="Enter assignee name"
              />
            </div>

            <div className="col-12">
              <label className="form-label">
                Description
              </label>

              <textarea
                name="description"
                className="form-control"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the farm activity..."
              ></textarea>
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Crop
              </label>

              <select
                name="cropId"
                className="form-select"
                value={formData.cropId}
                onChange={handleChange}
              >
                <option value="">
                  Select crop
                </option>

                {crops.map((crop) => (
                  <option
                    key={crop.id}
                    value={crop.id}
                  >
                    {crop.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Due Date
              </label>

              <input
                type="date"
                name="dueDate"
                className="form-control"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Priority
              </label>

              <select
                name="priority"
                className="form-select"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Status
              </label>

              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">
                  In Progress
                </option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div className="col-12 d-flex justify-content-end gap-2 mt-3">
              <button
                type="button"
                className="btn btn-light"
                onClick={onClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-success"
              >
                <i className="bi bi-check-lg me-2"></i>

                {editingTask
                  ? "Update Task"
                  : "Create Task"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;