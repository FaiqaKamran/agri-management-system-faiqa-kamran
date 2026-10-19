import React, { useEffect, useState } from "react";

const initialForm = {
  name: "",
  field: "",
  plantingDate: "",
  cuttingDate: "",
  healthScore: "",
  status: "Healthy",
  harvestQty: "",
};

const CropForm = ({
  crop,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (crop) {
      setForm({
        name: crop.name || "",
        field: crop.field || "",
        plantingDate: crop.plantingDate || "",
        cuttingDate: crop.cuttingDate || "",
        healthScore: crop.healthScore || "",
        status: crop.status || "Healthy",
        harvestQty: crop.harvestQty || "",
      });
    } else {
      setForm(initialForm);
    }
  }, [crop]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Crop name is required.";
    }

    if (!form.field.trim()) {
      newErrors.field = "Field name is required.";
    }

    if (!form.plantingDate) {
      newErrors.plantingDate =
        "Planting date is required.";
    }

    if (!form.cuttingDate) {
      newErrors.cuttingDate =
        "Cutting date is required.";
    }

    if (
      form.plantingDate &&
      form.cuttingDate &&
      new Date(form.cuttingDate) <
        new Date(form.plantingDate)
    ) {
      newErrors.cuttingDate =
        "Cutting date cannot be before planting date.";
    }

    if (
      form.healthScore === "" ||
      Number(form.healthScore) < 0 ||
      Number(form.healthScore) > 100
    ) {
      newErrors.healthScore =
        "Health score must be between 0 and 100.";
    }

    if (
      form.harvestQty === "" ||
      Number(form.harvestQty) <= 0
    ) {
      newErrors.harvestQty =
        "Harvest quantity must be greater than 0.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      ...form,
      healthScore: Number(form.healthScore),
      harvestQty: Number(form.harvestQty),
    });
  };

  return (
    <div className="custom-modal-backdrop">
      <div className="custom-modal form-modal">
        <div className="modal-header-custom">
          <div>
            <h5>
              {crop ? "Edit Crop" : "Add New Crop"}
            </h5>

            <p>
              Enter crop information below.
            </p>
          </div>

          <button
            className="modal-close"
            onClick={onCancel}
            type="button"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">
                Crop Name
              </label>

              <input
                type="text"
                name="name"
                className={`form-control ${
                  errors.name ? "is-invalid" : ""
                }`}
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Wheat"
              />

              {errors.name && (
                <div className="invalid-feedback">
                  {errors.name}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Field
              </label>

              <input
                type="text"
                name="field"
                className={`form-control ${
                  errors.field ? "is-invalid" : ""
                }`}
                value={form.field}
                onChange={handleChange}
                placeholder="e.g. Field A"
              />

              {errors.field && (
                <div className="invalid-feedback">
                  {errors.field}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Planting Date
              </label>

              <input
                type="date"
                name="plantingDate"
                className={`form-control ${
                  errors.plantingDate
                    ? "is-invalid"
                    : ""
                }`}
                value={form.plantingDate}
                onChange={handleChange}
              />

              {errors.plantingDate && (
                <div className="invalid-feedback">
                  {errors.plantingDate}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Cutting / Harvest Date
              </label>

              <input
                type="date"
                name="cuttingDate"
                className={`form-control ${
                  errors.cuttingDate
                    ? "is-invalid"
                    : ""
                }`}
                value={form.cuttingDate}
                onChange={handleChange}
              />

              {errors.cuttingDate && (
                <div className="invalid-feedback">
                  {errors.cuttingDate}
                </div>
              )}
            </div>

            <div className="col-md-4">
              <label className="form-label">
                Health Score (%)
              </label>

              <input
                type="number"
                name="healthScore"
                min="0"
                max="100"
                className={`form-control ${
                  errors.healthScore
                    ? "is-invalid"
                    : ""
                }`}
                value={form.healthScore}
                onChange={handleChange}
                placeholder="0 - 100"
              />

              {errors.healthScore && (
                <div className="invalid-feedback">
                  {errors.healthScore}
                </div>
              )}
            </div>

            <div className="col-md-4">
              <label className="form-label">
                Health Status
              </label>

              <select
                name="status"
                className="form-select"
                value={form.status}
                onChange={handleChange}
              >
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

            <div className="col-md-4">
              <label className="form-label">
                Harvest Quantity (kg)
              </label>

              <input
                type="number"
                name="harvestQty"
                min="1"
                className={`form-control ${
                  errors.harvestQty
                    ? "is-invalid"
                    : ""
                }`}
                value={form.harvestQty}
                onChange={handleChange}
                placeholder="e.g. 1000"
              />

              {errors.harvestQty && (
                <div className="invalid-feedback">
                  {errors.harvestQty}
                </div>
              )}
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-light"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
            >
              <i className="bi bi-check-lg"></i>{" "}
              {crop ? "Update Crop" : "Add Crop"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CropForm;