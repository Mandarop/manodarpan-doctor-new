import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatientById } from '../../Services/staticData';
import './PatientProfile.css';

function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patientData = await getPatientById(id);
        setPatient(patientData);
      } catch (error) {
        console.error("Error fetching patient:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPatient();
  }, [id]);

  if (loading) return <p>Loading patient details...</p>;
  if (!patient) return <p>Patient not found.</p>;

  return (
    <div className="patient-profile-container">
      <div className="profile-header">
        <button onClick={() => navigate('/dashboard/patients')} className="back-button">
          <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Patients
        </button>
        <h2 className="profile-title">Patient Profile: {patient.patientName}</h2>
      </div>
      
      <div className="patient-details">
        <div className="detail-row">
          <div className="detail-item">
            <span className="detail-label">📅 Date:</span>
            <span className="detail-value">{patient.date}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">🕐 Time:</span>
            <span className="detail-value">{patient.slotTime} ({patient.slotDuration})</span>
          </div>
        </div>
        <div className="detail-row">
          <div className="detail-item">
            <span className="detail-label">👤 Age:</span>
            <span className="detail-value">{patient.age} years, {patient.gender}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">📞 Phone:</span>
            <span className="detail-value">{patient.phone}</span>
          </div>
        </div>
        <div className="detail-row full-width">
          <div className="detail-item">
            <span className="detail-label">📧 Email:</span>
            <span className="detail-value">{patient.email}</span>
          </div>
        </div>
        <div className="detail-row full-width">
          <div className="detail-item">
            <span className="detail-label">🏥 Primary Concerns:</span>
            <span className="detail-value">{patient.concerns}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientProfile;