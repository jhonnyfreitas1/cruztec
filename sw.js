const cache_NAME = 'pwa=v1 - '+ new Date();

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cache_NAME).then(function(cache) {
      return cache.addAll([
    '/assets/css/planos.css',
    '/assets/css/cobertura.css',
    '/assets/css/main.css',
    '/assets/img/logo.svg',
    '/index.html',
    '/manifest.json',
      ]);
    })
  );
});


self.addEventListener('activate', function activator(event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys
        .filter(function (key) {
          return key.indexOf(cache_NAME) !== 0;
        })
        .map(function (key) {
          return caches.delete(key);
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      return cachedResponse || fetch(event.request);
    })
  );
});