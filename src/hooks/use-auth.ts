import { useMutation } from '@tanstack/react-query';

interface AuthCredentials {
  email: string;
  password: string;
}

export function useAuth() {
  // Simulação de autenticação - em um caso real, isso se conectaria a um backend
  const signIn = useMutation({
    mutationFn: async (credentials: AuthCredentials) => {
      // Simular uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular sucesso ou erro
      if (credentials.email === 'teste@exemplo.com' && credentials.password === 'senha123') {
        return { user: { id: '1', email: credentials.email } };
      }
      
      throw new Error('Email ou senha incorretos');
    }
  });

  const signUp = useMutation({
    mutationFn: async (credentials: AuthCredentials) => {
      // Simular uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular sucesso ou erro
      if (credentials.email.includes('@')) {
        return { user: { id: '2', email: credentials.email } };
      }
      
      throw new Error('Email inválido');
    }
  });

  const signInWithGoogle = useMutation({
    mutationFn: async () => {
      // Simular uma chamada de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simular sucesso
      return { user: { id: '3', email: 'google@exemplo.com' } };
    }
  });

  return {
    signIn,
    signUp,
    signInWithGoogle
  };
}