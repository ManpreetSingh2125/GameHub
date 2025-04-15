import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ user, children }) => {
  if (!user || !user.isAdmin) {
    // Redirect to login if user is not authenticated or not an admin
    return <Navigate to="/admin-login" replace />;
  }

  // Render the protected content
  return children;
};

export default AdminProtectedRoute;