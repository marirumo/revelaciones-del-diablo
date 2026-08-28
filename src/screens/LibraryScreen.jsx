import { useState, useMemo } from 'react';
import { allRevelations, categories, categoryName } from '../data/revelations';

export const LibraryScreen = ({ lang = 'en', onSelectRevelation, dayIndex = 0 }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const isSearching = searchQuery.trim().length > 0;
  const unlockedCount = useMemo(() => allRevelations.filter(r => r.unlockDay <= dayIndex).length, [dayIndex]);

  const filteredRevelations = useMemo(() => {
    let result = allRevelations;

    // Buscar es intencional (el usuario ya sabe qué palabra quiere) — ahí sí
    // vale todo el diccionario. Pero navegar sin buscar es descubrir "lo que
    // hay", y eso compite directo con el desbloqueo diario de Hoy: se limita
    // a lo ya revelado desde la primera visita.
    if (!isSearching) {
      result = result.filter(r => r.unlockDay <= dayIndex);
    }

    if (selectedCategory !== 'all') {
      result = result.filter(r => r.category === selectedCategory);
    }

    if (isSearching) {
      const query = searchQuery
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      result = result.filter(r => {
        const wordES = r.wordES.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const wordEN = r.wordEN.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return wordES.includes(query) || wordEN.includes(query);
      });
    } else {
      result = [...result].sort((a, b) => b.unlockDay - a.unlockDay);
    }

    return result;
  }, [searchQuery, isSearching, selectedCategory, dayIndex]);

  const handleRevelationClick = (revelation) => {
    onSelectRevelation(revelation);
  };

  return (
    <div className="w-full min-h-screen bg-paper pb-20 pt-28">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <div className="flex items-baseline justify-between border-t-[3px] border-b border-ink pt-5 pb-4 mb-8">
          <h1 className="font-nameplate font-semibold text-xl tracking-tight uppercase text-ink">
            {lang === 'es' ? 'El Archivo' : 'The Archive'}
          </h1>
          <span className="font-nameplate text-[11px] text-sub tracking-wider">
            {isSearching ? allRevelations.length : `${unlockedCount} / ${allRevelations.length}`}
          </span>
        </div>

        {/* Search — un renglón subrayado, no una barra flotante */}
        <div className="mb-5">
          <label htmlFor="archive-search" className="sr-only">
            {lang === 'es' ? 'Buscar revelación' : 'Search revelation'}
          </label>
          <input
            id="archive-search"
            type="text"
            placeholder={lang === 'es' ? 'Buscar una palabra…' : 'Search a word…'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-b-2 border-ink px-1 py-2.5 font-serif italic text-ink placeholder-sub focus:outline-none focus:border-accent"
          />
        </div>

        {/* Sections — palabras planas, la activa subrayada en acento */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-6 border-b border-ink/15 pb-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`font-nameplate text-[11px] tracking-widest uppercase min-h-11 border-b transition-smooth ${
              selectedCategory === 'all' ? 'text-ink font-semibold border-accent' : 'text-sub border-transparent hover:text-ink'
            }`}
          >
            {lang === 'es' ? 'Todas' : 'All'}
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`font-nameplate text-[11px] tracking-widest uppercase min-h-11 border-b transition-smooth ${
                selectedCategory === cat.id ? 'text-ink font-semibold border-accent' : 'text-sub border-transparent hover:text-ink'
              }`}
            >
              {lang === 'es' ? cat.name : cat.nameEN}
            </button>
          ))}
        </div>

        {!isSearching && unlockedCount < allRevelations.length && (
          <p className="font-nameplate text-[11px] text-sub mb-4">
            {allRevelations.length - unlockedCount} {lang === 'es'
              ? 'todavía sin publicar — o búscalas por nombre arriba'
              : 'not yet in print — or search for them by name above'}
          </p>
        )}

        {filteredRevelations.length === 0 ? (
          <p className="font-serif italic text-sub py-12 text-center">
            {isSearching
              ? (lang === 'es' ? 'No se encontraron revelaciones.' : 'No revelations found.')
              : (lang === 'es' ? 'Todavía no desbloqueas ninguna. Vuelve mañana o búscala por nombre.' : "You haven't unlocked any yet. Come back tomorrow or search for one by name.")}
          </p>
        ) : (
          <div>
            {filteredRevelations.map((revelation) => (
              <button
                key={revelation.id}
                onClick={() => handleRevelationClick(revelation)}
                className="index-row group"
              >
                <span className="font-nameplate text-[11px] text-sub w-10 flex-none">
                  {String(revelation.number).padStart(3, '0')}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="font-serif font-bold text-lg text-ink group-hover:text-accent transition-smooth block truncate">
                    {lang === 'es' ? revelation.wordES : revelation.wordEN}
                  </span>
                </span>
                <span className="font-nameplate text-[9.5px] tracking-widest uppercase text-sub flex-none">
                  {categoryName(revelation.category, lang)}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
