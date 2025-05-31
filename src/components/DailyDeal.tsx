import { Clock, ExternalLink, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Skeleton } from './ui/skeleton';
import { dailyDeal as fallbackDeal } from '../data/dailyDeal';

const DailyDeal = () => {
  const [deal, setDeal] = useState(fallbackDeal);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  // Carregar dados do achado do dia
  useEffect(() => {
    const loadDailyDeal = async () => {
      try {
        // Primeiro tenta carregar do localStorage
        const storedDeal = localStorage.getItem('admin_daily_deal');
        if (storedDeal) {
          setDeal(JSON.parse(storedDeal));
        } else {
          // Se não houver no localStorage, usa o fallback
          setDeal(fallbackDeal);
        }
      } catch (error) {
        console.error('Erro ao carregar achado do dia:', error);
        setDeal(fallbackDeal);
      } finally {
        setIsLoading(false);
      }
    };

    loadDailyDeal();
  }, []);

  // Efeito de pulsação periódica
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1000);
    }, 5000);
    
    return () => clearInterval(pulseInterval);
  }, []);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 }; // Reset timer
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleClick = () => {
    window.open(deal.affiliateLink, '_blank');
  };

  // Calcular desconto
  const discount = Math.round(((deal.originalPrice - deal.discountPrice) / deal.originalPrice) * 100);

  if (isLoading) {
    return (
      <div className="bg-gradient-orange rounded-3xl p-8 text-white shadow-2xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">🔥 ACHADO DO DIA</h2>
          <p className="text-orange-100">Oferta imperdível por tempo limitado!</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Clock className="w-6 h-6" />
            <span className="text-lg font-semibold">Termina em:</span>
          </div>
          
          <div className="flex justify-center space-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <Skeleton className="bg-white/20 rounded-lg px-3 py-2 min-w-[60px] h-16" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 text-gray-900">
          <div className="flex items-center space-x-4 mb-4">
            <Skeleton className="w-20 h-20 rounded-xl" />
            <div className="flex-1">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-8 w-1/2" />
            </div>
          </div>

          <Skeleton className="h-14 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`bg-gradient-orange rounded-3xl p-8 text-white shadow-2xl 
        ${isPulsing ? 'animate-pulse-orange' : ''} 
        transform transition-all duration-500 
        ${isHovered ? 'scale-105 shadow-orange-500/50 shadow-xl' : ''}
        hover:shadow-orange-500/50 hover:shadow-xl relative overflow-hidden`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Efeito de brilho no canto */}
      <div className={`absolute -top-10 -right-10 w-20 h-20 bg-white/30 rounded-full blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
      
      {/* Título com animação */}
      <div className="text-center mb-6 relative">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center">
          <span className={`mr-2 ${isPulsing ? 'animate-bounce' : ''}`}>🔥</span> 
          ACHADO DO DIA
          <Sparkles className={`w-6 h-6 ml-2 ${isPulsing ? 'animate-spin' : ''}`} />
        </h2>
        <p className="text-orange-100">Oferta imperdível por tempo limitado!</p>
      </div>

      {/* Timer com animação */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 transform transition-all duration-300">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Clock className={`w-6 h-6 ${isPulsing ? 'animate-pulse' : ''}`} />
          <span className="text-lg font-semibold">Termina em:</span>
        </div>
        
        <div className="flex justify-center space-x-4">
          <div className="text-center">
            <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[60px] transform transition-all duration-300 hover:scale-110 hover:bg-white/30">
              <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="text-xs opacity-90">HORAS</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[60px] transform transition-all duration-300 hover:scale-110 hover:bg-white/30">
              <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="text-xs opacity-90">MIN</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[60px] transform transition-all duration-300 hover:scale-110 hover:bg-white/30">
              <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              <div className="text-xs opacity-90">SEG</div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo do produto com animação */}
      <div className={`bg-white rounded-2xl p-6 text-gray-900 transition-all duration-500 ${isHovered ? 'shadow-lg' : ''}`}>
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={deal.image}
            alt={deal.name}
            className={`w-20 h-20 rounded-xl object-cover transition-all duration-500 ${isHovered ? 'scale-110' : ''}`}
          />
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{deal.name}</h3>
            <div className="flex items-center space-x-2">
              <span className={`text-2xl font-bold text-orange-600 ${isPulsing ? 'animate-pulse' : ''}`}>
                R$ {deal.discountPrice.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                R$ {deal.originalPrice.toFixed(2)}
              </span>
              <span className={`bg-red-500 text-white px-2 py-1 rounded text-xs font-bold ${isPulsing ? 'animate-bounce' : ''}`}>
                -{discount}%
              </span>
            </div>
          </div>
        </div>

        <div
          className={`w-full bg-gradient-orange text-white font-bold py-4 px-6 rounded-xl 
            flex items-center justify-center space-x-2 
            transition-all duration-300 
            ${isHovered ? 'shadow-lg scale-105' : ''}`}
        >
          <span className={`${isPulsing ? 'animate-pulse' : ''}`}>🚀 APROVEITAR AGORA</span>
          <ExternalLink className={`w-5 h-5 ${isHovered ? 'animate-bounce' : ''}`} />
        </div>
      </div>
    </div>
  );
};

export default DailyDeal;