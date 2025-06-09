import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const AdminIndex: React.FC = () => {
  const { isAuthenticated, login } = useAdmin();
  const [password, setPassword] = useState('292404Leo');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Se já estiver autenticado, redirecionar para o dashboard
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Autenticação direta com senha fixa
    if (password === '292404Leo') {
      login(password);
      navigate('/admin/dashboard');
    } else {
      toast({
        title: 'Erro de autenticação',
        description: 'Senha incorreta. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Painel Administrativo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Senha de administrador"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminIndex;