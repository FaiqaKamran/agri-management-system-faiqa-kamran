import React from "react";

import {
  useSelector,
} from "react-redux";

import {
  Navigate,
  Outlet,
} from "react-router-dom";

const ProtectedRoute = ({
  allowedRoles,
}) => {

  const {
    isAuthenticated,
    role,
  } = useSelector(
    (state) => state.auth
  );

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(role)
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;