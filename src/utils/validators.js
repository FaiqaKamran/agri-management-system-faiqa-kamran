export const validateName = (name) => {
  const value = name.trim();

  if (!value) {
    return "Name is required.";
  }

  if (value.length < 3) {
    return "Name must contain at least 3 characters.";
  }

  if (!/^[A-Za-z ]+$/.test(value)) {
    return "Name can contain letters and spaces only.";
  }

  return "";
};

export const formatCnic = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 13);

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

export const validateCnic = (cnic) => {
  const digits = cnic.replace(/\D/g, "");

  if (!digits) {
    return "CNIC is required.";
  }

  if (digits.length !== 13) {
    return "CNIC must contain 13 digits.";
  }

  if (!/^\d{5}-\d{7}-\d{1}$/.test(cnic)) {
    return "CNIC format must be 12345-1234567-1.";
  }

  return "";
};

export const validateImage = (file) => {
  if (!file) {
    return "Photo is required.";
  }

  const validTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  if (!validTypes.includes(file.type)) {
    return "Only JPG and PNG images are allowed.";
  }

  if (file.size > 1024 * 1024) {
    return "Image size must be less than 1 MB.";
  }

  return "";
};

export const validateQuantity = (
  quantity,
  availableStock
) => {
  if (!quantity || Number(quantity) <= 0) {
    return "Quantity must be greater than 0.";
  }

  if (Number(quantity) > Number(availableStock)) {
    return `Only ${availableStock} units are available.`;
  }

  return "";
};