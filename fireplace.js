/* "קר לי" – אח בוערת עם שני כלבים ורעש גיצים נעים */
(() => {
  const $ = s => document.querySelector(s);

  /* ---------- צליל: רחש אש + פצפוצים (נוצר בטלפון, בלי קבצים) ---------- */
  let ctx = null, master = null, timer = null;
  function noiseBuffer(c, sec, brown) {
    const b = c.createBuffer(1, c.sampleRate * sec, c.sampleRate), d = b.getChannelData(0);
    let last = 0;
    for (let i = 0; i < d.length; i++) {
      const w = Math.random() * 2 - 1;
      if (brown) { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; } else d[i] = w;
    }
    return b;
  }
  function tick(t, freq, len, vol) {
    const src = ctx.createBufferSource(); src.buffer = crackle.buf;
    const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = freq; bp.Q.value = 1.2;
    const g = ctx.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + len);
    src.connect(bp).connect(g).connect(master); src.start(t, Math.random() * .4, len + .02);
  }
  function crackle() {
    if (!ctx) return;
    const t = ctx.currentTime, r = Math.random();
    if (r < .1) { // פיצוץ קטן של עץ – פופ עמוק ואחריו כמה פצפוצים
      tick(t, 500 + Math.random() * 400, .05, .55);
      for (let i = 1; i < 4; i++) tick(t + i * (.02 + Math.random() * .05), 2000 + Math.random() * 2500, .012, .18);
    } else if (r < .55) tick(t, 1500 + Math.random() * 3500, .006 + Math.random() * .014, .12 + Math.random() * .25); // פצפוץ חד
    else tick(t, 900 + Math.random() * 1200, .015 + Math.random() * .02, .07 + Math.random() * .12); // פצפוץ רך
    timer = setTimeout(crackle, Math.random() < .35 ? 25 + Math.random() * 70 : 90 + Math.random() * 420);
  }
  function soundOn() {
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
      master.gain.linearRampToValueAtTime(.9, ctx.currentTime + 1.2);
      // רחש אש חלש מאוד ברקע (בלי "רוח")
      const rumble = ctx.createBufferSource(); rumble.buffer = noiseBuffer(ctx, 4, true); rumble.loop = true;
      const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 180;
      const rg = ctx.createGain(); rg.gain.value = .07;
      rumble.connect(lp).connect(rg).connect(master); rumble.start();
      crackle.buf = noiseBuffer(ctx, .5, false);
      crackle();
    } catch (e) {}
  }
  function roar() { // נשיפת אש של דרקון
    if (!ctx) return;
    const t = ctx.currentTime, src = ctx.createBufferSource(); src.buffer = noiseBuffer(ctx, 1.6, false);
    const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = .7;
    bp.frequency.setValueAtTime(250, t); bp.frequency.exponentialRampToValueAtTime(1400, t + .5); bp.frequency.exponentialRampToValueAtTime(500, t + 1.4);
    const g = ctx.createGain(); g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.9, t + .25); g.gain.exponentialRampToValueAtTime(.0001, t + 1.5);
    const low = ctx.createOscillator(), lg = ctx.createGain(); low.type = "sawtooth"; low.frequency.setValueAtTime(70, t); low.frequency.linearRampToValueAtTime(45, t + 1);
    const lf = ctx.createBiquadFilter(); lf.type = "lowpass"; lf.frequency.value = 220;
    lg.gain.setValueAtTime(.0001, t); lg.gain.exponentialRampToValueAtTime(.25, t + .2); lg.gain.exponentialRampToValueAtTime(.0001, t + 1.2);
    src.connect(bp).connect(g).connect(master); low.connect(lf).connect(lg).connect(master);
    src.start(t); low.start(t); low.stop(t + 1.3);
  }
  function soundOff() {
    clearTimeout(timer); timer = null;
    if (!ctx) return;
    const c = ctx; ctx = null;
    try { master.gain.linearRampToValueAtTime(0, c.currentTime + .4); setTimeout(() => c.close(), 500); } catch (e) {}
  }

  /* ---------- הציור ---------- */
  const flame = (cls, d, fill, delay) => `<path class="fl ${cls}" style="animation-delay:${delay}s" d="${d}" fill="${fill}"/>`;
  const dog = (x, y, s, flip, body, dark, spot, delay) => `
  <g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
    <g class="breathe" style="animation-delay:${delay}s">
      <g class="tail" style="animation-delay:${delay}s"><path d="M52 6 q26 -10 30 -30" stroke="${body}" stroke-width="9" fill="none" stroke-linecap="round"/></g>
      <ellipse cx="10" cy="8" rx="50" ry="24" fill="${body}"/>
      ${spot ? `<ellipse cx="18" cy="-2" rx="20" ry="12" fill="${spot}"/>` : ""}
      <ellipse cx="-18" cy="26" rx="20" ry="7" fill="${body}"/><ellipse cx="22" cy="28" rx="18" ry="6" fill="${body}"/>
      <ellipse cx="-36" cy="27" rx="9" ry="5" fill="${dark}"/><ellipse cx="4" cy="29" rx="8" ry="4.5" fill="${dark}"/>
      <g transform="translate(-44 -6)">
        <ellipse cx="0" cy="0" rx="22" ry="19" fill="${body}"/>
        <ellipse cx="-20" cy="8" rx="12" ry="9" fill="${spot || body}"/>
        <ellipse cx="-29" cy="5" rx="5" ry="4" fill="#2a1a12"/>
        <path d="M14 -10 q14 2 12 24 q-10 -2 -14 -14z" fill="${dark}"/>
        <path d="M-6 -14 q-10 -8 -16 4 q8 6 14 4z" fill="${dark}"/>
        <path d="M-12 -3 q4 3 8 0 M2 -4 q4 3 8 0" stroke="#2a1a12" stroke-width="2" fill="none" stroke-linecap="round"/>
        <ellipse cx="-4" cy="5" rx="4" ry="2.4" fill="#ff9fb0" opacity=".55"/>
        <path d="M-22 13 q4 3 8 0" stroke="#2a1a12" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      </g>
      ${flip ? "" : `<text class="zz" x="-40" y="-30" style="animation-delay:${delay}s">z</text>`}
    </g>
  </g>`;

  const SCENE = `
<svg viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice" class="fp-svg" direction="ltr">
  <defs>
    <radialGradient id="fpglow" cx="50%" cy="56%" r="60%"><stop offset="0" stop-color="#ffb347" stop-opacity=".55"/><stop offset=".5" stop-color="#ff7a1a" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
    <linearGradient id="fpwall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b1712"/><stop offset="1" stop-color="#4a2618"/></linearGradient>
    <linearGradient id="fpfloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a3420"/><stop offset="1" stop-color="#2e1a10"/></linearGradient>
    <pattern id="brick" width="40" height="20" patternUnits="userSpaceOnUse"><rect width="40" height="20" fill="#8a3b28"/><path d="M0 19.5h40M20 0v10M0 10h40M0 9.5h40M40 10v10" stroke="#5b2418" stroke-width="2"/></pattern>
  </defs>
  <rect width="360" height="640" fill="url(#fpwall)"/>
  <!-- זר חג על הקיר -->
  <g transform="translate(180 92)"><circle r="30" fill="none" stroke="#2f7a46" stroke-width="12"/><circle r="30" fill="none" stroke="#3f9a5a" stroke-width="5" stroke-dasharray="3 7"/>
    <circle cx="-18" cy="-22" r="3.5" fill="#e24c4b"/><circle cx="22" cy="-14" r="3.5" fill="#e24c4b"/><circle cx="-24" cy="16" r="3.5" fill="#e24c4b"/><circle cx="12" cy="26" r="3.5" fill="#e24c4b"/>
    <path d="M-10 26 l10 -8 l10 8 l-10 14z" fill="#e24c4b"/></g>
  <!-- האח -->
  <rect x="40" y="170" width="280" height="270" fill="url(#brick)"/>
  <rect x="26" y="150" width="308" height="28" rx="5" fill="#6b4630"/><rect x="26" y="150" width="308" height="8" rx="4" fill="#8b5e40"/>
  <path d="M86 440 V270 Q86 222 134 222 H226 Q274 222 274 270 V440Z" fill="#140806"/>
  <!-- גרביים -->
  <g transform="translate(78 178)"><path d="M0 0 h20 v28 q0 12 -12 12 h-12 q-8 0 -8 -8 q0 -8 8 -8 h4z" fill="#e24c4b"/><rect x="-2" y="-2" width="24" height="9" rx="3" fill="#fff"/></g>
  <g transform="translate(262 178)"><path d="M0 0 h20 v28 q0 12 -12 12 h-12 q-8 0 -8 -8 q0 -8 8 -8 h4z" fill="#3f9a5a"/><rect x="-2" y="-2" width="24" height="9" rx="3" fill="#fff"/></g>
  <!-- הלהבות -->
  <g class="fire" transform="translate(180 410)">
    <ellipse cx="0" cy="8" rx="80" ry="14" fill="#ff7a1a" opacity=".35" class="emberbed"/>
    ${flame("f1", "M-60 0 Q-70 -60 -40 -110 Q-36 -60 -20 -50 Q-30 -100 0 -150 Q20 -90 22 -60 Q34 -90 44 -116 Q72 -60 60 0Z", "#e8501c", 0)}
    ${flame("f2", "M-46 0 Q-52 -50 -26 -86 Q-22 -50 -8 -44 Q-14 -84 8 -118 Q24 -70 24 -46 Q36 -70 40 -86 Q56 -44 46 0Z", "#ff8a1f", .3)}
    ${flame("f3", "M-32 0 Q-36 -36 -14 -66 Q-8 -40 2 -36 Q0 -66 14 -88 Q28 -46 32 0Z", "#ffc23a", .6)}
    ${flame("f4", "M-18 0 Q-20 -24 -4 -44 Q2 -26 8 -24 Q10 -40 16 -50 Q26 -24 18 0Z", "#fff1a8", .15)}
    <!-- בולי עץ -->
    <g transform="translate(0 6)"><rect x="-74" y="-6" width="148" height="20" rx="10" fill="#6b3a1e" transform="rotate(-7)"/><rect x="-74" y="-6" width="148" height="20" rx="10" fill="#7b4526" transform="rotate(8)"/>
      <circle cx="-72" cy="-14" r="9" fill="#c98b5a"/><circle cx="-72" cy="-14" r="5" fill="none" stroke="#8a5530" stroke-width="1.5"/>
      <circle cx="72" cy="-14" r="9" fill="#c98b5a"/><circle cx="72" cy="-14" r="5" fill="none" stroke="#8a5530" stroke-width="1.5"/></g>
  </g>
  <!-- סורג -->
  <g stroke="#2a2a2e" stroke-width="4" stroke-linecap="round" fill="none"><path d="M96 440 V392 Q180 360 264 392 V440"/><path d="M124 440 V382 M152 440 V374 M180 440 V371 M208 440 V374 M236 440 V382"/></g>
  <rect class="glow" width="360" height="640" fill="url(#fpglow)"/>
  <!-- רצפה ושטיח -->
  <rect y="440" width="360" height="200" fill="url(#fpfloor)"/>
  <path d="M0 470 H360 M0 520 H360 M0 580 H360" stroke="#3a2214" stroke-width="2"/>
  <ellipse cx="180" cy="540" rx="170" ry="58" fill="#7a2f3a"/><ellipse cx="180" cy="540" rx="150" ry="46" fill="none" stroke="#e8c27a" stroke-width="3" stroke-dasharray="2 8"/>
  <ellipse cx="180" cy="540" rx="170" ry="58" fill="#ffb347" opacity=".12"/>
  <!-- הכלבים -->
  <ellipse cx="120" cy="551" rx="80" ry="10" fill="#000" opacity=".22"/>
  <ellipse cx="243" cy="587" rx="86" ry="9" fill="#000" opacity=".22"/>
  <g class="breathe"><image href="icons/dog-cream.png" x="36" y="484" width="168" height="67"/></g>
  <g class="breathe" style="animation-delay:1.4s"><image href="icons/dog-gold.png" x="152" y="530" width="182" height="57"/></g>
  <text class="zz" x="190" y="494">z</text><text class="zz" x="168" y="552" style="animation-delay:1.8s">z</text>
</svg>`;

  /* ---------- סצנה 2: דרקון שיורק אש למסך ---------- */
  const DRAGON = `
<svg viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice" class="fp-svg" direction="ltr">
  <defs>
    <linearGradient id="drsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0A0624"/><stop offset=".6" stop-color="#2A1446"/><stop offset="1" stop-color="#5A1E2E"/></linearGradient>
    <radialGradient id="drfire"><stop offset="0" stop-color="#FFF7C2"/><stop offset=".25" stop-color="#FFD23F"/><stop offset=".55" stop-color="#FF7A1A"/><stop offset=".85" stop-color="#E2321B" stop-opacity=".8"/><stop offset="1" stop-color="#9A1A10" stop-opacity="0"/></radialGradient>
    <radialGradient id="drflash" cx=".5" cy=".45" r=".7"><stop offset="0" stop-color="#FFE08A" stop-opacity=".9"/><stop offset=".5" stop-color="#FF7A1A" stop-opacity=".6"/><stop offset="1" stop-color="#B8250F" stop-opacity=".35"/></radialGradient>
    <linearGradient id="drbody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4FC98A"/><stop offset="1" stop-color="#23895A"/></linearGradient>
  </defs>
  <rect width="360" height="640" fill="url(#drsky)"/>
  ${Array.from({ length: 50 }, (_, i) => `<circle cx="${(i * 73) % 360}" cy="${(i * 41) % 300}" r="${i % 5 ? .8 : 1.6}" fill="#fff" opacity="${.3 + (i % 4) * .15}"/>`).join("")}
  <circle cx="290" cy="90" r="30" fill="#FFF3D0" opacity=".9"/><circle cx="280" cy="84" r="6" fill="#EADFB8"/>
  <path d="M0 470 L60 380 L110 430 L170 350 L240 440 L300 370 L360 430 V640 H0Z" fill="#2B1A3A"/>
  <path d="M0 520 Q90 470 180 500 T360 490 V640 H0Z" fill="#3A2238"/>
  <g transform="translate(180 330)">
    <g class="dr-wing-l"><path d="M-60 40 Q-150 -40 -170 -120 Q-130 -90 -110 -100 Q-110 -60 -80 -70 Q-90 -30 -50 -10Z" fill="#7C4DCC"/><path d="M-60 40 L-170 -120 M-60 30 L-110 -100 M-55 15 L-80 -70" stroke="#5A2FA6" stroke-width="3"/></g>
    <g class="dr-wing-r"><path d="M60 40 Q150 -40 170 -120 Q130 -90 110 -100 Q110 -60 80 -70 Q90 -30 50 -10Z" fill="#7C4DCC"/><path d="M60 40 L170 -120 M60 30 L110 -100 M55 15 L80 -70" stroke="#5A2FA6" stroke-width="3"/></g>
    <g class="dr-breathe">
      <path d="M-30 210 Q-60 260 -10 280" stroke="#23895A" stroke-width="18" fill="none" stroke-linecap="round"/>
      <ellipse cx="0" cy="150" rx="70" ry="90" fill="url(#drbody)"/>
      <ellipse cx="0" cy="165" rx="42" ry="66" fill="#F7E2A0"/>${Array.from({ length: 6 }, (_, i) => `<path d="M-34 ${118 + i * 18} Q0 ${126 + i * 18} 34 ${118 + i * 18}" stroke="#E2C478" stroke-width="2" fill="none"/>`).join("")}
      <ellipse cx="-50" cy="236" rx="26" ry="16" fill="#23895A"/><ellipse cx="50" cy="236" rx="26" ry="16" fill="#23895A"/>
      ${[-62, -50, -38, 38, 50, 62].map(x => `<circle cx="${x}" cy="248" r="5" fill="#F7E2A0"/>`).join("")}
      <path d="M-56 120 q-24 20 -18 46" stroke="#2FA56A" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M56 120 q24 20 18 46" stroke="#2FA56A" stroke-width="16" fill="none" stroke-linecap="round"/>
      ${[-20, 0, 20].map((x, i) => `<path d="M${x - 8} ${60 - i % 2 * 4} l8 -16 l8 16z" fill="#FFB020"/>`).join("")}
    </g>
    <g class="dr-head">
      <path d="M-40 -40 l-18 -48 l30 30z M40 -40 l18 -48 l-30 30z" fill="#F7E2A0"/>
      <ellipse cx="0" cy="0" rx="74" ry="62" fill="url(#drbody)"/>
      <path d="M-70 -6 l-22 -10 l18 22z M70 -6 l22 -10 l-18 22z" fill="#2FA56A"/>
      <g class="dr-eye"><ellipse cx="-30" cy="-14" rx="17" ry="19" fill="#fff"/><ellipse cx="30" cy="-14" rx="17" ry="19" fill="#fff"/>
        <ellipse cx="-27" cy="-10" rx="9" ry="12" fill="#2A1446"/><ellipse cx="27" cy="-10" rx="9" ry="12" fill="#2A1446"/><circle cx="-24" cy="-15" r="3.5" fill="#fff"/><circle cx="30" cy="-15" r="3.5" fill="#fff"/></g>
      <path d="M-48 -36 q16 -10 32 -2 M48 -36 q-16 -10 -32 -2" stroke="#1C6B45" stroke-width="5" fill="none" stroke-linecap="round"/>
      <ellipse cx="0" cy="28" rx="44" ry="30" fill="#5FD69A"/><ellipse cx="-12" cy="16" rx="5" ry="3.5" fill="#1C6B45"/><ellipse cx="12" cy="16" rx="5" ry="3.5" fill="#1C6B45"/>
      <ellipse class="dr-mouth" cx="0" cy="40" rx="26" ry="12" fill="#5A1020"/>
      <path d="M-14 31 l4 7 l4 -7 M6 31 l4 7 l4 -7" fill="#fff"/>
      <ellipse cx="-50" cy="14" rx="9" ry="5" fill="#FF8FB1" opacity=".6"/><ellipse cx="50" cy="14" rx="9" ry="5" fill="#FF8FB1" opacity=".6"/>
      <g class="dr-smoke">${[-12, 12].map(x => `<circle cx="${x}" cy="10" r="5" fill="#ccc" opacity=".5"/>`).join("")}</g>
    </g>
    <g class="dr-fire"><circle cx="0" cy="44" r="80" fill="url(#drfire)"/>
      ${Array.from({ length: 14 }, (_, i) => { const a = i / 14 * Math.PI * 2, r = i % 2 ? 95 : 70; return `<path d="M0 44 Q${Math.cos(a - .3) * r * .6} ${44 + Math.sin(a - .3) * r * .6} ${Math.cos(a) * r} ${44 + Math.sin(a) * r} Q${Math.cos(a + .3) * r * .5} ${44 + Math.sin(a + .3) * r * .5} 0 44" fill="${["#E2321B", "#FF7A1A", "#FFB020"][i % 3]}" opacity=".9"/>`; }).join("")}
      <circle cx="0" cy="44" r="34" fill="#FFD23F"/><circle cx="0" cy="44" r="18" fill="#FFF7C2"/></g>
  </g>
  <rect class="dr-flash" width="360" height="640" fill="url(#drflash)"/>
</svg>`;

  /* ---------- סצנה 3: מדורה ומרשמלו ---------- */
  const CAMP = `
<svg viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice" class="fp-svg" direction="ltr">
  <defs>
    <linearGradient id="cpsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#040A1E"/><stop offset=".7" stop-color="#0E2348"/><stop offset="1" stop-color="#1B2B3E"/></linearGradient>
    <radialGradient id="cpglow"><stop offset="0" stop-color="#FFB347" stop-opacity=".75"/><stop offset=".5" stop-color="#FF7A1A" stop-opacity=".22"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
    <linearGradient id="cpskin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F4C9A0"/><stop offset="1" stop-color="#D99E74"/></linearGradient>
  </defs>
  <rect width="360" height="640" fill="url(#cpsky)"/>
  ${Array.from({ length: 70 }, (_, i) => `<circle class="cp-tw" style="animation-delay:-${i % 6}s" cx="${(i * 67) % 360}" cy="${(i * 37) % 330}" r="${i % 6 ? .8 : 1.6}" fill="#fff" opacity="${.3 + (i % 4) * .17}"/>`).join("")}
  <path d="M0 200 Q120 170 240 200 T360 190" stroke="#ffffff" stroke-opacity=".06" stroke-width="40" fill="none"/>
  <circle cx="70" cy="90" r="22" fill="#FFF6DA"/><circle cx="80" cy="84" r="20" fill="#06102A"/>
  ${[[10, 360, 1.2], [70, 340, 1.5], [130, 370, 1], [250, 350, 1.4], [310, 335, 1.6], [350, 365, 1.1]].map(([x, y, s]) => `<g transform="translate(${x} ${y}) scale(${s})" fill="#071426"><path d="M0 -90 L26 0 H-26Z"/><path d="M0 -110 L20 -40 H-20Z"/><rect x="-3" y="0" width="6" height="14"/></g>`).join("")}
  <path d="M0 400 Q180 370 360 400 V640 H0Z" fill="#14202C"/>
  <ellipse cx="180" cy="470" rx="240" ry="150" fill="url(#cpglow)" class="glow"/>
  <g transform="translate(180 470)">
    ${Array.from({ length: 10 }, (_, i) => { const a = Math.PI + i / 9 * Math.PI; return `<ellipse cx="${Math.cos(a) * 70}" cy="${16 + Math.sin(a) * -14 + (i % 2) * 2}" rx="15" ry="9" fill="${i % 2 ? "#6E6A72" : "#5A5660"}"/>`; }).join("")}
    <g stroke-linecap="round"><line x1="-50" y1="16" x2="22" y2="-30" stroke="#5A3218" stroke-width="13"/><line x1="50" y1="16" x2="-22" y2="-30" stroke="#6B3A1E" stroke-width="13"/><line x1="-46" y1="10" x2="46" y2="12" stroke="#7A4526" stroke-width="12"/></g>
    <ellipse cx="0" cy="12" rx="40" ry="8" fill="#FF7A1A" opacity=".5" class="emberbed"/>
    <g transform="translate(0 6)">
      ${flame("f1", "M-46 0 Q-56 -50 -30 -90 Q-26 -50 -14 -42 Q-24 -84 0 -124 Q16 -74 18 -50 Q28 -74 36 -96 Q58 -50 46 0Z", "#E8501C", 0)}
      ${flame("f2", "M-36 0 Q-40 -40 -20 -70 Q-16 -40 -6 -36 Q-10 -70 6 -98 Q20 -58 20 -38 Q30 -58 32 -70 Q44 -36 36 0Z", "#FF8A1F", .3)}
      ${flame("f3", "M-24 0 Q-28 -30 -10 -54 Q-6 -32 2 -28 Q0 -54 12 -72 Q22 -38 24 0Z", "#FFC23A", .6)}
      ${flame("f4", "M-12 0 Q-14 -18 -2 -34 Q2 -20 6 -18 Q8 -30 12 -38 Q18 -18 12 0Z", "#FFF1A8", .15)}
    </g>
  </g>
  <g class="cp-stick">
    <line x1="352" y1="610" x2="215" y2="415" stroke="#7A4A26" stroke-width="5" stroke-linecap="round"/>
    <line x1="215" y1="415" x2="200" y2="396" stroke="#5A3218" stroke-width="3" stroke-linecap="round"/>
    <g transform="translate(203 400) rotate(-55)">
      <rect class="cp-mallow" x="-9" y="-11" width="18" height="22" rx="7"/>
      <rect x="-9" y="-11" width="18" height="6" rx="3" fill="#fff" opacity=".35"/>
      <g class="cp-burn"><path d="M-8 -10 Q-10 -26 0 -36 Q2 -24 6 -22 Q10 -30 12 -34 Q16 -20 8 -10Z" fill="#FF8A1F"/><path d="M-4 -10 Q-4 -20 2 -26 Q4 -18 6 -10Z" fill="#FFE27A"/></g>
    </g>
    <path d="M300 640 L290 560 Q300 540 330 538 L380 560 L380 640Z" fill="#B5302F"/>
    <path d="M298 560 Q300 540 330 538 L338 560 Q318 562 298 560Z" fill="#8B1E2E"/>${Array.from({ length: 5 }, (_, i) => `<path d="M${296 + i * 9} 566 v40" stroke="#9A2626" stroke-width="2"/>`).join("")}
    <path d="M310 548 Q300 520 318 506 Q336 500 344 512 L352 540 Q340 556 322 556Z" fill="url(#cpskin)"/>
    <path d="M318 506 q-12 -4 -16 6 q2 8 12 6 M322 512 q-12 -2 -14 8 q4 7 12 4 M326 520 q-10 0 -10 9 q4 6 11 2" fill="url(#cpskin)" stroke="#C88A60" stroke-width="1.2"/>
    <path d="M336 506 q10 -10 4 -18 q-8 -2 -12 8" fill="url(#cpskin)" stroke="#C88A60" stroke-width="1.2"/>
  </g>
</svg>`;

  /* ---------- גיצים עולים ---------- */
  let raf = null;
  function sparks(cv, sx = 180, sy = 400, spread = 110, top = 200) {
    const g = cv.getContext("2d"), P = [];
    const fit = () => { cv.width = cv.clientWidth * devicePixelRatio; cv.height = cv.clientHeight * devicePixelRatio; };
    fit();
    const step = () => {
      const W = cv.width, H = cv.height, k = Math.max(W / 360, H / 640), ox = (W - 360 * k) / 2, oy = (H - 640 * k) / 2;
      if (Math.random() < .35) P.push({ x: sx + (Math.random() - .5) * spread, y: sy, vx: (Math.random() - .5) * .5, vy: -(.6 + Math.random() * 1.3), life: 1, r: .8 + Math.random() * 1.6 });
      g.clearRect(0, 0, W, H);
      for (let i = P.length - 1; i >= 0; i--) {
        const p = P[i]; p.x += p.vx + Math.sin(p.y / 14) * .25; p.y += p.vy; p.life -= .011;
        if (p.life <= 0 || p.y < top) { P.splice(i, 1); continue; }
        g.fillStyle = `rgba(255,${150 + 90 * p.life | 0},60,${p.life})`;
        g.beginPath(); g.arc(ox + p.x * k, oy + p.y * k, p.r * k * .9, 0, 7); g.fill();
      }
      raf = requestAnimationFrame(step);
    };
    step();
  }

  /* ---------- פתיחה וסגירה ---------- */
  let ov = null, muted = false, lastScene = -1, sceneSp = null, isDragon = false, roarT = null;
  function open() {
    if (ov) return;
    // כל פעם אחת משלוש הסצנות, באקראי (ולא אותה פעמיים ברצף)
    let k; do { k = Math.floor(Math.random() * 3); } while (k === lastScene); lastScene = k;
    const S = [{ svg: SCENE, title: "חם ונעים 🔥", sp: [180, 400, 110, 200] }, { svg: DRAGON, title: "🐉 הדרקון מחמם!", sp: null }, { svg: CAMP, title: "🔥 מדורה ומרשמלו", sp: [180, 440, 70, 230] }][k];
    ov = document.createElement("div"); ov.className = "fp" + (k === 1 ? " dragon" : "");
    ov.innerHTML = `${S.svg}<canvas class="fp-sparks"></canvas>
      <div class="fp-top"><button class="fp-btn" id="fp-snd">🔊</button><div class="fp-title">${S.title}</div><button class="fp-btn" id="fp-x">✕</button></div>`;
    sceneSp = S.sp; isDragon = k === 1;
    document.body.appendChild(ov);
    requestAnimationFrame(() => ov.classList.add("on"));
    if (sceneSp) sparks(ov.querySelector(".fp-sparks"), ...sceneSp);
    if (isDragon) { const fire = () => { if (navigator.vibrate) navigator.vibrate([0, 120, 60, 200]); roar(); }; roarT = setTimeout(function loop() { fire(); roarT = setTimeout(loop, 4000); }, 1600); }
    if (!muted) soundOn();
    ov.querySelector("#fp-x").onclick = close;
    const sb = ov.querySelector("#fp-snd"); sb.textContent = muted ? "🔇" : "🔊";
    sb.onclick = () => { muted = !muted; sb.textContent = muted ? "🔇" : "🔊"; muted ? soundOff() : soundOn(); };
    if (navigator.vibrate) navigator.vibrate(15);
  }
  function close() {
    if (!ov) return;
    soundOff(); cancelAnimationFrame(raf); clearTimeout(roarT);
    const o = ov; ov = null; o.classList.remove("on"); setTimeout(() => o.remove(), 400);
  }
  document.addEventListener("visibilitychange", () => { if (document.hidden) close(); });
  const btn = $("#cold"); if (btn) btn.onclick = open;
  window.FIREPLACE = { open, close };
})();
