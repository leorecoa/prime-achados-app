import { useState, useEffect } from 'react';
import { Product } from '@/data/products';

const STORAGE_KEY = 'admin_products';

export function useLocalProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
    setProducts(newProducts);
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString()
    };
    const updated = [...products, newProduct];
    saveProducts(updated);
    return true;
  };

  const updateProduct = (product: Product) => {
    const updated = products.map(p => p.id === product.id ? product : p);
    saveProducts(updated);
    return true;
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    saveProducts(updated);
    return true;
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct
  };
}