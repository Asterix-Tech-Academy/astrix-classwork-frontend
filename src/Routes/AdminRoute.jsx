import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../components/Admin/AdminDashboard';

function AdminRoute() {
  const isAdmin = true;

  return isAdmin ? (
    <Route path="/admin" element={<AdminDashboard />} />
  ) : (
    <Navigate to="/" replace />
  );
}

export default AdminRoute;