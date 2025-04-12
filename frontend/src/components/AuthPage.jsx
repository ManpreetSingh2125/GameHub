import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./AuthPage.css";

const AuthPage = ({ setUser }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Reset form when switching tabs
  useEffect(() => {
    setFormData({ username: "", email: "", password: "" });
  }, [activeTab]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        const payload = JSON.parse(atob(response.data.token.split(".")[1]));
        setUser({ id: payload.userId, isAdmin: payload.isAdmin }); // Update user state

        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "You are now logged in.",
          confirmButtonText: "OK",
          theme: "dark"

        }).then(() => {
          navigate("/"); // Redirect to homepage after confirmation
        });
      }
    } catch (err) {
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: err.response?.data?.message || "An error occurred during login.",
        confirmButtonText: "Try Again",
        theme: "dark"

      });
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/api/auth/register", formData);

      if (response.data.token) {
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "You have been registered successfully. Please log in.",
          confirmButtonText: "OK",
          theme: "dark"

        }).then(() => {
          setActiveTab("login"); // Switch to login tab after confirmation
        });
      }
    } catch (err) {
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Registration Failed!",
        text: err.response?.data?.message || "An error occurred during registration.",
        confirmButtonText: "Try Again",
        theme: "dark"
      });
    }
  };

  return (
    <div className="auth-page">
      <h1>Authentication</h1>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === "login" ? "active" : ""}`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          className={`tab ${activeTab === "register" ? "active" : ""}`}
          onClick={() => setActiveTab("register")}
        >
          Register
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "login" ? (
          <form onSubmit={handleLoginSubmit}>
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
            <button type="submit">Login</button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
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
            <button type="submit">Register</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;