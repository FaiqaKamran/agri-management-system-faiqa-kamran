const ConfirmModal = ({
  show,
  title = "Confirm Action",
  message = "Are you sure?",
  onConfirm,
  onCancel,
}) => {
  if (!show) {
    return null;
  }

  return (
    <div className="custom-modal-backdrop">
      <div className="custom-modal">
        <div className="modal-icon danger">
          <i className="bi bi-exclamation-triangle"></i>
        </div>

        <h5>{title}</h5>

        <p>{message}</p>

        <div className="modal-actions">
          <button
            className="btn btn-light"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="btn btn-danger"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;