import { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Input } from './ui/input';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-orange-600">
              Prime<span className="text-gray-900">Achados</span>
            </a>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar ofertas..."
                className="pl-10 pr-4 py-2 rounded-full border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200 w-full"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link to="/sobre">
              <Button variant="ghost" className="flex items-center space-x-2">
                <span>Sobre</span>
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="relative w-full mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar ofertas..."
                className="pl-10 pr-4 py-2 rounded-full border-gray-200 focus:border-orange-500 focus:ring focus:ring-orange-200 w-full"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Link to="/sobre">
                <Button variant="ghost" className="flex items-center justify-start w-full">
                  <span>Sobre</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;