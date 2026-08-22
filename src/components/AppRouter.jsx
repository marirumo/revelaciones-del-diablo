import { useState, useEffect } from 'react';
import { HomeScreen } from '../screens/HomeScreen';
import { LibraryScreen } from '../screens/LibraryScreen';
import { CategoriesScreen } from '../screens/CategoriesScreen';
import { CategoryDetailScreen } from '../screens/CategoryDetailScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { StatsScreen } from '../screens/StatsScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { Sidebar } from './Sidebar';
import { getLanguage, getFirstVisitDayIndex, getStreak } from '../lib/storage';
import { useAuth } from '../lib/useAuth';
import { useSyncFavorites } from '../lib/useSyncFavorites';
import { createUserProfile, updateLastLogin } from '../lib/firestore-sync';

export const AppRouter = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [lang, setLang] = useState('es');
  const [selectedRevelation, setSelectedRevelation] = useState(null);
  const [screenParams, setScreenParams] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [dayIndex, setDayIndex] = useState(0);
  const [streak, setStreak] = useState(1);

  // Firebase Auth
  const { user, loading: authLoading, logout } = useAuth();

  // Sincronización de favoritas
  const { isOnline, isSyncing, lastSyncTime } = useSyncFavorites(user);

  // Cargar idioma y día de "primera visita" al montar
  useEffect(() => {
    const loadInitialState = async () => {
      const [savedLang, firstVisitDayIndex, currentStreak] = await Promise.all([
        getLanguage(),
        getFirstVisitDayIndex(),
        getStreak(),
      ]);
      setLang(savedLang || 'es');
      setDayIndex(firstVisitDayIndex);
      setStreak(currentStreak);
      setIsLoading(false);
    };
    loadInitialState();
  }, []);

  // Crear perfil de usuario cuando se autentica
  useEffect(() => {
    if (user && !authLoading) {
      createUserProfile(user.uid, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      updateLastLogin(user.uid);
    }
  }, [user, authLoading]);

  const navigate = (screen, params = {}) => {
    setCurrentScreen(screen);
    setScreenParams(params);
  };

  const handleSelectRevelation = (revelation) => {
    setSelectedRevelation(revelation);
  };

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
  };

  const handleAuthSuccess = (authenticatedUser) => {
    // El usuario ya está seteado por useAuth, solo cerramos el modal
    setShowAuthPrompt(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('home');
  };

  const renderScreen = () => {
    const commonProps = {
      lang,
      onNavigate: navigate,
      onLanguageChange: handleLanguageChange,
      user,
      isSyncing,
      lastSyncTime,
      isOnline,
      dayIndex,
      streak,
    };

    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            {...commonProps}
            selectedRevelation={selectedRevelation}
            onSelectRevelation={handleSelectRevelation}
            onAuthRequired={() => setShowAuthPrompt(true)}
          />
        );
      case 'library':
        return (
          <LibraryScreen
            {...commonProps}
            onSelectRevelation={handleSelectRevelation}
          />
        );
      case 'categories':
        return <CategoriesScreen {...commonProps} />;
      case 'category-detail':
        return (
          <CategoryDetailScreen
            {...commonProps}
            categoryId={screenParams.categoryId}
            onSelectRevelation={handleSelectRevelation}
          />
        );
      case 'favorites':
        return (
          <FavoritesScreen
            {...commonProps}
            onSelectRevelation={handleSelectRevelation}
            onAuthRequired={() => setShowAuthPrompt(true)}
          />
        );
      case 'stats':
        return (
          <StatsScreen
            {...commonProps}
            onAuthRequired={() => setShowAuthPrompt(true)}
          />
        );
      case 'about':
        return <AboutScreen {...commonProps} />;
      default:
        return <HomeScreen {...commonProps} />;
    }
  };

  // Loading inicial (no bloqueamos en authLoading: la revelación del día
  // debe verse de inmediato aunque Firebase Auth aún esté resolviendo)
  if (isLoading) {
    return (
      <div className="w-full h-screen bg-hell-bg flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce-subtle">😈</div>
          <p className="text-hell-text-secondary">
            {lang === 'es' ? 'Cargando revelaciones...' : 'Loading revelations...'}
          </p>
        </div>
      </div>
    );
  }

  // Auth Modal
  if (showAuthPrompt && !user) {
    return (
      <AuthScreen
        onAuthSuccess={handleAuthSuccess}
        lang={lang}
      />
    );
  }

  return (
    <div className="w-full bg-hell-bg">
      {/* Sidebar de navegación — solo desktop (lg+) */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={navigate}
        lang={lang}
        user={user}
        isOnline={isOnline}
        isSyncing={isSyncing}
        onLogout={handleLogout}
        onAuthRequired={() => setShowAuthPrompt(true)}
      />

      {/* Bottom Tab Navigation — solo mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-hell-bg border-t border-hell-orange-dark max-w-md mx-auto flex justify-start gap-2 overflow-x-auto z-30 px-1">
        <button
          onClick={() => navigate('home')}
          className={`flex-shrink-0 py-3 px-3 text-center font-bold transition-smooth whitespace-nowrap ${
            currentScreen === 'home'
              ? 'text-hell-gold border-b-2 border-hell-gold'
              : 'text-hell-text-secondary hover:text-hell-orange'
          }`}
        >
          😈
        </button>
        <button
          onClick={() => navigate('library')}
          className={`flex-shrink-0 py-3 px-3 text-center font-bold transition-smooth whitespace-nowrap ${
            currentScreen === 'library'
              ? 'text-hell-gold border-b-2 border-hell-gold'
              : 'text-hell-text-secondary hover:text-hell-orange'
          }`}
        >
          📚
        </button>
        <button
          onClick={() => navigate('categories')}
          className={`flex-shrink-0 py-3 px-3 text-center font-bold transition-smooth whitespace-nowrap ${
            currentScreen === 'categories'
              ? 'text-hell-gold border-b-2 border-hell-gold'
              : 'text-hell-text-secondary hover:text-hell-orange'
          }`}
        >
          🔥
        </button>
        <button
          onClick={() => navigate('favorites')}
          className={`flex-shrink-0 py-3 px-3 text-center font-bold transition-smooth whitespace-nowrap ${
            currentScreen === 'favorites'
              ? 'text-hell-gold border-b-2 border-hell-gold'
              : 'text-hell-text-secondary hover:text-hell-orange'
          }`}
          title={!user ? (lang === 'es' ? 'Inicia sesión para guardar' : 'Sign in to save') : ''}
        >
          ❤️
        </button>
        <button
          onClick={() => navigate('stats')}
          className={`flex-shrink-0 py-3 px-3 text-center font-bold transition-smooth whitespace-nowrap ${
            currentScreen === 'stats'
              ? 'text-hell-gold border-b-2 border-hell-gold'
              : 'text-hell-text-secondary hover:text-hell-orange'
          }`}
          title={!user ? (lang === 'es' ? 'Inicia sesión para estadísticas' : 'Sign in for stats') : ''}
        >
          📊
        </button>
        {user ? (
          <button
            onClick={handleLogout}
            className="flex-shrink-0 py-3 px-3 text-center font-bold transition-smooth whitespace-nowrap"
            title={lang === 'es' ? 'Cerrar sesión' : 'Sign out'}
          >
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} className="w-5 h-5 rounded-full inline-block" />
            ) : (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-hell-orange-dark text-hell-gold text-[10px]">
                {(user.displayName || user.email || '?')[0].toUpperCase()}
              </span>
            )}
          </button>
        ) : (
          <button
            onClick={() => setShowAuthPrompt(true)}
            className="flex-shrink-0 py-3 px-3 text-center font-bold transition-smooth whitespace-nowrap text-hell-orange hover:text-hell-orange-dark"
            title={lang === 'es' ? 'Inicia sesión' : 'Sign in'}
          >
            🔐
          </button>
        )}
      </nav>

      {/* Screen Content */}
      <div className="lg:pl-64">
        {renderScreen()}
      </div>
    </div>
  );
};
