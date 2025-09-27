
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './Pages/DashboardPage';
import NotFound from './Pages/NotFound';
import Home from './Pages/Home';
import PatientManagement from './Pages/PatientManagement';
import AnalyticsDashboard from './Pages/AnalyticsDashboard';
import HealthReports from './Pages/HealthReports';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard/*" element={<DashboardPage />} />
      <Route path="/patient-management" element={<PatientManagement />} />
      <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
      <Route path="/health-reports" element={<HealthReports />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
