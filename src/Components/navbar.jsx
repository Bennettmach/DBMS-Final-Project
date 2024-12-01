import React from 'react';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
    <div className="navbar-left">
        <a href="/" className="logo">
        NFL Travel Helper
        </a>
    </div>
    <div className="navbar-center">
        <ul className="nav-links"></ul>
    </div>
    <div className="navbar-right">
        <a href="/admin" className="user-icon">Admin Login
        <i className="fas fa-user"></i>
        </a>
    </div>
    </nav>
  )};

export default Navbar;