
import { Instagram, Facebook, Twitter, Share2, UserPlus } from 'lucide-react';

const Footer = () => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Achadinhos Prime',
        text: 'Encontre os melhores produtos com desconto!',
        url: window.location.href,
      });
    } else {
      // Fallback para desktop
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  const handleRefer = () => {
    alert('Sistema de indicação em breve! 🚀');
  };

  return (
    <footer className="bg-gradient-orange-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/29c76486-e58a-4151-8125-0a131064f4a8.png" 
              alt="Achadinhos Prime"
              className="w-16 h-16 object-contain"
            />
          </div>
          <h3 className="text-2xl font-bold mb-2">Achadinhos Prime</h3>
          <p className="text-orange-200">Achou, clicou, levou.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="text-center">
            <h4 className="font-bold text-lg mb-4">Siga-nos</h4>
            <div className="flex justify-center space-x-4">
              <a href="#" className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="text-center">
            <h4 className="font-bold text-lg mb-4">Compartilhe</h4>
            <button 
              onClick={handleShare}
              className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/30 transition-all duration-300 flex items-center space-x-2 mx-auto group"
            >
              <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Compartilhar App</span>
            </button>
          </div>

          <div className="text-center">
            <h4 className="font-bold text-lg mb-4">Indique</h4>
            <button 
              onClick={handleRefer}
              className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/30 transition-all duration-300 flex items-center space-x-2 mx-auto group"
            >
              <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Indique e Ganhe</span>
            </button>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-white/20">
          <p className="text-orange-200 text-sm">
            © 2024 Achadinhos Prime. Todos os direitos reservados.
          </p>
          <p className="text-orange-300 text-xs mt-2">
            Plataforma independente com links de afiliados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
