
import { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import ProductCard from './ProductCard';
import DailyDeal from './DailyDeal';

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const products = [
    {
      id: '1',
      name: 'Smartphone Galaxy Premium 128GB',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
      originalPrice: 1299.99,
      discountPrice: 899.99,
      discount: 31,
      rating: 4.8,
      category: 'electronics',
      affiliateLink: 'https://amzn.to/45eaCUr'
    },
    {
      id: '2',
      name: 'Fone de Ouvido Bluetooth Premium',
      image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500',
      originalPrice: 299.99,
      discountPrice: 179.99,
      discount: 40,
      rating: 4.6,
      category: 'electronics',
      affiliateLink: 'https://amzn.to/45eaCUr'
    },
    {
      id: '3',
      name: 'Cafeteira Elétrica Automática',
      image: 'https://images.unsplash.com/photo-1581269876861-82cce4f6e83b?w=500',
      originalPrice: 249.99,
      discountPrice: 149.99,
      discount: 40,
      rating: 4.7,
      category: 'home',
      affiliateLink: 'https://amzn.to/45eaCUr'
    },
    {
      id: '4',
      name: 'Kit Skincare Completo',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500',
      originalPrice: 199.99,
      discountPrice: 119.99,
      discount: 40,
      rating: 4.9,
      category: 'beauty',
      affiliateLink: 'https://amzn.to/45eaCUr'
    },
    {
      id: '5',
      name: 'Brinquedo Educativo Interativo',
      image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=500',
      originalPrice: 89.99,
      discountPrice: 59.99,
      discount: 33,
      rating: 4.8,
      category: 'kids',
      affiliateLink: 'https://amzn.to/45eaCUr'
    },
    {
      id: '6',
      name: 'Smart Watch Fitness',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
      originalPrice: 399.99,
      discountPrice: 249.99,
      discount: 38,
      rating: 4.5,
      category: 'electronics',
      affiliateLink: 'https://amzn.to/45eaCUr'
    }
  ];

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
