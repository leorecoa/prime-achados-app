
import { Clock, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { dailyDeal, timerConfig } from '../data/dailyDeal';

const DailyDeal = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: timerConfig.hours,
    minutes: timerConfig.minutes,
    seconds: timerConfig.seconds
  });

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
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClick = () => {
    window.open(dailyDeal.affiliateLink, '_blank');
  };

  return (
    <div className="bg-gradient-orange rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
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
            src={dailyDeal.image}
            alt={dailyDeal.name}
            className="w-20 h-20 rounded-xl object-cover"
          />
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{dailyDeal.name}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-orange-600">
                R$ {dailyDeal.discountPrice.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                R$ {dailyDeal.originalPrice.toFixed(2)}
              </span>
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                -{dailyDeal.discount}%
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleClick}
          className="w-full bg-gradient-orange text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <span>🚀 APROVEITAR AGORA</span>
          <ExternalLink className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default DailyDeal;
