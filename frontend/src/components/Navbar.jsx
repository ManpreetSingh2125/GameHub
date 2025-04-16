// Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../components/img/logo.png";

const Navbar = ({ cart, logout, user }) => {
  const [isActive, setIsActive] = useState(false);

  const regularUserLinks = [
    { to: "/consoles", label: "Consoles" },
    { to: "/games", label: "Games" },
    { to: "/accessories", label: "Accessories" },
    { to: "/cart", label: `Cart (${cart?.length || 0})` },
    { to: "/checkout", label: "Checkout" },
    { to: "#", label: "Logout", onClick: logout },
  ];

  const adminUserLinks = [
    // { to: "#", label: "Create Admin" },
    { to: "#", label: "Logout", onClick: logout },
  ];

  const navLinks = user?.isAdmin ? adminUserLinks : regularUserLinks;

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="GameHub Logo" className="logo-image" />
        </Link>
      </div>

      {/* Display Username */}
      {user && (
        <div className="user-greeting">
          Welcome, {user.username || "User"}!
        </div>
      )}

      <ul className="desktop-links">
        {navLinks.map((link, index) => (
          <li key={index}>
            {link.onClick ? (
              <a href="#" onClick={link.onClick}>
                {link.label}
              </a>
            ) : (
              <Link to={link.to}>{link.label}</Link>
            )}
          </li>
        ))}
      </ul>

      <div
        className="hamburger"
        onClick={() => setIsActive(!isActive)}
        aria-expanded={isActive}
        aria-label="Toggle navigation"
      >
        {isActive ? "✖" : "☰"}
      </div>

      <ul className={`mobile-links ${isActive ? "active" : ""}`}>
        {/* Show username in mobile menu too */}
        {user && (
          <li className="user-greeting-mobile">
            Welcome, {user.username || "User"}!
          </li>
        )}
        {navLinks.map((link, index) => (
          <li key={index}>
            {link.onClick ? (
              <a href="#" onClick={link.onClick}>
                {link.label}
              </a>
            ) : (
              <Link to={link.to} onClick={() => setIsActive(false)}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;