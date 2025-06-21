// This service worker can be customized:
// https://developers.google.com/web/tools/workbox/modules

declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'raj-photo-studio-cache-v1';

// Assets to precache
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/icons/favicon.ico',
];

// Assets that we want to cache when first used
const RUNTIME_CACHE_PATTERNS = [
  /\.(?:js|css)$/,      // JS and CSS files
  /\.(?:png|jpg|jpeg|gif|webp|svg)$/,  // Images
  /^https:\/\/fonts\.googleapis\.com/, // Google Fonts
];

// Install event - precache key assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
    }).then((cachesToDelete) => {
      return Promise.all(cachesToDelete.map((cacheToDelete) => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache if available, otherwise fetch from network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (
    event.request.url.startsWith(self.location.origin) || 
    RUNTIME_CACHE_PATTERNS.some(pattern => pattern.test(event.request.url))
  ) {
    // For HTML pages, use network-first strategy
    if (event.request.mode === 'navigate') {
      event.respondWith(
        fetch(event.request)
          .then((response) => {
            // Cache a copy of the response
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
            return response;
          })
          .catch(() => {
            // If network fetch fails, try from cache
            return caches.match(event.request).then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // Return the offline page for navigation requests
              return caches.match('/');
            });
          })
      );
    } else {
      // For assets, use cache-first strategy
      event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // If not in cache, fetch from network
          return fetch(event.request).then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cache a copy of the response
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
            return response;
          });
        })
      );
    }
  }
}); 