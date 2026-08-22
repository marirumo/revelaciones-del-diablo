import { useState, useEffect } from 'react';
import { TopNav } from '../components/TopNav';
import { getAllFavorites } from '../lib/storage';
import { categoryName } from '../data/revelations';

export const FavoritesScreen = ({ lang = 'es', onNavigate, onSelectRevelation, onLanguageChange }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        const fav = await getAllFavorites();
        // Sort by most recent first
        fav.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
        setFavorites(fav);
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const handleFavoriteClick = (favorite) => {
    onSelectRevelation(favorite.revelation);
    onNavigate('home');
  };

  const getTimeSince = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (lang === 'es') {
      if (seconds < 60) return 'Hace poco';
      if (seconds < 3600) return `Hace ${Math.floor(seconds / 60)} min`;
      if (seconds < 86400) return `Hace ${Math.floor(seconds / 3600)}h`;
      if (seconds < 2592000) return `Hace ${Math.floor(seconds / 86400)}d`;
      return date.toLocaleDateString('es-MX');
    }
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString('en-US');
  };

  return (
    <div className="w-full min-h-screen bg-hell-bg">
      <TopNav
        title={lang === 'es' ? 'Favoritas' : 'Saved'}
        rightText={favorites.length}
        onBack={() => onNavigate('home')}
        lang={lang}
        onLanguageChange={onLanguageChange}
      />

      <div className="max-w-md lg:max-w-5xl mx-auto px-4 lg:px-8 pt-20 pb-6">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-hell-text-secondary">
              {lang === 'es' ? 'Cargando...' : 'Loading...'}
            </p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-hell-text-secondary mb-4">
              {lang === 'es' ? 'No hay revelaciones guardadas' : 'No saved revelations yet'}
            </p>
            <p className="text-hell-text-muted text-sm">
              {lang === 'es' ? 'Guarda tus favoritas para leerlas después' : 'Save your favorites to read them later'}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-hell-text-secondary mb-4">
              {lang === 'es' ? 'Tus revelaciones guardadas' : 'Your saved revelations'} • {lang === 'es' ? 'Última' : 'Latest'}: {lang === 'es' ? favorites[0].revelation.wordES : favorites[0].revelation.wordEN}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {favorites.map((favorite) => (
                <button
                  key={favorite.id}
                  onClick={() => handleFavoriteClick(favorite)}
                  className="card-hell bg-hell-card/90 border-hell hover:border-hell-orange transition-smooth p-4 text-left"
                >
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-hell-orange font-bold">
                      {getTimeSince(favorite.savedAt)}
                    </p>
                    <span className="text-base">❤️</span>
                  </div>
                  <h3 className="text-lg text-hell-gold-soft font-bold">
                    {lang === 'es' ? favorite.revelation.wordES : favorite.revelation.wordEN}
                  </h3>
                  <p className="text-xs text-hell-text-secondary mt-2">
                    {categoryName(favorite.category, lang)}
                  </p>
                  <p className="text-xs text-hell-text-muted mt-3 leading-relaxed line-clamp-2">
                    {lang === 'es' ? favorite.revelation.revelationES : favorite.revelation.revelationEN}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Export button */}
        {favorites.length > 0 && (
          <button className="w-full mt-8 btn-hell-primary">
            📤 {lang === 'es' ? 'Exportar Colección' : 'Export Collection'}
          </button>
        )}
      </div>
    </div>
  );
};
