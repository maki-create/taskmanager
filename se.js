const CACHE_NAME = 'kakeibo-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// インストール時にキャッシュを保存
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ネットワークリクエストの処理（Network First 戦略）
self.addEventListener('fetch', (event) => {
  // GASへのPOST通信などはキャッシュせずにそのまま通す
  if (event.request.method !== 'GET') {
    return;
  }
  
  event.respondWith(
    fetch(event.request).catch(() => {
      // オフライン等で通信エラーになった場合はキャッシュを返す
      return caches.match(event.request);
    })
  );
});
