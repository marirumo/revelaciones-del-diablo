import { useEffect, useState } from 'react';
import { fetchGif } from '../lib/giphy';
import squiggleUnderline from '../assets/figma/squiggle-underline.svg';
import flame from '../assets/figma/flame.svg';

// Palabras largas sin espacios (ej. "Plenipotentiary", 15) no tienen dónde
// hacer un salto de línea natural — si el tamaño es fijo, el navegador corta
// la palabra a la mitad. Bajamos el tamaño según el largo de la palabra más
// larga del título para que entre en una sola línea.
const getTitleSizeClass = (word) => {
  const longestChunk = Math.max(...word.split(' ').map(w => w.length));
  if (longestChunk <= 9) return 'text-3xl sm:text-4xl lg:text-4xl';
  if (longestChunk <= 13) return 'text-2xl sm:text-3xl lg:text-3xl';
  if (longestChunk <= 17) return 'text-xl sm:text-2xl lg:text-2xl';
  return 'text-lg sm:text-xl lg:text-xl';
};

export const RevelationCard = ({
  revelation,
  lang = 'es',
  isFavorite,
  onShare,
  onFavorite,
  isToday = false,
}) => {
  const [gifUrl, setGifUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGif = async () => {
      setLoading(true);
      const query = lang === 'es' ? revelation.gifQueryES : revelation.gifQueryEN;
      const url = await fetchGif(query, lang);
      setGifUrl(url);
      setLoading(false);
    };

    loadGif();
  }, [revelation, lang]);

  const word = lang === 'es' ? revelation.wordES : revelation.wordEN;
  const bierce = lang === 'es' ? revelation.biercES : revelation.biercEN;
  const revelationText = lang === 'es' ? revelation.revelationES : revelation.revelationEN;

  return (
    <div className="w-full animate-scale-in">
      {/* Título: "Revelación de hoy" + subrayado ondulado */}
      <div className="flex flex-col items-center gap-2 mb-6 animate-slide-up-fade">
        <p className="text-hell-gold font-semibold text-base lg:text-xl">
          {isToday
            ? (lang === 'es' ? 'Revelación de hoy' : "Today's revelation")
            : (lang === 'es' ? 'Revelación' : 'Revelation')}
        </p>
        <img src={squiggleUnderline} alt="" className="h-3 w-40 lg:w-48" />
      </div>

      {/* Main Card: apilada en mobile, en poster (media | texto) desde lg */}
      <div className="card-hell bg-hell-card border-hell hover-lift lg:flex lg:items-stretch lg:gap-10 lg:p-10 overflow-hidden relative pb-14"
        style={{ boxShadow: '8px 12px 0 rgba(0,0,0,0.45)' }}
      >
        {/* Media */}
        <div className="lg:w-2/5 lg:flex-shrink-0">
          <div className="relative bg-hell-meme rounded-none mb-6 lg:mb-0 aspect-[4/3] flex items-center justify-center overflow-hidden animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {loading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="spinner" />
                <p className="text-white/80 text-xs">
                  {lang === 'es' ? 'Cargando GIF...' : 'Loading GIF...'}
                </p>
              </div>
            ) : gifUrl ? (
              <img
                src={gifUrl}
                alt={word}
                className="w-full h-full object-contain animate-fade-in"
                onError={() => setGifUrl(null)}
              />
            ) : (
              <p className="font-semibold text-lg text-white tracking-wide">MEME</p>
            )}
          </div>
        </div>

        {/* Texto */}
        <div className="min-w-0 lg:flex-1 lg:flex lg:flex-col lg:justify-center">
          <div className="mb-2">
            <h2 className={`${getTitleSizeClass(word)} font-semibold text-hell-orange mb-2 break-words animate-slide-up-fade`}>
              {word}
            </h2>
            <div className="h-1 bg-hell-gold-soft w-32 rounded-full animate-slide-up-fade" style={{ animationDelay: '0.1s' }} />
          </div>

          <div className="mb-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-hell-gold text-base leading-relaxed">
              {bierce}
            </p>
            <p className="text-hell-text-secondary text-sm mt-3 font-light">
              -Ambrose Bierce
            </p>
          </div>
        </div>

        {/* Guardar / Compartir — solo íconos, esquina inferior derecha */}
        <div className="absolute bottom-4 right-4 flex items-center gap-4">
          <button
            onClick={onFavorite}
            aria-label={lang === 'es' ? 'Guardar' : 'Save'}
            className="text-2xl hover-scale active:scale-95 transition-smooth"
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
          <button
            onClick={onShare}
            aria-label={lang === 'es' ? 'Compartir' : 'Share'}
            className="text-2xl hover-scale active:scale-95 transition-smooth"
          >
            🔗
          </button>
        </div>
      </div>

      {/* Revelation Section */}
      <div className="mt-8 px-4 lg:px-0 flex flex-col items-center text-center animate-slide-up-fade" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center gap-3 mb-4">
          <img src={flame} alt="" className="h-6 w-[18px]" />
          <h3 className="text-base lg:text-xl font-semibold text-hell-gold">
            {lang === 'es' ? 'La verdad incómoda' : 'The uncomfortable truth'}
          </h3>
        </div>
        <p className="text-hell-gold text-base lg:text-lg leading-relaxed max-w-md">
          {revelationText}
        </p>
      </div>
    </div>
  );
};
