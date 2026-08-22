import { useState, useMemo } from 'react';
import { TopNav } from '../components/TopNav';
import { allRevelations, categories, categoryName } from '../data/revelations';

export const LibraryScreen = ({ lang = 'es', onNavigate, onSelectRevelation, onLanguageChange, dayIndex = 0 }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const isSearching = searchQuery.trim().length > 0;
  const unlockedCount = useMemo(() => allRevelations.filter(r => r.unlockDay <= dayIndex).length, [dayIndex]);

  const filteredRevelations = useMemo(() => {
    let result = allRevelations;

    // Buscar es intencional (el usuario ya sabe qué palabra quiere) — ahí sí
    // vale todo el diccionario. Pero navegar sin buscar es descubrir "lo que
    // hay", y eso compite directo con el desbloqueo diario de Home: se limita
    // a lo ya revelado desde la primera visita.
    if (!isSearching) {
      result = result.filter(r => r.unlockDay <= dayIndex);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(r => r.category === selectedCategory);
    }

    // Filter by search
    if (isSearching) {
      const query = searchQuery.toLowerCase();
      result = result.filter(r => {
        const wordES = r.wordES.toLowerCase();
        const wordEN = r.wordEN.toLowerCase();
        return wordES.includes(query) || wordEN.includes(query);
      });
    } else {
      result = [...result].sort((a, b) => b.unlockDay - a.unlockDay);
    }

    return result;
  }, [searchQuery, isSearching, selectedCategory, dayIndex]);

  const handleRevelationClick = (revelation) => {
    onSelectRevelation(revelation);
    onNavigate('home');
  };

  return (
    <div className="w-full min-h-screen bg-hell-bg">
      <TopNav
        title={lang === 'es' ? 'Biblioteca' : 'Library'}
        rightText={isSearching ? allRevelations.length : `${unlockedCount} / ${allRevelations.length}`}
        onBack={() => onNavigate('home')}
        lang={lang}
        onLanguageChange={onLanguageChange}
      />

      <div className="max-w-md lg:max-w-5xl mx-auto px-4 lg:px-8 pt-20 pb-6">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder={lang === 'es' ? '🔍 Buscar revelación...' : '🔍 Search revelation...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-hell-card border border-hell rounded-lg px-4 py-3 text-hell-gold placeholder-hell-text-secondary focus:outline-none focus:border-hell-orange focus:ring-1 focus:ring-hell-orange"
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-2 rounded-lg whitespace-nowrap font-bold transition-smooth text-sm ${
              selectedCategory === 'all'
                ? 'border-2 border-hell-orange text-hell-orange'
                : 'border border-hell-text-muted text-hell-text-secondary'
            }`}
          >
            {lang === 'es' ? 'Todas' : 'All'}
          </button>

          {categories.slice(0, 3).map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-2 rounded-lg whitespace-nowrap font-bold transition-smooth text-sm ${
                selectedCategory === cat.id
                  ? 'border-2 border-hell-orange text-hell-orange'
                  : 'border border-hell-text-muted text-hell-text-secondary'
              }`}
            >
              {cat.emoji} {lang === 'es' ? cat.name : cat.nameEN}
            </button>
          ))}

          <button
            onClick={() => onNavigate('categories')}
            className="px-3 py-2 rounded-lg whitespace-nowrap font-bold transition-smooth text-sm border border-hell-text-muted text-hell-text-secondary hover:border-hell-orange"
          >
            {lang === 'es' ? '+ Más' : '+ More'}
          </button>
        </div>

        {/* Aviso: en modo "explorar" (sin búsqueda) solo se ve lo ya desbloqueado */}
        {!isSearching && unlockedCount < allRevelations.length && (
          <p className="text-xs text-hell-text-muted mb-4">
            🔒 {allRevelations.length - unlockedCount} {lang === 'es'
              ? 'más por descubrir — o búscalas por nombre arriba'
              : 'more to discover — or search for them by name above'}
          </p>
        )}

        {/* Results */}
        {filteredRevelations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-hell-text-secondary">
              {isSearching
                ? (lang === 'es' ? 'No se encontraron revelaciones' : 'No revelations found')
                : (lang === 'es' ? 'Todavía no desbloqueas ninguna. Vuelve mañana o búscala por nombre.' : "You haven't unlocked any yet. Come back tomorrow or search for one by name.")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredRevelations.map((revelation) => (
              <button
                key={revelation.id}
                onClick={() => handleRevelationClick(revelation)}
                className="card-hell bg-hell-card/90 border-hell text-left hover:border-hell-orange transition-smooth p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-hell-orange font-bold mb-2">
                      #{revelation.number}
                    </p>
                    <h3 className="text-xl text-hell-gold-soft font-bold">
                      {lang === 'es' ? revelation.wordES : revelation.wordEN}
                    </h3>
                  </div>
                  <span className="text-xs text-hell-text-secondary">
                    {categoryName(revelation.category, lang)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
