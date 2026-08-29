import { categories } from '../data/revelations';

export const CategoriesScreen = ({ lang = 'en', onNavigate }) => {
  const handleCategoryClick = (categoryId) => {
    onNavigate('category-detail', { categoryId });
  };

  return (
    <div className="w-full min-h-screen bg-paper pb-20 pt-28">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <div className="flex items-baseline justify-between border-t-[3px] border-b border-ink pt-5 pb-4 mb-5">
          <h1 className="font-nameplate font-semibold text-xl tracking-tight uppercase text-ink">
            {lang === 'es' ? 'Vicios Clasificados' : 'Classified Vices'}
          </h1>
          <span className="font-nameplate text-[11px] text-sub tracking-wider">
            {categories.length} {lang === 'es' ? 'expedientes' : 'dossiers'}
          </span>
        </div>
        <p className="font-serif italic text-sub text-sm mb-8">
          {lang === 'es'
            ? 'El catálogo de nuestras flaquezas y devociones profanas. Elige tu vicio favorito.'
            : 'The catalog of our frailties and profane devotions. Pick your preferred vice.'}
        </p>

        <div>
          {categories.map((category, i) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="index-row group items-baseline"
            >
              <span className="font-nameplate text-[11px] text-sub w-8 flex-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 min-w-0 flex items-center gap-2">
                <span className="text-xl">{category.emoji}</span>
                <span className="font-display font-black uppercase text-2xl text-ink group-hover:text-accent transition-smooth block truncate">
                  {lang === 'es' ? category.name : category.nameEN}
                </span>
              </span>
              <span className="font-nameplate text-[10px] tracking-widest uppercase text-sub flex-none">
                {category.count} {lang === 'es' ? 'revelaciones' : 'revelations'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
