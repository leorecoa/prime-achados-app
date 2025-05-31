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
      {/* Elementos decorativos flutuantes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/10 animate-float"
            style={{
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>
      
      {/* Logo com efeito de brilho */}
      <div className="relative mb-12 z-10">
        <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl animate-pulse-slow" />
        <div className="relative bg-gradient-to-r from-white to-orange-100 p-6 rounded-full shadow-2xl">
          <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-700 to-orange-900">
            Prime<span className="text-gray-900">Achados</span>
          </div>
        </div>
      </div>
      
      {/* Ícone animado */}
      <div className="mb-8 text-white animate-scale-in">
        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
          {icons[currentIcon]}
        </div>
      </div>
      
      {/* Barra de progresso luxuosa */}
      <div className="w-64 h-3 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-300 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iMjAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')]" />
        </div>
      </div>
      
      {/* Texto de carregamento com efeito de digitação */}
      <p className="mt-6 text-white/90 font-light tracking-wider animate-shimmer bg-clip-text text-transparent bg-[linear-gradient(110deg,#fff,45%,#f0f0f0,55%,#fff)] bg-[length:250%_100%]">
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