import { useState, useEffect } from 'react';
import { RevelationCard } from '../components/RevelationCard';
import { BackLink } from '../components/BackLink';
import { DevilsAdvocateModal } from '../components/DevilsAdvocateModal';
import { getRevelationForDay, allRevelations } from '../data/revelations';
import { addFavorite, removeFavorite, isFavorite } from '../lib/storage';
import { publishRevelation } from '../lib/socialCard';
import { track } from '../lib/analytics';

const formatDate = (lang) => {
  const d = new Date();
  return d.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
  });
};

export const HomeScreen = ({ lang = 'en', dayIndex = 0, streak = 1, selectedRevelation, onSelectRevelation }) => {
  const [currentRevelation, setCurrentRevelation] = useState(selectedRevelation || getRevelationForDay(dayIndex));
  const [favorited, setFavorited] = useState(false);
  const [todayRevelation] = useState(getRevelationForDay(dayIndex));
  const [showAdvocate, setShowAdvocate] = useState(false);
  const [advocatePromptFor, setAdvocatePromptFor] = useState(null);
  const [shareNotice, setShareNotice] = useState('');
  const [searching, setSearching] = useState(false);

  // Cuando el usuario elige una revelación desde Archivo/Materias, mostrarla aquí
  useEffect(() => {
    if (selectedRevelation && selectedRevelation.id !== currentRevelation.id) {
      setCurrentRevelation(selectedRevelation);
    }
  }, [selectedRevelation]);

  useEffect(() => {
    const checkFavorite = async () => {
      const fav = await isFavorite(currentRevelation.id);
      setFavorited(fav);
    };
    checkFavorite();
    setAdvocatePromptFor(null);
    track('revelation_viewed', { id: currentRevelation.id, category: currentRevelation.category, edition: currentRevelation.number });
  }, [currentRevelation]);

  const isToday = currentRevelation.id === todayRevelation.id;

  const handleShare = async () => {
    try {
      const result = await publishRevelation(currentRevelation, lang);
      track('revelation_shared', { id: currentRevelation.id, method: result.method });
      if (result.method === 'download') {
        setShareNotice(
          lang === 'es'
            ? 'Imagen descargada. Enlace copiado al portapapeles.'
            : 'Image downloaded. Link copied to clipboard.'
        );
        setTimeout(() => setShareNotice(''), 4000);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error publishing revelation:', error);
      }
    }
  };

  const handleFavorite = async () => {
    try {
      if (favorited) {
        await removeFavorite(currentRevelation.id);
        setFavorited(false);
        track('revelation_unsaved', { id: currentRevelation.id, category: currentRevelation.category });
      } else {
        await addFavorite(currentRevelation);
        setFavorited(true);
        track('revelation_saved', { id: currentRevelation.id, category: currentRevelation.category });
      }
      // PRD §15: la interacción con el Diablo aparece después de tocar
      // guardar/quitar, como una invitación en línea, no como un modal
      // obligatorio. Se muestra en ambos sentidos del toggle.
      setAdvocatePromptFor(currentRevelation.id);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleBackToToday = () => {
    setAdvocatePromptFor(null);
    onSelectRevelation(todayRevelation);
  };

  const handleSurprise = () => {
    const unlocked = allRevelations.filter(r => r.unlockDay <= dayIndex && r.id !== currentRevelation.id);
    const pool = unlocked.length > 0 ? unlocked : allRevelations;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    track('surprise_me_used', { fromId: currentRevelation.id });
    // PRD §9: un momento breve de "el Diablo está buscando algo apropiado"
    // en vez de saltar directo al resultado, para que no se sienta un randomizer plano.
    setAdvocatePromptFor(null);
    setSearching(true);
    setTimeout(() => {
      onSelectRevelation(pick);
      setSearching(false);
    }, 650);
  };

  const handleOpenAdvocate = () => {
    track('devils_advocate_opened', { id: currentRevelation.id, category: currentRevelation.category });
    setShowAdvocate(true);
  };

  return (
    <div className="w-full min-h-screen bg-paper pb-20 pt-28">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap items-center justify-between border-b-2 border-ink pb-5 mb-6 gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <img src="/devil.svg" alt="" aria-hidden="true" className="w-20 h-20 sm:w-28 sm:h-28 object-contain flex-none" />
            <div>
              <span className="font-nameplate text-[10px] sm:text-[11px] tracking-widest uppercase text-sub block">
                {isToday ? (lang === 'es' ? 'Edición' : 'Edition') : (lang === 'es' ? 'Archivo' : 'Archive')}
              </span>
              <span className="font-display font-black text-3xl sm:text-5xl text-ink leading-none">
                {isToday ? `#${dayIndex + 1}` : `#${currentRevelation.number}`}
              </span>
            </div>
          </div>

          <div className="text-right font-nameplate text-[11px] sm:text-[12px] tracking-widest uppercase text-sub leading-snug">
            <p>
              {formatDate(lang)} · {lang === 'es' ? 'racha' : 'streak'} {streak}d
            </p>
            <p className="mt-1 font-semibold text-ink">
              {String(currentRevelation.number).padStart(3, '0')} / {allRevelations.length}
            </p>
          </div>
        </div>

        {!isToday && (
          <BackLink onClick={handleBackToToday}>
            {lang === 'es' ? 'Volver a Hoy' : 'Back to Today'}
          </BackLink>
        )}

        <RevelationCard
          revelation={currentRevelation}
          lang={lang}
          isFavorite={favorited}
          onShare={handleShare}
          onFavorite={handleFavorite}
          isToday={isToday}
          streak={streak}
          dayIndex={dayIndex}
          hideHeader={true}
        />

        {advocatePromptFor === currentRevelation.id && !showAdvocate && (
          <div className="mt-6 border-t border-ink pt-5 animate-fade-in">
            <p className="font-nameplate text-[10px] tracking-widest uppercase text-sub mb-1">
              {lang === 'es' ? 'El Diablo tiene una pregunta.' : 'The Devil has a question.'}
            </p>
            <p className="font-serif italic text-[15px] text-ink mb-2">
              {lang === 'es' ? '¿Se equivocó esta vez?' : 'Did he get this one wrong?'}
            </p>
            <button onClick={handleOpenAdvocate} className="byline-link">
              {lang === 'es' ? 'Dígale por qué →' : 'Tell him why →'}
            </button>
          </div>
        )}

        <button
          onClick={handleSurprise}
          disabled={searching}
          className="mt-5 font-nameplate text-[10px] tracking-widest uppercase text-sub hover:text-ink transition-smooth min-h-11"
        >
          {searching
            ? (lang === 'es' ? 'El Diablo busca algo apropiado…' : 'The Devil is looking for something appropriate…')
            : (lang === 'es' ? 'Sorpréndeme →' : 'Surprise me →')}
        </button>

        {shareNotice && (
          <p className="mt-3 font-nameplate text-[11px] tracking-wide text-sub" role="status">
            {shareNotice}
          </p>
        )}
      </div>

      {showAdvocate && (
        <DevilsAdvocateModal lang={lang} revelation={currentRevelation} onClose={() => setShowAdvocate(false)} />
      )}
    </div>
  );
};
