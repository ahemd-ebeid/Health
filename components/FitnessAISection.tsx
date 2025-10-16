import React, { useState } from 'react';
import { useLanguage } from '../App';
import type { FitnessTip } from '../types';
import { generateFitnessTips } from '../services/geminiService';
import { Dumbbell, Sparkles } from './Icons';

const FitnessAISection: React.FC = () => {
  const { language, t } = useLanguage();
  const [tips, setTips] = useState<FitnessTip[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetTips = async () => {
    setIsLoading(true);
    setError(null);
    setTips([]);
    try {
      const generatedTips = await generateFitnessTips(language);
      setTips(generatedTips);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-green-50/50 dark:bg-gray-800/30 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <Sparkles className="w-12 h-12 text-green-500 dark:text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 dark:text-green-200 mb-4">{t('fitnessAITitle')}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{t('fitnessAIDescription')}</p>
          <button
            onClick={handleGetTips}
            disabled={isLoading}
            className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-transform duration-300 transform hover:scale-105 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {isLoading ? t('generatingTips') : t('getFitnessTipsButton')}
          </button>
        </div>

        {error && <p className="text-center text-red-500 dark:text-red-400 mt-8">{error}</p>}

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            ))}
          {tips.map((tip, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-green-500">
              <div className="flex items-start gap-4">
                <Dumbbell className="w-6 h-6 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">{tip.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{tip.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FitnessAISection;