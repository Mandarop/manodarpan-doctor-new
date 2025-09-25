import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHome from '../features/Dashboard/DashboardHome';
import PatientsList from '../features/Dashboard/PatientsList';
import PatientProfile from '../features/Dashboard/PatientProfile';
import ReportPage from '../features/Dashboard/ReportPage';
import AnalyticsPage from '../features/Dashboard/AnalyticsPage';
import './DashboardPage.css';

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
      <main className="main-content">
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="patients" element={<PatientsList />} />
            <Route path="patient/:id" element={<PatientProfile />} />
            <Route path="report/:uid" element={<ReportPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
