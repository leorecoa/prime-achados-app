import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

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
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-300 to-rose-300" />
      
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white/20 backdrop-blur-md p-5 rounded-full mb-4">
          <ShoppingBag className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold mb-2 text-white drop-shadow-lg">Bem-vindo</h1>
        <p className="text-xl text-white/90 drop-shadow-md">Descubra ofertas incríveis hoje</p>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeGradient;