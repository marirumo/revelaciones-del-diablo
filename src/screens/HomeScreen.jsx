import { useState, useEffect } from 'react';
import { TopNav } from '../components/TopNav';
import { RevelationCard } from '../components/RevelationCard';
import { getRevelationForDay, categories, categoryName } from '../data/revelations';
import { addFavorite, removeFavorite, isFavorite } from '../lib/storage';
import { getGreeting } from '../lib/greetings';
import flourish from '../assets/figma/flourish.svg';

export const HomeScreen = ({ lang = 'es', dayIndex = 0, selectedRevelation, onSelectRevelation, onLanguageChange }) => {
  const [currentRevelation, setCurrentRevelation] = useState(selectedRevelation || getRevelationForDay(dayIndex));
  const [favorited, setFavorited] = useState(false);
  const [todayRevelation] = useState(getRevelationForDay(dayIndex));

  // Cuando el usuario elige una revelación desde Biblioteca/Categorías, mostrarla aquí
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

  const handleShare = () => {
    const text = lang === 'es'
      ? `🔥 ${currentRevelation.wordES}\n\n"${currentRevelation.revelationES}"\n\n— Revelaciones del Diablo`
      : `🔥 ${currentRevelation.wordEN}\n\n"${currentRevelation.revelationEN}"\n\n— Devil's Revelations`;

    if (navigator.share) {
      navigator.share({
        title: 'Revelaciones del Diablo',
        text: text,
        url: window.location.href,
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback: copy to clipboard
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

  return (
    <div className="w-full min-h-screen bg-hell-bg pb-24 lg:pb-12 pt-16 animate-fade-in">
      <TopNav
        title="😈 Revelaciones"
        lang={lang}
        onLanguageChange={onLanguageChange}
      />

      <div className="max-w-md lg:max-w-3xl mx-auto px-4 lg:px-8 pt-8">
        <img src={flourish} alt="" className="h-8 mx-auto mb-6 opacity-70" />

        {/* Saludo sarcástico según hora local, cambia una vez al día */}
        <p className="text-center text-sm text-hell-text-secondary mb-6 font-light animate-fade-in">
          {getGreeting(lang)}
        </p>

        {/* Category chip — solo informativo, no lleva a ningún lado */}
        <div className="flex justify-center mb-6 animate-slide-up-fade">
          <div className="bg-hell-red/30 border border-hell-red px-4 py-2 flex items-center gap-2">
            <span className="text-sm text-hell-gold font-semibold">
              {categories.find(c => c.id === currentRevelation.category)?.emoji}{' '}
              {categoryName(currentRevelation.category, lang)}
            </span>
          </div>
        </div>

        <RevelationCard
          revelation={currentRevelation}
          lang={lang}
          isFavorite={favorited}
          onShare={handleShare}
          onFavorite={handleFavorite}
          isToday={currentRevelation.id === todayRevelation.id}
        />

        <img src={flourish} alt="" className="h-8 mx-auto mt-8 opacity-70" />
      </div>
    </div>
  );
};
