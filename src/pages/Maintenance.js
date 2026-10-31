import React, { useState } from "react";
import { useSelector } from "react-redux";

import MaintenanceForm from "../components/equipment/MaintenanceForm";
import MaintenanceTable from "../components/equipment/MaintenanceTable";
import MaintenanceCostSummary from "../components/equipment/MaintenanceCostSummary";

import {
  selectMaintenance,
  selectTotalMaintenanceCost,
} from "../store/selectors/maintenanceSelectors";

const Maintenance = () => {
  const role = useSelector(
    (state) => state.auth?.role
  );

  const [showForm, setShowForm] = useState(false);
  const [editingMaintenance, setEditingMaintenance] =
    useState(null);

  const records = useSelector(
    selectMaintenance
  );

  const totalCost = useSelector(
    selectTotalMaintenanceCost
  );

  const handleAdd = () => {
    setEditingMaintenance(null);
    setShowForm(true);
  };

  const handleEdit = (record) => {
    // Only Admin can edit
    if (role !== "Admin") {
      return;
    }

    setEditingMaintenance(record);
    setShowForm(true);
  };

  const handleDone = () => {
    setShowForm(false);
    setEditingMaintenance(null);
  };

  return (
    <div>

      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h3 className="mb-1">
            Maintenance
          </h3>

          <p className="text-muted mb-0">
            Track equipment servicing and maintenance costs
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
            Add Maintenance
          </button>
        )}

      </div>

      {/* Maintenance Statistics */}
      <div className="row g-3 mb-4">

        {/* Total Records */}
        <div className="col-md-6">

          <div className="card border-0 shadow-sm">
            <div className="card-body">

              <small className="text-muted">
                Total Maintenance Records
              </small>

              <h3 className="mb-0 mt-2">
                {records.length}
              </h3>

            </div>
          </div>

        </div>

        {/* Total Cost */}
        <div className="col-md-6">

          <div className="card border-0 shadow-sm">
            <div className="card-body">

              <small className="text-muted">
                Total Maintenance Cost
              </small>

              <h3 className="mb-0 mt-2">
                Rs.{" "}
                {Number(
                  totalCost
                ).toLocaleString()}
              </h3>

            </div>
          </div>

        </div>

      </div>

      {/* Maintenance Form */}
      {showForm && (
        <MaintenanceForm
          editingMaintenance={
            editingMaintenance
          }
          onDone={handleDone}
        />
      )}

      {/* Maintenance Table */}
      <MaintenanceTable
        onEdit={handleEdit}
      />

      {/* Cost Summary */}
      <MaintenanceCostSummary />

    </div>
  );
};

export default Maintenance;