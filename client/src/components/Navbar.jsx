import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../store/auth";
import "./Navbar.css";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  const { isLoggedIn, logout, hasRole, authData, cartItemCounts } = useContext(AuthContext);

  return (
    <header>
      <div className="container">
        <div className="logo-brand">
          <NavLink to="/">Bharat Tech</NavLink>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/service">Service</NavLink>
            </li>
            <li>
              <NavLink to="/search-product"><CiSearch /></NavLink>
            </li>

            {isLoggedIn ? (
              <>
                <li>
                  <NavLink className="cart" to="/cart-item"><IoCartOutline />
                    <span className="total-cart-items">{(cartItemCounts > 0) ? cartItemCounts : null}</span>
                  </NavLink>
                </li>

                <li>
                  <div className="navImg">
                    <NavLink><img src={authData.avtar} alt="" /></NavLink>
                    <div className="dropdown">
                      <ul>
                        <li><NavLink to="/user-profile">Profile</NavLink></li>
                        {hasRole('admin') && (

                          <li>
                            <NavLink to="/view-all-user">Users</NavLink>
                          </li>

                        )}
                        {hasRole('admin') && (
                          <li>
                            <NavLink to="/view-all-contact">Contacts</NavLink>
                          </li>
                        )}
                        {hasRole('admin') && (
                          <li>
                            <NavLink to="/add-product">Add Product</NavLink>
                          </li>
                        )}
                        {hasRole('admin') && (
                          <li>
                            <NavLink to="/product-list">Product List</NavLink>
                          </li>
                        )}
                        <li>
                          <Link to="/" onClick={logout}>
                            Logout
                          </Link>
                        </li>

                      </ul>
                    </div>
                  </div>
                </li>

              </>
            ) : (
              <>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
