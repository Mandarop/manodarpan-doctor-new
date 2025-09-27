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
        {/* Top Left - Patient Selection */}
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

        {/* Top Right - Progress Chart */}
        {selectedPatient && (
          <div className="analytics-card progress-chart">
            <h3 className="card-title">Progress Over Time - {selectedPatient.patientName}</h3>
            <div className="chart-container">
              <div className="chart-header">
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color anxiety"></div>
                    <span>Anxiety Level (Max: 21)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color depression"></div>
                    <span>Depression Level (Max: 27)</span>
                  </div>
                </div>
              </div>
              <div className="multiline-chart">
                <svg className="chart-svg" viewBox="0 0 800 200">
                  {/* Y-axis grid lines */}
                  {[0, 5, 10, 15, 20, 25, 30].map((value, index) => (
                    <g key={index}>
                      <line 
                        x1="50" 
                        y1={180 - (value / 30) * 160} 
                        x2="750" 
                        y2={180 - (value / 30) * 160} 
                        stroke="#e5e7eb" 
                        strokeWidth="1"
                      />
                      <text 
                        x="45" 
                        y={180 - (value / 30) * 160 + 5} 
                        fontSize="12" 
                        fill="#6b7280" 
                        textAnchor="end"
                      >
                        {value}
                      </text>
                    </g>
                  ))}
                  
                  {/* X-axis labels - 12 weeks */}
                  {Array.from({length: 12}, (_, i) => i + 1).map((week, index) => (
                    <text 
                      key={index}
                      x={50 + (index * 58.33)} 
                      y="195" 
                      fontSize="10" 
                      fill="#6b7280" 
                      textAnchor="middle"
                    >
                      W{week}
                    </text>
                  ))}
                  
                  {/* Anxiety line */}
                  <polyline
                    points={selectedPatient.progress.map((point, index) => 
                      `${50 + (index * 58.33)},${180 - (point.anxiety / 30) * 160}`
                    ).join(' ')}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Depression line */}
                  <polyline
                    points={selectedPatient.progress.map((point, index) => 
                      `${50 + (index * 58.33)},${180 - (point.depression / 30) * 160}`
                    ).join(' ')}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Data points */}
                  {selectedPatient.progress.map((point, index) => (
                    <g key={index}>
                      <circle 
                        cx={50 + (index * 58.33)} 
                        cy={180 - (point.anxiety / 30) * 160} 
                        r="3" 
                        fill="#f59e0b"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <circle 
                        cx={50 + (index * 58.33)} 
                        cy={180 - (point.depression / 30) * 160} 
                        r="3" 
                        fill="#ef4444"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </g>
                  ))}
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Left - Summary Stats */}
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

        {/* Bottom Right - Additional Analytics */}
        <div className="analytics-card additional-analytics">
          <h3 className="card-title">Progress Insights</h3>
          {selectedPatient && (
            <div className="insights-container">
              <div className="insight-item">
                <div className="insight-icon">📈</div>
                <div className="insight-content">
                  <h4>Trend Analysis</h4>
                  <p>Overall improvement in both anxiety and depression levels over the treatment period.</p>
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-icon">🎯</div>
                <div className="insight-content">
                  <h4>Treatment Goals</h4>
                  <p>Target: Reduce anxiety below 10 and depression below 15 by week 12.</p>
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-icon">⚠️</div>
                <div className="insight-content">
                  <h4>Risk Assessment</h4>
                  <p>Monitor closely if scores exceed 20 for anxiety or 25 for depression.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
