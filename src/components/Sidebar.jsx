import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 🔹 Mobile Hamburger Header */}
      <div className="sidebar-mobile-header md:hidden">
        <button onClick={() => setIsOpen(true)} className="sidebar-toggle-btn">
          <svg
            className="sidebar-toggle-icon"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* 🔹 Sidebar: Always visible on desktop, slide-in on mobile */}
      <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
        {/* Close Button: Only on mobile */}
        <div className="sidebar-close-wrapper md:hidden">
          <button onClick={() => setIsOpen(false)} className="sidebar-close-btn">
            <svg
              className="sidebar-toggle-icon"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main Nav */}
        <h2 className="sidebar-title">Dashboard</h2>
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="sidebar-link" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/dashboard/patients" className="sidebar-link" onClick={() => setIsOpen(false)}>
            Patients
          </Link>
        </nav>

        {/* Footer in both views */}
        <div className="sidebar-footer">
          <hr className="sidebar-divider" />
          <p className="footer-title">MANODARPAN</p>
          <p className="footer-copy">© {new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
