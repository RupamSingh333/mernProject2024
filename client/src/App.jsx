import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RotatingLines } from 'react-loader-spinner'
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import Error from "./pages/Error";
import UserProfile from "./pages/UserProfile";
import UpdateProfile from "./pages/UpdateProfile";
import UsersList from "./components/UsersList";
import ContactList from "./components/ContactList";
import { AuthContext } from "./store/auth";

const App = () => {

  const { isLoggedIn, hasRole } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <RotatingLines
          visible={loading}
          height="45"
          width="45"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {isLoggedIn && (<Route path="/user-profile" element={<UserProfile />} />)}
          {isLoggedIn && (<Route path="/update-profile" element={<UpdateProfile />} />)}

          {hasRole('admin') && (<Route path="/view-all-user" element={<UsersList />} />)}
          {hasRole('admin') && (<Route path="/view-all-contact" element={<ContactList />} />)}

          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
