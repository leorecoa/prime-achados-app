import { useState } from 'react';
import { ExternalLink, Share2, Star } from 'lucide-react';
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
        ${isHovered ? 'shadow-xl transform translate-y-[-5px]' : ''}
        cursor-pointer relative group`}
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
        {/* Efeito de brilho no canto */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 bg-orange-500/20 rounded-full blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
        
        {/* Imagem quadrada 1:1 */}
        <div className="aspect-square overflow-hidden">
          <img 
            src={`${product.image}?w=800&h=800&fit=crop&format=webp`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/800x800?text=Imagem+Indisponível';
            }}
            width="800"
            height="800"
            loading="lazy"
          />
        </div>
        
        {/* Etiqueta de desconto com efeito de vidro */}
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">
          -{discount}%
        </div>
        
        <button 
          onClick={handleShare}
          className="absolute top-2 left-2 bg-white/80 hover:bg-white backdrop-blur-sm p-1.5 rounded-full transition-colors"
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
        {/* Avaliação com estrelas */}
        <div className="flex items-center mb-2">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <Star className="w-3 h-3 text-yellow-400/30" />
          <span className="text-xs text-gray-500 ml-1">4.0</span>
        </div>
        
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
            <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full border border-orange-100">
              {product.category}
            </span>
          )}
        </div>
        
        <button 
          className={`w-full bg-gradient-to-r from-orange-600 to-rose-500 text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-1
            transition-all duration-300 ${isHovered ? 'shadow-md shadow-orange-500/20' : ''}`}
        >
          <span>Ver Oferta</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;