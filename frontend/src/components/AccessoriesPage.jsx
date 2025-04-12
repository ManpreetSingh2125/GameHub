import React, { useEffect, useState } from "react";
import api from "../api";
import "./AccessoriesPage.css";

// Import the accessory images statically
import a1Image from "../components/img/a1.png"; // Wireless Controller
import a2Image from "../components/img/a2.png"; // Gaming Headset
import a3Image from "../components/img/a3.png"; // Charging Dock
import a4Image from "../components/img/a4.png"; // Gaming Mouse
import a5Image from "../components/img/a5.png"; // Keyboard
import a6Image from "../components/img/a6.png"; // Keyboard
import a7Image from "../components/img/a7.png"; // Keyboard
import a8Image from "../components/img/a8.png"; // Keyboard


const AccessoriesPage = ({ addToCart }) => {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapping of accessory names to their respective images
  const accessoryImages = {
    "Wireless Controller": a1Image,
    "Gaming Headset": a2Image,
    "Charging Dock": a3Image,
    "Gaming Mouse": a4Image,
    "Keyboard": a5Image,
    "Monitor Stand": a6Image,
    "Gaming Chair": a7Image,
    "VR Headset Adapter": a8Image,

  };

  useEffect(() => {
    // Fetch accessories from the backend
    api
      .get("/api/accessories")
      .then((response) => {
        setAccessories(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch accessories.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <div className="accessories-page">
        <h1>Available Accessories</h1>
        <div className="accessory-list">
          {accessories.map((accessory) => (
            <div key={accessory._id} className="accessory-card">
              {/* Use the mapped image based on the accessory name */}
              <img
                src={
                  accessoryImages[accessory.name] ||
                  "https://via.placeholder.com/200"
                } // Fallback image if name doesn't match
                alt={accessory.name}
              />
              <h3>{accessory.name}</h3>
              <p className="description">{accessory.description}</p>
              <p className="price">${accessory.price}</p>
              <p className="rating">Rating: {accessory.rating}/5</p>
              <button onClick={() => addToCart(accessory)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AccessoriesPage;