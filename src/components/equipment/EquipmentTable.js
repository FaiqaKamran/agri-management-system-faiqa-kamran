import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ConfirmModal from "../common/ConfirmModal";

import {
  removeEquipment,
} from "../../store/reducers/equipmentReducer";

import {
  selectEquipmentSortedByServiceDate,
} from "../../store/selectors/equipmentSelectors";

const EquipmentTable = ({ onEdit }) => {
  const dispatch = useDispatch();

  const equipment = useSelector(
    selectEquipmentSortedByServiceDate
  );

  const role = useSelector(
    (state) => state.auth?.role
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");
  const [typeFilter, setTypeFilter] =
    useState("All");

  // Equipment selected for delete confirmation
  const [deleteEquipment, setDeleteEquipment] =
    useState(null);

  // =====================================================
  // Filter Equipment
  // =====================================================

  const filteredEquipment = useMemo(() => {
    return equipment.filter((item) => {

      const equipmentName =
        String(item.name || "").toLowerCase();

      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        equipmentName.includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      const matchesType =
        typeFilter === "All" ||
        item.type === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    });
  }, [
    equipment,
    search,
    statusFilter,
    typeFilter,
  ]);

  // =====================================================
  // Delete
  // =====================================================

  const handleDelete = (item) => {
    setDeleteEquipment(item);
  };

  const confirmDelete = () => {
    if (!deleteEquipment) {
      return;
    }

    dispatch(
      removeEquipment(deleteEquipment.id)
    );

    setDeleteEquipment(null);
  };

  // =====================================================
  // Service Status Badge
  // =====================================================

  const getServiceStatus = (status) => {

    if (status === "Overdue") {
      return (
        <span className="badge bg-danger">
          Overdue
        </span>
      );
    }

    if (status === "Due in 7 days") {
      return (
        <span className="badge bg-warning text-dark">
          Due in 7 days
        </span>
      );
    }

    if (status === "No Schedule") {
      return (
        <span className="badge bg-secondary">
          No Schedule
        </span>
      );
    }

    return (
      <span className="badge bg-success">
        OK
      </span>
    );
  };

  return (
    <>
      <div className="card border-0 shadow-sm">

        <div className="card-body p-4">

          {/* ============================================
              Filters
          ============================================ */}

          <div className="row g-3 mb-4">

            {/* Search */}
            <div className="col-md-4">

              <input
                type="text"
                className="form-control"
                placeholder="Search equipment..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            {/* Status */}
            <div className="col-md-4">

              <select
                className="form-select"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
              >

                <option value="All">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Under Repair">
                  Under Repair
                </option>

                <option value="Idle">
                  Idle
                </option>

              </select>

            </div>

            {/* Type */}
            <div className="col-md-4">

              <select
                className="form-select"
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(
                    e.target.value
                  )
                }
              >

                <option value="All">
                  All Types
                </option>

                <option value="Tractor">
                  Tractor
                </option>

                <option value="Water Pump">
                  Water Pump
                </option>

                <option value="Sprayer">
                  Sprayer
                </option>

                <option value="Harvester">
                  Harvester
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>

          </div>

          {/* ============================================
              Equipment Table
          ============================================ */}

          <div className="table-responsive">

            <table className="table align-middle">

              <thead>
                <tr>

                  <th>
                    Equipment
                  </th>

                  <th>
                    Type
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Last Service
                  </th>

                  <th>
                    Next Service
                  </th>

                  <th>
                    Service Status
                  </th>

                  {/* Admin only */}
                  {role === "Admin" && (
                    <th>
                      Actions
                    </th>
                  )}

                </tr>
              </thead>

              <tbody>

                {filteredEquipment.length === 0 ? (

                  <tr>

                    <td
                      colSpan={
                        role === "Admin"
                          ? 7
                          : 6
                      }
                      className="text-center py-4 text-muted"
                    >
                      No equipment found.
                    </td>

                  </tr>

                ) : (

                  filteredEquipment.map(
                    (item) => (

                      <tr key={item.id}>

                        {/* Equipment */}
                        <td>

                          <strong>
                            {item.name}
                          </strong>

                          {item.notes && (
                            <small className="d-block text-muted">
                              {item.notes}
                            </small>
                          )}

                        </td>

                        {/* Type */}
                        <td>
                          {item.type}
                        </td>

                        {/* Status */}
                        <td>

                          <span className="badge bg-light text-dark">
                            {item.status}
                          </span>

                        </td>

                        {/* Last Service */}
                        <td>
                          {item.lastServiceDate ||
                            "-"}
                        </td>

                        {/* Next Service */}
                        <td>
                          {item.nextServiceDate ||
                            "-"}
                        </td>

                        {/* Service Status */}
                        <td>

                          {getServiceStatus(
                            item.serviceStatus
                          )}

                        </td>

                        {/* Admin Actions */}
                        {role === "Admin" && (

                          <td>

                            <div className="d-flex gap-2">

                              {/* Edit */}
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() =>
                                  onEdit(item)
                                }
                                title="Edit Equipment"
                              >
                                <i className="bi bi-pencil"></i>
                              </button>

                              {/* Delete */}
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  handleDelete(item)
                                }
                                title="Delete Equipment"
                              >
                                <i className="bi bi-trash"></i>
                              </button>

                            </div>

                          </td>

                        )}

                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

      {/* ================================================
          Delete Confirmation Modal
      ================================================= */}

      <ConfirmModal
        show={Boolean(deleteEquipment)}

        title="Delete Equipment"

        message={
          deleteEquipment
            ? `Are you sure you want to delete "${deleteEquipment.name}"?`
            : ""
        }

        onConfirm={confirmDelete}

        onCancel={() =>
          setDeleteEquipment(null)
        }
      />

    </>
  );
};

export default EquipmentTable;