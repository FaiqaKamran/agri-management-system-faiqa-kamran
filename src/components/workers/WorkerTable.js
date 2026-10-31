import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  removeWorker,
} from "../../store/reducers/workersReducer";

import ConfirmModal from "../common/ConfirmModal";

const WorkerTable = () => {
  const dispatch = useDispatch();

  const workers = useSelector(
    (state) => state.workers || []
  );

  const role = useSelector(
    (state) => state.auth?.role
  );

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [deleteWorker, setDeleteWorker] =
    useState(null);

  const filteredWorkers = useMemo(() => {
    return workers.filter((worker) => {
      const searchValue =
        search.toLowerCase();

      const matchesSearch =
        worker.fullName
          ?.toLowerCase()
          .includes(searchValue) ||
        worker.cnic
          ?.toLowerCase()
          .includes(searchValue);

      const matchesRole =
        roleFilter === "All" ||
        worker.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" ||
        worker.status === statusFilter;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [
    workers,
    search,
    roleFilter,
    statusFilter,
  ]);

  const confirmDelete = () => {
    if (!deleteWorker) {
      return;
    }

    dispatch(removeWorker(deleteWorker.id));
    setDeleteWorker(null);
  };

  return (
    <>
      <div className="card border-0 shadow-sm">

        <div className="card-body p-4">

          <div className="row g-3 mb-4">

            <div className="col-lg-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search name or CNIC..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            <div className="col-lg-4">
              <select
                className="form-select"
                value={roleFilter}
                onChange={(e) =>
                  setRoleFilter(e.target.value)
                }
              >
                <option value="All">
                  All Roles
                </option>

                <option value="Farm Hand">
                  Farm Hand
                </option>

                <option value="Driver">
                  Driver
                </option>

                <option value="Supervisor">
                  Supervisor
                </option>

                <option value="Sprayer">
                  Sprayer
                </option>
              </select>
            </div>

            <div className="col-lg-4">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <option value="All">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>
            </div>

          </div>

          <div className="table-responsive">

            <table className="table align-middle">

              <thead>
                <tr>
                  <th>Worker</th>
                  <th>CNIC</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Daily Wage</th>
                  <th>Join Date</th>
                  <th>Status</th>

                  {role === "Admin" && (
                    <th>Actions</th>
                  )}
                </tr>
              </thead>

              <tbody>

                {filteredWorkers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={
                        role === "Admin"
                          ? 8
                          : 7
                      }
                      className="text-center text-muted py-4"
                    >
                      No workers found.
                    </td>
                  </tr>
                ) : (
                  filteredWorkers.map((worker) => (
                    <tr key={worker.id}>

                      <td>
                        <strong>
                          {worker.fullName}
                        </strong>
                      </td>

                      <td>{worker.cnic}</td>

                      <td>{worker.phone}</td>

                      <td>
                        <span className="badge bg-light text-dark">
                          {worker.role}
                        </span>
                      </td>

                      <td>
                        Rs.{" "}
                        {Number(
                          worker.dailyWage || 0
                        ).toLocaleString()}
                      </td>

                      <td>
                        {worker.joinDate || "-"}
                      </td>

                      <td>
                        {worker.status === "Active" ? (
                          <span className="badge bg-success">
                            Active
                          </span>
                        ) : (
                          <span className="badge bg-secondary">
                            Inactive
                          </span>
                        )}
                      </td>

                      {role === "Admin" && (
                        <td>
                          <div className="d-flex gap-2">

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              onClick={() =>
                                window.dispatchEvent(
                                  new CustomEvent(
                                    "edit-worker",
                                    {
                                      detail: worker,
                                    }
                                  )
                                )
                              }
                            >
                              <i className="bi bi-pencil"></i>
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                setDeleteWorker(worker)
                              }
                            >
                              <i className="bi bi-trash"></i>
                            </button>

                          </div>
                        </td>
                      )}

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>
      </div>

      <ConfirmModal
        show={Boolean(deleteWorker)}
        title="Delete Worker"
        message={
          deleteWorker
            ? `Are you sure you want to delete ${deleteWorker.fullName}? This action cannot be undone.`
            : ""
        }
        onConfirm={confirmDelete}
        onCancel={() =>
          setDeleteWorker(null)
        }
      />
    </>
  );
};

export default WorkerTable;