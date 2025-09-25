
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './Pages/DashboardPage';
import NotFound from './Pages/NotFound';
import Home from './Pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard/*" element={<DashboardPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
