
import { ExternalLink, Heart, Star } from 'lucide-react';
import { Product, useFavorites } from '@/hooks/use-supabase';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { toast } = useToast();
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isProductFavorite = isFavorite(product.id);

  // Add safety checks for price values
  const discountPrice = product.discount_price || 0;
  const originalPrice = product.original_price || 0;
  const discount = product.discount || 0;
  const rating = product.rating || 0;

  const handleClick = () => {
    window.open(product.affiliate_link, '_blank');
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      if (isProductFavorite) {
        await removeFromFavorites.mutateAsync(product.id);
        toast({
          title: "Removido dos favoritos",
          description: `${product.name} foi removido dos seus favoritos.`,
        });
      } else {
        await addToFavorites.mutateAsync(product.id);
        toast({
          title: "Adicionado aos favoritos",
          description: `${product.name} foi adicionado aos seus favoritos.`,
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para favoritar produtos.",
        variant: "destructive"
      });
    }
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
          -{discount}%
        </div>
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full flex items-center space-x-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs">{rating}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={`absolute bottom-4 right-4 rounded-full bg-white/80 hover:bg-white ${
            isProductFavorite ? 'text-red-500' : 'text-gray-500'
          }`}
          onClick={handleFavoriteClick}
        >
          <Heart className={`w-5 h-5 ${isProductFavorite ? 'fill-red-500' : ''}`} />
        </Button>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl font-bold text-orange-600">
            R$ {discountPrice.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500 line-through">
            R$ {originalPrice.toFixed(2)}
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
