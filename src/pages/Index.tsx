
import { useState } from 'react';
import SplashScreen from '../components/SplashScreen';
import Header from '../components/Header';
import HomePage from '../components/HomePage';
import DailyDeal from '../components/DailyDeal';
import AboutPage from '../components/AboutPage';
import Footer from '../components/Footer';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'daily-deal':
        return (
          <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-12">
            <div className="container mx-auto px-4 max-w-2xl">
              <DailyDeal />
            </div>
          </div>
        );
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <Header 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      <main>
        {renderContent()}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
