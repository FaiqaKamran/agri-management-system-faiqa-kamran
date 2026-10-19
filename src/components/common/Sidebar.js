import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const closeSidebar = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={() => setOpen(!open)}
      >
        <i className="bi bi-list"></i>
      </button>

      <aside
        className={`sidebar ${
          open ? "sidebar-open" : ""
        }`}
      >
        <div className="brand">
          <div className="brand-icon">
            <i className="bi bi-flower1"></i>
          </div>

          <div>
            <h5>AgriSmart</h5>
            <span>Management System</span>
          </div>
        </div>

        <div className="sidebar-label">
          MAIN MENU
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/dashboard"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-grid-1x2"></i>
            Dashboard
          </NavLink>

          <NavLink
            to="/crops"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-tree"></i>
            Crops
          </NavLink>

          <NavLink
            to="/harvest-orders"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-box-seam"></i>
            Harvest & Orders
          </NavLink>

          <NavLink
            to="/buyers"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <i className="bi bi-people"></i>
            Buyers
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <i className="bi bi-shield-check"></i>
          <span>Farm Manager</span>
        </div>
      </aside>

      {open && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;