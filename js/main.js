// * Make sure SW are supported
if ('serviceWorker' in navigator) { // or if(navigator.serviceworker) {}
  // testing
  // console.log('Service Worker Supported');
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw_cached_site.js')
      .then(reg => console.log('Service Worker: Registered'))
      .catch(err => console.log(`Service Worker: Error: ${err}`))
  });

}
//