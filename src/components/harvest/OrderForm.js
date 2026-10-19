import React, { useEffect, useState } from "react";

const OrderForm = ({
  order,
  crops,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState({
    cropId: "",
    quantity: "",
    orderDate: "",
    status: "Pending",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (order) {
      setForm({
        cropId: String(order.cropId),
        quantity: order.quantity,
        orderDate: order.orderDate,
        status: order.status,
      });
    } else {
      setForm({
        cropId: "",
        quantity: "",
        orderDate: new Date()
          .toISOString()
          .split("T")[0],
        status: "Pending",
      });
    }
  }, [order]);

  const selectedCrop = crops.find(
    (crop) =>
      Number(crop.id) === Number(form.cropId)
  );

  const availableStock = selectedCrop
    ? Number(selectedCrop.harvestQty || 0) -
      Number(selectedCrop.soldQty || 0)
    : 0;

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

    if (!form.cropId) {
      newErrors.cropId =
        "Please select a crop.";
    }

    if (
      form.quantity === "" ||
      Number(form.quantity) <= 0
    ) {
      newErrors.quantity =
        "Quantity must be greater than 0.";
    }

    if (
      selectedCrop &&
      Number(form.quantity) >
        availableStock
    ) {
      newErrors.quantity = `Only ${availableStock} kg available.`;
    }

    if (!form.orderDate) {
      newErrors.orderDate =
        "Order date is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      cropId: Number(form.cropId),
      quantity: Number(form.quantity),
      orderDate: form.orderDate,
      status: form.status,
    });
  };

  return (
    <div className="custom-modal-backdrop">
      <div className="custom-modal form-modal">
        <div className="modal-header-custom">
          <div>
            <h5>
              {order
                ? "Edit Order"
                : "Create New Order"}
            </h5>

            <p>
              Enter order details below.
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
            <div className="col-12">
              <label className="form-label">
                Crop
              </label>

              <select
                name="cropId"
                className={`form-select ${
                  errors.cropId
                    ? "is-invalid"
                    : ""
                }`}
                value={form.cropId}
                onChange={handleChange}
              >
                <option value="">
                  Select Crop
                </option>

                {crops.map((crop) => {
                  const stock =
                    Number(
                      crop.harvestQty || 0
                    ) -
                    Number(
                      crop.soldQty || 0
                    );

                  return (
                    <option
                      key={crop.id}
                      value={crop.id}
                    >
                      {crop.name} — {stock} kg
                      available
                    </option>
                  );
                })}
              </select>

              {errors.cropId && (
                <div className="invalid-feedback">
                  {errors.cropId}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Quantity (kg)
              </label>

              <input
                type="number"
                name="quantity"
                min="1"
                className={`form-control ${
                  errors.quantity
                    ? "is-invalid"
                    : ""
                }`}
                value={form.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
              />

              {selectedCrop && (
                <small className="form-help">
                  Available stock:{" "}
                  <strong>
                    {availableStock} kg
                  </strong>
                </small>
              )}

              {errors.quantity && (
                <div className="invalid-feedback">
                  {errors.quantity}
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Order Date
              </label>

              <input
                type="date"
                name="orderDate"
                className={`form-control ${
                  errors.orderDate
                    ? "is-invalid"
                    : ""
                }`}
                value={form.orderDate}
                onChange={handleChange}
              />

              {errors.orderDate && (
                <div className="invalid-feedback">
                  {errors.orderDate}
                </div>
              )}
            </div>

            <div className="col-12">
              <label className="form-label">
                Order Status
              </label>

              <select
                name="status"
                className="form-select"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="Delivered">
                  Delivered
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>
              </select>
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
              {order
                ? "Update Order"
                : "Create Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;