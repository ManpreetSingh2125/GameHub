import React from "react";
import "./Footer.css";
import gamehubLogo from "../components/img/footerlogo.png"; // Adjust the path to your logo image

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <img src={gamehubLogo} alt="GameHub Logo" className="footer-logo" />
          <p>© {new Date().getFullYear()} GameHub. All rights reserved.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/consoles">Console</a></li>
            <li><a href="/games">Games</a></li>
            <li><a href="/accessories">Accessories</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;