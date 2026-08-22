import { TopNav } from '../components/TopNav';
import { categories } from '../data/revelations';

export const CategoriesScreen = ({ lang = 'es', onNavigate, onSelectRevelation, onLanguageChange }) => {
  const handleCategoryClick = (categoryId) => {
    onNavigate('category-detail', { categoryId });
  };

  return (
    <div className="w-full min-h-screen bg-hell-bg">
      <TopNav
        title={lang === 'es' ? 'Categorías' : 'Categories'}
        onBack={() => onNavigate('home')}
        lang={lang}
        onLanguageChange={onLanguageChange}
      />

      <div className="max-w-md lg:max-w-4xl mx-auto px-4 lg:px-8 pt-20 pb-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="card-hell bg-hell-card/90 border-hell hover:border-hell-orange transition-smooth p-6 aspect-square flex flex-col items-center justify-center"
            >
              <div className="text-4xl mb-3">{category.emoji}</div>
              <h3 className="text-lg font-bold text-hell-gold-soft text-center mb-2">
                {lang === 'es' ? category.name : category.nameEN}
              </h3>
              <p className="text-xs text-hell-text-secondary">
                {category.count} {lang === 'es' ? 'revelaciones' : 'revelations'}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
