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
  ${dog(118, 528, 1, false, "#c8894f", "#7a4a26", "#f2dcc0", 0)}
  ${dog(248, 538, .95, true, "#3a3434", "#1c1818", "#f4f0ea", 1.3)}
</svg>`;

  /* ---------- גיצים עולים ---------- */
  let raf = null;
  function sparks(cv) {
    const g = cv.getContext("2d"), P = [];
    const fit = () => { cv.width = cv.clientWidth * devicePixelRatio; cv.height = cv.clientHeight * devicePixelRatio; };
    fit();
    const step = () => {
      const W = cv.width, H = cv.height, k = Math.max(W / 360, H / 640), ox = (W - 360 * k) / 2, oy = (H - 640 * k) / 2;
      if (Math.random() < .35) P.push({ x: 180 + (Math.random() - .5) * 110, y: 400, vx: (Math.random() - .5) * .5, vy: -(.6 + Math.random() * 1.3), life: 1, r: .8 + Math.random() * 1.6 });
      g.clearRect(0, 0, W, H);
      for (let i = P.length - 1; i >= 0; i--) {
        const p = P[i]; p.x += p.vx + Math.sin(p.y / 14) * .25; p.y += p.vy; p.life -= .011;
        if (p.life <= 0 || p.y < 200) { P.splice(i, 1); continue; }
        g.fillStyle = `rgba(255,${150 + 90 * p.life | 0},60,${p.life})`;
        g.beginPath(); g.arc(ox + p.x * k, oy + p.y * k, p.r * k * .9, 0, 7); g.fill();
      }
      raf = requestAnimationFrame(step);
    };
    step();
  }

  /* ---------- פתיחה וסגירה ---------- */
  let ov = null, muted = false;
  function open() {
    if (ov) return;
    ov = document.createElement("div"); ov.className = "fp";
    ov.innerHTML = `${SCENE}<canvas class="fp-sparks"></canvas>
      <div class="fp-top"><button class="fp-btn" id="fp-snd">🔊</button><div class="fp-title">חם ונעים 🔥</div><button class="fp-btn" id="fp-x">✕</button></div>`;
    document.body.appendChild(ov);
    requestAnimationFrame(() => ov.classList.add("on"));
    sparks(ov.querySelector(".fp-sparks"));
    if (!muted) soundOn();
    ov.querySelector("#fp-x").onclick = close;
    const sb = ov.querySelector("#fp-snd"); sb.textContent = muted ? "🔇" : "🔊";
    sb.onclick = () => { muted = !muted; sb.textContent = muted ? "🔇" : "🔊"; muted ? soundOff() : soundOn(); };
    if (navigator.vibrate) navigator.vibrate(15);
  }
  function close() {
    if (!ov) return;
    soundOff(); cancelAnimationFrame(raf);
    const o = ov; ov = null; o.classList.remove("on"); setTimeout(() => o.remove(), 400);
  }
  document.addEventListener("visibilitychange", () => { if (document.hidden) close(); });
  const btn = $("#cold"); if (btn) btn.onclick = open;
  window.FIREPLACE = { open, close };
})();
