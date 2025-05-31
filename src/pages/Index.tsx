import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/components/HomePage';
import AboutPage from '@/components/AboutPage';
import AdminAccessButton from '@/components/AdminAccessButton';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

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

  return (
    <div className="min-h-screen flex flex-col">
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