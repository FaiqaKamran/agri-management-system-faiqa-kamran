import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addWorker,
  updateWorker,
} from "../../store/reducers/workersReducer";

const WorkerForm = ({ editingWorker, onClose }) => {
  const dispatch = useDispatch();

  const workers = useSelector(
    (state) => state.workers || []
  );

  const role = useSelector(
    (state) => state.auth?.role
  );

  const [formData, setFormData] = useState({
    fullName: "",
    cnic: "",
    phone: "",
    role: "Farm Hand",
    dailyWage: "",
    joinDate: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingWorker) {
      setFormData({
        fullName: editingWorker.fullName || "",
        cnic: editingWorker.cnic || "",
        phone: editingWorker.phone || "",
        role: editingWorker.role || "Farm Hand",
        dailyWage: editingWorker.dailyWage || "",
        joinDate: editingWorker.joinDate || "",
        status: editingWorker.status || "Active",
      });
    } else {
      setFormData({
        fullName: "",
        cnic: "",
        phone: "",
        role: "Farm Hand",
        dailyWage: "",
        joinDate: "",
        status: "Active",
      });
    }

    setErrors({});
  }, [editingWorker]);

  const formatCnic = (value) => {
    const digits = value
      .replace(/\D/g, "")
      .slice(0, 13);

    if (digits.length <= 5) {
      return digits;
    }

    if (digits.length <= 12) {
      return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    }

    return `${digits.slice(0, 5)}-${digits.slice(
      5,
      12
    )}-${digits.slice(12)}`;
  };

  const formatPhone = (value) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 11);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    let updatedValue = value;

    if (name === "cnic") {
      updatedValue = formatCnic(value);
    }

    if (name === "phone") {
      updatedValue = formatPhone(value);
    }

    if (name === "dailyWage") {
      updatedValue = value.replace(/\D/g, "");
    }

    setFormData((previous) => ({
      ...previous,
      [name]: updatedValue,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    // -------------------------
    // Full Name Validation
    // -------------------------
    const name = formData.fullName.trim();

    if (!name) {
      newErrors.fullName =
        "Worker name is required.";
    } else if (name.length < 3) {
      newErrors.fullName =
        "Name must contain at least 3 characters.";
    } else if (!/^[A-Za-z ]+$/.test(name)) {
      newErrors.fullName =
        "Name can contain letters and spaces only.";
    }

    // -------------------------
    // CNIC Validation
    // -------------------------
    const cnicDigits = formData.cnic.replace(
      /\D/g,
      ""
    );

    if (!formData.cnic) {
      newErrors.cnic = "CNIC is required.";
    } else if (cnicDigits.length !== 13) {
      newErrors.cnic =
        "CNIC must contain 13 digits.";
    }

    const duplicateCnic = workers.some(
      (worker) =>
        worker.cnic === formData.cnic &&
        Number(worker.id) !==
          Number(editingWorker?.id)
    );

    if (duplicateCnic) {
      newErrors.cnic =
        "A worker with this CNIC already exists.";
    }

    // -------------------------
    // Phone Validation
    // -------------------------
    const phoneDigits = formData.phone.replace(
      /\D/g,
      ""
    );

    if (!formData.phone) {
      newErrors.phone =
        "Phone number is required.";
    } else if (
      !/^03\d{9}$/.test(phoneDigits)
    ) {
      newErrors.phone =
        "Phone number must contain 11 digits and start with 03.";
    }

    // -------------------------
    // Daily Wage Validation
    // -------------------------
    if (
      !formData.dailyWage ||
      Number(formData.dailyWage) <= 0
    ) {
      newErrors.dailyWage =
        "Daily wage must be greater than 0.";
    }

    // -------------------------
    // Join Date Validation
    // -------------------------
    if (!formData.joinDate) {
      newErrors.joinDate =
        "Join date is required.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const workerData = {
      fullName: formData.fullName.trim(),
      cnic: formData.cnic,
      phone: formData.phone,
      role: formData.role,
      dailyWage: Number(formData.dailyWage),
      joinDate: formData.joinDate,
      status: formData.status,
    };

    if (editingWorker) {
      dispatch(
        updateWorker({
          id: editingWorker.id,
          data: workerData,
        })
      );
    } else {
      dispatch(addWorker(workerData));
    }

    onClose();
  };

  // Manager can add workers but cannot edit workers.
  const isEditing = Boolean(editingWorker);

  if (isEditing && role !== "Admin") {
    return null;
  }

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h5 className="mb-1">
              {editingWorker
                ? "Edit Worker"
                : "Add Worker"}
            </h5>

            <p className="text-muted mb-0">
              Enter worker information below.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-light"
            onClick={onClose}
          >
            <i className="bi bi-x-lg"></i>
          </button>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="row g-3">

            {/* Full Name */}
            <div className="col-md-6">

              <label className="form-label">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                className={`form-control ${
                  errors.fullName
                    ? "is-invalid"
                    : ""
                }`}
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter worker name"
              />

              {errors.fullName && (
                <div className="invalid-feedback">
                  {errors.fullName}
                </div>
              )}

            </div>

            {/* CNIC */}
            <div className="col-md-6">

              <label className="form-label">
                CNIC
              </label>

              <input
                type="text"
                name="cnic"
                className={`form-control ${
                  errors.cnic
                    ? "is-invalid"
                    : ""
                }`}
                value={formData.cnic}
                onChange={handleChange}
                placeholder="12345-1234567-1"
              />

              {errors.cnic && (
                <div className="invalid-feedback">
                  {errors.cnic}
                </div>
              )}

            </div>

            {/* Phone */}
            <div className="col-md-6">

              <label className="form-label">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                className={`form-control ${
                  errors.phone
                    ? "is-invalid"
                    : ""
                }`}
                value={formData.phone}
                onChange={handleChange}
                placeholder="03001234567"
                maxLength="11"
              />

              {errors.phone && (
                <div className="invalid-feedback">
                  {errors.phone}
                </div>
              )}

            </div>

            {/* Role */}
            <div className="col-md-6">

              <label className="form-label">
                Role
              </label>

              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
              >
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

            {/* Daily Wage */}
            <div className="col-md-6">

              <label className="form-label">
                Daily Wage
              </label>

              <input
                type="number"
                name="dailyWage"
                className={`form-control ${
                  errors.dailyWage
                    ? "is-invalid"
                    : ""
                }`}
                value={formData.dailyWage}
                onChange={handleChange}
                placeholder="Enter daily wage"
                min="1"
              />

              {errors.dailyWage && (
                <div className="invalid-feedback">
                  {errors.dailyWage}
                </div>
              )}

            </div>

            {/* Join Date */}
            <div className="col-md-6">

              <label className="form-label">
                Join Date
              </label>

              <input
                type="date"
                name="joinDate"
                className={`form-control ${
                  errors.joinDate
                    ? "is-invalid"
                    : ""
                }`}
                value={formData.joinDate}
                onChange={handleChange}
              />

              {errors.joinDate && (
                <div className="invalid-feedback">
                  {errors.joinDate}
                </div>
              )}

            </div>

            {/* Status */}
            <div className="col-md-6">

              <label className="form-label">
                Status
              </label>

              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>

            </div>

          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-end gap-2 mt-4">

            <button
              type="button"
              className="btn btn-light"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-success"
            >
              <i className="bi bi-check2 me-1"></i>

              {editingWorker
                ? "Update Worker"
                : "Save Worker"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default WorkerForm;