import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';
import PromotionalBanner from './PromotionalBanner';
import FeaturedProductsCarousel from './FeaturedProductsCarousel';
import { Product } from '@/data/products';
import { RefreshCw } from 'lucide-react';
import { storage } from '@/lib/storage';

// Mapeamento de categorias em inglês para português
const categoryTranslations: Record<string, string> = {
  'electronics': 'Eletrônicos',
  'home': 'Casa',
  'beauty': 'Beleza',
  'kids': 'Infantil',
  'accessories': 'Acessórios',
};

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Função para recarregar produtos
  const loadProducts = () => {
    try {
      setIsRefreshing(true);
      console.log("Carregando produtos...");
      
      // Carregar produtos do storage
      const loadedProducts = storage.getProducts();
      console.log(`${loadedProducts.length} produtos carregados`);
      
      setProducts(loadedProducts);
      
      // Extrair categorias únicas e traduzir para português
      const uniqueCategories = Array.from(
        new Set(loadedProducts.map((p: Product) => p.category).filter(Boolean))
      ) as string[];
      
      // Traduzir categorias e remover duplicatas
      const translatedCategories = uniqueCategories
        .map(category => categoryTranslations[category] || category)
        .filter((value, index, self) => self.indexOf(value) === index);
      
      setCategories(translatedCategories);
      
      // Manter a categoria selecionada se existir nos novos produtos
      if (selectedCategory && !translatedCategories.includes(selectedCategory)) {
        setSelectedCategory(null);
      }
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Carregar produtos inicialmente e configurar listeners
  useEffect(() => {
    loadProducts();
    
    // Listener para evento personalizado
    const handleProductsUpdated = () => {
      console.log("Evento de produtos atualizados recebido");
      loadProducts();
    };
    
    // Listener para evento de storage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin_products') {
        console.log("Evento de storage recebido para produtos");
        loadProducts();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Filtrar produtos por categoria
  useEffect(() => {
    if (selectedCategory) {
      // Encontrar a categoria original correspondente à tradução
      const originalCategory = Object.entries(categoryTranslations)
        .find(([_, translated]) => translated === selectedCategory)?.[0] || selectedCategory;
      
      setFilteredProducts(products.filter(p => 
        p.category === originalCategory || 
        categoryTranslations[p.category] === selectedCategory
      ));
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleRefresh = () => {
    loadProducts();
  };

  // Selecionar produtos em destaque (os 5 com maior desconto)
  const featuredProducts = [...products]
    .sort((a, b) => {
      const discountA = ((a.originalPrice - a.discountPrice) / a.originalPrice) * 100;
      const discountB = ((b.originalPrice - b.discountPrice) / b.originalPrice) * 100;
      return discountB - discountA;
    })
    .slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Banner superior */}
      <div className="mb-8">
        <PromotionalBanner position="top" />
      </div>
      
      {/* Carrossel de produtos em destaque */}
      <section className="mb-8">
        <FeaturedProductsCarousel products={featuredProducts} isLoading={isLoading} />
      </section>

      {/* Banners reorganizados - Agora todos abaixo do carrossel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="md:col-span-1">
          <PromotionalBanner position="middle" />
        </div>
        <div className="md:col-span-1">
          <PromotionalBanner position="bottom" />
        </div>
      </div>

      <section className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-rose-500">
              Produtos em Destaque
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-orange-600 to-rose-500 rounded-full mt-2"></div>
          </div>
          <button 
            onClick={handleRefresh}
            className="text-sm bg-white shadow-md hover:shadow-lg border border-gray-100 text-gray-700 px-3 py-1.5 rounded-full transition-all flex items-center"
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-3 h-3 mr-1.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
        </div>
        
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-gray-100 rounded-xl h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                Nenhum produto encontrado nesta categoria.
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;