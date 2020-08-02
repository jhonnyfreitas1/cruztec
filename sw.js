cache_NAME = 'pwa=v1 - '+ new Date();

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cache_NAME).then(function(cache) {
      return cache.addAll([
    '/assets/css/planos.css',
    '/assets/css/cobertura.css',
    '/assets/css/main.css',
    '/assets/img/logo.png',
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
      if(cachedResponse){
        return cachedResponse;
      } 
      var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(cache_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
              console.log(`algo`)
            return response;
          }
        );
      })
    );
    });