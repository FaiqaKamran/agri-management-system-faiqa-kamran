import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addExpense,
  updateExpense,
} from "../../store/reducers/expensesReducer";

const ExpenseForm = ({ editingExpense, onClose }) => {
  const dispatch = useDispatch();

  const crops = useSelector((state) => state.crops);

  const [formData, setFormData] = useState({
    category: "",
    cropId: "",
    amount: "",
    date: "",
    notes: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        category: editingExpense.category || "",
        cropId: editingExpense.cropId || "",
        amount: editingExpense.amount || "",
        date: editingExpense.date || "",
        notes: editingExpense.notes || "",
      });
    } else {
      setFormData({
        category: "",
        cropId: "",
        amount: "",
        date: "",
        notes: "",
      });
    }

    setError("");
  }, [editingExpense]);

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

    if (!formData.category) {
      setError("Please select an expense category.");
      return;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    if (!formData.date) {
      setError("Expense date is required.");
      return;
    }

    const expenseData = {
      ...formData,
      amount: Number(formData.amount),
      notes: formData.notes.trim(),
    };

    if (editingExpense) {
      dispatch(
        updateExpense({
          id: editingExpense.id,
          data: expenseData,
        })
      );
    } else {
      dispatch(addExpense(expenseData));
    }

    onClose();
  };

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="mb-1">
              {editingExpense
                ? "Edit Expense"
                : "Add Expense"}
            </h5>

            <p className="text-muted small mb-0">
              Record farm operating expenses.
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
                Category
              </label>

              <select
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">
                  Select category
                </option>

                <option value="Seeds">
                  Seeds
                </option>

                <option value="Fertilizer">
                  Fertilizer
                </option>

                <option value="Pesticide">
                  Pesticide
                </option>

                <option value="Labor">
                  Labor
                </option>

                <option value="Fuel">
                  Fuel
                </option>

                <option value="Equipment">
                  Equipment
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
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
                  General Farm Expense
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
                Amount (PKR)
              </label>

              <input
                type="number"
                name="amount"
                className="form-control"
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Date
              </label>

              <input
                type="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label className="form-label">
                Notes
              </label>

              <textarea
                name="notes"
                className="form-control"
                rows="3"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add optional notes..."
              ></textarea>
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

                {editingExpense
                  ? "Update Expense"
                  : "Save Expense"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;