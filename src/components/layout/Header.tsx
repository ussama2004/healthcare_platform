import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Menu, X, Bell, LogOut, User, Moon, Sun, Languages } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { authState, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  
  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  const handleLanguageChange = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Heart className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            <span className="mr-2 text-xl font-bold text-gray-900 dark:text-white">
              {t('home.hero.title')}
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            <button
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button
              onClick={handleLanguageChange}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Languages className="h-5 w-5 mr-1" />
              <span>{language === 'ar' ? 'English' : 'العربية'}</span>
            </button>
            
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md">
              {t('common.home')}
            </Link>
            <Link to="/services" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md">
              {t('common.services')}
            </Link>
            <Link to="/nurses" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md">
              {t('common.nurses')}
            </Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md">
              {t('common.about')}
            </Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md">
              {t('common.contact')}
            </Link>
          </nav>
          
          {/* User Menu or Auth Buttons */}
          {authState.isAuthenticated ? (
            <div className="flex items-center space-x-4 space-x-reverse">
              {/* Notifications */}
              <button className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 left-0 bg-error-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                  3
                </span>
              </button>
              
              {/* Profile */}
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 space-x-reverse focus:outline-none"
                  onClick={toggleProfile}
                >
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                    {authState.user?.profileImage ? (
                      <img 
                        src={authState.user.profileImage} 
                        alt={authState.user.name} 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-primary-600 dark:text-primary-400 font-bold">
                        {authState.user?.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <span className="hidden md:block text-gray-700 dark:text-gray-300">
                    {authState.user?.name}
                  </span>
                </button>
                
                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="h-4 w-4 ml-2" />
                        {t('common.profile')}
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-right px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                      >
                        <LogOut className="h-4 w-4 ml-2" />
                        {t('common.logout')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4 space-x-reverse">
              <Link 
                to="/auth" 
                className="px-4 py-2 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium"
              >
                {t('common.login')}
              </Link>
              <Link 
                to="/auth" 
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors"
              >
                {t('common.signup')}
              </Link>
            </div>
          )}
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-2">
              <div className="flex justify-between items-center px-3 py-2">
                <button
                  onClick={toggleTheme}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                
                <button
                  onClick={handleLanguageChange}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 flex items-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Languages className="h-5 w-5 mr-1" />
                  <span>{language === 'ar' ? 'English' : 'العربية'}</span>
                </button>
              </div>
              
              <Link 
                to="/" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common.home')}
              </Link>
              <Link 
                to="/services" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common.services')}
              </Link>
              <Link 
                to="/nurses" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common.nurses')}
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common.about')}
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('common.contact')}
              </Link>
              
              {!authState.isAuthenticated && (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700 mt-2">
                  <Link 
                    to="/auth" 
                    className="px-3 py-2 text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('common.login')}
                  </Link>
                  <Link 
                    to="/auth" 
                    className="px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('common.signup')}
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;