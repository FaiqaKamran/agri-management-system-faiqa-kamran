import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../../store/reducers/authReducer";
import apiClient from "../../api/apiClient";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await apiClient("/users/login", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const user = response.user;

      localStorage.setItem("agri_token", user.token);

      dispatch(
        login({
          user: {
            id: user.id,
            name: user.fullName,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            token: user.token,
          },
          role: user.role,
        })
      );

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.message || "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
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
              onChange={(event) =>
                setEmail(event.target.value)
              }
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
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? (
              "Signing in..."
            ) : (
              <>
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Login
              </>
            )}
          </button>

        </form>

      </div>

    </div>
  );
};

export default LoginForm;