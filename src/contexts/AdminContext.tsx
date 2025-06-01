import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';

// Interface para banners promocionais
export interface Banner {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  linkUrl: string;
  active: boolean;
  position: 'top' | 'middle' | 'bottom';
}

interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  products: Product[];
  dailyDeal: Product | null;
  banners: Banner[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateDailyDeal: (product: Product) => void;
  addBanner: (banner: Omit<Banner, 'id'>) => void;
  updateBanner: (banner: Banner) => void;
  deleteBanner: (id: string) => void;
  syncWithServer: () => Promise<boolean>;
  isSyncing: boolean;
  exportData: () => void;
  importData: (jsonData: string) => boolean;
}

const ADMIN_PASSWORD = '292404Leo'; // Senha fixa para demonstração
const STORAGE_KEY_AUTH = 'admin_authenticated';
const STORAGE_KEY_PRODUCTS = 'admin_products';
const STORAGE_KEY_DAILY_DEAL = 'admin_daily_deal';
const STORAGE_KEY_BANNERS = 'admin_banners';

// Banners iniciais
const initialBanners: Banner[] = [
  {
    id: '1',
    title: 'Ofertas Especiais',
    description: 'Confira nossas melhores ofertas da semana',
    imageUrl: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=1470&auto=format&fit=crop',
    linkUrl: '#ofertas',
    active: true,
    position: 'top'
  },
  {
    id: '2',
    title: 'Produtos Eletrônicos',
    description: 'Os melhores gadgets com preços incríveis',
    imageUrl: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1632&auto=format&fit=crop',
    linkUrl: '#eletronicos',
    active: true,
    position: 'middle'
  }
];

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [dailyDeal, setDailyDeal] = useState<Product | null>(null);
  const [banners, setBanners] = useState<Banner[]>([]);
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

    // Carregar banners
    const storedBanners = localStorage.getItem(STORAGE_KEY_BANNERS);
    if (storedBanners) {
      setBanners(JSON.parse(storedBanners));
    } else {
      setBanners(initialBanners);
      localStorage.setItem(STORAGE_KEY_BANNERS, JSON.stringify(initialBanners));
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
    
    // Disparar evento de storage para atualizar outras abas
    window.dispatchEvent(new Event('storage'));
  };

  const updateProduct = (product: Product) => {
    const updatedProducts = products.map(p => 
      p.id === product.id ? product : p
    );
    setProducts(updatedProducts);
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(updatedProducts));
    
    // Disparar evento de storage para atualizar outras abas
    window.dispatchEvent(new Event('storage'));
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(updatedProducts));
    
    // Disparar evento de storage para atualizar outras abas
    window.dispatchEvent(new Event('storage'));
  };

  // Gerenciamento do achado do dia
  const updateDailyDeal = (product: Product) => {
    setDailyDeal(product);
    localStorage.setItem(STORAGE_KEY_DAILY_DEAL, JSON.stringify(product));
    
    // Disparar evento de storage para atualizar outras abas
    window.dispatchEvent(new Event('storage'));
  };

  // Gerenciamento de banners
  const addBanner = (banner: Omit<Banner, 'id'>) => {
    const newBanner = {
      ...banner,
      id: Date.now().toString(),
    };
    const updatedBanners = [...banners, newBanner];
    setBanners(updatedBanners);
    localStorage.setItem(STORAGE_KEY_BANNERS, JSON.stringify(updatedBanners));
    
    // Disparar evento de storage para atualizar outras abas
    window.dispatchEvent(new Event('storage'));
  };

  const updateBanner = (banner: Banner) => {
    const updatedBanners = banners.map(b => 
      b.id === banner.id ? banner : b
    );
    setBanners(updatedBanners);
    localStorage.setItem(STORAGE_KEY_BANNERS, JSON.stringify(updatedBanners));
    
    // Disparar evento de storage para atualizar outras abas
    window.dispatchEvent(new Event('storage'));
  };

  const deleteBanner = (id: string) => {
    const updatedBanners = banners.filter(b => b.id !== id);
    setBanners(updatedBanners);
    localStorage.setItem(STORAGE_KEY_BANNERS, JSON.stringify(updatedBanners));
    
    // Disparar evento de storage para atualizar outras abas
    window.dispatchEvent(new Event('storage'));
  };

  // Sincronização com o servidor (simulada com localStorage)
  const syncWithServer = async (): Promise<boolean> => {
    try {
      setIsSyncing(true);
      
      // Simular um tempo de processamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Salvar no localStorage (isso já é feito nas funções individuais, mas vamos garantir)
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
      localStorage.setItem(STORAGE_KEY_BANNERS, JSON.stringify(banners));
      
      if (dailyDeal) {
        localStorage.setItem(STORAGE_KEY_DAILY_DEAL, JSON.stringify(dailyDeal));
      }
      
      // Disparar evento de storage para atualizar outras abas
      window.dispatchEvent(new Event('storage'));
      
      console.log('Dados sincronizados com sucesso no localStorage');
      
      setIsSyncing(false);
      return true;
    } catch (error) {
      console.error('Erro ao sincronizar dados:', error);
      setIsSyncing(false);
      return false;
    }
  };

  // Exportar dados para backup
  const exportData = () => {
    const data = {
      products,
      dailyDeal,
      banners
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `prime-achados-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Importar dados de backup
  const importData = (jsonData: string): boolean => {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.products && Array.isArray(data.products)) {
        setProducts(data.products);
        localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(data.products));
      }
      
      if (data.dailyDeal) {
        setDailyDeal(data.dailyDeal);
        localStorage.setItem(STORAGE_KEY_DAILY_DEAL, JSON.stringify(data.dailyDeal));
      }

      if (data.banners && Array.isArray(data.banners)) {
        setBanners(data.banners);
        localStorage.setItem(STORAGE_KEY_BANNERS, JSON.stringify(data.banners));
      }
      
      // Disparar evento de storage para atualizar outras abas
      window.dispatchEvent(new Event('storage'));
      
      return true;
    } catch (error) {
      console.error('Erro ao importar dados:', error);
      return false;
    }
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    products,
    dailyDeal,
    banners,
    addProduct,
    updateProduct,
    deleteProduct,
    updateDailyDeal,
    addBanner,
    updateBanner,
    deleteBanner,
    syncWithServer,
    isSyncing,
    exportData,
    importData
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