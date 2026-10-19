import React, { useRef } from "react";

import { validateImage } from "../../utils/validators";

const ImageUpload = ({
  value,
  onChange,
  error,
}) => {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const validationError =
      validateImage(file);

    if (validationError) {
      onChange(null, null);
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      onChange(
        file,
        reader.result
      );
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="image-upload-wrapper">
      <label className="form-label">
        Buyer Photo
      </label>

      <div
        className={`image-upload ${
          error ? "image-upload-error" : ""
        }`}
        onClick={() =>
          inputRef.current?.click()
        }
      >
        {value ? (
          <div className="image-preview">
            <img
              src={value}
              alt="Buyer preview"
            />

            <div className="image-overlay">
              <i className="bi bi-camera"></i>
              <span>Change Photo</span>
            </div>
          </div>
        ) : (
          <div className="upload-placeholder">
            <i className="bi bi-cloud-arrow-up"></i>

            <strong>
              Upload Buyer Photo
            </strong>

            <span>
              JPG or PNG • Maximum 1 MB
            </span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        onChange={handleFileChange}
        hidden
      />

      {error && (
        <div className="upload-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;