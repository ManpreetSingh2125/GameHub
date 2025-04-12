import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

// Import static images
import playstation5 from "../components/img/c1.png";
import xboxSeriesX from "../components/img/c2.png";
import nintendoSwitch from "../components/img/c3.png";

const LandingPage = () => {
  return (
    <main>
      <div className="landing-page">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to GameHub</h1>
            <p>Your ultimate destination for gaming consoles and accessories.</p>
            <Link to="/consoles" className="btn">
              Explore Consoles
            </Link>
          </div>
        </section>

        {/* About Us Banner */}
        <section className="about-banner">
          <div className="about-content">
            <h2>About GameHub</h2>
            <p>
              At GameHub, we're passionate about gaming. Our mission is to bring
              you the latest consoles and accessories to elevate your gaming
              experience.
            </p>
          </div>
        </section>

        {/* Featured Consoles Section */}
        <section className="featured-consoles">
          <h2>Featured Consoles</h2>
          <div className="console-list">
            <div className="console-card">
              <img src={playstation5} alt="PlayStation 5" />
              <h3>PlayStation 5</h3>
              <p>$499</p>
            </div>
            <div className="console-card">
              <img src={xboxSeriesX} alt="Xbox Series X" />
              <h3>Xbox Series X</h3>
              <p>$499</p>
            </div>
            <div className="console-card">
              <img src={nintendoSwitch} alt="Nintendo Switch" />
              <h3>Nintendo Switch</h3>
              <p>$299</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default LandingPage;