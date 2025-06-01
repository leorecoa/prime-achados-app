import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/components/HomePage';
import AboutPage from '@/components/AboutPage';
import AdminAccessButton from '@/components/AdminAccessButton';
import SplashScreen from '@/components/SplashScreen';
import WelcomeGradient from '@/components/WelcomeGradient';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Simular tempo de carregamento para mostrar a splash screen
    const timer = setTimeout(() => {
      setLoading(false);
      setShowWelcome(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'daily-deal':
        // Rolar para a seção do achado do dia
        document.querySelector('#daily-deal')?.scrollIntoView({ behavior: 'smooth' });
        return <HomePage />;
      default:
        return <HomePage />;
    }
  };

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-white">
      {showWelcome && <WelcomeGradient />}
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-grow">
        {renderSection()}
      </main>
      <Footer />
      <AdminAccessButton />
    </div>
  );
};

export default Index;