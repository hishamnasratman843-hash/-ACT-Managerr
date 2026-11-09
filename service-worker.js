const CACHE_NAME = 'act-manager-shell-v8';
const APP_SHELL = ['./', './index.html', './style.css', './script.js', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];
const FIREBASE_CDN = 'https://www.gstatic.com';
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;
  const firebaseModule = url.origin === FIREBASE_CDN && url.pathname.endsWith('.js');
  if (!sameOrigin && !firebaseModule) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response && response.ok && (response.type === 'basic' || response.type === 'cors')) await cache.put(request, response.clone());
      return response;
    } catch (error) {
      if (sameOrigin) {
        const fallback = await cache.match('./index.html');
        if (fallback) return fallback;
      }
      throw error;
    }
  })());
});
