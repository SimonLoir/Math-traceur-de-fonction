const name = 'swcache-00001';
//--Cache
/**
 * The install event is triggered by
 */
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(name).then(cache => {
            return cache.addAll([
                './',
                './index.html',
                './public/drawer.html',
                './dist/home.bundle.js',
                './dist/drawer.bundle.js',
                './images/site-header.jpg',
                './images/graph.jpg'
            ]);
        })
    );
    console.log('The service worker has been installed. Cache name : ' + name);
});

self.addEventListener('activate', () => {
    console.log('SW has been activated');
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(res => {
            if (res) {
                return res;
            } else {
                return fetch(e.request);
            }
        })
    );
});
