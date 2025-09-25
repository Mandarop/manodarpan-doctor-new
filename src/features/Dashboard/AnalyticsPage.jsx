import React, { useEffect, useState } from 'react';
import { getPatients } from '../../Services/staticData';
import './AnalyticsPage.css';

function AnalyticsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientData = await getPatients();
        setPatients(patientData);
        if (patientData.length > 0) {
          setSelectedPatient(patientData[0]);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
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

  if (loading) return <div className="analytics-loading">Loading analytics...</div>;

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1 className="analytics-title">Patient Analytics & Progress Tracking</h1>
        <p className="analytics-subtitle">Monitor patient progress and treatment effectiveness</p>
      </div>

      <div className="analytics-grid">
        {/* Patient Selection */}
        <div className="analytics-card patient-selector">
          <h3 className="card-title">Select Patient</h3>
          <div className="patient-list">
            {patients.map(patient => (
              <div 
                key={patient.id} 
                className={`patient-item ${selectedPatient?.id === patient.id ? 'selected' : ''}`}
                onClick={() => setSelectedPatient(patient)}
              >
                <div className="patient-info">
                  <h4 className="patient-name">{patient.patientName}</h4>
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
            ))}
          </div>
        </div>

        {/* Progress Chart */}
        {selectedPatient && (
          <div className="analytics-card progress-chart">
            <h3 className="card-title">Progress Over Time - {selectedPatient.patientName}</h3>
            <div className="chart-container">
              <div className="chart-header">
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color anxiety"></div>
                    <span>Anxiety Level</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color depression"></div>
                    <span>Depression Level</span>
                  </div>
                </div>
              </div>
              <div className="chart-grid">
                {selectedPatient.progress.map((point, index) => (
                  <div key={index} className="chart-point">
                    <div className="point-header">Week {point.week}</div>
                    <div className="point-bars">
                      <div className="bar-container">
                        <div className="bar anxiety" style={{ height: `${(point.anxiety / 20) * 100}%` }}>
                          <span className="bar-value">{point.anxiety}</span>
                        </div>
                        <div className="bar depression" style={{ height: `${(point.depression / 20) * 100}%` }}>
                          <span className="bar-value">{point.depression}</span>
                        </div>
                      </div>
                    </div>
                    <div className="point-date">{point.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Summary Stats */}
        <div className="analytics-card summary-stats">
          <h3 className="card-title">Treatment Summary</h3>
          {selectedPatient && (
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">{selectedPatient.progress.length}</div>
                <div className="stat-label">Sessions Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">
                  {selectedPatient.progress.length > 0 ? 
                    selectedPatient.progress[selectedPatient.progress.length - 1].anxiety : 0
                  }
                </div>
                <div className="stat-label">Current Anxiety</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">
                  {selectedPatient.progress.length > 0 ? 
                    selectedPatient.progress[selectedPatient.progress.length - 1].depression : 0
                  }
                </div>
                <div className="stat-label">Current Depression</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">
                  {selectedPatient.progress.length > 1 ? 
                    selectedPatient.progress[0].anxiety - selectedPatient.progress[selectedPatient.progress.length - 1].anxiety : 0
                  }
                </div>
                <div className="stat-label">Anxiety Improvement</div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="analytics-card quick-actions">
          <h3 className="card-title">Quick Actions</h3>
          <div className="action-buttons">
            <button className="action-btn primary">
              <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Generate Report
            </button>
            <button className="action-btn secondary">
              <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Share Dashboard
            </button>
            <button className="action-btn secondary">
              <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              Schedule Follow-up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
