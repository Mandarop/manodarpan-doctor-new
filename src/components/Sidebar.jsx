import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

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

      {/* 🔹 Mobile Overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay md:hidden" 
          onClick={closeSidebar}
        />
      )}

      {/* 🔹 Sidebar: Always visible on desktop, slide-in on mobile */}
      <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>

        {/* Main Nav */}
        <h2 className="sidebar-title">Dashboard</h2>
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="sidebar-link" onClick={closeSidebar}>
            <svg className="sidebar-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
          <Link to="/dashboard/patients" className="sidebar-link" onClick={closeSidebar}>
            <svg className="sidebar-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Patients
          </Link>
          <Link to="/dashboard/analytics" className="sidebar-link" onClick={closeSidebar}>
            <svg className="sidebar-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analytics
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
