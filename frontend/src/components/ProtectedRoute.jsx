import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to AuthPage if no token exists
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;  