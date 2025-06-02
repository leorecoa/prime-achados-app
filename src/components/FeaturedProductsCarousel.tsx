import { useState, useEffect, useRef } from 'react';
import { Product } from '@/data/products';
import { ChevronLeft, ChevronRight, Star, TrendingUp, ShoppingBag } from 'lucide-react';
import MobileImageOptimizer from './MobileImageOptimizer';

interface FeaturedProductsCarouselProps {
  products: Product[];
  isLoading: boolean;
}

const FeaturedProductsCarousel = ({ products, isLoading }: FeaturedProductsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const totalSlides = products.length;

  // Avançar para o próximo slide
  const nextSlide = () => {
    if (isAnimating || products.length <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Voltar para o slide anterior
  const prevSlide = () => {
    if (isAnimating || products.length <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Ir para um slide específico
  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Autoplay
  useEffect(() => {
    if (products.length <= 1) return;
    
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [products.length, currentIndex, isAnimating]);

  // Pausar autoplay ao passar o mouse
  const handleMouseEnter = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  // Retomar autoplay ao remover o mouse
  const handleMouseLeave = () => {
    if (!autoPlayRef.current && products.length > 1) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
  };

  // Calcular desconto
  const calculateDiscount = (originalPrice: number, discountPrice: number) => {
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
  };

  // Formatar preço em BRL
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  // Abrir link do produto
  const handleProductClick = (product: Product) => {
    window.open(product.affiliateLink, '_blank');
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

  if (isLoading) {
    return (
      <div className="relative w-full aspect-[16/9] bg-gray-100 rounded-2xl animate-pulse overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-400 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div 
      className="relative w-full overflow-hidden rounded-2xl shadow-xl bg-gradient-to-r from-orange-600 to-rose-500 aspect-[16/9]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Título da seção */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="w-6 h-6 text-white mr-2" />
            <h2 className="text-2xl font-bold text-white">Ofertas Imperdíveis</h2>
          </div>
          <div className="flex items-center space-x-1">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-white scale-110' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Carrossel */}
      <div 
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {products.map((product, index) => (
          <div 
            key={product.id}
            className="min-w-full h-full relative cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            {/* Imagem de fundo com overlay gradiente */}
            <div className="absolute inset-0">
              <MobileImageOptimizer 
                src={`${product.image}?w=1200&h=675&fit=crop&format=webp`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            </div>

            {/* Conteúdo do slide */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center mb-2">
                    <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full mr-2">
                      -{calculateDiscount(product.originalPrice, product.discountPrice)}%
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Star className="w-4 h-4 text-yellow-400/50" />
                    </div>
                    <span className="ml-2 text-xs bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      {getMarketplace(product.affiliateLink)}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-md">{product.name}</h3>
                  <p className="text-white/80 line-clamp-2 max-w-2xl">{product.description}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <div className="text-sm text-white/70 line-through">
                    {formatPrice(product.originalPrice)}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold">
                    {formatPrice(product.discountPrice)}
                  </div>
                  <button className="mt-2 bg-white text-orange-600 font-bold py-2 px-4 rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Ver Oferta
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botões de navegação */}
      {products.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors z-10"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors z-10"
            aria-label="Próximo slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
};

export default FeaturedProductsCarousel;