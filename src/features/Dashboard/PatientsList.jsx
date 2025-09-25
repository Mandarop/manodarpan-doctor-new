import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPatients } from '../../Services/staticData';
import './PatientsList.css';

function PatientsList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientData = await getPatients();
        setPatients(patientData);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setError("Failed to load patients. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'in-progress': return '#F59E0B';
      case 'scheduled': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'scheduled': return 'Scheduled';
      default: return 'Unknown';
    }
  };

  return (
    <div className="patients-wrapper">
      <div className="patients-container">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading patients...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <p className="error-text">{error}</p>
          </div>
        ) : patients.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <p className="empty-text">No patients found.</p>
          </div>
        ) : (
          <>
            <div className="patients-header">
              <h2 className="patients-title">Your Patients</h2>
              <div className="patients-stats">
                <span className="stat-item">
                  <span className="stat-number">{patients.length}</span>
                  <span className="stat-label">Total Patients</span>
                </span>
                <span className="stat-item">
                  <span className="stat-number">{patients.filter(p => p.status === 'completed').length}</span>
                  <span className="stat-label">Completed</span>
                </span>
                <span className="stat-item">
                  <span className="stat-number">{patients.filter(p => p.status === 'in-progress').length}</span>
                  <span className="stat-label">In Progress</span>
                </span>
              </div>
            </div>
            <div className="patients-grid">
              {patients.map(patient => (
                <div key={patient.id} className="patient-card">
                  <div className="patient-card-header">
                    <div className="patient-info">
                      <h3 className="patient-name">{patient.patientName || "Unnamed Patient"}</h3>
                      <p className="patient-email">{patient.email}</p>
                      <p className="patient-concern">{patient.concerns}</p>
                    </div>
                    <div className="patient-status">
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(patient.status) }}
                      >
                        {getStatusText(patient.status)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="patient-details">
                    <div className="detail-row">
                      <span className="detail-label">📅 Date:</span>
                      <span className="detail-value">{patient.date}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">🕐 Time:</span>
                      <span className="detail-value">{patient.slotTime} ({patient.slotDuration})</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">👤 Age:</span>
                      <span className="detail-value">{patient.age} years, {patient.gender}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">📞 Phone:</span>
                      <span className="detail-value">{patient.phone}</span>
                    </div>
                  </div>

                  <div className="patient-actions">
                    <button 
                      onClick={() => navigate(`/dashboard/patient/${patient.id}`)} 
                      className="action-btn secondary"
                    >
                      <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      View Profile
                    </button>
                    <button 
                      onClick={() => navigate(`/dashboard/report/${patient.patientId}`)} 
                      className="action-btn primary"
                    >
                      <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PatientsList;
