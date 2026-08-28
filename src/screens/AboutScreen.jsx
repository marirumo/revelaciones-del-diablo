export const AboutScreen = ({ lang = 'es' }) => {
  return (
    <div className="w-full min-h-screen bg-paper pb-20 pt-28">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <div className="border-t-[3px] border-ink pt-5">
          <p className="kicker mb-3">{lang === 'es' ? 'Colofón' : 'Colophon'}</p>

          <div className="flex items-baseline justify-between border-b border-ink pb-4 mb-8">
            <h1 className="font-display font-black uppercase text-4xl text-ink leading-none">
              Revelaciones
            </h1>
            <span className="font-nameplate text-[11px] text-sub tracking-wider">v1.0.0</span>
          </div>
        </div>

        <p className="font-serif italic text-lg text-sub mb-8">
          {lang === 'es' ? 'del Diablo' : 'of the Devil'}
        </p>

        <div className="max-w-2xl">
        <section className="border-t border-ink pt-4 mb-6">
          <h2 className="font-nameplate font-semibold text-[11px] tracking-widest uppercase text-sub mb-2">
            {lang === 'es' ? '¿Qué es esto?' : 'What is this?'}
          </h2>
          <p className="font-serif text-[15.5px] leading-relaxed text-ink">
            {lang === 'es'
              ? 'Una revelación satírica diaria inspirada en el Diccionario del Diablo de Ambrose Bierce. Cada edición numerada trae una palabra, una definición cínica y una reflexión incómoda sobre la realidad.'
              : "A daily satirical revelation inspired by Ambrose Bierce's Devil's Dictionary. Every numbered edition carries a word, a cynical definition, and an uncomfortable reflection on reality."}
          </p>
        </section>

        <section className="border-t border-ink/15 pt-4 mb-6">
          <h2 className="font-nameplate font-semibold text-[11px] tracking-widest uppercase text-sub mb-2">
            {lang === 'es' ? 'Sobre Bierce' : 'About Bierce'}
          </h2>
          <p className="font-serif text-[15.5px] leading-relaxed text-ink">
            {lang === 'es'
              ? 'Ambrose Gwinnett Bierce (1842–1914) fue un escritor, periodista y satírico estadounidense conocido por su sarcasmo cáustico y su Diccionario del Diablo (1881), una colección de más de mil definiciones satíricas.'
              : "Ambrose Gwinnett Bierce (1842–1914) was an American writer, journalist and satirist known for his caustic sarcasm and his Devil's Dictionary (1881), a collection of over a thousand satirical definitions."}
          </p>
        </section>

        <section className="border-t border-ink/15 pt-4 mb-6">
          <h2 className="font-nameplate font-semibold text-[11px] tracking-widest uppercase text-sub mb-3">
            {lang === 'es' ? 'Créditos' : 'Credits'}
          </h2>
          <dl className="space-y-2">
            <div className="flex items-baseline justify-between gap-3 border-b border-ink/15 pb-2">
              <dt className="font-nameplate text-[11px] uppercase text-sub">
                {lang === 'es' ? 'Diseño & desarrollo' : 'Design & development'}
              </dt>
              <dd className="font-serif italic text-sm text-ink text-right">
                {lang === 'es' ? 'Con Claude (Anthropic)' : 'Built with Claude (Anthropic)'}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-3 border-b border-ink/15 pb-2">
              <dt className="font-nameplate text-[11px] uppercase text-sub">GIFs</dt>
              <dd className="font-serif italic text-sm text-ink">Giphy</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="font-nameplate text-[11px] uppercase text-sub">
                {lang === 'es' ? 'Tipografía' : 'Typefaces'}
              </dt>
              <dd className="font-serif italic text-sm text-ink text-right">
                Playfair Display · Oswald
              </dd>
            </div>
          </dl>
        </section>

        <p className="font-nameplate text-[11px] text-sub border-t border-ink pt-4">
          {lang === 'es' ? 'Hecho en la Ciudad de México' : 'Made in Mexico City'}
        </p>
        </div>
      </div>
    </div>
  );
};
