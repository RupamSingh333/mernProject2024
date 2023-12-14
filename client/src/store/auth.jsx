import React, { createContext, useState, useEffect } from "react";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  // State to store the authentication token
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  // State to determine if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  // Function to handle login
  const setTokenInLs = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  // Function to handle logout
  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  // useEffect to update isLoggedIn based on token changes
  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  // AuthContext Provider value
  const contextValue = {
    token,
    isLoggedIn,
    setTokenInLs,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
