// עובד גם בלי קליטה: שומר את האפליקציה בטלפון
const VERSION = "berlin-v13";
const SHELL = [
  "./", "./index.html", "./app.js", "./data.js", "./config.js", "./tickets.js", "./xmas.js", "./xmas-data.js", "./facts.js", "./game.js", "./art.js", "./manifest.json",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/favicon.png", "./icons/header.png"
];

const EXTRA = [
  "./vendor/pdf.min.js",
  "./vendor/pdf.worker.min.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(async c => {
    await c.addAll(SHELL);
    // קורא ה-PDF לכרטיסים – שיעבוד גם בלי קליטה (לא חובה)
    await Promise.all(EXTRA.map(u => c.add(u).catch(() => {})));
  }).then(() => self.skipWaiting()));
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
  // קבצי האפליקציה: קודם מהרשת (כדי לקבל עדכונים מיד), ואם אין קליטה – מהטלפון
  e.respondWith((async () => {
    const cache = await caches.open(VERSION);
    try {
      const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), 4000);
      const res = await fetch(e.request, { signal: ctl.signal, cache: "no-cache" }); clearTimeout(tm);
      if (res && (res.ok || res.type === "opaque")) cache.put(e.request, res.clone());
      return res;
    } catch {
      return (await cache.match(e.request, { ignoreSearch: url.origin === location.origin })) || Response.error();
    }
  })());
});
