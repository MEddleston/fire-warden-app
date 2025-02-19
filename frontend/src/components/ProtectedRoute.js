import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Get user from local storage

  if (!user) {
    return <Navigate to="/" replace />; // Redirect to login if not logged in
  }

  if (user.role !== role) {
    return <Navigate to="/" replace />; // Redirect if role doesn't match
  }

  return children;
};

export default ProtectedRoute;
