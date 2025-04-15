import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Swal from "sweetalert2";
import "./AdminLoginPage.css";

const AdminLoginPage = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the backend
      const response = await api.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // Extract token and payload from the response
      const { token } = response.data;
      if (!token) {
        throw new Error("Invalid server response");
      }

      // Decode the token to extract user information
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (!payload.isAdmin) {
        // Show error if the user is not an admin
        Swal.fire({
          icon: "error",
          title: "Access Denied!",
          text: "You do not have admin privileges.",
          confirmButtonText: "OK",
          theme: "dark",
        });
        return;
      }

      // Save token to localStorage and update user state with username
      localStorage.setItem("token", token);
      setUser({
        id: payload.userId,
        isAdmin: payload.isAdmin,
        username: payload.username || response.data.user?.username || "Admin", // Fallback to "Admin"
      });

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Admin Login Successful!",
        text: `Welcome, ${payload.username || response.data.user?.username || "Admin"}!`,
        confirmButtonText: "OK",
        theme: "dark",
      }).then(() => {
        // Redirect to admin dashboard
        navigate("/admin-dashboard");
      });
    } catch (err) {
      // Show error message for failed login attempts
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: err.response?.data?.message || "An error occurred during login.",
        confirmButtonText: "Try Again",
        theme: "dark",
      });
    }
  };

  return (
    <div className="admin-login-page">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Login as Admin</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;