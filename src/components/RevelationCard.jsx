import { useEffect, useState } from 'react';
import { fetchGif } from '../lib/giphy';
import { categoryName, allRevelations } from '../data/revelations';

const getHeadlineSize = (word) => {
  const len = word.length;
  if (len <= 8) return 'clamp(2.6rem, 8vw, 4.2rem)';
  if (len <= 11) return 'clamp(2.1rem, 7vw, 3.4rem)';
  if (len <= 14) return 'clamp(1.8rem, 6vw, 2.8rem)';
  return 'clamp(1.5rem, 5vw, 2.3rem)';
};

const formatDate = (lang) => {
  const d = new Date();
  return d.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });
};

export const RevelationCard = ({
  revelation,
  lang = 'en',
  isFavorite,
  onShare,
  onFavorite,
  isToday = false,
  streak = 1,
  dayIndex = 0,
  hideHeader = false,
}) => {
  const [gifUrl, setGifUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const loadGif = async () => {
      setLoading(true);
      setGifUrl(null);
      const query = lang === 'es' ? revelation.gifQueryES : revelation.gifQueryEN;
      const url = await fetchGif(query, lang);
      if (!cancelled) {
        setGifUrl(url);
        setLoading(false);
      }
    };
    loadGif();
    return () => { cancelled = true; };
  }, [revelation, lang]);

  const word = lang === 'es' ? revelation.wordES : revelation.wordEN;
  const bierce = lang === 'es' ? revelation.biercES : revelation.biercEN;
  const revelationText = lang === 'es' ? revelation.revelationES : revelation.revelationEN;

  return (
    <article className={`w-full bg-paper animate-fade-in ${hideHeader ? '' : 'border-t-[3px] border-ink'}`}>
      {!hideHeader && (
        <div className="flex items-baseline justify-between border-b border-ink pt-5 pb-3 mb-8">
          <span className="font-nameplate text-[10px] tracking-widest uppercase text-sub">
            {isToday
              ? `${lang === 'es' ? 'Edición' : 'Edition'} #${dayIndex + 1} · ${formatDate(lang)} · ${lang === 'es' ? 'racha' : 'streak'} ${streak}d`
              : (lang === 'es' ? 'Desde el Archivo' : 'From the Archive')}
          </span>
          <span className="font-nameplate text-[10px] tracking-widest uppercase text-sub">
            {String(revelation.number).padStart(3, '0')} / {allRevelations.length}
          </span>
        </div>
      )}

      <p className="kicker mb-3">
        {categoryName(revelation.category, lang)}
      </p>

      <div>
        <h2
          className="font-display font-black uppercase leading-[0.92] text-ink break-words text-balance"
          style={{ fontSize: getHeadlineSize(word) }}
        >
          {word}
        </h2>
        <p className="font-nameplate text-[11px] tracking-widest uppercase text-sub mt-1 mb-4">
          {lang === 'es' ? 'sustantivo' : 'noun'}
        </p>

        <hr className="border-ink mb-6" />

        <p className="font-serif italic text-[17px] leading-relaxed text-ink max-w-[60ch] lg:max-w-none mb-6">
          "{bierce}"
        </p>

        <div
          className="gif-band aspect-video mb-6 lg:max-w-md lg:mx-auto"
          style={{
            backgroundImage: gifUrl
              ? undefined
              : 'radial-gradient(circle at 22% 32%, rgba(20,19,17,.06) 0 2px, transparent 2px), radial-gradient(circle at 62% 68%, rgba(20,19,17,.06) 0 2px, transparent 2px)',
            backgroundSize: '9px 9px',
          }}
        >
          {gifUrl ? (
            <img
              src={gifUrl}
              alt={word}
              className="w-full h-full object-contain"
              onError={() => setGifUrl(null)}
            />
          ) : (
            <span className="font-nameplate text-[10px] tracking-[.2em] uppercase text-sub">
              {loading
                ? (lang === 'es' ? 'CARGANDO GIF…' : 'LOADING GIF…')
                : 'GIF — ' + (lang === 'es' ? 'INTERRUPCIÓN VISUAL' : 'VISUAL INTERRUPTION')}
            </span>
          )}
        </div>

        <p className="kicker mb-2">
          {lang === 'es' ? 'Por si se te escapó la idea' : 'In case you missed the point'}
        </p>
        <p className="font-serif text-[16px] leading-relaxed text-ink max-w-[52ch] lg:max-w-none mb-8">
          {revelationText}
        </p>

        <div className="flex items-center gap-5 border-t border-ink pt-5">
          <button
            onClick={onFavorite}
            aria-pressed={!!isFavorite}
            className="byline-link"
          >
            {isFavorite
              ? (lang === 'es' ? 'Quitar de mi cinismo' : 'Remove from my cynicism')
              : (lang === 'es' ? 'Esta me llegó' : 'This one stung')}
          </button>
          <button onClick={onShare} className="byline-link">
            {lang === 'es' ? 'Publica esta verdad' : 'Publish this truth'}
          </button>
        </div>
      </div>
    </article>
  );
};
