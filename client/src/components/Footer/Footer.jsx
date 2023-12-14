// In your Footer.js component file
import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa'; // Import social media icons
import { Link } from 'react-router-dom';
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <p>&copy; 2023 Bharat Tech</p>

      {/* Links */}
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* Social media icons */}
      <div className="social-icons">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      </div>
    </footer>
  );
};

export default Footer;
