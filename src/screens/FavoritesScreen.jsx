import { useState, useEffect } from 'react';
import { getAllFavorites } from '../lib/storage';
import { categoryName } from '../data/revelations';

export const FavoritesScreen = ({ lang = 'en', onSelectRevelation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        const fav = await getAllFavorites();
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
  };

  const getTimeSince = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (lang === 'es') {
      if (seconds < 60) return 'hace poco';
      if (seconds < 3600) return `hace ${Math.floor(seconds / 60)} min`;
      if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)}h`;
      if (seconds < 2592000) return `hace ${Math.floor(seconds / 86400)}d`;
      return date.toLocaleDateString('es-MX');
    }
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString('en-US');
  };

  return (
    <div className="w-full min-h-screen bg-paper pb-20 pt-28">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <div className="flex items-baseline justify-between border-t-[3px] border-b border-ink pt-5 pb-4 mb-5">
          <h1 className="font-nameplate font-semibold text-xl tracking-tight uppercase text-ink">
            {lang === 'es' ? 'Mis Cargos' : 'My Cynicism'}
          </h1>
          <span className="font-nameplate text-[11px] text-sub tracking-wider">
            {favorites.length}
          </span>
        </div>
        <p className="font-serif italic text-sub text-sm mb-8">
          {lang === 'es'
            ? 'Los recortes que decidiste que valían la pena conservar.'
            : "The clippings you decided were worth keeping."}
        </p>

        {loading ? (
          <p className="font-nameplate text-sub text-sm py-12 text-center">
            {lang === 'es' ? 'Cargando…' : 'Loading…'}
          </p>
        ) : favorites.length === 0 ? (
          <div className="py-12 text-center">
            <p className="font-serif italic text-ink mb-2">
              {lang === 'es' ? 'Todavía no has recortado nada.' : "You haven't clipped anything yet."}
            </p>
            <p className="font-nameplate text-[12px] text-sub">
              {lang === 'es' ? 'Guarda las que valga la pena volver a leer.' : 'Save the ones worth reading again.'}
            </p>
          </div>
        ) : (
          <div>
            {favorites.map((favorite) => (
              <button
                key={favorite.id}
                onClick={() => handleFavoriteClick(favorite)}
                className="index-row group items-start"
              >
                <span className="font-nameplate text-[10px] text-sub w-20 flex-none pt-1">
                  {getTimeSince(favorite.savedAt)}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="font-serif font-bold text-lg text-ink group-hover:text-accent transition-smooth block">
                    {lang === 'es' ? favorite.revelation.wordES : favorite.revelation.wordEN}
                  </span>
                  <span className="font-serif italic text-[13px] text-sub block mt-0.5 line-clamp-1">
                    {lang === 'es' ? favorite.revelation.revelationES : favorite.revelation.revelationEN}
                  </span>
                </span>
                <span className="font-nameplate text-[9.5px] tracking-widest uppercase text-sub flex-none pt-1">
                  {categoryName(favorite.category, lang)}
                </span>
              </button>
            ))}
          </div>
        )}

        {favorites.length > 0 && (
          <button className="byline-link mt-8">
            {lang === 'es' ? 'Exportar recortes (JSON)' : 'Export clippings (JSON)'}
          </button>
        )}
      </div>
    </div>
  );
};
