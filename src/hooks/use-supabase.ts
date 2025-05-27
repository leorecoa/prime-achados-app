import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

// Tipos
export type Product = Tables<'products'>;
export type DailyDeal = Tables<'daily_deals'>;
export type Category = Tables<'categories'>;

// Hook para buscar produtos
export function useProducts(category: string = 'all') {
  return useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      let query = supabase.from('products').select('*');
      
      if (category !== 'all') {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query.order('discount', { ascending: false });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data || [];
    }
  });
}

// Hook para buscar a promoção diária
export function useDailyDeal() {
  return useQuery({
    queryKey: ['dailyDeal'],
    queryFn: async () => {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('daily_deals')
        .select('*')
        .eq('is_active', true)
        .gt('expires_at', now)
        .order('expires_at', { ascending: true })
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 é o código para "nenhum resultado"
        throw new Error(error.message);
      }
      
      return data;
    }
  });
}

// Hook para buscar categorias
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('id', { ascending: true });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data || [];
    }
  });
}

// Hook para favoritar/desfavoritar produtos
export function useFavorites() {
  const queryClient = useQueryClient();
  
  // Buscar favoritos do usuário atual
  const getFavorites = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('favorites')
      .select('product_id')
      .eq('user_id', user.id);
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data?.map(fav => fav.product_id) || [];
  };
  
  // Query para buscar favoritos
  const favoritesQuery = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    enabled: !!supabase.auth.getSession()
  });
  
  // Mutation para adicionar aos favoritos
  const addToFavorites = useMutation({
    mutationFn: async (productId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Usuário não autenticado');
      }
      
      const { error } = await supabase
        .from('favorites')
        .insert({ user_id: user.id, product_id: productId });
      
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    }
  });
  
  // Mutation para remover dos favoritos
  const removeFromFavorites = useMutation({
    mutationFn: async (productId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Usuário não autenticado');
      }
      
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);
      
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    }
  });
  
  return {
    favorites: favoritesQuery.data || [],
    isLoading: favoritesQuery.isLoading,
    addToFavorites,
    removeFromFavorites,
    isFavorite: (productId: string) => favoritesQuery.data?.includes(productId) || false
  };
}

// Hook para autenticação
export function useAuth() {
  const queryClient = useQueryClient();
  
  // Buscar usuário atual
  const getUserSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      throw new Error(error.message);
    }
    
    return data.session;
  };
  
  // Query para buscar sessão do usuário
  const sessionQuery = useQuery({
    queryKey: ['session'],
    queryFn: getUserSession
  });
  
  // Mutation para login com email/senha
  const signIn = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    }
  });
  
  // Mutation para login com Google
  const signInWithGoogle = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    }
  });
  
  // Mutation para cadastro
  const signUp = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return data;
    }
  });
  
  // Mutation para logout
  const signOut = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    }
  });
  
  return {
    session: sessionQuery.data,
    isLoading: sessionQuery.isLoading,
    isAuthenticated: !!sessionQuery.data,
    signIn,
    signUp,
    signInWithGoogle,
    signOut
  };
}