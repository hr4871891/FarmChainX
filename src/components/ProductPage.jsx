import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import EditCrop from "./EditCrop";
import QRCodeModel from "./QRCodeModal.jsx"; // Import your new modal component
import "./ProductPage.css";

// Import local images
import broccoliImage from "../assets/broccoli.png";
import kiwiImage from "../assets/kiwi.png";
import cabbageImage from "../assets/cabbage.png";
import halfLogo from "../assets/halflogo.png";

// --- ICONS ---
const AddIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
const ExportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon-sm"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon-sm"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.033-2.134H8.033C6.91 2.75 6 3.704 6 4.884v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>;


const ProductPage = ({ crops, onDelete, onUpdate }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [cropTypeFilter, setCropTypeFilter] = useState("all-types");
  const [statusFilter, setStatusFilter] = useState("all-status");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  
  // --- NEW STATE FOR QR CODE MODAL ---
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedCropForQr, setSelectedCropForQr] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const imageMap = {
    Broccoli: broccoliImage, Kiwi: kiwiImage, Cabbage: cabbageImage,
  };

  const handleExport = () => alert("Export coming soon!");
  const handleEdit = (crop) => { setEditingCrop(crop); setIsEditing(true); };
  const handleCloseEdit = () => { setIsEditing(false); setEditingCrop(null); };

  const handleSaveEdit = (updatedCrop) => {
    if (onUpdate) onUpdate(updatedCrop);
    handleCloseEdit();
  };
  
  // --- NEW HANDLERS FOR QR CODE MODAL ---
  const handleShowQrCode = (crop) => {
    setSelectedCropForQr(crop);
    setIsQrModalOpen(true);
  };

  const handleCloseQrModal = () => {
    setIsQrModalOpen(false);
    setSelectedCropForQr(null);
  };

  const filteredCrops = crops.filter((crop) => {
    const matchesType = cropTypeFilter === "all-types" || crop.type?.toLowerCase() === cropTypeFilter;
    const matchesStatus = statusFilter === "all-status" || crop.status?.toLowerCase() === statusFilter;
    const matchesSearch =
      searchQuery.trim() === "" ||
      crop.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.barcode?.includes(searchQuery);
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="product-page-layout">
      <aside className={`sidebar ${showSidebar ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <img src={halfLogo} alt="FarmChainX Logo" className="sidebar-logo" />
          <span className="sidebar-title">FarmChainX</span>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/add-crop">Add Crop</Link></li>
            <li className="active"><Link to="/my-crops">My Crops</Link></li>
            <li><Link to="/settings">Settings</Link></li>
          </ul>
        </nav>
        <div className="sidebar-footer-tip">
          💡 Tip: Use the search bar to quickly find a crop by its name or barcode.
        </div>
      </aside>

      <div className="main-content">
        <header className="navbar">
          <div className="navbar-left">
            <button className="toggle-btn" onClick={() => setShowSidebar(!showSidebar)}>
              ☰
            </button>
            <h1>My Crops</h1>
          </div>
          <div className="navbar-right">
              <div className="header-buttons">
                <button className="header-button" onClick={handleExport}>
                  <ExportIcon /> Export
                </button>
                <Link to="/add-crop" className="header-button primary">
                  <AddIcon /> Add Crop
                </Link>
              </div>
            <div className="user-info">
              <div className="user-avatar">{user?.name?.charAt(0) || 'U'}</div>
              <div className="user-details">
                <span className="user-name">{user?.name || 'Demo User'}</span>
                <span className="user-email">{user?.email || 'demo@example.com'}</span>
              </div>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
          </div>
        </header>

        <main className="page-content">
          <div className="filter-section">
            <div className="filter-group">
                <select value={cropTypeFilter} onChange={(e) => setCropTypeFilter(e.target.value)}>
                  <option value="all-types">All Types</option>
                  <option value="fruits">Fruits</option>
                  <option value="vegetables">Vegetables</option>
                </select>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="all-status">All Statuses</option>
                  <option value="growing">Growing</option>
                  <option value="planted">Planted</option>
                  <option value="planned">Planned</option>
                </select>
            </div>
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search by name or barcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="crop-grid">
            {filteredCrops.length > 0 ? (
              filteredCrops.map((crop) => (
                <div className="crop-card" key={crop.id}>
                  <div className="crop-card-header">
                    <img
                      src={imageMap[crop.imageKey] || crop.imageUrl}
                      alt={crop.name}
                      className="crop-image"
                    />
                    <div className="crop-card-actions">
                        <button className="action-button" onClick={() => handleEdit(crop)}><EditIcon /></button>
                        <button className="action-button delete" onClick={() => onDelete(crop.id)}><DeleteIcon /></button>
                    </div>
                  </div>
                  <div className="crop-card-body">
                    <span className={`status-badge ${crop.status?.toLowerCase()}`}>{crop.status}</span>
                    <h3>{crop.name}</h3>
                    <p className="crop-detail"><strong>Type:</strong> {crop.type}</p>
                    <p className="crop-detail"><strong>Planted:</strong> {crop.plantedDate}</p>
                    <p className="crop-detail"><strong>Location:</strong> {crop.location}</p>
                  </div>

                  {/* --- MODIFIED CROP CARD FOOTER --- */}
                  {crop.barcode && (
                    <div className="crop-card-footer">
                      <button onClick={() => handleShowQrCode(crop)} className="toggle-barcode-btn">
                        Show QR Code
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="empty-state">
                <h2>No Crops Found</h2>
                <p>Try adjusting your filters or add a new crop to get started!</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {isEditing && editingCrop && (
        <EditCrop crop={editingCrop} onClose={handleCloseEdit} onSave={handleSaveEdit} />
      )}
      
      {/* --- RENDER THE QR CODE MODAL CONDITIONALLY --- */}
      {isQrModalOpen && selectedCropForQr && (
        <QRCodeModel
          crop={selectedCropForQr}
          onClose={handleCloseQrModal}
        />
      )}
    </div>
  );
};

export default ProductPage;