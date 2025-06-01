import { Share2, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <footer className="bg-gradient-to-r from-orange-600 to-rose-500 text-white py-12 relative">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-cover bg-center opacity-5" 
           style={{backgroundImage: "url('/lovable-uploads/29c76486-e58a-4151-8125-0a131064f4a8.png')"}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2">Achadinhos Prime</h3>
          <p className="text-orange-100">Achou, clicou, levou.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
          <p className="text-orange-100 text-sm">
            © {new Date().getFullYear()} Achadinhos Prime. Todos os direitos reservados.
          </p>
          <p className="text-orange-200/70 text-xs mt-2">
            Plataforma independente com links de afiliados
          </p>
          <Link to="/admin" className="text-orange-300/30 text-xs mt-4 inline-block hover:text-orange-300/50">
            •
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;