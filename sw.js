// עובד גם בלי קליטה: שומר את האפליקציה בטלפון
const VERSION = "berlin-v41";
const SHELL = [
  "./", "./index.html", "./app.js", "./data.js", "./config.js", "./tickets.js", "./xmas.js", "./xmas-data.js", "./facts.js", "./game.js", "./tools.js", "./places.js", "./places-art.js", "./fireplace.js", "./art.js", "./manifest.json", "./manifest-demo.json",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/favicon.png", "./icons/germany-flag.svg", "./icons/dog-cream.png", "./icons/dog-gold.png", "./icons/header.png"
];

const EXTRA = [
  "./vendor/pdf.min.js",
  "./vendor/pdf.worker.min.js",
  // הקראת הביטויים בגרמנית
  "./audio/0748f7c4.mp3", "./audio/09dd2e4c.mp3", "./audio/0c9a308b.mp3", "./audio/0d483e83.mp3", "./audio/10aa4e5b.mp3", "./audio/10e7220a.mp3", "./audio/13350680.mp3", "./audio/1359938b.mp3", "./audio/14bd8e31.mp3", "./audio/1efd837e.mp3", "./audio/22c5a905.mp3", "./audio/25f71ff7.mp3", "./audio/2995c616.mp3", "./audio/2c6323b9.mp3", "./audio/39953aad.mp3", "./audio/3ae3d37a.mp3", "./audio/3dbf11ca.mp3", "./audio/3e1231d9.mp3", "./audio/637a0c86.mp3", "./audio/6403f413.mp3", "./audio/69b5ec7f.mp3", "./audio/6ca74be1.mp3", "./audio/744bd504.mp3", "./audio/7491fd74.mp3", "./audio/7d9e8dc0.mp3", "./audio/7f0a6c4c.mp3", "./audio/84da518b.mp3", "./audio/871a37f8.mp3", "./audio/8c2b31d5.mp3", "./audio/92b6c914.mp3", "./audio/94c2c41e.mp3", "./audio/989510b2.mp3", "./audio/9bb1eef0.mp3", "./audio/9cfac435.mp3", "./audio/a6725cb2.mp3", "./audio/ab119ede.mp3", "./audio/b02c6309.mp3", "./audio/b19b1efb.mp3", "./audio/b33d5b76.mp3", "./audio/b383fce1.mp3", "./audio/b5c8088a.mp3", "./audio/b91183ad.mp3", "./audio/bf7ccbb5.mp3", "./audio/c8ca61bf.mp3", "./audio/ca1e945a.mp3", "./audio/d1ac5b36.mp3", "./audio/d40106cf.mp3", "./audio/e129f298.mp3", "./audio/f2b2811c.mp3", "./audio/f4ce6434.mp3", "./audio/f5fcaf41.mp3"
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
    caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith("berlin-v") && k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  // מזג אוויר וטיסות: תמיד מהרשת (האפליקציה שומרת את התשובה האחרונה בעצמה)
  if (url.hostname.includes("open-meteo") || url.hostname.includes("frankfurter") || url.hostname.includes("script.google") || url.hostname.includes("translate.google")) return;
  // זיהוי מספרים (קבצים גדולים שלא משתנים): מהטלפון אם כבר נשמרו
  if (url.pathname.includes("/vendor/tess/")) {
    e.respondWith(caches.open("berlin-tess-1").then(async c => (await c.match(e.request)) || fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; })));
    return;
  }
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
