import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHome from '../features/Dashboard/DashboardHome';
import PatientsList from '../features/Dashboard/PatientsList';
import PatientProfile from '../features/Dashboard/PatientProfile';
import ReportPage from '../features/Dashboard/ReportPage'; // ✅ Ensure the file is named ReportPage.jsx

// Centralized route paths (optional usage)
export const DASHBOARD_ROUTES = {
  HOME: '/',
  PATIENTS: 'patients',
  PATIENT_PROFILE: 'patient/:id',
  PATIENT_REPORT: 'report/:uid',
};

function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="patients" element={<PatientsList />} />
          <Route path="patient/:id" element={<PatientProfile />} />
          <Route path="report/:uid" element={<ReportPage />} /> {/* ✅ Fixed nested route */}
        </Routes>
      </main>
    </div>
  );
}

export default DashboardPage;
