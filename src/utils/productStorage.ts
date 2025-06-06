import { Product } from '@/data/products';
import { products as initialProducts } from '@/data/products';

const STORAGE_KEY = 'admin_products';

// Evento personalizado para notificar mudanças nos produtos
export const PRODUCTS_UPDATED_EVENT = 'productsUpdated';

// Função para obter todos os produtos
export function getAllProducts(): Product[] {
  try {
    const storedProducts = localStorage.getItem(STORAGE_KEY);
    if (storedProducts) {
      return JSON.parse(storedProducts);
    }
    
    // Se não houver produtos no localStorage, use os produtos iniciais
    saveProducts(initialProducts);
    return initialProducts;
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    return initialProducts;
  }
}

// Função para salvar produtos
export function saveProducts(products: Product[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    
    // Disparar evento personalizado para notificar outras partes do app
    window.dispatchEvent(new CustomEvent(PRODUCTS_UPDATED_EVENT));
    
    // Forçar evento de storage para outras abas
    const storageEvent = new StorageEvent('storage', {
      key: STORAGE_KEY,
      newValue: JSON.stringify(products),
      url: window.location.href,
      storageArea: localStorage
    });
    window.dispatchEvent(storageEvent);
  } catch (error) {
    console.error('Erro ao salvar produtos:', error);
  }
}

// Função para adicionar um produto
export function addProduct(product: Omit<Product, 'id'>): Product {
  const products = getAllProducts();
  const newProduct = {
    ...product,
    id: Date.now().toString()
  };
  
  const updatedProducts = [...products, newProduct];
  saveProducts(updatedProducts);
  
  return newProduct;
}

// Função para atualizar um produto
export function updateProduct(product: Product): void {
  const products = getAllProducts();
  const updatedProducts = products.map(p => 
    p.id === product.id ? product : p
  );
  
  saveProducts(updatedProducts);
}

// Função para excluir um produto
export function deleteProduct(id: string): void {
  const products = getAllProducts();
  const updatedProducts = products.filter(p => p.id !== id);
  
  saveProducts(updatedProducts);
}