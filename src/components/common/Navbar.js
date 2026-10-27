import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../store/reducers/authReducer";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, role } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="top-navbar">
      <div className="navbar-left">
        <div>
          <h5>Farm Management</h5>
          <small>Agriculture Management System</small>
        </div>
      </div>

      <div className="navbar-right">
        <button
          type="button"
          className="navbar-icon-btn"
          title="Notifications"
        >
          <i className="bi bi-bell"></i>
        </button>

        <div className="navbar-user">
          <div className="navbar-user-avatar">
            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div className="navbar-user-info">
            <strong>{user?.name || "User"}</strong>

            <small>
              {role === "Admin"
                ? "Administrator"
                : "Farm Manager"}
            </small>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm navbar-logout"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right"></i>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;