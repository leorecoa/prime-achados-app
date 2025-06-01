import { useEffect, useState } from 'react';

interface MobileImageOptimizerProps {
  src: string;
  alt: string;
  className?: string;
}

const MobileImageOptimizer = ({ src, alt, className = '' }: MobileImageOptimizerProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [optimizedSrc, setOptimizedSrc] = useState(src);

  useEffect(() => {
    // Detectar se é dispositivo móvel
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificar inicialmente
    checkMobile();

    // Adicionar listener para redimensionamento
    window.addEventListener('resize', checkMobile);

    // Limpar listener
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Otimizar URL da imagem para dispositivos móveis
    if (isMobile) {
      // Adicionar parâmetros para imagem mobile (768x400)
      const mobileUrl = src.includes('?') 
        ? src.replace(/w=\d+&h=\d+/, 'w=768&h=400') 
        : `${src}?w=768&h=400&fit=crop&format=webp`;
      
      setOptimizedSrc(mobileUrl);
    } else {
      // Usar URL original para desktop
      setOptimizedSrc(src);
    }
  }, [src, isMobile]);

  return (
    <img 
      src={optimizedSrc} 
      alt={alt} 
      className={className}
      loading="lazy"
    />
  );
};

export default MobileImageOptimizer;