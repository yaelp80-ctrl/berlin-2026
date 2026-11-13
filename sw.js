// עובד גם בלי קליטה: שומר את האפליקציה בטלפון
const VERSION = "berlin-v4";
const SHELL = [
  "./", "./index.html", "./app.js", "./data.js", "./config.js", "./art.js", "./manifest.json",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/favicon.png", "./icons/header.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  // מזג אוויר וטיסות: תמיד מהרשת (האפליקציה שומרת את התשובה האחרונה בעצמה)
  if (url.hostname.includes("open-meteo") || url.hostname.includes("script.google")) return;
  // כל השאר: מהמטמון, ובמקביל מתעדכן מהרשת
  e.respondWith(
    caches.open(VERSION).then(async cache => {
      const cached = await cache.match(e.request, { ignoreSearch: url.origin === location.origin });
      const net = fetch(e.request).then(res => {
        if (res && (res.ok || res.type === "opaque")) cache.put(e.request, res.clone());
        return res;
      }).catch(() => cached);
      return cached || net;
    })
  );
});
