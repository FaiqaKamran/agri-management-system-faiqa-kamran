import React, { useEffect } from "react";
const Toast = ({
  message,
  type = "success",
  show,
  onClose,
}) => {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [show, onClose]);

  if (!show) {
    return null;
  }

  const icon =
    type === "success"
      ? "bi-check-circle"
      : type === "danger"
      ? "bi-x-circle"
      : "bi-info-circle";

  return (
    <div className={`toast-message ${type}`}>
      <i className={`bi ${icon}`}></i>

      <span>{message}</span>

      <button onClick={onClose}>
        <i className="bi bi-x"></i>
      </button>
    </div>
  );
};

export default Toast;