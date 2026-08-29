import { useState, useEffect } from 'react';
import { getAllFavorites } from '../lib/storage';
import { categoryName } from '../data/revelations';

export const FavoritesScreen = ({ lang = 'en', onSelectRevelation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        const fav = await getAllFavorites();
        fav.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
        setFavorites(fav);
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const handleFavoriteClick = (favorite) => {
    onSelectRevelation(favorite.revelation);
  };

  const handleExportTxt = () => {
    if (favorites.length === 0) return;

    const dateStr = new Date().toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US');
    let content = `==================================================\n`;
    content += `   REVELACIONES DEL DIABLO — ${lang === 'es' ? 'PRONTUARIO DE CARGOS' : 'RAP SHEET OF INDICTMENTS'}\n`;
    content += `   ${lang === 'es' ? 'Fecha de emisión' : 'Issued date'}: ${dateStr}\n`;
    content += `   ${lang === 'es' ? 'Cargos acumulados' : 'Accumulated offenses'}: ${favorites.length}\n`;
    content += `==================================================\n\n`;

    favorites.forEach((fav, index) => {
      const rev = fav.revelation;
      const word = lang === 'es' ? rev.wordES : rev.wordEN;
      const bierce = lang === 'es' ? rev.biercES : rev.biercEN;
      const revelationText = lang === 'es' ? rev.revelationES : rev.revelationEN;
      const cat = categoryName(rev.category, lang, true);
      const savedDate = fav.savedAt ? new Date(fav.savedAt).toLocaleDateString(lang === 'es' ? 'es-MX' : 'en-US') : '';

      content += `[CARGO #${String(index + 1).padStart(2, '0')}] ${word.toUpperCase()} (${cat.toUpperCase()})\n`;
      content += `Cita de Ambrose Bierce: "${bierce}"\n`;
      content += `Revelación: ${revelationText}\n`;
      if (savedDate) {
        content += `Confesado el: ${savedDate}\n`;
      }
      content += `\n--------------------------------------------------\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prontuario-recortes-del-diablo.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getTimeSince = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (lang === 'es') {
      if (seconds < 60) return 'hace poco';
      if (seconds < 3600) return `hace ${Math.floor(seconds / 60)} min`;
      if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)}h`;
      if (seconds < 2592000) return `hace ${Math.floor(seconds / 86400)}d`;
      return date.toLocaleDateString('es-MX');
    }
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString('en-US');
  };

  return (
    <div className="w-full min-h-screen bg-paper pb-20 pt-28">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <div className="flex items-baseline justify-between border-t-[3px] border-b border-ink pt-5 pb-4 mb-5">
          <h1 className="font-nameplate font-semibold text-xl tracking-tight uppercase text-ink">
            {lang === 'es' ? 'Prontuario de Cargos' : 'Rap Sheet of Indictments'}
          </h1>
          <span className="font-nameplate text-[11px] text-sub tracking-wider">
            {favorites.length} {lang === 'es' ? 'cargos' : 'charges'}
          </span>
        </div>
        <p className="font-serif italic text-sub text-sm mb-8">
          {lang === 'es'
            ? 'Evidencia incriminatoria de las verdades que te resultaron demasiado ciertas para ignorarlas.'
            : 'Incriminating evidence of the truths you found too real to ignore.'}
        </p>

        {loading ? (
          <p className="font-nameplate text-sub text-sm py-12 text-center">
            {lang === 'es' ? 'Cargando expediente…' : 'Loading rap sheet…'}
          </p>
        ) : favorites.length === 0 ? (
          <div className="py-12 text-center">
            <p className="font-serif italic text-ink mb-2">
              {lang === 'es' ? 'Tu expediente está sospechosamente impoluto.' : 'Your record is suspiciously clean.'}
            </p>
            <p className="font-nameplate text-[12px] text-sub">
              {lang === 'es'
                ? 'Marca alguna verdad con "Esta me llegó" para confesar tus inclinaciones cínicas.'
                : 'Mark a truth with "This one stung" to confess your cynical leanings.'}
            </p>
          </div>
        ) : (
          <div>
            {favorites.map((favorite) => (
              <button
                key={favorite.id}
                onClick={() => handleFavoriteClick(favorite)}
                className="index-row group items-start"
              >
                <span className="font-nameplate text-[10px] text-sub w-20 flex-none pt-1">
                  {getTimeSince(favorite.savedAt)}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="font-serif font-bold text-lg text-ink group-hover:text-accent transition-smooth block">
                    {lang === 'es' ? favorite.revelation.wordES : favorite.revelation.wordEN}
                  </span>
                  <span className="font-serif italic text-[13px] text-sub block mt-0.5 line-clamp-1">
                    {lang === 'es' ? favorite.revelation.revelationES : favorite.revelation.revelationEN}
                  </span>
                </span>
                <span className="font-nameplate text-[9.5px] tracking-widest uppercase text-sub flex-none pt-1">
                  {categoryName(favorite.category, lang, true)}
                </span>
              </button>
            ))}
          </div>
        )}

        {favorites.length > 0 && (
          <div className="mt-8 border-t border-ink pt-6 flex justify-start">
            <button onClick={handleExportTxt} className="byline-link">
              {lang === 'es' ? 'Exportar recortes (.txt)' : 'Export clippings (.txt)'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
