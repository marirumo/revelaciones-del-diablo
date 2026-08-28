import { useEffect, useState } from 'react';
import { getAllFavorites } from '../lib/storage';
import { allRevelations } from '../data/revelations';

const CATEGORY_LABELS = {
  éxito: { es: 'Éxito', en: 'Success' },
  amor: { es: 'Amor', en: 'Love' },
  dinero: { es: 'Dinero', en: 'Money' },
  poder: { es: 'Poder', en: 'Power' },
  relaciones: { es: 'Relaciones', en: 'Relationships' },
  filosofía: { es: 'Filosofía', en: 'Philosophy' },
  política: { es: 'Política', en: 'Politics' },
  sociedad: { es: 'Sociedad', en: 'Society' },
};

export const StatsScreen = ({ lang = 'en', onNavigate, dayIndex = 0, streak = 1 }) => {
  const unlockedCount = Math.min(dayIndex + 1, allRevelations.length);
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
          lastSaved: lastFav || null,
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

  const getCategoryLabel = (catId) => CATEGORY_LABELS[catId]?.[lang] || catId;

  const topPercent = stats.totalFavorites > 0 && stats.topCategory
    ? Math.round((stats.categoriesCount[stats.topCategory] / stats.totalFavorites) * 100)
    : 0;

  return (
    <div className="w-full min-h-screen bg-paper pb-20 pt-28">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <div className="flex items-baseline justify-between border-t-[3px] border-b border-ink pt-5 pb-4 mb-8">
          <h1 className="font-nameplate font-semibold text-xl tracking-tight uppercase text-ink">
            {lang === 'es' ? 'El Espejo' : 'The Mirror'}
          </h1>
          <span className="font-nameplate text-[11px] text-sub tracking-wider">
            {lang === 'es' ? 'día' : 'day'} {dayIndex + 1} · {lang === 'es' ? 'racha' : 'streak'} {streak}d
          </span>
        </div>

        {loading ? (
          <p className="font-nameplate text-sub text-sm py-12 text-center">
            {lang === 'es' ? 'Cargando…' : 'Loading…'}
          </p>
        ) : stats.totalFavorites === 0 ? (
          <div className="py-12 text-center">
            <p className="font-serif italic text-xl text-ink mb-4 max-w-md mx-auto">
              {lang === 'es'
                ? 'Todavía no hay suficiente evidencia contra ti.'
                : "There's not enough evidence against you yet."}
            </p>
            <button onClick={() => onNavigate('home')} className="byline-link mx-auto">
              {lang === 'es' ? 'Ir a Hoy' : 'Go to Today'}
            </button>
          </div>
        ) : (
          <>
            {/* Veredicto — la observación interpretable que pide el PRD, no un dashboard */}
            <p className="kicker mb-2">
              {lang === 'es' ? 'Perfil de lector' : 'Reader profile'}
            </p>
            <p className="font-display font-black text-[26px] sm:text-[32px] leading-tight text-ink mb-3 max-w-lg">
              {lang === 'es'
                ? `Pareces particularmente escéptico con ${getCategoryLabel(stats.topCategory)}.`
                : `You seem particularly skeptical about ${getCategoryLabel(stats.topCategory)}.`}
            </p>
            <p className="font-nameplate text-[12px] text-sub mb-8">
              {topPercent}% {lang === 'es' ? 'de tus recortes guardados' : 'of your saved clippings'}
              {stats.lastSaved && (
                <> · {lang === 'es' ? 'última:' : 'latest:'} {lang === 'es' ? stats.lastSaved.revelation.wordES : stats.lastSaved.revelation.wordEN}</>
              )}
            </p>

            {/* Desglose — barras planas, sin degradados, sin rounded-full */}
            <div className="border-t border-ink pt-5">
              <p className="font-nameplate text-[10px] tracking-widest uppercase text-sub mb-4">
                {lang === 'es' ? 'Desglose por materia' : 'Breakdown by subject'}
              </p>
              <div className="space-y-3">
                {Object.entries(stats.categoriesCount)
                  .sort((a, b) => b[1] - a[1])
                  .map(([cat, count]) => (
                    <div key={cat} className="flex items-center gap-3">
                      <span className="font-nameplate text-[11px] uppercase text-ink w-24 flex-none truncate">
                        {getCategoryLabel(cat)}
                      </span>
                      <div className="flex-1 h-[3px] bg-ink/10">
                        <div
                          className="h-full bg-ink"
                          style={{ width: `${(count / stats.totalFavorites) * 100}%` }}
                        />
                      </div>
                      <span className="font-nameplate text-[11px] text-sub w-6 text-right flex-none">
                        {count}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Progreso en el corpus */}
            <div className="border-t border-ink mt-8 pt-5 flex items-center justify-between font-nameplate text-[11px] uppercase tracking-wider text-sub">
              <span>{lang === 'es' ? 'Corpus desbloqueado' : 'Corpus unlocked'}</span>
              <span className="text-ink">{unlockedCount} / {allRevelations.length}</span>
            </div>
            <div className="h-[3px] bg-ink/10 mt-2">
              <div
                className="h-full bg-accent"
                style={{ width: `${(unlockedCount / allRevelations.length) * 100}%` }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
