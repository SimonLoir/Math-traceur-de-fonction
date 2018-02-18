const name = 'swcache-14';//--Cache
// Good starting point for service workers cache management :
// https://www.safaribooksonline.com/library/view/building-progressive-web/9781491961643/ch04.html

/**
 * The install event is triggered by
 */
self.addEventListener('install', event => {
    console.log('The service worker has been installed. Cache name : ' + name);
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
});

self.addEventListener('activate', function(event) {
    console.log('activated and removes other caches');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (name != cacheName) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(res => {
            if (res && navigator.onLine == false) {
                console.log('Resource loaded from cache');
                return res;
            } else {
                console.log('Recource loaded from the network');
                return fetch(e.request);
            }
        })
    );
});
