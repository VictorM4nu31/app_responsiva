// Asignar nombre y versión de la cache
const CACHE_NAME = 'v1_cache_VictorManuelAngelesMuthePWA';

// Ficheros a cachear en la aplicación
const urlsToCache = [
    './',
    './styles.css',
    './favicon/android-chrome-192x192.png',
    './favicon/android-chrome-512x512.png',
    './favicon/favicon-16x16.png',
    './favicon/favicon-32x32.png',
    './img/brujulas.png',
    './img/consola-de-juego.png',
    './img/facebook.png',
    './img/fondo.jpg',
    './img/helicoptero.png',
    './img/instagram.png',
    './img/servicio.png',
    './img/twiter.png',
    './img/ubicacion.png',
    './img/wallpaperbetter.com_1920x1200.jpg',
];

// Evento `install`
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache)
                    .then(() => {
                        self.skipWaiting(); // Forzar la activación inmediata del SW
                    });
            })
            .catch((err) => console.error('No se registró en la cache', err))
    );
});

// Evento `activate`
self.addEventListener('activate', (e) => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (!cacheWhitelist.includes(cacheName)) {
                            // Borrar caches que no están en la lista blanca
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                // Activar la cache inmediatamente
                self.clients.claim();
            })
    );
});

// Evento `fetch`
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then((res) => {
                if (res) {
                    return res; // Responder desde la cache
                }
                return fetch(e.request); // Hacer la solicitud a la red
            })
            .catch((err) => console.error('Error en el fetch', err)) // Manejo de errores
    );
});
