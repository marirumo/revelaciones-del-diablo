import { useMemo, useState } from 'react';
import { BackLink } from '../components/BackLink';
import { revelationsByCategory, categories } from '../data/revelations';

export const CategoryDetailScreen = ({ lang = 'en', onNavigate, categoryId, onSelectRevelation, dayIndex = 0 }) => {
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
  };

  if (!categoryData) {
    return (
      <div className="w-full min-h-screen bg-paper pt-28 flex items-center justify-center">
        <p className="font-serif italic text-sub">
          {lang === 'es' ? 'Materia no encontrada' : 'Subject not found'}
        </p>
      </div>
    );
  }

  const categoryLabel = lang === 'es' ? categoryData.name : categoryData.nameEN;

  return (
    <div className="w-full min-h-screen bg-paper pb-20 pt-28">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <BackLink onClick={() => onNavigate('categories')}>
          {lang === 'es' ? 'Volver a Materias' : 'Back to Subjects'}
        </BackLink>

        <div className="flex items-baseline justify-between border-t-[3px] border-b border-ink pt-5 pb-4 mb-8">
          <h1 className="font-display font-black uppercase text-3xl text-ink">
            {categoryLabel}
          </h1>
          <span className="font-nameplate text-[11px] text-sub tracking-wider">
            {sortBy === 'alphabetic'
              ? `${sortedRevelations.length} / ${revelations.length}`
              : revelations.length}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => setSortBy('number')}
            aria-pressed={sortBy === 'number'}
            className={`font-nameplate text-[11px] tracking-widest uppercase min-h-11 border-b transition-smooth ${
              sortBy === 'number' ? 'text-ink font-semibold border-accent' : 'text-sub border-transparent hover:text-ink'
            }`}
          >
            {lang === 'es' ? 'Nuevas primero' : 'Newest first'}
          </button>
          <span className="text-sub" aria-hidden="true">/</span>
          <button
            onClick={() => setSortBy('alphabetic')}
            aria-pressed={sortBy === 'alphabetic'}
            className={`font-nameplate text-[11px] tracking-widest uppercase min-h-11 border-b transition-smooth ${
              sortBy === 'alphabetic' ? 'text-ink font-semibold border-accent' : 'text-sub border-transparent hover:text-ink'
            }`}
          >
            {lang === 'es' ? 'Alfabético' : 'Alphabetical'}
          </button>
        </div>

        {revelations.length === 0 ? (
          <p className="font-serif italic text-sub py-12 text-center">
            {lang === 'es' ? 'No hay revelaciones en esta materia' : 'No revelations in this subject'}
          </p>
        ) : sortedRevelations.length === 0 ? (
          <p className="font-serif italic text-sub py-12 text-center">
            {lang === 'es'
              ? 'Todavía no desbloqueas ninguna de esta materia. Vuelve mañana por más.'
              : "You haven't unlocked any of these yet. Come back tomorrow for more."}
          </p>
        ) : (
          <div>
            {sortedRevelations.map((revelation) => (
              <button
                key={revelation.id}
                onClick={() => handleRevelationClick(revelation)}
                className="index-row group items-start"
              >
                <span className="font-nameplate text-[11px] text-sub w-10 flex-none pt-1">
                  {String(revelation.number).padStart(3, '0')}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="font-serif font-bold text-lg text-ink group-hover:text-accent transition-smooth block">
                    {lang === 'es' ? revelation.wordES : revelation.wordEN}
                  </span>
                  <span className="font-serif italic text-[13px] text-sub block mt-0.5 line-clamp-1">
                    {lang === 'es' ? revelation.revelationES : revelation.revelationEN}
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
