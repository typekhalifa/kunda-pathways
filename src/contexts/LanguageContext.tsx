
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'EN' | 'RW' | 'FR' | 'KO';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, string>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  EN: {
    home: 'Home',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
    // Add more translations as needed
  },
  RW: {
    home: 'Inzu',
    services: 'Serivisi',
    about: 'Abo',
    contact: 'Twandikire',
    // Add more translations as needed
  },
  FR: {
    home: 'Accueil',
    services: 'Services',
    about: 'À propos',
    contact: 'Contact',
    // Add more translations as needed
  },
  KO: {
    home: '홈',
    services: '서비스',
    about: '소개',
    contact: '연락처',
    // Add more translations as needed
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('EN');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && ['EN', 'RW', 'FR', 'KO'].includes(savedLang)) {
      setCurrentLanguage(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const value = {
    currentLanguage,
    setLanguage,
    translations: translations[currentLanguage],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
