import React, { createContext, useState, useEffect } from "react";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  // State to store the authentication token
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  // State to determine if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [authData, setAuthData] = useState({});

  // Function to handle login
  const setTokenInLs = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  // Function to handle logout
  const logout = () => {
    setToken("");
    setAuthData("");
    localStorage.removeItem("token");
  };

  // useEffect to update isLoggedIn based on token changes
  useEffect(() => {
    setIsLoggedIn(!!token);
    const fetchUserDetails = async () => {
      //call api
      try {
        const response = await fetch("http://localhost:5000/api/user-profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
        });
        if (response.ok) {
          const completeRes = await response.json();
          const userData = completeRes.data;
          setAuthData({ ...userData });
        } else {
          const errorResponse = await response.json();
          logout();
        }
      } catch (error) {
        logout();
        console.log("Error on Contact Page:", error);
      }
    };
    fetchUserDetails();

  }, [token]);

  // AuthContext Provider value
  const contextValue = {
    token,
    isLoggedIn,
    setTokenInLs,
    logout,
    authData
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
