const NAV_ITEMS = [
  { screen: 'home', icon: '😈', labelES: 'Hoy', labelEN: 'Today' },
  { screen: 'library', icon: '📚', labelES: 'Biblioteca', labelEN: 'Library' },
  { screen: 'categories', icon: '🔥', labelES: 'Categorías', labelEN: 'Categories' },
  { screen: 'favorites', icon: '❤️', labelES: 'Guardadas', labelEN: 'Saved' },
  { screen: 'stats', icon: '📊', labelES: 'Progreso', labelEN: 'Progress' },
  { screen: 'about', icon: 'ℹ️', labelES: 'Acerca de', labelEN: 'About' },
];

export const Sidebar = ({
  currentScreen,
  onNavigate,
  lang,
  user,
  isOnline,
  isSyncing,
  onLogout,
  onAuthRequired,
}) => {
  return (
    <aside className="hidden lg:flex lg:flex-col lg:fixed lg:top-0 lg:left-0 lg:bottom-0 lg:w-64 bg-hell-sidebar border-r border-white/10 z-50">
      <div className="px-6 py-6 flex items-center gap-3">
        <span className="text-2xl">😈</span>
        <div>
          <h1 className="text-hell-gold font-semibold text-sm leading-tight">Revelaciones</h1>
          <p className="text-hell-gold text-sm leading-tight">
            {lang === 'es' ? 'del Diablo' : 'of the Devil'}
          </p>
        </div>
      </div>

      <nav className="flex-1 py-2 overflow-y-auto">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.screen}
            onClick={() => onNavigate(item.screen)}
            className={`w-full flex items-center gap-4 px-6 py-4 text-left font-medium transition-smooth ${
              currentScreen === item.screen
                ? 'bg-hell-active text-hell-bg font-semibold'
                : 'text-hell-gold hover:bg-white/5'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span className="text-sm">{lang === 'es' ? item.labelES : item.labelEN}</span>
          </button>
        ))}
      </nav>

      <div className="px-6 py-4">
        {user ? (
          <div className="px-3">
            <div className="flex items-center gap-3 mb-3">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName} className="w-9 h-9 rounded-full" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-hell-orange-dark flex items-center justify-center text-xs font-bold text-hell-gold">
                  {(user.displayName || user.email || '?')[0].toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs font-bold text-hell-gold truncate">
                  {user.displayName || user.email}
                </p>
                <p className="text-xs text-hell-text-secondary flex items-center gap-1">
                  <span>{isOnline ? '🌐' : '📡'}</span>
                  {isSyncing
                    ? (lang === 'es' ? 'Sincronizando...' : 'Syncing...')
                    : (lang === 'es' ? 'Al día' : 'Up to date')}
                </p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-full text-xs font-bold text-hell-orange border border-hell-orange rounded-lg py-2 hover:bg-hell-orange/10 transition-smooth"
            >
              {lang === 'es' ? 'Cerrar sesión' : 'Sign out'}
            </button>
          </div>
        ) : (
          <button
            onClick={onAuthRequired}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left font-bold text-hell-orange hover:bg-hell-card transition-smooth"
          >
            <span className="text-xl">🔐</span>
            <span>{lang === 'es' ? 'Iniciar sesión' : 'Sign in'}</span>
          </button>
        )}
      </div>
    </aside>
  );
};
