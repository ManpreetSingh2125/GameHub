import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./AdminLoginPage.css"; // Optional: Add custom styles

const AdminLoginPage = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      if (response.data.token) {
        console.log(response);
        const payload = JSON.parse(atob(response.data.token.split(".")[1]));

        // Check if the user is an admin
        if (!payload.isAdmin) {
          Swal.fire({
            icon: "error",
            title: "Access Denied!",
            text: "You do not have admin privileges.",
            confirmButtonText: "OK",
            theme: "dark",
          });
          return;
        }

        // Set user state and token
        localStorage.setItem("token", response.data.token);
        setUser({ id: payload.userId, isAdmin: payload.isAdmin });

        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Admin Login Successful!",
          text: "Welcome, Admin!",
          confirmButtonText: "OK",
          theme: "dark",
        }).then(() => {
          navigate("/"); // Redirect to admin dashboard
        });
      
    }

    } catch (err) {
      // Show error alert
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
        <button type="submit">Login as Admin</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;