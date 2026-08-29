import { useEffect, useState } from 'react';
import { categories, categoryDescription } from '../data/revelations';
import { getAllFavorites } from '../lib/storage';
import { track } from '../lib/analytics';

// Subjects (PRD §11) — taxonomía interna presentada como categorías
// editoriales: descripción propia, cantidad de revelaciones y, cuando el
// usuario ya tiene colección, cuánto pesa esa materia dentro de ella.
export const CategoriesScreen = ({ lang = 'en', onNavigate }) => {
  const [savedCounts, setSavedCounts] = useState({});
  const [totalSaved, setTotalSaved] = useState(0);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const favorites = await getAllFavorites();
        const counts = {};
        favorites.forEach((f) => {
          counts[f.category] = (counts[f.category] || 0) + 1;
        });
        setSavedCounts(counts);
        setTotalSaved(favorites.length);
      } catch (error) {
        console.error('Error loading subject counts:', error);
      }
    };
    loadCounts();
  }, []);

  const handleCategoryClick = (categoryId) => {
    track('subject_opened', { subject: categoryId });
    onNavigate('category-detail', { categoryId });
  };

  return (
    <div className="w-full min-h-screen bg-paper pb-20 pt-28">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <div className="flex items-baseline justify-between border-t-[3px] border-b border-ink pt-5 pb-4 mb-5">
          <h1 className="font-nameplate font-semibold text-xl tracking-tight uppercase text-ink">
            {lang === 'es' ? 'Materias' : 'Subjects'}
          </h1>
          <span className="font-nameplate text-[11px] text-sub tracking-wider">
            {categories.length} {lang === 'es' ? 'materias' : 'subjects'}
          </span>
        </div>
        <p className="font-serif italic text-sub text-sm mb-8">
          {lang === 'es'
            ? 'De qué nos gusta ser cínicos, ordenado por tema.'
            : 'What we like to be cynical about, sorted by subject.'}
        </p>

        <div>
          {categories.map((category, i) => {
            const saved = savedCounts[category.id] || 0;
            const percent = totalSaved > 0 && saved > 0 ? Math.round((saved / totalSaved) * 100) : 0;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="index-row group items-start"
              >
                <span className="font-nameplate text-[11px] text-sub w-8 flex-none pt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="text-xl">{category.emoji}</span>
                    <span className="font-display font-black uppercase text-2xl text-ink group-hover:text-accent transition-smooth truncate">
                      {lang === 'es' ? category.name : category.nameEN}
                    </span>
                  </span>
                  <span className="font-serif italic text-[13px] text-sub block mt-1 max-w-[48ch]">
                    {categoryDescription(category.id, lang)}
                  </span>
                </span>
                <span className="font-nameplate text-[10px] tracking-widest uppercase text-sub flex-none text-right pt-1">
                  <span className="block">
                    {category.count} {lang === 'es' ? 'revelaciones' : 'revelations'}
                  </span>
                  {saved > 0 && (
                    <span className="block text-accent font-semibold mt-0.5">
                      {saved} {lang === 'es' ? 'guardadas' : 'saved'} · {percent}%
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
