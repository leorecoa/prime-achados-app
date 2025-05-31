import React from 'react';
import AdminLogin from '@/components/admin/AdminLogin';
import { useAdmin } from '@/contexts/AdminContext';
import { Navigate } from 'react-router-dom';

const AdminIndex: React.FC = () => {
  const { isAuthenticated } = useAdmin();

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <AdminLogin />;
};

export default AdminIndex;