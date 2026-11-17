/* לשונית כלים: ממיר מטבע, ביטויים בגרמנית, טלפונים חשובים */
(() => {
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const KEY = "berlin.rate";
let rate = (() => { try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; } })() || { v: 4.0, at: 0, est: true };

async function loadRate() {
  if (!navigator.onLine || Date.now() - rate.at < 6 * 3600e3) return;
  try {
    const r = await fetch("https://api.frankfurter.app/latest?from=EUR&to=ILS"); const j = await r.json();
    if (j.rates && j.rates.ILS) { rate = { v: j.rates.ILS, at: Date.now() }; localStorage.setItem(KEY, JSON.stringify(rate)); render(); }
  } catch {}
}

const GROUPS = [
  ["👋 בסיס", [
    ["שלום", "Hallo", "הַאלוֹ"], ["בוקר טוב", "Guten Morgen", "גוּטֶן מוֹרגֶן"], ["ערב טוב", "Guten Abend", "גוּטֶן אָבֶּנט"],
    ["לילה טוב", "Gute Nacht", "גוּטֶה נַאכט"], ["תודה (רבה)", "Danke (schön)", "דַּנקֶה (שֵׁן)"], ["בבקשה", "Bitte", "בִּיטֶה"],
    ["סליחה", "Entschuldigung", "אֶנטשׁוּלדִיגוּנג"], ["כן / לא", "Ja / Nein", "יָא / נַיין"], ["להתראות", "Tschüss", "צ'וּס"],
    ["להתראות (רשמי)", "Auf Wiedersehen", "אַוף וִידֶרזֵיין"], ["מה שלומך?", "Wie geht's?", "וִי גֵייטס?"], ["טוב, תודה", "Gut, danke", "גוּט, דַּנקֶה"],
    ["קוראים לי…", "Ich heiße…", "אִיך הַייסֶה…"], ["איפה השירותים הקרובים?", "Wo ist die nächste Toilette?", "וֹוּ אִיסט דִּי נֶכסטֶה טוֹאָלֶטֶה?"], ["אני אוהב/ת את ברלין", "Ich liebe Berlin", "אִיך לִיבֶּה בֶּרלִין"], ["אני לא מבין", "Ich verstehe nicht", "אִיך פֶרשְׁטֵייֶה נִיכט"],
    ["אני לא מדבר גרמנית", "Ich spreche kein Deutsch", "אִיך שְׁפּרֶכֶה קַיין דּוֹיטשׁ"], ["אתה מדבר אנגלית?", "Sprechen Sie Englisch?", "שְׁפּרֶכֶן זִי אֶנגלִישׁ?"],
    ["לאט יותר, בבקשה", "Langsamer, bitte", "לַאנגזַאמֶר, בִּיטֶה"]]],
  ["🍽️ במסעדה ובשוק", [
    ["כמה זה עולה?", "Wie viel kostet das?", "וִי פִיל קוֹסטֶט דַּאס?"], ["הייתי רוצה…", "Ich hätte gern…", "אִיך הֶטֶה גֶרן…"],
    ["אחד / שניים, בבקשה", "Eins / Zwei, bitte", "אַיינס / צְוַוי, בִּיטֶה"], ["מים, בבקשה", "Ein Wasser, bitte", "אַיין וַואסֶר, בִּיטֶה"],
    ["בלי בשר, בבקשה", "Ohne Fleisch, bitte", "אוֹנֶה פְלַיישׁ, בִּיטֶה"], ["ללא גלוטן, בבקשה", "Glutenfrei, bitte", "גְלוּטֶנפרַיי, בִּיטֶה"], ["לקחת (טייק אוויי)", "Zum Mitnehmen", "צוּם מִיטנֵימֶן"],
    ["אפשר לשלם בכרטיס?", "Kann ich mit Karte zahlen?", "קַאן אִיך מִיט קַארטֶה צָאלֶן?"], ["החשבון, בבקשה", "Die Rechnung, bitte", "דִּי רֶכנוּנג, בִּיטֶה"],
    ["טעים מאוד!", "Sehr lecker!", "זֶר לֶקֶר!"]]],
  ["🚇 התמצאות ותחבורה", [
    ["איפה השירותים?", "Wo ist die Toilette?", "וֹוּ אִיסט דִּי טוֹאָלֶטֶה?"], ["איפה התחנה?", "Wo ist die Haltestelle?", "וֹוּ אִיסט דִּי הַלטֶשׁטֶלֶה?"],
    ["איפה תחנת הרכבת?", "Wo ist der Bahnhof?", "וֹוּ אִיסט דֶר בַּאנהוֹף?"], ["שמאלה / ימינה / ישר", "Links / Rechts / Geradeaus", "לִינקס / רֶכטס / גֶרָאדֶה-אַוס"],
    ["כרטיס נסיעה, בבקשה", "Eine Fahrkarte, bitte", "אַיינֶה פַארקַארטֶה, בִּיטֶה"], ["מתי הרכבת הבאה?", "Wann fährt der nächste Zug?", "וַאן פֵערט דֶר נֶכסטֶה צוּג?"],
    ["כניסה / יציאה", "Eingang / Ausgang", "אַיינגַאנג / אַוסגַאנג"]]],
  ["🎄 בשוק חג המולד", [
    ["חג מולד שמח", "Frohe Weihnachten", "פרוֹאֶה וַייהנַאכטֶן"], ["פונץ' חם לילדים (בלי אלכוהול)", "Kinderpunsch", "קִינדֶרפּוּנשׁ"],
    ["שקדים קלויים", "Gebrannte Mandeln", "גֶבּרַאנטֶה מַאנדֶלן"], ["עוגיות ג'ינג'ר", "Lebkuchen", "לֵבּקוּכֶן"]]],
  ["🆘 חירום", [
    ["עזרה!", "Hilfe!", "הִילפֶה!"], ["אני צריך רופא", "Ich brauche einen Arzt", "אִיך בְּרַאוּכֶה אַיינֶן אַרצט"],
    ["תתקשרו למשטרה", "Rufen Sie die Polizei", "רוּפֶן זִי דִּי פּוֹלִיצַאי"], ["הלכתי לאיבוד", "Ich habe mich verlaufen", "אִיך הַאבֶּה מִיך פֶרלַאוּפֶן"],
    ["בית מרקחת", "Apotheke", "אַפּוֹטֵקֶה"]]]
];
const PHRASES = GROUPS.flatMap(g => g[1]);
const ANTHEM = [
  ["Einigkeit und Recht und Freiheit", "אחדות, צדק וחירות"], ["für das deutsche Vaterland!", "למען המולדת הגרמנית!"],
  ["Danach lasst uns alle streben", "לכך נשאף כולנו"], ["brüderlich mit Herz und Hand!", "באחווה, בלב וביד!"],
  ["Einigkeit und Recht und Freiheit", "אחדות, צדק וחירות"], ["sind des Glückes Unterpfand:", "הן הערובה לאושר:"],
  ["Blüh im Glanze dieses Glückes,", "פרחי בזוהר האושר הזה,"], ["blühe, deutsches Vaterland!", "פרחי, מולדת גרמנית!"]];

/* הקראה: קודם הקול הגרמני של הטלפון (נשמע הכי טוב); אם אין – הקלטה ששמורה באפליקציה */
let deVoice = null, clip = null;
function pickVoice() {
  try { const vs = speechSynthesis.getVoices(); deVoice = vs.find(v => v.lang === "de-DE") || vs.find(v => /^de/i.test(v.lang)) || null; } catch {}
}
if ("speechSynthesis" in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
const audioName = t => { let x = 5381; for (const c of t) x = (Math.imul(x, 33) ^ c.charCodeAt(0)) >>> 0; return "../audio/" + x.toString(16).padStart(8, "0") + ".mp3"; };
function playClip(t) {
  try { clip && clip.pause(); } catch {}
  clip = new Audio(audioName(t));
  clip.play().catch(() => window.APP.toast("לא הצלחתי להשמיע 😕 כדאי לבדוק שהווליום של המדיה פתוח"));
}
function speak(t) {
  try { clip && clip.pause(); } catch {}
  if (!("speechSynthesis" in window)) return playClip(t);
  pickVoice();
  if (!deVoice) return playClip(t);
  try {
    if (speechSynthesis.speaking || speechSynthesis.pending) speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t); u.lang = deVoice.lang; u.voice = deVoice; u.rate = .85;
    let started = false; u.onstart = () => started = true;
    u.onerror = e => { if (!started && e.error !== "interrupted" && e.error !== "canceled") playClip(t); };
    speechSynthesis.resume();
    setTimeout(() => { speechSynthesis.speak(u); setTimeout(() => { if (!started && !speechSynthesis.speaking) { speechSynthesis.cancel(); playClip(t); } }, 1500); }, 60);
  } catch { playClip(t); }
}

/* ---------- סריקת מחיר במצלמה ---------- */
const scan = { panel: null, stream: null, worker: null, busy: false, last: null };
const tessBase = () => new URL("../vendor/tess/", location.href).href;
const loadScript = src => new Promise((res, rej) => { if (window.Tesseract) return res(); const s = document.createElement("script"); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
async function ocrWorker() {
  if (scan.worker) return scan.worker;
  await loadScript("../vendor/tess/tesseract.min.js");
  const b = tessBase();
  const w = await Tesseract.createWorker("eng", 1, { workerPath: b + "worker.min.js", corePath: b, langPath: b, gzip: true });
  await w.setParameters({ tessedit_pageseg_mode: "11" });
  return scan.worker = w;
}
/* בוחרים את המחיר: מספר שעומד לבד (לא חלק מ-"1KG=2.03"), עדיף עם אגורות, והכי גדול בתווית */
function priceOf(word) {
  const w = word.replace(/^[€*]+|[€*:]+$/g, "");
  let m = w.match(/^(\d{1,3}(?:\.\d{3})+),(\d{2})$/);
  if (m) return { v: parseFloat(m[1].replace(/\./g, "") + "." + m[2]), tier: 2 };
  m = w.match(/^(\d{1,4})(?:[.,](\d{2}|-{1,2}))?$/);
  if (!m) return null;
  const v = parseFloat(m[1] + "." + (m[2] && /\d/.test(m[2]) ? m[2] : "0"));
  return v > 0 && v < 20000 ? { v, tier: m[2] ? 2 : 1 } : null;
}
function pickPrice(words) {
  let best = null;
  for (const wd of words) {
    const p = priceOf(wd.text || ""); if (!p || wd.confidence < 40) continue;
    const h = wd.bbox.y1 - wd.bbox.y0, sc = p.tier * 1000 + h;
    if (!best || sc > best.sc) best = { v: p.v, sc };
  }
  return best ? best.v : null;
}
function setStatus(t) { const el = scan.panel && scan.panel.querySelector(".scst"); if (el) el.innerHTML = t; }
async function startScan() {
  const v = $("#v-tools");
  scan.panel = document.createElement("div"); scan.panel.className = "card tool scanp";
  scan.panel.innerHTML = `<div class="scanv"><video playsinline muted autoplay></video><div class="scanframe"></div></div>
    <div class="scst muted">פותח מצלמה…</div>
    <button class="btn" id="scanclose" style="margin-top:8px">✕ לסגור מצלמה</button>`;
  v.querySelector("#scanslot").replaceWith(scan.panel);
  scan.panel.querySelector("#scanclose").onclick = stopScan;
  $("#scanbtn").textContent = "✕ לסגור סריקה";
  try {
    scan.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
  } catch (e) { setStatus("אין גישה למצלמה 😕 צריך לאשר לאפליקציה להשתמש במצלמה"); return; }
  const vid = scan.panel.querySelector("video"); vid.srcObject = scan.stream; await vid.play().catch(() => {});
  setStatus("מכינה זיהוי מספרים… (בפעם הראשונה זה לוקח כמה שניות)");
  try { await ocrWorker(); } catch (e) { setStatus("לא הצלחתי לטעון את זיהוי המספרים – צריך קליטה בפעם הראשונה"); return; }
  setStatus("מכוונים את המחיר לתוך המסגרת 🎯");
  loop();
}
async function loop() {
  if (!scan.stream) return;
  if (!$("#v-tools").offsetParent || document.hidden) return stopScan();
  const vid = scan.panel.querySelector("video");
  if (vid.videoWidth && !scan.busy) {
    scan.busy = true;
    try {
      const W = vid.videoWidth, H = vid.videoHeight, bw = vid.clientWidth, bh = vid.clientHeight, k = Math.max(bw / W, bh / H);
      const vw = bw / k, vh = bh / k, cw = vw * .8, ch = vh * .34, cx = (W - vw) / 2 + vw * .1, cy = (H - vh) / 2 + vh * .33;
      const cv = document.createElement("canvas"), sc = Math.min(2.5, 1000 / cw); cv.width = cw * sc; cv.height = ch * sc;
      const g = cv.getContext("2d", { willReadFrequently: true }); g.filter = "grayscale(1) contrast(1.6)"; g.drawImage(vid, cx, cy, cw, ch, 0, 0, cv.width, cv.height);
      const { data } = await scan.worker.recognize(cv, {}, { blocks: true, text: false });
      const words = []; (data.blocks || []).forEach(bl => bl.paragraphs.forEach(pa => pa.lines.forEach(l => words.push(...l.words))));
      const p = pickPrice(words);
      if (p != null && p === scan.last) fill(p);
      scan.last = p;
    } catch (e) {}
    scan.busy = false;
  }
  setTimeout(loop, 350);
}
function fill(p) {
  const e = $("#eur"); if (!e) return;
  if (parseFloat(e.value) !== +p.toFixed(2)) { e.value = p.toFixed(2); e.dispatchEvent(new Event("input")); if (navigator.vibrate) navigator.vibrate(30); }
  setStatus(`✅ <span dir="ltr"><b>${p.toFixed(2).replace(".", ",")} €</b> = <b>${(p * rate.v).toFixed(2)} ₪</b></span>`);
}
function stopScan() {
  if (scan.stream) scan.stream.getTracks().forEach(t => t.stop());
  scan.stream = null; scan.last = null;
  if (scan.panel) { const slot = document.createElement("div"); slot.id = "scanslot"; scan.panel.replaceWith(slot); scan.panel = null; }
  const b = $("#scanbtn"); if (b) b.textContent = "📷 לסרוק מחיר";
}
document.addEventListener("visibilitychange", () => { if (document.hidden) stopScan(); });

function render() {
  const v = $("#v-tools"); if (!v) return;
  const when = rate.at ? new Date(rate.at).toLocaleDateString("he-IL") : "";
  v.innerHTML = `
  <div class="card tool"><h3 class="curh">💶 ממיר מטבע <button class="btn scanb" id="scanbtn">📷 לסרוק מחיר</button></h3>
    <div class="cur"><div><input id="eur" inputmode="decimal" placeholder="0"><div class="muted" style="text-align:center">יורו €</div></div>
      <div style="font-size:22px">⇄</div>
      <div><input id="ils" inputmode="decimal" placeholder="0"><div class="muted" style="text-align:center">שקל ₪</div></div></div>
    <div class="muted" style="margin-top:8px;font-size:13px">1 € = ${rate.v.toFixed(2)} ₪ ${rate.est ? "(הערכה – יתעדכן כשיש קליטה)" : `· שער רשמי מ-${when}`}</div></div>
  <div id="scanslot"></div>

  <div class="card tool"><h3>🎵 מוזיקה גרמנית</h3>
    <div class="em" style="border-top:0"><div class="big">🇩🇪</div><div style="flex:1"><b>ההמנון הגרמני</b><div class="muted" style="font-size:13px">הבית השלישי של "שיר הגרמנים" · מנגינה: יוזף היידן</div></div>
      <a class="btn gold" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=Deutsche+Nationalhymne+Einigkeit+und+Recht+und+Freiheit">▶️ להשמיע</a></div>
    <details class="anthem"><summary>📜 המילים והתרגום</summary>
      ${ANTHEM.map(([de, he]) => `<div class="ph" style="grid-template-columns:1fr"><div><b>${esc(de)}</b><small>${esc(he)}</small></div></div>`).join("")}
      <button class="btn" data-anthem="1" style="margin-top:8px">🔊 להקריא את המילים</button></details>
    <div class="em"><div class="big">🎤</div><div style="flex:1"><b>אירוויזיון 2006: "No No Never"</b><div class="muted" style="font-size:13px">Texas Lightning · השיר שגרמניה שלחה לאירוויזיון באתונה</div></div>
      <a class="btn gold" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=Texas+Lightning+No+No+Never+Eurovision+2006">▶️ להשמיע</a></div>
    <div class="muted" style="font-size:12px;margin-top:6px">שניהם נפתחים ביוטיוב – צריך קליטה.</div></div>

  <div class="card tool"><h3>🗣️ ביטויים בגרמנית</h3><div class="muted" style="font-size:13px">לוחצים על 🔊 כדי לשמוע איך אומרים</div>
    ${(() => { let i = 0; return GROUPS.map(g => `<h4 class="phg">${g[0]}</h4>` + g[1].map(p => `<div class="ph"><div><small>${esc(p[0])}</small><b>${esc(p[1])}</b><small>${esc(p[2])}</small></div>
      <button class="btn" data-say="${i++}">🔊</button></div>`).join("")).join(""); })()}</div>

  <div class="card tool"><h3>🆘 טלפונים חשובים</h3>
    <div class="em"><div class="big">112</div><div style="flex:1">אמבולנס וכיבוי אש<div class="muted" style="font-size:13px">מספר חירום בכל אירופה</div></div><a class="btn gold" href="tel:112">📞</a></div>
    <div class="em"><div class="big">110</div><div style="flex:1">משטרה</div><a class="btn gold" href="tel:110">📞</a></div>
    <div class="em"><div class="big">🇮🇱</div><div style="flex:1">שגרירות ישראל בברלין<div class="muted" style="font-size:13px">Auguste-Viktoria-Straße 74–76</div></div>
      <a class="btn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Botschaft des Staates Israel Auguste-Viktoria-Straße 74 Berlin")}">📍</a>
      <a class="btn" target="_blank" rel="noopener" href="https://new.embassies.gov.il/berlin">🔗</a></div>
    <div class="em"><div class="big">✉️</div><div style="flex:1">מוקד החירום של משרד החוץ<div class="muted" style="font-size:13px">911@mfa.gov.il</div></div><a class="btn" href="mailto:911@mfa.gov.il">✉️</a></div>
    <div class="muted" style="font-size:12px;margin-top:8px">כדאי לשמור גם את מספר החירום של ביטוח הנסיעות שלכם.</div></div>`;
  if (scan.panel) v.querySelector("#scanslot").replaceWith(scan.panel);
  v.querySelector("#scanbtn").onclick = () => scan.panel ? stopScan() : startScan();
  const e = $("#eur"), s = $("#ils");
  e.oninput = () => { const x = parseFloat(e.value); s.value = isNaN(x) ? "" : (x * rate.v).toFixed(2); };
  s.oninput = () => { const x = parseFloat(s.value); e.value = isNaN(x) ? "" : (x / rate.v).toFixed(2); };
  v.querySelectorAll("[data-say]").forEach(b => b.onclick = () => { const p = PHRASES[+b.dataset.say]; speak(p[1]); });
  const an = v.querySelector("[data-anthem]"); if (an) an.onclick = () => speak(ANTHEM.map(x => x[0]).join(" "));
}
render(); loadRate();
addEventListener("online", loadRate);
})();
