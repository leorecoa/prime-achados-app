import { Share2, Instagram } from 'lucide-react';
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
            <h4 className="font-bold text-lg mb-4">Siga-nos</h4>
            <a 
              href="https://www.instagram.com/bazarachadinhosprime/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/30 transition-all duration-300 flex items-center space-x-2 mx-auto group"
            >
              <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>@bazarachadinhosprime</span>
            </a>
          </div>
        </div>
        
        {/* Logos de marketplaces */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
          <h4 className="w-full text-center font-bold text-lg mb-2">Parceiros</h4>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://www.amazon.com.br" target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg p-2 h-12 flex items-center justify-center transition-transform hover:scale-105">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-6" />
            </a>
            
            <a href="https://www.shopee.com.br" target="_blank" rel="noopener noreferrer" className="bg-white rounded-lg p-2 h-12 flex items-center justify-center transition-transform hover:scale-105">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopee_logo.svg/2560px-Shopee_logo.svg.png" alt="Shopee" className="h-6" />
            </a>
            
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-medium">
              Mercado Livre
            </span>
            
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-medium">
              Magalu
            </span>
            
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-white font-medium">
              Americanas
            </span>
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