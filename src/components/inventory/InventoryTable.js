import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  removeInventoryItem,
  deductInventoryQuantity,
} from "../../store/reducers/inventoryReducer";

const InventoryTable = ({
  items,
  onEdit,
}) => {
  const dispatch = useDispatch();

  const [usageItem, setUsageItem] =
    useState(null);

  const [usageQuantity, setUsageQuantity] =
    useState("");

  const [usageError, setUsageError] =
    useState("");

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this inventory item?"
    );

    if (confirmed) {
      dispatch(removeInventoryItem(id));
    }
  };

  const openUsageModal = (item) => {
    setUsageItem(item);
    setUsageQuantity("");
    setUsageError("");
  };

  const closeUsageModal = () => {
    setUsageItem(null);
    setUsageQuantity("");
    setUsageError("");
  };

  const handleUsage = () => {
    const quantity = Number(
      usageQuantity
    );

    if (!quantity || quantity <= 0) {
      setUsageError(
        "Enter a valid quantity."
      );
      return;
    }

    if (
      quantity >
      Number(usageItem.quantity || 0)
    ) {
      setUsageError(
        `Only ${usageItem.quantity} ${usageItem.unit} available.`
      );
      return;
    }

    dispatch(
      deductInventoryQuantity({
        id: usageItem.id,
        quantity,
      })
    );

    closeUsageModal();
  };

  const isLowStock = (item) => {
    return (
      Number(item.quantity || 0) <=
      Number(item.minimumQuantity || 0)
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

  if (items.length === 0) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body text-center py-5">
          <i className="bi bi-box-seam fs-1 text-muted"></i>

          <h5 className="mt-3">
            No inventory items found
          </h5>

          <p className="text-muted mb-0">
            Add your first inventory item to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Minimum</th>
                  <th>Supplier</th>
                  <th>Purchase Date</th>
                  <th>Status</th>
                  <th className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => {
                  const lowStock =
                    isLowStock(item);

                  return (
                    <tr key={item.id}>
                      <td>
                        <strong>
                          {item.item}
                        </strong>
                      </td>

                      <td>
                        <span className="badge bg-light text-dark border">
                          {item.category}
                        </span>
                      </td>

                      <td>
                        <strong>
                          {Number(
                            item.quantity || 0
                          ).toLocaleString()}
                        </strong>{" "}
                        {item.unit}
                      </td>

                      <td>
                        {Number(
                          item.minimumQuantity ||
                            0
                        ).toLocaleString()}{" "}
                        {item.unit}
                      </td>

                      <td>
                        {item.supplier ||
                          "-"}
                      </td>

                      <td>
                        {formatDate(
                          item.purchaseDate
                        )}
                      </td>

                      <td>
                        {lowStock ? (
                          <span className="badge bg-danger">
                            <i className="bi bi-exclamation-triangle me-1"></i>
                            Low Stock
                          </span>
                        ) : (
                          <span className="badge bg-success">
                            <i className="bi bi-check-circle me-1"></i>
                            In Stock
                          </span>
                        )}
                      </td>

                      <td>
                        <div className="d-flex justify-content-end gap-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-success"
                            title="Use Stock"
                            onClick={() =>
                              openUsageModal(
                                item
                              )
                            }
                          >
                            <i className="bi bi-box-arrow-down"></i>
                          </button>

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            title="Edit"
                            onClick={() =>
                              onEdit(item)
                            }
                          >
                            <i className="bi bi-pencil"></i>
                          </button>

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger"
                            title="Delete"
                            onClick={() =>
                              handleDelete(
                                item.id
                              )
                            }
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {usageItem && (
        <div
          className="modal d-block inventory-modal-backdrop"
          tabIndex="-1"
          role="dialog"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
          >
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title">
                  Use Inventory
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={closeUsageModal}
                ></button>
              </div>

              <div className="modal-body">
                <p className="mb-3">
                  <strong>
                    {usageItem.item}
                  </strong>
                  <br />

                  Available:{" "}
                  {usageItem.quantity}{" "}
                  {usageItem.unit}
                </p>

                {usageError && (
                  <div className="alert alert-danger">
                    {usageError}
                  </div>
                )}

                <label className="form-label">
                  Quantity Used
                </label>

                <input
                  type="number"
                  className="form-control"
                  min="0"
                  step="0.01"
                  value={usageQuantity}
                  onChange={(event) =>
                    setUsageQuantity(
                      event.target.value
                    )
                  }
                  placeholder={`Enter quantity in ${usageItem.unit}`}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={closeUsageModal}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleUsage}
                >
                  <i className="bi bi-check-lg me-2"></i>
                  Deduct Stock
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InventoryTable;