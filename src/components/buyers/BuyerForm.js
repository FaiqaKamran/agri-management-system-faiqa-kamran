import React, { useEffect, useState } from "react";

import CnicInput from "./CnicInput";
import ImageUpload from "./ImageUpload";

import {
  validateName,
  validateCnic,
} from "../../utils/validators";

const initialForm = {
  name: "",
  cnic: "",
  phone: "",
  address: "",
  image: "",
};

const BuyerForm = ({
  buyer,
  buyers,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] =
    useState(initialForm);

  const [errors, setErrors] =
    useState({});

  useEffect(() => {
    if (buyer) {
      setForm({
        name: buyer.name || "",
        cnic: buyer.cnic || "",
        phone: buyer.phone || "",
        address: buyer.address || "",
        image: buyer.image || "",
      });
    } else {
      setForm(initialForm);
    }
  }, [buyer]);

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

  const handleCnicChange = (value) => {
    setForm((prev) => ({
      ...prev,
      cnic: value,
    }));

    setErrors((prev) => ({
      ...prev,
      cnic: "",
    }));
  };

  const handleImageChange = (
    file,
    preview
  ) => {
    if (!file) {
      setForm((prev) => ({
        ...prev,
        image: "",
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      image: preview,
    }));

    setErrors((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    const nameError = validateName(
      form.name
    );

    if (nameError) {
      newErrors.name = nameError;
    }

    const cnicError = validateCnic(
      form.cnic
    );

    if (cnicError) {
      newErrors.cnic = cnicError;
    }

    const duplicate = buyers.some(
      (item) =>
        item.cnic === form.cnic &&
        (!buyer || item.id !== buyer.id)
    );

    if (duplicate) {
      newErrors.cnic =
        "This CNIC is already registered.";
    }

    if (!form.phone.trim()) {
      newErrors.phone =
        "Phone number is required.";
    } else if (
      !/^03\d{9}$/.test(
        form.phone.replace(/\D/g, "")
      )
    ) {
      newErrors.phone =
        "Enter a valid Pakistani mobile number.";
    }

    if (!form.address.trim()) {
      newErrors.address =
        "Address is required.";
    }

    if (!form.image) {
      newErrors.image =
        "Buyer photo is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      ...form,
    });
  };

  return (
    <div className="custom-modal-backdrop">
      <div className="custom-modal form-modal buyer-form-modal">
        <div className="modal-header-custom">
          <div>
            <h5>
              {buyer
                ? "Edit Buyer"
                : "Add New Buyer"}
            </h5>

            <p>
              Enter buyer information below.
            </p>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onCancel}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-8">
              <label className="form-label">
                Buyer Name
              </label>

              <input
                type="text"
                name="name"
                className={`form-control ${
                  errors.name
                    ? "is-invalid"
                    : ""
                }`}
                value={form.name}
                onChange={handleChange}
                placeholder="Enter buyer name"
              />

              {errors.name && (
                <div className="invalid-feedback">
                  {errors.name}
                </div>
              )}
            </div>

            <div className="col-md-4">
              <label className="form-label">
                CNIC
              </label>

              <CnicInput
                value={form.cnic}
                onChange={handleCnicChange}
                error={errors.cnic}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                className={`form-control ${
                  errors.phone
                    ? "is-invalid"
                    : ""
                }`}
                value={form.phone}
                onChange={handleChange}
                placeholder="03XXXXXXXXX"
              />

              {errors.phone && (
                <div className="invalid-feedback">
                  {errors.phone}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Address
              </label>

              <input
                type="text"
                name="address"
                className={`form-control ${
                  errors.address
                    ? "is-invalid"
                    : ""
                }`}
                value={form.address}
                onChange={handleChange}
                placeholder="Enter buyer address"
              />

              {errors.address && (
                <div className="invalid-feedback">
                  {errors.address}
                </div>
              )}
            </div>

            <div className="col-12">
              <ImageUpload
                value={form.image}
                onChange={handleImageChange}
                error={errors.image}
              />
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
              {buyer
                ? "Update Buyer"
                : "Add Buyer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyerForm;