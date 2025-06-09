import { auth } from '../integrations/firebase/client';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export const ADMIN_EMAIL = 'admin@primeachadinhos.com';
export const ADMIN_PASSWORD = '292404Leo';

// Função para tentar criar o usuário admin se não existir
export async function setupAdminUser() {
  try {
    // Tenta fazer login primeiro
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