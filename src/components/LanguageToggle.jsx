import { useState } from 'react';
import { setLanguage } from '../lib/storage';
import { track } from '../lib/analytics';

export const LanguageToggle = ({ currentLang, onLanguageChange }) => {
  const [isChanging, setIsChanging] = useState(false);

  const handleSelect = async (newLang) => {
    if (newLang === currentLang || isChanging) return;
    setIsChanging(true);
    await setLanguage(newLang);
    track('language_changed', { from: currentLang, to: newLang });
    onLanguageChange(newLang);
    setIsChanging(false);
  };

  return (
    <div className="inline-flex items-center gap-2 font-nameplate text-[12px] tracking-widest" role="group" aria-label="Idioma / Language">
      <button
        onClick={() => handleSelect('es')}
        disabled={isChanging}
        aria-pressed={currentLang === 'es'}
        className={`px-1.5 pb-1 min-h-11 transition-smooth disabled:opacity-50 border-b-2 ${
          currentLang === 'es' ? 'text-ink font-semibold border-accent' : 'text-sub border-transparent hover:text-ink'
        }`}
      >
        ES
      </button>
      <span className="text-sub" aria-hidden="true">/</span>
      <button
        onClick={() => handleSelect('en')}
        disabled={isChanging}
        aria-pressed={currentLang === 'en'}
        className={`px-1.5 pb-1 min-h-11 transition-smooth disabled:opacity-50 border-b-2 ${
          currentLang === 'en' ? 'text-ink font-semibold border-accent' : 'text-sub border-transparent hover:text-ink'
        }`}
      >
        EN
      </button>
    </div>
  );
};
