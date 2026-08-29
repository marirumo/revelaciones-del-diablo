import { useEffect, useState } from 'react';
import { getAllFavorites } from '../lib/storage';
import { allRevelations, categoryName } from '../data/revelations';

const CATEGORY_LABELS = {
  éxito: { es: '⚡ Éxito', en: '⚡ Success' },
  amor: { es: '💔 Amor', en: '💔 Love' },
  dinero: { es: '💰 Dinero', en: '💰 Money' },
  poder: { es: '👑 Poder', en: '👑 Power' },
  relaciones: { es: '🤝 Relaciones', en: '🤝 Relationships' },
  filosofía: { es: '🧠 Filosofía', en: '🧠 Philosophy' },
  política: { es: '🗳️ Política', en: '🗳️ Politics' },
  sociedad: { es: '🌍 Sociedad', en: '🌍 Society' },
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
            {lang === 'es' ? 'Reflejando tu cinismo…' : 'Reflecting your cynicism…'}
          </p>
        ) : stats.totalFavorites === 0 ? (
          <div className="border-2 border-ink p-8 bg-paper text-center max-w-lg mx-auto shadow-[4px_4px_0px_0px_rgba(20,19,17,1)]">
            <p className="font-serif italic text-xl text-ink mb-4">
              {lang === 'es'
                ? 'Todavía no hay suficiente evidencia contra ti.'
                : "There's not enough evidence against you yet."}
            </p>
            <button onClick={() => onNavigate('home')} className="byline-link inline-block">
              {lang === 'es' ? 'Ir a Hoy' : 'Go to Today'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Módulo 1: Veredicto / Diagnóstico */}
            <div className="md:col-span-2 border-2 border-ink p-6 bg-paper flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(20,19,17,1)]">
              <div>
                <p className="kicker mb-3">
                  {lang === 'es' ? 'Diagnóstico del Lector' : 'Reader Diagnostic'}
                </p>
                <h2 className="font-display font-black text-2xl sm:text-3xl leading-tight text-ink mb-3">
                  {lang === 'es'
                    ? `Pareces particularmente escéptico con ${getCategoryLabel(stats.topCategory)}.`
                    : `You seem particularly skeptical about ${getCategoryLabel(stats.topCategory)}.`}
                </h2>
              </div>
              <p className="font-nameplate text-[12px] text-sub border-t border-ink/20 pt-4 mt-4">
                {topPercent}% {lang === 'es' ? 'de tus recortes pertenecen a este vicio.' : 'of your saved clippings belong to this vice.'}
              </p>
            </div>

            {/* Módulo 2: Expediente de Recortes */}
            <div className="border-2 border-ink p-6 bg-paper flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(20,19,17,1)]">
              <div>
                <p className="kicker mb-2">
                  {lang === 'es' ? 'Prontuario' : 'Rap Sheet'}
                </p>
                <div className="font-display font-black text-5xl text-ink my-2">
                  {stats.totalFavorites}
                </div>
                <p className="font-nameplate text-[11px] uppercase tracking-wider text-sub">
                  {lang === 'es' ? 'Cargos Imputados' : 'Offenses Recorded'}
                </p>
              </div>

              {stats.lastSaved && (
                <div className="border-t border-ink/20 pt-3 mt-4">
                  <p className="font-nameplate text-[10px] uppercase text-sub mb-1">
                    {lang === 'es' ? 'Último recargo:' : 'Latest charge:'}
                  </p>
                  <p className="font-serif italic text-sm text-ink truncate font-bold">
                    {lang === 'es' ? stats.lastSaved.revelation.wordES : stats.lastSaved.revelation.wordEN}
                  </p>
                </div>
              )}
            </div>

            {/* Módulo 3: Desglose por Vicios */}
            <div className="md:col-span-2 border-2 border-ink p-6 bg-paper shadow-[4px_4px_0px_0px_rgba(20,19,17,1)]">
              <p className="kicker mb-4">
                {lang === 'es' ? 'Distribución por Vicios' : 'Distribution by Vices'}
              </p>
              <div className="space-y-3">
                {Object.entries(stats.categoriesCount)
                  .sort((a, b) => b[1] - a[1])
                  .map(([cat, count]) => (
                    <div key={cat} className="flex items-center gap-3">
                      <span className="font-nameplate text-[11px] uppercase text-ink w-32 flex-none truncate font-semibold">
                        {getCategoryLabel(cat)}
                      </span>
                      <div className="flex-1 h-2 bg-ink/10 border border-ink/20">
                        <div
                          className="h-full bg-ink"
                          style={{ width: `${(count / stats.totalFavorites) * 100}%` }}
                        />
                      </div>
                      <span className="font-nameplate text-[11px] text-sub w-8 text-right flex-none font-bold">
                        {count}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Módulo 4: Avance del Corpus */}
            <div className="border-2 border-ink p-6 bg-paper flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(20,19,17,1)]">
              <div>
                <p className="kicker mb-2">
                  {lang === 'es' ? 'Corpus Impreso' : 'Corpus Unlocked'}
                </p>
                <div className="font-display font-black text-4xl text-ink my-2">
                  {unlockedCount} <span className="text-xl font-normal text-sub">/ {allRevelations.length}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-nameplate text-[10px] uppercase tracking-wider text-sub mb-1">
                  <span>{lang === 'es' ? 'Completado' : 'Completed'}</span>
                  <span>{Math.round((unlockedCount / allRevelations.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-ink/10 border border-ink/20">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${(unlockedCount / allRevelations.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
