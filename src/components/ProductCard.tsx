import { useState } from 'react';
import { ExternalLink, Share2, Star, ShoppingBag } from 'lucide-react';
import { Product } from '@/data/products';
import MobileImageOptimizer from './MobileImageOptimizer';

interface ProductCardProps {
  product: Product;
}

// Mapeamento de categorias em inglês para português
const categoryTranslations: Record<string, string> = {
  'electronics': 'Eletrônicos',
  'home': 'Casa',
  'beauty': 'Beleza',
  'kids': 'Infantil',
  'accessories': 'Acessórios',
};

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
        text: `Confira esta oferta incrível: ${product.name} por apenas ${formatPrice(product.discountPrice)}`,
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

  // Formatar preço em BRL
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Identificar marketplace
  const getMarketplace = (url: string) => {
    if (url.includes('amazon')) return 'Amazon';
    if (url.includes('shopee')) return 'Shopee';
    if (url.includes('mercadolivre')) return 'Mercado Livre';
    if (url.includes('magazineluiza') || url.includes('magalu')) return 'Magalu';
    if (url.includes('americanas')) return 'Americanas';
    return 'Loja Online';
  };

  // Obter ícone do marketplace
  const getMarketplaceIcon = () => {
    const marketplace = getMarketplace(product.affiliateLink);
    
    switch (marketplace) {
      case 'Amazon':
        return <span className="text-xs font-semibold text-[#FF9900]">amazon</span>;
      case 'Shopee':
        return <span className="text-xs font-semibold text-[#EE4D2D]">shopee</span>;
      case 'Mercado Livre':
        return <span className="text-xs font-semibold text-[#FFE600] bg-[#2D3277] px-1 rounded">ML</span>;
      case 'Magalu':
        return <span className="text-xs font-semibold text-[#0086FF]">magalu</span>;
      case 'Americanas':
        return <span className="text-xs font-semibold text-[#E60014]">americanas</span>;
      default:
        return <span className="text-xs font-semibold text-gray-500">loja</span>;
    }
  };

  // Traduzir categoria para português
  const getTranslatedCategory = () => {
    if (!product.category) return '';
    return categoryTranslations[product.category] || product.category;
  };

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
          <MobileImageOptimizer 
            src={`${product.image}?w=800&h=800&fit=crop&format=webp`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        {/* Etiqueta de desconto com efeito de vidro */}
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">
          -{discount}%
        </div>
        
        {/* Marketplace */}
        <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
          {getMarketplaceIcon()}
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
              {formatPrice(product.discountPrice)}
            </div>
            <div className="text-gray-500 text-xs line-through">
              {formatPrice(product.originalPrice)}
            </div>
          </div>
          
          {product.category && (
            <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full border border-orange-100">
              {getTranslatedCategory()}
            </span>
          )}
        </div>
        
        <button 
          className={`w-full bg-gradient-to-r from-orange-600 to-rose-500 text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-1
            transition-all duration-300 ${isHovered ? 'shadow-md shadow-orange-500/20' : ''}`}
        >
          <ShoppingBag className="w-4 h-4 mr-1" />
          <span>Ver Oferta</span>
          <ExternalLink className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;