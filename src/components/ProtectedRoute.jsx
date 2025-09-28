// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth(); // assuming AuthContext stores { username, role }

  // If no user → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If route requires a specific role → check it
  if (role && user.role !== role) {
    return <Navigate to="/" replace />; // redirect or show "Unauthorized"
  }

  // Otherwise → allow access
  return children;
};

export default ProtectedRoute;
