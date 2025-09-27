import React from "react";
import { useNavigate } from "react-router-dom";
import "./PatientManagement.css";
import logo from "../assets/logo.jpg";

const PatientManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="static-page">
      <div className="static-header">
        <img src={logo} alt="Logo" className="static-logo" />
        <h1>Patient Management</h1>
        <p>Comprehensive patient tracking and appointment management system</p>
      </div>

      <div className="static-content">
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Appointment Scheduling</h3>
            <p>Schedule and manage patient appointments with ease. View upcoming appointments and manage your calendar efficiently.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3>Patient Profiles</h3>
            <p>Maintain detailed patient records including medical history, treatment plans, and progress notes.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Progress Tracking</h3>
            <p>Track patient progress over time with detailed notes and milestone tracking for better treatment outcomes.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Reminders & Notifications</h3>
            <p>Set up automated reminders for appointments, follow-ups, and important patient milestones.</p>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={() => navigate("/dashboard/patients")} className="action-btn primary">
            View All Patients
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

export default PatientManagement;
