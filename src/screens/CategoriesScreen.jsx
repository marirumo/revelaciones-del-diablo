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
            {lang === 'es' ? 'Materias' : 'Subjects'}
          </h1>
          <span className="font-nameplate text-[11px] text-sub tracking-wider">
            {categories.length} {lang === 'es' ? 'secciones' : 'sections'}
          </span>
        </div>
        <p className="font-serif italic text-sub text-sm mb-8">
          {lang === 'es'
            ? 'Los temas sobre los que somos cínicos, no una paleta de colores.'
            : "The subjects we're cynical about, not a color palette."}
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
              <span className="flex-1 min-w-0">
                <span className="font-display font-black uppercase text-2xl text-ink group-hover:text-accent transition-smooth block truncate">
                  {lang === 'es' ? category.name : category.nameEN}
                </span>
              </span>
              <span className="font-nameplate text-[10px] tracking-widest uppercase text-sub flex-none">
                {category.count} {lang === 'es' ? 'notas' : 'stories'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
