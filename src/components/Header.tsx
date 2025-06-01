import { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Header = ({ activeSection, onSectionChange }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Início' },
    { id: 'daily-deal', label: 'Achado do Dia' },
    { id: 'about', label: 'Sobre' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionChange = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-gradient-to-r from-orange-600 to-rose-500 shadow-lg' 
          : 'bg-gradient-to-r from-orange-500 to-rose-400'
      }`}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-cover bg-center opacity-10" 
           style={{backgroundImage: "url('/lovable-uploads/29c76486-e58a-4151-8125-0a131064f4a8.png')"}}></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-rose-500/90"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4 z-10">
            <div className="relative">
              <div className="absolute -inset-1 bg-white/30 rounded-full blur-sm"></div>
              <img 
                src="/lovable-uploads/29c76486-e58a-4151-8125-0a131064f4a8.png" 
                alt="Achadinhos Prime"
                className="w-10 h-10 object-contain relative z-10"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white drop-shadow-sm">Achadinhos</h1>
              <p className="text-xs text-white/90 font-light tracking-wider drop-shadow-sm">PRIME</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8 z-10">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`text-white hover:text-white/80 transition-colors font-medium border-0 bg-transparent ${
                  activeSection === item.id ? 'text-white border-b-2 border-white' : ''
                }`}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4 z-10">
            <button 
              className="text-white hover:text-white/80 transition-colors border-0 bg-transparent"
              type="button"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              className="md:hidden text-white hover:text-white/80 transition-colors border-0 bg-transparent"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 relative z-10">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`block w-full text-left py-2 text-white hover:text-white/80 transition-colors font-medium border-0 bg-transparent ${
                  activeSection === item.id ? 'text-white' : ''
                }`}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;