importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

workbox.routing.registerRoute('http://localhost:3000/api/(.*)', workbox.strategies.networkFirst());
workbox.routing.registerRoute(/.*\.(css|html|eot|svg|ttf|woff|woff2|js)/, workbox.strategies.cacheFirst());

workbox.precaching.precacheAndRoute([]);