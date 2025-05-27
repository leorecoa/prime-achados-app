
import { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import ProductCard from './ProductCard';
import DailyDeal from './DailyDeal';
import { products } from '../data/products';

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <CategoryFilter 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
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
