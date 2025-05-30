import { Clock, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDailyDeal } from '@/hooks/use-supabase';
import { Skeleton } from './ui/skeleton';
import { dailyDeal as fallbackDeal } from '../data/dailyDeal';

const DailyDeal = () => {
  const { data: deal, isLoading } = useDailyDeal();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  // Usar o deal do banco de dados ou o fallback
  const activeDeal = deal || fallbackDeal;

  useEffect(() => {
    // Se temos um deal do banco de dados, calcular o tempo restante
    if (deal?.expires_at) {
      const calculateTimeLeft = () => {
        const expiresAt = new Date(deal.expires_at);
        const now = new Date();
        const diff = expiresAt.getTime() - now.getTime();
        
        if (diff <= 0) {
          return { hours: 0, minutes: 0, seconds: 0 };
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        return { hours, minutes, seconds };
      };
      
      setTimeLeft(calculateTimeLeft());
      
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      
      return () => clearInterval(timer);
    } else {
      // Usar o timer padrão se não temos um deal do banco de dados
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          } else if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          } else if (prev.hours > 0) {
            return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
          }
          return prev;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [deal]);

  const handleClick = () => {
    window.open(activeDeal.affiliateLink, '_blank');
  };

  // Safe access to prices with fallback to 0
  const discountPrice = (activeDeal.discountPrice || 0).toFixed(2);
  const originalPrice = (activeDeal.originalPrice || 0).toFixed(2);

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
      className="bg-gradient-orange rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
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
          <div className="text-center">
            <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[60px]">
              <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="text-xs opacity-90">HORAS</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[60px]">
              <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="text-xs opacity-90">MIN</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white/20 rounded-lg px-3 py-2 min-w-[60px]">
              <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              <div className="text-xs opacity-90">SEG</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 text-gray-900">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={activeDeal.image}
            alt={activeDeal.name}
            className="w-20 h-20 rounded-xl object-cover"
          />
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{activeDeal.name}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-orange-600">
                R$ {discountPrice}
              </span>
              <span className="text-sm text-gray-500 line-through">
                R$ {originalPrice}
              </span>
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                -{activeDeal.discount}%
              </span>
            </div>
          </div>
        </div>

        <div
          className="w-full bg-gradient-orange text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <span>🚀 APROVEITAR AGORA</span>
          <ExternalLink className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default DailyDeal;
