import { ref, set, push, remove, update, get } from 'firebase/database';
import { database } from '../integrations/firebase/client';
import { useDatabase } from './useDatabase';
import { Product } from '@/data/products';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

// Função para inicializar a estrutura básica
export async function initializeProductsDatabase() {
  try {
    // Verificar se já existe a estrutura básica
    const snapshot = await get(ref(database, 'products'));
    
    if (!snapshot.exists()) {
      // Criar estrutura inicial com um produto de exemplo
      await set(ref(database, 'products/initial'), {
        name: "Produto Exemplo",
        image: "https://placehold.co/600x400",
        originalPrice: 99.99,
        discountPrice: 79.99,
        category: "exemplo",
        affiliateLink: "https://exemplo.com",
        description: "Produto de exemplo para inicializar o banco de dados",
        timestamp: Date.now()
      });
      console.log("Estrutura de produtos inicializada no Firebase");
    }
    
    return true;
  } catch (error) {
    console.error("Erro ao inicializar estrutura de produtos:", error);
    return false;
  }
}

export function useProductsDatabase() {
  const { data: products, loading, error } = useDatabase<Record<string, Product>>('products');
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  // Converter objeto de produtos do Firebase para array
  const productsList = products ? Object.entries(products).map(([key, product]) => ({
    ...product,
    id: key
  })) : [];

  // Adicionar produto
  const addProduct = async (product: Omit<Product, 'id'>) => {
    setIsProcessing(true);
    try {
      const newProductRef = push(ref(database, 'products'));
      const newProduct = {
        ...product,
        discount: product.discount || 0,
        rating: product.rating || 0,
        category: product.category || "",
        description: product.description || "",
        timestamp: Date.now()
      };
      
      await set(newProductRef, newProduct);
      
      toast({
        title: 'Produto adicionado',
        description: 'O produto foi adicionado com sucesso ao Firebase.'
      });
      
      return { ...newProduct, id: newProductRef.key as string };
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível adicionar o produto.',
        variant: 'destructive'
      });
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  // Atualizar produto
  const updateProduct = async (product: Product) => {
    setIsProcessing(true);
    try {
      const { id, ...productData } = product;
      await update(ref(database, `products/${id}`), {
        ...productData,
        discount: productData.discount || 0,
        rating: productData.rating || 0,
        category: productData.category || "",
        description: productData.description || "",
        updatedAt: Date.now()
      });
      
      toast({
        title: 'Produto atualizado',
        description: 'O produto foi atualizado com sucesso no Firebase.'
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o produto.',
        variant: 'destructive'
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  // Excluir produto
  const deleteProduct = async (id: string) => {
    setIsProcessing(true);
    try {
      await remove(ref(database, `products/${id}`));
      
      toast({
        title: 'Produto excluído',
        description: 'O produto foi excluído com sucesso do Firebase.'
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o produto.',
        variant: 'destructive'
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  // Importar produtos em lote
  const importProducts = async (productsToImport: Product[]) => {
    setIsProcessing(true);
    try {
      const updates: Record<string, any> = {};
      
      productsToImport.forEach(product => {
        const { id, ...productData } = product;
        const productId = id || push(ref(database, 'products')).key;
        if (productId) {
          updates[`products/${productId}`] = {
            ...productData,
            discount: productData.discount || 0,
            rating: productData.rating || 0,
            category: productData.category || "",
            description: productData.description || "",
            importedAt: Date.now()
          };
        }
      });
      
      await update(ref(database), updates);
      
      toast({
        title: 'Produtos importados',
        description: `${productsToImport.length} produtos foram importados com sucesso para o Firebase.`
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao importar produtos:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível importar os produtos.',
        variant: 'destructive'
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  // Sincronizar produtos do localStorage para o Firebase
  const syncLocalToFirebase = async (localProducts: Product[]) => {
    setIsProcessing(true);
    try {
      const updates: Record<string, any> = {};
      
      localProducts.forEach(product => {
        updates[`products/${product.id}`] = {
          name: product.name,
          image: product.image,
          originalPrice: product.originalPrice,
          discountPrice: product.discountPrice,
          discount: product.discount || 0, // Adicione valor padrão
          rating: product.rating || 0,     // Adicione valor padrão
          category: product.category || "",
          affiliateLink: product.affiliateLink,
          description: product.description || "",
          syncedAt: Date.now()
        };
      });
      
      await update(ref(database), updates);
      
      toast({
        title: 'Sincronização concluída',
        description: `${localProducts.length} produtos foram sincronizados com o Firebase.`
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao sincronizar produtos:', error);
      toast({
        title: 'Erro de sincronização',
        description: 'Não foi possível sincronizar os produtos com o Firebase.',
        variant: 'destructive'
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    products: productsList,
    loading,
    error,
    isProcessing,
    addProduct,
    updateProduct,
    deleteProduct,
    importProducts,
    syncLocalToFirebase
  };
}