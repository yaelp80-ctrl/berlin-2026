/* ברלין 2026 – לוגיקת האפליקציה (שלב 1: טיול, מזוודה, תיק גב, מזג אוויר) */
(() => {
const T = window.TRIP, ART = window.ART;
const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const LS = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};
const BERLIN = { lat: 52.52, lng: 13.405 };

/* ---------- משתמש ---------- */
let user = window.DEMO ? "yael" : LS.get("berlin.user", null); // בהדגמה: כל ההרשאות של יעל, בלי שמירה
const userName = u => u === "noam" ? "נועם" : u === "guest" ? "אורח" : "יעל";
const isGuest = () => user === "guest";
const guestToast = () => toast("👀 במצב אורח אפשר רק לצפות (ולשחק במשחק)");
function askUser() {
  $("#who").classList.add("on");
  document.querySelectorAll("#who [data-u]").forEach(b => b.onclick = () => {
    user = b.dataset.u; LS.set("berlin.user", user); $("#who").classList.remove("on");
    document.body.classList.toggle("guest", isGuest()); window.GAME && window.GAME.userChanged(); renderAll();
  });
}
$("#me").onclick = () => { if (!window.DEMO) askUser(); };

/* ---------- מצב משותף (יסונכרן בשלב 2) ---------- */
// shared.items[id] = { s: "done" | "skip" | null, day: index | null(=רשימת שווה לראות) | undefined(=מקורי), t }
let shared = LS.get("berlin.shared", { items: {} });
shared.docs = shared.docs || {};
const saveShared = () => LS.set("berlin.shared", shared);
let pending = LS.get("berlin.pending", {});
const setItem = (id, patch) => {
  if (isGuest()) return guestToast();
  shared.items[id] = { ...(shared.items[id] || {}), ...patch, t: Date.now() }; saveShared();
  pending[id] = shared.items[id].t; LS.set("berlin.pending", pending); syncSoon();
};

/* ---------- סנכרון בין הטלפונים ---------- */
let syncTimer, syncing = false, lastSync = LS.get("berlin.lastSync", 0);
const syncSoon = () => { clearTimeout(syncTimer); syncTimer = setTimeout(sync, 1200); };
async function sync() {
  if (!window.SYNC_URL || !navigator.onLine || syncing) return;
  syncing = true; netState();
  try {
    const sent = { ...pending }, changes = {};
    Object.keys(sent).forEach(id => {
      if (id.startsWith("doc:")) { const d = shared.docs[id.slice(4)]; if (d) changes[id] = { v: d.v, t: d.t }; return; }
      const st = shared.items[id]; if (st) changes["item:" + id] = { v: { s: st.s ?? null, day: st.day ?? null }, t: st.t }; });
    const r = Object.keys(changes).length && !window.DEMO
      ? await fetch(window.SYNC_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ by: user, changes }) })
      : await fetch(window.SYNC_URL + "?action=state");
    const j = await r.json(); if (!j.ok) throw 0;
    let changed = false, docChanged = false;
    Object.entries(j.data).forEach(([k, row]) => {
      if (k.startsWith("doc:")) { const key = k.slice(4), local = shared.docs[key];
        if (!local || row.t > local.t) { shared.docs[key] = { v: row.v, t: row.t }; changed = true; docChanged = true; } return; }
      if (!k.startsWith("item:")) return;
      const id = k.slice(5), local = shared.items[id];
      if (!local || row.t > local.t) {
        shared.items[id] = { s: row.v?.s ?? null, t: row.t }; if (row.v?.day !== undefined) shared.items[id].day = row.v.day;
        changed = true;
      }
    });
    Object.keys(sent).forEach(id => { if (pending[id] === sent[id]) delete pending[id]; });
    LS.set("berlin.pending", pending); lastSync = Date.now(); LS.set("berlin.lastSync", lastSync);
    if (changed) { saveShared(); if (!$("#sheet").classList.contains("on")) renderTrip(); window.XMASVIEW && window.XMASVIEW.render(); if (docChanged) window.GAME && window.GAME.onRemote(); }
  } catch (e) {} finally { syncing = false; netState(); }
}

const allItems = [];
T.days.forEach((d, i) => d.items.forEach(it => allItems.push({ ...it, home: i })));
T.extras.forEach(it => allItems.push({ ...it, home: null }));
// שווקי חג המולד – אפשר לשבץ כל שוק ביום שרוצים (מהלשונית של חג המולד)
if (window.XMAS) [...XMAS.markets, ...XMAS.potsdam].forEach(m => allItems.push({ id: m.id, title: "שוק: " + (m.he || m.name), icon: "🎄", xmas: true, home: null,
  notes: [m.travel, m.hours].filter(Boolean), maps: m.maps }));
const byId = Object.fromEntries(allItems.map(it => [it.id, it]));

// ימים שבהם המקום סגור (0=ראשון … 6=שבת), או טווח תאריכים שרק בו הוא פתוח – לפי השעות שבדקנו
const CLOSED = { "d2-anime": [0], "d3-dark": [1, 2], "d3-maclarens": [1], "d3-books": [0], "d4-sanssouci": [1], "d5-museum": [1], "d6-modulor": [0],
  "x-kadewe": [0], "x-urbannation": [1], "x-lego": [0], "x-kpop": [0], "x-technik": [1],
  "m-raw": [0], "m-gluehwald": [1, 2] };
const ONLY = { "m-winterquartier": ["2026-12-05", "2026-12-06"], "m-rixdorf": ["2026-12-04", "2026-12-06"], "m-babelsberg": ["2026-12-04", "2026-12-06"] };
const WD = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
function closedOn(id, di) {
  const date = T.days[di].date, o = ONLY[id];
  if (o && (date < o[0] || date > o[1])) return true;
  return (CLOSED[id] || []).includes(new Date(date + "T12:00").getDay());
}
function closedNote(id) {
  const o = ONLY[id], c = CLOSED[id];
  if (o) return `פתוח רק ${fmtDate(o[0])}–${fmtDate(o[1])}`;
  if (c) return c.length >= 4 ? "פתוח רק " + WD.map((n, i) => c.includes(i) ? null : n).filter(Boolean).join(" ו") : "סגור ב" + c.map(i => WD[i]).join(" וב");
  return "";
}

function placeOf(it) {
  const st = shared.items[it.id] || {};
  if (st.s === "skip") return null;
  return st.day !== undefined ? st.day : it.home;
}
const itemsForDay = di => allItems.filter(it => placeOf(it) === di)
  .sort((a, b) => (a.home === di ? 0 : 1) - (b.home === di ? 0 : 1));

/* ---------- זמן ---------- */
const dayIndexToday = () => {
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Berlin" });
  return T.days.findIndex(d => d.date === today);
};
let selDay = Math.max(0, dayIndexToday());

/* זריחה ושקיעה (נוסחת NOAA מקוצרת) */
function sunTimes(dateStr) {
  const d = new Date(dateStr + "T12:00:00Z"), rad = Math.PI / 180;
  const n = Math.round((d - new Date(Date.UTC(2000, 0, 1, 12))) / 864e5);
  const J = n - BERLIN.lng / 360, M = (357.5291 + 0.98560028 * J) % 360;
  const Cc = 1.9148 * Math.sin(M * rad) + 0.02 * Math.sin(2 * M * rad) + 0.0003 * Math.sin(3 * M * rad);
  const L = (M + Cc + 180 + 102.9372) % 360;
  const Jt = 2451545 + J + 0.0053 * Math.sin(M * rad) - 0.0069 * Math.sin(2 * L * rad);
  const dec = Math.asin(Math.sin(L * rad) * Math.sin(23.44 * rad));
  const w = Math.acos((Math.sin(-0.833 * rad) - Math.sin(BERLIN.lat * rad) * Math.sin(dec)) / (Math.cos(BERLIN.lat * rad) * Math.cos(dec))) / rad;
  const toDate = jd => new Date((jd - 2440587.5) * 864e5);
  const fmt = dt => dt.toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Berlin" });
  return { rise: fmt(toDate(Jt - w / 360)), set: fmt(toDate(Jt + w / 360)) };
}

/* ---------- מזג אוויר ---------- */
let wx = LS.get("berlin.wx", null);
const WMO = c => c == null ? ["", "?"] :
  c === 0 ? ["☀️", "בהיר"] : c <= 2 ? ["⛅", "מעונן חלקית"] : c === 3 ? ["☁️", "מעונן"] :
  c <= 48 ? ["🌫️", "ערפל"] : c <= 57 ? ["🌦️", "טפטוף"] : c <= 67 ? ["🌧️", "גשום"] :
  c <= 77 ? ["❄️", "שלג"] : c <= 82 ? ["🌧️", "ממטרים"] : c <= 86 ? ["🌨️", "ממטרי שלג"] : ["⛈️", "סופת רעמים"];
const isSnow = c => (c >= 71 && c <= 77) || c === 85 || c === 86;
const isRain = c => (c >= 51 && c <= 67) || (c >= 80 && c <= 82) || c >= 95;

async function loadWeather() {
  if (!navigator.onLine) return;
  if (wx && Date.now() - wx.at < 60 * 60 * 1000) return;
  try {
    const u = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.405&timezone=Europe%2FBerlin&forecast_days=16" +
      "&current=temperature_2m,weather_code,is_day&hourly=weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min";
    const r = await fetch(u); if (!r.ok) return;
    const j = await r.json();
    wx = { at: Date.now(), current: j.current, daily: j.daily, hourly: j.hourly };
    LS.set("berlin.wx", wx); renderTrip(); setSky();
  } catch {}
}
function daySummary(dateStr) {
  if (!wx) return null;
  const i = wx.daily.time.indexOf(dateStr); if (i < 0) return null;
  const tmax = Math.round(wx.daily.temperature_2m_max[i]), tmin = Math.round(wx.daily.temperature_2m_min[i]);
  const slots = [["בוקר", 8, 12], ["צהריים", 12, 17], ["ערב", 17, 22]].map(([n, a, b]) => {
    const codes = []; wx.hourly.time.forEach((t, k) => { if (t.startsWith(dateStr)) { const h = +t.slice(11, 13); if (h >= a && h < b) codes.push(wx.hourly.weather_code[k]); } });
    return { n, snow: codes.some(isSnow), rain: codes.some(isRain) };
  });
  const label = { "בוקר": "בוקר", "צהריים": "אחה\"צ", "ערב": "ערב" };
  let text;
  const wet = slots.filter(s => s.snow || s.rain);
  if (wet.length === 3) text = slots.every(s => s.snow) ? "יום מושלג" : slots.some(s => s.snow) ? "יום של גשם ושלג" : "יום גשום";
  else if (wet.length) text = wet.map(s => `${label[s.n]} ${s.snow ? "מושלג" : "גשום"}`).join(", ");
  else { const c = wx.daily.weather_code[i]; text = c <= 1 ? "יום שמשי" : c === 2 ? "מעונן חלקית" : c === 3 ? "יום מעונן" : WMO(c)[1]; }
  return { text, temp: tmin === tmax ? `${tmax}°` : `${tmin}°–${tmax}°`, emoji: WMO(wx.daily.weather_code[i])[0] };
}
const ago = ms => { const m = Math.round((Date.now() - ms) / 60000); return m < 2 ? "עכשיו" : m < 60 ? `לפני ${m} דק'` : `לפני ${Math.round(m / 60)} שע'`; };

/* ---------- רקע חי לפי מזג האוויר בברלין ---------- */
const sky = $("#sky"), ctx = sky.getContext("2d");
let mode = "snow", parts = [];
function setSky() {
  const c = wx?.current; let m = "snow";
  if (c) m = isSnow(c.weather_code) ? "snow" : isRain(c.weather_code) ? "rain" : !c.is_day ? "stars" : c.weather_code <= 1 ? "sun" : "clouds";
  mode = m; document.body.classList.toggle("sunny", m === "sun"); seed();
}
function seed() {
  const W = sky.width = innerWidth * devicePixelRatio, H = sky.height = innerHeight * devicePixelRatio;
  const n = { snow: 70, rain: 90, stars: 80, clouds: 6, sun: 0 }[mode];
  parts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random(), v: Math.random() }));
}
function draw() {
  const W = sky.width, H = sky.height, d = devicePixelRatio; ctx.clearRect(0, 0, W, H);
  for (const p of parts) {
    if (mode === "snow") { p.y += (0.4 + p.v) * d; p.x += Math.sin((p.y + p.r * 300) / 60) * 0.4 * d;
      ctx.fillStyle = `rgba(234,244,255,${0.35 + p.r * 0.5})`; ctx.beginPath(); ctx.arc(p.x, p.y, (1 + p.r * 2.4) * d, 0, 7); ctx.fill(); }
    else if (mode === "rain") { p.y += (6 + p.v * 5) * d; p.x -= 1 * d;
      ctx.strokeStyle = "rgba(169,194,226,.45)"; ctx.lineWidth = d; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + 2 * d, p.y - 12 * d); ctx.stroke(); }
    else if (mode === "stars") { const a = 0.3 + 0.5 * Math.abs(Math.sin(Date.now() / 900 + p.r * 10));
      ctx.fillStyle = `rgba(255,236,180,${a})`; ctx.beginPath(); ctx.arc(p.x, p.y * 0.6, (0.6 + p.v * 1.4) * d, 0, 7); ctx.fill(); }
    else if (mode === "clouds") { p.x += (0.15 + p.v * 0.2) * d;
      ctx.fillStyle = "rgba(234,244,255,.06)"; const s = (40 + p.r * 60) * d, y = p.y * 0.5;
      [[0, 0, 1], [s * .6, -s * .2, .8], [s * 1.2, 0, .9]].forEach(([dx, dy, k]) => { ctx.beginPath(); ctx.arc(p.x + dx, y + dy, s * k * .5, 0, 7); ctx.fill(); }); }
    if (p.y > H + 20) { p.y = -20; p.x = Math.random() * W; }
    if (p.x > W + 200) p.x = -200; if (p.x < -20 && mode === "rain") p.x = W;
  }
  requestAnimationFrame(draw);
}
addEventListener("resize", seed);

/* ---------- דף מקום ---------- */
const PL = window.PLACES || {};
function placeSheet(id) {
  const it = byId[id], p = PL[id]; if (!it || !p) return;
  const m = mapsLink(it), book = p.book || it.book;
  sheet(`<div class="place">${window.PLACE_ART ? window.PLACE_ART(p.art, p.opts) : ""}
    <h2>${it.icon || ""} ${esc(it.title.replace(/^אוכל: /, ""))}</h2>
    <p class="pabout">${esc(p.about)}</p>
    ${p.hist ? `<div class="phist"><b>📜 למה זה חשוב</b>${esc(p.hist)}</div>` : ""}
    <h3 class="pinfo-h">ℹ️ מידע חשוב</h3>
    <dl class="kv pinfo"><dt>🕓 ימים ושעות</dt><dd>${esc(p.hours)}</dd><dt>📍 מרחק</dt><dd>${esc(p.dist)}</dd><dt>💶 כניסה</dt><dd>${esc(p.price)}</dd></dl>
    <div class="acts" style="margin-top:12px">${book ? `<a class="btn gold" href="${book}" target="_blank" rel="noopener">${p.bookLabel || it.bookLabel || "🗓️ להזמנת מקום"}</a>` : ""}${p.book2 ? `<a class="btn gold" href="${p.book2}" target="_blank" rel="noopener">${p.book2Label}</a>` : ""}
      ${m ? `<a class="btn" href="${m}" target="_blank" rel="noopener">📍 ניווט</a>` : ""}</div>
    <button class="btn" data-close="1" style="width:100%;margin-top:12px;justify-content:center">✕ סגירה</button>
    <div class="muted" style="font-size:11px;margin-top:10px">שעות ומחירים נבדקו בנובמבר 2026 ויכולים להשתנות</div></div>`);
}

/* ---------- רכיבי ממשק ---------- */
const mapsLink = it => it.mapsUrl || (it.maps ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(it.maps) : null);
function itemHTML(it, opts = {}) {
  const st = shared.items[it.id] || {}, done = st.s === "done";
  const m = mapsLink(it);
  const acts = [
    m && `<a class="btn" href="${m}" target="_blank" rel="noopener">📍 ניווט</a>`,
    it.ticket && `<button class="btn gold" data-tk="${it.ticket}">${it.flight ? "✈️ טיסה וכרטיס" : "🎟️ כרטיס"}</button>`,
    it.call && `<a class="btn" href="tel:${it.call}">📞 התקשרות</a>`,
    it.whatsapp && `<a class="btn wa" href="https://wa.me/${it.whatsapp}" target="_blank" rel="noopener">💬 Sylvain</a>`,
    `<button class="btn" data-move="${it.id}">⇄ ${opts.worth ? "להעביר ליום" : "יום אחר"}</button>`
  ].filter(Boolean).join("");
  const time = it.time ? `<span class="time ${it.hard ? "hard" : ""}">${esc(it.time)}</span>` :
    it.slot ? `<span class="time">${esc(it.slot)}</span>` : "";
  const origin = opts.worth && it.home != null ? `<div class="from">במקור: ${T.days[it.home].name} ${fmtDate(T.days[it.home].date)}</div>` :
    !opts.worth && it.home !== opts.day ? `<div class="from">הועבר לכאן</div>` : "";
  return `<div class="item ${done ? "done" : ""}" data-id="${it.id}">
    <button class="check" data-done="${it.id}" aria-label="ראינו">✓</button>
    <div><div class="ttl ${PL[it.id] ? "has-place" : ""}" ${PL[it.id] ? `data-place="${it.id}"` : ""}>${time}<span class="ic">${it.icon || ""}</span>${esc(it.title)}${PL[it.id] ? `<span class="more">ⓘ</span>` : ""}</div>
      ${origin}
      ${it.notes ? `<ul class="notes">${it.notes.map(n => `<li>${esc(n)}</li>`).join("")}</ul>` : ""}
      <div class="acts">${acts}</div></div>
    <div class="side">${opts.worth ? "" : `<button class="x" data-skip="${it.id}" aria-label="לא נספיק">✕</button>`}</div>
  </div>`;
}
const fmtDate = s => { const [, m, d] = s.split("-"); return `${+d}.${+m}`; };

function heroHTML() {
  const start = new Date(T.start), now = new Date(), di = dayIndexToday();
  let count;
  if (now < start) {
    const ms = start - now, d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60;
    count = `<div class="muted">עד ההמראה</div><div class="count"><div><b>${d}</b><span>ימים</span></div><div><b>${h}</b><span>שעות</span></div><div><b>${m}</b><span>דקות</span></div></div>`;
  } else if (di >= 0) count = `<h2>יום ${di + 1} מתוך ${T.days.length} 🎄</h2><div class="muted">${T.days[di].title}</div>`;
  else count = `<h2>חזרנו הביתה 💛</h2><div class="muted">מקווים שהיה מדהים</div>`;
  const c = wx?.current, [e, txt] = WMO(c?.weather_code);
  const sunDate = di >= 0 ? T.days[di].date : new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Berlin" });
  const sun = sunTimes(sunDate);
  return `<div class="card"><div class="hero"><div>${count}</div>
    <div class="wx">${c ? `<div class="e">${e}</div><div class="t">${Math.round(c.temperature_2m)}°</div><div class="muted">${txt} בברלין</div>` : `<div class="e">❄️</div><div class="muted">ברלין</div>`}</div></div>
    <div class="sunrow"><span>🌅 זריחה ${sun.rise}</span><span>🌇 שקיעה ${sun.set}</span>${wx ? `<span>עודכן ${ago(wx.at)}</span>` : ""}</div></div>
    <div id="flightbox"></div>
    <div class="maps">${T.maps.map(m => `<a class="chip" href="${m.url}" target="_blank" rel="noopener">${m.icon} ${m.label}</a>`).join("")}</div>`;
}

function renderTrip() {
  const di = dayIndexToday(), d = T.days[selDay];
  const items = itemsForDay(selDay), done = items.filter(it => shared.items[it.id]?.s === "done").length;
  const sm = daySummary(d.date), sun = sunTimes(d.date);
  // מה שסומן ✓ יורד לסוף הרשימה
  const worth = allItems.filter(it => !it.xmas && placeOf(it) === null)
    .sort((a, b) => (shared.items[a.id]?.s === "done") - (shared.items[b.id]?.s === "done"));
  $("#v-trip").innerHTML = heroHTML() + `
    <div class="days">${T.days.map((x, i) => `<button class="dchip ${i === selDay ? "sel" : ""} ${i === di ? "today" : ""}" data-day="${i}"><small>${x.name.replace("יום ", "")}</small><b>${fmtDate(x.date)}</b></button>`).join("")}</div>
    <div class="card">
      <div class="dayhead"><div><div class="muted">${d.name} · ${fmtDate(d.date)}</div><h2>${esc(d.title)}</h2>
        <div class="tags"><span class="tag tr">🚇 ${esc(d.transport === "RE2" ? "רכבת RE2" : d.transport)}</span>
        <span class="tag wx">${sm ? `${sm.emoji} ${sm.temp} · ${sm.text}` : "🌤️ עוד אין תחזית"}</span>
        <span class="tag">🌇 ${sun.set}</span></div></div>${ART[d.art] || ""}</div>
      ${d.transportNote ? `<div class="muted" style="margin-top:8px">🎫 ${esc(d.transportNote)}</div>` : ""}
      ${(d.tips || []).map(t => `<div class="tip">💡 ${esc(t)}</div>`).join("")}
      <div class="prog"><i style="width:${items.length ? done / items.length * 100 : 0}%"></i></div>
      <div class="muted" style="margin-top:4px">${done} מתוך ${items.length} ✓</div>
      <div style="margin-top:6px">${items.map(it => itemHTML(it, { day: selDay })).join("") || `<div class="empty">אין כלום ביום הזה – יום חופשי! 🎉</div>`}</div>
    </div>
    <h3>⭐ מקומות ששווה לראות</h3>
    <div class="card">${worth.map(it => itemHTML(it, { worth: true })).join("") || `<div class="empty">הרשימה ריקה</div>`}</div>`;
  const sel = $(".dchip.sel"); sel && sel.scrollIntoView({ inline: "center", block: "nearest" });
  window.TICKETS && window.TICKETS.heroFlights();
}

/* ---------- רשימות אריזה (אישיות) ---------- */
function packKey(kind) { return `berlin.pack.${user}.${kind}`; }
function getPack(kind) {
  let p = LS.get(packKey(kind), null);
  if (!p) { p = T[kind].map(g => ({ g: g.g, items: g.items.map((t, i) => ({ id: g.g + i, t, on: false })) })); LS.set(packKey(kind), p); }
  // פריטים חדשים שנוספו לרשימה אחרי שכבר נשמרה בטלפון
  const added = LS.get("berlin.packAdded." + user + "." + kind, []);
  [["suitcase", "אוכל", "ערכת תה"],
   ["backpack", "צילום ומחשב", "מצלמה", "yael"], ["backpack", "צילום ומחשב", "סוללות ומטען למצלמה", "yael"],
   ["backpack", "צילום ומחשב", "מצלמת וידאו", "yael"], ["backpack", "צילום ומחשב", "לפטופ", "yael"],
   ["backpack", "לפני שיוצאים", "להוריד שירים בספוטיפיי"], ["backpack", "לפני שיוצאים", "להוריד סרטים בנטפליקס"],
   ["suitcase", "חורף", "מטריה"], ["suitcase", "חורף", "שקיות חימום"]].forEach(([k, g, t, only]) => {
    if (k !== kind || added.includes(t) || (only && only !== user)) return;
    let grp = p.find(x => x.g === g); if (!grp) { grp = { g, items: [] }; p.push(grp); }
    if (!grp.items.some(x => x.t === t)) grp.items.push({ id: "n-" + t, t, on: false });
    added.push(t); LS.set("berlin.packAdded." + user + "." + kind, added); LS.set(packKey(kind), p);
  });
  return p;
}
function renderPack(kind) {
  if (isGuest()) {
    const isS = kind === "suitcase";
    $("#v-" + kind).innerHTML = `<div class="card"><div class="hd"><div><h2>${isS ? "מה במזוודה" : "מה בתיק הגב"}</h2><div class="muted">👀 תצוגת אורח</div></div>${ART[isS ? "suitcase" : "backpack"]}</div>
      ${T[kind].map(g => `<div class="grp"><h4>${esc(g.g)}</h4>${g.items.map(t => `<div class="pk"><span>${esc(t)}</span></div>`).join("")}</div>`).join("")}</div>`;
    return;
  }
  const p = getPack(kind), all = p.flatMap(g => g.items), on = all.filter(x => x.on).length;
  const isS = kind === "suitcase";
  $("#v-" + kind).innerHTML = `<div class="card"><div class="hd"><div><h2>${isS ? "המזוודה" : "תיק הגב"} של ${userName(user)}</h2>
      <div class="muted">${on} מתוך ${all.length} ארוזים</div></div>${ART[isS ? "suitcase" : "backpack"]}</div>
    <div class="prog"><i style="width:${all.length ? on / all.length * 100 : 0}%"></i></div>
    ${p.map((g, gi) => `<div class="grp"><h4>${esc(g.g)}</h4>${g.items.map((x, xi) =>
      `<label class="pk ${x.on ? "on" : ""}"><input type="checkbox" data-pk="${gi}.${xi}" ${x.on ? "checked" : ""}><span>${esc(x.t)}</span><button class="del" data-del="${gi}.${xi}" aria-label="מחיקה">✕</button></label>`).join("")}</div>`).join("")}
    <div class="add"><input id="add-${kind}" placeholder="להוסיף פריט…"><button class="btn gold" data-add="${kind}">הוספה</button></div>
    <div style="margin-top:14px;text-align:center"><button class="btn" data-reset="${kind}">🔄 אריזה לחזור (מנקה סימונים)</button></div></div>`;
  const view = $("#v-" + kind);
  view.onchange = e => { const k = e.target.dataset.pk; if (!k) return; const [gi, xi] = k.split(".").map(Number); p[gi].items[xi].on = e.target.checked; LS.set(packKey(kind), p); renderPack(kind); };
  view.onclick = e => {
    const del = e.target.dataset.del, add = e.target.dataset.add, reset = e.target.dataset.reset;
    if (del) { e.preventDefault(); const [gi, xi] = del.split(".").map(Number); const [rm] = p[gi].items.splice(xi, 1); LS.set(packKey(kind), p); renderPack(kind);
      toast(`"${rm.t}" נמחק`, () => { p[gi].items.splice(xi, 0, rm); LS.set(packKey(kind), p); renderPack(kind); }); }
    if (add) { const inp = $("#add-" + kind), t = inp.value.trim(); if (!t) return;
      let g = p.find(g => g.g === "הוספתי"); if (!g) { g = { g: "הוספתי", items: [] }; p.push(g); }
      g.items.push({ id: "u" + Date.now(), t, on: false }); LS.set(packKey(kind), p); renderPack(kind); }
    if (reset) { const prev = JSON.stringify(p); p.forEach(g => g.items.forEach(x => x.on = false)); LS.set(packKey(kind), p); renderPack(kind);
      toast("כל הסימונים נוקו", () => { LS.set(packKey(kind), JSON.parse(prev)); renderPack(kind); }); }
  };
  view.onkeydown = e => { if (e.key === "Enter" && e.target.id === "add-" + kind) view.querySelector(`[data-add]`).click(); };
}

function renderSoon() {
  window.XMASVIEW && window.XMASVIEW.render();
  window.GAME && window.GAME.render();
}

/* ---------- חלון תחתון וטוסט ---------- */
function sheet(html) {
  const sh = $("#sheet"); sh.onclick = null; sh.style.transform = "";
  sh.innerHTML = `<div class="sheet-top"><span class="grab"></span><button class="sheet-x" aria-label="סגירה">✕</button></div>` + html;
  sh.querySelector(".sheet-x").addEventListener("click", e => { e.stopPropagation(); closeSheet(); });
  sh.scrollTop = 0; sh.classList.add("on"); $("#veil").classList.add("on");
  // כפתור "חזור" של הטלפון סוגר את החלון
  if (!(history.state && history.state.sheet)) history.pushState({ sheet: 1 }, "");
}
function closeSheet() { const sh = $("#sheet"); sh.classList.remove("on"); sh.style.transform = ""; $("#veil").classList.remove("on"); }
window.addEventListener("popstate", () => { if ($("#sheet").classList.contains("on")) closeSheet(); });
/* החלקה למטה סוגרת את החלון */
(() => { const sh = $("#sheet"); let y0 = null, dy = 0;
  sh.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeSheet(); });
  sh.addEventListener("touchstart", e => { y0 = sh.scrollTop <= 0 ? e.touches[0].clientY : null; dy = 0; }, { passive: true });
  sh.addEventListener("touchmove", e => { if (y0 == null) return; dy = e.touches[0].clientY - y0;
    if (dy > 0) { sh.style.transition = "none"; sh.style.transform = `translateY(${dy}px)`; } }, { passive: true });
  sh.addEventListener("touchend", () => { if (y0 == null) return; sh.style.transition = "";
    if (dy > 90) closeSheet(); else sh.style.transform = ""; y0 = null; });
})();
$("#veil").onclick = closeSheet;
let toastT;
function toast(msg, undo) {
  const t = $("#toast"); t.querySelector("span").textContent = msg;
  const b = t.querySelector("button"); b.style.display = undo ? "" : "none";
  b.onclick = () => { undo && undo(); t.classList.remove("on"); };
  t.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("on"), 4500);
}
function sparkle(el) {
  const r = el.getBoundingClientRect();
  for (let i = 0; i < 10; i++) {
    const s = document.createElement("i"); s.className = "spark";
    const a = Math.random() * 6.28, dist = 20 + Math.random() * 25;
    s.style.cssText = `left:${r.left + r.width / 2}px;top:${r.top + r.height / 2}px;position:fixed;--dx:${Math.cos(a) * dist}px;--dy:${Math.sin(a) * dist}px;background:${i % 2 ? "#FFD36E" : "#EAF4FF"}`;
    document.body.appendChild(s); setTimeout(() => s.remove(), 800);
  }
}

/* ---------- אירועים בלשונית הטיול ---------- */
$("#v-trip").addEventListener("click", e => {
  const pl = e.target.closest("[data-place]");
  if (pl && !e.target.closest("button,a")) return placeSheet(pl.dataset.place);
  const t = e.target.closest("button"); if (!t) return;
  const ds = t.dataset;
  if (ds.day) { selDay = +ds.day; renderTrip(); return; }
  if (isGuest() && (ds.done || ds.skip || ds.move)) return guestToast();
  if (false) {}
  else if (ds.done) {
    const cur = shared.items[ds.done]?.s === "done", inWorth = placeOf(byId[ds.done]) === null;
    setItem(ds.done, inWorth ? { s: cur ? null : "done", day: null } : { s: cur ? null : "done" }); if (!cur) sparkle(t); setTimeout(renderTrip, cur ? 0 : 250);
  } else if (ds.skip && byId[ds.skip].xmas) {
    const id = ds.skip, prev = { ...(shared.items[id] || {}) };
    setItem(id, { day: null }); renderTrip(); window.XMASVIEW && window.XMASVIEW.render();
    toast(`"${byId[id].title}" הוסר מהיום`, () => { shared.items[id] = prev; saveShared(); renderTrip(); window.XMASVIEW && window.XMASVIEW.render(); });
  } else if (ds.skip) {
    const id = ds.skip, prev = { ...(shared.items[id] || {}) };
    t.closest(".item").classList.add("leaving");
    setTimeout(() => { setItem(id, { s: "skip" }); renderTrip(); }, 300);
    toast(`"${byId[id].title}" עבר ל"שווה לראות"`, () => { shared.items[id] = prev; saveShared(); renderTrip(); });
  } else if (ds.move) {
    const it = byId[ds.move];
    const note = closedNote(it.id);
    sheet(`<h2>${it.icon || ""} ${esc(it.title)}</h2><div class="muted">לאיזה יום להעביר?</div>
      ${note ? `<div class="banner" style="margin-top:8px">🚫 ${note}</div>` : ""}
      <div class="grid">${T.days.map((x, i) => { const cl = closedOn(it.id, i) && placeOf(it) !== i;
        return `<button class="dchip ${placeOf(it) === i ? "sel" : ""} ${cl ? "closed" : ""}" ${cl ? "disabled" : `data-to="${i}"`}><small>${x.name.replace("יום ", "")}</small><b>${fmtDate(x.date)}</b>${cl ? `<small class="cl">סגור</small>` : ""}</button>`; }).join("")}</div>`);
    $("#sheet").onclick = ev => { const b = ev.target.closest("[data-to]"); if (!b) return;
      const to = +b.dataset.to; setItem(it.id, it.xmas ? { day: to } : { s: null, day: to === it.home ? undefined : to }); window.XMASVIEW && window.XMASVIEW.render(); closeSheet(); selDay = to; renderTrip();
      toast(`הועבר ל${T.days[to].name} ${fmtDate(T.days[to].date)}`); };
  }
});

/* ---------- ניווט ---------- */
document.querySelectorAll("nav button").forEach(b => b.onclick = () => {
  document.querySelectorAll("nav button").forEach(x => x.classList.toggle("on", x === b));
  document.querySelectorAll(".view").forEach(v => v.classList.toggle("on", v.id === "v-" + b.dataset.v));
  scrollTo({ top: 0 });
});

/* ---------- רשת ---------- */
function netState() {
  const on = navigator.onLine, waiting = Object.keys(pending).length;
  $("#net .dot").classList.toggle("off", !on || (window.SYNC_URL && waiting > 0 && !syncing));
  $("#net").title = window.DEMO ? (on ? "מחובר" : "בלי קליטה") : !on ? (waiting ? `בלי קליטה · ${waiting} ממתינים` : "בלי קליטה")
    : syncing ? "מסתנכרן…" : !window.SYNC_URL ? "מחובר" : waiting ? "ממתין לסנכרון" : "מסונכרן";
}
function net() { netState(); if (navigator.onLine) { loadWeather(); sync(); } }
addEventListener("online", net); addEventListener("offline", net);

function renderAll() {
  $("#me").textContent = window.DEMO ? "👀 אורח" : user ? (user === "noam" ? "🐍 נועם" : user === "guest" ? "👀 אורח" : "🌟 יעל") : "מי אני?";
  document.body.classList.toggle("guest", isGuest());
  renderTrip(); if (user) { renderPack("suitcase"); renderPack("backpack"); } renderSoon();
}

const getDoc = k => shared.docs[k]?.v;
const setDoc = (k, v) => { if (isGuest()) return; shared.docs[k] = { v, t: Date.now() }; saveShared(); pending["doc:" + k] = shared.docs[k].t; LS.set("berlin.pending", pending); syncSoon(); };
window.APP = { schedule: id => { if (isGuest()) return guestToast(); const b = document.createElement("button"); b.dataset.move = id; document.querySelector("#v-trip").appendChild(b); b.click(); b.remove(); },
  sheet, closeSheet, toast: m => toast(m), getItem: id => shared.items[id], setItem, getDoc, setDoc, isGuest, guestToast };
/* ---------- מסך פתיחה עם דגל ברלין ---------- */
(function splash() {
  const sp = $("#splash"); if (!sp) { if (!user) askUser(); return; }
  const N = 24, W = 260, H = 156, img = "url(icons/germany-flag.svg)";
  $("#bflag").innerHTML = Array.from({ length: N }, (_, i) =>
    `<i style="background-image:${img};background-size:${W}px ${H}px;background-position:${-i * W / N}px 0;animation-delay:${-i * 0.11}s"></i>`).join("");
  $("#sp-go").onclick = () => { sp.classList.add("out"); setTimeout(() => sp.remove(), 550); if (!user) askUser(); };
})();
renderAll(); setSky(); draw(); net();
setInterval(() => { if ($("#v-trip").classList.contains("on") && !$("#sheet").classList.contains("on")) renderTrip(); }, 60000);
setInterval(() => { if (document.visibilityState === "visible") sync(); }, 30000);
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") sync(); });
if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");
})();
