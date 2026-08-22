import { useEffect, useState } from 'react';
import { TopNav } from '../components/TopNav';
import { getAllFavorites } from '../lib/storage';
import { allRevelations } from '../data/revelations';

export const StatsScreen = ({ lang = 'es', onNavigate, onLanguageChange, dayIndex = 0, streak = 1 }) => {
  const unlockedCount = Math.min(dayIndex + 1, allRevelations.length);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalFavorites: 0,
    topCategory: null,
    lastSaved: null,
    categoriesCount: {},
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const fav = await getAllFavorites();
        setFavorites(fav);

        // Calcular estadísticas
        const categoryCount = {};
        let topCat = null;
        let maxCount = 0;

        fav.forEach(f => {
          const cat = f.category;
          categoryCount[cat] = (categoryCount[cat] || 0) + 1;
          if (categoryCount[cat] > maxCount) {
            maxCount = categoryCount[cat];
            topCat = cat;
          }
        });

        const lastFav = fav[fav.length - 1];

        setStats({
          totalFavorites: fav.length,
          topCategory: topCat,
          lastSaved: lastFav ? new Date(lastFav.savedAt) : null,
          categoriesCount: categoryCount,
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const getCategoryLabel = (catId) => {
    const labels = {
      éxito: lang === 'es' ? 'Éxito' : 'Success',
      amor: lang === 'es' ? 'Amor' : 'Love',
      dinero: lang === 'es' ? 'Dinero' : 'Money',
      poder: lang === 'es' ? 'Poder' : 'Power',
      relaciones: lang === 'es' ? 'Relaciones' : 'Relationships',
      filosofía: lang === 'es' ? 'Filosofía' : 'Philosophy',
      política: lang === 'es' ? 'Política' : 'Politics',
      sociedad: lang === 'es' ? 'Sociedad' : 'Society',
    };
    return labels[catId] || catId;
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="w-full min-h-screen bg-hell-bg">
      <TopNav
        title={lang === 'es' ? 'Tu Progreso' : 'Your Progress'}
        onBack={() => onNavigate('home')}
        lang={lang}
        onLanguageChange={onLanguageChange}
      />

      <div className="max-w-md lg:max-w-2xl mx-auto px-4 lg:px-8 pt-20 pb-6">
        {/* Progreso en el Diccionario del Diablo — esto es lo que Guardadas no tiene */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="card-hell bg-hell-card/90 border-hell p-4 text-center hover-lift">
            <p className="text-3xl font-black text-hell-gold">{dayIndex + 1}</p>
            <p className="text-hell-text-secondary text-xs mt-1">
              {lang === 'es' ? 'Día' : 'Day'}
            </p>
          </div>
          <div className="card-hell bg-hell-card/90 border-hell p-4 text-center hover-lift">
            <p className="text-3xl font-black text-hell-gold">🔥{streak}</p>
            <p className="text-hell-text-secondary text-xs mt-1">
              {lang === 'es' ? 'Racha' : 'Streak'}
            </p>
          </div>
          <div className="card-hell bg-hell-card/90 border-hell p-4 text-center hover-lift">
            <p className="text-3xl font-black text-hell-gold">{unlockedCount}</p>
            <p className="text-hell-text-secondary text-xs mt-1">
              / {allRevelations.length}
            </p>
          </div>
        </div>
        <div className="w-full h-2 bg-hell-orange-dark/30 rounded-full overflow-hidden mb-8">
          <div
            className="h-full bg-hell-orange-dark"
            style={{ width: `${(unlockedCount / allRevelations.length) * 100}%` }}
          />
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-hell-text-secondary">
              {lang === 'es' ? 'Cargando...' : 'Loading...'}
            </p>
          </div>
        ) : (
          <>
            {/* Main Stats Cards */}
            <div className="space-y-4 mb-6">
              {/* Total Favorites */}
              <div className="card-hell bg-hell-card/90 border-hell p-6 hover-lift">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-hell-text-secondary text-sm mb-2">
                      {lang === 'es' ? 'Total Guardadas' : 'Total Saved'}
                    </p>
                    <p className="text-4xl font-black text-hell-gold">
                      {stats.totalFavorites}
                    </p>
                  </div>
                  <div className="text-5xl opacity-30">❤️</div>
                </div>
              </div>

              {/* Top Category */}
              {stats.topCategory && (
                <div className="card-hell bg-hell-card/90 border-hell p-6 hover-lift">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-hell-text-secondary text-sm mb-2">
                        {lang === 'es' ? 'Top Categoría' : 'Top Category'}
                      </p>
                      <p className="text-2xl font-bold text-hell-gold-soft">
                        {getCategoryLabel(stats.topCategory)}
                      </p>
                      <p className="text-xs text-hell-text-secondary mt-1">
                        {stats.categoriesCount[stats.topCategory]} {lang === 'es' ? 'revelaciones' : 'revelations'}
                      </p>
                    </div>
                    <div className="text-5xl opacity-30">🔥</div>
                  </div>
                </div>
              )}

              {/* Last Saved */}
              {stats.lastSaved && (
                <div className="card-hell bg-hell-card/90 border-hell p-6 hover-lift">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-hell-text-secondary text-sm mb-2">
                        {lang === 'es' ? 'Última Guardada' : 'Last Saved'}
                      </p>
                      <p className="text-xs text-hell-gold-soft">
                        {formatDate(stats.lastSaved)}
                      </p>
                    </div>
                    <div className="text-5xl opacity-30">⏰</div>
                  </div>
                </div>
              )}
            </div>

            {/* Categories Breakdown */}
            {Object.keys(stats.categoriesCount).length > 0 && (
              <div className="card-hell bg-hell-card/90 border-hell p-6">
                <h3 className="text-hell-gold font-bold text-sm uppercase mb-4">
                  {lang === 'es' ? 'Desglose por Categoría' : 'Breakdown by Category'}
                </h3>

                <div className="space-y-3">
                  {Object.entries(stats.categoriesCount)
                    .sort((a, b) => b[1] - a[1])
                    .map(([cat, count]) => (
                      <div key={cat} className="flex items-center justify-between">
                        <span className="text-hell-gold-soft text-sm">
                          {getCategoryLabel(cat)}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-hell-orange-dark/30 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-hell-orange-dark"
                              style={{
                                width: `${(count / stats.totalFavorites) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-hell-text-secondary text-xs font-bold w-8 text-right">
                            {count}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {stats.totalFavorites === 0 && (
              <div className="text-center py-12">
                <p className="text-hell-text-secondary mb-4">
                  {lang === 'es'
                    ? 'Aún no has guardado revelaciones'
                    : "You haven't saved any revelations yet"}
                </p>
                <button
                  onClick={() => onNavigate('home')}
                  className="btn-hell-primary"
                >
                  {lang === 'es' ? 'Explorar Revelaciones' : 'Explore Revelations'}
                </button>
              </div>
            )}

            {/* Link a Acerca de — en mobile ya no vive en la barra de tabs */}
            <div className="text-center mt-8 lg:hidden">
              <button
                onClick={() => onNavigate('about')}
                className="text-hell-text-secondary text-sm hover:text-hell-orange transition-smooth"
              >
                ℹ️ {lang === 'es' ? 'Acerca de esta app' : 'About this app'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
