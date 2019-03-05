// const cacheName = 'v1';

// const cacheAssets = [
//   'index.html',
//   'about.html',
//   '/css/style.css',
//   '/js/main.js'
// ];

// // * Call Install Event
// self.addEventListener('install', e => {
//   // testing
//   // console.log('Service Worker: Installed');
//   // * Want to handle caching these assets
//   e.waitUntil(
//     // * telling the browser to wait until the promise is finished
//     caches
//       .open(cacheName)
//       .then(cache => {
//         console.log('Service Worker: Caching Files');
//         cache.addAll(cacheAssets);
//       })
//       .then(() => self.skipWaiting())
//   );
// });

// // * Call Activate Event
// self.addEventListener('activate', e => {
//   console.log('Service Worker: Activated');
//   // * Remove unnecessary caches in storage
//   e.waitUntil(
//     caches.keys().then(cacheNames => {
//       // going to loop through the caches and going to have a condition that says
//       // "if the current cache isn't the cache that that is looping through the current
//       // iteration then want to delete it"
//       return Promise.all(
//         cacheNames.map(cache => {
//           if (cache !== cacheName) {
//             console.log('Service Worker: Clearing Old Cache');
//             return caches.delete(cache);
//           };
//         })
//       );
//     })
//   );
// });

// // * Call Fetch Event
// // When the request is made this should fire off and can intercept
// // it however we want (remember the image: service worker in between
// // chrome and the remote server)
// self.addEventListener('fetch', e => {
//   console.log('Server Worker: Fetching');
//   e.respondWith(
//     // Want to first check if the live site available.
//     // If not then want to load the cache site
//     fetch(e.request) // e.request => initial request
//       // If there is no connection then this is going to fail
//       // and since this returns a promise if it fails then it's
//       // going to be in the ".catch()"
//       .catch(() => {
//         caches.match(e.request);
//         // match() = Basically want to load from the cache 
//         // and want to an "e.request" which will be from the
//         // the cache so the files whatever we're looking for such
//         // as "index.html" and "about.html", it'll load it from the
//         // cache with the ".match()"
//       })
//   );
// });
