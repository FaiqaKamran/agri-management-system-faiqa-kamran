import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="empty-state">
      <i className="bi bi-compass"></i>

      <h4>Page Not Found</h4>

      <p>
        The page you are looking for does not
        exist.
      </p>

      <Link
        to="/dashboard"
        className="btn btn-primary mt-3"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;