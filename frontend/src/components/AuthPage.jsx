import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./AuthPage.css";

const AuthPage = ({ setUser }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  // Reset form when switching tabs
  useEffect(() => {
    setFormData({ username: "", email: "", password: "" });
    setError("");
    setSuccess(false);
  }, [activeTab]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await api.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        const payload = JSON.parse(atob(response.data.token.split(".")[1]));
        setUser({ id: payload.userId, isAdmin: payload.isAdmin }); // Update user state
        setSuccess("Login successful!");
        setTimeout(() => navigate("/"), 2000); // Redirect to homepage after 2 seconds
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await api.post("/api/auth/register", formData);
      if (response.data.token) {
        setSuccess("Registration successful! Please log in.");
        setTimeout(() => setActiveTab("login"), 2000); // Switch to login tab after 2 seconds
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
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

      {/* Error and Success Messages */}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

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