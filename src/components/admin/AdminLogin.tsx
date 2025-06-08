import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '@/integrations/firebase/client';
import { ref, set } from 'firebase/database';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@primeachadinhos.com');
  const [password, setPassword] = useState('');
  const { login } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Autenticação Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Registra último login
      if (userCredential.user) {
        await set(ref(database, `users/${userCredential.user.uid}/lastLogin`), Date.now());
        await set(ref(database, `users/${userCredential.user.uid}/email`), email);
      }
      
      // Autenticação local
      if (login(password)) {
        navigate('/admin/dashboard');
      } else {
        toast({
          title: 'Erro de autenticação local',
          description: 'Senha local incorreta. Tente novamente.',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Erro de autenticação',
        description: error.message || 'Falha na autenticação. Verifique suas credenciais.',
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
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mb-2"
              />
              <Input
                type="password"
                placeholder="Senha"
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

export default AdminLogin;