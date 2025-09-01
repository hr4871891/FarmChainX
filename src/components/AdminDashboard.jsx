import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Dashboard.css"; // Use the shared CSS

// Import local images
import halfLogo from "../assets/halflogo.png";

// --- ICONS ---
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon-sm"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon-sm"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.033-2.134H8.033C6.91 2.75 6 3.704 6 4.884v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>;
const AddIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;

// Mock Data for Admin
const mockUsers = [
  { id: 1, name: 'Green Valley Farms', email: 'contact@gvfarms.com', role: 'Farmer', status: 'Active' },
  { id: 2, name: 'Fresh Distributors', email: 'contact@freshdist.com', role: 'Distributor', status: 'Active' },
  { id: 3, name: 'Healthy Grocers', email: 'manager@healthygrocers.com', role: 'Retailer', status: 'Active' },
  { id: 4, name: 'Alex Doe', email: 'alex.doe@email.com', role: 'Customer', status: 'Inactive' },
];


const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState(mockUsers);
  const [showSidebar, setShowSidebar] = useState(true);

  const handleLogout = () => { logout(); navigate("/login"); };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
        setUsers(users.filter(u => u.id !== userId));
    }
  }

  return (
    <div className="dashboard-layout">
      <aside className={`sidebar ${showSidebar ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <img src={halfLogo} alt="FarmChainX Logo" className="sidebar-logo" />
          <span className="sidebar-title">FarmChainX</span>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li className="active"><Link to="/admin/users">User Management</Link></li>
            <li><Link to="/admin/products">All Products</Link></li>
            <li><Link to="/admin/analytics">System Analytics</Link></li>
          </ul>
        </nav>
        <div className="sidebar-footer-tip">
          💡 Tip: Admins can manage all users and oversee the entire supply chain.
        </div>
      </aside>

      <div className="main-content">
        <header className="navbar">
          <div className="navbar-left">
            <button className="toggle-btn" onClick={() => setShowSidebar(!showSidebar)}>☰</button>
            <h1>User Management</h1>
          </div>
          <div className="navbar-right">
             <div className="header-buttons">
              <button className="header-button primary" onClick={() => alert("Opening add user form...")}>
                <AddIcon /> Add New User
              </button>
            </div>
            <div className="user-info">
              <div className="user-avatar">{user?.name?.charAt(0) || 'A'}</div>
              <div className="user-details">
                <span className="user-name">{user?.name || 'Admin User'}</span>
                <span className="user-email">{user?.email || 'admin@farmchainx.com'}</span>
              </div>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
          </div>
        </header>

        <main className="page-content">
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td><span className={`status-badge ${u.status.toLowerCase()}`}>{u.status}</span></td>
                    <td>
                      <button className="action-button" onClick={() => alert(`Editing ${u.name}...`)}><EditIcon /></button>
                      <button className="action-button delete" onClick={() => handleDeleteUser(u.id)}><DeleteIcon /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;