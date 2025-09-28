import React, { useState } from "react";
import "./Signup.css";
import logo from "../assets/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../apiService"; // 1. IMPORT our API function

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "", // Changed from 'name' to 'username' to match backend
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState(""); // For showing success/error messages
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // 2. UPDATED the signup handler to be async and call the API
    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages

        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        // Create the user object for the backend
        const newUser = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            // Ensure role is uppercase to match the backend Enum
            role: formData.role.toUpperCase(), 
        };

        try {
            // Call the API function
            const response = await signupUser(newUser);
            console.log("Registration successful:", response.data);
            
            // Alert the user and redirect to login
            alert("Registration successful! Please log in.");
            navigate("/login");

        } catch (error) {
            console.error("Registration failed:", error);
            setMessage("Registration failed. The email might already be in use.");
        }
    };

    return (
        <div className="signup-page-container">
            <div className="signup-box">
                <div className="logo-container">
                    <img src={logo} alt="Farm Pharma Logo" className="logo" />
                </div>

                <form className="signup-form" onSubmit={handleSignup}>
                    <div className="form-group">
                        <label htmlFor="username">Name</label>
                        <input
                            type="text"
                            id="username"
                            name="username" // Changed from 'name'
                            placeholder="Enter your name"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group password-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
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

                    <div className="form-group password-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className="password-input-container">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Re-enter your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <span
                                className="password-toggle-icon"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    <div className="form-group role-group">
                        <label>Role</label>
                        <div className="role-options">
                            <label>
                                <input
                                    type="radio"
                                    name="role"
                                    value="FARMER" // Uppercase to match backend
                                    checked={formData.role === "FARMER"}
                                    onChange={handleChange}
                                />{" "}
                                Farmer
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="role"
                                    value="DISTRIBUTOR" // Uppercase
                                    checked={formData.role === "DISTRIBUTOR"}
                                    onChange={handleChange}
                                />{" "}
                                Distributor
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="role"
                                    value="RETAILER" // Uppercase
                                    checked={formData.role === "RETAILER"}
                                    onChange={handleChange}
                                />{" "}
                                Retailer
                            </label>
                             <label>
                                <input
                                    type="radio"
                                    name="role"
                                    value="CUSTOMER" // Uppercase
                                    checked={formData.role === "CUSTOMER"}
                                    onChange={handleChange}
                                />{" "}
                                Customer
                            </label>
                             <label>
                                <input
                                    type="radio"
                                    name="role"
                                    value="ADMIN" // Uppercase
                                    checked={formData.role === "ADMIN"}
                                    onChange={handleChange}
                                />{" "}
                                Admin
                            </label>
                        </div>
                    </div>
                    
                    {/* Display success or error messages */}
                    {message && <p className="message">{message}</p>}

                    <button type="submit" className="signup-button">
                        Register
                    </button>
                </form>

                <div className="login-link">
                    Already have an account? <a href="/login">Login</a>
                </div>
            </div>
        </div>
    );
};

export default Signup;