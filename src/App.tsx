import { useState, useEffect } from 'react';
import { Header } from './components/Layout/Header';
import { QRGenerator } from './components/Generator/QRGenerator';
import { Dashboard } from './components/Dashboard/Dashboard';
import { SecurityCenter } from './components/Security/SecurityCenter';
import { ArrowLeft, Settings, Info, Moon, Sun } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('generator');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Handle tab changes with animation
  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    setIsTransitioning(true);
    
    // Short delay to allow animation to complete
    setTimeout(() => {
      setActiveTab(tab);
      setIsTransitioning(false);
    }, 300);
  };
  
  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  useEffect(() => {
    // Apply theme to document body
    document.body.classList.toggle('dark-theme', isDarkMode);
    document.body.classList.toggle('light-theme', !isDarkMode);
  }, [isDarkMode]);
  
  const renderContent = () => {
    switch (activeTab) {
      case 'generator':
        return <QRGenerator />;
      case 'dashboard':
        return <Dashboard />;
      case 'security':
        return <SecurityCenter />;
      default:
        return <QRGenerator />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <Header 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        isDarkMode={isDarkMode}
        onThemeToggle={toggleTheme}
      />
      
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'} pt-24`}>
        {renderContent()}
      </div>
      
      {/* Mobile app-like bottom navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-t border-gray-800 py-2 px-4 z-50">
        <div className="flex justify-around items-center">
          {['generator', 'dashboard', 'security'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`p-3 rounded-full ${activeTab === tab ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400'}`}
            >
              {tab === 'generator' && <Settings size={22} />}
              {tab === 'dashboard' && <ArrowLeft size={22} />}
              {tab === 'security' && <Info size={22} />}
            </button>
          ))}
          <button onClick={toggleTheme} className="p-3 rounded-full text-gray-400">
            {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;