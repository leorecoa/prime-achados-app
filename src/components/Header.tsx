import { useState, useEffect } from 'react';
import { Search, Menu, X, Heart, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Input } from './ui/input';
import LogoWithText from './LogoWithText';
import { useAuth } from '@/hooks/use-supabase';
import { useToast } from './ui/use-toast';
import AuthDialog from './AuthDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { session, isAuthenticated, signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut.mutateAsync();
      toast({
        title: 'Logout realizado',
        description: 'Você foi desconectado com sucesso.',
      });
    } catch (error: any) {
      toast({
        title: 'Erro ao fazer logout',
        description: error.message || 'Ocorreu um erro ao tentar desconectar.',
        variant: 'destructive',
      });
    }
  };

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
            <LogoWithText size="md" />
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
            <Button variant="ghost" className="flex items-center space-x-2">
              <Heart className="w-5 h-5" />
              <span>Favoritos</span>
            </Button>
            
            <Link to="/links-afiliados">
              <Button variant="ghost" className="flex items-center space-x-2">
                <span>Links Afiliados</span>
              </Button>
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Minha Conta</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {session?.user?.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <AuthDialog>
                <Button variant="default" className="bg-gradient-orange">
                  Entrar
                </Button>
              </AuthDialog>
            )}
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
              <Button variant="ghost" className="flex items-center justify-start space-x-2">
                <Heart className="w-5 h-5" />
                <span>Favoritos</span>
              </Button>
              
              <Link to="/links-afiliados">
                <Button variant="ghost" className="flex items-center justify-start w-full">
                  <span>Links Afiliados</span>
                </Button>
              </Link>

              {isAuthenticated ? (
                <>
                  <Button variant="ghost" className="flex items-center justify-start space-x-2">
                    <User className="w-5 h-5" />
                    <span>Minha Conta</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center justify-start space-x-2"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sair</span>
                  </Button>
                </>
              ) : (
                <AuthDialog>
                  <Button variant="default" className="bg-gradient-orange w-full">
                    Entrar
                  </Button>
                </AuthDialog>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;