/* לשונית חג המולד */
(() => {
const X = window.XMAS, T = window.TRIP;
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const TAG = { ice: "⛸️ החלקה", rides: "🎠 מתקנים", wheel: "🎡 גלגל ענק", sled: "🛷 מגלשת שלג", stage: "🎤 במה", fee: "💶 כניסה בתשלום", weekend: "📅 רק בסופ\"ש" };
const FILTERS = [["all", "הכל"], ["ice", "⛸️ החלקה"], ["fun", "🎡 מתקנים"], ["near", "📍 קרוב למלון"], ["plan", "🗓️ בתוכנית"]];
let filter = "all", open = null;

const fmt = s => { const [, m, d] = s.split("-"); return `${+d}.${+m}`; };
const near = m => /הליכה|10 דק|15 דק/.test(m.travel || "");
const pass = m => filter === "all" || (filter === "ice" && m.tags.includes("ice")) ||
  (filter === "fun" && (m.tags.includes("rides") || m.tags.includes("wheel") || m.tags.includes("sled"))) ||
  (filter === "near" && near(m)) || (filter === "plan" && m.plan != null);

function card(m, rank) {
  const been = window.APP.getItem(m.id)?.s === "done", isOpen = open === m.id;
  const planTxt = m.plan != null ? `<span class="tag" style="background:#1D7A4E">🗓️ בתוכנית: ${T.days[m.plan].name} ${fmt(T.days[m.plan].date)}</span>` : "";
  return `<div class="mk ${been ? "been" : ""} ${isOpen ? "open" : ""}" data-mk="${m.id}">
    <div class="mkhead">
      <div class="rank">${m.pride ? "🏳️‍🌈" : rank}</div>
      <div style="flex:1;min-width:0"><div class="ttl"><b>${esc(m.name)}</b>${m.pride ? ` <span class="pflag">🏳️‍🌈</span>` : ""}</div>
        ${m.sub ? `<div class="muted" style="font-size:13px">${esc(m.sub)}</div>` : ""}
        <div class="tags">${m.tags.map(t => `<span class="tag">${TAG[t]}</span>`).join("")}${planTxt}</div></div>
      <button class="beenb ${been ? "on" : ""}" data-been="${m.id}"><span class="check">${been ? "✓" : ""}</span><small>${been ? "היינו!" : "היינו?"}</small></button>
    </div>
    <div class="mkbody">
      ${m.warn ? `<div class="banner">⚠️ ${esc(m.warn)}</div>` : ""}
      <p>${esc(m.about)}</p>
      <dl class="kv"><dt>📅 תאריכים</dt><dd>${esc(m.dates)}</dd><dt>🕓 שעות</dt><dd>${esc(m.hours)}</dd>
        <dt>🎟️ כניסה</dt><dd>${esc(m.fee)}</dd>${m.travel ? `<dt>🚇 נסיעה</dt><dd>${esc(m.travel)}</dd>` : ""}</dl>
      <div class="review">💬 ${esc(m.review)}</div>
      <div class="acts"><a class="btn gold" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(m.maps)}">📍 ניווט</a>
        <a class="btn" target="_blank" rel="noopener" href="${m.url}">🔗 פרטים</a></div>
    </div></div>`;
}

function render() {
  const list = X.markets.filter(pass), pots = X.potsdam.filter(pass);
  const been = [...X.markets, ...X.potsdam].filter(m => window.APP.getItem(m.id)?.s === "done").length;
  $("#v-xmas").innerHTML = `<div class="card"><div class="hd"><div><h2>שווקי חג המולד</h2>
      <div class="muted">${X.markets.length} השווקים הכי שווים בברלין, מסודרים מהכי שווה, ועוד ${X.potsdam.length} בפוטסדאם</div>
      <div class="muted" style="margin-top:6px">🎄 היינו ב-${been} שווקים</div></div>${window.ART.tree}</div>
      <div class="chips">${FILTERS.map(([k, l]) => `<button class="chip ${filter === k ? "on" : ""}" data-f="${k}">${l}</button>`).join("")}</div></div>
    ${list.map(m => card(m, X.markets.indexOf(m))).join("") || `<div class="empty">אין שווקים בסינון הזה</div>`}
    ${pots.length ? `<h3>🏰 פוטסדאם (${T.days[3].name.replace("יום ", "")} ${fmt(T.days[3].date)})</h3>${pots.map(m => card(m, "P")).join("")}
` : ""}
    <div class="muted" style="text-align:center;font-size:12px;padding:8px">מידע מ-berlin.de ו-visitBerlin · עודכן ${X.updated} · זמני נסיעה משוערים</div>`;
}

document.addEventListener("click", e => {
  if (!e.target.closest("#v-xmas")) return;
  const f = e.target.closest("[data-f]"), b = e.target.closest("[data-been]"), mk = e.target.closest("[data-mk]");
  if (f) { filter = f.dataset.f; render(); return; }
  if (b) { const id = b.dataset.been, cur = window.APP.getItem(id)?.s === "done";
    window.APP.setItem(id, { s: cur ? null : "done" }); render(); return; }
  if (e.target.closest("a")) return;
  if (mk) { open = open === mk.dataset.mk ? null : mk.dataset.mk; render(); }
});

window.XMASVIEW = { render };
})();
