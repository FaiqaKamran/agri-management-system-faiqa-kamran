import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: "bi-speedometer2",
    },
    {
      path: "/crops",
      label: "Crop Management",
      icon: "bi-flower1",
    },
    {
      path: "/harvest-orders",
      label: "Harvest & Orders",
      icon: "bi-basket",
    },
    {
      path: "/buyers",
      label: "Buyers",
      icon: "bi-people",
    },
    {
      path: "/tasks",
      label: "Farm Tasks",
      icon: "bi-list-check",
    },
    {
      path: "/expenses",
      label: "Expenses",
      icon: "bi-cash-stack",
    },
    {
      path: "/inventory",
      label: "Inventory",
      icon: "bi-box-seam",
    },
    {
      path: "/workers",
      label: "Workers",
      icon: "bi-people",
    },
    {
      path: "/attendance",
      label: "Attendance",
      icon: "bi-calendar-check",
    },
    {
      path: "/wages",
      label: "Wages",
      icon: "bi-cash-coin",
    },
    {
      path: "/equipment",
      label: "Equipment",
      icon: "bi-tools",
    },
    {
    path: "/maintenance",
    label: "Maintenance",
    icon: "bi-wrench-adjustable",
    },
    {
      path: "/reports",
      label: "Reports",
      icon: "bi-bar-chart",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <i className="bi bi-flower1"></i>
        </div>

        <div>
          <h5>Agri Management</h5>
          <span>Farm Operations</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <i className={`bi ${item.icon}`}></i>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-content">
          <i className="bi bi-shield-check"></i>

          <div>
            <strong>Secure System</strong>
            <small>Role-based access</small>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;