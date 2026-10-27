import React, {
  useMemo,
  useState,
} from "react";

import { useSelector } from "react-redux";

import InventoryForm from "../components/inventory/Inventoryform";
import InventoryTable from "../components/inventory/InventoryTable";

import {
  selectLowStock,
  selectTotalInventoryItems,
} from "../store/selectors/inventorySelectors";

const Inventory = () => {
  const inventory = useSelector(
    (state) => state.inventory
  );

  const lowStockItems = useSelector(
    selectLowStock
  );

  const totalItems = useSelector(
    selectTotalInventoryItems
  );

  const [showForm, setShowForm] =
    useState(false);

  const [editingItem, setEditingItem] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const filteredItems = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return inventory.filter((item) => {
      const matchesSearch =
        !searchValue ||
        item.item
          ?.toLowerCase()
          .includes(searchValue) ||
        item.category
          ?.toLowerCase()
          .includes(searchValue) ||
        item.supplier
          ?.toLowerCase()
          .includes(searchValue);

      const matchesCategory =
        categoryFilter === "All" ||
        item.category === categoryFilter;

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [
    inventory,
    search,
    categoryFilter,
  ]);

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  return (
    <div>
      <div className="page-heading d-flex justify-content-between align-items-center">
        <div>
          <h1>Inventory</h1>

          <p>
            Manage farm inputs, stock levels and usage.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-success"
          onClick={handleAdd}
        >
          <i className="bi bi-plus-lg me-2"></i>
          Add Inventory
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-xl-4 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">
                    Total Items
                  </p>

                  <h3 className="mb-0">
                    {totalItems}
                  </h3>
                </div>

                <i className="bi bi-box-seam fs-2 text-primary"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">
                    Low Stock
                  </p>

                  <h3 className="mb-0 text-danger">
                    {lowStockItems.length}
                  </h3>
                </div>

                <i className="bi bi-exclamation-triangle fs-2 text-danger"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1">
                    Categories
                  </p>

                  <h3 className="mb-0">
                    {new Set(
                      inventory.map(
                        (item) =>
                          item.category
                      )
                    ).size}
                  </h3>
                </div>

                <i className="bi bi-grid fs-2 text-success"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {lowStockItems.length > 0 && (
        <div className="alert alert-warning d-flex align-items-start mb-4">
          <i className="bi bi-exclamation-triangle-fill me-3 fs-5"></i>

          <div>
            <strong>
              Low Stock Alert
            </strong>

            <div className="small mt-1">
              {lowStockItems.length} inventory{" "}
              {lowStockItems.length === 1
                ? "item is"
                : "items are"}{" "}
              at or below the minimum quantity.
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <InventoryForm
          editingItem={editingItem}
          onClose={handleClose}
        />
      )}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-lg-8">
              <label className="form-label">
                Search Inventory
              </label>

              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search item, category or supplier..."
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

      <InventoryTable
        items={filteredItems}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default Inventory;