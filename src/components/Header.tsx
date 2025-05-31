import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Header = ({ activeSection, onSectionChange }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Início' },
    { id: 'daily-deal', label: 'Achado do Dia' },
    { id: 'about', label: 'Sobre' },
  ];

  const handleSectionChange = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gradient-orange shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/29c76486-e58a-4151-8125-0a131064f4a8.png" 
              alt="Achadinhos Prime"
              className="w-8 h-8 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-white">Achadinhos</h1>
              <p className="text-xs text-white/80 font-light tracking-wider">PRIME</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`text-white hover:text-orange-200 transition-colors font-medium ${
                  activeSection === item.id ? 'text-orange-200 border-b-2 border-white' : ''
                }`}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button 
              className="text-white hover:text-orange-200 transition-colors"
              type="button"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              className="md:hidden text-white hover:text-orange-200 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`block w-full text-left py-2 text-white hover:text-orange-200 transition-colors font-medium ${
                  activeSection === item.id ? 'text-orange-200' : ''
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