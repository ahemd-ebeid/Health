import React from 'react';
import { useLanguage } from '../App';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-green-50/50 dark:bg-gray-800/30 py-20 md:py-32 transition-colors duration-300">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-green-900 dark:text-green-200 mb-4 leading-tight">
          {t('heroTitle')}
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
          {t('heroSubtitle')}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 max-w-3xl mx-auto">
          {t('heroDisclaimer')}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;