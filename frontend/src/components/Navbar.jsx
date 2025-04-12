import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../components/img/logo.png"; // Adjusted path based on folder structure

const Navbar = ({ cart, logout }) => {
  const [isActive, setIsActive] = useState(false);

  // Define navigation links in an array for easier management and scalability
  const navLinks = [
    { to: "/consoles", label: "Consoles" },
    { to: "/games", label: "Games" },
    { to: "/accessories", label: "Accessories" },
    { to: "/cart", label: `Cart (${cart?.length || 0})` }, // Dynamically display cart item count
    { to: "/checkout", label: "Checkout" },
    { to: "#", label: "Logout", onClick: logout }, // Call logout function
  ];

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="GameHub Logo" className="logo-image" />
        </Link>
      </div>

      {/* Desktop Navigation Links */}
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

      {/* Hamburger Menu (Mobile) */}
      <div
        className="hamburger"
        onClick={() => setIsActive(!isActive)}
        aria-expanded={isActive}
        aria-label="Toggle navigation"
      >
        {isActive ? "✖" : "☰"}
      </div>

      {/* Mobile Navigation Links */}
      <ul className={`mobile-links ${isActive ? "active" : ""}`}>
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