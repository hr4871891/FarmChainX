import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import farmerIMG from "../assets/farmer.png";
import halfLogo from "../assets/halflogo.png";
import featuresIMG from "../assets/features.jpg";



// A simple translations object
const translations = {
  EN: {
    getStarted: "Get Started",
  },
  HI: {
    getStarted: "शुरू करें",
  },
};

const HomePage = () => {
  // Set up state to manage the current language
  const [language, setLanguage] = useState("EN");

  // Create a function to toggle the language
  const handleLanguageToggle = () => {
    setLanguage((prevLanguage) => (prevLanguage === "EN" ? "HI" : "EN"));
  };

  return (
    <div className="homepage">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <img src={halfLogo} alt="FarmChainX Logo" className="logo-img" />
          <span className="logo-text">FARMCHAINX</span>
        </div>
        <nav className="nav-links">
          <a href="/">HOME</a>
          <a href="/login">PRODUCTS</a>
          <a href="/dashboard">SUPPORT</a>
          <a href="/signup">START N</a>
          <button className="lang-btn" onClick={handleLanguageToggle}>
            {language}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            FarmChainX - Smart
            <br />
            Farming
          </h1>
          <p>From soil to harvest - We track We grow.</p>
          <p>Helping farmers manage and monitor their crops</p>

          <Link to="/signup" className="get-started-btn">
            {translations[language].getStarted}
          </Link>
        </div>
        <div className="hero-illustration">
          <img src={farmerIMG} alt="Farmer" className="farmer-img" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-card">
          <img
           src={featuresIMG}
           alt="Plant Growing"
           className="features-img"
          />

          <div className="features-info">
            <h2>FarmChainX - The Farming Assistant</h2>
            <p>
              FarmChainX is a farming assistant that helps farmers manage and optimize 
              their agricultural operations. It provides features like traceability, 
              recordkeeping, crop recommendation, and weather predictions. 
              With real-time insights and modern tools, farmers can boost efficiency 
              and productivity. A chatbot is also available for quick query resolution.
            </p>
          </div>
        </div>

        <div className="features-list">
          <div className="feature-box">
            <span className="feature-icon">🔍︎</span>
            <h3>Traceability</h3>
            <p>
              FarmChainX ensures full traceability of agricultural products 
              from seed to harvest. Farmers and consumers can track the origin, 
              production practices, and supply chain journey, ensuring trust, 
              transparency, and food safety.
            </p>
          </div>

          <div className="feature-box">
            <span className="feature-icon">🌿</span>
            <h3>Crop Recommendation</h3>
            <p>
              Various factors like minerals present in the soil, temperature, 
              and humidity play an important role in deciding the type of crop. 
              Gather more information with FarmChainX recommendations.
            </p>
          </div>

          <div className="feature-box">
            <span className="feature-icon">📝</span>
            <h3>Recordkeeping</h3>
            <p>
              FarmChainX helps farmers maintain accurate records of cultivation, 
              expenses, inputs, and outputs. Organized recordkeeping improves 
              decision-making, compliance, and long-term farm management efficiency.
            </p>
          </div>

          <div className="feature-box">
            <span className="feature-icon">☁️</span>
            <h3>Weather Prediction</h3>
            <p>
              Weather plays an important role in agriculture. 
              Know the weather in advance with FarmChainX predictions 
              to make smarter farming decisions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
