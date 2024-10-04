const CACHE_NAME = 'M Nugraha Patria';
const assets = [
  '/',
  '/navbar.html',
  '/about.html',
  '/contact.html',
  '/offline.html',
  '/app.js',
  '/Logo-Unand-PTNBH-kecil.png',
  '/kepalalkmmtd.png'
];

// Install service worker
self.addEventListener("install", () => {
  console.log("Service Worker installed")
  e.waitUntil((async () => {
      const cache = await caches.open(CACHE_NAME)
      cache.addAll(preCache)
    })(),
  )  
})


// Activate service worker
self.addEventListener('activate', () => {
  console.log("Service Worker activated");
});

// Fetch event
self.addEventListener('fetch', (e) => {
  e.respondWith((async () =>{
    const cache = await caches.open(CACHE_NAME)
    const resCache = await cache.match(e.request)

    if(resCache) return resCache

    try{
      const res = await fetch(e.request)

      cache.put(e.request,res.clone())
      return res
    } catch (error) {
      console.log(error)
    }
  })())
})

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
              console.log('ServiceWorker berhasil terdaftar:', registration);
          })
          .catch(error => {
              console.log('ServiceWorker gagal terdaftar:', error);
          });
  });
}