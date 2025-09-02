// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Import Providers
import { CropProvider } from "./context/CropContext";

// Import Components
import Signup from "./components/Signup";
import Login from "./components/Login";
import DashboardContainer from "./components/DashboardContainer";
import Checkout from "./components/Checkout";
import HomePage from "./components/HomePage";
import ProtectedRoute from "./components/ProtectedRoute"; // Your protected route component
import AddCrop from './components/AddCrop';

import "./App.css";

function App() {
  // All crop state and handler functions have been removed from here.
  // They now live in CropContext.jsx!

  return (
    // The CropProvider makes the crop data available to any component that needs it.
    <CropProvider>
      <div className="full-width-container">
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          {/* These routes are accessible to anyone, logged in or not. */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/add-crop" element={<AddCrop />} /> 

          {/* --- PROTECTED DASHBOARD ROUTE --- */}
          {/* The "*" allows for nested routes like /dashboard/add-crop */}
          {/* This route is wrapped by ProtectedRoute. If a user is not logged in, */}
          {/* they will be redirected to the /login page. */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardContainer />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </CropProvider>
  );
}

export default App;