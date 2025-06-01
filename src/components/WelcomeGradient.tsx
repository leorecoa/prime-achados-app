import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WelcomeGradient = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 1.5 }}
      onAnimationComplete={() => setVisible(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-300 to-rose-300">
        {/* Elementos decorativos para criar textura e profundidade */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-white/10 blur-xl"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
      </div>
      <motion.div
        className="relative z-10 text-white text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">Bem-vindo</h1>
        <p className="text-xl opacity-90 drop-shadow-md">Descubra ofertas incríveis hoje</p>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeGradient;