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
        <Link to="/admin/add-products" className="admin-action-card">
          <h3>Add Products</h3>
          <p>Add new products to the store inventory.</p>
        </Link>

        <Link to="/admin/manage-orders" className="admin-action-card">
          <h3>Manage Orders</h3>
          <p>View and manage customer orders.</p>
        </Link>

        <Link to="/admin/manage-users" className="admin-action-card">
          <h3>Manage Users</h3>
          <p>View and manage registered users.</p>
        </Link>

        <Link to="/admin/view-reports" className="admin-action-card">
          <h3>View Reports</h3>
          <p>Generate and view sales reports.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;