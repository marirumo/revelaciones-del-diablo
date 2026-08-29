import { useState, useEffect } from 'react';
import { HomeScreen } from '../screens/HomeScreen';
import { LibraryScreen } from '../screens/LibraryScreen';
import { IndexScreen } from '../screens/IndexScreen';
import { CategoriesScreen } from '../screens/CategoriesScreen';
import { CategoryDetailScreen } from '../screens/CategoryDetailScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { StatsScreen } from '../screens/StatsScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { AppHeader } from './AppHeader';
import { getLanguage, getFirstVisitDayIndex, getStreak, getHasSeenWelcome, setHasSeenWelcome } from '../lib/storage';
import { getRevelationIdFromHash } from '../lib/deepLink';
import { allRevelations } from '../data/revelations';

export const AppRouter = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [lang, setLang] = useState('en');
  const [selectedRevelation, setSelectedRevelation] = useState(null);
  const [screenParams, setScreenParams] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [dayIndex, setDayIndex] = useState(0);
  const [streak, setStreak] = useState(1);

  // Cargar idioma, día de "primera visita" y estado de bienvenida al montar
  useEffect(() => {
    const loadInitialState = async () => {
      const [savedLang, firstVisitDayIndex, currentStreak, hasSeenWelcome] = await Promise.all([
        getLanguage(),
        getFirstVisitDayIndex(),
        getStreak(),
        getHasSeenWelcome(),
      ]);
      setLang(savedLang || 'en');
      setDayIndex(firstVisitDayIndex);
      setStreak(currentStreak);
      setShowWelcome(!hasSeenWelcome);

      // Deep link (#r/id) desde una tarjeta compartida: abrir esa
      // revelación directo en Hoy en vez del "today" calculado.
      const sharedId = getRevelationIdFromHash();
      if (sharedId) {
        const shared = allRevelations.find(r => String(r.id) === sharedId);
        if (shared) {
          setSelectedRevelation(shared);
          setCurrentScreen('home');
        }
      }

      setIsLoading(false);
    };
    loadInitialState();
  }, []);

  const navigate = (screen, params = {}) => {
    setCurrentScreen(screen);
    setScreenParams(params);
    window.scrollTo(0, 0);
  };

  const handleSelectRevelation = (revelation) => {
    setSelectedRevelation(revelation);
    setCurrentScreen('home');
    window.scrollTo(0, 0);
  };

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
  };

  const handleWelcomeComplete = async () => {
    await setHasSeenWelcome();
    setShowWelcome(false);
  };

  const renderScreen = () => {
    const commonProps = {
      lang,
      onNavigate: navigate,
      onLanguageChange: handleLanguageChange,
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
          />
        );
      case 'library':
        return (
          <LibraryScreen
            {...commonProps}
            onSelectRevelation={handleSelectRevelation}
          />
        );
      case 'index':
        return (
          <IndexScreen
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
          />
        );
      case 'stats':
        return <StatsScreen {...commonProps} />;
      case 'about':
        return <AboutScreen {...commonProps} />;
      default:
        return <HomeScreen {...commonProps} onSelectRevelation={handleSelectRevelation} />;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-paper flex items-center justify-center">
        <p className="font-nameplate text-[11px] tracking-widest uppercase text-sub">
          {lang === 'es' ? 'Imprimiendo la edición de hoy…' : "Printing today's edition…"}
        </p>
      </div>
    );
  }

  if (showWelcome) {
    return (
      <WelcomeScreen lang={lang} onComplete={handleWelcomeComplete} />
    );
  }

  return (
    <div className="w-full min-h-screen bg-paper">
      <AppHeader
        currentScreen={currentScreen}
        onNavigate={navigate}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        streak={streak}
      />
      {renderScreen()}
    </div>
  );
};
