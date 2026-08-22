import { TopNav } from '../components/TopNav';

export const AboutScreen = ({ lang = 'es', onNavigate, onLanguageChange }) => {
  return (
    <div className="w-full min-h-screen bg-hell-bg">
      <TopNav
        title={lang === 'es' ? 'Acerca de' : 'About'}
        onBack={() => onNavigate('home')}
        lang={lang}
        onLanguageChange={onLanguageChange}
      />

      <div className="max-w-md lg:max-w-2xl mx-auto px-4 lg:px-8 pt-20 pb-10">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">😈</div>
          <h1 className="text-4xl font-black text-hell-gold mb-2">
            Revelaciones
          </h1>
          <p className="text-hell-orange mb-2">
            {lang === 'es' ? 'del Diablo' : 'of the Devil'}
          </p>
          <p className="text-xs text-hell-text-muted">v1.0.0</p>
        </div>

        {/* Description */}
        <div className="card-hell bg-hell-card/90 border-hell mb-6 p-6">
          <h2 className="text-hell-gold font-bold mb-3">
            {lang === 'es' ? '¿Qué es esto?' : 'What is this?'}
          </h2>
          <p className="text-sm text-hell-gold-soft leading-relaxed">
            {lang === 'es'
              ? 'Una app diaria de revelaciones satíricas inspiradas en el Diccionario del Diablo de Ambrose Bierce. Diseñada para que reflexiones sobre la naturaleza incómoda de la realidad, con una sonrisa.'
              : "A daily app of satirical revelations inspired by Ambrose Bierce's Devil's Dictionary. Built to make you reflect on the uncomfortable nature of reality, with a smile."}
          </p>
        </div>

        {/* Bierce */}
        <div className="card-hell bg-hell-card/90 border-hell mb-6 p-6">
          <h2 className="text-hell-gold font-bold mb-3">
            {lang === 'es' ? 'Sobre Bierce' : 'About Bierce'}
          </h2>
          <p className="text-sm text-hell-gold-soft leading-relaxed">
            {lang === 'es'
              ? 'Ambrose Gwinnett Bierce (1842-1914) fue un escritor, periodista y satírico estadounidense conocido por su sarcasmo cáustico y su genial Diccionario del Diablo (1881), una colección de más de 1000 definiciones satíricas.'
              : "Ambrose Gwinnett Bierce (1842-1914) was an American writer, journalist and satirist known for his caustic sarcasm and his brilliant Devil's Dictionary (1881), a collection of over 1000 satirical definitions."}
          </p>
        </div>

        {/* Credits */}
        <div className="mb-6">
          <h2 className="text-hell-gold font-bold mb-3">
            {lang === 'es' ? 'Créditos' : 'Credits'}
          </h2>
          <div className="space-y-3">
            <div className="card-hell bg-hell-card/90 border-hell p-4">
              <p className="text-hell-gold-soft font-bold text-sm">
                {lang === 'es' ? 'Diseño & Desarrollo' : 'Design & Development'}
              </p>
              <p className="text-hell-text-secondary text-xs">
                {lang === 'es' ? 'En colaboración con Claude (Anthropic)' : 'Built in collaboration with Claude (Anthropic)'}
              </p>
            </div>

            <div className="card-hell bg-hell-card/90 border-hell p-4">
              <p className="text-hell-gold-soft font-bold text-sm">GIFs</p>
              <p className="text-hell-text-secondary text-xs">Powered by Giphy</p>
            </div>

            <div className="card-hell bg-hell-card/90 border-hell p-4">
              <p className="text-hell-gold-soft font-bold text-sm">
                {lang === 'es' ? 'Fuentes' : 'Fonts'}
              </p>
              <p className="text-hell-text-secondary text-xs">System Font Stack</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mb-6">
          <p className="text-xs text-hell-text-secondary">
            {lang === 'es' ? 'Hecho con 🔥 en la Ciudad de México' : 'Made with 🔥 in Mexico City'}
          </p>
        </div>

        {/* Link */}
        <button className="w-full btn-hell-primary">
          ↗ {lang === 'es' ? 'Visita el Diccionario Original' : 'Visit the Original Dictionary'}
        </button>
      </div>
    </div>
  );
};
