import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = true; // Replace with real auth logic later
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;