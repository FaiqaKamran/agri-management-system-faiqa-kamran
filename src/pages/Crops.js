import React, { useContext, useMemo, useState } from "react";

import AppContext from "../context/AppContext";

import CropForm from "../components/crops/CropForm";
import CropTable from "../components/crops/CropTable";
import SearchBar from "../components/common/SearchBar";
import ConfirmModal from "../components/common/ConfirmModal";
import Toast from "../components/common/Toast";

const Crops = () => {
  const {
    crops,
    addCrop,
    updateCrop,
    deleteCrop,
  } = useContext(AppContext);

  const [showForm, setShowForm] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const [search, setSearch] = useState("");
  const [healthFilter, setHealthFilter] =
    useState("All");

  const [deleteId, setDeleteId] = useState(null);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });
  };

  const filteredCrops = useMemo(() => {
    return crops.filter((crop) => {
      const searchText = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        crop.name
          .toLowerCase()
          .includes(searchText) ||
        crop.field
          .toLowerCase()
          .includes(searchText);

      const matchesHealth =
        healthFilter === "All" ||
        crop.status === healthFilter;

      return matchesSearch && matchesHealth;
    });
  }, [crops, search, healthFilter]);

  const handleSubmit = (cropData) => {
    if (editingCrop) {
      updateCrop(editingCrop.id, cropData);

      showToast("Crop updated successfully.");
    } else {
      addCrop(cropData);

      showToast("Crop added successfully.");
    }

    setShowForm(false);
    setEditingCrop(null);
  };

  const handleEdit = (crop) => {
    setEditingCrop(crop);
    setShowForm(true);
  };

  const handleDelete = () => {
    if (!deleteId) return;

    deleteCrop(deleteId);

    setDeleteId(null);

    showToast("Crop deleted successfully.");
  };

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Crop Management</h1>
          <p>
            Manage crops, health status and
            harvest schedules.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingCrop(null);
            setShowForm(true);
          }}
        >
          <i className="bi bi-plus-lg"></i>
          Add Crop
        </button>
      </div>

      <div className="dashboard-card mb-4">
        <div className="crop-toolbar">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search crop or field..."
          />

          <select
            className="form-select filter-select"
            value={healthFilter}
            onChange={(e) =>
              setHealthFilter(e.target.value)
            }
          >
            <option value="All">
              All Health Status
            </option>

            <option value="Healthy">
              Healthy
            </option>

            <option value="Needs Attention">
              Needs Attention
            </option>

            <option value="Critical">
              Critical
            </option>
          </select>
        </div>
      </div>

      <CropTable
        crops={filteredCrops}
        onEdit={handleEdit}
        onDelete={(id) => setDeleteId(id)}
      />

      {showForm && (
        <CropForm
          crop={editingCrop}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingCrop(null);
          }}
        />
      )}

      <ConfirmModal
        show={Boolean(deleteId)}
        title="Delete Crop"
        message="Are you sure you want to delete this crop? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            show: false,
          }))
        }
      />
    </div>
  );
};

export default Crops;