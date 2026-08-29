import { useMemo, useState } from 'react';
import { allRevelations, categories } from '../data/revelations';

const stripAccents = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// El Índice del Diablo — el corpus completo (956), sin el desbloqueo diario
// de Archivo: es referencia, no descubrimiento. Agrupado por número o por
// letra, como el índice de atrás de un diccionario real.
export const IndexScreen = ({ lang = 'en', onSelectRevelation }) => {
  const [mode, setMode] = useState('numeric'); // 'numeric' | 'alphabetic'
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    let result = allRevelations;
    if (category !== 'all') {
      result = result.filter(r => r.category === category);
    }
    if (query.trim()) {
      const q = stripAccents(query.toLowerCase());
      result = result.filter(r => {
        const w = stripAccents((lang === 'es' ? r.wordES : r.wordEN).toLowerCase());
        return w.includes(q);
      });
    }
    return result;
  }, [category, query, lang]);

  const groups = useMemo(() => {
    if (mode === 'numeric') {
      const buckets = {};
      filtered.forEach(r => {
        const bucketStart = Math.floor((r.number - 1) / 100) * 100 + 1;
        const key = String(bucketStart).padStart(3, '0');
        (buckets[key] ||= []).push(r);
      });
      return Object.entries(buckets)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([key, items]) => ({
          key,
          label: `${key}–${String(Math.min(Number(key) + 99, allRevelations.length)).padStart(3, '0')}`,
          items: [...items].sort((a, b) => a.number - b.number),
        }));
    }
    const buckets = {};
    filtered.forEach(r => {
      const word = lang === 'es' ? r.wordES : r.wordEN;
      const letter = stripAccents(word[0].toUpperCase());
      (buckets[letter] ||= []).push(r);
    });
    return Object.entries(buckets)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([letter, items]) => ({
        key: letter,
        label: letter,
        items: [...items].sort((a, b) => {
          const aw = lang === 'es' ? a.wordES : a.wordEN;
          const bw = lang === 'es' ? b.wordES : b.wordEN;
          return aw.localeCompare(bw, lang === 'es' ? 'es-ES' : 'en-US');
        }),
      }));
  }, [filtered, mode, lang]);

  return (
    <div className="w-full min-h-screen bg-paper pb-20 pt-28">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <div className="flex items-baseline justify-between border-t-[3px] border-b border-ink pt-5 pb-4 mb-5">
          <h1 className="font-nameplate font-semibold text-xl tracking-tight uppercase text-ink">
            {lang === 'es' ? 'El Índice del Diablo' : "The Devil's Index"}
          </h1>
          <span className="font-nameplate text-[11px] text-sub tracking-wider">
            {filtered.length} / {allRevelations.length}
          </span>
        </div>
        <p className="font-serif italic text-sub text-sm mb-8">
          {lang === 'es'
            ? 'El corpus completo, sin desbloqueo diario — para consultar, no para esperar.'
            : 'The full corpus, no daily unlock — for reference, not for waiting.'}
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-5">
          <div className="flex items-center gap-3 flex-none" role="group" aria-label={lang === 'es' ? 'Orden del índice' : 'Index order'}>
            <button
              onClick={() => setMode('numeric')}
              aria-pressed={mode === 'numeric'}
              className={`font-nameplate text-[11px] tracking-widest uppercase min-h-11 border-b transition-smooth ${mode === 'numeric' ? 'text-ink font-semibold border-accent' : 'text-sub border-transparent hover:text-ink'}`}
            >
              {lang === 'es' ? 'Numérico' : 'Numeric'}
            </button>
            <span className="text-sub" aria-hidden="true">/</span>
            <button
              onClick={() => setMode('alphabetic')}
              aria-pressed={mode === 'alphabetic'}
              className={`font-nameplate text-[11px] tracking-widest uppercase min-h-11 border-b transition-smooth ${mode === 'alphabetic' ? 'text-ink font-semibold border-accent' : 'text-sub border-transparent hover:text-ink'}`}
            >
              {lang === 'es' ? 'Alfabético' : 'Alphabetic'}
            </button>
          </div>

          <label htmlFor="index-search" className="sr-only">
            {lang === 'es' ? 'Buscar en el índice' : 'Search the index'}
          </label>
          <input
            id="index-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === 'es' ? 'Buscar una palabra…' : 'Search a word…'}
            className="flex-1 min-w-[160px] bg-transparent border-b-2 border-ink px-1 py-2 font-serif italic text-sm text-ink placeholder-sub focus:outline-none focus:border-accent"
          />
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-3 mb-6 border-b border-ink/15 pb-4">
          <button
            onClick={() => setCategory('all')}
            className={`font-nameplate text-[11px] tracking-widest uppercase min-h-11 border-b transition-smooth ${
              category === 'all' ? 'text-ink font-semibold border-accent' : 'text-sub border-transparent hover:text-ink'
            }`}
          >
            {lang === 'es' ? 'Todas' : 'All'}
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`font-nameplate text-[11px] tracking-widest uppercase min-h-11 border-b transition-smooth flex items-center gap-1.5 ${
                category === cat.id ? 'text-ink font-semibold border-accent' : 'text-sub border-transparent hover:text-ink'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{lang === 'es' ? cat.name : cat.nameEN}</span>
            </button>
          ))}
        </div>

        {/* Riel de salto — ancla directo al bloque numérico o a la letra */}
        {groups.length > 1 && (
          <nav
            aria-label={lang === 'es' ? 'Saltar a…' : 'Jump to…'}
            className="flex flex-wrap gap-x-1 gap-y-1 mb-6 font-nameplate text-[10px] tracking-wider border-t border-ink pt-3"
          >
            {groups.map(g => (
              <a
                key={g.key}
                href={`#idx-${g.key}`}
                className="text-sub hover:text-ink px-1.5 min-h-11 inline-flex items-center"
              >
                {g.key}
              </a>
            ))}
          </nav>
        )}

        {groups.length === 0 ? (
          <p className="font-serif italic text-sub py-12 text-center">
            {lang === 'es' ? 'No se encontraron revelaciones.' : 'No revelations found.'}
          </p>
        ) : (
          groups.map(group => (
            <section key={group.key} id={`idx-${group.key}`} className="mb-8 scroll-mt-24">
              <h2 className="font-display font-black text-2xl text-ink border-b border-ink mb-3 pb-1">
                {group.label}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4">
                {group.items.map(r => (
                  <button
                    key={r.id}
                    onClick={() => onSelectRevelation(r)}
                    className="group flex items-baseline gap-2 py-1.5 text-left border-b border-ink/15 min-h-11"
                  >
                    <span className="font-nameplate text-[10px] text-sub flex-none">
                      {String(r.number).padStart(3, '0')}
                    </span>
                    <span className="font-serif text-[14px] text-ink group-hover:text-accent transition-smooth truncate">
                      {lang === 'es' ? r.wordES : r.wordEN}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
};
