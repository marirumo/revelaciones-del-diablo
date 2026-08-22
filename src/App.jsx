import './styles/globals.css';
import { AppRouter } from './components/AppRouter';
import { usePWA } from './lib/pwa';

export default function App() {
  // Registrar Service Worker para PWA
  usePWA();

  return (
    <div className="w-full h-full bg-hell-bg">
      <AppRouter />
    </div>
  );
}
