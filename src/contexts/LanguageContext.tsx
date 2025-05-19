import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../locales/en';
import arTranslations from '../locales/ar';

type Language = 'en' | 'ar';

interface Translations {
  [key: string]: string | Translations;
}

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translations: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if user has a language preference in localStorage or browser language
  const getInitialLanguage = (): Language => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    
    if (savedLanguage) {
      return savedLanguage;
    }
    
    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'ar' ? 'ar' : 'en';
  };
  
  const [currentLanguage, setCurrentLanguage] = useState<Language>(getInitialLanguage);
  const [translations, setTranslations] = useState<Translations>(
    currentLanguage === 'ar' ? arTranslations : enTranslations
  );
  
  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('language', currentLanguage);
    
    // Set document language and direction
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    
    // Update translations
    setTranslations(currentLanguage === 'ar' ? arTranslations : enTranslations);
  }, [currentLanguage]);
  
  const changeLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };
  
  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };
  
  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};