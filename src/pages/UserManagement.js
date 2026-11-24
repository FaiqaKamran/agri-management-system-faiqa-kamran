import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [addingUser, setAddingUser] = useState(false);

  const [editingUserId, setEditingUserId] = useState(null);
  const [updatingUser, setUpdatingUser] = useState(false);


  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiClient("/users");

      setUsers(response.data || []);
    } catch (error) {
      console.error("Fetch users error:", error);
      setError(error.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);


  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  const handleAddUser = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setAddingUser(true);

      await apiClient("/users/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      setSuccess("User added successfully.");

      setFormData({
        fullName: "",
        username: "",
        email: "",
        password: "",
      });

      await fetchUsers();

    } catch (error) {
      console.error("Add user error:", error);
      setError(error.message || "Failed to add user.");

    } finally {
      setAddingUser(false);
    }
  };


  /*
    Start editing a user
  */
  const handleEditUser = (user) => {
    setEditingUserId(user.id);

    setFormData({
      fullName: user.fullName || "",
      username: user.username || "",
      email: user.email || "",
      password: "",
    });

    setError("");
    setSuccess("");
  };


  /*
    Cancel editing
  */
  const handleCancelEdit = () => {
    setEditingUserId(null);

    setFormData({
      fullName: "",
      username: "",
      email: "",
      password: "",
    });

    setError("");
    setSuccess("");
  };


  /*
    Update user
  */
  const handleUpdateUser = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!editingUserId) {
      return;
    }

    if (
      formData.password &&
      formData.password.length < 6
    ) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setUpdatingUser(true);

      await apiClient(`/users/${editingUserId}`, {
        method: "PUT",
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          username: formData.username.trim(),
          email: formData.email.trim(),
          ...(formData.password
            ? { password: formData.password }
            : {}),
        }),
      });

      setSuccess("User updated successfully.");

      setEditingUserId(null);

      setFormData({
        fullName: "",
        username: "",
        email: "",
        password: "",
      });

      await fetchUsers();

    } catch (error) {
      console.error("Update user error:", error);
      setError(error.message || "Failed to update user.");

    } finally {
      setUpdatingUser(false);
    }
  };


  /*
    Delete user
  */
  const handleDeleteUser = async (userId, username) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete user "${username}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await apiClient(`/users/${userId}`, {
        method: "DELETE",
      });

      setSuccess("User deleted successfully.");

      await fetchUsers();

    } catch (error) {
      console.error("Delete user error:", error);
      setError(error.message || "Failed to delete user.");
    }
  };


  return (
    <div className="container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="mb-1">
            User Management
          </h2>

          <p className="text-muted mb-0">
            Add, update and manage system users.
          </p>
        </div>

      </div>


      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}


      {success && (
        <div className="alert alert-success">
          {success}
        </div>
      )}


      <div className="row g-4">

        {/* Add / Edit User */}

        <div className="col-lg-4">

          <div className="card shadow-sm border-0">

            <div className="card-header bg-white">

              <h5 className="mb-0">

                <i
                  className={
                    editingUserId
                      ? "bi bi-pencil-square me-2"
                      : "bi bi-person-plus me-2"
                  }
                ></i>

                {editingUserId
                  ? "Edit User"
                  : "Add New User"}

              </h5>

            </div>


            <div className="card-body">

              <form
                onSubmit={
                  editingUserId
                    ? handleUpdateUser
                    : handleAddUser
                }
              >

                <div className="mb-3">

                  <label className="form-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                  />

                </div>


                <div className="mb-3">

                  <label className="form-label">
                    Username
                  </label>

                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    required
                  />

                </div>


                <div className="mb-3">

                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                  />

                </div>


                <div className="mb-3">

                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={
                      editingUserId
                        ? "Leave blank to keep current password"
                        : "Enter password"
                    }
                    minLength="6"
                    required={!editingUserId}
                  />

                  {editingUserId && (
                    <small className="text-muted">
                      Leave blank if you do not want to
                      change the password.
                    </small>
                  )}

                </div>


                <div className="d-flex gap-2">

                  <button
                    type="submit"
                    className="btn btn-success flex-grow-1"
                    disabled={
                      addingUser || updatingUser
                    }
                  >

                    {addingUser ? (
                      "Adding User..."
                    ) : updatingUser ? (
                      "Updating User..."
                    ) : editingUserId ? (
                      <>
                        <i className="bi bi-check-lg me-2"></i>
                        Update User
                      </>
                    ) : (
                      <>
                        <i className="bi bi-person-plus me-2"></i>
                        Add User
                      </>
                    )}

                  </button>


                  {editingUserId && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={handleCancelEdit}
                      disabled={updatingUser}
                    >
                      Cancel
                    </button>
                  )}

                </div>

              </form>

            </div>

          </div>

        </div>


        {/* Users List */}

        <div className="col-lg-8">

          <div className="card shadow-sm border-0">

            <div className="card-header bg-white d-flex justify-content-between align-items-center">

              <h5 className="mb-0">

                <i className="bi bi-people me-2"></i>

                Existing Users

              </h5>


              <span className="badge bg-success">
                {users.length} Users
              </span>

            </div>


            <div className="card-body p-0">

              {loading ? (

                <div className="text-center py-5">

                  <div
                    className="spinner-border text-success"
                    role="status"
                  ></div>

                  <p className="mt-3 mb-0">
                    Loading users...
                  </p>

                </div>

              ) : users.length === 0 ? (

                <div className="text-center py-5">

                  <i className="bi bi-people fs-1 text-muted"></i>

                  <p className="mt-3 mb-0 text-muted">
                    No users found.
                  </p>

                </div>

              ) : (

                <div className="table-responsive">

                  <table className="table table-hover align-middle mb-0">

                    <thead>

                      <tr>
                        <th>Full Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                      </tr>

                    </thead>


                    <tbody>

                      {users.map((user) => (

                        <tr key={user.id}>

                          <td>
                            <strong>
                              {user.fullName}
                            </strong>
                          </td>


                          <td>
                            {user.username}
                          </td>


                          <td>
                            {user.email}
                          </td>


                          <td>

                            <span
                              className={`badge ${
                                user.role === "admin"
                                  ? "bg-primary"
                                  : "bg-secondary"
                              }`}
                            >

                              {user.role === "admin"
                                ? "Admin"
                                : "Manager"}

                            </span>

                          </td>


                          <td>

                            <div className="d-flex gap-2">

                              {/* Edit */}

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() =>
                                  handleEditUser(user)
                                }
                                disabled={
                                  user.role === "admin"
                                }
                                title={
                                  user.role === "admin"
                                    ? "Admin accounts cannot be edited"
                                    : "Edit user"
                                }
                              >

                                <i className="bi bi-pencil me-1"></i>
                                Edit

                              </button>


                              {/* Delete */}

                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  handleDeleteUser(
                                    user.id,
                                    user.username
                                  )
                                }
                                disabled={
                                  user.role === "admin"
                                }
                                title={
                                  user.role === "admin"
                                    ? "Admin accounts cannot be deleted"
                                    : "Delete user"
                                }
                              >

                                <i className="bi bi-trash me-1"></i>
                                Delete

                              </button>

                            </div>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UserManagement;