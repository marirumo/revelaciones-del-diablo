import { useEffect } from 'react';

export const usePWA = () => {
  useEffect(() => {

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
