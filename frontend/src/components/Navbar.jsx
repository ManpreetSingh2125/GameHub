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
    { to: "/cart", label: `Cart (${cart?.length || 0})` },
    { to: "/checkout", label: "Checkout" },
    { to: "/auth", label: "Auth" }, // Combined Auth link
    { to: "#", label: "Logout", onClick: logout }, // Add logout link
  ];

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="GameHub Logo" className="logo-image" />
        </Link>
      </div>
      <ul className="desktop-links">
        {navLinks.map((link, index) => (
          <li key={index}>
            {link.onClick ? (
              <a href="#" onClick={link.onClick}>{link.label}</a>
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
        {navLinks.map((link, index) => (
          <li key={index}>
            {link.onClick ? (
              <a href="#" onClick={link.onClick}>{link.label}</a>
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