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
  ["💛 המשפטים שלנו", [
    ["קוראים לי נועם", "Ich heiße Noam", "אִיך הַייסֶה נוֹ-עַם", "Ich heiße No. Am."],
    ["שם הבמה שלי הוא Kay", "Mein Künstlername ist Kay", "מַיין קִינסטלֶרנָאמֶה אִיסט קֵיי"],
    ["אני אוהב בעלי חיים, יש לי בבית שני כלבים ושני נחשים", "Ich liebe Tiere. Ich habe zu Hause zwei Hunde und zwei Schlangen.", "אִיך לִיבֶּה טִירֶה. אִיך הַאבֶּה צוּ הַאוּזֶה צְוַוי הוּנדֶה אוּנט צְוַוי שְׁלַאנגֶן"],
    ["נא לפנות אליי בלשון זכר", "Meine Pronomen sind er/ihm", "מַיינֶה פּרוֹנוֹמֶן זִינט אֶר/אִים"],
    ["אני צלמת", "Ich bin Fotografin", "אִיך בִּין פוֹטוֹגרָאפִין"],
    ["אני אמנית", "Ich bin Künstlerin", "אִיך בִּין קִינסטלֶרִין"],
    ["איפה השירותים הקרובים?", "Wo ist die nächste Toilette?", "וֹוּ אִיסט דִּי נֶכסטֶה טוֹאָלֶטֶה?"],
    ["אני אוהב את ברלין", "Ich liebe Berlin", "אִיך לִיבֶּה בֶּרלִין"]]],
  ["👋 בסיס", [
    ["שלום", "Hallo", "הַאלוֹ"], ["בוקר טוב", "Guten Morgen", "גוּטֶן מוֹרגֶן"], ["ערב טוב", "Guten Abend", "גוּטֶן אָבֶּנט"],
    ["לילה טוב", "Gute Nacht", "גוּטֶה נַאכט"], ["תודה (רבה)", "Danke (schön)", "דַּנקֶה (שֵׁן)"], ["בבקשה", "Bitte", "בִּיטֶה"],
    ["סליחה", "Entschuldigung", "אֶנטשׁוּלדִיגוּנג"], ["כן / לא", "Ja / Nein", "יָא / נַיין"], ["להתראות", "Tschüss", "צ'וּס"],
    ["להתראות (רשמי)", "Auf Wiedersehen", "אַוף וִידֶרזֵיין"], ["מה שלומך?", "Wie geht's?", "וִי גֵייטס?"], ["טוב, תודה", "Gut, danke", "גוּט, דַּנקֶה"],
    ["קוראים לי…", "Ich heiße…", "אִיך הַייסֶה…"], ["אני לא מבין", "Ich verstehe nicht", "אִיך פֶרשְׁטֵייֶה נִיכט"],
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

function speak(t) {
  try { const u = new SpeechSynthesisUtterance(t); u.lang = "de-DE"; u.rate = .85; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch {}
}

function render() {
  const v = $("#v-tools"); if (!v) return;
  const when = rate.at ? new Date(rate.at).toLocaleDateString("he-IL") : "";
  v.innerHTML = `
  <div class="card tool"><h3>💶 ממיר מטבע</h3>
    <div class="cur"><div><input id="eur" inputmode="decimal" placeholder="0"><div class="muted" style="text-align:center">יורו €</div></div>
      <div style="font-size:22px">⇄</div>
      <div><input id="ils" inputmode="decimal" placeholder="0"><div class="muted" style="text-align:center">שקל ₪</div></div></div>
    <div class="muted" style="margin-top:8px;font-size:13px">1 € = ${rate.v.toFixed(2)} ₪ ${rate.est ? "(הערכה – יתעדכן כשיש קליטה)" : `· שער רשמי מ-${when}`}</div></div>

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
  const e = $("#eur"), s = $("#ils");
  e.oninput = () => { const x = parseFloat(e.value); s.value = isNaN(x) ? "" : (x * rate.v).toFixed(2); };
  s.oninput = () => { const x = parseFloat(s.value); e.value = isNaN(x) ? "" : (x / rate.v).toFixed(2); };
  v.querySelectorAll("[data-say]").forEach(b => b.onclick = () => { const p = PHRASES[+b.dataset.say]; speak(p[3] || p[1]); });
  const an = v.querySelector("[data-anthem]"); if (an) an.onclick = () => speak(ANTHEM.map(x => x[0]).join(" "));
}
render(); loadRate();
addEventListener("online", loadRate);
})();
