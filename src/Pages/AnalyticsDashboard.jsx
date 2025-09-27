import React from "react";
import { useNavigate } from "react-router-dom";
import "./AnalyticsDashboard.css";
import logo from "../assets/logo.jpg";

const AnalyticsDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="static-page">
      <div className="static-header">
        <img src={logo} alt="Logo" className="static-logo" />
        <h1>Analytics Dashboard</h1>
        <p>Comprehensive analytics and insights for patient progress monitoring</p>
      </div>

      <div className="static-content">
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Progress Analytics</h3>
            <p>Track patient progress over time with detailed charts and trend analysis to identify patterns and improvements.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Treatment Outcomes</h3>
            <p>Analyze treatment effectiveness and patient outcomes with comprehensive data visualization and reporting.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Goal Tracking</h3>
            <p>Monitor patient goals and milestones with visual progress indicators and achievement tracking.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Custom Reports</h3>
            <p>Generate detailed reports and insights tailored to your practice needs with customizable analytics.</p>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={() => navigate("/dashboard/analytics")} className="action-btn primary">
            View Analytics
          </button>
          <button onClick={() => navigate("/dashboard")} className="action-btn secondary">
            Go to Dashboard
          </button>
          <button onClick={() => navigate("/")} className="action-btn tertiary">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
