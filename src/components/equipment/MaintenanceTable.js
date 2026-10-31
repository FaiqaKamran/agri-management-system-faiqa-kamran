import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ConfirmModal from "../common/ConfirmModal";

import {
  removeMaintenance,
} from "../../store/reducers/maintenanceReducer";

import {
  selectMaintenanceWithEquipment,
} from "../../store/selectors/maintenanceSelectors";

const MaintenanceTable = ({ onEdit }) => {
  const dispatch = useDispatch();

  const records = useSelector(
    selectMaintenanceWithEquipment
  );

  const role = useSelector(
    (state) => state.auth?.role
  );

  const [search, setSearch] = useState("");

  // Record selected for delete confirmation
  const [deleteMaintenance, setDeleteMaintenance] =
    useState(null);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const value = search.toLowerCase();

      const equipmentName = (
        record.equipmentName || ""
      ).toLowerCase();

      const description = (
        record.description || ""
      ).toLowerCase();

      const performedBy = (
        record.performedBy || ""
      ).toLowerCase();

      return (
        equipmentName.includes(value) ||
        description.includes(value) ||
        performedBy.includes(value)
      );
    });
  }, [records, search]);

  const handleDelete = (record) => {
    setDeleteMaintenance(record);
  };

  const confirmDelete = () => {
    if (!deleteMaintenance) {
      return;
    }

    dispatch(
      removeMaintenance(
        deleteMaintenance.id
      )
    );

    setDeleteMaintenance(null);
  };

  return (
    <>
      <div className="card border-0 shadow-sm">

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h5 className="mb-1">
                Maintenance History
              </h5>

              <p className="text-muted mb-0">
                Equipment service and maintenance
                records
              </p>
            </div>

            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

          </div>

          <div className="table-responsive">

            <table className="table align-middle">

              <thead>
                <tr>
                  <th>Equipment</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Cost</th>
                  <th>Performed By</th>

                  {role === "Admin" && (
                    <th>Actions</th>
                  )}
                </tr>
              </thead>

              <tbody>

                {filteredRecords.length === 0 ? (
                  <tr>
                    <td
                      colSpan={
                        role === "Admin" ? 6 : 5
                      }
                      className="text-center text-muted py-4"
                    >
                      No maintenance records
                      found.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map(
                    (record) => (
                      <tr key={record.id}>

                        <td>
                          <strong>
                            {record.equipmentName}
                          </strong>

                          <small className="d-block text-muted">
                            {record.equipmentType}
                          </small>
                        </td>

                        <td>
                          {record.date}
                        </td>

                        <td>
                          {record.description}
                        </td>

                        <td>
                          Rs.{" "}
                          {Number(
                            record.cost || 0
                          ).toLocaleString()}
                        </td>

                        <td>
                          {record.performedBy}
                        </td>

                        {role === "Admin" && (
                          <td>
                            <div className="d-flex gap-2">

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() =>
                                  onEdit(record)
                                }
                              >
                                <i className="bi bi-pencil"></i>
                              </button>

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  handleDelete(
                                    record
                                  )
                                }
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

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        show={Boolean(deleteMaintenance)}
        title="Delete Maintenance Record"
        message={
          deleteMaintenance
            ? `Are you sure you want to delete the maintenance record for "${deleteMaintenance.equipmentName}"?`
            : ""
        }
        onConfirm={confirmDelete}
        onCancel={() =>
          setDeleteMaintenance(null)
        }
      />
    </>
  );
};

export default MaintenanceTable;