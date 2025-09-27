import React from "react";
import { useNavigate } from "react-router-dom";
import "./HealthReports.css";
import logo from "../assets/logo.jpg";

const HealthReports = () => {
  const navigate = useNavigate();

  return (
    <div className="static-page">
      <div className="static-header">
        <img src={logo} alt="Logo" className="static-logo" />
        <h1>Health Reports</h1>
        <p>Comprehensive mental health assessment and reporting system</p>
      </div>

      <div className="static-content">
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Assessment Reports</h3>
            <p>Generate detailed mental health assessments with standardized questionnaires and evaluation tools.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Progress Reports</h3>
            <p>Create comprehensive progress reports tracking patient improvement over time with visual data.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Trend Analysis</h3>
            <p>Analyze patient trends and patterns to identify areas of improvement and treatment effectiveness.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h3>Export & Share</h3>
            <p>Export reports in multiple formats and share securely with patients and other healthcare providers.</p>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={() => navigate("/dashboard/report")} className="action-btn primary">
            Generate Reports
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

export default HealthReports;
