const CACHE_NAME = "wellmax-shell-v3";
const APP_SHELL = [
  "/",
  "/index.html",
  "/offline.html",
  "/manifest.webmanifest",
  "/css/pwa-install.css?v=20260824-2",
  "/js/pwa-install.js?v=20260824-3",
  "/images/app-icon-192.png",
  "/images/app-icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => response)
        .catch(() => caches.match(request).then(response => response || caches.match("/offline.html")))
    );
    return;
  }

  const cacheableAsset =
    url.pathname.startsWith("/images/") ||
    url.pathname.startsWith("/css/") ||
    url.pathname === "/js/pwa-install.js" ||
    url.pathname === "/manifest.webmanifest";

  if (!cacheableAsset) return;

  event.respondWith(
    caches.match(request).then(cached => {
      const refreshed = fetch(request).then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      }).catch(() => cached);
      return cached || refreshed;
    })
  );
});
