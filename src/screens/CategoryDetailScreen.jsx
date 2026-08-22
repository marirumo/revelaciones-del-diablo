import { useMemo, useState } from 'react';
import { TopNav } from '../components/TopNav';
import { revelationsByCategory, categories } from '../data/revelations';

export const CategoryDetailScreen = ({ lang = 'es', onNavigate, categoryId, onSelectRevelation, onLanguageChange, dayIndex = 0 }) => {
  const [sortBy, setSortBy] = useState('number'); // 'number' o 'alphabetic'

  const categoryData = categories.find(c => c.id === categoryId);
  const revelations = revelationsByCategory[categoryId] || [];

  const sortedRevelations = useMemo(() => {
    if (sortBy === 'alphabetic') {
      // En orden alfabético solo mostramos lo ya "desbloqueado" desde la
      // primera visita del usuario, para no listar por nombre revelaciones
      // que todavía no le tocan (spoiler del catálogo).
      return revelations
        .filter(r => r.unlockDay <= dayIndex)
        .sort((a, b) => {
          const aWord = lang === 'es' ? a.wordES : a.wordEN;
          const bWord = lang === 'es' ? b.wordES : b.wordEN;
          return aWord.localeCompare(bWord, lang === 'es' ? 'es-ES' : 'en-US');
        });
    }
    return [...revelations].sort((a, b) => b.number - a.number);
  }, [revelations, sortBy, lang, dayIndex]);

  const handleRevelationClick = (revelation) => {
    onSelectRevelation(revelation);
    onNavigate('home');
  };

  if (!categoryData) {
    return (
      <div className="w-full h-screen bg-hell-bg flex items-center justify-center">
        <p className="text-hell-text-secondary">
          {lang === 'es' ? 'Categoría no encontrada' : 'Category not found'}
        </p>
      </div>
    );
  }

  const categoryLabel = lang === 'es' ? categoryData.name : categoryData.nameEN;

  return (
    <div className="w-full min-h-screen bg-hell-bg">
      <TopNav
        title={categoryLabel}
        rightText={sortedRevelations.length}
        onBack={() => onNavigate('categories')}
        lang={lang}
        onLanguageChange={onLanguageChange}
      />

      <div className="max-w-md lg:max-w-5xl mx-auto px-4 lg:px-8 pt-20 pb-6">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="text-4xl mb-3">{categoryData.emoji}</div>
          <h2 className="text-2xl font-bold text-hell-gold mb-2">{categoryLabel}</h2>
          <p className="text-hell-text-secondary text-sm">
            {sortBy === 'alphabetic'
              ? `${sortedRevelations.length} / ${revelations.length} ${lang === 'es' ? 'desbloqueadas' : 'unlocked'}`
              : `${revelations.length} ${lang === 'es' ? 'revelaciones satíricas' : 'satirical revelations'}`}
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setSortBy('number')}
            className={`flex-1 py-2 rounded-lg font-bold text-sm transition-smooth ${
              sortBy === 'number'
                ? 'bg-hell-orange-dark text-hell-gold'
                : 'border border-hell-text-muted text-hell-text-secondary hover:border-hell-orange'
            }`}
          >
            {lang === 'es' ? 'Nuevas Primero' : 'Newest First'}
          </button>
          <button
            onClick={() => setSortBy('alphabetic')}
            className={`flex-1 py-2 rounded-lg font-bold text-sm transition-smooth ${
              sortBy === 'alphabetic'
                ? 'bg-hell-orange-dark text-hell-gold'
                : 'border border-hell-text-muted text-hell-text-secondary hover:border-hell-orange'
            }`}
          >
            {lang === 'es' ? 'Alfabético' : 'Alphabetical'}
          </button>
        </div>

        {/* Revelations Grid */}
        {revelations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-hell-text-secondary">
              {lang === 'es' ? 'No hay revelaciones en esta categoría' : 'No revelations in this category'}
            </p>
          </div>
        ) : sortedRevelations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-hell-text-secondary">
              {lang === 'es'
                ? 'Todavía no desbloqueas ninguna de esta categoría. Vuelve mañana por más.'
                : "You haven't unlocked any of these yet. Come back tomorrow for more."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sortedRevelations.map((revelation) => (
              <button
                key={revelation.id}
                onClick={() => handleRevelationClick(revelation)}
                className="card-hell bg-hell-card/90 border-hell hover:border-hell-orange transition-smooth p-4 text-left"
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <p className="text-xs text-hell-orange font-bold mb-2">
                      #{revelation.number}
                    </p>
                    <h3 className="text-lg text-hell-gold-soft font-bold leading-tight">
                      {lang === 'es' ? revelation.wordES : revelation.wordEN}
                    </h3>
                  </div>
                  <div className="text-2xl">{categoryData.emoji}</div>
                </div>

                {/* Preview de revelación */}
                <p className="text-xs text-hell-text-muted mt-3 leading-relaxed line-clamp-2">
                  {lang === 'es' ? revelation.revelationES : revelation.revelationEN}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
