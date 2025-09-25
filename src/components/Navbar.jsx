import React from 'react';
import logo from '../assets/logo.png';
import './Navbar.css'; 

function Navbar() {
  return (
    <div className="navbar">
      <img src={logo} alt="Logo" className="navbar-logo" />
      <h1 className="navbar-title">Manodarpan - Doctor Dashboard</h1>
    </div>
  );
}

export default Navbar;
