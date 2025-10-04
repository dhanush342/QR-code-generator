import { Shield, Activity, Zap, Sun, Moon, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
}

export function Header({ activeTab, onTabChange, isDarkMode = true, onThemeToggle }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const tabs = [
    { id: 'generator', label: 'Generator', icon: Zap },
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode 
      ? 'bg-gray-900/95 border-cyan-500/20' 
      : 'bg-white/95 border-gray-200'} backdrop-blur-sm border-b transition-colors duration-300`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <div className="w-5 h-5 bg-white rounded-sm"></div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-pink-400 to-red-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                NextGen QR
              </h1>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Advanced Security System
              </p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex items-center space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? isDarkMode 
                          ? 'bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/10'
                          : 'bg-cyan-500/10 text-cyan-600 shadow-lg shadow-cyan-500/5'
                        : isDarkMode
                          ? 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
            
            {/* Theme toggle */}
            {onThemeToggle && (
              <button
                onClick={onThemeToggle}
                className={`p-2 rounded-full ${
                  isDarkMode 
                    ? 'bg-gray-800 text-gray-400 hover:text-white' 
                    : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-lg text-gray-400"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fadeIn">
            <nav className="flex flex-col space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onTabChange(tab.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === tab.id
                        ? isDarkMode 
                          ? 'bg-cyan-500/20 text-cyan-400' 
                          : 'bg-cyan-500/10 text-cyan-600'
                        : isDarkMode
                          ? 'text-gray-400' 
                          : 'text-gray-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
              
              {/* Theme toggle in mobile menu */}
              {onThemeToggle && (
                <button
                  onClick={onThemeToggle}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {isDarkMode ? (
                    <>
                      <Sun className="w-5 h-5" />
                      <span className="font-medium">Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5" />
                      <span className="font-medium">Dark Mode</span>
                    </>
                  )}
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}