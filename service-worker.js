const CACHE_VERSION = 'v13';
const CACHE_NAME = `DEVerbsPreps-cache-${CACHE_VERSION}`;
const urlsToCache = [
  '/DEVerbsPreps/', // Important if your page is available at the root URL
  '/DEVerbsPreps/index.html',
  // '/style.css', // If you have a CSS file
  // '/script.js', // If you have a JS file
  // Add any other resources you want to cache
  // For example, '/icons/icon-192x192.png', '/icons/icon-512x512.png'
  '/DEVerbsPreps/icon-192x192.png', // Icon
  '/DEVerbsPreps/icon-512x512.png', // Icon
  '/DEVerbsPreps/qrcode.min.js', // Local QR code library
  '/DEVerbsPreps/android-chrome-192x192.png', // Android icon
  '/DEVerbsPreps/android-chrome-512x512.png', // Android icon
  '/DEVerbsPreps/favicon.ico', // Favicon
  '/DEVerbsPreps/apple-touch-icon.png', // iOS icon
  '/DEVerbsPreps/favicon-16x16.png', // Favicon 16x16
  '/DEVerbsPreps/favicon-32x32.png' // Favicon 32x32
];

self.addEventListener('install', (event) => {
  // Called when the Service Worker is installed
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache); // Add all required files to cache
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // Called on every network request from the page
  event.respondWith(
    caches.match(event.request) // Try to find the requested resource in cache
      .then((response) => {
        if (response) {
          return response; // If found, serve from cache
        }
        return fetch(event.request); // Otherwise do a normal network request
      })
  );
});

self.addEventListener('activate', (event) => {
  // Activate service worker and cleanup old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
