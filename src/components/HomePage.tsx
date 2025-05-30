import { useState, useEffect } from 'react';
import DailyDeal from './DailyDeal';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';
import { Product } from '@/data/products';
import { products as fallbackProducts } from '@/data/products';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  // Carregar produtos
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Primeiro tenta carregar do localStorage
        const storedProducts = localStorage.getItem('admin_products');
        if (storedProducts) {
          const parsedProducts = JSON.parse(storedProducts);
          setProducts(parsedProducts);
          
          // Extrair categorias únicas
          const uniqueCategories = Array.from(
            new Set(parsedProducts.map((p: Product) => p.category).filter(Boolean))
          ) as string[];
          
          setCategories(uniqueCategories);
          setFilteredProducts(parsedProducts);
        } else {
          // Se não houver no localStorage, usa o fallback
          setProducts(fallbackProducts);
          
          // Extrair categorias únicas do fallback
          const uniqueCategories = Array.from(
            new Set(fallbackProducts.map(p => p.category).filter(Boolean))
          ) as string[];
          
          setCategories(uniqueCategories);
          setFilteredProducts(fallbackProducts);
        }
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        setProducts(fallbackProducts);
        setFilteredProducts(fallbackProducts);
        
        // Extrair categorias únicas do fallback em caso de erro
        const uniqueCategories = Array.from(
          new Set(fallbackProducts.map(p => p.category).filter(Boolean))
        ) as string[];
        
        setCategories(uniqueCategories);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filtrar produtos por categoria
  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <section id="daily-deal" className="mb-12">
        <DailyDeal />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Produtos em Destaque</h2>
        
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-gray-100 rounded-xl h-80 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
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