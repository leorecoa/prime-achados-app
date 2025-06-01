import { useState, useEffect } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Banner } from '@/contexts/AdminContext';

interface PromotionalBannerProps {
  position: 'top' | 'middle' | 'bottom';
}

const PromotionalBanner = ({ position }: PromotionalBannerProps) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isImageError, setIsImageError] = useState(false);

  // Carregar banners do localStorage
  useEffect(() => {
    const loadBanners = () => {
      try {
        const storedBanners = localStorage.getItem('admin_banners');
        if (storedBanners) {
          const allBanners = JSON.parse(storedBanners);
          // Filtrar banners ativos para a posição especificada
          const filteredBanners = allBanners.filter(
            (banner: Banner) => banner.active && banner.position === position
          );
          setBanners(filteredBanners);
        }
      } catch (error) {
        console.error('Erro ao carregar banners:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBanners();

    // Monitorar mudanças no localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin_banners') {
        loadBanners();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Verificar mudanças a cada 10 segundos (fallback para mesma aba)
    const interval = setInterval(loadBanners, 10000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [position]);

  // Rotacionar banners automaticamente se houver mais de um
  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  // Se não houver banners ativos para esta posição, não renderizar nada
  if (isLoading || banners.length === 0) return null;

  const currentBanner = banners[currentBannerIndex];

  const handleBannerClick = () => {
    if (currentBanner.linkUrl.startsWith('http')) {
      window.open(currentBanner.linkUrl, '_blank');
    } else {
      window.location.href = currentBanner.linkUrl;
    }
  };

  const handleImageError = () => {
    setIsImageError(true);
  };

  return (
    <div 
      className="w-full rounded-lg overflow-hidden shadow-md mb-8 cursor-pointer relative group"
      onClick={handleBannerClick}
    >
      {/* Imagem do banner com fallback */}
      <div className="relative aspect-[21/9] md:aspect-[3/1] overflow-hidden">
        {isImageError ? (
          <div className="w-full h-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
            <p className="text-white text-lg font-bold">
              {currentBanner.title}
            </p>
          </div>
        ) : (
          <img
            src={currentBanner.imageUrl}
            alt={currentBanner.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={handleImageError}
            loading="lazy"
          />
        )}
        
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>
      
      {/* Conteúdo do banner */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
        <h3 className="text-xl md:text-2xl font-bold mb-1 drop-shadow-md">
          {currentBanner.title}
        </h3>
        {currentBanner.description && (
          <p className="text-sm md:text-base text-white/90 mb-2 drop-shadow-md line-clamp-2">
            {currentBanner.description}
          </p>
        )}
        <div className="flex items-center text-sm font-medium text-white/80 group-hover:text-white transition-colors">
          <span>Ver mais</span>
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
      
      {/* Indicadores de múltiplos banners */}
      {banners.length > 1 && (
        <div className="absolute bottom-2 right-2 flex space-x-1">
          {banners.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentBannerIndex ? 'bg-white' : 'bg-white/50'
              }`}
            ></div>
          ))}
        </div>
      )}
      
      {/* Ícone de link externo para URLs externas */}
      {currentBanner.linkUrl.startsWith('http') && (
        <div className="absolute top-2 right-2 bg-black/30 p-1 rounded-full">
          <ExternalLink className="w-3 h-3 text-white" />
        </div>
      )}
    </div>
  );
};

export default PromotionalBanner;