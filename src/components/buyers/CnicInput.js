import React from "react";
import { formatCnic } from "../../utils/validators";

const CnicInput = ({
  value,
  onChange,
  error,
}) => {
  const handleChange = (e) => {
    onChange(
      formatCnic(e.target.value)
    );
  };

  return (
    <>
      <input
        type="text"
        className={`form-control ${
          error ? "is-invalid" : ""
        }`}
        value={value}
        onChange={handleChange}
        placeholder="12345-1234567-1"
        maxLength="15"
      />

      {error && (
        <div className="invalid-feedback">
          {error}
        </div>
      )}
    </>
  );
};

export default CnicInput;