import { LanguageToggle } from './LanguageToggle';

export const TopNav = ({ title, onBack, rightText, lang, onLanguageChange }) => {
  return (
    <div className="fixed top-0 left-0 right-0 lg:left-64 bg-hell-bg/95 border-b border-hell-orange-dark z-40">
      <div className="max-w-md lg:max-w-3xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between h-14 gap-2">
        {onBack ? (
          <button
            onClick={onBack}
            className="text-hell-orange text-sm font-bold hover:text-hell-orange-dark transition-smooth"
          >
            ← {lang === 'en' ? 'Back' : 'Atrás'}
          </button>
        ) : (
          <div className="w-12" />
        )}

        <h1 className="text-hell-gold font-black text-center flex-1">
          {title}
        </h1>

        <div className="flex items-center gap-2 justify-end">
          {rightText !== undefined && rightText !== null && (
            <div className="text-hell-orange text-sm font-bold">
              {rightText}
            </div>
          )}
          {lang && onLanguageChange && (
            <LanguageToggle currentLang={lang} onLanguageChange={onLanguageChange} />
          )}
        </div>
      </div>
    </div>
  );
};
