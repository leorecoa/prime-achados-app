import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';
import axios from 'axios';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  products: Product[];
  dailyDeal: Product | null;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateDailyDeal: (product: Product) => void;
  syncWithServer: () => Promise<boolean>;
  isSyncing: boolean;
}

const ADMIN_PASSWORD = '292404Leo'; // Senha fixa para demonstração
const STORAGE_KEY_AUTH = 'admin_authenticated';
const STORAGE_KEY_PRODUCTS = 'admin_products';
const STORAGE_KEY_DAILY_DEAL = 'admin_daily_deal';

// URL da API para sincronização
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://prime-achados-app.vercel.app/api' 
  : 'http://localhost:3001/api';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [dailyDeal, setDailyDeal] = useState<Product | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Carregar estado inicial do localStorage
  useEffect(() => {
    const storedAuth = localStorage.getItem(STORAGE_KEY_AUTH);
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }

    const storedProducts = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      // Importar produtos iniciais
      import('@/data/products').then(({ products: initialProducts }) => {
        setProducts(initialProducts);
        localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(initialProducts));
      });
    }

    const storedDailyDeal = localStorage.getItem(STORAGE_KEY_DAILY_DEAL);
    if (storedDailyDeal) {
      setDailyDeal(JSON.parse(storedDailyDeal));
    } else {
      // Importar achado do dia inicial
      import('@/data/dailyDeal').then(({ dailyDeal: initialDailyDeal }) => {
        setDailyDeal(initialDailyDeal);
        localStorage.setItem(STORAGE_KEY_DAILY_DEAL, JSON.stringify(initialDailyDeal));
      });
    }
  }, []);

  // Autenticação
  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem(STORAGE_KEY_AUTH, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEY_AUTH);
  };

  // Gerenciamento de produtos
  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(updatedProducts));
  };

  const updateProduct = (product: Product) => {
    const updatedProducts = products.map(p => 
      p.id === product.id ? product : p
    );
    setProducts(updatedProducts);
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(updatedProducts));
  };

  // Gerenciamento do achado do dia
  const updateDailyDeal = (product: Product) => {
    setDailyDeal(product);
    localStorage.setItem(STORAGE_KEY_DAILY_DEAL, JSON.stringify(product));
  };

  // Sincronização com o servidor
  const syncWithServer = async (): Promise<boolean> => {
    try {
      setIsSyncing(true);
      
      // Atualizar os arquivos de dados locais
      const dataToSync = {
        products: products,
        dailyDeal: dailyDeal
      };
      
      // Em ambiente de desenvolvimento, apenas simular a sincronização
      if (process.env.NODE_ENV !== 'production') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Dados sincronizados com sucesso (simulação):', dataToSync);
        
        // Atualizar os arquivos locais (simulação)
        try {
          // Em um ambiente real, isso seria feito pelo servidor
          console.log('Arquivos atualizados com sucesso (simulação)');
        } catch (error) {
          console.error('Erro ao atualizar arquivos locais:', error);
        }
      } else {
        // Em produção, enviar para a API
        const response = await axios.post(`${API_URL}/update-data`, dataToSync, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
          }
        });
        
        console.log('Resposta da API:', response.data);
      }
      
      setIsSyncing(false);
      return true;
    } catch (error) {
      console.error('Erro ao sincronizar dados:', error);
      setIsSyncing(false);
      return false;
    }
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    products,
    dailyDeal,
    addProduct,
    updateProduct,
    deleteProduct,
    updateDailyDeal,
    syncWithServer,
    isSyncing
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};