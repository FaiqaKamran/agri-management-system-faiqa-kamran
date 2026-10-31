import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addMaintenance,
  updateMaintenance,
} from "../../store/reducers/maintenanceReducer";

import {
  updateLastServiceDate,
} from "../../store/reducers/equipmentReducer";

import { addExpense } from "../../store/reducers/expensesReducer";

const MaintenanceForm = ({
  editingMaintenance,
  onDone,
}) => {
  const dispatch = useDispatch();

  const equipment = useSelector(
    (state) => state.equipment || []
  );

  const [form, setForm] = useState({
    equipmentId: "",
    date: "",
    description: "",
    cost: "",
    performedBy: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editingMaintenance) {
      setForm({
        equipmentId: editingMaintenance.equipmentId || "",
        date: editingMaintenance.date || "",
        description:
          editingMaintenance.description || "",
        cost: editingMaintenance.cost || "",
        performedBy:
          editingMaintenance.performedBy || "",
      });
    } else {
      setForm({
        equipmentId: "",
        date: "",
        description: "",
        cost: "",
        performedBy: "",
      });
    }
  }, [editingMaintenance]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.equipmentId) {
      setError("Please select equipment.");
      return;
    }

    if (!form.date) {
      setError("Maintenance date is required.");
      return;
    }

    if (!form.description.trim()) {
      setError("Description is required.");
      return;
    }

    if (form.cost === "" || Number(form.cost) < 0) {
      setError("Cost cannot be negative.");
      return;
    }

    if (!form.performedBy.trim()) {
      setError("Performed by is required.");
      return;
    }

    setError("");

    const selectedEquipment = equipment.find(
      (item) =>
        Number(item.id) === Number(form.equipmentId)
    );

    if (editingMaintenance) {
      dispatch(
        updateMaintenance({
          id: editingMaintenance.id,
          data: form,
        })
      );

      if (
        selectedEquipment &&
        (!selectedEquipment.lastServiceDate ||
          new Date(form.date) >
            new Date(selectedEquipment.lastServiceDate))
      ) {
        dispatch(
          updateLastServiceDate({
            equipmentId: form.equipmentId,
            lastServiceDate: form.date,
          })
        );
      }
    } else {
      dispatch(addMaintenance(form));

      dispatch(
        updateLastServiceDate({
          equipmentId: form.equipmentId,
          lastServiceDate: form.date,
        })
      );

      /*
       * PDF requirement:
       * Maintenance service with cost > 0
       * should create an Expense.
       */
      if (Number(form.cost) > 0) {
        dispatch(
          addExpense({
            title: `Maintenance - ${
              selectedEquipment?.name || "Equipment"
            }`,
            category: "Repair",
            amount: Number(form.cost),
            date: form.date,
            description: form.description,
            equipmentId: form.equipmentId,
            expenseType: "Maintenance",
          })
        );
      }
    }

    onDone();
  };

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">

        <div className="mb-4">
          <h5 className="mb-1">
            {editingMaintenance
              ? "Edit Maintenance Record"
              : "Add Maintenance Record"}
          </h5>

          <p className="text-muted mb-0">
            Record equipment service and maintenance cost
          </p>
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
                Equipment
              </label>

              <select
                name="equipmentId"
                className="form-select"
                value={form.equipmentId}
                onChange={handleChange}
              >
                <option value="">
                  Select Equipment
                </option>

                {equipment.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name} - {item.type}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Maintenance Date
              </label>

              <input
                type="date"
                name="date"
                className="form-control"
                value={form.date}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Description
              </label>

              <input
                type="text"
                name="description"
                className="form-control"
                placeholder="e.g. Engine oil change"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Cost
              </label>

              <input
                type="number"
                name="cost"
                className="form-control"
                min="0"
                placeholder="0"
                value={form.cost}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Performed By
              </label>

              <input
                type="text"
                name="performedBy"
                className="form-control"
                placeholder="Mechanic / technician name"
                value={form.performedBy}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 d-flex gap-2 mt-3">

              <button
                type="submit"
                className="btn btn-success"
              >
                <i className="bi bi-check-circle me-2"></i>

                {editingMaintenance
                  ? "Update Record"
                  : "Save Maintenance"}
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

export default MaintenanceForm;