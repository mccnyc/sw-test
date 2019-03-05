// If you want to cache the entire response,
// can do that but do that in the actual fetch 
// because need to first fetch the response and
// then cache it

const cacheName = 'v2';

// * Call Install Event
self.addEventListener('install', e => {
  // testing - console.log
  console.log('Service Worker: Installed');
});

// * Call Activate Event
self.addEventListener('activate', e => {
  // testing - console.log
  console.log('Service Worker: Activated');
  // * Remove unnecessary caches in storage
  e.waitUntil(
    caches.keys().then(cacheNames => {
      // going to loop through the caches and going to have a condition that says
      // "if the current cache isn't the cache that that is looping through the current
      // iteration then want to delete it"
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            // testing - console.log
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          };
        })
      );
    })
  );
});

// * Call Fetch Event
// When the request is made this should fire off and can intercept
// it however we want (remember the image: service worker in between
// chrome and the remote server)

// one approach
self.addEventListener('fetch', e => {
  // testing - console.log
  console.log('Server Worker: Fetching');
  e.respondWith(
    fetch(e.request)
      .then(response => {
        // Make copy/clone of response
        const resClone = response.clone();
        // Open cache
        caches
          .open(cacheName)
          .then(cache => {
            // Add response to the cache
            cache.put(e.request, resClone); // put()
          });
        return response;
      }).catch(err => caches.match(e.request).then(response => response))
  );
});

// another approach
// self.addEventListener('fetch', e => {
//   // testing - console.log
//   console.log('Server Worker: Fetching');
//   e.respondWith(
//     caches.open(cacheName).then(cache => {
//       cache.match(e.request).then(cacheResponse => {
//         const networkFetch = fetch(e.request).then(networkResponse => {
//           cache.put(e.request, networkResponse.clone());
//           return networkResponse
//         });

//         return cacheResponse || networkFetch;
//       });
//     }).catch(error => {
//       console.log('error in cache open: ', error)
//     })
//   )
// });