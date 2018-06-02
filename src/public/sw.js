importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js');

workbox.routing.registerRoute('http://localhost:3000/api/(.*)', workbox.strategies.networkFirst());
workbox.routing.registerRoute(/.*\.(css|html|eot|svg|ttf|woff|woff2|js)/, workbox.strategies.cacheFirst());

workbox.precaching.precacheAndRoute([
  {
    "url": "app.css",
    "revision": "9c16799c3dce4164a171eec0979a7ad6"
  },
  {
    "url": "app.js",
    "revision": "997bcf0032f08579abdd5687eecc34cf"
  },
  {
    "url": "fontawesome.min.css",
    "revision": "d61bfe9b56c13ecff5313ee3abb45e8b"
  },
  {
    "url": "index.html",
    "revision": "97fc96045824453372c5819d80069745"
  },
  {
    "url": "webfonts/fa-brands-400.eot",
    "revision": "748ab466bee11e0b2132916def799916"
  },
  {
    "url": "webfonts/fa-brands-400.svg",
    "revision": "b032e14eac87e3001396ff597e4ec15f"
  },
  {
    "url": "webfonts/fa-brands-400.ttf",
    "revision": "7febe26eeb4dd8e3a3c614a144d399fb"
  },
  {
    "url": "webfonts/fa-brands-400.woff",
    "revision": "2248542e1bbbd548a157e3e6ced054fc"
  },
  {
    "url": "webfonts/fa-brands-400.woff2",
    "revision": "3654744dc6d6c37c9b3582b57622df5e"
  },
  {
    "url": "webfonts/fa-regular-400.eot",
    "revision": "b58f468f84168d61e0ebc1e1f423587c"
  },
  {
    "url": "webfonts/fa-regular-400.svg",
    "revision": "3929b3ef871fa90bbb4e77e005851e74"
  },
  {
    "url": "webfonts/fa-regular-400.ttf",
    "revision": "54f142e03adc6da499c2af4f54ab76fd"
  },
  {
    "url": "webfonts/fa-regular-400.woff",
    "revision": "f3dd4f397fbc5aaf831b6b0ba112d75c"
  },
  {
    "url": "webfonts/fa-regular-400.woff2",
    "revision": "33f727ccde4b05c0ed143c5cd78cda0c"
  },
  {
    "url": "webfonts/fa-solid-900.eot",
    "revision": "035a137af03db6f1af76a589da5bb865"
  },
  {
    "url": "webfonts/fa-solid-900.svg",
    "revision": "9bbbee00f65769a64927764ef51af6d0"
  },
  {
    "url": "webfonts/fa-solid-900.ttf",
    "revision": "b6a14bb88dbc580e45034af297c8f605"
  },
  {
    "url": "webfonts/fa-solid-900.woff",
    "revision": "6661d6b3521b4c480ba759e4b9e480c1"
  },
  {
    "url": "webfonts/fa-solid-900.woff2",
    "revision": "8a8c0474283e0d9ef41743e5e486bf05"
  }
]);