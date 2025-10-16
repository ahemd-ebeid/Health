
import React from 'react';
import { useLanguage, useTheme } from '../App';
import { Gender } from '../types';
import { Male, Female } from './Icons';

interface GenderSelectionModalProps {
  onSelect: (gender: Gender) => void;
}

const GenderSelectionModal: React.FC<GenderSelectionModalProps> = ({ onSelect }) => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 bg-gray-900/60 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-[100]">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 text-center transform transition-all animate-fadeIn">
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">{t('selectGenderTitle')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">{t('selectGenderPrompt')}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => onSelect('male')}
            className="flex flex-col items-center justify-center gap-3 w-32 h-32 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 font-bold rounded-xl hover:bg-green-200 dark:hover:bg-green-800/80 transition-all duration-300 transform hover:scale-105"
          >
            <Male className="w-10 h-10" />
            <span>{t('male')}</span>
          </button>
          <button
            onClick={() => onSelect('female')}
            className="flex flex-col items-center justify-center gap-3 w-32 h-32 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 font-bold rounded-xl hover:bg-green-200 dark:hover:bg-green-800/80 transition-all duration-300 transform hover:scale-105"
          >
            <Female className="w-10 h-10" />
            <span>{t('female')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenderSelectionModal;
