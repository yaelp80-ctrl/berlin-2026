/* אמת או בלוף + טרריום הנחשים */
(() => {
const F = window.FACTS;
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* ---------- הפרסים: כל 10 תשובות נכונות ---------- */
const SNAKES = {
  s1: { label: "הנחש", color: "#46B174", belly: "#B8E986", scale: 1, x: 70, y: 196 },
  s2: { label: "הנחשה", color: "#C77DFF", belly: "#F3D1FF", scale: 1, x: 280, y: 196, flip: 1 },
  b1: { label: "תינוק ראשון", color: "#4CC9F0", belly: "#CFF5FF", scale: .6, x: 150, y: 214 },
  b2: { label: "תינוקת שנייה", color: "#FFB703", belly: "#FFE8A8", scale: .6, x: 230, y: 222, flip: 1 },
  b3: { label: "תינוק שלישי", color: "#FF6B6B", belly: "#FFD0D0", scale: .6, x: 110, y: 226 }
};
const ACC = {
  // לובשים על הראש/צוואר
  santa: { n: "כובע סנטה", w: 1, e: "🎅" }, scarf: { n: "צעיף חורף", w: 1, e: "🧣" }, earmuffs: { n: "מחממי אוזניים", w: 1, e: "🎧" },
  antlers: { n: "קרני אייל", w: 1, e: "🦌" }, bowtie: { n: "פפיון חגיגי", w: 1, e: "🎀" }, rainbow: { n: "צעיף קשת", w: 1, e: "🌈" },
  beanie: { n: "כובע צמר עם פונפון", w: 1, e: "🧶" }, headband: { n: "סרט ראש של לוחם אנימה", w: 1, e: "🥋" }, crown: { n: "כתר", w: 1, e: "👑" },
  bell: { n: "קולר פעמון", w: 1, e: "🔔" }, glasses: { n: "משקפיים עגולים", w: 1, e: "👓" },
  // קישוטים לטרריום
  lights: { n: "שרשרת נורות", e: "💡", x: 0, y: 0 }, tree: { n: "עץ אשוח קטן", e: "🎄", x: 18, y: 150, s: 46 }, snowman: { n: "איש שלג", e: "⛄", x: 300, y: 160, s: 38 },
  gifts: { n: "ערימת מתנות", e: "🎁", x: 46, y: 196, s: 26 }, cocoa: { n: "כוס שוקו חם", e: "☕", x: 292, y: 210, s: 22 },
  snowmachine: { n: "מכונת שלג – שלג בתוך הטרריום!", e: "❄️", x: 312, y: 40, s: 22 }, star: { n: "כוכב זהב", e: "🌟", x: 118, y: 38, s: 26 },
  mistletoe: { n: "דבקון – הענף שמתנשקים מתחתיו", e: "🌿", x: 0, y: 0 }, stocking: { n: "גרב חג", e: "🧦", x: 60, y: 60, s: 24 },
  candle: { n: "נר", e: "🕯️", x: 250, y: 214, s: 22 }, sled: { n: "מזחלת", e: "🛷", x: 210, y: 236, s: 28 }, bear: { n: "דוב ברלינאי", e: "🐻", x: 318, y: 208, s: 26 },
  flag: { n: "דגל גאווה", e: "🏳️‍🌈", x: 22, y: 92, s: 24 }, ginger: { n: "בית ג'ינג'ר", e: "🏠", x: 96, y: 236, s: 26 },
  graffiti: { n: "קיר גרפיטי ברקע", e: "🎨", x: 0, y: 0 }, palette: { n: "פלטת ציור", e: "🖌️", x: 270, y: 236, s: 22 }, skates: { n: "מחליקיים", e: "⛸️", x: 140, y: 242, s: 22 },
  pretzel: { n: "בייגלה", e: "🥨", x: 318, y: 236, s: 22 }, wurst: { n: "קארי-וורסט", e: "🌭", x: 40, y: 236, s: 22 }, gamepad: { n: "שלט משחק", e: "🎮", x: 236, y: 186, s: 22 },
  block: { n: "קוביית פיקסלים", e: "🟫", x: 8, y: 220, s: 26 }, tower: { n: "מגדל הטלוויזיה", e: "🗼", x: 310, y: 96, s: 34 },
  wheel: { n: "גלגל ענק", e: "🎡", x: 96, y: 92, s: 32 }, carousel: { n: "קרוסלה", e: "🎠", x: 266, y: 120, s: 28 }, lantern: { n: "פנס", e: "🏮", x: 214, y: 58, s: 22 },
  cane: { n: "סוכריית מקל", e: "🍬", x: 180, y: 240, s: 20 }, books: { n: "ספרים", e: "📚", x: 300, y: 186, s: 22 }, music: { n: "נגן מוזיקה", e: "🎶", x: 130, y: 70, s: 22 },
  moon: { n: "ירח", e: "🌙", x: 258, y: 34, s: 22 }, disco: { n: "כדור דיסקו", e: "🪩", x: 70, y: 28, s: 24 }, rink: { n: "משטח החלקה", e: "🧊", x: 0, y: 0 },
  ampel: { n: "רמזור אמפלמן", e: "🚦", x: 326, y: 150, s: 24 }, fireworks: { n: "זיקוקים", e: "🎆", x: 24, y: 30, s: 26 },
  globe: { n: "כדור שלג ענק – הטרריום כולו!", e: "🔮", x: 0, y: 0 }
};
const REWARDS = ["s1", "santa", "lights", "tree", "scarf", "snowman", "gifts", "earmuffs", "cocoa", "snowmachine", "star",
  "s2", "mistletoe", "antlers", "stocking", "candle", "bowtie", "sled", "bear", "rainbow", "flag", "ginger",
  "b1", "beanie", "graffiti", "palette", "skates", "pretzel", "wurst", "headband", "gamepad", "block", "tower",
  "b2", "crown", "wheel", "carousel", "lantern", "cane", "bell", "glasses", "books", "music", "moon",
  "b3", "disco", "rink", "ampel", "fireworks", "globe"];

/* ---------- מצב (משותף, נשמר גם בשרת) ---------- */
const blank = () => ({ queue: [], done: [], score: 0, streak: 0, best: 0, names: {}, wear: {}, hidden: [], seen: 0 });
const FV = window.FACTS_VERSION || 1;
function load() {
  // אורח: משחק משלו, רק בזיכרון – מתאפס ביציאה
  const st = Object.assign(blank(), window.APP.isGuest() ? {} : (window.APP.getDoc("game") || {}));
  if (st.fv !== FV) { st.queue = []; st.done = []; st.score = 0; st.streak = 0; st.fv = FV; }
  return st;
}
let S = load();
let saveT;
const save = () => { if (window.APP.isGuest()) return; clearTimeout(saveT); saveT = setTimeout(() => window.APP.setDoc("game", S), 400); };
function fillQueue() {
  const have = new Set([...S.queue, ...S.done]);
  const add = []; for (let i = 0; i < F.length; i++) if (!have.has(i)) add.push(i);
  for (let i = add.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [add[i], add[j]] = [add[j], add[i]]; }
  S.queue.push(...add);
}
fillQueue();
const earned = () => Math.min(REWARDS.length, Math.floor(S.done.length / 10));
const unlocked = () => REWARDS.slice(0, earned());
const has = k => unlocked().includes(k);

let tab = "play", phase = "ask", last = null;

/* ---------- ציור נחש ---------- */
const SLITHER = c => `<animate attributeName="d" dur="${2.6 + c.x % 3 * .4}s" repeatCount="indefinite" calcMode="spline" keySplines=".45 0 .55 1;.45 0 .55 1"
  values="M-50 18 Q-30 -6 -8 14 T34 10;M-50 12 Q-30 26 -8 6 T34 10;M-50 18 Q-30 -6 -8 14 T34 10"/>`;
function snakeSVG(id) {
  const c = SNAKES[id], wear = S.wear[id] || [];
  const W = k => wear.includes(k);
  return `<g class="snake" data-snake="${id}" transform="translate(${ROAM[id] ? ROAM[id].x.toFixed(1) : c.x} ${c.y}) scale(${(ROAM[id] ? ROAM[id].dir : c.flip ? -1 : 1) * c.scale} ${c.scale})"><g class="mv"><g class="walk"><g class="idle" style="animation-delay:-${(c.x % 7) / 2}s">
   <g class="sbody">
    <path d="M-50 18 Q-30 -6 -8 14 T34 10" stroke="${c.color}" stroke-width="18" fill="none" stroke-linecap="round">${SLITHER(c)}</path>
    <path d="M-50 18 Q-30 -6 -8 14 T34 10" stroke="${c.belly}" stroke-width="4" stroke-dasharray="1 9" fill="none" stroke-linecap="round" opacity=".8">${SLITHER(c)}</path>
    ${W("scarf") ? `<path d="M28 4 q8 10 16 2" stroke="#E24C4B" stroke-width="7" fill="none" stroke-linecap="round"/><rect x="30" y="8" width="5" height="12" rx="2" fill="#E24C4B"/>` : ""}
    ${W("rainbow") ? `<g stroke-width="3" fill="none" stroke-linecap="round"><path d="M28 2 q8 10 16 2" stroke="#E40303"/><path d="M28 5 q8 10 16 2" stroke="#FF8C00"/><path d="M28 8 q8 10 16 2" stroke="#FFED00"/><path d="M28 11 q8 10 16 2" stroke="#008026"/><path d="M28 14 q8 10 16 2" stroke="#004DFF"/></g>` : ""}
    ${W("bell") ? `<circle cx="38" cy="14" r="4" fill="#FFD36E" stroke="#B8860B"/>` : ""}
    ${W("bowtie") ? `<path d="M32 12 l-7 -5 v10z M32 12 l7 -5 v10z" fill="#E24C4B"/><circle cx="32" cy="12" r="2" fill="#B5302F"/>` : ""}
   </g>
   <g class="shead" transform="translate(40 -4)">
    <ellipse cx="0" cy="0" rx="15" ry="12" fill="${c.color}"/>
    <g class="eyes"><circle cx="-4" cy="-4" r="4" fill="#fff"/><circle cx="6" cy="-4" r="4" fill="#fff"/>
    <circle class="pupil" cx="-3.5" cy="-3.5" r="2" fill="#1B2440"/><circle class="pupil" cx="6.5" cy="-3.5" r="2" fill="#1B2440"/>
    <rect class="lid" x="-9" y="-9" width="20" height="0" fill="${c.color}"/></g>
    <g class="happy"><path d="M-8 -3 q4 -5 8 0 M2 -3 q4 -5 8 0" stroke="#1B2440" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M-4 3 q6 8 12 0z" fill="#B5302F"/><circle cx="-9" cy="3" r="2.4" fill="#FF8FB1" opacity=".8"/><circle cx="12" cy="3" r="2.4" fill="#FF8FB1" opacity=".8"/></g>
    <path class="smile" d="M-2 5 q4 3 8 0" stroke="#1B2440" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    <path class="tongue" d="M14 3 h8 l3 -3 M22 3 l3 3" stroke="#E24C4B" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    ${W("glasses") ? `<g stroke="#1B2440" stroke-width="1.5" fill="rgba(255,255,255,.2)"><circle cx="-4" cy="-4" r="5"/><circle cx="6" cy="-4" r="5"/><path d="M1 -4h0"/></g>` : ""}
    ${W("headband") ? `<rect x="-14" y="-11" width="28" height="5" rx="2" fill="#fff"/><circle cx="1" cy="-8.5" r="2" fill="#E24C4B"/><path d="M-14 -9 l-8 4 M-14 -8 l-7 7" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>` : ""}
    ${W("earmuffs") ? `<path d="M-12 -8 Q0 -22 12 -8" stroke="#9AA9BC" stroke-width="2.5" fill="none"/><circle cx="-12" cy="-6" r="5" fill="#FF8FB1"/><circle cx="12" cy="-6" r="5" fill="#FF8FB1"/>` : ""}
    ${W("antlers") ? `<g stroke="#8A5233" stroke-width="2.6" fill="none" stroke-linecap="round"><path d="M-6 -10 l-4 -12 M-8 -16 l-6 -2 M-9 -19 l2 -6"/><path d="M6 -10 l4 -12 M8 -16 l6 -2 M9 -19 l-2 -6"/></g>` : ""}
    ${W("beanie") ? `<path d="M-13 -7 Q0 -26 13 -7z" fill="#1E5AA8"/><rect x="-14" y="-9" width="28" height="5" rx="2" fill="#EAF4FF"/><circle cx="0" cy="-20" r="4.5" fill="#EAF4FF"/>` : ""}
    ${W("santa") ? `<path d="M-13 -8 Q0 -12 13 -8 L4 -30 Z" fill="#E24C4B"/><rect x="-14" y="-11" width="28" height="5" rx="2.5" fill="#fff"/><circle cx="5" cy="-31" r="4" fill="#fff"/>` : ""}
    ${W("crown") ? `<path d="M-10 -9 l0 -12 l6 6 l4 -9 l4 9 l6 -6 l0 12 z" fill="#FFD36E" stroke="#B8860B"/>` : ""}
   </g></g></g></g></g>`;
}

/* ---------- הטרריום ---------- */
function terrariumSVG() {
  const u = unlocked(), show = k => u.includes(k) && !S.hidden.includes(k);
  const snakes = Object.keys(SNAKES).filter(k => u.includes(k));
  const decor = u.filter(k => ACC[k] && !ACC[k].w && ACC[k].s && show(k));
  return `<svg direction="ltr" viewBox="0 0 360 270" class="terra ${show("globe") ? "globe" : ""}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E3A72"/><stop offset="1" stop-color="#1B5B9E"/></linearGradient></defs>
    <rect x="4" y="10" width="352" height="252" rx="16" fill="url(#tg)" stroke="#BFE3FF" stroke-width="4" opacity=".95"/>
    ${show("graffiti") ? `<g opacity=".55"><rect x="8" y="110" width="344" height="90" fill="#7C8EA8"/><path d="M20 180 Q60 120 100 170 T190 150" stroke="#FF8FB1" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M200 130 l20 40 l20 -44 l20 40" stroke="#FFD36E" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="300" cy="150" r="14" fill="#46B174"/></g>` : ""}
    <path d="M8 222 Q90 206 180 220 T352 216 V258 H8Z" fill="#EAF4FF"/>
    ${show("rink") ? `<ellipse cx="180" cy="238" rx="80" ry="12" fill="#BDE7FF" stroke="#fff"/>` : ""}
    ${show("lights") ? `<path d="M12 24 Q90 54 180 26 T348 26" stroke="#3a2a18" stroke-width="1.5" fill="none"/>${[30, 60, 92, 124, 156, 204, 236, 268, 300, 330].map((x, i) => `<circle class="bulb" style="animation-delay:${i * .2}s" cx="${x}" cy="${i < 5 ? 28 + Math.sin(i) * 8 + 10 : 30 + Math.sin(i) * 6}" r="5" fill="${["#FFD36E", "#E24C4B", "#46B174", "#4CC9F0"][i % 4]}"/>`).join("")}` : ""}
    ${show("mistletoe") ? `<g class="mistle" data-kiss="1"><line x1="180" y1="12" x2="180" y2="62" stroke="#B5302F" stroke-width="2"/><path d="M180 62 q-16 -4 -20 8 q14 2 20 -8 q16 -4 20 8 q-14 2 -20 -8" fill="#2E8B57"/><circle cx="176" cy="70" r="3" fill="#fff"/><circle cx="184" cy="70" r="3" fill="#fff"/><path d="M174 58 q6 -6 12 0" stroke="#E24C4B" stroke-width="4" fill="none"/></g>` : ""}
    ${decor.map(k => `<text class="deco" x="${ACC[k].x}" y="${ACC[k].y + ACC[k].s}" font-size="${ACC[k].s}">${ACC[k].e}</text>`).join("")}
    ${snakes.map(snakeSVG).join("")}
    ${snakes.map(k => S.names[k] ? `<text class="sname" data-name="${k}" x="${SNAKES[k].x}" y="${SNAKES[k].y + 34 * SNAKES[k].scale + 8}" text-anchor="middle">${esc(S.names[k])}</text>` : "").join("")}
    ${show("snowmachine") || show("globe") ? `<g class="tsnow">${Array.from({ length: 22 }, (_, i) => `<circle cx="${12 + (i * 47) % 336}" cy="${-10 - (i * 23) % 120}" r="${1.5 + (i % 3)}" fill="#fff" style="animation-delay:${(i * .37) % 4}s;animation-duration:${4 + (i % 4)}s"/>`).join("")}</g>` : ""}
    ${!snakes.length ? `<g transform="translate(180 194)"><g class="egg"><ellipse rx="22" ry="28" fill="#F6E3C0" stroke="#D9B98A" stroke-width="2"/><circle cx="-6" cy="-6" r="4" fill="#E9CFA0"/><circle cx="8" cy="6" r="5" fill="#E9CFA0"/></g></g>` : ""}
    <path d="M14 18 Q20 120 14 250" stroke="#fff" stroke-width="3" opacity=".25" fill="none"/>
  </svg>`;
}

/* ---------- מסכים ---------- */
function header() {
  const total = F.length, d = S.done.length, toNext = 10 - (d % 10), e = earned();
  return `<div class="card"><div class="gtabs"><button class="chip ${tab === "play" ? "on" : ""}" data-gt="play">🤔 אמת או בלוף</button>
    <button class="chip ${tab === "terra" ? "on" : ""}" data-gt="terra">🐍 הטרריום</button></div>
    <div class="gstats"><div><b>${d}</b><span>מתוך ${total}</span></div><div><b>${S.score}</b><span>נקודות</span></div><div><b>${S.streak}🔥</b><span>רצף</span></div></div>
    ${e < REWARDS.length ? `<div class="prog"><i style="width:${(10 - toNext) * 10}%"></i></div><div class="muted" style="margin-top:4px">🎁 עוד ${toNext} תשובות נכונות לפרס הבא</div>` : `<div class="muted">🏆 אספת את כל הפרסים!</div>`}
    ${window.APP.isGuest() ? `<div class="muted" style="font-size:12px;margin-top:4px">👀 משחק אורח – ההתקדמות מתאפסת ביציאה</div>` : ""}
    ${total < 500 ? `<div class="muted" style="font-size:12px;margin-top:4px">עוד עובדות בדרך – בסוף יהיו 500</div>` : ""}</div>`;
}
function playView() {
  if (!S.queue.length) return `<div class="card soon">${window.ART.snake}<h2>סיימת את כל העובדות! 🎉</h2><div class="muted">${S.score} נקודות · רצף שיא ${S.best}</div></div>`;
  const id = phase === "ask" ? S.queue[0] : last.id, f = F[id];
  if (phase === "ask") return `<div class="card qcard" id="qcard"><div class="qtag">עובדה #${id + 1}${S.done.includes(id) ? "" : ""}</div>
      <div class="qtext">${esc(f[0])}</div>
      <div class="qbtns"><button class="qb bluff" data-ans="0">🤥 בלוף</button><button class="qb truth" data-ans="1">✅ אמת</button></div>
      <div class="muted" style="text-align:center;font-size:12px;margin-top:8px">אפשר גם להחליק: ימינה = אמת, שמאלה = בלוף</div></div>`;
  const ok = last.ok;
  return `<div class="card qcard ${ok ? "right" : "wrong"}"><div class="qres">${ok ? ["מעולה!", "בול!", "צדקת!", "אלוף!"][id % 4] + " 🎉" : "לא הפעם 🙃"}</div>
    <div class="qtext small">${esc(f[0])}</div>
    <div class="qans">${f[1] ? "✅ זה נכון" : "🤥 זה בלוף"}</div><div class="qexp">${esc(f[2])}</div>
    ${!ok ? `<div class="muted" style="font-size:13px">העובדה הזאת תחזור בהמשך – תזכור אותה 😉</div>` : ""}
    <button class="btn gold" style="width:100%;justify-content:center;margin-top:12px;font-size:17px;padding:12px" data-next="1">הבאה ←</button></div>`;
}
function terraView() {
  const u = unlocked(), snakes = Object.keys(SNAKES).filter(k => u.includes(k));
  const decos = u.filter(k => ACC[k] && !ACC[k].w), wears = u.filter(k => ACC[k] && ACC[k].w);
  const next = REWARDS[earned()];
  const nm = k => esc(S.names[k] || SNAKES[k].label);
  return `<div class="card">${terrariumSVG()}
    <div class="muted" style="text-align:center;font-size:13px;margin-top:6px">${snakes.length ? "לגעת בנחש כדי לדגדג אותו 😆" + (u.includes("mistletoe") && snakes.includes("s2") ? " · לגעת בדבקון 💋" : "") : "🥚 הביצה תבקע אחרי 10 תשובות נכונות"}</div></div>
    ${snakes.length ? `<div class="card"><h3 style="margin-top:0">👗 הארון והקישוטים</h3>
      ${snakes.map(k => `<div class="wrow"><div class="wname">${nm(k)} <button class="mini" data-rename="${k}">✏️</button></div>
        ${wears.length ? `<div class="chips">${wears.map(w => `<button class="chip ${(S.wear[k] || []).includes(w) ? "on" : ""}" data-wear="${w}" data-who="${k}">${ACC[w].e} ${esc(ACC[w].n)}</button>`).join("")}</div>`
          : `<div class="muted" style="font-size:13px">עוד אין בגדים – הם מגיעים כפרסים 🎁</div>`}</div>`).join("")}
      ${decos.length ? `<div class="wrow"><div class="wname">✨ קישוטים לטרריום</div><div class="chips">${decos.map(d => `<button class="chip ${S.hidden.includes(d) ? "" : "on"}" data-deco="${d}">${ACC[d].e} ${esc(ACC[d].n)}</button>`).join("")}</div></div>` : ""}
    </div>` : ""}
    ${next ? `<div class="card" style="text-align:center"><div class="muted">הפרס הבא</div><div style="font-size:34px">🎁</div><div class="muted">${SNAKES[next] ? "מישהו חדש מגיע… 🥚" : "הפתעה!"}</div></div>` : ""}`;
}
function render() {
  const v = $("#v-game"); if (!v) return;
  v.innerHTML = header() + (tab === "play" ? playView() : terraView());
  if (tab === "play" && phase === "ask") swipe($("#qcard"));
}

/* ---------- משחק ---------- */
function answer(says) {
  const id = S.queue[0], ok = F[id][1] === says;
  S.queue.shift();
  const before = earned();
  if (ok) {
    S.done.push(id); S.streak++; S.best = Math.max(S.best, S.streak);
    S.score += 10 + (S.streak % 5 === 0 ? 5 : 0);
  } else {
    S.streak = 0;
    const pos = Math.min(S.queue.length, 15 + Math.floor(Math.random() * 16));
    S.queue.splice(pos, 0, id);
  }
  last = { id, ok }; phase = "show"; save(); render();
  if (navigator.vibrate) navigator.vibrate(ok ? 30 : [40, 60, 40]);
  if (earned() > before) setTimeout(() => reward(REWARDS[earned() - 1]), 700);
}
function swipe(el) {
  if (!el) return; let x0 = null, dx = 0;
  el.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; dx = 0; el.style.transition = "none"; }, { passive: true });
  el.addEventListener("touchmove", e => { if (x0 == null) return; dx = e.touches[0].clientX - x0; el.style.transform = `translateX(${dx}px) rotate(${dx / 20}deg)`; }, { passive: true });
  el.addEventListener("touchend", () => { el.style.transition = ""; if (Math.abs(dx) > 90) answer(dx > 0); else el.style.transform = ""; x0 = null; });
}

/* ---------- פרס: מתנה או ביצה ---------- */
function reward(k) {
  const sn = SNAKES[k], a = ACC[k];
  const ov = document.createElement("div"); ov.className = "reward";
  ov.innerHTML = sn
    ? `<div class="rbox"><div class="egg-big">🥚</div><h2>משהו זז בביצה…</h2></div>`
    : `<div class="rbox"><div class="gift">🎁</div><h2>פרס חדש!</h2></div>`;
  document.body.appendChild(ov);
  setTimeout(() => {
    if (sn) {
      ov.querySelector(".rbox").innerHTML = `<svg viewBox="-20 -60 160 110" width="220">${snakeSVG(k).replace(/transform="translate\([^)]*\) scale\([^)]*\)"/, 'transform="translate(60 10) scale(1.2)"')}</svg>
        <h2>${k === "s2" ? "נחשה הגיעה לטרריום! 💜" : k === "s1" ? "הביצה בקעה! 🐍" : "נולד תינוק נחש! 🐣"}</h2>
        <div class="muted">איך קוראים ל${sn.label}?</div><input class="inp" id="sname" maxlength="14" placeholder="שם…" style="margin:10px 0;text-align:center;font-size:18px">
        <button class="btn gold" id="rok" style="font-size:18px;padding:10px 26px">יאללה!</button>`;
      $("#rok").onclick = () => { const n = $("#sname").value.trim(); if (n) S.names[k] = n; save(); ov.remove(); tab = "terra"; render(); };
    } else {
      ov.querySelector(".rbox").innerHTML = `<div class="gift-open">${a.e}</div><h2>${esc(a.n)}</h2>
        <div class="muted">${a.w ? "אפשר להלביש על הנחשים בטרריום" : "נוסף לטרריום!"}</div>
        <button class="btn gold" id="rok" style="font-size:18px;padding:10px 26px;margin-top:14px">לטרריום 🐍</button>
        <button class="btn" id="rstay" style="margin-top:8px">להמשיך לשחק</button>`;
      $("#rok").onclick = () => { ov.remove(); tab = "terra"; render(); };
      $("#rstay").onclick = () => ov.remove();
    }
  }, 1600);
}

/* ---------- הלבשה ---------- */
function wardrobe(id) {
  const ws = unlocked().filter(k => ACC[k] && ACC[k].w), cur = S.wear[id] || [];
  const name = S.names[id] || SNAKES[id].label;
  window.APP.sheet(`<h2>👗 הארון של ${esc(name)}</h2>
    ${ws.length ? `<div class="chips">${ws.map(k => `<button class="chip ${cur.includes(k) ? "on" : ""}" data-wear="${k}" data-who="${id}">${ACC[k].e} ${esc(ACC[k].n)}</button>`).join("")}</div>`
      : `<div class="muted">עוד אין בגדים – הם מגיעים כפרסים 🎁</div>`}
    <div style="margin-top:14px"><button class="btn" data-rename="${id}">✏️ לשנות שם</button></div>`);
}

/* ---------- שיטוט בטרריום ---------- */
const ROAM = {}; let roamFreeze = 0, roamT = 0;
Object.entries(SNAKES).forEach(([k, c], i) => ROAM[k] = { x: c.x, dir: c.flip ? -1 : 1, v: (c.scale < 1 ? 26 : 18) + i * 3, wait: 0 });
function placeSnakes() {
  document.querySelectorAll(".terra [data-snake]").forEach(el => {
    const k = el.dataset.snake, c = SNAKES[k], r = ROAM[k];
    el.setAttribute("transform", `translate(${r.x.toFixed(1)} ${c.y}) scale(${r.dir * c.scale} ${c.scale})`);
    const n = document.querySelector(`.terra [data-name="${k}"]`); if (n) n.setAttribute("x", r.x.toFixed(1));
  });
}
function roamStep(ts) {
  const dt = Math.min(.05, roamT ? (ts - roamT) / 1000 : 0); roamT = ts;
  if (Date.now() > roamFreeze && document.querySelector(".terra [data-snake]")) {
    document.querySelectorAll(".terra [data-snake]").forEach(el => {
      const k = el.dataset.snake, c = SNAKES[k], r = ROAM[k];
      if (el.classList.contains("tickle")) return;
      if (r.wait > 0) { r.wait -= dt; return; }
      const min = 14 + 58 * c.scale, max = 346 - 58 * c.scale;
      r.x += r.dir * r.v * dt;
      if (r.x <= min || r.x >= max) { r.x = Math.max(min, Math.min(max, r.x)); r.dir *= -1; r.wait = .4 + Math.random() * .8; }
      else if (Math.random() < dt * .12) { r.wait = .6 + Math.random() * 1.6; if (Math.random() < .4) r.dir *= -1; }
    });
    placeSnakes();
  }
  requestAnimationFrame(roamStep);
}
requestAnimationFrame(roamStep);

/* ---------- דגדוג ---------- */
const LAUGHS = ["חי חי חי!", "חחח זה מדגדג!", "הי הי הי 😆", "די! חחח", "עוד! חי חי"];
function tickle(el, id) {
  if (el.classList.contains("tickle")) return;
  el.classList.add("tickle");
  if (navigator.vibrate) navigator.vibrate([20, 40, 20, 40, 20]);
  const svg = document.querySelector(".terra"), c = SNAKES[id];
  const r = ROAM[id] || { x: c.x, dir: c.flip ? -1 : 1 }, headX = r.x + r.dir * 40 * c.scale, headY = c.y - 22 * c.scale;
  const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
  t.textContent = LAUGHS[Math.floor(Math.random() * LAUGHS.length)];
  t.setAttribute("x", Math.max(40, Math.min(320, headX))); t.setAttribute("y", headY - 8); t.setAttribute("text-anchor", "middle");
  t.setAttribute("class", "laugh"); t.setAttribute("direction", "rtl"); t.setAttribute("unicode-bidi", "plaintext"); svg.appendChild(t);
  setTimeout(() => { el.classList.remove("tickle"); t.remove(); }, 1500);
}

/* ---------- נשיקה מתחת לדבקון ---------- */
function kiss() {
  const a = document.querySelector('[data-snake="s1"]'), b = document.querySelector('[data-snake="s2"]');
  if (!a || !b) return window.APP.toast("צריך שניים בשביל נשיקה 😉");
  ROAM.s1 = { x: SNAKES.s1.x, dir: 1, v: ROAM.s1.v, wait: 0 }; ROAM.s2 = { x: SNAKES.s2.x, dir: -1, v: ROAM.s2.v, wait: 0 };
  roamFreeze = Date.now() + 3300; placeSnakes();
  a.classList.add("kissL"); b.classList.add("kissR");
  const svg = document.querySelector(".terra");
  for (let i = 0; i < 9; i++) {
    const h = document.createElementNS("http://www.w3.org/2000/svg", "text");
    h.textContent = "💗"; h.setAttribute("x", 160 + Math.random() * 40); h.setAttribute("y", 170); h.setAttribute("font-size", 14 + Math.random() * 10);
    h.setAttribute("class", "heart"); h.style.animationDelay = (0.6 + i * 0.12) + "s"; svg.appendChild(h);
  }
  setTimeout(() => render(), 3200);
}

/* ---------- אירועים ---------- */
document.addEventListener("click", e => {
  const inGame = e.target.closest("#v-game"), inSheet = e.target.closest("#sheet");
  if (!inGame && !inSheet) return;
  const t = e.target.closest("[data-gt],[data-ans],[data-next],[data-deco],[data-snake],[data-kiss],[data-wear],[data-rename]");
  if (!t) return; const d = t.dataset;
  if (d.gt) { tab = d.gt; render(); }
  else if (d.ans) answer(d.ans === "1");
  else if (d.next) { phase = "ask"; render(); scrollTo({ top: 0, behavior: "smooth" }); }
  else if (d.deco) { const k = d.deco; S.hidden = S.hidden.includes(k) ? S.hidden.filter(x => x !== k) : [...S.hidden, k]; save(); render(); }
  else if (d.kiss) kiss();
  else if (d.snake) tickle(t, d.snake);
  else if (d.wear) { const who = d.who, cur = S.wear[who] || []; S.wear[who] = cur.includes(d.wear) ? cur.filter(x => x !== d.wear) : [...cur, d.wear]; save(); render(); }
  else if (d.rename) { const n = prompt("שם חדש:", S.names[d.rename] || ""); if (n && n.trim()) { S.names[d.rename] = n.trim().slice(0, 14); save(); } render(); }
});

render();
window.GAME = {
  render,
  userChanged() { S = load(); fillQueue(); phase = "ask"; tab = "play"; render(); },
  onRemote() { if (window.APP.isGuest()) return; const r = window.APP.getDoc("game"); if (r && r.fv === FV) { S = Object.assign(blank(), r); fillQueue(); if (phase === "ask") render(); } }
};
})();
