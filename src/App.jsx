// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Import Providers
import { CropProvider } from "./context/CropContext";

// Import Components
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";

// Import Other Dashboards
import DistributorDashboard from './components/DistributorDashboard';
import RetailerDashboard from './components/RetailerDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import AdminDashboard from './components/AdminDashboard';

import Checkout from "./components/Checkout";
import AddCrop from './components/AddCrop';

import "./App.css";

function App() {
  return (
    <CropProvider>
      <div className="full-width-container">
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* --- PROTECTED DASHBOARD ROUTES --- */}
          <Route 
            path="/farmer-dashboard" 
            element={
              <ProtectedRoute role="FARMER">
                <HomePage />  {/* HomePage is farmer's dashboard */}
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/distributor-dashboard" 
            element={
              <ProtectedRoute role="DISTRIBUTOR">
                <DistributorDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/retailer-dashboard" 
            element={
              <ProtectedRoute role="RETAILER">
                <RetailerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customer-dashboard" 
            element={
              <ProtectedRoute role="CUSTOMER">
                <CustomerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute role="ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* --- OTHER PROTECTED ROUTES --- */}
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add-crop" 
            element={
              <ProtectedRoute>
                <AddCrop />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </CropProvider>
  );
}

export default App;
