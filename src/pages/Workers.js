import React, { useState } from "react";
import { useSelector } from "react-redux";

import WorkerForm from "../components/workers/WorkerForm";
import WorkerTable from "../components/workers/WorkerTable";

import {
  selectTotalWorkers,
  selectActiveWorkerCount,
} from "../store/selectors/workerSelectors";

const Workers = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingWorker, setEditingWorker] = useState(null);

  const role = useSelector(
    (state) => state.auth?.role
  );

  const totalWorkers = useSelector(
    selectTotalWorkers
  );

  const activeWorkers = useSelector(
    selectActiveWorkerCount
  );

  const handleAdd = () => {
    setEditingWorker(null);
    setShowForm(true);
  };

  const handleEdit = (worker) => {
    if (role !== "Admin") {
      return;
    }

    setEditingWorker(worker);
    setShowForm(true);
  };

  const handleDone = () => {
    setShowForm(false);
    setEditingWorker(null);
  };

  return (
    <div>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h3 className="mb-1">
            Workers & Labour
          </h3>

          <p className="text-muted mb-0">
            Manage farm workers and labour records
          </p>
        </div>

        {(role === "Admin" || role === "Manager") && (
          <button
            type="button"
            className="btn btn-success"
            onClick={handleAdd}
          >
            <i className="bi bi-plus-lg me-2"></i>
            Add Worker
          </button>
        )}

      </div>

      {/* Statistics */}
      <div className="row g-3 mb-4">

        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <p className="text-muted mb-1">
                    Total Workers
                  </p>

                  <h3 className="mb-0">
                    {totalWorkers}
                  </h3>
                </div>

                <div className="dashboard-card-icon">
                  <i className="bi bi-people"></i>
                </div>

              </div>

            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center">

                <div>
                  <p className="text-muted mb-1">
                    Active Workers
                  </p>

                  <h3 className="mb-0">
                    {activeWorkers}
                  </h3>
                </div>

                <div className="dashboard-card-icon">
                  <i className="bi bi-person-check"></i>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Worker Form */}
      {showForm && (
        <div className="mb-4">

          <WorkerForm
            editingWorker={editingWorker}
            onDone={handleDone}
            onClose={handleDone}
          />

        </div>
      )}

      {/* Worker Table */}
      <WorkerTable
        onEdit={handleEdit}
      />

    </div>
  );
};

export default Workers;