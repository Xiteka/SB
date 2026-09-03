const CACHE_NAME = "studentbevis-v5";

const filesToCache = [
    "./",
    "./index.html",
    "./styles.css",
    "./script.js",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png",
    "./LogoSikt.png",
    "./pic.jpeg",
    "./icon-fodselsdato.png",
    "./icon-studentnr.png",
    "./icon-studiested.png"
];


// Install new version
self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(filesToCache);
            })

    );

    self.skipWaiting();
});


// Delete old cache versions
self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(cacheNames => {

            return Promise.all(

                cacheNames.map(cache => {

                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }

                })

            );

        })

    );

    self.clients.claim();
});


// Try internet first,
// use cache if internet is unavailable
self.addEventListener("fetch", event => {

    event.respondWith(

        fetch(event.request)

            .then(response => {

                const copy = response.clone();

                caches.open(CACHE_NAME)
                    .then(cache => {
                        cache.put(event.request, copy);
                    });

                return response;

            })

            .catch(() => {

                return caches.match(event.request);

            })

    );

});