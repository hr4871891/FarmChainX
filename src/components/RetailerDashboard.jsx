import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import QRCodeModel from "./QRCodeModal.jsx";
import "./Dashboard.css"; // Use the shared CSS

// Import local images
import broccoliImage from "../assets/broccoli.png";
import kiwiImage from "../assets/kiwi.png";
import halfLogo from "../assets/halflogo.png";

// --- ICONS ---
const ExportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>;

// Mock Data for Retailer
const mockProducts = [
  { id: 201, name: 'Organic Broccoli', type: 'Vegetables', status: 'In-Stock', stock: '85 units', supplier: 'Fresh Distributors', barcode: 'RET-BR-201', imageKey: 'Broccoli' },
  { id: 202, name: 'Himalayan Kiwi', type: 'Fruits', status: 'In-Stock', stock: '120 units', supplier: 'Fresh Distributors', barcode: 'RET-KW-202', imageKey: 'Kiwi' },
];

const RetailerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [products] = useState(mockProducts);
  const [stockFilter, setStockFilter] = useState("all-stock");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedProductForQr, setSelectedProductForQr] = useState(null);

  const handleLogout = () => { logout(); navigate("/login"); };

  const imageMap = { Broccoli: broccoliImage, Kiwi: kiwiImage };

  const handleShowQrCode = (product) => {
    setSelectedProductForQr(product);
    setIsQrModalOpen(true);
  };

  const handleCloseQrModal = () => {
    setIsQrModalOpen(false);
    setSelectedProductForQr(null);
  };

  const filteredProducts = products.filter((product) => {
    const matchesStock = stockFilter === "all-stock" || product.status.toLowerCase().replace('-', '') === stockFilter;
    const matchesSearch =
      searchQuery.trim() === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.barcode.includes(searchQuery);
    return matchesStock && matchesSearch;
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
            <li><Link to="/retailer/dashboard">Dashboard</Link></li>
            <li className="active"><Link to="/retailer/stock">Store Stock</Link></li>
            <li><Link to="/retailer/sales">Sales Analytics</Link></li>
            <li><Link to="/retailer/suppliers">Suppliers</Link></li>
          </ul>
        </nav>
        <div className="sidebar-footer-tip">
          💡 Tip: Use the QR code on each product for quick price checks and inventory updates.
        </div>
      </aside>

      <div className="main-content">
        <header className="navbar">
          <div className="navbar-left">
            <button className="toggle-btn" onClick={() => setShowSidebar(!showSidebar)}>☰</button>
            <h1>Store Stock</h1>
          </div>
          <div className="navbar-right">
             <div className="header-buttons">
              <button className="header-button" onClick={() => alert("Exporting stock report...")}>
                <ExportIcon /> Export Report
              </button>
            </div>
            <div className="user-info">
              <div className="user-avatar">{user?.name?.charAt(0) || 'R'}</div>
              <div className="user-details">
                <span className="user-name">{user?.name || 'Healthy Grocers'}</span>
                <span className="user-email">{user?.email || 'manager@healthygrocers.com'}</span>
              </div>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
          </div>
        </header>

        <main className="page-content">
          <div className="filter-section">
            <div className="filter-group">
              <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)}>
                <option value="all-stock">All Stock</option>
                <option value="instock">In-Stock</option>
                <option value="lowstock">Low Stock</option>
                <option value="soldout">Sold Out</option>
              </select>
            </div>
            <div className="search-container">
              <input type="text" className="search-input" placeholder="Search product name or SKU..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>

          <div className="crop-grid">
            {filteredProducts.map((product) => (
              <div className="crop-card" key={product.id}>
                <div className="crop-card-header">
                  <img src={imageMap[product.imageKey]} alt={product.name} className="crop-image" />
                </div>
                <div className="crop-card-body">
                  <span className={`status-badge ${product.status.toLowerCase()}`}>{product.status}</span>
                  <h3>{product.name}</h3>
                  <p className="crop-detail"><strong>Stock Level:</strong> {product.stock}</p>
                  <p className="crop-detail"><strong>Supplier:</strong> {product.supplier}</p>
                  <p className="crop-detail"><strong>SKU:</strong> {product.barcode}</p>
                </div>
                 <div className="crop-card-footer">
                   <button onClick={() => handleShowQrCode(product)} className="toggle-barcode-btn">
                     View Traceability QR
                   </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      
      {isQrModalOpen && selectedProductForQr && (
        <QRCodeModel crop={selectedProductForQr} onClose={handleCloseQrModal} />
      )}
    </div>
  );
};

export default RetailerDashboard;