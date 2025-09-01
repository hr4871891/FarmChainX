// src/components/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import "./Login.css";
import logo from "../assets/logo.png";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Your original login handler
  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem('registeredUser');
    if (!storedUser) {
      alert("No user found with this email. Please sign up first.");
      return;
    }
    const registeredUser = JSON.parse(storedUser);
    if (email === registeredUser.email && password === registeredUser.password) {
      login(registeredUser);
      navigate('/dashboard'); // --- MODIFIED: Redirect to /dashboard
    } else {
      alert("Invalid email or password.");
    }
  };

  // --- NEW: A handler for the test login buttons ---
  const handleTestLogin = (role) => {
    // Create a mock user object with the specified role
    const testUser = {
      name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
      email: `${role}@farmchainx.com`,
      role: role,
    };
    
    // Log in with the mock user
    login(testUser);
    
    // Redirect to the dashboard
    navigate('/dashboard');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page-container">
      <div className="login-box">
        <div className="logo-container">
          <img src={logo} alt="Farm Pharma Logo" className="logo" />
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          {/* Your email and password inputs remain unchanged */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group password-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="register-link">
          Don’t have an account? <Link to="/signup">Register</Link>
        </div>

        {/* --- NEW: Test Login Section --- */}
        <div className="test-login-section" style={{textAlign: 'center', marginTop: '20px'}}>
            <hr/>
            <h4 style={{color: '#555'}}>For Testing Only</h4>
            <button onClick={() => handleTestLogin('farmer')}>Login as Farmer</button>
            <button onClick={() => handleTestLogin('distributor')}>Login as Distributor</button>
            <button onClick={() => handleTestLogin('retailer')}>Login as Retailer</button>
            <button onClick={() => handleTestLogin('customer')}>Login as Customer</button>
            <button onClick={() => handleTestLogin('admin')}>Login as Admin</button>
        </div>

      </div>
    </div>
  );
};

export default Login;