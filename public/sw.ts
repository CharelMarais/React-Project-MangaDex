/// <reference lib="webworker" />
/// <reference types="vite-plugin-pwa/client" />

declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<string | { url: string; revision: string | null }>;
};

import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

const handler = createHandlerBoundToURL('/index.html');
const navigationRoute = new NavigationRoute(handler);
registerRoute(navigationRoute);

// API Caching
registerRoute(
  ({ url }) => url.origin === 'https://api.mangadex.org',
  new NetworkFirst({
    cacheName: 'mangadex-api',
    plugins: [
      new CacheableResponsePlugin({ statuses: [0, 200] }),
      new ExpirationPlugin({ maxAgeSeconds: 86400 }),
    ],
  })
);

// Image caching
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 2592000 })],
  })
);

// Font caching (fixed origin check)
registerRoute(
  ({ url }) => url.pathname.endsWith('.woff2') && 
    url.origin === new URL(self.registration.scope).origin,
  new CacheFirst({
    cacheName: 'fonts',
    plugins: [new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 31536000 })],
  })
);

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Versioning with proper event type
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then(cacheNames => 
      Promise.all(
        cacheNames.map(cacheName => 
          cacheName.startsWith('mangadex-') && !cacheName.includes('v1.0') 
            ? caches.delete(cacheName) 
            : null
        )
      )
    )
  );
});