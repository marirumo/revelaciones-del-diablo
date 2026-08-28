import { useState, useEffect } from 'react';
import { RevelationCard } from '../components/RevelationCard';
import { BackLink } from '../components/BackLink';
import { getRevelationForDay, allRevelations } from '../data/revelations';
import { addFavorite, removeFavorite, isFavorite } from '../lib/storage';

export const HomeScreen = ({ lang = 'es', dayIndex = 0, streak = 1, selectedRevelation, onSelectRevelation }) => {
  const [currentRevelation, setCurrentRevelation] = useState(selectedRevelation || getRevelationForDay(dayIndex));
  const [favorited, setFavorited] = useState(false);
  const [todayRevelation] = useState(getRevelationForDay(dayIndex));

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

  const handleShare = () => {
    const text = lang === 'es'
      ? `${currentRevelation.wordES}\n\n"${currentRevelation.revelationES}"\n\n— Revelaciones del Diablo`
      : `${currentRevelation.wordEN}\n\n"${currentRevelation.revelationEN}"\n\n— Devil's Revelations`;

    if (navigator.share) {
      navigator.share({
        title: 'Revelaciones del Diablo',
        text: text,
        url: window.location.href,
      }).catch(err => console.log('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(text);
      alert(lang === 'es' ? 'Copiado al portapapeles' : 'Copied to clipboard');
    }
  };

  const handleFavorite = async () => {
    try {
      if (favorited) {
        await removeFavorite(currentRevelation.id);
      } else {
        await addFavorite(currentRevelation);
      }
      setFavorited(!favorited);
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
        />

        <button
          onClick={handleSurprise}
          className="mt-5 font-nameplate text-[10px] tracking-widest uppercase text-sub hover:text-ink transition-smooth min-h-11"
        >
          {lang === 'es' ? 'Sorpréndeme →' : 'Surprise me →'}
        </button>
      </div>
    </div>
  );
};
