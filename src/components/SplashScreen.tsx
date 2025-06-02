import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Sparkles, TrendingUp } from 'lucide-react';

const SplashScreen = () => {
  const [progress, setProgress] = useState(0);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  // Efeito de partículas
  useEffect(() => {
    if (!particlesRef.current) return;
    
    const particles = particlesRef.current;
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full bg-white/30';
      
      // Tamanho aleatório
      const size = Math.random() * 10 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Posição aleatória
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Animação
      particle.animate(
        [
          { 
            opacity: 0,
            transform: 'translate(0, 0) scale(0)'
          },
          { 
            opacity: 0.8,
            transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1)`
          },
          { 
            opacity: 0,
            transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0)`
          }
        ],
        {
          duration: Math.random() * 3000 + 2000,
          easing: 'ease-out',
          fill: 'forwards'
        }
      );
      
      particles.appendChild(particle);
      
      // Remover partícula após a animação
      setTimeout(() => {
        if (particles.contains(particle)) {
          particles.removeChild(particle);
        }
      }, 5000);
    };
    
    // Criar partículas periodicamente
    const interval = setInterval(createParticle, 200);
    
    return () => clearInterval(interval);
  }, []);

  // Progresso da barra de carregamento
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

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Fundo com gradiente luxuoso */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-rose-500 to-purple-600"></div>
      
      {/* Efeito de partículas */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden"></div>
      
      {/* Conteúdo centralizado */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo com animação - 60% maior */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="relative">
            {/* Halo de luz ampliado */}
            <div className="absolute -inset-10 bg-white/20 rounded-full blur-xl"></div>
            
            {/* Logo ampliada em 60% sem bordas */}
            <div className="relative bg-transparent backdrop-blur-md p-8 rounded-full">
              <div className="w-40 h-40 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/29c76486-e58a-4151-8125-0a131064f4a8.png?w=1080&h=720&fit=contain" 
                  alt="Prime Achados"
                  className="w-32 h-32 object-contain drop-shadow-lg"
                  width="1080"
                  height="720"
                />
              </div>
            </div>
            
            {/* Efeito de brilho */}
            <motion.div 
              className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full blur-md"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>
        </motion.div>
        
        {/* Título com animação */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg flex items-center">
            <Sparkles className="w-6 h-6 mr-2" />
            Prime Achados
            <Sparkles className="w-6 h-6 ml-2" />
          </h1>
          <p className="text-white/80 text-lg">Descubra ofertas exclusivas</p>
        </motion.div>
        
        {/* Ícones animados */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex space-x-8 mb-10"
        >
          <motion.div 
            className="bg-white/10 backdrop-blur-sm p-4 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          >
            <ShoppingBag className="w-8 h-8 text-white" />
          </motion.div>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-sm p-4 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, delay: 0.3, repeat: Infinity, repeatType: "reverse" }}
          >
            <TrendingUp className="w-8 h-8 text-white" />
          </motion.div>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-sm p-4 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, delay: 0.6, repeat: Infinity, repeatType: "reverse" }}
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>
        
        {/* Barra de progresso luxuosa */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="w-64 relative"
        >
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div 
              className="h-full bg-gradient-to-r from-yellow-300 via-orange-400 to-rose-500"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          {/* Efeito de brilho na barra */}
          <motion.div 
            className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{ left: ["-20%", "120%"] }}
            transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.div>
        
        {/* Texto de carregamento */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-white/70 text-sm mt-4"
        >
          Carregando experiência premium...
        </motion.p>
      </div>
    </div>
  );
};

export default SplashScreen;