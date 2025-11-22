const CACHE_NAME = 'rehab-cleanup-v1';

// インストール時：すぐに新しい命令を適用する
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// 起動時：古いキャッシュ（ゴミ）をすべて削除する
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => caches.delete(key)));
    })
  );
  return self.clients.claim();
});

// 通信時：キャッシュを使わず、必ずインターネットに取りに行く
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
