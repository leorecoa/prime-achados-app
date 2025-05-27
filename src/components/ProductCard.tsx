
import { ExternalLink, Star } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  discountPrice: number;
  discount: number;
  rating: number;
  category: string;
  affiliateLink: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const handleClick = () => {
    window.open(product.affiliateLink, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          -{product.discount}%
        </div>
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full flex items-center space-x-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs">{product.rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl font-bold text-orange-600">
            R$ {product.discountPrice.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500 line-through">
            R$ {product.originalPrice.toFixed(2)}
          </span>
        </div>
        
        <button
          onClick={handleClick}
          className="w-full bg-gradient-orange text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group"
        >
          <span>Ver Oferta</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
