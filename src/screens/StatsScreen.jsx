import { useEffect, useState } from 'react';
import { getAllFavorites } from '../lib/storage';
import { categoryName } from '../data/revelations';
import { buildConclusion } from '../lib/mirror';
import { getIdentity, IDENTITY_MIN_SAVED } from '../data/identity';
import { getRank, getNextRank } from '../data/progression';
import { track } from '../lib/analytics';

// Mirror (PRD §13/§14) — no es un dashboard: cada dato se traduce en una
// observación editorial. "The Devil's Conclusion" sintetiza el patrón,
// "Your Devil" convierte la colección en una identidad determinística.
export const StatsScreen = ({ lang = 'en', onNavigate, dayIndex = 0, streak = 1 }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalFavorites: 0,
    lastSaved: null,
    categoriesCount: {},
  });

  useEffect(() => {
    track('mirror_opened');
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const fav = await getAllFavorites();

        const categoryCount = {};
        fav.forEach((f) => {
          categoryCount[f.category] = (categoryCount[f.category] || 0) + 1;
        });

        const lastFav = fav[fav.length - 1];

        setStats({
          totalFavorites: fav.length,
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

  const topEntry = Object.entries(stats.categoriesCount).sort((a, b) => b[1] - a[1])[0];
  const topPercent = topEntry && stats.totalFavorites > 0
    ? Math.round((topEntry[1] / stats.totalFavorites) * 100)
    : 0;

  const rank = getRank(stats.totalFavorites, lang);
  const nextRank = getNextRank(stats.totalFavorites, lang);
  const identity = getIdentity(stats.categoriesCount, stats.totalFavorites, lang);

  return (
    <div className="w-full min-h-screen bg-paper pb-20 pt-28">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <div className="flex items-baseline justify-between border-t-[3px] border-b border-ink pt-5 pb-4 mb-5">
          <h1 className="font-nameplate font-semibold text-xl tracking-tight uppercase text-ink">
            {lang === 'es' ? 'Tu Espejo' : 'Your Mirror'}
          </h1>
          <span className="font-nameplate text-[11px] text-sub tracking-wider">
            {lang === 'es' ? 'día' : 'day'} {dayIndex + 1} · {lang === 'es' ? 'racha' : 'streak'} {streak}d
          </span>
        </div>

        {!loading && stats.totalFavorites > 0 && (
          <p className="font-serif italic text-sub text-sm mb-8">
            {lang === 'es'
              ? `${stats.totalFavorites} revelaciones guardadas. Al parecer, el optimismo no te ha funcionado.`
              : `You have saved ${stats.totalFavorites} revelations. Apparently, optimism has not been working for you.`}
          </p>
        )}

        {loading ? (
          <p className="font-nameplate text-sub text-sm py-12 text-center">
            {lang === 'es' ? 'Reflejando tu cinismo…' : 'Reflecting your cynicism…'}
          </p>
        ) : stats.totalFavorites === 0 ? (
          <div className="border-2 border-ink p-8 bg-paper text-center max-w-lg mx-auto shadow-[4px_4px_0px_0px_rgba(20,19,17,1)]">
            <p className="font-serif italic text-xl text-ink mb-4">
              {lang === 'es'
                ? 'Todavía no hay nada que reflejar.'
                : "There's nothing to reflect yet."}
            </p>
            <button onClick={() => onNavigate('home')} className="byline-link inline-block">
              {lang === 'es' ? 'Ir a Hoy' : 'Go to Today'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* The Devil's Conclusion */}
            <div className="md:col-span-2 border-2 border-ink p-6 bg-paper flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(20,19,17,1)]">
              <div>
                <p className="kicker mb-3">
                  {lang === 'es' ? "La Conclusión del Diablo" : "The Devil's Conclusion"}
                </p>
                <h2 className="font-display font-black text-2xl sm:text-3xl leading-tight text-ink mb-3">
                  {buildConclusion(stats.categoriesCount, lang)}
                </h2>
              </div>
              {topEntry && (
                <p className="font-nameplate text-[12px] text-sub border-t border-ink/20 pt-4 mt-4">
                  {topPercent}% {lang === 'es'
                    ? `de tu colección tiene que ver con ${categoryName(topEntry[0], lang).toLowerCase()}.`
                    : `of your collection is about ${categoryName(topEntry[0], lang).toLowerCase()}.`}
                </p>
              )}
            </div>

            {/* Revelations saved + rank */}
            <div className="border-2 border-ink p-6 bg-paper flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(20,19,17,1)]">
              <div>
                <p className="kicker mb-2">
                  {lang === 'es' ? 'Revelaciones Guardadas' : 'Revelations Saved'}
                </p>
                <div className="font-display font-black text-5xl text-ink my-2">
                  {stats.totalFavorites}
                </div>
                <p className="font-nameplate text-[11px] uppercase tracking-wider text-accent font-semibold">
                  {rank}
                </p>
                {nextRank && (
                  <p className="font-nameplate text-[10px] text-sub mt-1">
                    {lang === 'es'
                      ? `${nextRank.min - stats.totalFavorites} más para ${nextRank.label}`
                      : `${nextRank.min - stats.totalFavorites} more to ${nextRank.label}`}
                  </p>
                )}
              </div>

              {stats.lastSaved && (
                <div className="border-t border-ink/20 pt-3 mt-4">
                  <p className="font-nameplate text-[10px] uppercase text-sub mb-1">
                    {lang === 'es' ? 'Última guardada:' : 'Last saved:'}
                  </p>
                  <p className="font-serif italic text-sm text-ink truncate font-bold">
                    {lang === 'es' ? stats.lastSaved.revelation.wordES : stats.lastSaved.revelation.wordEN}
                  </p>
                </div>
              )}
            </div>

            {/* Your Worldview */}
            <div className="md:col-span-2 border-2 border-ink p-6 bg-paper shadow-[4px_4px_0px_0px_rgba(20,19,17,1)]">
              <p className="kicker mb-4">
                {lang === 'es' ? 'Tu Visión del Mundo' : 'Your Worldview'}
              </p>
              <div className="space-y-3">
                {Object.entries(stats.categoriesCount)
                  .sort((a, b) => b[1] - a[1])
                  .map(([cat, count]) => (
                    <div key={cat} className="flex items-center gap-3">
                      <span className="font-nameplate text-[11px] uppercase text-ink w-32 flex-none truncate font-semibold">
                        {categoryName(cat, lang, true)}
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

            {/* Your Devil — Identity layer */}
            <div className="border-2 border-ink p-6 bg-paper flex flex-col justify-center shadow-[4px_4px_0px_0px_rgba(20,19,17,1)]">
              <p className="kicker mb-2">
                {lang === 'es' ? 'Tu Diablo' : 'Your Devil'}
              </p>
              {identity ? (
                <>
                  <h3 className="font-display font-black text-xl text-ink leading-tight mb-2">
                    {identity.name}
                  </h3>
                  <p className="font-serif italic text-[13px] text-sub leading-relaxed">
                    {identity.diagnosis}
                  </p>
                </>
              ) : (
                <p className="font-serif italic text-sm text-sub">
                  {lang === 'es'
                    ? `Todavía no hay suficiente evidencia. Guarda al menos ${IDENTITY_MIN_SAVED} revelaciones para que el Diablo te diagnostique.`
                    : `Not enough evidence yet. Save at least ${IDENTITY_MIN_SAVED} revelations for the Devil to diagnose you.`}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
