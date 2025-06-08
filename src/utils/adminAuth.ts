import { auth } from '../integrations/firebase/client';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Credenciais do administrador
export const ADMIN_EMAIL = 'admin@primeachadinhos.com';
export const ADMIN_PASSWORD = 'Admin@123';

// Função para criar o usuário admin se não existir
export async function setupAdminUser() {
  try {
    // Tenta fazer login primeiro para verificar se o usuário já existe
    await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log('Admin já existe, login realizado com sucesso');
    return true;
  } catch (error: any) {
    // Se o erro for "user-not-found", cria o usuário admin
    if (error.code === 'auth/user-not-found') {
      try {
        await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
        console.log('Usuário admin criado com sucesso');
        return true;
      } catch (createError) {
        console.error('Erro ao criar usuário admin:', createError);
        return false;
      }
    } else {
      console.error('Erro ao verificar usuário admin:', error);
      return false;
    }
  }
}

// Função para verificar se o usuário atual é admin
export function isAdminUser(email: string | null) {
  return email === ADMIN_EMAIL;
}