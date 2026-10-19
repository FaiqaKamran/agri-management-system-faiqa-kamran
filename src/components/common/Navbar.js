import React, { useState } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("agri_dark_mode") === "true"
  );

  const toggleDarkMode = () => {
    const newValue = !darkMode;

    setDarkMode(newValue);
    localStorage.setItem(
      "agri_dark_mode",
      newValue
    );

    document.body.classList.toggle(
      "dark-mode",
      newValue
    );
  };

  const today = new Date().toLocaleDateString(
    "en-PK",
    {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <header className="topbar">
      <div>
        <h6>Welcome back </h6>
        <span>{today}</span>
      </div>

      <div className="topbar-actions">
        <button className="icon-btn">
          <i className="bi bi-bell"></i>
          <span className="notification-dot">
            3
          </span>
        </button>

        <button
          className="icon-btn"
          onClick={toggleDarkMode}
          title="Toggle dark mode"
        >
          <i
            className={`bi ${
              darkMode
                ? "bi-sun"
                : "bi-moon-stars"
            }`}
          ></i>
        </button>

        <div className="profile">
          <div className="profile-avatar">
            FM
          </div>

          <div>
            <strong>Farm Manager</strong>
            <small>Administrator</small>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;