// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // load from localStorage on init
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    // Save both in state and localStorage
    setUser(userData);
<<<<<<< HEAD
    localStorage.setItem("user", JSON.stringify(userData));
=======
    localStorage.setItem("authUser", JSON.stringify(userData)); // persist user
>>>>>>> 53cce94d6235c342ee6e5b3cae2bedcc58faea38
  };

  const logout = () => {
    setUser(null);
<<<<<<< HEAD
    localStorage.removeItem("user");
=======
    localStorage.removeItem("authUser");
>>>>>>> 53cce94d6235c342ee6e5b3cae2bedcc58faea38
  };

  useEffect(() => {
    // sync in case localStorage changes (multi-tab)
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("authUser");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

<<<<<<< HEAD
export const useAuth = () => {
  return useContext(AuthContext);
};
=======
export const useAuth = () => useContext(AuthContext);
>>>>>>> 53cce94d6235c342ee6e5b3cae2bedcc58faea38
