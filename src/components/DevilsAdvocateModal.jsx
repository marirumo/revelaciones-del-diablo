import { useState } from 'react';
import { classifyArgument, getAdvocateResponse } from '../data/devilsAdvocate';
import { track } from '../lib/analytics';

// Modal plano, sin sombras ni bordes redondeados — mismo sistema visual
// que el resto de la app (border-ink, sin glass, sin gradientes).
export const DevilsAdvocateModal = ({ lang = 'en', revelation = null, onClose }) => {
  const [opinion, setOpinion] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!opinion.trim()) return;
    track('devils_advocate_submitted', {
      argumentType: classifyArgument(opinion, lang),
      category: revelation?.category,
    });
    setResponse(getAdvocateResponse(opinion, lang, revelation));
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/60 flex items-center justify-center px-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={lang === 'es' ? 'Discutir con el Diablo' : "Argue with the Devil"}
        className="w-full max-w-md bg-paper border-2 border-ink p-6 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-baseline justify-between border-b border-ink pb-3 mb-5">
          <p className="kicker">
            {lang === 'es' ? 'El Abogado del Diablo' : "The Devil's Advocate"}
          </p>
          <button
            onClick={onClose}
            aria-label={lang === 'es' ? 'Cerrar' : 'Close'}
            className="font-nameplate text-[11px] tracking-widest uppercase text-sub hover:text-ink transition-smooth min-h-11 px-1"
          >
            {lang === 'es' ? 'Cerrar' : 'Close'} ✕
          </button>
        </div>

        {!response ? (
          <form onSubmit={handleSubmit}>
            <p className="font-serif italic text-[17px] leading-relaxed text-ink mb-4">
              {lang === 'es' ? '¿Quieres discutir con el Diablo?' : 'Do you want to argue with the Devil?'}
            </p>
            <label htmlFor="advocate-opinion" className="sr-only">
              {lang === 'es' ? 'Tu opinión' : 'Your opinion'}
            </label>
            <textarea
              id="advocate-opinion"
              value={opinion}
              onChange={(e) => setOpinion(e.target.value)}
              placeholder={lang === 'es' ? 'Escribe tu objeción…' : 'Write your objection…'}
              rows={3}
              autoFocus
              className="w-full bg-transparent border-b-2 border-ink px-1 py-2 font-serif italic text-ink placeholder-sub focus:outline-none focus:border-accent resize-none mb-5"
            />
            <button type="submit" className="byline-link" disabled={!opinion.trim()}>
              {lang === 'es' ? 'Enviar objeción' : 'Submit objection'}
            </button>
          </form>
        ) : (
          <div>
            <p className="font-nameplate text-[10px] tracking-widest uppercase text-sub mb-2">
              {lang === 'es' ? 'Responde el Diablo' : 'The Devil replies'}
            </p>
            <p className="font-serif text-[18px] leading-relaxed text-ink mb-6">
              "{response}"
            </p>
            <button onClick={onClose} className="byline-link">
              {lang === 'es' ? 'Cerrar' : 'Close'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
