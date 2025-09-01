// src/components/DashboardContainer.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCrops } from '../context/CropContext';

// Import all the different dashboard components
import ProductPage from './ProductPage'; // This is your Farmer's dashboard
import DistributorDashboard from './DistributorDashboard';
import RetailerDashboard from './RetailerDashboard';
import CustomerDashboard from './CustomerDashboard';
import AdminDashboard from './AdminDashboard';
import AddCrop from './AddCrop';

const DashboardContainer = () => {
  const { user } = useAuth();
  const { crops, addCrop, deleteCrop, updateCrop } = useCrops();

  // This function decides which component to show based on the user's role
  const renderDashboardByRole = () => {
    switch (user?.role) {
      case 'farmer':
        // The farmer has multiple pages (crop list and add crop form),
        // so we use nested Routes here.
        return (
          <Routes>
            <Route
              path="/" // This corresponds to the "/dashboard" URL
              element={
                <ProductPage
                  crops={crops}
                  onDelete={deleteCrop}
                  onUpdate={updateCrop}
                />
              }
            />
            <Route
              path="add-crop" // This corresponds to the "/dashboard/add-crop" URL
              element={<AddCrop onAddCrop={addCrop} />}
            />
            {/* If a farmer tries any other dashboard URL, redirect them to their main page */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        );
      
      case 'distributor':
        return <DistributorDashboard />;
      
      case 'retailer':
      return <RetailerDashboard />;
      
      case 'customer':
        return <CustomerDashboard />;
      
      case 'admin':
        return <AdminDashboard />;
      
      default:
        // If the user has no role or an unknown role, send them to the login page.
        return <Navigate to="/login" />;
    }
  };

  return <div>{renderDashboardByRole()}</div>;
};

export default DashboardContainer;