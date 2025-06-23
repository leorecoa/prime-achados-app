import { useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { useToast } from '@/components/ui/use-toast';

const STORAGE_KEY = 'admin_products';

export function useSimpleProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const loadedProducts = stored ? JSON.parse(stored) : [];
      setProducts(loadedProducts);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setProducts([]);
    }
  };

  const saveToStorage = (products: Product[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
      return true;
    } catch (error) {
      console.error('Erro ao salvar produtos:', error);
      return false;
    }
  };

  const addProduct = (productData: Omit<Product, 'id'>): boolean => {
    console.log('Adicionando produto:', productData);
    try {
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString()
      };
      
      console.log('Produto criado:', newProduct);
      const updatedProducts = [...products, newProduct];
      console.log('Lista atualizada:', updatedProducts);
      
      if (saveToStorage(updatedProducts)) {
        setProducts(updatedProducts);
        console.log('Produto salvo com sucesso');
        toast({
          title: 'Produto adicionado',
          description: 'Produto salvo com sucesso!'
        });
        return true;
      }
      console.log('Falha ao salvar no storage');
      return false;
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      toast({
        title: 'Erro',
        description: 'Falha ao adicionar produto',
        variant: 'destructive'
      });
      return false;
    }
  };

  const updateProduct = (product: Product): boolean => {
    try {
      const updatedProducts = products.map(p => p.id === product.id ? product : p);
      
      if (saveToStorage(updatedProducts)) {
        setProducts(updatedProducts);
        toast({
          title: 'Produto atualizado',
          description: 'Produto atualizado com sucesso!'
        });
        return true;
      }
      return false;
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao atualizar produto',
        variant: 'destructive'
      });
      return false;
    }
  };

  const deleteProduct = (id: string): boolean => {
    try {
      const updatedProducts = products.filter(p => p.id !== id);
      
      if (saveToStorage(updatedProducts)) {
        setProducts(updatedProducts);
        toast({
          title: 'Produto excluído',
          description: 'Produto removido com sucesso!'
        });
        return true;
      }
      return false;
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Falha ao excluir produto',
        variant: 'destructive'
      });
      return false;
    }
  };

  return {
    products,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct
  };
}