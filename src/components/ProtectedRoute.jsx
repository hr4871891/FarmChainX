// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  // Get the user from our AuthContext
  const { user } = useAuth();

  // If there is no user, it means they are not logged in.
  // We use the <Navigate> component to redirect them to the login page.
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If there IS a user, we allow the component's children to be rendered.
  // 'children' will be whatever page we are trying to protect (e.g., the Products page).
  return children;
};

export default ProtectedRoute;