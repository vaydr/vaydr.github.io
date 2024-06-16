import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          vayd's world
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links">about</Link>
          </li>
          <li className="nav-item">
            <Link to="/cv" className="nav-links">cv</Link>
          </li>
          <li className="nav-item">
            <Link to="/projects" className="nav-links">projects</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-links">contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;