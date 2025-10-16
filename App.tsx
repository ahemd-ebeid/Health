import React, { useState, useMemo, useEffect, createContext, useContext } from 'react';
import type { Language, Theme, Gender } from './types';
import { translations } from './constants/localization';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import TipsSection from './components/TipsSection';
import FitnessAISection from './components/FitnessAISection';
import MealPlannerSection from './components/MealPlannerSection';
import Chatbot from './components/ChatbotSection';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';
import GenderSelectionModal from './components/GenderSelectionModal';
import { BotMessageSquare } from './components/Icons';

// Language Context
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}
export const LanguageContext = createContext<LanguageContextType | null>(null);
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

// Theme Context
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
export const ThemeContext = createContext<ThemeContextType | null>(null);
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

// Gender Context
interface GenderContextType {
  gender: Gender | null;
}
export const GenderContext = createContext<GenderContextType | null>(null);
export const useGender = () => {
  const context = useContext(GenderContext);
  if (!context) throw new Error('useGender must be used within a GenderProvider');
  return context;
}

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [gender, setGender] = useState<Gender | null>(null);
  const [isGenderModalOpen, setIsGenderModalOpen] = useState(false);
  
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'light';
  });

  useEffect(() => {
    const savedGender = localStorage.getItem('gender') as Gender;
    if (savedGender) {
      setGender(savedGender);
    } else {
      setIsGenderModalOpen(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.style.fontFamily = language === 'ar' ? "'Tajawal', sans-serif" : "'Inter', sans-serif";
  }, [language]);
  
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleGenderSelect = (selectedGender: Gender) => {
    setGender(selectedGender);
    localStorage.setItem('gender', selectedGender);
    setIsGenderModalOpen(false);
  }

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key] || translations.en[key];
  };

  const languageContextValue = useMemo(() => ({ language, setLanguage, t }), [language]);
  const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);
  const genderContextValue = useMemo(() => ({ gender }), [gender]);

  return (
    <LanguageContext.Provider value={languageContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <GenderContext.Provider value={genderContextValue}>
        <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen transition-colors duration-300">
          <Header />
          <main>
            <HeroSection />
            <TipsSection />
            <FitnessAISection />
            <MealPlannerSection />
            <GallerySection />
          </main>
          <Footer />

          {isGenderModalOpen && <GenderSelectionModal onSelect={handleGenderSelect} />}

          <button
            onClick={() => setIsChatOpen(true)}
            className={`fixed bottom-6 ${language === 'ar' ? 'left-6' : 'right-6'} bg-green-600 text-white px-6 py-4 rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transform hover:scale-105 transition-all duration-300 z-40 flex items-center gap-3 ${isChatOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}
            aria-label={t('openChatbot')}
          >
            <BotMessageSquare className="w-7 h-7" />
            <span className="font-semibold text-lg">{t('chatbotTriggerText')}</span>
          </button>

          <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

        </div>
        </GenderContext.Provider>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
};

export default App;