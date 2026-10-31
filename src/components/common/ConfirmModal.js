import React from "react";

const ConfirmModal = ({
  show,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item?",
  onConfirm,
  onCancel,
}) => {
  if (!show) {
    return null;
  }

  return (
    <>
      <div
        className="modal-backdrop fade show"
        onClick={onCancel}
      ></div>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
        >
          <div className="modal-content border-0 shadow">

            <div className="modal-header">
              <h5 className="modal-title">
                <i className="bi bi-exclamation-triangle text-danger me-2"></i>
                {title}
              </h5>

              <button
                type="button"
                className="btn-close"
                onClick={onCancel}
              ></button>
            </div>

            <div className="modal-body">
              <p className="mb-0 text-muted">
                {message}
              </p>
            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-light"
                onClick={onCancel}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={onConfirm}
              >
                <i className="bi bi-trash me-2"></i>
                Delete
              </button>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;