const CACHE_NAME = 'revelaciones-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache abierto');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('No se pudieron cachear algunos assets:', err);
        // Continuar sin error - los assets se cachearán on-demand
      });
    })
  );
  self.skipWaiting();
});

// Activar Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker activado');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Borrando cache viejo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estrategia: Network first, fallback a cache
self.addEventListener('fetch', (event) => {
  // Solo cachear GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  const { request } = event;
  const url = new URL(request.url);

  // No cachear llamadas a APIs externas (Giphy)
  if (url.hostname !== self.location.hostname) {
    return;
  }

  event.respondWith(
    // Intentar red primero
    fetch(request)
      .then((response) => {
        // Si es exitoso, guardar en cache
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Si la red falla, intentar cache
        return caches.match(request).then((response) => {
          if (response) {
            return response;
          }

          // Si no está en cache y es una página, devolver offline page
          if (request.destination === 'document') {
            return caches.match('/index.html');
          }

          return new Response('Offline - No hay contenido disponible', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain',
            }),
          });
        });
      })
  );
});

// Actualización en background
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
