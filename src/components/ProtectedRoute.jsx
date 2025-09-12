// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// roles: optional array, e.g. ["admin", "farmer"]
const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // If user doesn’t have permission, send them away
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
