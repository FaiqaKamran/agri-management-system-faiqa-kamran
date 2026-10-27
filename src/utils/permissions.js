export const isAdmin = (role) =>
  role === "Admin";

export const isManager = (role) =>
  role === "Manager";

export const canManageUsers = (role) =>
  role === "Admin";

export const canDeleteRecords = (role) =>
  role === "Admin";

export const canManageFarmOperations = (
  role
) =>
  role === "Admin" ||
  role === "Manager";

export const canViewReports = (role) =>
  role === "Admin" ||
  role === "Manager";