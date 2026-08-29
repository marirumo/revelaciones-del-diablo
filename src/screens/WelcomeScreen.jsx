export const WelcomeScreen = ({ lang = 'en', onComplete }) => {
  const labels = lang === 'es'
    ? {
        tagline: 'Una verdad incómoda cada día, directo del Diccionario del Diablo.',
        ritual: 'Guarda las que te incomoden. Vuelve mañana por otra.',
        cta: 'Abrir la edición de hoy',
      }
    : {
        tagline: "One uncomfortable truth a day, straight from the Devil's Dictionary.",
        ritual: 'Save the ones that sting. Come back tomorrow for another.',
        cta: "Open today's edition",
      };

  return (
    <div className="w-full min-h-screen bg-paper flex items-center justify-center px-5">
      <div className="w-full max-w-md border-t-[3px] border-ink">
        <div className="text-center py-10 px-2">
          <p className="kicker mb-6">
            {lang === 'es' ? 'Primera edición' : 'First edition'}
          </p>

          <h1 className="font-display font-black uppercase text-ink leading-[0.92] text-[clamp(2.2rem,9vw,3.1rem)] mb-1 text-balance">
            {lang === 'es' ? 'Revelaciones' : "Devil's"}
          </h1>
          <h1 className="font-display font-black uppercase text-ink leading-[0.92] text-[clamp(2.2rem,9vw,3.1rem)] mb-6">
            {lang === 'es' ? 'del Diablo' : 'Revelations'}
          </h1>

          <hr className="border-ink w-16 mx-auto mb-6" />

          <p className="font-serif italic text-[17px] leading-relaxed text-ink max-w-[34ch] mx-auto mb-3">
            {labels.tagline}
          </p>

          <p className="font-nameplate text-[11px] tracking-wide text-sub max-w-[32ch] mx-auto mb-10">
            {labels.ritual}
          </p>

          <button onClick={onComplete} className="byline-link text-[13px]">
            {labels.cta} →
          </button>
        </div>
      </div>
    </div>
  );
};
