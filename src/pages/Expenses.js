import React, {
  useMemo,
  useState,
} from "react";

import { useSelector } from "react-redux";

import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseTable from "../components/expenses/ExpenseTable";
import ProfitLossChart from "../components/expenses/ProfitLossChart";

const Expenses = () => {
  const expenses = useSelector(
    (state) => state.expenses
  );

  const crops = useSelector(
    (state) => state.crops
  );

  const orders = useSelector(
    (state) => state.orders
  );

  const [showForm, setShowForm] =
    useState(false);

  const [editingExpense, setEditingExpense] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const expensesWithCropNames = useMemo(() => {
    return expenses.map((expense) => {
      const crop = crops.find(
        (item) =>
          Number(item.id) ===
          Number(expense.cropId)
      );

      return {
        ...expense,
        cropName: crop?.name || null,
      };
    });
  }, [expenses, crops]);

  const filteredExpenses = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return expensesWithCropNames.filter(
      (expense) => {
        const matchesSearch =
          !searchValue ||
          expense.category
            ?.toLowerCase()
            .includes(searchValue) ||
          expense.cropName
            ?.toLowerCase()
            .includes(searchValue) ||
          expense.notes
            ?.toLowerCase()
            .includes(searchValue);

        const matchesCategory =
          categoryFilter === "All" ||
          expense.category === categoryFilter;

        return (
          matchesSearch &&
          matchesCategory
        );
      }
    );
  }, [
    expensesWithCropNames,
    search,
    categoryFilter,
  ]);

  const totalExpenses = useMemo(() => {
    return expenses.reduce(
      (sum, expense) =>
        sum + Number(expense.amount || 0),
      0
    );
  }, [expenses]);

  /*
   * Existing order records contain quantity,
   * but they currently do not contain a price.
   *
   * Therefore, revenue is calculated only from
   * orders that contain a totalAmount/revenue field.
   */
  const totalRevenue = useMemo(() => {
    return orders.reduce(
      (sum, order) =>
        sum +
        Number(
          order.totalAmount ||
            order.revenue ||
            0
        ),
      0
    );
  }, [orders]);

  const profitLoss =
    totalRevenue - totalExpenses;

  const handleAdd = () => {
    setEditingExpense(null);
    setShowForm(true);
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingExpense(null);
  };

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString(
      "en-PK"
    );
  };

  return (
    <div>
      <div className="page-heading d-flex justify-content-between align-items-center">
        <div>
          <h1>Expenses & Profit/Loss</h1>

          <p>
            Track farm expenses and monitor financial performance.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-success"
          onClick={handleAdd}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Expense
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-xl-4 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <p className="text-muted mb-1">
                    Total Revenue
                  </p>

                  <h3 className="mb-0">
                    PKR{" "}
                    {formatAmount(
                      totalRevenue
                    )}
                  </h3>
                </div>

                <i className="bi bi-graph-up-arrow fs-2 text-success"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <p className="text-muted mb-1">
                    Total Expenses
                  </p>

                  <h3 className="mb-0">
                    PKR{" "}
                    {formatAmount(
                      totalExpenses
                    )}
                  </h3>
                </div>

                <i className="bi bi-wallet2 fs-2 text-danger"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <p className="text-muted mb-1">
                    {profitLoss >= 0
                      ? "Profit"
                      : "Loss"}
                  </p>

                  <h3
                    className={
                      profitLoss >= 0
                        ? "mb-0 text-success"
                        : "mb-0 text-danger"
                    }
                  >
                    PKR{" "}
                    {formatAmount(
                      Math.abs(profitLoss)
                    )}
                  </h3>
                </div>

                <i
                  className={`bi ${
                    profitLoss >= 0
                      ? "bi-piggy-bank text-success"
                      : "bi-exclamation-circle text-danger"
                  } fs-2`}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <ExpenseForm
          editingExpense={editingExpense}
          onClose={handleClose}
        />
      )}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-lg-8">
              <label className="form-label">
                Search Expenses
              </label>

              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search category, crop or notes..."
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                />
              </div>
            </div>

            <div className="col-lg-4">
              <label className="form-label">
                Category
              </label>

              <select
                className="form-select"
                value={categoryFilter}
                onChange={(event) =>
                  setCategoryFilter(
                    event.target.value
                  )
                }
              >
                <option value="All">
                  All Categories
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
          </div>
        </div>
      </div>

      <div className="mb-4">
        <ExpenseTable
          expenses={filteredExpenses}
          onEdit={handleEdit}
        />
      </div>

      <ProfitLossChart
        expenses={expenses}
        revenue={totalRevenue}
      />
    </div>
  );
};

export default Expenses;