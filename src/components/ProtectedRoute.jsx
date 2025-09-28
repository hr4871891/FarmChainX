// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

<<<<<<< HEAD
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
=======
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

>>>>>>> 53cce94d6235c342ee6e5b3cae2bedcc58faea38
  return children;
};

export default ProtectedRoute;
