import { useState } from 'react';
import { ExternalLink, Share2 } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  const handleClick = () => {
    window.open(product.affiliateLink, '_blank');
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Confira esta oferta incrível: ${product.name} por apenas R$${product.discountPrice.toFixed(2)}`,
        url: product.affiliateLink,
      }).catch(err => {
        console.error('Erro ao compartilhar:', err);
        setShowShareOptions(true);
      });
    } else {
      setShowShareOptions(!showShareOptions);
    }
  };

  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(product.affiliateLink);
    alert('Link copiado para a área de transferência!');
    setShowShareOptions(false);
  };

  // Calcular desconto
  const discount = Math.round(
    ((product.originalPrice - product.discountPrice) / product.originalPrice) * 100
  );

  return (
    <div 
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 
        ${isHovered ? 'shadow-lg transform translate-y-[-5px]' : ''}
        cursor-pointer relative`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (!showShareOptions) {
          setTimeout(() => setShowShareOptions(false), 300);
        }
      }}
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/400x300?text=Imagem+Indisponível';
          }}
        />
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          -{discount}%
        </div>
        
        <button 
          onClick={handleShare}
          className="absolute top-2 left-2 bg-white/80 hover:bg-white p-1.5 rounded-full transition-colors"
        >
          <Share2 className="w-4 h-4 text-gray-700" />
        </button>
        
        {showShareOptions && (
          <div 
            className="absolute top-10 left-2 bg-white shadow-lg rounded-md p-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={copyToClipboard}
              className="text-sm text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded w-full text-left"
            >
              Copiar link
            </button>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 h-12">{product.name}</h3>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-orange-600 font-bold">
              R$ {product.discountPrice.toFixed(2)}
            </div>
            <div className="text-gray-500 text-xs line-through">
              R$ {product.originalPrice.toFixed(2)}
            </div>
          </div>
          
          {product.category && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {product.category}
            </span>
          )}
        </div>
        
        <button 
          className={`w-full bg-gradient-orange text-white text-sm font-medium py-2 px-4 rounded flex items-center justify-center space-x-1
            transition-all duration-300 ${isHovered ? 'shadow-md' : ''}`}
        >
          <span>Ver Oferta</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;