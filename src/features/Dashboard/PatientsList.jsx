import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../Services/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './PatientsList.css';

function PatientsList() {
  const [patients, setPatients] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setError("Please log in to view patients");
          setLoading(false);
          return;
        }

        const doctorsRef = collection(db, 'doctors');
        const doctorQuery = query(doctorsRef, where('email', '==', user.email.toLowerCase()));
        const doctorSnapshot = await getDocs(doctorQuery);

        if (doctorSnapshot.empty) {
          setError("No doctor profile found for your account");
          setLoading(false);
          return;
        }

        const doctorDoc = doctorSnapshot.docs[0];
        setDoctorId(doctorDoc.id);

        const patientsRef = collection(db, 'doctors', doctorDoc.id, 'patients');
        const patientsSnapshot = await getDocs(patientsRef);

        const patientData = patientsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setPatients(patientData);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setError("Failed to load patients. Please check your permissions and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="patients-wrapper">
      <div className="patients-container">
        {loading ? (
          <p className="loading-text">Loading patients...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : patients.length === 0 ? (
          <p className="empty-text">No patients found.</p>
        ) : (
          <>
            <h2 className="patients-title">Your Patients</h2>
            <div className="patients-list">
              {patients.map(patient => (
                <div key={patient.id} className="patient-card">
                  <div className="patient-header">
                    <div>
                      <h3 className="patient-name">{patient.patientName || "Unnamed Patient"}</h3>
                      <p className="patient-email">{patient.email}</p>
                    </div>
                    <span className="patient-slot">{patient.slot}</span>
                  </div>
                  <div className="patient-meta">
                    <div>
                      <span className="label">Date:</span> {patient.date}
                    </div>
                    <div>
                      <span className="label">Booked:</span> {patient.timestamp?.toDate?.().toLocaleString() || 'N/A'}
                    </div>
                  </div>
                  <div className="patient-action">
                    <button onClick={() => navigate(`/dashboard/report/${patient.patientId}`)} className="view-btn">
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
