import React, { useState } from "react";
import { useSelector } from "react-redux";

import EquipmentForm from "../components/equipment/EquipmentForm";
import EquipmentTable from "../components/equipment/EquipmentTable";

import {
  selectEquipmentCount,
  selectActiveEquipment,
  selectEquipmentUnderRepair,
  selectIdleEquipment,
} from "../store/selectors/equipmentSelectors";

const Equipment = () => {
  const role = useSelector(
    (state) => state.auth?.role
  );

  const [showForm, setShowForm] = useState(false);
  const [editingEquipment, setEditingEquipment] =
    useState(null);

  const total = useSelector(
    selectEquipmentCount
  );

  const active = useSelector(
    selectActiveEquipment
  ).length;

  const underRepair = useSelector(
    selectEquipmentUnderRepair
  ).length;

  const idle = useSelector(
    selectIdleEquipment
  ).length;

  const handleAdd = () => {
    setEditingEquipment(null);
    setShowForm(true);
  };

  const handleEdit = (equipment) => {
    // Only Admin can edit
    if (role !== "Admin") {
      return;
    }

    setEditingEquipment(equipment);
    setShowForm(true);
  };

  const handleDone = () => {
    setShowForm(false);
    setEditingEquipment(null);
  };

  return (
    <div>

      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h3 className="mb-1">
            Equipment & Maintenance
          </h3>

          <p className="text-muted mb-0">
            Manage farm equipment and service schedules
          </p>
        </div>

        {/* Admin + Manager can add */}
        {(role === "Admin" ||
          role === "Manager") && (
          <button
            type="button"
            className="btn btn-success"
            onClick={handleAdd}
          >
            <i className="bi bi-plus-lg me-2"></i>
            Add Equipment
          </button>
        )}

      </div>

      {/* Equipment Statistics */}
      <div className="row g-3 mb-4">

        {/* Total */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">

              <small className="text-muted">
                Total Equipment
              </small>

              <h3 className="mb-0 mt-2">
                {total}
              </h3>

            </div>
          </div>
        </div>

        {/* Active */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">

              <small className="text-muted">
                Active
              </small>

              <h3 className="mb-0 mt-2">
                {active}
              </h3>

            </div>
          </div>
        </div>

        {/* Under Repair */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">

              <small className="text-muted">
                Under Repair
              </small>

              <h3 className="mb-0 mt-2">
                {underRepair}
              </h3>

            </div>
          </div>
        </div>

        {/* Idle */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">

              <small className="text-muted">
                Idle
              </small>

              <h3 className="mb-0 mt-2">
                {idle}
              </h3>

            </div>
          </div>
        </div>

      </div>

      {/* Equipment Form */}
      {showForm && (
        <EquipmentForm
          editingEquipment={editingEquipment}
          onDone={handleDone}
        />
      )}

      {/* Equipment Table */}
      <EquipmentTable
        onEdit={handleEdit}
      />

    </div>
  );
};

export default Equipment;