import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/data/products';
import { useProductsDatabase } from './useProductsDatabase';
import { getAllProducts, saveProducts } from '@/utils/productStorage';
import { useToast } from '@/components/ui/use-toast';

export function useProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const {
    products: firebaseProducts,
    loading: firebaseLoading,
    addProduct: addToFirebase,
    updateProduct: updateInFirebase,
    deleteProduct: deleteFromFirebase,
    syncLocalToFirebase
  } = useProductsDatabase();

  // Carregar produtos na inicialização
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        
        // Tentar carregar do Firebase primeiro
        if (firebaseProducts && firebaseProducts.length > 0) {
          setProducts(firebaseProducts);
          // Sincronizar com localStorage
          saveProducts(firebaseProducts);
        } else {
          // Fallback para localStorage
          const localProducts = getAllProducts();
          setProducts(localProducts);
        }
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        toast({
          title: 'Erro ao carregar',
          description: 'Falha ao carregar produtos.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (!firebaseLoading) {
      loadProducts();
    }
  }, [firebaseProducts, firebaseLoading, toast]);

  // Adicionar produto
  const addProduct = useCallback(async (productData: Omit<Product, 'id'>): Promise<boolean> => {
    try {
      const result = await addToFirebase(productData);
      
      if (result) {
        // Atualizar estado local
        setProducts(prev => [...prev, result]);
        
        // Backup no localStorage
        const updatedProducts = [...products, result];
        saveProducts(updatedProducts);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      return false;
    }
  }, [addToFirebase, products]);

  // Atualizar produto
  const updateProduct = useCallback(async (product: Product): Promise<boolean> => {
    try {
      const success = await updateInFirebase(product);
      
      if (success) {
        // Atualizar estado local
        setProducts(prev => prev.map(p => p.id === product.id ? product : p));
        
        // Backup no localStorage
        const updatedProducts = products.map(p => p.id === product.id ? product : p);
        saveProducts(updatedProducts);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      return false;
    }
  }, [updateInFirebase, products]);

  // Excluir produto
  const deleteProduct = useCallback(async (id: string): Promise<boolean> => {
    try {
      const success = await deleteFromFirebase(id);
      
      if (success) {
        // Atualizar estado local
        setProducts(prev => prev.filter(p => p.id !== id));
        
        // Backup no localStorage
        const updatedProducts = products.filter(p => p.id !== id);
        saveProducts(updatedProducts);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      return false;
    }
  }, [deleteFromFirebase, products]);

  // Sincronizar produtos
  const syncProducts = useCallback(async (): Promise<boolean> => {
    try {
      const success = await syncLocalToFirebase(products);
      
      if (success) {
        saveProducts(products);
        toast({
          title: 'Sincronização concluída',
          description: 'Produtos sincronizados com sucesso.'
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro na sincronização:', error);
      toast({
        title: 'Erro na sincronização',
        description: 'Falha ao sincronizar produtos.',
        variant: 'destructive'
      });
      return false;
    }
  }, [products, syncLocalToFirebase, toast]);

  return {
    products,
    isLoading: isLoading || firebaseLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    syncProducts
  };
}