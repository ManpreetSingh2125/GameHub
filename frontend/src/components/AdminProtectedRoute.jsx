import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children, user }) => {
  if (!user || !user.isAdmin) {
    return <Navigate to="/" />;
  }
  return children;
};

export default AdminProtectedRoute;