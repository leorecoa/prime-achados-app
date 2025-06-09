import React from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Calendar, ImageIcon, LogOut } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();

  // Se não estiver autenticado, redirecionar para a página de login
  if (!isAuthenticated) {
    navigate('/admin');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Painel Administrativo</h1>
          <Button variant="outline" onClick={handleLogout} className="flex items-center">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar de navegação */}
          <aside className="w-full md:w-64 bg-white p-4 rounded-lg shadow mb-6 md:mb-0">
            <nav className="space-y-1">
              <Link to="/admin/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                <LayoutDashboard className="w-5 h-5 mr-3 text-gray-500" />
                Produtos
              </Link>
              <Link to="/admin/daily-deal" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                <Calendar className="w-5 h-5 mr-3 text-gray-500" />
                Achado do Dia
              </Link>
              <Link to="/admin/banners" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                <ImageIcon className="w-5 h-5 mr-3 text-gray-500" />
                Banners
              </Link>
            </nav>
          </aside>
          
          {/* Conteúdo principal */}
          <main className="flex-1 bg-white p-6 rounded-lg shadow">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;