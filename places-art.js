/* איורים למקומות – SVG מפורטים בשכבות: שמיים, קו רקיע רחוק, נושא מרכזי, חזית, אורות ושלג */
(() => {
const W = 360, H = 220;
let uid = 0;
const R = (i, m) => ((Math.sin(i * 127.1 + m * 311.7) * 43758.5453) % 1 + 1) % 1; // אקראי קבוע

/* ---------- שמיים ---------- */
const SKIES = {
  night: ["#071233", "#132C66", "#2B4A8C"], dusk: ["#1E1B4B", "#6B3E8C", "#F08A5D"], day: ["#4F9BE0", "#8FC6F2", "#DDF0FF"],
  dark: ["#020309", "#0A0D24", "#161A3A"], winter: ["#5C7CA8", "#9FB8D6", "#E3ECF6"], warm: ["#2A120B", "#5B2A16", "#8A4524"]
};
const skyDefs = (id, k) => { const c = SKIES[k] || SKIES.night;
  return `<linearGradient id="s${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset=".6" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></linearGradient>`; };
const stars = n => Array.from({ length: n }, (_, i) => `<circle class="pa-tw" style="animation-delay:-${(i % 9) * .5}s" cx="${R(i, 1) * W}" cy="${R(i, 2) * 90}" r="${R(i, 3) > .85 ? 1.5 : .8}" fill="#fff" opacity="${.35 + R(i, 4) * .6}"/>`).join("");
const moon = (x, y) => `<circle cx="${x}" cy="${y}" r="26" fill="#FFF6D6" opacity=".12"/><circle cx="${x}" cy="${y}" r="16" fill="#FFF6D6" opacity=".2"/><circle cx="${x}" cy="${y}" r="10" fill="#FFF8E1"/><circle cx="${x + 4}" cy="${y - 3}" r="2" fill="#EDE3C0"/>`;
const sun = (x, y) => `<circle cx="${x}" cy="${y}" r="34" fill="#FFF4C2" opacity=".25"/><circle cx="${x}" cy="${y}" r="15" fill="#FFE27A"/>`;
const clouds = (y, o = .8) => [40, 170, 290].map((x, i) => `<g opacity="${o}" transform="translate(${x + i * 7} ${y + (i % 2) * 10})"><ellipse rx="26" ry="9" fill="#fff"/><ellipse cx="16" cy="-6" rx="16" ry="9" fill="#fff"/><ellipse cx="-14" cy="-3" rx="13" ry="7" fill="#fff"/></g>`).join("");

/* ---------- קו רקיע רחוק עם חלונות מוארים ---------- */
const skyline = (base, col, lit, seed = 1, h = 60) => { let x = -5, out = "";
  while (x < W) { const w = 18 + R(x, seed) * 30, hh = 20 + R(x, seed + 1) * h;
    out += `<rect x="${x}" y="${base - hh}" width="${w}" height="${hh + 2}" fill="${col}"/>`;
    if (R(x, seed + 2) > .7) out += `<path d="M${x} ${base - hh} l${w / 2} -10 l${w / 2} 10z" fill="${col}"/>`;
    if (lit) for (let yy = base - hh + 6; yy < base - 6; yy += 9) for (let xx = x + 4; xx < x + w - 4; xx += 7)
      if (R(xx * yy, seed) > .62) out += `<rect x="${xx}" y="${yy}" width="3" height="4" fill="${lit}" opacity="${.5 + R(xx, yy) * .5}"/>`;
    x += w + 1; }
  return out; };

/* ---------- אנשים קטנים, שלג וזוהר ---------- */
const person = (x, y, c = "#1B2440", s = 1, scarf = "#E24C4B") => `<g transform="translate(${x} ${y}) scale(${s})"><circle cy="-22" r="4.5" fill="${c}"/><path d="M-5 -16 Q0 -18 5 -16 L6 0 H-6Z" fill="${c}"/><rect x="-5" y="-17" width="10" height="3" fill="${scarf}"/><rect x="-4" y="0" width="3" height="7" fill="${c}"/><rect x="1" y="0" width="3" height="7" fill="${c}"/></g>`;
const crowd = (y, n, seed = 3, c = "#141B33") => Array.from({ length: n }, (_, i) => person(20 + R(i, seed) * 320, y + R(i, seed + 1) * 6, c, .8 + R(i, seed + 2) * .35, ["#E24C4B", "#FFD36E", "#46B174", "#4CC9F0"][i % 4])).join("");
const snowfall = n => `<g class="pa-snow">${Array.from({ length: n }, (_, i) => `<circle cx="${R(i, 7) * W}" cy="${R(i, 8) * H}" r="${.8 + R(i, 9) * 1.8}" fill="#fff" opacity="${.5 + R(i, 10) * .5}" style="animation-delay:-${(R(i, 11) * 6).toFixed(1)}s;animation-duration:${(5 + R(i, 12) * 4).toFixed(1)}s"/>`).join("")}</g>`;
const snowGround = (y = 180) => `<path d="M0 ${y} Q60 ${y - 8} 120 ${y - 2} T240 ${y - 3} T360 ${y - 6} V${H} H0Z" fill="#EEF6FF"/><path d="M0 ${y + 8} Q90 ${y + 2} 180 ${y + 8} T360 ${y + 4} V${H} H0Z" fill="#DCEAF8"/>`;
const glow = (x, y, r, c, o = .5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#g${uid}${c.slice(1)})" opacity="${o}"/>`;
const glowDefs = cols => cols.map(c => `<radialGradient id="g${uid}${c.slice(1)}"><stop offset="0" stop-color="${c}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`).join("");
const bulbs = (y, amp = 14, n = 16, x0 = 0, x1 = W) => { const step = (x1 - x0) / (n - 1);
  return `<path d="M${x0} ${y} Q${(x0 + x1) / 4} ${y + amp} ${(x0 + x1) / 2} ${y} T${x1} ${y}" stroke="#2a1a10" stroke-width="1" fill="none"/>` +
    Array.from({ length: n }, (_, i) => { const x = x0 + i * step, t = (x - x0) / (x1 - x0), yy = y + Math.sin(t * Math.PI * 2) * amp * .5 + 3, c = ["#FFD36E", "#FF6B6B", "#6BE09A", "#6FD3FF"][i % 4];
      return `<circle cx="${x}" cy="${yy}" r="6" fill="${c}" opacity=".25"/><circle class="pa-bulb" style="animation-delay:${(i * .17).toFixed(2)}s" cx="${x}" cy="${yy}" r="2.8" fill="${c}"/>`; }).join(""); };
const em = (e, x, y, s = 28) => `<text x="${x}" y="${y}" font-size="${s}" text-anchor="middle">${e}</text>`;

/* ---------- רכיבים גדולים ---------- */
const stall = (x, y, roof, stripe, w = 70) => `<g transform="translate(${x} ${y})">
  <rect x="2" y="16" width="${w - 4}" height="44" fill="#6B3A1E"/><rect x="2" y="16" width="${w - 4}" height="44" fill="url(#wood${uid})"/>
  <rect x="7" y="24" width="${w - 14}" height="18" rx="2" fill="#FFCF73"/><rect x="7" y="24" width="${w - 14}" height="18" rx="2" fill="#FFF3C4" opacity=".35"/>
  ${Array.from({ length: Math.floor((w - 14) / 9) }, (_, i) => `<circle cx="${12 + i * 9}" cy="34" r="2.6" fill="${["#E24C4B", "#6B3A1E", "#2E8B57", "#C77DFF"][i % 4]}"/>`).join("")}
  <rect x="2" y="44" width="${w - 4}" height="4" fill="#4A2814"/>
  <path d="M-4 18 L${w / 2} -4 L${w + 4} 18Z" fill="${roof}"/>${Array.from({ length: 5 }, (_, i) => `<path d="M${-4 + i * (w + 8) / 5} 18 l${(w + 8) / 10} -5 l${(w + 8) / 10} 5z" fill="${stripe}"/>`).join("")}
  <path d="M-4 18 L${w / 2} -4 L${w + 4} 18" stroke="#fff" stroke-width="2" fill="none" opacity=".8"/>
  ${bulbs(19, 0, 6, 2, w - 2)}<ellipse cx="${w / 2}" cy="34" rx="${w * .7}" ry="26" fill="#FFCF73" opacity=".12"/></g>`;
const xtree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cy="2" rx="26" ry="5" fill="#000" opacity=".15"/>
  <path d="M0 -92 L30 -2 H-30Z" fill="#1F6B45"/><path d="M0 -92 L22 -40 H-22Z" fill="#2E8B57"/><path d="M0 -60 L26 -12 H-26Z" fill="#2E8B57" opacity=".7"/>
  <path d="M-24 -14 Q0 -26 24 -20 M-17 -42 Q0 -52 17 -46 M-10 -66 Q0 -72 10 -68" stroke="#FFD36E" stroke-width="1.6" fill="none"/>
  ${[[-12, -26, "#E24C4B"], [10, -32, "#6FD3FF"], [-4, -50, "#FFD36E"], [14, -12, "#C77DFF"], [-18, -8, "#FFD36E"], [5, -70, "#E24C4B"]].map(([a, b, c]) => `<circle cx="${a}" cy="${b}" r="3" fill="${c}"/><circle cx="${a - 1}" cy="${b - 1}" r="1" fill="#fff" opacity=".8"/>`).join("")}
  <rect x="-5" y="-2" width="10" height="9" fill="#5A3218"/><path d="M0 -102 l3.5 7 h7.5 l-6 4.5 2.3 7.5 -7.3 -4.6 -7.3 4.6 2.3 -7.5 -6 -4.5 h7.5z" fill="#FFD36E"/>${glow(0, -98, 14, "#FFD36E", .6)}</g>`;
const wheel = (x, y, r = 46) => `<g transform="translate(${x} ${y})"><path d="M-22 ${r + 44} L0 0 L22 ${r + 44}" stroke="#D9DEE8" stroke-width="4" fill="none"/>
  <g class="pa-spin"><circle r="${r}" fill="none" stroke="#FFE7A0" stroke-width="2.5"/><circle r="${r * .55}" fill="none" stroke="#FFE7A0" stroke-width="1" opacity=".6"/>
  ${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6, cx = Math.cos(a) * r, cy = Math.sin(a) * r;
    return `<line x2="${cx}" y2="${cy}" stroke="#FFE7A0" stroke-width="1"/><circle cx="${cx}" cy="${cy}" r="2" fill="#fff"/><rect x="${cx - 5}" y="${cy + 2}" width="10" height="8" rx="2" fill="${["#E24C4B", "#6FD3FF", "#6BE09A", "#C77DFF", "#FFD36E"][i % 5]}"/>`; }).join("")}</g>
  <circle r="5" fill="#fff"/>${glow(0, 0, r + 14, "#FFD36E", .25)}</g>`;
const tvTower = (x, base = 175) => `<g transform="translate(${x} 0)"><path d="M-6 ${base} L-3 70 H3 L6 ${base}Z" fill="#C7CFDD"/><path d="M-2 ${base} L-1 70 H1 L2 ${base}" fill="#fff" opacity=".4"/>
  <circle cy="62" r="17" fill="#B8C2D4"/><circle cy="62" r="17" fill="url(#sph${uid})"/><rect x="-18" y="70" width="36" height="5" rx="2" fill="#A9B4C8"/><rect x="-2" y="10" width="4" height="36" fill="#D9DEE8"/><rect x="-1.2" y="0" width="2.4" height="12" fill="#E24C4B"/>
  <circle class="pa-bulb" cy="2" r="2" fill="#FF6B6B"/>${Array.from({ length: 10 }, (_, i) => `<rect x="${-14 + i * 3}" y="60" width="2" height="3" fill="#FFD36E" opacity=".8"/>`).join("")}</g>`;
const rink = (x, y, w = 160) => `<g transform="translate(${x} ${y})"><ellipse rx="${w / 2 + 6}" ry="15" fill="#fff"/><ellipse rx="${w / 2}" ry="12" fill="#BFE6FF"/><ellipse rx="${w / 2 - 14}" ry="7" fill="#E6F6FF" opacity=".7"/>
  <path d="M${-w / 3} -3 q20 6 40 0 M${w / 8} 2 q16 -5 32 0" stroke="#fff" stroke-width="1.2" fill="none" opacity=".8"/>
  ${person(-30, 4, "#2A3A6E", .7, "#FFD36E")}${person(24, 2, "#6B2A4E", .65, "#6FD3FF")}${person(-4, 6, "#1E5A3A", .6, "#E24C4B")}</g>`;
const church = (x) => `<g transform="translate(${x} 0)" fill="#2E2A45"><rect x="-16" y="52" width="32" height="125"/><path d="M-16 52 Q0 18 16 52Z"/><path d="M-6 30 h12 l-6 -16z"/>
  <rect x="20" y="96" width="40" height="81" fill="#3A3557"/><rect x="-9" y="66" width="18" height="40" rx="9" fill="#5B4A80"/><circle cy="80" r="5" fill="#FFD36E" opacity=".7"/>
  ${Array.from({ length: 4 }, (_, i) => `<rect x="${26 + i * 9}" y="110" width="5" height="10" fill="#6FD3FF" opacity=".7"/>`).join("")}</g>`;
const prideFlag = (x, y) => `<g transform="translate(${x} ${y})"><rect x="-2" y="-6" width="3" height="110" fill="#E7E7EF"/><g class="pa-wave">${["#E40303", "#FF8C00", "#FFED00", "#008026", "#004DFF", "#750787"].map((c, i) => `<rect x="1" y="${i * 7}" width="58" height="7" fill="${c}"/>`).join("")}</g></g>`;

/* ---------- סצנות ---------- */
const SCENES = {
  gate: () => ["dusk", `${stars(18)}${moon(300, 40)}<g opacity=".55">${skyline(170, "#2B2550", "#FFD36E", 2, 46)}</g>
    <rect x="0" y="168" width="${W}" height="${H}" fill="#3B3150"/>
    <g transform="translate(180 0)">
      ${glow(0, 120, 120, "#FFD36E", .35)}
      <rect x="-118" y="166" width="236" height="10" fill="#C7B48E"/>
      <rect x="-112" y="70" width="224" height="16" fill="#F3E7CC"/><rect x="-104" y="62" width="208" height="9" fill="#E8D9B8"/>
      <rect x="-112" y="84" width="224" height="5" fill="#D8C59E"/>${Array.from({ length: 22 }, (_, i) => `<rect x="${-110 + i * 10}" y="73" width="5" height="9" fill="#D8C59E"/>`).join("")}
      <path d="M-40 62 h80 l-6 -12 h-68z" fill="#F3E7CC"/>
      ${[-104, -78, -44, 30, 64, 90].map(x => `<rect x="${x}" y="89" width="14" height="78" fill="#F3E7CC"/><rect x="${x + 9}" y="89" width="5" height="78" fill="#D8C59E"/><rect x="${x - 2}" y="87" width="18" height="4" fill="#E8D9B8"/>`).join("")}
      ${[-92, -60, 46, 78].map(x => `<rect x="${x}" y="92" width="10" height="75" fill="#FFE6A8" opacity=".35"/>`).join("")}
      <rect x="-28" y="89" width="56" height="78" fill="#FFE6A8" opacity=".45"/>
      <g fill="#3E7A68" transform="translate(0 50)"><path d="M-24 0 h48 l-4 -8 h-40z"/>
        ${[-18, -7, 4, 15].map((x, i) => `<path d="M${x} -8 q2 -10 6 -12 q3 -1 4 2 l-1 10z"/><path d="M${x + 1} -18 l-2 -5 M${x + 7} -20 l1 -5" stroke="#3E7A68" stroke-width="1.5"/>`).join("")}
        <path d="M-3 -10 q3 -20 3 -26 q2 4 3 26z"/><circle cy="-40" r="4"/><path d="M-4 -44 l4 -6 l4 6" stroke="#3E7A68" stroke-width="2" fill="none"/></g>
    </g>${crowd(196, 9, 5, "#1A1430")}${snowfall(40)}`],

  market: o => [o.sky || "night", `${stars(20)}${moon(40, 34)}<g opacity=".5">${skyline(150, "#0E1E44", "#FFD36E", 4, 50)}</g>
    ${o.tower ? tvTower(308) : ""}${o.church ? church(300) : ""}${o.wheel ? wheel(o.wheelX || 66, 92, 46) : ""}
    ${bulbs(26, 18, 18)}${snowGround(176)}
    ${stall(96, 118, "#C83737", "#fff")}${stall(176, 112, "#1F7A4D", "#FFD36E", 76)}${stall(262, 120, o.pride ? "#8E44AD" : "#1E5AA8", "#fff")}
    ${o.pride ? prideFlag(20, 70) : xtree(o.tower || o.church ? 28 : 330, 176, .95)}
    ${o.rink ? rink(180, 196, 170) : crowd(192, 10, 6)}${snowfall(45)}`],

  zoo: () => ["day", `${sun(320, 36)}${clouds(40, .7)}<path d="M0 150 Q90 130 180 146 T360 138 V220 H0Z" fill="#7FBF68"/><path d="M0 170 Q120 158 240 170 T360 166 V220 H0Z" fill="#6AAE58"/>
    <g transform="translate(22 52)"><rect width="166" height="112" rx="14" fill="#0B4F7A"/><rect x="5" y="5" width="156" height="102" rx="10" fill="url(#water${uid})"/>
      ${Array.from({ length: 6 }, (_, i) => `<path d="M${20 + i * 26} 105 q-6 -22 4 -38 q-2 18 6 38" fill="#2E8B57" opacity=".8"/>`).join("")}
      <path d="M14 92 q26 -26 50 -6 t48 -2 t40 -14" stroke="#3E9E5C" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M14 92 q26 -26 50 -6 t48 -2 t40 -14" stroke="#9BE07A" stroke-width="3" stroke-dasharray="2 6" fill="none" stroke-linecap="round"/>
      <ellipse cx="150" cy="70" rx="11" ry="8" fill="#3E9E5C"/><circle cx="154" cy="67" r="2.4" fill="#fff"/><circle cx="154.5" cy="67" r="1.2" fill="#111"/><path d="M160 72 l7 0 l3 -3 M167 72 l3 3" stroke="#E24C4B" stroke-width="1.5" fill="none"/>
      ${em("🐠", 40, 34, 18)}${em("🐢", 110, 40, 20)}${em("🐊", 60, 70, 22)}${[30, 70, 120].map((x, i) => `<circle class="pa-bub" style="animation-delay:${i * .7}s" cx="${x}" cy="60" r="3" fill="#BFE6FF" opacity=".7"/>`).join("")}
      <rect x="5" y="5" width="156" height="14" fill="#fff" opacity=".1"/></g>
    <g transform="translate(266 92)"><path d="M-60 0 h120 v-12 q-60 -30 -120 0z" fill="#B5502C"/><path d="M-62 -12 q62 -34 124 0" stroke="#7A3015" stroke-width="3" fill="none"/>
      <rect x="-50" y="0" width="16" height="70" fill="#C9B184"/><rect x="34" y="0" width="16" height="70" fill="#C9B184"/>${em("🐘", -42, -16, 20)}${em("🐘", 42, -16, 20)}<text y="-2" font-size="9" fill="#FFE6A8" text-anchor="middle" font-weight="700">ZOO</text></g>
    ${em("🦒", 206, 150, 40)}${em("🐘", 300, 180, 46)}${em("🐧", 222, 196, 24)}${em("🐧", 240, 200, 20)}${crowd(208, 5, 9, "#2A3550")}`],

  mall: () => ["winter", `${clouds(30, .6)}<g opacity=".6">${skyline(120, "#7D93B4", null, 6, 40)}</g>
    <rect x="20" y="58" width="320" height="120" fill="#EEF0F3"/><rect x="20" y="58" width="320" height="8" fill="#C9CED8"/><rect x="20" y="96" width="320" height="28" fill="#1F2438"/>
    ${Array.from({ length: 10 }, (_, i) => `<rect x="${30 + i * 31}" y="70" width="24" height="22" fill="#9FC9EE"/><rect x="${30 + i * 31}" y="70" width="24" height="6" fill="#fff" opacity=".4"/><rect x="${30 + i * 31}" y="130" width="24" height="40" fill="#BFE0FA"/>`).join("")}
    <text x="180" y="115" font-size="14" fill="#fff" text-anchor="middle" font-weight="800" letter-spacing="5">BIKINI BERLIN</text>
    ${em("🎎", 72, 160, 20)}${em("🧸", 134, 160, 18)}${em("🎮", 196, 160, 20)}${em("🐒", 288, 160, 22)}
    <rect x="20" y="40" width="320" height="18" fill="#7FBF68"/>${Array.from({ length: 8 }, (_, i) => `<circle cx="${40 + i * 40}" cy="42" r="9" fill="#5FA34F"/>`).join("")}
    <rect x="0" y="178" width="${W}" height="${H}" fill="#9BA3B4"/>${crowd(204, 8, 11, "#2A3550")}`],

  garden: () => ["dark", `${stars(40)}<path d="M0 170 Q180 150 360 170 V220 H0Z" fill="#0B1F18"/>
    ${[[40, 160, "#FFD36E"], [96, 150, "#6FD3FF"], [264, 152, "#C77DFF"], [322, 162, "#FF8FB1"]].map(([x, y, c], i) => `<g class="pa-glow" style="animation-delay:${i * .5}s">${glow(x, y - 40, 50, c, .35)}
      ${Array.from({ length: 7 }, (_, j) => `<path d="M${x - 26 + j * 2} ${y - j * 12} L${x} ${y - 14 - j * 12} L${x + 26 - j * 2} ${y - j * 12}" stroke="${c}" stroke-width="2" fill="none" opacity="${1 - j * .08}"/>`).join("")}
      ${Array.from({ length: 12 }, (_, j) => `<circle cx="${x - 22 + R(j, i) * 44}" cy="${y - R(j, i + 3) * 80}" r="1.6" fill="#fff"/>`).join("")}</g>`).join("")}
    ${Array.from({ length: 6 }, (_, i) => `<path class="pa-glow" style="animation-delay:${i * .25}s" d="M${120 + i * 4} 196 Q180 ${60 + i * 10} ${240 - i * 4} 196" stroke="${["#FFD36E", "#FF8FB1", "#6FD3FF"][i % 3]}" stroke-width="2.5" fill="none" opacity=".9"/>`).join("")}
    ${glow(180, 150, 70, "#FFD36E", .3)}${Array.from({ length: 40 }, (_, i) => `<circle class="pa-tw" style="animation-delay:-${i % 7}s" cx="${R(i, 21) * W}" cy="${178 + R(i, 22) * 34}" r="1.8" fill="${["#FFD36E", "#6FD3FF", "#FF8FB1", "#fff"][i % 4]}"/>`).join("")}
    ${person(170, 206, "#0B0F1E", 1)}${person(188, 208, "#0B0F1E", .8)}`],

  wall: () => ["day", `${sun(46, 34)}${clouds(28, .6)}<g opacity=".55">${skyline(120, "#7B97BB", null, 8, 40)}</g>
    <path d="M0 176 H360 V220 H0Z" fill="#4C86B0"/><path d="M0 182 q40 -3 80 0 t80 0 t80 0 t80 0 t80 0" stroke="#9FD0F0" stroke-width="2" fill="none"/>
    <rect x="0" y="80" width="${W}" height="96" fill="#ECE6DA"/><rect x="0" y="74" width="${W}" height="10" rx="5" fill="#DAD3C5"/>
    <g><circle cx="60" cy="126" r="30" fill="#FF8FB1"/><circle cx="50" cy="118" r="4" fill="#1B2440"/><circle cx="70" cy="118" r="4" fill="#1B2440"/><path d="M48 136 q12 10 24 0" stroke="#1B2440" stroke-width="3" fill="none"/>
      <path d="M100 172 q30 -76 66 0" fill="#4CC9F0"/><path d="M110 172 q20 -50 46 0" fill="#2E86C1"/>
      <g transform="rotate(-8 205 120)"><rect x="180" y="98" width="52" height="40" fill="#FFD36E"/><text x="206" y="124" font-size="14" font-weight="900" fill="#E24C4B" text-anchor="middle">LOVE</text></g>
      <path d="M150 92 q10 -8 20 0 q10 -8 20 0" stroke="#E24C4B" stroke-width="5" fill="none"/>
      <circle cx="290" cy="124" r="22" fill="#46B174"/><circle cx="283" cy="119" r="3.2"/><circle cx="297" cy="119" r="3.2"/><path d="M282 132 q8 6 16 0" stroke="#000" stroke-width="2" fill="none"/>
      <text x="336" y="150" font-size="18" font-weight="900" fill="#C77DFF" transform="rotate(-10 336 150)">ART</text>
      ${Array.from({ length: 30 }, (_, i) => `<circle cx="${R(i, 31) * W}" cy="${86 + R(i, 32) * 86}" r="${.8 + R(i, 33) * 1.4}" fill="${["#E24C4B", "#4CC9F0", "#FFD36E", "#C77DFF"][i % 4]}" opacity=".7"/>`).join("")}</g>
    ${[120, 240].map(x => `<line x1="${x}" y1="84" x2="${x}" y2="176" stroke="#CBC3B3" stroke-width="1.5"/>`).join("")}${crowd(212, 6, 13, "#2A3550")}`],

  darkmatter: () => ["dark", `${glow(180, 140, 160, "#6FD3FF", .25)}
    ${Array.from({ length: 4 }, (_, r) => Array.from({ length: 10 }, (_, c) => { const x = 22 + c * 36 + (r % 2) * 16, y = 18 + r * 26, s = .55 + r * .12, col = ["#6FD3FF", "#C77DFF", "#FFD36E"][(c + r) % 3];
      return `<g class="pa-glow" style="animation-delay:-${((c + r) * .37).toFixed(2)}s" transform="translate(${x} ${y}) scale(${s})" opacity="${.55 + r * .12}"><line y1="-30" y2="0" stroke="${col}" stroke-width=".8" opacity=".5"/><path d="M0 34 L-12 0 H12Z" fill="none" stroke="${col}" stroke-width="2"/><path d="M0 22 L-7 4 H7Z" fill="${col}" opacity=".3"/></g>`; }).join("")).join("")}
    ${Array.from({ length: 7 }, (_, i) => `<path class="pa-beam" style="animation-delay:${i * .45}s" d="M${30 + i * 50} 0 L${150 + i * 10} 190 L${170 + i * 10} 190Z" fill="${["#FF8FB1", "#6FD3FF", "#FFD36E"][i % 3]}" opacity=".18"/>`).join("")}
    <ellipse cx="180" cy="196" rx="176" ry="22" fill="#CFEFFF"/><ellipse cx="180" cy="196" rx="150" ry="14" fill="#fff" opacity=".5"/>
    ${[["#6FD3FF", 60], ["#C77DFF", 130], ["#FFD36E", 220], ["#6FD3FF", 300]].map(([c, x]) => `<ellipse cx="${x}" cy="198" rx="26" ry="3" fill="${c}" opacity=".5"/>`).join("")}
    ${person(140, 202, "#0B0F1E", .9, "#6FD3FF")}${person(210, 198, "#0B0F1E", .8, "#FFD36E")}${person(250, 204, "#0B0F1E", .7, "#C77DFF")}`],

  pub: () => ["night", `${stars(16)}${moon(320, 30)}<g opacity=".5">${skyline(60, "#0E1E44", "#FFD36E", 12, 30)}</g>
    <rect x="30" y="50" width="300" height="140" fill="#1C4A33"/><rect x="30" y="50" width="300" height="34" fill="#123224"/><rect x="30" y="84" width="300" height="4" fill="#C9A24A"/>
    <text x="180" y="75" font-size="22" fill="#F5D27A" text-anchor="middle" font-family="Georgia,serif" font-weight="700">MacLaren's Pub</text>
    ${[52, 192].map(x => `<rect x="${x}" y="100" width="116" height="74" fill="#FFB054"/>${glow(x + 58, 137, 70, "#FFB054", .35)}<path d="M${x} 137 h116 M${x + 58} 100 v74" stroke="#123224" stroke-width="4"/><rect x="${x}" y="100" width="116" height="74" fill="none" stroke="#C9A24A" stroke-width="3"/>`).join("")}
    <g><rect x="64" y="146" width="40" height="22" rx="4" fill="#8B1E2E"/><rect x="118" y="146" width="40" height="22" rx="4" fill="#8B1E2E"/>${em("🍔", 112, 136, 18)}${em("🍺", 232, 136, 18)}${em("🍺", 272, 140, 16)}<rect x="210" y="150" width="90" height="6" fill="#5A3218"/></g>
    <rect x="0" y="190" width="${W}" height="30" fill="#2C2C3A"/>${glow(180, 200, 120, "#FFB054", .25)}${crowd(214, 4, 15, "#0B0F1E")}${snowfall(30)}`],

  books: () => ["dusk", `${stars(10)}<rect x="30" y="40" width="300" height="150" fill="#4B2770"/><rect x="30" y="40" width="300" height="30" fill="#3A1E58"/>
    <text x="180" y="62" font-size="15" fill="#FFD36E" text-anchor="middle" font-weight="800" letter-spacing="2">PRINZ EISENHERZ</text>
    <rect x="52" y="80" width="256" height="96" fill="#FFF0C8"/>${glow(180, 128, 120, "#FFE08A", .3)}
    ${[0, 1, 2].map(r => Array.from({ length: 17 }, (_, i) => `<rect x="${58 + i * 14.5}" y="${86 + r * 30 + (i % 3) * 3}" width="11" height="${24 - (i % 3) * 3}" fill="${["#E24C4B", "#4CC9F0", "#46B174", "#FFD36E", "#C77DFF", "#FF8C42"][(i + r) % 6]}"/>`).join("") + `<rect x="54" y="${111 + r * 30}" width="252" height="3" fill="#8A5233"/>`).join("")}
    <rect x="0" y="190" width="${W}" height="30" fill="#2C2C3A"/>${crowd(214, 4, 17, "#120A20")}`],

  cafe: () => ["day", `${clouds(24, .6)}<rect x="30" y="50" width="300" height="140" fill="#FFF6EA"/>
    ${["#E40303", "#FF8C00", "#FFED00", "#008026", "#004DFF", "#750787"].map((c, i) => `<path d="M${30 + i * 50} 50 h50 v20 q-25 12 -50 0z" fill="${c}"/>`).join("")}
    ${[54, 194].map(x => `<rect x="${x}" y="88" width="112" height="84" fill="#BFE3FF"/><rect x="${x}" y="88" width="112" height="16" fill="#fff" opacity=".4"/>`).join("")}
    ${em("🍰", 92, 146, 30)}${em("🧁", 132, 150, 22)}${em("☕", 232, 148, 30)}${em("🥐", 272, 150, 22)}
    ${[70, 300].map(x => `<g transform="translate(${x} 196)"><rect x="-16" y="-14" width="32" height="4" fill="#5A3218"/><rect x="-2" y="-10" width="4" height="14" fill="#5A3218"/></g>`).join("")}<rect x="0" y="196" width="${W}" height="24" fill="#A8A8B4"/>`],

  potsdamMarket: () => ["night", `${stars(18)}${moon(52, 30)}${wheel(292, 84, 50)}
    ${[18, 70, 122].map((x, i) => `<g><path d="M${x} 176 V96 l24 -30 l24 30 V176Z" fill="${i % 2 ? "#A13B2C" : "#B24A3A"}"/><path d="M${x} 96 l24 -30 l24 30" stroke="#7A2A1E" stroke-width="2" fill="none"/>
      ${[0, 1].map(r => [0, 1].map(c => `<rect x="${x + 8 + c * 20}" y="${108 + r * 26}" width="12" height="16" fill="#FFCF73"/>`).join("")).join("")}</g>`).join("")}
    ${bulbs(30, 16, 16)}${snowGround(178)}${stall(160, 120, "#C83737", "#fff", 64)}${stall(228, 124, "#1F7A4D", "#FFD36E", 60)}${rink(180, 200, 190)}${snowfall(40)}`],

  dutch: () => ["dusk", `${stars(12)}${moon(330, 28)}
    ${[0, 72, 144, 216, 288].map((x, i) => { const c = i % 2 ? "#B24A3A" : "#9E3D2F";
      return `<g transform="translate(${x} 0)"><path d="M4 186 V92 h6 v-8 h8 v-8 h8 Q36 ${56 + (i % 2) * 6} 46 76 h8 v8 h8 v8 h6 V186Z" fill="${c}"/>
      ${Array.from({ length: 8 }, (_, r) => `<path d="M4 ${100 + r * 11} H68" stroke="#7A2A1E" stroke-width=".6" opacity=".6"/>`).join("")}
      <rect x="14" y="104" width="16" height="22" fill="#FFCF73"/><rect x="42" y="104" width="16" height="22" fill="#FFCF73"/><path d="M14 115 h16 M22 104 v22 M42 115 h16 M50 104 v22" stroke="${c}" stroke-width="2"/>
      <rect x="27" y="146" width="18" height="40" rx="9" fill="#3A1A10"/><rect x="14" y="140" width="10" height="14" fill="#FFCF73" opacity=".7"/><rect x="48" y="140" width="10" height="14" fill="#FFCF73" opacity=".7"/>
      <circle cx="36" cy="80" r="4" fill="#fff" opacity=".85"/>${glow(36, 115, 40, "#FFCF73", .2)}</g>`; }).join("")}
    ${bulbs(140, 8, 14)}<rect x="0" y="186" width="${W}" height="34" fill="#8F8278"/>${crowd(212, 6, 19, "#1A1020")}${snowfall(35)}`],

  palace: () => ["day", `${sun(320, 34)}${clouds(36, .7)}
    <path d="M0 120 Q180 90 360 120 V220 H0Z" fill="#8DB87A"/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M${36 + i * 14} ${188 - i * 14} H${324 - i * 14}" stroke="#4F7A3E" stroke-width="7"/>${Array.from({ length: 10 - i }, (_, j) => `<rect x="${48 + i * 14 + j * (264 - i * 28) / (10 - i)}" y="${178 - i * 14}" width="10" height="8" fill="#6FA35A" opacity=".8"/>`).join("")}`).join("")}
    <rect x="166" y="104" width="28" height="90" fill="#D9CBB0"/>${Array.from({ length: 12 }, (_, i) => `<rect x="168" y="${108 + i * 7}" width="24" height="3" fill="#BFAE90"/>`).join("")}
    <rect x="70" y="58" width="220" height="44" fill="#F2D27A"/><rect x="70" y="56" width="220" height="5" fill="#E2BE60"/>
    ${Array.from({ length: 11 }, (_, i) => `<rect x="${78 + i * 19}" y="66" width="10" height="30" rx="5" fill="#fff" opacity=".9"/><rect x="${76 + i * 19}" y="62" width="14" height="4" fill="#E2BE60"/>`).join("")}
    <path d="M150 58 Q180 18 210 58Z" fill="#6FA898"/><path d="M152 58 Q180 26 208 58" stroke="#4E8576" stroke-width="2" fill="none"/><circle cx="180" cy="22" r="4" fill="#E9C46A"/>
    <text x="180" y="52" font-size="8" fill="#8A6A2A" text-anchor="middle" letter-spacing="1">SANS SOUCI.</text>
    ${em("🥔", 300, 210, 16)}${crowd(208, 4, 21, "#2A3550")}`],

  biosphere: () => ["winter", `${clouds(26, .7)}<path d="M20 186 Q20 56 180 44 Q340 56 340 186Z" fill="#D8F2EA" opacity=".9"/>
    ${Array.from({ length: 9 }, (_, i) => `<path d="M${30 + i * 37.5} 186 Q${40 + i * 35} 70 180 46" stroke="#A8D8CA" stroke-width="1.6" fill="none"/>`).join("")}
    ${[80, 120, 160].map(y => `<path d="M${30 + (186 - y) * .1} ${y} Q180 ${y - 20} ${330 - (186 - y) * .1} ${y}" stroke="#A8D8CA" stroke-width="1.2" fill="none"/>`).join("")}
    <path d="M40 186 Q120 150 200 172 T330 160 V186Z" fill="#3E8E5A"/>${glow(180, 140, 120, "#FFF4C2", .25)}
    ${em("🌴", 78, 172, 62)}${em("🌴", 286, 176, 54)}${em("🌿", 140, 178, 30)}${em("🌺", 176, 172, 22)}${em("🍌", 220, 150, 20)}${em("🦎", 236, 182, 24)}${em("🐸", 120, 186, 18)}
    ${[["🦋", 150, 96], ["🦋", 206, 82], ["🦋", 252, 116], ["🐦", 112, 110]].map(([e, x, y], i) => `<g class="pa-fly" style="animation-delay:${i * .8}s">${em(e, x, y, 18)}</g>`).join("")}
    <rect x="0" y="186" width="${W}" height="34" fill="#9FB4C8"/>${crowd(212, 5, 23, "#2A3550")}`],

  dino: () => ["warm", `<rect width="${W}" height="${H}" fill="#E9DAC0"/><path d="M0 0 H360 V40 Q180 60 0 40Z" fill="#D6C2A0"/>
    ${[20, 120, 240, 340].map(x => `<rect x="${x - 7}" y="0" width="14" height="190" fill="#D2BC98"/><rect x="${x - 10}" y="180" width="20" height="10" fill="#BFA67E"/>`).join("")}
    ${Array.from({ length: 6 }, (_, i) => `<path d="M${i * 60} 40 Q${30 + i * 60} 18 ${60 + i * 60} 40" stroke="#C6AE86" stroke-width="3" fill="none"/>`).join("")}
    ${glow(180, 30, 80, "#FFF4C2", .5)}
    <g fill="none" stroke="#5E4C36" stroke-linecap="round" stroke-linejoin="round">
      <path d="M78 186 L84 150 L92 126 M108 186 L104 150 L110 126 M196 186 L200 150 L194 124 M226 186 L222 150 L214 124" stroke-width="6"/>
      <path d="M60 126 Q150 96 236 120" stroke-width="7"/>${Array.from({ length: 11 }, (_, i) => `<path d="M${80 + i * 14} ${116 - Math.sin(i / 3) * 4} q2 18 -2 26" stroke-width="2.5"/>`).join("")}
      <path d="M230 116 Q262 80 268 18" stroke-width="6"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${236 + i * 3.6} ${108 - i * 10} h8" stroke-width="2"/>`).join("")}
      <path d="M60 126 Q30 132 16 160 Q10 172 4 178" stroke-width="4"/></g>
    <path d="M262 16 q12 -8 24 -2 q6 4 -2 8 q-10 4 -22 2z" fill="#5E4C36"/><circle cx="276" cy="12" r="1.5" fill="#E9DAC0"/>
    <rect x="40" y="186" width="230" height="8" fill="#BFA67E"/><rect x="0" y="194" width="${W}" height="26" fill="#B79C74"/>
    ${person(150, 210, "#3A2A1A", 1, "#E24C4B")}${person(172, 212, "#3A2A1A", .8, "#4CC9F0")}`],

  restaurant: () => ["night", `${stars(12)}<rect y="0" width="${W}" height="${H}" fill="#1A1C30" opacity=".4"/>
    ${[60, 180, 300].map(x => `<g><line x1="${x}" y1="0" x2="${x}" y2="40" stroke="#555" stroke-width="1"/><path d="M${x - 14} 40 h28 l-6 14 h-16z" fill="#E24C4B"/>${glow(x, 62, 40, "#FFD36E", .5)}</g>`).join("")}
    <rect x="0" y="140" width="${W}" height="80" fill="#5A3218"/><rect x="0" y="140" width="${W}" height="6" fill="#7A4A28"/>
    <ellipse cx="180" cy="170" rx="104" ry="24" fill="#2B2F48" opacity=".5"/><ellipse cx="180" cy="160" rx="96" ry="22" fill="#F7F7F7"/>
    <path d="M96 160 Q180 226 264 160Z" fill="#C83737"/><path d="M110 160 Q180 210 250 160" stroke="#fff" stroke-width="2" fill="none" opacity=".4"/>
    <path d="M118 150 q62 -18 124 0" stroke="#F5C451" stroke-width="12" fill="none" stroke-linecap="round" opacity=".8"/>${em("🍥", 150, 154, 22)}${em("🥚", 205, 154, 20)}${em("🌿", 178, 150, 18)}
    <line x1="270" y1="86" x2="208" y2="148" stroke="#8A5233" stroke-width="6" stroke-linecap="round"/><line x1="286" y1="92" x2="218" y2="150" stroke="#8A5233" stroke-width="6" stroke-linecap="round"/>
    ${em("🍣", 50, 190, 28)}${em("🍶", 310, 192, 26)}${[150, 176, 202].map((x, i) => `<path class="pa-steam" style="animation-delay:${i * .6}s" d="M${x} 130 q-8 -12 0 -24 q8 -12 0 -24" stroke="#fff" stroke-width="2" fill="none" opacity=".4"/>`).join("")}`],

  show: () => ["dark", `<rect width="${W}" height="${H}" fill="#12061A"/>
    ${[90, 180, 270].map((x, i) => `<path class="pa-beam" style="animation-delay:${i * .5}s" d="M${x} 0 L${x - 70} 190 H${x + 70}Z" fill="${["#FFE8B0", "#C77DFF", "#6FD3FF"][i]}" opacity=".16"/>`).join("")}
    <path d="M0 0 H360 V36 Q300 56 180 40 Q60 56 0 36Z" fill="#8B1E2E"/>${Array.from({ length: 12 }, (_, i) => `<path d="M${i * 30} 0 v40" stroke="#6E1524" stroke-width="2"/>`).join("")}<path d="M0 36 Q60 56 180 40 Q300 56 360 36" stroke="#E2B24A" stroke-width="3" fill="none"/>
    <path d="M0 0 Q36 110 6 220 H0Z" fill="#8B1E2E"/><path d="M360 0 Q324 110 354 220 H360Z" fill="#8B1E2E"/>
    <rect x="0" y="184" width="${W}" height="36" fill="#2A1A14"/><rect x="0" y="184" width="${W}" height="4" fill="#E2B24A"/>
    ${Array.from({ length: 9 }, (_, i) => { const x = 50 + i * 32, c = ["#FF6B9A", "#FFD36E", "#6FD3FF", "#C77DFF"][i % 4];
      return `<g transform="translate(${x} 182)"><circle cy="-34" r="5" fill="#F2D0A4"/><path d="M-8 -40 l8 -12 l8 12" fill="${c}"/><path d="M-5 -28 h10 l8 22 h-26z" fill="${c}"/><path d="M-3 -6 l-6 6 M3 -6 l8 6" stroke="#F2D0A4" stroke-width="2.5"/><path d="M-5 -24 l-12 -14 M5 -24 l12 -14" stroke="#F2D0A4" stroke-width="2"/></g>`; }).join("")}
    ${Array.from({ length: 30 }, (_, i) => `<circle class="pa-tw" style="animation-delay:-${i % 5}s" cx="${R(i, 41) * W}" cy="${50 + R(i, 42) * 120}" r="${1 + R(i, 43) * 1.5}" fill="#FFE8B0"/>`).join("")}
    ${Array.from({ length: 14 }, (_, i) => `<circle cx="${14 + i * 26}" cy="214" r="9" fill="#0B0510"/>`).join("")}`],

  spray: () => ["winter", `${clouds(24, .6)}<rect x="0" y="40" width="${W}" height="146" fill="#D6D0C4"/>${Array.from({ length: 5 }, (_, i) => `<line x1="${i * 80 + 40}" y1="40" x2="${i * 80 + 40}" y2="186" stroke="#C2BBAD"/>`).join("")}
    <path d="M20 150 q40 -70 80 -10 t80 -6" stroke="#4CC9F0" stroke-width="20" fill="none" stroke-linecap="round"/><path d="M20 150 q40 -70 80 -10 t80 -6" stroke="#1B6E9A" stroke-width="3" fill="none" stroke-linecap="round" opacity=".6"/>
    <text x="166" y="128" font-size="54" font-weight="900" fill="#FF8FB1" stroke="#1B2440" stroke-width="3" paint-order="stroke" transform="rotate(-6 166 128)">KAY</text>
    <circle cx="322" cy="70" r="22" fill="#FFD36E" stroke="#1B2440" stroke-width="3"/><path d="M311 66 h6 M327 66 h6 M312 78 q10 8 20 0" stroke="#1B2440" stroke-width="3" fill="none"/>
    ${Array.from({ length: 40 }, (_, i) => `<circle cx="${180 + R(i, 51) * 160}" cy="${60 + R(i, 52) * 90}" r="${.6 + R(i, 53)}" fill="#FF8FB1" opacity=".7"/>`).join("")}
    <rect x="0" y="186" width="${W}" height="34" fill="#9A9AA6"/>
    ${[[60, "#E24C4B"], [92, "#4CC9F0"], [270, "#46B174"]].map(([x, c]) => `<g transform="translate(${x} 188)"><rect x="-10" y="0" width="20" height="38" rx="5" fill="${c}"/><rect x="-10" y="10" width="20" height="10" fill="#fff" opacity=".7"/><rect x="-5" y="-7" width="10" height="8" rx="2" fill="#333"/></g>`).join("")}
    ${person(180, 210, "#2A3550", 1.1, "#FFD36E")}<path d="M188 188 l26 -14" stroke="#4CC9F0" stroke-width="3"/><path class="pa-spray" d="M214 174 l26 -16 l2 10z" fill="#4CC9F0" opacity=".4"/>`],

  courtyard: () => ["dusk", `${stars(8)}<rect x="0" y="0" width="120" height="${H}" fill="#4D3E39"/><rect x="240" y="0" width="120" height="${H}" fill="#4D3E39"/>
    <rect x="120" y="0" width="120" height="60" fill="#3C302C"/>
    <rect x="10" y="20" width="100" height="160" fill="#6E5D55"/><circle cx="60" cy="70" r="26" fill="#FFD36E"/><circle cx="52" cy="66" r="3"/><circle cx="68" cy="66" r="3"/><path d="M50 80 q10 8 20 0" stroke="#000" stroke-width="2" fill="none"/>
    <path d="M18 150 q40 -40 84 0" stroke="#4CC9F0" stroke-width="9" fill="none"/>${Array.from({ length: 20 }, (_, i) => `<rect x="${14 + R(i, 61) * 88}" y="${100 + R(i, 62) * 70}" width="${6 + R(i, 63) * 8}" height="${4 + R(i, 64) * 6}" fill="${["#E24C4B", "#fff", "#46B174", "#C77DFF", "#FFD36E"][i % 5]}" transform="rotate(${(R(i, 65) - .5) * 40} ${20 + R(i, 61) * 88} ${100 + R(i, 62) * 70})"/>`).join("")}
    <rect x="250" y="20" width="100" height="160" fill="#6E5D55"/><text x="300" y="70" font-size="24" font-weight="900" fill="#FF8FB1" text-anchor="middle">ART</text>
    <path d="M262 110 q38 -30 76 0 q-38 30 -76 0z" fill="#46B174"/><circle cx="300" cy="110" r="10" fill="#1B2440"/>
    <g transform="translate(180 60)"><rect x="-26" y="0" width="52" height="16" fill="#3A2F2B"/>${glow(0, 60, 80, "#FFD36E", .35)}${em("🎨", 0, 70, 34)}${em("🤖", -32, 120, 26)}${em("👾", 34, 116, 22)}</g>
    <rect x="120" y="180" width="120" height="40" fill="#2E2522"/>${bulbs(40, 10, 9, 120, 240)}${person(170, 206, "#140E0C", 1)}${person(196, 208, "#140E0C", .85)}`],

  catcafe: () => ["day", `<rect width="${W}" height="${H}" fill="#F3E6D3"/>
    <path d="M40 0 Q180 -40 320 0 V60 H40Z" fill="#CFE8FA" opacity=".9"/>${Array.from({ length: 7 }, (_, i) => `<line x1="${40 + i * 46.6}" y1="0" x2="${40 + i * 46.6}" y2="60" stroke="#9AA9B8" stroke-width="3"/>`).join("")}<rect x="30" y="58" width="300" height="6" fill="#B08A5A"/>
    ${glow(180, 30, 120, "#fff", .5)}
    <rect x="20" y="70" width="60" height="120" rx="6" fill="#C9A06E"/><rect x="14" y="100" width="72" height="10" rx="4" fill="#8A5233"/><rect x="14" y="140" width="72" height="10" rx="4" fill="#8A5233"/>
    <g class="pa-bub"><ellipse cx="50" cy="92" rx="18" ry="10" fill="#7A6A60"/><circle cx="64" cy="84" r="9" fill="#7A6A60"/><path d="M58 77 l2 -7 l4 5z M66 76 l4 -6 l1 7z" fill="#7A6A60"/><path d="M33 92 q-12 -2 -10 -12" stroke="#7A6A60" stroke-width="4" fill="none" stroke-linecap="round"/></g>
    <rect x="120" y="150" width="140" height="10" rx="4" fill="#8A5233"/><rect x="135" y="160" width="8" height="40" fill="#8A5233"/><rect x="238" y="160" width="8" height="40" fill="#8A5233"/>
    ${em("☕", 150, 146, 22)}${em("🥐", 190, 146, 20)}${em("🍰", 228, 146, 20)}
    <g transform="translate(290 170)"><ellipse cx="0" cy="10" rx="26" ry="16" fill="#E8A15A"/><circle cx="-18" cy="-6" r="13" fill="#E8A15A"/><path d="M-27 -14 l-2 -12 l9 7z M-13 -17 l4 -11 l3 11z" fill="#E8A15A"/>
      <path d="M-23 -6 q2 2 4 0 M-15 -6 q2 2 4 0" stroke="#5A3A20" stroke-width="1.5" fill="none"/><path d="M-19 -1 l-2 2 h4z" fill="#D46A6A"/>${[0, 1, 2].map(i => `<path d="M${-6 + i * 10} 0 q4 8 0 18" stroke="#C87F3E" stroke-width="3" fill="none"/>`).join("")}
      <path class="tail" d="M24 12 q18 -6 14 -26" stroke="#E8A15A" stroke-width="6" fill="none" stroke-linecap="round"/></g>
    <g transform="translate(110 196)"><ellipse cx="0" cy="0" rx="22" ry="9" fill="#333"/><circle cx="18" cy="-6" r="9" fill="#333"/><path d="M13 -13 l1 -7 l4 5z M20 -14 l4 -6 l0 7z" fill="#333"/><text x="-6" y="-14" font-size="12" class="pa-tw" fill="#8A7A9A">z</text><text x="2" y="-24" font-size="9" class="pa-tw" style="animation-delay:-1s" fill="#8A7A9A">z</text></g>
    ${em("🐾", 330, 70, 18)}${em("💚", 340, 120, 16)}`],

  cafe2d: () => ["day", `<rect width="${W}" height="${H}" fill="#FAFAFA"/>
    <g fill="none" stroke="#111" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="20" width="90" height="70"/><path d="M28 80 l20 -26 l14 16 l10 -12 l30 22"/><circle cx="90" cy="38" r="7"/>
      <rect x="236" y="16" width="96" height="90"/><path d="M246 96 h76 M246 30 h76"/><text x="284" y="71" font-size="22" fill="#111" stroke="none" text-anchor="middle" font-weight="900">CAFE</text>
      <path d="M140 18 q20 -10 40 0 q-20 10 -40 0z"/><line x1="160" y1="22" x2="160" y2="60"/><path d="M140 60 h40 l-6 22 h-28z"/>
      <path d="M0 150 H${W}"/><path d="M90 150 h140 M100 150 v52 M220 150 v52 M90 142 h140 v8"/>
      <path d="M40 202 v-46 q0 -12 14 -12 h12 v58 M66 172 h-26"/><path d="M280 202 v-46 q0 -12 -14 -12 h-12 v58 M254 172 h26"/>
      <path d="M128 142 q-4 -24 8 -26 q14 -2 12 26z"/><path d="M144 122 q10 -14 2 -24"/><path d="M180 142 l-6 -26 h28 l-6 26z"/>
      <path d="M330 202 v-60 q-20 -10 -10 -40 q14 10 10 40 q16 -20 26 -6 q-14 6 -26 6"/>
    </g>
    <g class="pa-steam"><path d="M150 112 q-6 -8 0 -16 q6 -8 0 -16" stroke="#111" stroke-width="2" fill="none"/></g>
    <circle cx="186" cy="114" r="10" fill="#C77DFF" stroke="#111" stroke-width="3"/><path d="M174 116 h24 l-4 24 h-16z" fill="#B49CF2" stroke="#111" stroke-width="3"/>
    <path d="M120 142 q14 -30 30 0z" fill="#8FD17A" stroke="#111" stroke-width="3"/>
    ${[0, 1, 2, 3, 4].map(i => `<line x1="${20 + i * 70}" y1="206" x2="${40 + i * 70}" y2="220" stroke="#111" stroke-width="2"/>`).join("")}`],

  boardgames: () => ["night", `<rect width="${W}" height="${H}" fill="#2A1E1A"/>${glow(180, 70, 160, "#FFD36E", .35)}
    <line x1="180" y1="0" x2="180" y2="30" stroke="#555" stroke-width="2"/><path d="M160 30 h40 l-8 16 h-24z" fill="#E8A15A"/>
    ${[0, 1, 2].map(r => `<rect x="14" y="${40 + r * 46}" width="90" height="6" fill="#6B3A1E"/>` + Array.from({ length: 6 }, (_, i) => `<rect x="${18 + i * 14}" y="${14 + r * 46}" width="12" height="26" fill="${["#E24C4B", "#4CC9F0", "#FFD36E", "#46B174", "#C77DFF", "#FF8C42"][(i + r) % 6]}"/>`).join("")).join("")}
    ${[0, 1, 2].map(r => `<rect x="256" y="${40 + r * 46}" width="90" height="6" fill="#6B3A1E"/>` + Array.from({ length: 6 }, (_, i) => `<rect x="${260 + i * 14}" y="${18 + r * 46}" width="12" height="22" fill="${["#46B174", "#FFD36E", "#E24C4B", "#C77DFF", "#4CC9F0", "#FF8C42"][(i + r) % 6]}"/>`).join("")).join("")}
    <ellipse cx="180" cy="176" rx="150" ry="34" fill="#8A5233"/><ellipse cx="180" cy="170" rx="150" ry="34" fill="#A8683C"/>
    <polygon points="180,138 236,160 180,184 124,160" fill="#F6E7C8" stroke="#6B3A1E" stroke-width="2"/>
    ${[[160, 152, "#E24C4B"], [196, 156, "#4CC9F0"], [176, 168, "#46B174"]].map(([x, y, c]) => `<path d="M${x} ${y} l-5 10 h10z" fill="${c}"/><circle cx="${x}" cy="${y - 2}" r="4" fill="${c}"/>`).join("")}
    <g class="pa-bub"><rect x="250" y="150" width="20" height="20" rx="4" fill="#fff" stroke="#333" stroke-width="1.5" transform="rotate(15 260 160)"/><circle cx="255" cy="156" r="2" fill="#333"/><circle cx="265" cy="164" r="2" fill="#333"/><circle cx="260" cy="160" r="2" fill="#333"/></g>
    ${em("🃏", 96, 172, 24)}${em("☕", 300, 190, 22)}${em("🍪", 70, 200, 20)}`],

  lego: () => ["day", `${clouds(24, .6)}<g opacity=".6">${skyline(80, "#7B97BB", null, 26, 30)}</g>
    <rect x="30" y="44" width="300" height="146" fill="#F4F4F4"/><rect x="30" y="44" width="300" height="34" fill="#E3000B"/>
    <rect x="150" y="48" width="60" height="26" rx="4" fill="#FFD500" stroke="#000" stroke-width="2"/><text x="180" y="67" font-size="16" font-weight="900" fill="#E3000B" text-anchor="middle" stroke="#000" stroke-width=".6">LEGO</text>
    ${Array.from({ length: 6 }, (_, r) => Array.from({ length: 11 }, (_, i) => { const c = ["#E3000B", "#FFD500", "#0055BF", "#00852B", "#FE8A18", "#A0A5A9"][(i * 3 + r * 5) % 6], x = 42 + i * 14 + (r % 2) * 7, y = 86 + r * 16; return `<rect x="${x}" y="${y}" width="13" height="14" fill="${c}"/><circle cx="${x + 4}" cy="${y + 4}" r="2" fill="#fff" opacity=".3"/><circle cx="${x + 9}" cy="${y + 4}" r="2" fill="#fff" opacity=".3"/>`; }).join("")).join("")}
    <rect x="210" y="86" width="108" height="98" fill="#CFE8FA"/>${glow(264, 136, 70, "#fff", .4)}
    ${[[236, "#0055BF"], [264, "#E3000B"], [292, "#00852B"]].map(([x, c], i) => `<g class="pa-bub" style="animation-delay:${i * .7}s" transform="translate(${x} 150)"><rect x="-8" y="-30" width="16" height="13" rx="3" fill="#FFD500"/><circle cx="-3" cy="-24" r="1.3" fill="#000"/><circle cx="3" cy="-24" r="1.3" fill="#000"/><path d="M-3 -20 q3 2 6 0" stroke="#000" stroke-width="1" fill="none"/><rect x="-6" y="-33" width="12" height="4" fill="#FFD500"/><path d="M-10 -16 h20 l2 16 h-24z" fill="${c}"/><rect x="-9" y="0" width="8" height="14" fill="#333"/><rect x="1" y="0" width="8" height="14" fill="#333"/></g>`).join("")}
    <rect x="0" y="190" width="${W}" height="30" fill="#A8A8B4"/>${crowd(214, 5, 27, "#2A3550")}`],

  kpop: () => ["night", `${stars(14)}<g opacity=".7">${skyline(80, "#2B2F48", "#FFD36E", 26, 30)}</g>
    <rect x="30" y="44" width="300" height="146" fill="#2A1446"/><rect x="30" y="44" width="300" height="34" fill="#140A26"/>
    <text x="180" y="68" font-size="19" font-weight="900" fill="#FF8FE0" text-anchor="middle" letter-spacing="3" class="pa-glow">SEOULSTATION</text>
    <rect x="44" y="86" width="272" height="96" fill="#3B1D63"/>${glow(180, 134, 140, "#C77DFF", .5)}
    ${[0, 1].map(r => `<rect x="50" y="${120 + r * 36}" width="260" height="3" fill="#8A6BBF"/>`).join("")}
    ${Array.from({ length: 16 }, (_, i) => `<rect x="${56 + i * 16}" y="${96 + (i % 3)}" width="13" height="${22 - (i % 3)}" fill="${["#FF6B9A", "#6FD3FF", "#FFD36E", "#C77DFF", "#6BE09A", "#fff"][i % 6]}"/>`).join("")}
    ${Array.from({ length: 7 }, (_, i) => `<g class="pa-tw" style="animation-delay:${i * .3}s"><rect x="${70 + i * 34}" y="134" width="4" height="20" fill="#ddd"/><circle cx="${72 + i * 34}" cy="130" r="8" fill="${["#FF8FE0", "#6FD3FF", "#B9FF66", "#FFD36E", "#C77DFF", "#FF6B6B", "#7CF0E0"][i]}"/></g>`).join("")}
    ${em("💜", 70, 172, 18)}${em("🎤", 130, 172, 18)}${em("💿", 190, 172, 18)}${em("⭐", 250, 172, 18)}${em("🎧", 300, 172, 18)}
    <rect x="0" y="190" width="${W}" height="30" fill="#2B2F48"/>${crowd(214, 5, 27, "#140A26")}`],

  techmuseum: () => ["day", `${clouds(20, .8)}
    <rect x="60" y="88" width="250" height="102" fill="#8FA3B8"/>    ${Array.from({ length: 9 }, (_, i) => `<rect x="${68 + i * 27}" y="100" width="22" height="78" fill="#BFD6EA" opacity=".85"/><line x1="${68 + i * 27}" y1="139" x2="${90 + i * 27}" y2="139" stroke="#6E8297" stroke-width="2"/>`).join("")}
    <rect x="56" y="82" width="258" height="8" fill="#5E7185"/>
    <g class="pa-fly"><g transform="translate(190 52)"><path d="M-70 0 Q0 -8 70 0 Q0 8 -70 0Z" fill="#E8ECF0"/><path d="M-6 -2 L-30 -34 L-18 -34 L14 -2Z" fill="#CFD6DE"/><path d="M-6 2 L-30 34 L-18 34 L14 2Z" fill="#B8C1CB"/>
      <path d="M58 -1 L74 -14 L78 -14 L70 0Z" fill="#CFD6DE"/>${[-40, -20, 0, 20, 40].map(x => `<circle cx="${x}" cy="-1" r="2" fill="#5E7185"/>`).join("")}<circle cx="-22" cy="-20" r="4" fill="#555"/><circle cx="-22" cy="20" r="4" fill="#555"/></g></g>
    <line x1="140" y1="56" x2="140" y2="82" stroke="#5E7185" stroke-width="2"/><line x1="240" y1="56" x2="240" y2="82" stroke="#5E7185" stroke-width="2"/>
    <rect x="0" y="190" width="${W}" height="30" fill="#9AA0A8"/><path d="M0 200 H${W} M0 210 H${W}" stroke="#6E6E76" stroke-width="2"/>${Array.from({ length: 20 }, (_, i) => `<rect x="${i * 18}" y="198" width="6" height="14" fill="#7A5A3A"/>`).join("")}
    <g transform="translate(10 160)"><rect x="0" y="8" width="70" height="26" rx="4" fill="#2B2B33"/><rect x="50" y="-8" width="22" height="20" fill="#3A3A44"/><rect x="10" y="-2" width="8" height="12" fill="#2B2B33"/><circle cx="16" cy="36" r="8" fill="#555"/><circle cx="54" cy="36" r="8" fill="#555"/><path class="pa-steam" d="M14 -4 q-6 -10 0 -20 q6 -10 0 -20" stroke="#fff" stroke-width="3" fill="none" opacity=".6"/></g>
    ${em("⚙️", 330, 176, 26)}${person(160, 210, "#2A3550", 1)}${person(186, 212, "#2A3550", .8, "#E24C4B")}`],

  shop: () => ["day", `${clouds(24, .6)}<g opacity=".6">${skyline(80, "#7B97BB", null, 26, 30)}</g>
    <rect x="30" y="50" width="300" height="140" fill="#FFE6EF"/><rect x="30" y="50" width="300" height="30" fill="#C77DFF"/><text x="180" y="71" font-size="17" fill="#fff" text-anchor="middle" font-weight="800" letter-spacing="3">NEO TOKYO</text>
    ${["#FF6B9A", "#FFD36E", "#6FD3FF", "#6BE09A"].map((c, i) => `<path d="M${30 + i * 75} 80 h75 v14 q-37 10 -75 0z" fill="${c}"/>`).join("")}
    <rect x="48" y="100" width="264" height="80" fill="#CFE8FA"/>${glow(180, 140, 120, "#fff", .4)}
    ${[0, 1].map(r => `<rect x="52" y="${130 + r * 26}" width="256" height="3" fill="#8A5233"/>`).join("")}
    ${Array.from({ length: 20 }, (_, i) => `<rect x="${56 + i * 12.5}" y="${110 + (i % 2) * 2}" width="9" height="${18 - (i % 2) * 2}" fill="${["#E24C4B", "#4CC9F0", "#FFD36E", "#C77DFF", "#46B174"][i % 5]}"/>`).join("")}
    ${em("🎎", 90, 156, 22)}${em("🍡", 140, 156, 20)}${em("🐱", 190, 156, 22)}${em("🍬", 240, 156, 20)}${em("🗾", 286, 156, 20)}
    <rect x="0" y="190" width="${W}" height="30" fill="#A8A8B4"/>${crowd(214, 5, 27, "#2A3550")}`],

  art: () => ["day", `<rect width="${W}" height="${H}" fill="#F6F1E6"/><rect x="0" y="150" width="${W}" height="70" fill="#E6DCC8"/>
    ${Array.from({ length: 3 }, (_, r) => `<rect x="10" y="${30 + r * 40}" width="340" height="4" fill="#C9B79C"/>`).join("")}
    ${Array.from({ length: 3 }, (_, r) => Array.from({ length: 16 }, (_, i) => `<rect x="${16 + i * 21}" y="${12 + r * 40}" width="16" height="18" rx="2" fill="${["#E24C4B", "#FFD36E", "#46B174", "#4CC9F0", "#C77DFF", "#FF8C42", "#1B2440"][(i + r * 3) % 7]}"/>`).join("")).join("")}
    ${Array.from({ length: 12 }, (_, i) => `<g transform="translate(${70 + i * 20} ${150}) rotate(${(i % 5 - 2) * 7})"><rect x="-5" y="-70" width="10" height="70" rx="2" fill="${["#E24C4B", "#FFD36E", "#46B174", "#4CC9F0", "#C77DFF", "#FF8C42"][i % 6]}"/><path d="M-5 0 L0 12 L5 0Z" fill="#F2D0A4"/><path d="M-1.6 8 L0 12 L1.6 8Z" fill="#333"/></g>`).join("")}
    <rect x="50" y="150" width="260" height="40" rx="6" fill="#B08A5A"/><rect x="50" y="150" width="260" height="8" fill="#C9A06E"/>
    ${em("🎨", 40, 210, 30)}${em("🖌️", 330, 206, 28)}${em("📓", 180, 210, 26)}`],

  avocado: () => ["day", `<rect width="${W}" height="${H}" fill="#EAF6E6"/>${Array.from({ length: 14 }, (_, i) => em(["🌿", "🪴", "🍃"][i % 3], 14 + i * 26, 30 + (i % 2) * 10, 22)).join("")}
    <rect x="0" y="150" width="${W}" height="70" fill="#D6C2A0"/><rect x="0" y="150" width="${W}" height="6" fill="#BFA67E"/>
    <ellipse cx="180" cy="170" rx="90" ry="20" fill="#fff"/>${em("🥑", 140, 176, 52)}${em("🍞", 210, 172, 40)}${em("🥑", 268, 120, 40)}${em("🥤", 70, 150, 34)}${em("☕", 300, 196, 26)}`],

  tropical: () => ["day", `<rect width="${W}" height="${H}" fill="#E9F3FA"/>
    <path d="M6 190 Q6 30 180 22 Q354 30 354 190Z" fill="#F6FBFF" stroke="#BFD3E3" stroke-width="3"/>${Array.from({ length: 11 }, (_, i) => `<path d="M${20 + i * 32} 190 Q${30 + i * 30} 60 180 24" stroke="#C9DBE8" stroke-width="1.4" fill="none"/>`).join("")}
    ${[70, 110, 150].map(y => `<path d="M${10 + (190 - y) * .05} ${y} Q180 ${y - 18} ${350 - (190 - y) * .05} ${y}" stroke="#C9DBE8" stroke-width="1" fill="none"/>`).join("")}
    ${glow(180, 120, 140, "#FFE27A", .35)}<path d="M20 172 Q100 150 190 164 T350 156 V190 H20Z" fill="#33C3DD"/><path d="M40 170 q30 -6 60 0 t60 0 t60 0 t60 0" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/>
    <path d="M250 70 Q300 100 278 150 Q264 170 240 176" stroke="#FF8C42" stroke-width="12" fill="none" stroke-linecap="round"/><rect x="246" y="60" width="18" height="120" fill="#B0BFCC"/><rect x="236" y="58" width="38" height="8" fill="#8899AA"/>
    ${em("🌴", 56, 160, 54)}${em("🌴", 330, 158, 50)}${em("🌴", 110, 150, 34)}${em("⛱️", 160, 186, 26)}${em("🏊", 200, 172, 18)}${em("🛟", 120, 176, 16)}
    <rect x="0" y="186" width="${W}" height="34" fill="#F3DCA4"/>${crowd(212, 4, 29, "#B5552C")}`],

  spy: () => ["dark", `<rect width="${W}" height="${H}" fill="#07070F"/>${Array.from({ length: 9 }, (_, i) => `<line class="pa-beam" style="animation-delay:${i * .22}s" x1="0" y1="${20 + i * 22}" x2="360" y2="${190 - i * 19}" stroke="#FF3B3B" stroke-width="1.6"/>`).join("")}
    ${Array.from({ length: 9 }, (_, i) => `<circle cx="0" cy="${20 + i * 22}" r="3" fill="#FF3B3B"/>`).join("")}${glow(180, 150, 90, "#FF3B3B", .2)}
    <g transform="translate(180 196)"><path d="M-20 0 q4 -30 20 -34 q16 4 20 34z" fill="#111"/><circle cy="-46" r="11" fill="#111"/><path d="M-20 -50 h40 l-6 -10 h-28z" fill="#111"/><rect x="-14" y="-48" width="28" height="5" fill="#2A2A2A"/><path d="M-10 -30 l-18 -16 M10 -30 l14 -22" stroke="#111" stroke-width="5"/></g>
    ${em("🔍", 300, 60, 30)}${em("📷", 56, 60, 24)}${em("🔐", 312, 170, 22)}`],

  kadewe: () => ["dusk", `${stars(10)}<g opacity=".5">${skyline(120, "#2B2550", "#FFD36E", 31, 40)}</g>
    <rect x="30" y="34" width="300" height="156" fill="#EADFC9"/><rect x="30" y="34" width="300" height="22" fill="#1F2438"/><text x="180" y="51" font-size="15" fill="#F5D27A" text-anchor="middle" font-weight="800" letter-spacing="6">KaDeWe</text>
    ${Array.from({ length: 5 }, (_, r) => Array.from({ length: 9 }, (_, c) => `<rect x="${42 + c * 32}" y="${64 + r * 24}" width="22" height="16" fill="${r === 4 ? "#FFE08A" : "#FFD36E"}" opacity="${.65 + R(r * c, 2) * .35}"/>`).join("")).join("")}
    ${bulbs(62, 6, 14, 30, 330)}<rect x="0" y="190" width="${W}" height="30" fill="#8F92A0"/>${xtree(28, 200, .6)}${xtree(334, 200, .6)}${crowd(214, 7, 33, "#140E20")}${snowfall(30)}`],

  ice: () => ["night", `<rect width="${W}" height="${H}" fill="#0C2E5C"/>${glow(180, 110, 170, "#6FD3FF", .35)}
    ${Array.from({ length: 4 }, (_, r) => Array.from({ length: 7 }, (_, c) => `<rect x="${c * 52 - (r % 2) * 26}" y="${114 + r * 26}" width="50" height="24" fill="#CDEBFF" opacity="${.55 + R(r, c) * .3}" stroke="#fff" stroke-width=".8"/>`).join("")).join("")}
    <path d="M120 114 L180 34 L240 114Z" fill="#E6F6FF" opacity=".9"/><path d="M180 34 L204 114" stroke="#fff" stroke-width="2" opacity=".7"/>
    <rect x="148" y="134" width="64" height="40" fill="#D6F0FF"/><rect x="148" y="134" width="64" height="6" fill="#fff"/>${em("🍹", 166, 132, 18)}${em("🧃", 194, 132, 16)}
    ${person(100, 208, "#E24C4B", 1.1, "#fff")}${person(260, 206, "#1E5AA8", 1, "#FFD36E")}${em("❄️", 50, 50, 22)}${em("❄️", 310, 40, 18)}${snowfall(30)}`],

  illusion: () => ["dusk", `<rect width="${W}" height="${H}" fill="#1E1440"/>
    <g transform="translate(180 110)">${Array.from({ length: 14 }, (_, i) => `<rect x="${-150 + i * 11}" y="${-104 + i * 7.5}" width="${300 - i * 22}" height="${208 - i * 15}" fill="none" stroke="${["#FFD36E", "#C77DFF", "#6FD3FF"][i % 3]}" stroke-width="3" transform="rotate(${i * 5})"/>`).join("")}</g>
    <g transform="translate(180 110)" class="pa-spin">${Array.from({ length: 12 }, (_, i) => `<path d="M0 0 L${Math.cos(i * Math.PI / 6) * 30} ${Math.sin(i * Math.PI / 6) * 30}" stroke="${i % 2 ? "#fff" : "#1E1440"}" stroke-width="10"/>`).join("")}</g>
    ${em("👁️", 180, 120, 26)}${person(80, 206, "#FFD36E", 1.6)}${person(290, 206, "#6FD3FF", .6)}`],

  arcade: () => ["dark", `<rect width="${W}" height="${H}" fill="#0E0820"/>${Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="${150 + i * 9}" x2="360" y2="${150 + i * 9}" stroke="#C77DFF" opacity=".25"/>`).join("")}${Array.from({ length: 12 }, (_, i) => `<line x1="${180 + (i - 6) * 12}" y1="150" x2="${180 + (i - 6) * 70}" y2="220" stroke="#C77DFF" opacity=".25"/>`).join("")}
    ${[66, 180, 294].map((x, i) => { const c = ["#C77DFF", "#4CC9F0", "#FF6B9A"][i];
      return `<g transform="translate(${x} 0)">${glow(0, 90, 70, c, .3)}<path d="M-40 196 V54 l12 -20 h56 l12 20 V196Z" fill="${c}"/><path d="M-40 54 l12 -20 h56 l12 20" fill="#fff" opacity=".2"/>
      <rect x="-28" y="38" width="56" height="12" rx="2" fill="#111"/><text y="47" font-size="8" fill="${c}" text-anchor="middle" font-weight="900">${["PAC", "SPACE", "PONG"][i]}</text>
      <rect x="-28" y="58" width="56" height="46" fill="#05051A"/><rect x="-28" y="58" width="56" height="46" fill="url(#scr${uid})"/>
      ${i === 0 ? `<circle cx="-6" cy="82" r="9" fill="#FFD36E"/><path d="M-6 82 L4 76 L4 88Z" fill="#05051A"/>${[8, 16, 24].map(d => `<circle cx="${d}" cy="82" r="2" fill="#fff"/>`).join("")}` : i === 1 ? `${[-16, -4, 8].map(d => `<rect x="${d}" y="66" width="8" height="6" fill="#46B174"/>`).join("")}<rect x="-4" y="94" width="10" height="5" fill="#fff"/>` : `<rect x="-24" y="70" width="3" height="16" fill="#fff"/><rect x="20" y="76" width="3" height="16" fill="#fff"/><circle cx="2" cy="82" r="2.4" fill="#fff"/>`}
      <rect x="-34" y="110" width="68" height="20" fill="#222"/><circle cx="-14" cy="120" r="5" fill="#E24C4B"/><rect x="6" y="114" width="4" height="10" fill="#666"/><circle cx="8" cy="113" r="3.5" fill="#E24C4B"/></g>`; }).join("")}
    ${em("👾", 180, 22, 20)}${person(100, 212, "#0B0510", 1)}${person(250, 214, "#0B0510", .9)}`],

  mural: () => ["day", `${sun(330, 30)}${clouds(26, .6)}<rect x="30" y="10" width="200" height="190" fill="#EFE4D2"/>
    <circle cx="130" cy="84" r="58" fill="#4CC9F0"/><circle cx="112" cy="72" r="10" fill="#fff"/><circle cx="152" cy="72" r="10" fill="#fff"/><circle cx="114" cy="74" r="5" fill="#0B1A3F"/><circle cx="154" cy="74" r="5" fill="#0B1A3F"/><path d="M104 106 q26 22 52 0" stroke="#0B1A3F" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M60 46 l14 -26 l12 22 l14 -26 l12 26" stroke="#FFD36E" stroke-width="8" fill="none" stroke-linejoin="round"/>
    <path d="M40 186 q40 -50 80 0 t80 0" stroke="#FF8FB1" stroke-width="14" fill="none"/>${Array.from({ length: 24 }, (_, i) => `<circle cx="${40 + R(i, 71) * 180}" cy="${140 + R(i, 72) * 40}" r="2" fill="${["#C77DFF", "#46B174", "#FFD36E"][i % 3]}"/>`).join("")}
    <rect x="240" y="60" width="110" height="140" fill="#E2D6C0"/>${[0, 1, 2].map(r => [0, 1].map(c => `<rect x="${254 + c * 48}" y="${74 + r * 38}" width="30" height="26" fill="#9FC9EE"/>`).join("")).join("")}
    <rect x="240" y="176" width="110" height="24" fill="#1F2438"/><text x="295" y="193" font-size="12" font-weight="900" fill="#FFD36E" text-anchor="middle" letter-spacing="2">URBAN NATION</text>
    <rect x="0" y="200" width="${W}" height="20" fill="#9A9AA6"/>${crowd(214, 4, 37, "#2A3550")}`]
};

window.PLACE_ART = (kind, opts = {}) => {
  uid++;
  const f = SCENES[kind] || SCENES.market, [sky, body] = f(opts);
  const glowCols = ["#FFD36E", "#6FD3FF", "#C77DFF", "#FF8FB1", "#FFB054", "#FFE08A", "#FF3B3B", "#fff", "#FFF4C2", "#FFCF73", "#FFE27A"];
  return `<svg viewBox="0 0 ${W} ${H}" class="place-art" direction="ltr" xmlns="http://www.w3.org/2000/svg">
    <defs>${skyDefs(uid, sky)}${glowDefs(glowCols)}
      <linearGradient id="wood${uid}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset=".5" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient>
      <linearGradient id="water${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A9FD6"/><stop offset="1" stop-color="#0B4F7A"/></linearGradient>
      <linearGradient id="scr${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <radialGradient id="sph${uid}" cx=".35" cy=".35"><stop offset="0" stop-color="#fff" stop-opacity=".8"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
      <radialGradient id="vig${uid}" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#s${uid})"/>${body.replace(/url\(#g\d+/g, `url(#g${uid}`)}<rect width="${W}" height="${H}" fill="url(#vig${uid})"/></svg>`;
};
})();
