import React from 'react';
import AdminLogin from '@/components/admin/AdminLogin';
import { useAdmin } from '@/contexts/AdminContext';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminIndex: React.FC = () => {
  const { isAuthenticated } = useAdmin();
  const { user } = useAuth();

  // Se já estiver autenticado no Firebase e no sistema local
  if (user && isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <AdminLogin />;
};

export default AdminIndex;