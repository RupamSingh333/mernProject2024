import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
const API_BASE_URL = "http://localhost:5000/api";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  // State to store the authentication token
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  // State to determine if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [authData, setAuthData] = useState({});
  const [cartData, setCartData] = useState({});

  const hasRole = (role) => {
    return isLoggedIn && authData.role === role;
  }

  // const [loggedInUser, setLoggedInUser] = useState(null);

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

  // loginUser 
  const loginUser = async (email, password) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await axios.post(`${API_BASE_URL}/login-user`, {
        email,
        password
      });

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

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

  const addToCart = async (e) => {

    try {
      const response = await fetch("http://localhost:5000/api/add-to-cart", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify(cartData),
      });

      if (response.ok) {
        const completeRes = await response.json();
        toast.success(
          completeRes.message
        );
      } else {
        const errorResponse = await response.json();
        toast.error(
          errorResponse.message
        );
      }

    } catch (error) {
      console.log("Error in Add to cart Function", error);
      toast.error("An unexpected error occurred.");
    }

  };

  const deleteCartItem = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:5000/api/delete-cart-item?_id=${_id}`, {
            method: "GET",
            headers: {
              "Authorization": token,
            },
          });

          if (response.ok) {
            const completeRes = await response.json();
            Swal.fire({
              title: "Deleted!",
              text: completeRes.message,
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            const errorResponse = await response.json();
            Swal.fire({
              title: "Deleted!",
              text: errorResponse.message,
              icon: "error",
              showConfirmButton: false,
              timer: 1500
            });
          }
        } catch (error) {
          console.log("Error on deleteCartItem function:", error);
          Swal.fire({
            title: "Deleted!",
            text: error,
            icon: "error",
            showConfirmButton: false,
            timer: 1500
          });
        }

      }
    });
  };

  // useEffect to update isLoggedIn based on token changes
  useEffect(() => {
    setIsLoggedIn(!!token);
    fetchUserDetails();
  }, [token]);

  // AuthContext Provider value
  const contextValue = {
    token,
    isLoggedIn,
    setTokenInLs,
    logout,
    fetchUserDetails,
    authData,
    hasRole, loginUser,
    addToCart, setCartData,
    deleteCartItem
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
