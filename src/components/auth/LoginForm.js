import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../../store/reducers/authReducer";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const demoUsers = [
    {
      email: "admin@agri.com",
      password: "admin123",
      name: "Farm Admin",
      role: "Admin",
    },
    {
      email: "manager@agri.com",
      password: "manager123",
      name: "Farm Manager",
      role: "Manager",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    const user = demoUsers.find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    dispatch(
      login({
        user: {
          name: user.name,
          email: user.email,
        },
        role: user.role,
      })
    );

    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <i className="bi bi-flower1"></i>
          </div>

          <h1>Agri Management</h1>

          <p>
            Sign in to manage your farm operations.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
          >
            <i className="bi bi-box-arrow-in-right me-2"></i>
            Login
          </button>
        </form>

        <div className="demo-login">
          <h6>Demo Credentials</h6>

          <p className="mb-1">
            <strong>Admin:</strong> admin@agri.com / admin123
          </p>

          <p className="mb-0">
            <strong>Manager:</strong> manager@agri.com / manager123
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;