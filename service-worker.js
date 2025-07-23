const CACHE_NAME = 'DEVerbsPreps-cache-v1'; // Имя кэша, меняйте его, когда обновляете файлы
const urlsToCache = [
  '/DEVerbsPreps/', // Важно, если ваша страница доступна по корневому URL
  '/DEVerbsPreps/index.html',
  // '/style.css', // Если у вас есть CSS файл
  // '/script.js', // Если у вас есть JS файл
  // Добавьте все другие ресурсы, которые хотите кэшировать
  // Например, '/icons/icon-192x192.png', '/icons/icon-512x512.png'
  '/DEVerbsPreps/icon-192x192.png', // Иконка
  '/DEVerbsPreps/icon-512x512.png', // Иконка
  '/DEVerbsPreps/android-chrome-192x192.png', // Иконка для Android
  '/DEVerbsPreps/android-chrome-512x512.png', // Иконка для Android
  '/DEVerbsPreps/favicon.ico', // Фавикон
  '/DEVerbsPreps/apple-touch-icon.png', // Иконка для iOS
  '/DEVerbsPreps/favicon-16x16.png', // Фавикон 16x16
  '/DEVerbsPreps/favicon-32x32.png' // Фавикон 32x32
];

self.addEventListener('install', (event) => {
  // Вызывается, когда Service Worker устанавливается
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache); // Добавляем все нужные файлы в кэш
      })
  );
});

self.addEventListener('fetch', (event) => {
  // Вызывается при каждом сетевом запросе страницы
  event.respondWith(
    caches.match(event.request) // Пытаемся найти запрошенный ресурс в кэше
      .then((response) => {
        if (response) {
          return response; // Если нашли, отдаем из кэша
        }
        return fetch(event.request); // Иначе - делаем обычный сетевой запрос
      })
  );
});

self.addEventListener('activate', (event) => {
  // Вызывается, когда Service Worker активируется (и старый удаляется)
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName); // Удаляем старые кэши
          }
        })
      );
    })
  );
});