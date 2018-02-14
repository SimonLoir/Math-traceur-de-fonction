self.addEventListener('install', event => {
    console.log('SW has been installed');
    event.waitUntil(
        caches.open('static').then(cache => {
            cache.addAll([
                './',
                './index.html',
                './manifest.json',
                './public/drawer.html',
                './dist/home.bundle.js',
                './dist/drawer.bundle.js',
                './images/site-header.jpg',
                './images/graph.jpg'
            ]);
        })
    );
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
