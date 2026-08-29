import { useState, useEffect } from 'react';
import { RevelationCard } from '../components/RevelationCard';
import { BackLink } from '../components/BackLink';
import { DevilsAdvocateModal } from '../components/DevilsAdvocateModal';
import { getRevelationForDay, allRevelations } from '../data/revelations';
import { addFavorite, removeFavorite, isFavorite } from '../lib/storage';
import { publishRevelation } from '../lib/socialCard';

export const HomeScreen = ({ lang = 'en', dayIndex = 0, streak = 1, selectedRevelation, onSelectRevelation }) => {
  const [currentRevelation, setCurrentRevelation] = useState(selectedRevelation || getRevelationForDay(dayIndex));
  const [favorited, setFavorited] = useState(false);
  const [todayRevelation] = useState(getRevelationForDay(dayIndex));
  const [unveiledToday, setUnveiledToday] = useState(false);
  const [showAdvocate, setShowAdvocate] = useState(false);
  const [shareNotice, setShareNotice] = useState('');

  // Cuando el usuario elige una revelación desde Archivo/Materias, mostrarla aquí
  useEffect(() => {
    if (selectedRevelation && selectedRevelation.id !== currentRevelation.id) {
      setCurrentRevelation(selectedRevelation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRevelation]);

  useEffect(() => {
    const checkFavorite = async () => {
      const fav = await isFavorite(currentRevelation.id);
      setFavorited(fav);
    };
    checkFavorite();
  }, [currentRevelation]);

  const isToday = currentRevelation.id === todayRevelation.id;

  const handleShare = async () => {
    try {
      const result = await publishRevelation(currentRevelation, lang);
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
      } else {
        await addFavorite(currentRevelation);
        setFavorited(true);
        setShowAdvocate(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleBackToToday = () => {
    onSelectRevelation(todayRevelation);
  };

  const handleSurprise = () => {
    const unlocked = allRevelations.filter(r => r.unlockDay <= dayIndex && r.id !== currentRevelation.id);
    const pool = unlocked.length > 0 ? unlocked : allRevelations;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    onSelectRevelation(pick);
  };

  return (
    <div className="w-full min-h-screen bg-paper pb-20 pt-28">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <div className="flex justify-center pb-5">
          <img src="/favicon.svg" alt="" aria-hidden="true" className="w-7 h-7" />
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
          revealed={!isToday || unveiledToday}
          onReveal={() => setUnveiledToday(true)}
        />

        <button
          onClick={handleSurprise}
          className="mt-5 font-nameplate text-[10px] tracking-widest uppercase text-sub hover:text-ink transition-smooth min-h-11"
        >
          {lang === 'es' ? 'Sorpréndeme →' : 'Surprise me →'}
        </button>

        {shareNotice && (
          <p className="mt-3 font-nameplate text-[11px] tracking-wide text-sub" role="status">
            {shareNotice}
          </p>
        )}
      </div>

      {showAdvocate && (
        <DevilsAdvocateModal lang={lang} onClose={() => setShowAdvocate(false)} />
      )}
    </div>
  );
};
