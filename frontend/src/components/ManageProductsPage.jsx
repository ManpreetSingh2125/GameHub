import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ManageProductsPage.css"; // Optional: Add custom styles

const ManageProductsPage = () => {
  const [activeTab, setActiveTab] = useState("consoles"); // Default active tab

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="manage-products-page">
      <h1>Manage Products</h1>
      <p>Add and manage products for your store.</p>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "consoles" ? "active" : ""}`}
          onClick={() => handleTabClick("consoles")}
        >
          Consoles
        </button>
        <button
          className={`tab-button ${activeTab === "games" ? "active" : ""}`}
          onClick={() => handleTabClick("games")}
        >
          Games
        </button>
        <button
          className={`tab-button ${activeTab === "accessories" ? "active" : ""}`}
          onClick={() => handleTabClick("accessories")}
        >
          Accessories
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "consoles" && (
          <div>
            <h2>Add Consoles</h2>
            <form className="product-form">
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Enter console name" required />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input type="number" placeholder="Enter price" required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Enter description" required />
              </div>
              <button type="submit">Add Console</button>
            </form>
          </div>
        )}

        {activeTab === "games" && (
          <div>
            <h2>Add Games</h2>
            <form className="product-form">
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Enter game name" required />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input type="number" placeholder="Enter price" required />
              </div>
              <div className="form-group">
                <label>Genre</label>
                <input type="text" placeholder="Enter genre" required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Enter description" required />
              </div>
              <button type="submit">Add Game</button>
            </form>
          </div>
        )}

        {activeTab === "accessories" && (
          <div>
            <h2>Add Accessories</h2>
            <form className="product-form">
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Enter accessory name" required />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input type="number" placeholder="Enter price" required />
              </div>
              <div className="form-group">
                <label>Type</label>
                <input type="text" placeholder="Enter type (e.g., controller)" required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Enter description" required />
              </div>
              <button type="submit">Add Accessory</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProductsPage;