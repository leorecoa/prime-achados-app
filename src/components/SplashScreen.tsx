
import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-orange flex items-center justify-center z-50 animate-fade-in">
      <div className="text-center animate-scale-in">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <img 
              src="/lovable-uploads/29c76486-e58a-4151-8125-0a131064f4a8.png" 
              alt="Achadinhos Prime Logo"
              className="w-32 h-32 object-contain animate-pulse-orange"
            />
            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-white animate-pulse" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
          Achadinhos
        </h1>
        <h2 className="text-2xl md:text-3xl font-light text-white mb-6 tracking-widest">
          PRIME
        </h2>
        
        <p className="text-white/90 text-lg font-light tracking-wide">
          Achou, clicou, levou.
        </p>
        
        <div className="mt-8 flex justify-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
