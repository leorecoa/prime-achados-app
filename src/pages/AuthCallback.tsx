import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Processa o callback do OAuth
      const { error } = await supabase.auth.getSession();

      if (error) {
        toast({
          title: 'Erro na autenticação',
          description: error.message,
          variant: 'destructive',
        });
        navigate('/');
        return;
      }

      // Autenticação bem-sucedida
      toast({
        title: 'Login realizado com sucesso',
        description: 'Bem-vindo ao Prime Achados!',
      });
      
      // Redireciona para a página inicial
      navigate('/');
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-orange-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Autenticando...</h1>
        <p className="text-gray-600">Você será redirecionado em instantes.</p>
      </div>
    </div>
  );
};

export default AuthCallback;