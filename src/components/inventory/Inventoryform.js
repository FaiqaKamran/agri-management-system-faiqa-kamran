import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  addInventoryItem,
  updateInventoryItem,
} from "../../store/reducers/inventoryReducer";

const InventoryForm = ({
  editingItem,
  onClose,
}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    item: "",
    category: "",
    quantity: "",
    unit: "",
    minimumQuantity: "",
    supplier: "",
    purchaseDate: "",
    notes: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingItem) {
      setFormData({
        item: editingItem.item || "",
        category: editingItem.category || "",
        quantity: editingItem.quantity ?? "",
        unit: editingItem.unit || "",
        minimumQuantity:
          editingItem.minimumQuantity ?? "",
        supplier: editingItem.supplier || "",
        purchaseDate:
          editingItem.purchaseDate || "",
        notes: editingItem.notes || "",
      });
    } else {
      setFormData({
        item: "",
        category: "",
        quantity: "",
        unit: "",
        minimumQuantity: "",
        supplier: "",
        purchaseDate: "",
        notes: "",
      });
    }

    setError("");
  }, [editingItem]);

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

    if (!formData.item.trim()) {
      setError("Item name is required.");
      return;
    }

    if (!formData.category) {
      setError("Please select a category.");
      return;
    }

    if (
      formData.quantity === "" ||
      Number(formData.quantity) < 0
    ) {
      setError(
        "Quantity must be zero or greater."
      );
      return;
    }

    if (!formData.unit) {
      setError("Please select a unit.");
      return;
    }

    if (
      formData.minimumQuantity === "" ||
      Number(formData.minimumQuantity) < 0
    ) {
      setError(
        "Minimum quantity must be zero or greater."
      );
      return;
    }

    const inventoryData = {
      item: formData.item.trim(),
      category: formData.category,
      quantity: Number(formData.quantity),
      unit: formData.unit,
      minimumQuantity: Number(
        formData.minimumQuantity
      ),
      supplier: formData.supplier.trim(),
      purchaseDate: formData.purchaseDate,
      notes: formData.notes.trim(),
    };

    if (editingItem) {
      dispatch(
        updateInventoryItem({
          id: editingItem.id,
          data: inventoryData,
        })
      );
    } else {
      dispatch(
        addInventoryItem(inventoryData)
      );
    }

    onClose();
  };

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="mb-1">
              {editingItem
                ? "Edit Inventory Item"
                : "Add Inventory Item"}
            </h5>

            <p className="text-muted small mb-0">
              Manage farm inputs and stock levels.
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
                Item Name
              </label>

              <input
                type="text"
                name="item"
                className="form-control"
                placeholder="e.g. Urea Fertilizer"
                value={formData.item}
                onChange={handleChange}
              />
            </div>

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

            <div className="col-md-4">
              <label className="form-label">
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                className="form-control"
                min="0"
                step="0.01"
                placeholder="0"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">
                Unit
              </label>

              <select
                name="unit"
                className="form-select"
                value={formData.unit}
                onChange={handleChange}
              >
                <option value="">
                  Select unit
                </option>

                <option value="kg">
                  Kilogram (kg)
                </option>

                <option value="litre">
                  Litre
                </option>

                <option value="bag">
                  Bag
                </option>

                <option value="packet">
                  Packet
                </option>

                <option value="piece">
                  Piece
                </option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">
                Minimum Quantity
              </label>

              <input
                type="number"
                name="minimumQuantity"
                className="form-control"
                min="0"
                step="0.01"
                placeholder="Low stock level"
                value={formData.minimumQuantity}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Supplier
              </label>

              <input
                type="text"
                name="supplier"
                className="form-control"
                placeholder="Supplier name"
                value={formData.supplier}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Purchase Date
              </label>

              <input
                type="date"
                name="purchaseDate"
                className="form-control"
                value={formData.purchaseDate}
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
                placeholder="Optional notes..."
                value={formData.notes}
                onChange={handleChange}
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

                {editingItem
                  ? "Update Item"
                  : "Save Item"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryForm;