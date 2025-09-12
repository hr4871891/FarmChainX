// src/components/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";
import logo from "../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios"; // ✅ import axios

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // ✅ Updated login handler (checks DB via backend)
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (res.data && res.data.user) {
        login(res.data.user); // save to context
        navigate("/dashboard"); // redirect after login
      } else {
        alert("Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed: " + (err.response?.data?.error || "Server error"));
    }
  };

  // ✅ Fixed test login (no `formData` reference now)
  const handleTestLogin = (role) => {
    const testUser = {
      name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
      email: `${role}@farmchainx.com`,
      role: role.toLowerCase(),
    };

    login(testUser);
    navigate("/dashboard");
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

        <div
          className="test-login-section"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          <hr />
          <h4 style={{ color: "#555" }}>For Testing Only</h4>
          <button onClick={() => handleTestLogin("farmer")}>
            Login as Farmer
          </button>
          <button onClick={() => handleTestLogin("distributor")}>
            Login as Distributor
          </button>
          <button onClick={() => handleTestLogin("retailer")}>
            Login as Retailer
          </button>
          <button onClick={() => handleTestLogin("customer")}>
            Login as Customer
          </button>
          <button onClick={() => handleTestLogin("admin")}>
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
