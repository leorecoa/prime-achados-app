import { useEffect, useState } from 'react';

const SplashScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 z-50">
      <div className="animate-bounce mb-8">
        <div className="text-5xl font-bold text-orange-600">
          Prime<span className="text-gray-900">Achados</span>
        </div>
      </div>
      
      <div className="w-64 h-2 bg-orange-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-orange transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="mt-4 text-gray-600">Carregando as melhores ofertas...</p>
    </div>
  );
};

export default SplashScreen;