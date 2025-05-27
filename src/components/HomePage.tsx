
import { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import ProductCard from './ProductCard';
import DailyDeal from './DailyDeal';
import { useProducts, useCategories } from '@/hooks/use-supabase';
import { Skeleton } from './ui/skeleton';

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { data: products, isLoading: isLoadingProducts } = useProducts(activeCategory);
  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      {isLoadingCategories ? (
        <div className="bg-white/95 backdrop-blur-sm sticky top-16 z-30 py-4 border-b border-orange-200">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto space-x-4 pb-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-10 w-28 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <CategoryFilter 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          categories={categories || []}
        />
      )}
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <DailyDeal />
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            ✨ Produtos em Destaque
          </h2>
          <p className="text-gray-600">
            Os melhores achados com preços imperdíveis
          </p>
        </div>

        {isLoadingProducts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <Skeleton className="w-full h-48" />
                <div className="p-6">
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-8 w-32 mb-4" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!isLoadingProducts && products?.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-500">
              Tente selecionar uma categoria diferente
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
