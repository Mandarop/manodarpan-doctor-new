import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReportByPatientId, getPatientById } from "../../Services/staticData";
import "./ReportPage.css";
import logo from "../../assets/logo.jpg";

// Sample data for the comprehensive report
const sampleReportData = {
  userId: "USER123",
  age: 20,
  gender: "Female",
  reportPeriod: "7-20 Sep 2025",
  phq9Gad7Scores: {
    diary: { phq9: 12, gad7: 10 },
    chatbot: { phq9: 14, gad7: 11 },
    mcqs: { phq9: 15, gad7: 12 },
    games: { phq9: 11, gad7: 9 },
    combined: { phq9: 13, gad7: 11 }
  },
  suicidalAlerts: {
    instances: 3,
    breakdown: { diary: 1, chatbot: 2 },
    lastMention: "18 Sep 2025"
  },
  trendData: [
    { week: 2, phq9: 4, gad7: 6 },
    { week: 4, phq9: 7, gad7: 8 },
    { week: 6, phq9: 8, gad7: 13 },
    { week: 8, phq9: 6, gad7: 20 },
    { week: 10, phq9: 14, gad7: 26 }
  ],
  progressBadges: [
    { name: "Diary Completed (14 days)", status: "completed", icon: "✓" },
    { name: "MCQ Check Done", status: "completed", icon: "✓" },
    { name: "Games Missed 2 days", status: "warning", icon: "⚠" }
  ],
  streaks: [
    { name: "Diary Streak", days: 10, icon: "📖" },
    { name: "Game Streak", days: 7, icon: "🎮" },
    { name: "Mindfulness Activity", days: 5, icon: "🧘" }
  ]
};

function ReportPage() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [report, patient] = await Promise.all([
          getReportByPatientId(uid),
          getPatientById(uid)
        ]);
        
        if (report) {
          // Merge with sample data for comprehensive report
          setReportData({ ...sampleReportData, ...report });
        } else {
          setReportData(sampleReportData);
        }
        
        setPatientData(patient);
      } catch (err) {
        console.error("Error fetching data:", err);
        setReportData(sampleReportData);
      } finally {
        setLoading(false);
      }
    };

    if (uid) fetchData();
  }, [uid]);

  const getScoreColor = (phq9, gad7) => {
    const maxScore = Math.max(phq9, gad7);
    if (maxScore >= 15) return "critical";
    if (maxScore >= 10) return "warning";
    return "normal";
  };

  const getAlertColor = (instances) => {
    if (instances >= 3) return "critical";
    if (instances >= 1) return "warning";
    return "normal";
  };

  if (loading) {
    return (
      <div className="report-wrapper">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading report...</p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="report-wrapper">
        <div className="error-container">
          <p>No report found for this patient.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="report-wrapper">
      <div className="report-container">
        {/* Header */}
        <div className="report-header">
          <button onClick={() => navigate('/dashboard/patients')} className="back-button">
            <svg className="back-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Patients
          </button>
          <div className="report-title-section">
            <img src={logo} alt="Manodarpan Logo" className="report-logo" />
            <div>
              <h1 className="report-title">Personal Mental Health Report</h1>
              <p className="report-subtitle">Comprehensive analysis of mental well-being</p>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="report-section">
          <h2 className="section-title">Basic Info</h2>
          <div className="basic-info-grid">
            <div className="info-item">
              <span className="info-label">User ID</span>
              <span className="info-value">{reportData.userId}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Age</span>
              <span className="info-value">{reportData.age}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Gender</span>
              <span className="info-value">{reportData.gender}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Report Period</span>
              <span className="info-value">{reportData.reportPeriod}</span>
            </div>
          </div>
        </div>

        {/* PHQ-9 / GAD-7 Scores */}
        <div className="report-section">
          <h2 className="section-title">PHQ-9 / GAD-7 Scores</h2>
          <div className="scores-grid">
            {Object.entries(reportData.phq9Gad7Scores).map(([activity, scores]) => (
              <div key={activity} className={`score-card ${getScoreColor(scores.phq9, scores.gad7)}`}>
                <div className="score-activity">{activity.charAt(0).toUpperCase() + activity.slice(1)}</div>
                <div className="score-values">
                  <span className="phq9-score">{scores.phq9}</span>
                  <span className="score-separator">/</span>
                  <span className="gad7-score">{scores.gad7}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suicidal Alerts */}
        <div className="report-section">
          <h2 className="section-title">Suicidal Alerts</h2>
          <div className="alerts-container">
            <div className={`alert-card ${getAlertColor(reportData.suicidalAlerts.instances)}`}>
              <div className="alert-main">
                <span className="alert-label">Instances Detected</span>
                <span className="alert-value">{reportData.suicidalAlerts.instances}</span>
              </div>
              <div className="alert-breakdown">
                <span>Breakdown: (Diary: {reportData.suicidalAlerts.breakdown.diary} Chatbot: {reportData.suicidalAlerts.breakdown.chatbot})</span>
              </div>
              <div className="alert-last">
                <span>Last Mention: {reportData.suicidalAlerts.lastMention}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trend Graph */}
        <div className="report-section">
          <h2 className="section-title">PHQ-9 / GAD-7 Trend Graph</h2>
          <div className="trend-chart">
            <div className="chart-container">
              <div className="chart-y-axis">
                {[0, 5, 10, 15, 20, 25, 30].map(value => (
                  <div key={value} className="y-tick">
                    <span className="y-label">{value}</span>
                  </div>
                ))}
              </div>
              <div className="chart-area">
                <div className="chart-lines">
                  {/* PHQ-9 Line */}
                  <svg className="trend-line phq9-line" viewBox="0 0 400 200">
                    <polyline
                      points={reportData.trendData.map((point, index) => 
                        `${(index * 100) + 20},${200 - (point.phq9 * 6.67)}`
                      ).join(' ')}
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3"
                    />
                  </svg>
                  {/* GAD-7 Line */}
                  <svg className="trend-line gad7-line" viewBox="0 0 400 200">
                    <polyline
                      points={reportData.trendData.map((point, index) => 
                        `${(index * 100) + 20},${200 - (point.gad7 * 6.67)}`
                      ).join(' ')}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                    />
                  </svg>
                </div>
                <div className="chart-x-axis">
                  {reportData.trendData.map((point, index) => (
                    <div key={index} className="x-tick">
                      <span className="x-label">Week {point.week}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color phq9"></div>
                <span>PHQ-9</span>
              </div>
              <div className="legend-item">
                <div className="legend-color gad7"></div>
                <span>GAD-7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Badges */}
        <div className="report-section">
          <h2 className="section-title">Progress Badges</h2>
          <div className="badges-grid">
            {reportData.progressBadges.map((badge, index) => (
              <div key={index} className={`badge-card ${badge.status}`}>
                <div className="badge-icon">{badge.icon}</div>
                <div className="badge-text">{badge.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Streaks */}
        <div className="report-section">
          <h2 className="section-title">Streaks</h2>
          <div className="streaks-grid">
            {reportData.streaks.map((streak, index) => (
              <div key={index} className="streak-card">
                <div className="streak-icon">{streak.icon}</div>
                <div className="streak-info">
                  <div className="streak-name">{streak.name}</div>
                  <div className="streak-days">{streak.days} days in a row</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
