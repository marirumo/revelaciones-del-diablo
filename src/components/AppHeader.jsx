import { LanguageToggle } from './LanguageToggle';

const NAV_ITEMS = [
  { screen: 'home', labelES: 'Hoy', labelEN: 'Today' },
  { screen: 'library', labelES: 'Archivo', labelEN: 'Archive' },
  { screen: 'index', labelES: 'Índice', labelEN: 'Index' },
  { screen: 'categories', labelES: 'Vicios', labelEN: 'Vices' },
  { screen: 'favorites', labelES: 'Mis Cargos', labelEN: 'My Cynicism' },
  { screen: 'stats', labelES: 'El Espejo', labelEN: 'Mirror' },
  { screen: 'about', labelES: 'Acerca de', labelEN: 'About' },
];

// Masthead — nameplate row + a heavy rule + a plain-text section row,
// exactly like a newspaper flag sitting above its section index. No
// sidebar, no icons, no pills: just type and rules.
export const AppHeader = ({ currentScreen, onNavigate, lang, onLanguageChange, streak = 1 }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-paper border-t-[3px] border-ink">
      <div className="max-w-5xl mx-auto px-4 lg:px-8 flex items-center justify-between h-11 border-b border-ink">
        <button
          onClick={() => onNavigate('home')}
          className="font-nameplate font-semibold text-[12px] tracking-[.14em] uppercase text-ink"
        >
          {lang === 'es' ? 'Revelaciones del Diablo' : "Devil's Revelations"}
        </button>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline font-nameplate text-[10px] tracking-widest uppercase text-sub">
            {lang === 'es' ? 'racha' : 'streak'} {streak}d
          </span>
          <LanguageToggle currentLang={lang} onLanguageChange={onLanguageChange} />
        </div>
      </div>
      <nav
        aria-label={lang === 'es' ? 'Navegación principal' : 'Main navigation'}
        className="max-w-5xl mx-auto px-4 lg:px-8 flex items-stretch gap-1 overflow-x-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        {NAV_ITEMS.map((item) => {
          const active = currentScreen === item.screen || (item.screen === 'categories' && currentScreen === 'category-detail');
          return (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              aria-current={active ? 'page' : undefined}
              className={`flex-none font-nameplate text-[11px] tracking-wider uppercase px-2.5 min-h-11 border-b-2 transition-smooth whitespace-nowrap ${
                active ? 'border-accent text-ink font-semibold' : 'border-transparent text-sub hover:text-ink'
              }`}
            >
              {lang === 'es' ? item.labelES : item.labelEN}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
