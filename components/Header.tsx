import React from 'react';
import { useLanguage, useTheme } from '../App';
import { Leaf, Sun, Moon as MoonIcon } from './Icons'; // Renamed Moon to avoid conflict

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Leaf className="w-8 h-8 text-green-600" />
          <h1 className="text-xl md:text-2xl font-bold text-green-800 dark:text-green-300">{t('appName')}</h1>
        </div>
        <div className="flex items-center gap-2">
           <button
            onClick={toggleTheme}
            className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            aria-label={theme === 'light' ? t('toggleThemeDark') : t('toggleThemeLight')}
          >
            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 font-semibold rounded-lg hover:bg-green-200 dark:hover:bg-green-800/60 transition-colors duration-300"
          >
            {t('languageName')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;