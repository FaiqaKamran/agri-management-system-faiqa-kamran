import React from "react";
import { useDispatch } from "react-redux";

import {
  removeExpense,
} from "../../store/reducers/expensesReducer";

const ExpenseTable = ({
  expenses,
  onEdit,
}) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (confirmed) {
      dispatch(removeExpense(id));
    }
  };

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString(
      "en-PK"
    );
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-PK",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  if (expenses.length === 0) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body text-center py-5">
          <i className="bi bi-wallet2 fs-1 text-muted"></i>

          <h5 className="mt-3">
            No expenses found
          </h5>

          <p className="text-muted mb-0">
            Add your first farm expense to get started.
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
                <th>Category</th>
                <th>Crop</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Notes</th>
                <th className="text-end">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>
                    <span className="badge bg-light text-dark border">
                      {expense.category}
                    </span>
                  </td>

                  <td>
                    {expense.cropName ||
                      "General Farm"}
                  </td>

                  <td>
                    <strong>
                      PKR{" "}
                      {formatAmount(
                        expense.amount
                      )}
                    </strong>
                  </td>

                  <td>
                    {formatDate(expense.date)}
                  </td>

                  <td>
                    <span className="text-muted">
                      {expense.notes || "-"}
                    </span>
                  </td>

                  <td>
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        title="Edit"
                        onClick={() =>
                          onEdit(expense)
                        }
                      >
                        <i className="bi bi-pencil"></i>
                      </button>

                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        title="Delete"
                        onClick={() =>
                          handleDelete(expense.id)
                        }
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td
                  colSpan="2"
                  className="text-end fw-semibold"
                >
                  Total
                </td>

                <td
                  colSpan="4"
                  className="fw-bold"
                >
                  PKR{" "}
                  {formatAmount(
                    expenses.reduce(
                      (sum, expense) =>
                        sum +
                        Number(
                          expense.amount || 0
                        ),
                      0
                    )
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTable;