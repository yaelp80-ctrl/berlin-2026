/* כרטיסים (נשמרים רק בטלפון) וסטטוס טיסות */
(() => {
const T = window.TRIP;
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ---------- אחסון קבצים במכשיר (IndexedDB) ---------- */
const DB = (() => {
  let p;
  const open = () => p || (p = new Promise((res, rej) => {
    const r = indexedDB.open("berlin-tickets", 1);
    r.onupgradeneeded = () => r.result.createObjectStore("files");
    r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error);
  }));
  const tx = async (mode, fn) => { const db = await open(); return new Promise((res, rej) => {
    const t = db.transaction("files", mode), st = t.objectStore("files"), out = fn(st);
    t.oncomplete = () => res(out && out.result); t.onerror = () => rej(t.error); }); };
  return {
    get: k => tx("readonly", s => s.get(k)),
    put: (k, v) => tx("readwrite", s => s.put(v, k)),
    del: k => tx("readwrite", s => s.delete(k)),
    keys: () => tx("readonly", s => s.getAllKeys())
  };
})();

/* ---------- צפייה בכרטיס במסך מלא ---------- */
const PDFJS = "vendor/";
let pdfReady;
const loadPdfJs = () => pdfReady || (pdfReady = new Promise((res, rej) => {
  const s = document.createElement("script"); s.src = PDFJS + "pdf.min.js";
  s.onload = () => { pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS + "pdf.worker.min.js"; res(pdfjsLib); };
  s.onerror = () => { pdfReady = null; rej(new Error("pdf")); }; document.head.appendChild(s);
}));

let wake;
async function openViewer(key) {
  const t = T.tickets[key], f = await DB.get(key);
  const v = $("#viewer");
  v.innerHTML = `<div class="vbar"><b>${t.icon} ${esc(t.title)}</b><button class="btn" id="vclose">סגירה ✕</button></div>
    <div class="vhint">💡 להגביר את בהירות המסך לפני שסורקים</div><div class="vbody" id="vbody"><div class="vload">טוען…</div></div>`;
  v.classList.add("on"); document.body.style.overflow = "hidden";
  $("#vclose").onclick = closeViewer;
  try { wake = await navigator.wakeLock?.request("screen"); } catch {}
  const body = $("#vbody");
  if (!f) { body.innerHTML = `<div class="vload">הכרטיס עוד לא נשמר בטלפון הזה</div>`; return; }
  if (f.type.startsWith("image/")) { body.innerHTML = ""; const img = new Image(); img.src = URL.createObjectURL(f); body.appendChild(img); return; }
  try {
    const lib = await loadPdfJs();
    const pdf = await lib.getDocument({ data: await f.arrayBuffer() }).promise;
    body.innerHTML = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i), base = page.getViewport({ scale: 1 });
      const scale = Math.min(3, (innerWidth * devicePixelRatio) / base.width);
      const vp = page.getViewport({ scale }), c = document.createElement("canvas");
      c.width = vp.width; c.height = vp.height;
      await page.render({ canvasContext: c.getContext("2d"), viewport: vp }).promise;
      if (pdf.numPages > 1) { const l = document.createElement("div"); l.className = "vpage"; l.textContent = `עמוד ${i} מתוך ${pdf.numPages}`; body.appendChild(l); }
      body.appendChild(c);
    }
  } catch {
    body.innerHTML = `<div class="vload">לא הצלחתי להציג את הקובץ כאן.<br><br><a class="btn gold" href="${URL.createObjectURL(f)}" target="_blank">לפתוח בתוכנה אחרת</a></div>`;
  }
}
function closeViewer() { $("#viewer").classList.remove("on"); document.body.style.overflow = ""; try { wake?.release(); } catch {} }

/* ---------- העלאת קובץ ---------- */
function pickFile(key) {
  return new Promise(res => {
    const inp = document.createElement("input"); inp.type = "file"; inp.accept = "application/pdf,image/*";
    inp.onchange = async () => { const f = inp.files[0]; if (!f) return res(false);
      await DB.put(key, f); res(true); };
    inp.click();
  });
}

/* ---------- מספרי הזמנה (רק בטלפון) ---------- */
const bookingGet = k => { try { return localStorage.getItem("berlin.booking." + k) || ""; } catch { return ""; } };
const bookingSet = (k, v) => { try { localStorage.setItem("berlin.booking." + k, v); } catch {} };

/* ---------- סטטוס טיסה ---------- */
const flightDateTime = f => new Date(`${f.date}T${f.dep}:00${f.dir === "D" ? "+02:00" : "+01:00"}`);
function flightWindow(f) { const dt = flightDateTime(f), now = Date.now(); return now > dt - 30 * 3600e3 && now < dt + 10 * 3600e3; }
function readStatus(code) { try { return JSON.parse(localStorage.getItem("berlin.fl." + code)); } catch { return null; } }
async function fetchStatus(f, force) {
  const old = readStatus(f.code);
  if (!window.SYNC_URL || !navigator.onLine) return old;
  if (!force && old && Date.now() - old.at < 5 * 60e3) return old;
  try {
    const r = await fetch(`${window.SYNC_URL}?action=flight&code=${f.code}`); const j = await r.json();
    if (!j.ok) return old;
    const rec = j.records.find(x => x.direction === f.dir && String(x.scheduled || "").startsWith(f.date)) ||
                j.records.find(x => String(x.scheduled || "").startsWith(f.date));
    const out = { at: Date.now(), rec: rec || null };
    localStorage.setItem("berlin.fl." + f.code, JSON.stringify(out)); return out;
  } catch { return old; }
}
const hhmm = s => s ? String(s).slice(11, 16) : "";
function statusLine(f, st) {
  if (!st) return "";
  if (!st.rec) {
    const dt = flightDateTime(f), from = new Date(dt - 3 * 864e5), d = x => `${x.getDate()}.${x.getMonth() + 1}`;
    return Date.now() < from
      ? `<span class="muted">לוח נתב"ג מציג רק כ-3 ימים קדימה, אז ${f.code} של ${d(dt)} עוד לא שם. טיסות לברלין שרואים בלוח עכשיו הן של ימים אחרים (למשל 6H251, 6H253, BZ272). הסטטוס יופיע כאן בערך מ-${d(from)}.</span>`
      : `<span class="muted">${f.code} עוד לא מופיעה בלוח של נתב"ג – כדאי לבדוק שוב בעוד כמה שעות</span>`;
  }
  const r = st.rec, late = r.estimated && r.scheduled && (new Date(r.estimated) - new Date(r.scheduled)) / 60000;
  const label = r.status || r.statusEn || "";
  const delay = late > 10 ? `<b style="color:#FF9A8B">עיכוב של ${Math.round(late)} דק'</b>` : `<b style="color:#7EE2A8">בזמן ✓</b>`;
  const what = f.dir === "D" ? "המראה" : "נחיתה בנתב\"ג";
  return `${delay} · ${what} ${hhmm(r.estimated) || hhmm(r.scheduled)}${label ? ` · ${esc(label)}` : ""}${r.terminal ? ` · טרמינל ${esc(r.terminal)}` : ""}${r.counter ? ` · דלפקים ${esc(r.counter)}` : ""}
    <div class="muted" style="font-size:12px">מלוח הטיסות של רשות שדות התעופה · עודכן ${new Date(st.at).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })}</div>`;
}

/* ---------- חלון פרטי טיסה ---------- */
async function flightSheet(which) {
  const f = T.flights[which], has = !!(await DB.get(f.ticket));
  window.APP.sheet(`<h2>✈️ ${f.code} · ${f.airline}</h2><div class="muted">${f.date.split("-").reverse().slice(0, 2).map(Number).join(".")}</div>
    <div class="flight"><div><b>${f.dep}</b>${esc(f.from)}</div><div style="font-size:26px;display:inline-block;transform:scaleX(-1)">✈︎</div><div><b>${f.arr}</b>${esc(f.to)}</div></div>
    <dl class="kv"><dt>מזוודות</dt><dd>${esc(f.bags)}</dd>
      ${window.APP.isGuest() ? "" : `<dt>מספר הזמנה</dt><dd><input id="bk" class="inp" inputmode="numeric" placeholder="להקליד (נשמר רק בטלפון)" value="${esc(bookingGet(f.code))}"></dd>`}
      <dt>סטטוס</dt><dd id="fst">${statusLine(f, readStatus(f.code)) || `<span class="muted">בודק…</span>`}</dd></dl>
    <div class="acts" style="margin-top:14px">
      ${window.APP.isGuest() ? "" : `<button class="btn gold" data-tk="${f.ticket}">🎟️ ${has ? "כרטיס" : "להעלות כרטיס"}</button>`}
      <button class="btn" id="frefresh">🔄 לבדוק סטטוס</button></div>`);
  $("#bk") && ($("#bk").oninput = e => bookingSet(f.code, e.target.value.trim()));
  const upd = async force => { const st = await fetchStatus(f, force); $("#fst") && ($("#fst").innerHTML = statusLine(f, st) || `<span class="muted">${window.SYNC_URL ? "אין נתון כרגע" : "לא מחובר לשרת"}</span>`); };
  $("#frefresh").onclick = () => upd(true); upd(false);
}

/* ---------- ארנק הכרטיסים ---------- */
async function wallet() {
  const keys = new Set(await DB.keys());
  window.APP.sheet(`<h2>🎟️ הכרטיסים שלי</h2><div class="muted">הקבצים נשמרים רק בטלפון הזה, ולא עולים לאינטרנט. צריך להעלות אותם פעם אחת בכל טלפון.</div>
    ${Object.entries(T.tickets).map(([k, t]) => `<div class="item" style="grid-template-columns:40px 1fr">
      <span class="check" style="${keys.has(k) ? "background:var(--gold);border-color:var(--gold);color:#3A2A08" : "border-style:dashed;color:var(--muted)"}">${keys.has(k) ? "✓" : t.icon}</span>
      <div><div class="ttl">${esc(t.title)}</div><div class="muted" style="font-size:13px">${esc(t.note || "")}</div>
      <div class="acts">${keys.has(k) ? `<button class="btn gold" data-open="${k}">פתיחה</button><button class="btn" data-up="${k}">החלפה</button><button class="btn" data-rm="${k}">מחיקה</button>`
        : `<button class="btn gold" data-up="${k}">⬆️ להעלות קובץ</button>`}
      ${t.whatsapp ? `<a class="btn wa" href="https://wa.me/${t.whatsapp}" target="_blank" rel="noopener">💬 Sylvain</a>` : ""}</div></div></div>`).join("")}`);
}

/* ---------- לחיצה על כפתור כרטיס ---------- */
async function ticketTap(key) {
  const t = T.tickets[key];
  if (window.APP.isGuest() && !t.flight) return window.APP.guestToast();
  if (t.flight) return flightSheet(t.flight);
  if (await DB.get(key)) return openViewer(key);
  if (key === "graffiti") return wallet();
  window.APP.sheet(`<h2>${t.icon} ${esc(t.title)}</h2><div class="muted">${esc(t.note || "")}</div>
    <p>הכרטיס עוד לא שמור בטלפון הזה. בוחרים את קובץ ה-PDF (אפשר ישר מגוגל דרייב), והוא יישמר כאן ויעבוד גם בלי קליטה.</p>
    <button class="btn gold" data-up="${key}">⬆️ לבחור קובץ</button>`);
}

document.addEventListener("click", async e => {
  const b = e.target.closest("[data-tk],[data-up],[data-open],[data-rm],#wallet"); if (!b) return;
  if (b.id === "wallet") return window.APP.isGuest() ? window.APP.guestToast() : wallet();
  const d = b.dataset;
  if (d.tk) { e.stopPropagation(); return ticketTap(d.tk); }
  if (d.open) { window.APP.closeSheet(); return openViewer(d.open); }
  if (d.up) { if (await pickFile(d.up)) { window.APP.toast("הכרטיס נשמר בטלפון 🎟️"); wallet(); } }
  if (d.rm) { await DB.del(d.rm); wallet(); }
}, true);

/* ---------- סטטוס בעמוד הראשי ---------- */
async function heroFlights() {
  const box = $("#flightbox"); if (!box) return;
  const live = Object.values(T.flights).filter(flightWindow);
  if (!live.length) { box.innerHTML = ""; return; }
  const parts = await Promise.all(live.map(async f => `<div><b>✈️ ${f.code}</b> ${statusLine(f, await fetchStatus(f)) || `<span class="muted">בודק…</span>`}</div>`));
  box.innerHTML = `<div class="card" data-tk="${live[0].ticket}" style="cursor:pointer">${parts.join("")}</div>`;
}

window.TICKETS = { ticketTap, wallet, flightSheet, heroFlights, closeViewer };
})();
