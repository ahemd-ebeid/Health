import React from 'react';
import { useLanguage } from '../App';
import { Apple, Droplet, Moon } from './Icons';

const TipCard: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
    <div className="flex items-center gap-4 mb-4">
      <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full">{icon}</div>
      <h3 className="text-xl font-bold text-green-800 dark:text-green-300">{title}</h3>
    </div>
    <p className="text-gray-600 dark:text-gray-400">{text}</p>
  </div>
);

const TipsSection: React.FC = () => {
  const { t } = useLanguage();

  const tips = [
    {
      icon: <Apple className="w-6 h-6 text-green-600 dark:text-green-400" />,
      title: t('nutritionTipTitle'),
      text: t('nutritionTipText'),
    },
    {
      icon: <Droplet className="w-6 h-6 text-green-600 dark:text-green-400" />,
      title: t('hydrationTipTitle'),
      text: t('hydrationTipText'),
    },
    {
      icon: <Moon className="w-6 h-6 text-green-600 dark:text-green-400" />,
      title: t('sleepTipTitle'),
      text: t('sleepTipText'),
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-900 dark:text-green-200 mb-12">{t('dailyTipsTitle')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <TipCard key={index} {...tip} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TipsSection;