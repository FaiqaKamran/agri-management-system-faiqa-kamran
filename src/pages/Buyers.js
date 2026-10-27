import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addBuyer,
  updateBuyer,
  removeBuyer,
} from "../store/reducers/buyersReducer";

import BuyerForm from "../components/buyers/BuyerForm";
import BuyerTable from "../components/buyers/BuyerTable";
import BuyerDetailsModal from "../components/buyers/BuyerDetailsModal";

import SearchBar from "../components/common/SearchBar";
import ConfirmModal from "../components/common/ConfirmModal";
import Toast from "../components/common/Toast";

const Buyers = () => {
  const dispatch = useDispatch();

  const buyers = useSelector((state) => state.buyers);
  const crops = useSelector((state) => state.crops);

  const [showForm, setShowForm] = useState(false);
  const [editingBuyer, setEditingBuyer] = useState(null);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");

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

  const filteredBuyers = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    const result = buyers.filter((buyer) => {
      return (
        buyer.name?.toLowerCase().includes(searchValue) ||
        buyer.cnic?.toLowerCase().includes(searchValue) ||
        buyer.phone?.toLowerCase().includes(searchValue)
      );
    });

    return [...result].sort((a, b) => {
      if (sortBy === "name") {
        return (a.name || "").localeCompare(b.name || "");
      }

      if (sortBy === "oldest") {
        return Number(a.id) - Number(b.id);
      }

      return Number(b.id) - Number(a.id);
    });
  }, [buyers, search, sortBy]);

  const handleSubmit = (buyerData) => {
    if (editingBuyer) {
      dispatch(
        updateBuyer({
          id: editingBuyer.id,
          data: buyerData,
        })
      );

      showToast("Buyer updated successfully.");
    } else {
      dispatch(addBuyer(buyerData));

      showToast("Buyer added successfully.");
    }

    setShowForm(false);
    setEditingBuyer(null);
  };

  const handleEdit = (buyer) => {
    setEditingBuyer(buyer);
    setShowForm(true);
  };

  const handleDelete = () => {
    if (!deleteId) return;

    dispatch(removeBuyer(deleteId));

    setDeleteId(null);

    showToast("Buyer deleted successfully.");
  };

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>Buyers</h1>
          <p>
            Manage buyers and their purchase information.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingBuyer(null);
            setShowForm(true);
          }}
        >
          <i className="bi bi-person-plus me-2"></i>
          Add Buyer
        </button>
      </div>

      <div className="dashboard-card mb-4">
        <div className="crop-toolbar">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search buyer, CNIC or phone..."
          />

          <select
            className="form-select filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      <BuyerTable
        buyers={filteredBuyers}
        onEdit={handleEdit}
        onDelete={(id) => setDeleteId(id)}
        onView={setSelectedBuyer}
      />

      {showForm && (
        <BuyerForm
          buyer={editingBuyer}
          crops={crops}
          buyers={buyers}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingBuyer(null);
          }}
        />
      )}

      {selectedBuyer && (
        <BuyerDetailsModal
          buyer={selectedBuyer}
          crops={crops}
          onClose={() => setSelectedBuyer(null)}
        />
      )}

      <ConfirmModal
        show={Boolean(deleteId)}
        title="Delete Buyer"
        message="Are you sure you want to delete this buyer?"
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

export default Buyers;