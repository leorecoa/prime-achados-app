import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';

const AdminLayout: React.FC = () => {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Painel Administrativo</h1>
          <div className="flex space-x-4">
            <Button variant="ghost" onClick={() => navigate('/admin/dashboard')}>
              Produtos
            </Button>
            <Button variant="ghost" onClick={() => navigate('/admin/daily-deal')}>
              Achado do Dia
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;