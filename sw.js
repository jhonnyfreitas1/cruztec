cache_NAME = 'pwa=v1 - '+ new Date();

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cache_NAME).then(function(cache) {
      return cache.addAll([
      '/offline',
      '/',
      '/cobertura',
      '/planos',
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

self.addEventListener('fetch', function(event) {
  event.respondWith(async function() {
      try {
        return await fetch(event.request);
      } catch (err) {
          return caches.match('/offline');
      }
    }());
});