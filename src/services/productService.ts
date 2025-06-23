import { Product } from '@/data/products';
import { ref, set, push, remove, update, get } from 'firebase/database';
import { database } from '../integrations/firebase/client';

export class ProductService {
  private static instance: ProductService;
  private readonly STORAGE_KEY = 'admin_products';

  static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  async saveProduct(product: Omit<Product, 'id'>): Promise<Product | null> {
    try {
      const id = Date.now().toString();
      const newProduct: Product = { ...product, id };

      const localProducts = this.getLocalProducts();
      localProducts.push(newProduct);
      this.saveToLocalStorage(localProducts);

      await set(ref(database, `products/${id}`), {
        ...product,
        timestamp: Date.now()
      });

      return newProduct;
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      return null;
    }
  }

  async updateProduct(product: Product): Promise<boolean> {
    try {
      const localProducts = this.getLocalProducts();
      const index = localProducts.findIndex(p => p.id === product.id);
      if (index !== -1) {
        localProducts[index] = product;
        this.saveToLocalStorage(localProducts);
      }

      const { id, ...productData } = product;
      await update(ref(database, `products/${id}`), {
        ...productData,
        updatedAt: Date.now()
      });

      return true;
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      return false;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const localProducts = this.getLocalProducts();
      const filteredProducts = localProducts.filter(p => p.id !== id);
      this.saveToLocalStorage(filteredProducts);

      await remove(ref(database, `products/${id}`));
      return true;
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      return false;
    }
  }

  getLocalProducts(): Product[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      return [];
    }
  }

  async syncWithFirebase(): Promise<Product[]> {
    try {
      const snapshot = await get(ref(database, 'products'));
      if (snapshot.exists()) {
        const firebaseData = snapshot.val();
        const firebaseProducts: Product[] = Object.entries(firebaseData).map(([key, value]: [string, any]) => ({
          ...value,
          id: key
        }));
        
        this.saveToLocalStorage(firebaseProducts);
        return firebaseProducts;
      }
      return [];
    } catch (error) {
      console.error('Erro ao sincronizar:', error);
      return this.getLocalProducts();
    }
  }

  private saveToLocalStorage(products: Product[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
      window.dispatchEvent(new CustomEvent('productsUpdated'));
    } catch (error) {
      console.error('Erro ao salvar localStorage:', error);
    }
  }
}

export const productService = ProductService.getInstance();