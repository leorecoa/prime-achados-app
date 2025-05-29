import { useQuery } from '@tanstack/react-query';
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