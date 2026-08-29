import { useEffect } from 'react';
import { track } from './analytics';

export const usePWA = () => {
  useEffect(() => {
    // PRD §30: install_prompt_shown / pwa_installed — el navegador dispara
    // estos eventos independientemente de si la app ofrece un botón propio
    // de instalación; no interceptamos el prompt nativo, solo lo medimos.
    const handleBeforeInstallPrompt = () => track('install_prompt_shown');
    const handleAppInstalled = () => track('pwa_installed');
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js', { scope: '/' })
          .then((registration) => {
            console.log('✅ Service Worker registrado:', registration);

            // Escuchar actualizaciones
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              newWorker.addEventListener('statechange', () => {
                if (
                  newWorker.state === 'installed' &&
                  navigator.serviceWorker.controller
                ) {
                  console.log('📦 Nueva versión disponible');

                  if (
                    window.confirm(
                      'Nueva versión disponible. ¿Recargar?'
                    )
                  ) {
                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                    window.location.reload();
                  }
                }
              });
            });
          })
          .catch((error) => {
            console.warn('❌ Error al registrar Service Worker:', error);
          });
      });
    }

    // Detectar actualizaciones
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('🔄 Service Worker actualizado');
      });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);
};

// Detectar si está online/offline
export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = React.useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      console.log('🌐 Conexión restaurada');
    };

    const handleOffline = () => {
      setIsOnline(false);
      console.log('📡 Sin conexión');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};
