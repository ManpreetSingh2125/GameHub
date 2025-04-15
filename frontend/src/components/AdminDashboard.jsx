import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css"; // Optional: Add custom styles

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Welcome to the Admin Dashboard</h1>
      <p>Manage your store's products, orders, and users from here.</p>

      {/* Admin Actions */}
      <div className="admin-actions">
        <Link to="/admin/manage-products" className="admin-action-card">
          <h3>Add Products</h3>
          <p>Add new products to the store inventory.</p>
        </Link>

        <Link to="/admin/view-products" className="admin-action-card">
          <h3>View Products</h3>
          <p>Generate and view sales reports.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;