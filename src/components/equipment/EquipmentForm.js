import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addEquipment,
  updateEquipment,
} from "../../store/reducers/equipmentReducer";

const EquipmentForm = ({ editingEquipment, onDone }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState(
    editingEquipment || {
      name: "",
      type: "Tractor",
      purchaseDate: "",
      status: "Active",
      lastServiceDate: "",
      serviceIntervalDays: "",
      notes: "",
    }
  );

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Equipment name is required.");
      return;
    }

    if (!form.purchaseDate) {
      setError("Purchase date is required.");
      return;
    }

    if (!form.serviceIntervalDays || Number(form.serviceIntervalDays) <= 0) {
      setError("Service interval must be greater than 0.");
      return;
    }

    setError("");

    if (editingEquipment) {
      dispatch(
        updateEquipment({
          id: editingEquipment.id,
          data: form,
        })
      );
    } else {
      dispatch(addEquipment(form));
    }

    onDone();
  };

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="mb-1">
              {editingEquipment
                ? "Edit Equipment"
                : "Add Equipment"}
            </h5>

            <p className="text-muted mb-0">
              Enter equipment and service information
            </p>
          </div>
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
                Equipment Name
              </label>

              <input
                type="text"
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Massey Tractor"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Equipment Type
              </label>

              <select
                name="type"
                className="form-select"
                value={form.type}
                onChange={handleChange}
              >
                <option value="Tractor">Tractor</option>
                <option value="Water Pump">Water Pump</option>
                <option value="Sprayer">Sprayer</option>
                <option value="Harvester">Harvester</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">
                Purchase Date
              </label>

              <input
                type="date"
                name="purchaseDate"
                className="form-control"
                value={form.purchaseDate}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">
                Status
              </label>

              <select
                name="status"
                className="form-select"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Under Repair">
                  Under Repair
                </option>
                <option value="Idle">Idle</option>
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label">
                Last Service Date
              </label>

              <input
                type="date"
                name="lastServiceDate"
                className="form-control"
                value={form.lastServiceDate}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Service Interval (Days)
              </label>

              <input
                type="number"
                name="serviceIntervalDays"
                className="form-control"
                min="1"
                value={form.serviceIntervalDays}
                onChange={handleChange}
                placeholder="e.g. 90"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Notes
              </label>

              <input
                type="text"
                name="notes"
                className="form-control"
                value={form.notes}
                onChange={handleChange}
                placeholder="Optional notes"
              />
            </div>

            <div className="col-12 d-flex gap-2 mt-3">

              <button
                type="submit"
                className="btn btn-success"
              >
                <i className="bi bi-check-circle me-2"></i>

                {editingEquipment
                  ? "Update Equipment"
                  : "Add Equipment"}
              </button>

              <button
                type="button"
                className="btn btn-light"
                onClick={onDone}
              >
                Cancel
              </button>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
};

export default EquipmentForm;