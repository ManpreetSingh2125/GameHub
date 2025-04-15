import React, { useState, useEffect } from "react";
import "./ViewProductsPage.css"; // Optional: Add custom styles

const ViewProductsPage = () => {
  const [activeTab, setActiveTab] = useState("consoles"); // Default active tab
  const [products, setProducts] = useState([]); // State to hold fetched products
  const [loading, setLoading] = useState(true); // Loading state for better UX

  // Function to fetch products based on active tab
  const fetchProducts = async (tabName) => {
    setLoading(true);
    try {
      let url = "";
      switch (tabName) {
        case "consoles":
          url = "http://localhost:5000/api/consoles"; // Match your backend route
          break;
        case "games":
          url = "http://localhost:5000/api/games"; // Match your backend route
          break;
        case "accessories":
          url = "http://localhost:5000/api/accessories"; // Match your backend route
          break;
        default:
          throw new Error("Invalid tab");
      }
  
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when the active tab changes
  useEffect(() => {
    fetchProducts(activeTab);
  }, [activeTab]);

  // Handle tab clicks
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="view-products-page">
      <h1>View Products</h1>
      <p>View all products in your store inventory.</p>

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
        {loading ? (
          <p>Loading...</p>
        ) : products.length > 0 ? (
          <table className="product-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                {activeTab === "games" && <th>Category</th>}
                {activeTab === "accessories" && <th>Type</th>}
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  {activeTab === "games" && <td>{product.category}</td>}
                  {activeTab === "accessories" && <td>{product.type}</td>}
                  <td>{product.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default ViewProductsPage;