import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import QRCodeModel from "./QRCodeModal.jsx";
import "./Dashboard.css"; // Use the shared CSS

// Import local images
import broccoliImage from "../assets/broccoli.png";
import kiwiImage from "../assets/kiwi.png";
import cabbageImage from "../assets/cabbage.png";
import halfLogo from "../assets/halflogo.png";

// --- ICONS ---
const ExportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>;

// Mock Data for Distributor
const mockShipments = [
  { id: 101, name: 'Organic Broccoli', type: 'Vegetables', status: 'In-Transit', origin: 'Green Valley Farms', receivedDate: '2025-08-28', barcode: 'DIST-BR-101', imageKey: 'Broccoli' },
  { id: 102, name: 'Fresh Cabbage', type: 'Vegetables', status: 'Delivered', origin: 'Sunny Meadows', receivedDate: '2025-08-25', barcode: 'DIST-CB-102', imageKey: 'Cabbage' },
  { id: 103, name: 'Himalayan Kiwi', type: 'Fruits', status: 'In-Stock', origin: 'Himalayan Orchards', receivedDate: '2025-08-29', barcode: 'DIST-KW-103', imageKey: 'Kiwi' },
];

const DistributorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [shipments] = useState(mockShipments);
  const [statusFilter, setStatusFilter] = useState("all-status");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedShipmentForQr, setSelectedShipmentForQr] = useState(null);

  const handleLogout = () => { logout(); navigate("/login"); };

  const imageMap = { Broccoli: broccoliImage, Kiwi: kiwiImage, Cabbage: cabbageImage };

  const handleShowQrCode = (shipment) => {
    setSelectedShipmentForQr(shipment);
    setIsQrModalOpen(true);
  };

  const handleCloseQrModal = () => {
    setIsQrModalOpen(false);
    setSelectedShipmentForQr(null);
  };

  const filteredShipments = shipments.filter((shipment) => {
    const matchesStatus = statusFilter === "all-status" || shipment.status.toLowerCase() === statusFilter;
    const matchesSearch =
      searchQuery.trim() === "" ||
      shipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.barcode.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="dashboard-layout">
      <aside className={`sidebar ${showSidebar ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <img src={halfLogo} alt="FarmChainX Logo" className="sidebar-logo" />
          <span className="sidebar-title">FarmChainX</span>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/distributor/dashboard">Dashboard</Link></li>
            <li className="active"><Link to="/distributor/inventory">Inventory</Link></li>
            <li><Link to="/distributor/retailers">Retailers</Link></li>
            <li><Link to="/distributor/reports">Reports</Link></li>
          </ul>
        </nav>
        <div className="sidebar-footer-tip">
          💡 Tip: Filter by status to track your shipments from warehouse to delivery.
        </div>
      </aside>

      <div className="main-content">
        <header className="navbar">
          <div className="navbar-left">
            <button className="toggle-btn" onClick={() => setShowSidebar(!showSidebar)}>☰</button>
            <h1>My Inventory</h1>
          </div>
          <div className="navbar-right">
            <div className="header-buttons">
              <button className="header-button" onClick={() => alert("Exporting inventory report...")}>
                <ExportIcon /> Export
              </button>
            </div>
            <div className="user-info">
              <div className="user-avatar">{user?.name?.charAt(0) || 'D'}</div>
              <div className="user-details">
                <span className="user-name">{user?.name || 'Fresh Distributors'}</span>
                <span className="user-email">{user?.email || 'contact@freshdist.com'}</span>
              </div>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
          </div>
        </header>

        <main className="page-content">
          <div className="filter-section">
            <div className="filter-group">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all-status">All Statuses</option>
                <option value="in-stock">In-Stock</option>
                <option value="in-transit">In-Transit</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
            <div className="search-container">
              <input type="text" className="search-input" placeholder="Search by name or barcode..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>

          <div className="crop-grid">
            {filteredShipments.map((shipment) => (
              <div className="crop-card" key={shipment.id}>
                <div className="crop-card-header">
                  <img src={imageMap[shipment.imageKey]} alt={shipment.name} className="crop-image" />
                </div>
                <div className="crop-card-body">
                  <span className={`status-badge ${shipment.status.toLowerCase()}`}>{shipment.status}</span>
                  <h3>{shipment.name}</h3>
                  <p className="crop-detail"><strong>From:</strong> {shipment.origin}</p>
                  <p className="crop-detail"><strong>Received:</strong> {shipment.receivedDate}</p>
                  <p className="crop-detail"><strong>Batch ID:</strong> {shipment.barcode}</p>
                </div>
                <div className="crop-card-footer">
                   <button onClick={() => handleShowQrCode(shipment)} className="toggle-barcode-btn">
                     Show QR Code
                   </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      
      {isQrModalOpen && selectedShipmentForQr && (
        <QRCodeModel crop={selectedShipmentForQr} onClose={handleCloseQrModal} />
      )}
    </div>
  );
};

export default DistributorDashboard;