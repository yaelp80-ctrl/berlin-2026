/* איורים למקומות – SVG מצוירים בקוד, באותו סגנון של האפליקציה */
(() => {
const W = 360, H = 200;
const SKY = {
  night: ["#0B1A3F", "#1E3D7A"], dusk: ["#2A2A6E", "#E07A5F"], day: ["#5FA8E8", "#BFE3FF"], dark: ["#05060F", "#141634"], warm: ["#3B1B12", "#7A3A20"]
};
const stars = n => Array.from({ length: n }, (_, i) => `<circle cx="${(i * 73) % W}" cy="${(i * 37) % 90 + 6}" r="${i % 3 ? .8 : 1.4}" fill="#fff" opacity="${.4 + (i % 4) * .15}"/>`).join("");
const snow = n => `<g class="pa-snow">${Array.from({ length: n }, (_, i) => `<circle cx="${(i * 53) % W}" cy="${(i * 29) % H}" r="${1 + i % 3}" fill="#fff" opacity=".8" style="animation-delay:-${(i % 7) * .6}s"/>`).join("")}</g>`;
const em = (e, x, y, s = 28) => `<text x="${x}" y="${y}" font-size="${s}" text-anchor="middle">${e}</text>`;
const lights = (y = 30) => `<path d="M0 ${y} Q90 ${y + 22} 180 ${y} T360 ${y}" stroke="#2a1a10" stroke-width="1.2" fill="none"/>` +
  Array.from({ length: 12 }, (_, i) => { const x = 15 + i * 30, yy = y + Math.sin((x / 360) * Math.PI * 2) * -8 + 9; return `<circle class="pa-bulb" style="animation-delay:${i * .15}s" cx="${x}" cy="${yy}" r="4" fill="${["#FFD36E", "#E24C4B", "#46B174", "#4CC9F0"][i % 4]}"/>`; }).join("");
const ground = (c = "#EAF4FF", y = 165) => `<path d="M0 ${y} Q90 ${y - 10} 180 ${y} T360 ${y - 4} V200 H0Z" fill="${c}"/>`;
const stall = (x, c1, c2, w = 64) => `<g transform="translate(${x} 112)"><rect x="4" y="18" width="${w - 8}" height="40" fill="#8A5233"/><rect x="10" y="24" width="${w - 20}" height="16" fill="#FFD36E" opacity=".85"/>
  <path d="M0 18 L${w / 2} 0 L${w} 18Z" fill="${c1}"/>${Array.from({ length: 4 }, (_, i) => `<path d="M${i * w / 4} 18 l${w / 8} -6 l${w / 8} 6z" fill="${c2}"/>`).join("")}</g>`;
const tree = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -50 L22 0 H-22Z" fill="#2E8B57"/><path d="M0 -70 L16 -30 H-16Z" fill="#3FA06A"/><rect x="-4" y="0" width="8" height="10" fill="#6B3A1E"/>
  <circle cx="-8" cy="-20" r="3" fill="#E24C4B"/><circle cx="9" cy="-12" r="3" fill="#FFD36E"/><circle cx="2" cy="-40" r="2.6" fill="#4CC9F0"/><path d="M0 -76 l3 6 h6 l-5 4 2 6 -6 -4 -6 4 2 -6 -5 -4 h6z" fill="#FFD36E"/></g>`;
const wheel = (x, y, r = 42) => `<g transform="translate(${x} ${y})"><g class="pa-spin"><circle r="${r}" fill="none" stroke="#FFD36E" stroke-width="3"/>${Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<line x2="${Math.cos(a) * r}" y2="${Math.sin(a) * r}" stroke="#FFD36E" stroke-width="1.5"/><circle cx="${Math.cos(a) * r}" cy="${Math.sin(a) * r}" r="6" fill="${["#E24C4B", "#4CC9F0", "#46B174", "#C77DFF"][i % 4]}"/>`; }).join("")}</g><path d="M-14 ${r + 30} L0 0 L14 ${r + 30}" stroke="#FFD36E" stroke-width="3" fill="none"/></g>`;
const rink = (x, y, w = 120) => `<ellipse cx="${x}" cy="${y}" rx="${w / 2}" ry="12" fill="#BDE7FF" stroke="#fff" stroke-width="2"/>${em("⛸️", x - 18, y + 4, 18)}${em("⛸️", x + 22, y + 2, 16)}`;
const tvTower = (x) => `<g transform="translate(${x} 0)"><rect x="-3" y="20" width="6" height="150" fill="#C9D3E3"/><circle cy="70" r="16" fill="#C9D3E3"/><rect x="-1" y="0" width="2" height="22" fill="#E24C4B"/><circle cy="70" r="16" fill="url(#pa-shine)" opacity=".4"/></g>`;

const SCENES = {
  gate: () => ["dusk", `${stars(14)}<rect x="0" y="160" width="360" height="40" fill="#C9B79C"/>
    <g fill="#E8DCC4"><rect x="70" y="70" width="220" height="16"/><rect x="60" y="60" width="240" height="12"/>
    ${[78, 112, 146, 194, 228, 262].map(x => `<rect x="${x}" y="86" width="16" height="76"/>`).join("")}<rect x="150" y="40" width="60" height="22"/></g>
    <g fill="#3E7A68"><path d="M160 40 l6 -14 h28 l6 14z"/><circle cx="180" cy="20" r="6"/><path d="M170 26 l-10 -10 M190 26 l10 -10" stroke="#3E7A68" stroke-width="3"/></g>
    <g fill="#B8A88C">${[95, 130, 212, 246].map(x => `<rect x="${x - 2}" y="86" width="4" height="76" opacity=".5"/>`).join("")}</g>${snow(18)}`],
  market: o => [o.sky || "night", `${stars(16)}${o.tower ? tvTower(300) : ""}${o.church ? `<g transform="translate(290 40)" fill="#3a3550"><rect x="-14" y="10" width="28" height="120"/><path d="M-14 10 L0 -24 L14 10Z"/><rect x="18" y="60" width="34" height="70"/><circle cx="0" cy="40" r="6" fill="#FFD36E"/></g>` : ""}
    ${o.wheel ? wheel(o.wheelX || 70, 70, 40) : ""}${lights(28)}${ground("#EAF4FF", 170)}
    ${stall(110, "#E24C4B", "#fff")}${stall(178, "#2E8B57", "#FFD36E")}${o.pride ? stall(246, "#C77DFF", "#FFD36E") : stall(246, "#1E5AA8", "#fff")}
    ${o.rink ? rink(180, 182, 150) : ""}${tree(o.tree || 330, 166, .8)}${o.pride ? `<g transform="translate(30 70)">${["#E40303", "#FF8C00", "#FFED00", "#008026", "#004DFF", "#750787"].map((c, i) => `<rect y="${i * 7}" width="54" height="7" fill="${c}"/>`).join("")}<rect x="-3" y="-4" width="3" height="100" fill="#ddd"/></g>` : ""}${snow(22)}`],
  zoo: () => ["day", `<circle cx="300" cy="40" r="18" fill="#FFE08A"/>${ground("#9BD07A", 150)}
    <g transform="translate(40 60)"><rect width="150" height="96" rx="10" fill="#0E5C8A" stroke="#BFE3FF" stroke-width="4"/>
    <path d="M10 70 q20 -14 40 0 t40 0 t40 0" stroke="#46B174" stroke-width="9" fill="none" stroke-linecap="round"/><circle cx="132" cy="68" r="8" fill="#46B174"/><circle cx="135" cy="66" r="2" fill="#fff"/>
    ${em("🐠", 40, 36, 20)}${em("🐢", 104, 40, 22)}<circle cx="70" cy="20" r="3" fill="#BFE3FF" opacity=".6"/><circle cx="76" cy="10" r="2" fill="#BFE3FF" opacity=".6"/></g>
    ${em("🐘", 250, 145, 52)}${em("🐧", 320, 172, 30)}${em("🦒", 214, 120, 42)}<path d="M200 60 l40 -18 l40 18" stroke="#8A5233" stroke-width="5" fill="none"/>`],
  mall: () => ["day", `<rect x="40" y="50" width="280" height="110" fill="#F2EFE8"/><rect x="40" y="88" width="280" height="22" fill="#2A2F45"/>
    ${Array.from({ length: 7 }, (_, i) => `<rect x="${52 + i * 38}" y="60" width="26" height="22" fill="#9FC9EE"/><rect x="${52 + i * 38}" y="118" width="26" height="34" fill="#9FC9EE"/>`).join("")}
    <text x="180" y="104" font-size="13" fill="#fff" text-anchor="middle" font-weight="700" letter-spacing="3">BIKINI BERLIN</text>${ground("#9BD07A", 168)}
    ${em("🐒", 300, 145, 26)}${em("🎎", 100, 148, 22)}${em("🎮", 200, 148, 22)}`],
  garden: () => ["dark", `${stars(30)}${ground("#0f2a22", 160)}
    ${[50, 110, 250, 310].map((x, i) => `<g class="pa-glow" style="animation-delay:${i * .4}s"><path d="M${x} 160 L${x - 22} 160 L${x} 90 L${x + 22} 160Z" fill="none" stroke="${["#FFD36E", "#4CC9F0", "#C77DFF", "#FF8FB1"][i]}" stroke-width="3"/>${Array.from({ length: 5 }, (_, j) => `<circle cx="${x - 14 + j * 7}" cy="${150 - j * 12}" r="2.5" fill="#fff"/>`).join("")}</g>`).join("")}
    <path d="M140 160 Q180 70 220 160" stroke="#FFD36E" stroke-width="4" fill="none" class="pa-glow"/><path d="M150 160 Q180 90 210 160" stroke="#FF8FB1" stroke-width="3" fill="none" class="pa-glow" style="animation-delay:.6s"/>
    ${Array.from({ length: 22 }, (_, i) => `<circle cx="${(i * 41) % 360}" cy="${170 + (i % 3) * 8}" r="2" fill="${["#FFD36E", "#4CC9F0", "#FF8FB1"][i % 3]}"/>`).join("")}`],
  wall: () => ["day", `<circle cx="60" cy="40" r="18" fill="#FFE08A"/><rect x="0" y="150" width="360" height="50" fill="#5B8FB0"/>
    <rect x="0" y="70" width="360" height="82" fill="#E9E4DA"/><rect x="0" y="66" width="360" height="8" rx="4" fill="#D8D2C6"/>
    <circle cx="70" cy="110" r="26" fill="#FF8FB1"/><path d="M110 140 q30 -60 60 0" fill="#4CC9F0"/><path d="M190 90 h50 v40 h-50z" fill="#FFD36E" transform="rotate(-6 215 110)"/>
    <path d="M150 86 q10 -8 20 0 q10 -8 20 0" stroke="#E24C4B" stroke-width="5" fill="none"/><circle cx="290" cy="112" r="20" fill="#46B174"/><circle cx="283" cy="108" r="3"/><circle cx="297" cy="108" r="3"/><path d="M282 120 q8 6 16 0" stroke="#000" stroke-width="2" fill="none"/>
    <text x="320" y="138" font-size="18" font-weight="900" fill="#C77DFF" transform="rotate(-8 320 138)">ART</text>${[0, 120, 240].map(x => `<line x1="${x + 119}" y1="72" x2="${x + 119}" y2="152" stroke="#c9c2b4"/>`).join("")}`],
  darkmatter: () => ["dark", `<g opacity=".9">${Array.from({ length: 9 }, (_, i) => `<g class="pa-glow" style="animation-delay:${i * .3}s" transform="translate(${30 + i * 38} ${20 + (i % 3) * 12})"><path d="M0 0 L-12 40 H12Z" fill="none" stroke="#4CC9F0" stroke-width="2" transform="rotate(180 0 20)"/><line x1="0" y1="-20" x2="0" y2="0" stroke="#4CC9F0" opacity=".5"/></g>`).join("")}</g>
    ${Array.from({ length: 6 }, (_, i) => `<line class="pa-beam" style="animation-delay:${i * .5}s" x1="${40 + i * 56}" y1="0" x2="${180 + (i - 3) * 20}" y2="170" stroke="${["#FF8FB1", "#4CC9F0", "#FFD36E"][i % 3]}" stroke-width="2" opacity=".45"/>`).join("")}
    <ellipse cx="180" cy="178" rx="170" ry="18" fill="#BDE7FF" opacity=".9"/>${em("⛸️", 150, 182, 20)}${em("⛸️", 210, 178, 18)}`],
  pub: () => ["night", `${stars(12)}<rect x="40" y="40" width="280" height="130" fill="#1F4D36"/><rect x="40" y="40" width="280" height="30" fill="#163828"/>
    <text x="180" y="62" font-size="20" fill="#FFD36E" text-anchor="middle" font-family="Georgia,serif" font-weight="700">MacLaren's</text>
    <rect x="70" y="90" width="90" height="60" fill="#FFB347" opacity=".85"/><rect x="200" y="90" width="90" height="60" fill="#FFB347" opacity=".85"/>
    <path d="M70 120 h90 M115 90 v60 M200 120 h90 M245 90 v60" stroke="#163828" stroke-width="3"/>${em("🍔", 115, 140, 22)}${em("🍺", 245, 140, 22)}<rect x="0" y="170" width="360" height="30" fill="#3a3a48"/>`],
  books: () => ["dusk", `<rect x="50" y="50" width="260" height="120" fill="#5A2D82"/><rect x="70" y="80" width="220" height="70" fill="#FFE8B0"/>
    ${Array.from({ length: 14 }, (_, i) => `<rect x="${78 + i * 15}" y="${96 + (i % 3) * 4}" width="11" height="${48 - (i % 3) * 4}" fill="${["#E24C4B", "#4CC9F0", "#46B174", "#FFD36E", "#C77DFF"][i % 5]}"/>`).join("")}
    <text x="180" y="72" font-size="14" fill="#FFD36E" text-anchor="middle" font-weight="700">PRINZ EISENHERZ</text>${em("📚", 320, 190, 26)}<rect x="0" y="170" width="360" height="30" fill="#3a3a48"/>`],
  cafe: () => ["day", `<rect x="40" y="50" width="280" height="120" fill="#FFF5E6"/>
    ${["#E40303", "#FF8C00", "#FFED00", "#008026", "#004DFF", "#750787"].map((c, i) => `<rect x="${40 + i * 46.6}" y="50" width="46.6" height="22" fill="${c}"/>`).join("")}
    <rect x="70" y="90" width="100" height="70" fill="#BFE3FF"/><rect x="190" y="90" width="100" height="70" fill="#BFE3FF"/>${em("🍰", 120, 140, 30)}${em("☕", 240, 140, 30)}<rect x="0" y="170" width="360" height="30" fill="#8a8a96"/>`],
  potsdamMarket: () => ["night", `${stars(16)}${wheel(290, 70, 44)}${lights(26)}${ground("#EAF4FF", 170)}
    <g fill="#B24A3A">${[20, 70].map(x => `<path d="M${x} 170 V100 l20 -24 l20 24 V170Z"/><rect x="${x + 12}" y="112" width="16" height="18" fill="#FFD36E"/>`).join("")}</g>
    ${stall(120, "#E24C4B", "#fff")}${stall(188, "#2E8B57", "#FFD36E")}${rink(180, 184, 130)}${snow(20)}`],
  dutch: () => ["dusk", `${stars(8)}${[0, 72, 144, 216, 288].map((x, i) => `<g transform="translate(${x} 0)"><path d="M6 175 V90 Q36 ${48 + (i % 2) * 8} 66 90 V175Z" fill="${i % 2 ? "#B24A3A" : "#A34233"}"/>
    <rect x="18" y="104" width="14" height="18" fill="#FFD36E"/><rect x="40" y="104" width="14" height="18" fill="#FFD36E"/><rect x="28" y="136" width="16" height="39" fill="#5A2A1A"/><circle cx="36" cy="80" r="4" fill="#fff" opacity=".7"/></g>`).join("")}
    <rect x="0" y="175" width="360" height="25" fill="#9a8a80"/>${snow(16)}`],
  palace: () => ["day", `<circle cx="310" cy="38" r="16" fill="#FFE08A"/>${[0, 1, 2, 3].map(i => `<rect x="${20 + i * 12}" y="${160 - i * 16}" width="${320 - i * 24}" height="8" fill="#5E8C4A"/>`).join("")}
    <rect x="90" y="56" width="180" height="44" fill="#F2D27A"/><path d="M150 56 Q180 20 210 56Z" fill="#7FB3A6"/><rect x="176" y="20" width="8" height="10" fill="#E9C46A"/>
    ${Array.from({ length: 9 }, (_, i) => `<rect x="${98 + i * 19}" y="64" width="9" height="30" fill="#fff" opacity=".85"/>`).join("")}<rect x="0" y="168" width="360" height="32" fill="#7FA36A"/>`],
  biosphere: () => ["day", `<path d="M30 175 Q30 60 180 50 Q330 60 330 175Z" fill="#CDEFE6" stroke="#9fd7c9" stroke-width="3"/>${[90, 150, 210, 270].map(x => `<line x1="${x}" y1="55" x2="${x}" y2="175" stroke="#9fd7c9" stroke-width="2"/>`).join("")}
    ${em("🌴", 90, 165, 54)}${em("🌺", 160, 160, 26)}${em("🦋", 200, 100, 22)}${em("🦎", 250, 165, 26)}${em("🌴", 290, 168, 48)}${em("🦋", 130, 90, 18)}<rect x="0" y="175" width="360" height="25" fill="#7FA36A"/>`],
  dino: () => ["warm", `<rect x="0" y="0" width="360" height="200" fill="#EADBC4"/>${[40, 140, 240, 340].map(x => `<rect x="${x - 6}" y="0" width="12" height="200" fill="#D8C4A6"/>`).join("")}
    <g fill="none" stroke="#6B5A44" stroke-width="5" stroke-linecap="round"><path d="M70 170 V120 M100 170 V120 M200 170 V120 M230 170 V120"/><path d="M60 118 Q150 90 240 118"/>
    <path d="M230 112 Q270 70 280 20"/><path d="M60 118 Q20 128 10 150"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${80 + i * 18} 112 v18"/>`).join("")}</g><ellipse cx="285" cy="20" rx="14" ry="8" fill="#6B5A44"/>
    <rect x="0" y="170" width="360" height="30" fill="#BFA98A"/>${em("🦖", 320, 165, 34)}`],
  restaurant: () => ["night", `${stars(10)}<rect x="0" y="120" width="360" height="80" fill="#2C2E4A"/><ellipse cx="180" cy="140" rx="90" ry="22" fill="#fff"/><path d="M100 140 Q180 210 260 140Z" fill="#E24C4B"/>
    <path d="M120 128 q60 -16 120 0" stroke="#FFD36E" stroke-width="10" fill="none" stroke-linecap="round" opacity=".7"/>${em("🍣", 150, 132, 24)}${em("🍜", 210, 132, 24)}
    <line x1="260" y1="70" x2="200" y2="128" stroke="#8A5233" stroke-width="5" stroke-linecap="round"/><line x1="275" y1="76" x2="210" y2="130" stroke="#8A5233" stroke-width="5" stroke-linecap="round"/>`],
  show: () => ["dark", `<path d="M0 0 H360 V30 Q180 50 0 30Z" fill="#8B1E2E"/><path d="M0 0 Q30 100 0 200Z" fill="#8B1E2E"/><path d="M360 0 Q330 100 360 200Z" fill="#8B1E2E"/>
    ${[90, 180, 270].map((x, i) => `<path class="pa-beam" style="animation-delay:${i * .4}s" d="M${x} 0 L${x - 50} 170 H${x + 50}Z" fill="#FFE8B0" opacity=".18"/>`).join("")}
    <rect x="0" y="170" width="360" height="30" fill="#3a2a20"/>${em("💃", 120, 166, 40)}${em("🕺", 180, 166, 44)}${em("💃", 240, 166, 40)}${em("✨", 70, 80, 22)}${em("✨", 290, 70, 22)}`],
  spray: () => ["day", `<rect x="0" y="40" width="360" height="130" fill="#D9D3C7"/>
    <path d="M30 120 q40 -60 80 0 t80 0" stroke="#4CC9F0" stroke-width="16" fill="none" stroke-linecap="round"/><text x="200" y="110" font-size="40" font-weight="900" fill="#FF8FB1" transform="rotate(-6 200 110)">KAY</text>
    <circle cx="300" cy="80" r="18" fill="#FFD36E"/>${[60, 250].map(x => `<g transform="translate(${x} 150)"><rect x="-9" y="0" width="18" height="34" rx="4" fill="#E24C4B"/><rect x="-5" y="-6" width="10" height="7" fill="#333"/></g>`).join("")}<rect x="0" y="170" width="360" height="30" fill="#8a8a96"/>`],
  courtyard: () => ["dusk", `<rect x="0" y="20" width="110" height="180" fill="#5B4A44"/><rect x="250" y="20" width="110" height="180" fill="#5B4A44"/>
    <rect x="10" y="40" width="90" height="120" fill="#7A6A60"/><circle cx="55" cy="80" r="22" fill="#FFD36E"/><path d="M20 140 q30 -30 70 0" stroke="#4CC9F0" stroke-width="8" fill="none"/>
    <rect x="260" y="40" width="90" height="120" fill="#7A6A60"/><text x="305" y="100" font-size="22" font-weight="900" fill="#FF8FB1" text-anchor="middle">ART</text><circle cx="290" cy="130" r="10" fill="#46B174"/>
    <rect x="110" y="140" width="140" height="60" fill="#3a2f2b"/>${em("🎨", 180, 120, 34)}`],
  shop: () => ["day", `<rect x="40" y="40" width="280" height="130" fill="#FFE8F0"/><rect x="40" y="40" width="280" height="26" fill="#C77DFF"/><text x="180" y="59" font-size="15" fill="#fff" text-anchor="middle" font-weight="700">NEO TOKYO</text>
    <rect x="60" y="80" width="240" height="80" fill="#BFE3FF"/>${em("📚", 100, 140, 30)}${em("🎎", 160, 140, 30)}${em("🍬", 220, 140, 26)}${em("🗾", 270, 140, 26)}<rect x="0" y="170" width="360" height="30" fill="#8a8a96"/>`],
  art: () => ["day", `<rect x="0" y="0" width="360" height="200" fill="#F7F3EA"/>${Array.from({ length: 10 }, (_, i) => `<g transform="translate(${40 + i * 30} ${60 + (i % 2) * 10}) rotate(${(i % 3 - 1) * 8})"><rect width="14" height="90" rx="3" fill="${["#E24C4B", "#FFD36E", "#46B174", "#4CC9F0", "#C77DFF"][i % 5]}"/><path d="M0 90 L7 104 L14 90Z" fill="#F2D0A4"/><path d="M5 100 L7 104 L9 100Z" fill="#333"/></g>`).join("")}
    ${em("🎨", 60, 40, 26)}${em("✂️", 300, 40, 24)}`],
  avocado: () => ["day", `<rect x="0" y="0" width="360" height="200" fill="#FFE1EA"/>${em("🥑", 130, 140, 80)}${em("🥑", 230, 120, 56)}${em("🌿", 60, 60, 34)}${em("🌿", 310, 70, 34)}<rect x="0" y="170" width="360" height="30" fill="#F4B6C8"/>`],
  tropical: () => ["day", `<path d="M10 170 Q10 40 180 30 Q350 40 350 170Z" fill="#E8F1F8" stroke="#BCD0E0" stroke-width="3"/>${Array.from({ length: 7 }, (_, i) => `<path d="M${40 + i * 46} 170 Q${40 + i * 46} 60 180 34" stroke="#BCD0E0" stroke-width="1.5" fill="none"/>`).join("")}
    <path d="M30 170 Q120 140 200 160 T340 150 V175 H30Z" fill="#3FC1D9"/><path d="M260 70 Q300 110 270 160" stroke="#FF8C42" stroke-width="10" fill="none" stroke-linecap="round"/>
    ${em("🌴", 70, 150, 48)}${em("🌴", 320, 148, 44)}${em("🏖️", 150, 178, 28)}<rect x="0" y="172" width="360" height="28" fill="#F2D9A2"/>`],
  spy: () => ["dark", `${Array.from({ length: 8 }, (_, i) => `<line class="pa-beam" style="animation-delay:${i * .25}s" x1="0" y1="${20 + i * 22}" x2="360" y2="${180 - i * 20}" stroke="#E24C4B" stroke-width="2"/>`).join("")}${em("🕵️", 180, 140, 64)}${em("🔍", 300, 60, 30)}`],
  kadewe: () => ["dusk", `${stars(8)}<rect x="40" y="40" width="280" height="130" fill="#E8DCC4"/><rect x="40" y="40" width="280" height="22" fill="#2A2F45"/><text x="180" y="57" font-size="15" fill="#FFD36E" text-anchor="middle" font-weight="700" letter-spacing="4">KaDeWe</text>
    ${Array.from({ length: 4 }, (_, r) => Array.from({ length: 8 }, (_, c) => `<rect x="${56 + c * 32}" y="${70 + r * 24}" width="20" height="16" fill="${r === 0 ? "#FFD36E" : "#9FC9EE"}"/>`).join("")).join("")}${lights(176)}<rect x="0" y="170" width="360" height="30" fill="#8a8a96"/>`],
  ice: () => ["night", `<rect x="0" y="0" width="360" height="200" fill="#0E3A72"/>${Array.from({ length: 12 }, (_, i) => `<rect x="${(i % 6) * 60}" y="${100 + Math.floor(i / 6) * 50}" width="58" height="48" fill="#BFE3FF" opacity="${.6 + (i % 3) * .12}" stroke="#fff"/>`).join("")}
    <path d="M140 100 L180 40 L220 100Z" fill="#DFF3FF"/>${em("🧊", 80, 80, 34)}${em("🥶", 280, 80, 34)}${em("🧥", 180, 160, 36)}`],
  illusion: () => ["dusk", `<rect x="0" y="0" width="360" height="200" fill="#241A4A"/><g transform="translate(180 100)">${Array.from({ length: 10 }, (_, i) => `<rect x="${-100 + i * 10}" y="${-90 + i * 9}" width="${200 - i * 20}" height="${180 - i * 18}" fill="none" stroke="${i % 2 ? "#FFD36E" : "#C77DFF"}" stroke-width="3" transform="rotate(${i * 6})"/>`).join("")}</g>${em("👁️", 180, 112, 30)}`],
  arcade: () => ["dark", `<rect x="0" y="170" width="360" height="30" fill="#2A1A40"/>${[70, 180, 290].map((x, i) => `<g transform="translate(${x} 0)"><path d="M-36 170 V50 l10 -16 h52 l10 16 V170Z" fill="${["#C77DFF", "#4CC9F0", "#FF8FB1"][i]}"/>
    <rect x="-24" y="58" width="48" height="40" fill="#0B1A3F"/><rect x="-16" y="68" width="6" height="6" fill="#46B174"/><rect x="2" y="78" width="10" height="6" fill="#FFD36E"/><circle cx="-10" cy="114" r="5" fill="#E24C4B"/><rect x="4" y="110" width="4" height="12" fill="#333"/></g>`).join("")}${em("👾", 180, 30, 24)}`],
  mural: () => ["day", `<rect x="40" y="10" width="200" height="190" fill="#F0E6D8"/><circle cx="140" cy="80" r="50" fill="#4CC9F0"/><circle cx="125" cy="70" r="8" fill="#0B1A3F"/><circle cx="160" cy="70" r="8" fill="#0B1A3F"/><path d="M118 100 q22 18 44 0" stroke="#0B1A3F" stroke-width="5" fill="none"/>
    <path d="M60 170 q40 -40 80 0 t80 0" stroke="#FF8FB1" stroke-width="12" fill="none"/><rect x="250" y="60" width="100" height="140" fill="#E8DCC4"/><rect x="262" y="80" width="30" height="40" fill="#9FC9EE"/><rect x="306" y="80" width="30" height="40" fill="#9FC9EE"/>
    <text x="300" y="160" font-size="14" font-weight="900" fill="#C77DFF" text-anchor="middle">URBAN</text>`]
};

window.PLACE_ART = (kind, opts = {}) => {
  const f = SCENES[kind] || SCENES.market, [sky, body] = f(opts), [a, b] = SKY[sky] || SKY.night;
  return `<svg viewBox="0 0 ${W} ${H}" class="place-art" direction="ltr" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="pa-sky-${kind}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
    <radialGradient id="pa-shine"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#pa-sky-${kind})"/>${body}</svg>`;
};
})();
