import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Dashboard.css"; // Use the shared CSS

// Import local images
import halfLogo from "../assets/halflogo.png";

// --- ICONS ---
const ScanIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V7.5a3 3 0 0 0-3-3H3.75Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 8.25V15.75m-3.75-3.75H14.25" /></svg>;

const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/login"); };

  // Placeholder for QR scanning logic
  const handleScanQr = () => {
    alert("Starting QR code scanner... (This is a placeholder)");
    // In a real app, this would trigger the camera API.
  };

  return (
    // Note: No sidebar in this layout for simplicity
    <div className="dashboard-layout">
      <div className="main-content" style={{ marginLeft: 0 }}> {/* Override margin */}
        <header className="navbar">
          <div className="navbar-left">
            <img src={halfLogo} alt="FarmChainX Logo" style={{ height: '30px', marginRight: '10px' }}/>
            <h1>FarmChainX</h1>
          </div>
          <div className="navbar-right">
            <div className="user-info">
              <div className="user-avatar">{user?.name?.charAt(0) || 'C'}</div>
              <div className="user-details">
                <span className="user-name">{user?.name || 'Alex Doe'}</span>
                <span className="user-email">{user?.email || 'alex.doe@email.com'}</span>
              </div>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
          </div>
        </header>

        <main className="page-content">
          <div className="customer-scan-section">
            <h2>Know Where Your Food Comes From</h2>
            <p>
              Scan the QR code on any FarmChainX-enabled product to see its complete journey from the farm to your table.
            </p>
            <button className="scan-qr-button" onClick={handleScanQr}>
              <ScanIcon />
              Scan QR Code
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;