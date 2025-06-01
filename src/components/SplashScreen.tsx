import { useEffect, useState } from 'react';
import { ShoppingBag, Star, Sparkles, TrendingUp, Gift } from 'lucide-react';

const SplashScreen = () => {
  const [progress, setProgress] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);
  
  const icons = [
    <ShoppingBag key="bag" className="w-8 h-8" />,
    <Star key="star" className="w-8 h-8" />,
    <Sparkles key="sparkles" className="w-8 h-8" />,
    <TrendingUp key="trending" className="w-8 h-8" />,
    <Gift key="gift" className="w-8 h-8" />
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const iconInterval = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(iconInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 z-50">
      {/* Logo com efeito de brilho */}
      <div className="relative mb-12 z-10">
        <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl opacity-60 animate-pulse"></div>
        <div className="relative bg-gradient-to-r from-white to-orange-100 p-6 rounded-full shadow-2xl">
          <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-700 to-orange-900">
            Prime<span className="text-gray-900">Achados</span>
          </div>
        </div>
      </div>
      
      {/* Ícone animado */}
      <div className="mb-8 text-white">
        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
          {icons[currentIcon]}
        </div>
      </div>
      
      {/* Barra de progresso luxuosa */}
      <div className="w-64 h-3 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Texto de carregamento */}
      <p className="mt-6 text-white/90 font-light tracking-wider">
        Descobrindo ofertas exclusivas...
      </p>
      
      {/* Porcentagem de carregamento */}
      <div className="mt-2 text-white/70 text-sm font-mono">
        {progress}%
      </div>
    </div>
  );
};

export default SplashScreen;