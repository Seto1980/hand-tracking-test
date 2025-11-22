const CACHE_NAME = 'rehab-v11-network-first';
const urlsToCache = [
  './',
  './index.html',
  './icon.png',
  './manifest.json'
];

// インストール時：最低限のファイルを確保
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// 通信時：【重要】まずはネットを見に行く。ダメならキャッシュを使う。
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request)
      .catch(function() {
        return caches.match(event.request);
      })
  );
});
