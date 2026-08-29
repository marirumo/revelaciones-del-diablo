import { useEffect, useMemo, useState } from 'react';
import { allRevelations, categories, categoryName } from '../data/revelations';
import { track } from '../lib/analytics';

const stripAccents = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// The Index of Defeats (PRD §10) — fusiona lo que antes eran dos pantallas
// (Archive + Index): un mismo corpus, con un toggle de alcance (solo lo
// desbloqueado día a día, o las 956 completas) y tres órdenes (edición,
// numérico, alfabético). Buscar siempre corre sobre el corpus completo —
// si ya sabés qué palabra querés, no tiene sentido que el desbloqueo
// diario te la esconda.
export const IndexScreen = ({ lang = 'en', onSelectRevelation, dayIndex = 0 }) => {
  const [scope, setScope] = useState('unlocked'); // 'unlocked' | 'all'
  const [order, setOrder] = useState('newest'); // 'newest' | 'numeric' | 'alphabetic'
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const isSearching = query.trim().length > 0;
  const unlockedCount = useMemo(() => allRevelations.filter(r => r.unlockDay <= dayIndex).length, [dayIndex]);

  useEffect(() => {
    if (!isSearching) return;
    const timeout = setTimeout(() => track('archive_searched', { query: query.trim() }), 300);
    return () => clearTimeout(timeout);
  }, [query, isSearching]);

  const filtered = useMemo(() => {
    let result = allRevelations;

    if (!isSearching && scope === 'unlocked') {
      result = result.filter(r => r.unlockDay <= dayIndex);
    }

    if (category !== 'all') {
      result = result.filter(r => r.category === category);
    }

    if (isSearching) {
      const q = stripAccents(query.toLowerCase());
      result = result.filter(r => {
        const w = stripAccents((lang === 'es' ? r.wordES : r.wordEN).toLowerCase());
        return w.includes(q);
      });
    }

    return result;
  }, [scope, category, query, isSearching, dayIndex, lang]);

  const flatList = useMemo(() => {
    if (order !== 'newest') return [];
    return [...filtered].sort((a, b) => b.unlockDay - a.unlockDay);
  }, [filtered, order]);

  const groups = useMemo(() => {
    if (order === 'newest') return null;

    if (order === 'numeric') {
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
  }, [filtered, order, lang]);

  const progressLabel = isSearching
    ? `${filtered.length} / ${allRevelations.length}`
    : scope === 'unlocked'
      ? `${unlockedCount} / ${allRevelations.length}`
      : `${allRevelations.length} / ${allRevelations.length}`;

  const isEmpty = order === 'newest' ? flatList.length === 0 : groups.length === 0;

  return (
    <div className="w-full min-h-screen bg-paper pb-20 pt-28">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <div className="flex items-baseline justify-between border-t-[3px] border-b border-ink pt-5 pb-4 mb-5">
          <h1 className="font-nameplate font-semibold text-xl tracking-tight uppercase text-ink">
            {lang === 'es' ? 'El Índice de las Derrotas' : 'The Index of Defeats'}
          </h1>
          <span className="font-nameplate text-[11px] text-sub tracking-wider">
            {progressLabel}
          </span>
        </div>
        <p className="font-serif italic text-sub text-sm mb-8">
          {lang === 'es'
            ? 'Todo lo que ya desbloqueaste, o el corpus completo — tú decides.'
            : "Everything you've unlocked so far, or the full corpus — your call."}
        </p>

        {/* Alcance — se oculta al buscar, porque buscar siempre corre sobre todo el corpus */}
        {isSearching ? (
          <p className="font-nameplate text-[10px] tracking-widest uppercase text-sub mb-5">
            {lang === 'es' ? 'Buscando en todo el corpus' : 'Searching the full corpus'}
          </p>
        ) : (
          <div className="flex items-center gap-3 mb-5" role="group" aria-label={lang === 'es' ? 'Alcance' : 'Scope'}>
            <button
              onClick={() => setScope('unlocked')}
              aria-pressed={scope === 'unlocked'}
              className={`font-nameplate text-[11px] tracking-widest uppercase min-h-11 border-b transition-smooth ${scope === 'unlocked' ? 'text-ink font-semibold border-accent' : 'text-sub border-transparent hover:text-ink'}`}
            >
              {lang === 'es' ? 'Desbloqueadas' : 'Unlocked'}
            </button>
            <span className="text-sub" aria-hidden="true">/</span>
            <button
              onClick={() => setScope('all')}
              aria-pressed={scope === 'all'}
              className={`font-nameplate text-[11px] tracking-widest uppercase min-h-11 border-b transition-smooth ${scope === 'all' ? 'text-ink font-semibold border-accent' : 'text-sub border-transparent hover:text-ink'}`}
            >
              {lang === 'es' ? 'Todo el Corpus' : 'Full Corpus'}
            </button>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 mb-5">
          <div className="flex items-center gap-3 flex-none" role="group" aria-label={lang === 'es' ? 'Orden' : 'Order'}>
            <button
              onClick={() => setOrder('newest')}
              aria-pressed={order === 'newest'}
              className={`font-nameplate text-[11px] tracking-widest uppercase min-h-11 border-b transition-smooth ${order === 'newest' ? 'text-ink font-semibold border-accent' : 'text-sub border-transparent hover:text-ink'}`}
            >
              {lang === 'es' ? 'Recientes' : 'Newest'}
            </button>
            <span className="text-sub" aria-hidden="true">/</span>
            <button
              onClick={() => setOrder('numeric')}
              aria-pressed={order === 'numeric'}
              className={`font-nameplate text-[11px] tracking-widest uppercase min-h-11 border-b transition-smooth ${order === 'numeric' ? 'text-ink font-semibold border-accent' : 'text-sub border-transparent hover:text-ink'}`}
            >
              {lang === 'es' ? 'Numérico' : 'Numeric'}
            </button>
            <span className="text-sub" aria-hidden="true">/</span>
            <button
              onClick={() => setOrder('alphabetic')}
              aria-pressed={order === 'alphabetic'}
              className={`font-nameplate text-[11px] tracking-widest uppercase min-h-11 border-b transition-smooth ${order === 'alphabetic' ? 'text-ink font-semibold border-accent' : 'text-sub border-transparent hover:text-ink'}`}
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

        {!isSearching && scope === 'unlocked' && unlockedCount < allRevelations.length && (
          <p className="font-nameplate text-[11px] text-sub mb-4">
            {allRevelations.length - unlockedCount} {lang === 'es'
              ? 'todavía sin publicar — o búscalas por nombre arriba'
              : 'not yet in print — or search for them by name above'}
          </p>
        )}

        {/* Riel de salto — solo tiene sentido agrupado por número o letra */}
        {order !== 'newest' && groups.length > 1 && (
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

        {isEmpty ? (
          <p className="font-serif italic text-sub py-12 text-center">
            {isSearching
              ? (lang === 'es' ? 'No se encontraron revelaciones.' : 'No revelations found.')
              : scope === 'unlocked'
                ? (lang === 'es' ? 'Todavía no desbloqueas ninguna. Vuelve mañana o búscala por nombre.' : "You haven't unlocked any yet. Come back tomorrow or search for one by name.")
                : (lang === 'es' ? 'No se encontraron revelaciones.' : 'No revelations found.')}
          </p>
        ) : order === 'newest' ? (
          <div>
            {flatList.map((revelation) => (
              <button
                key={revelation.id}
                onClick={() => onSelectRevelation(revelation)}
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
                  {categoryName(revelation.category, lang, true)}
                </span>
              </button>
            ))}
          </div>
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
