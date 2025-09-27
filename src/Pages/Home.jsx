import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logo from "../assets/logo.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="logo-animation-wrapper">
        <img src={logo} alt="Logo" className="logo-animation" />
      </div>

      <div className="home-content">
        <div className="logo-top-wrapper">
          <img src={logo} alt="Logo" className="logo-top" />
        </div>
        <div className="home-text-content">
          <h1 className="home-title">Welcome to Manodarpan Doctor Portal</h1>
          <p className="home-subtitle">Your comprehensive mental health management platform</p>
        </div>
        <div className="home-action-blocks">
          <div className="action-block dashboard-block" onClick={() => navigate("/dashboard")}>
            <div className="block-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="block-content">
              <h3>Access Dashboard</h3>
              <p>Manage your practice and view comprehensive analytics</p>
            </div>
          </div>
          <div className="action-block patients-block" onClick={() => navigate("/dashboard/patients")}>
            <div className="block-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="block-content">
              <h3>View Patients</h3>
              <p>Access patient records and manage appointments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
