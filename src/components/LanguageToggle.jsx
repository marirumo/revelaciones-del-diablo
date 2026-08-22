import { useState } from 'react';
import { setLanguage } from '../lib/storage';

export const LanguageToggle = ({ currentLang, onLanguageChange }) => {
  const [isChanging, setIsChanging] = useState(false);

  const handleSelect = async (newLang) => {
    if (newLang === currentLang || isChanging) return;
    setIsChanging(true);
    await setLanguage(newLang);
    onLanguageChange(newLang);
    setIsChanging(false);
  };

  return (
    <div className="flex items-center h-full">
      <button
        onClick={() => handleSelect('es')}
        disabled={isChanging}
        className={`h-full px-3 flex items-center justify-center text-sm font-semibold transition-smooth disabled:opacity-50 ${
          currentLang === 'es' ? 'bg-hell-orange-dark text-white' : 'text-hell-gold'
        }`}
      >
        ESP
      </button>
      <button
        onClick={() => handleSelect('en')}
        disabled={isChanging}
        className={`h-full px-3 flex items-center justify-center text-sm font-semibold transition-smooth disabled:opacity-50 ${
          currentLang === 'en' ? 'bg-hell-orange-dark text-white' : 'text-hell-gold'
        }`}
      >
        ENG
      </button>
    </div>
  );
};
