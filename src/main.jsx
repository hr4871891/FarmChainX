import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";  // 👈 your provider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>   {/* 👈 wrap App inside */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
