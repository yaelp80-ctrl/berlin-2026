/**
 * ברלין 2026 – שרת הסנכרון
 * מדביקים בגיליון Google:  הרחבות ← Apps Script, ואז פורסים כ"אפליקציית אינטרנט".
 * הגיליון שומר את כל הסימונים המשותפים (ראינו / X / הזזה בין ימים).
 */

const SHEET = 'sync';

/** מוצא את הגיליון – גם אם הסקריפט נוצר מחוץ לגיליון (אז הוא יוצר אחד ושומר אותו) */
function spreadsheet_() {
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) return active;
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('SHEET_ID');
  if (id) return SpreadsheetApp.openById(id);
  const ss = SpreadsheetApp.create('ברלין 2026 – סנכרון');
  props.setProperty('SHEET_ID', ss.getId());
  return ss;
}

function sheet_() {
  const ss = spreadsheet_();
  let sh = ss.getSheetByName(SHEET);
  if (!sh) {
    sh = ss.insertSheet(SHEET);
    sh.appendRow(['key', 'value', 't', 'by', 'updated']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function readAll_() {
  const rows = sheet_().getDataRange().getValues().slice(1);
  const out = {};
  rows.forEach(r => { if (r[0]) out[r[0]] = { v: JSON.parse(r[1] || 'null'), t: Number(r[2]) || 0 }; });
  return out;
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

/** קריאה: כל המצב, או סטטוס טיסה */
function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.action === 'flight') return json_(flight_(p.code));
  return json_({ ok: true, data: readAll_(), now: Date.now() });
}

/** כתיבה: {by, changes:{key:{v,t}}} – השינוי החדש יותר מנצח */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const changes = body.changes || {};
    const sh = sheet_();
    const values = sh.getDataRange().getValues();
    const rowOf = {};
    values.forEach((r, i) => { if (i > 0 && r[0]) rowOf[r[0]] = i + 1; });
    const stamp = new Date();
    Object.keys(changes).forEach(k => {
      const c = changes[k];
      const row = rowOf[k];
      if (row) {
        const curT = Number(values[row - 1][2]) || 0;
        if (c.t >= curT) sh.getRange(row, 2, 1, 4).setValues([[JSON.stringify(c.v), c.t, body.by || '', stamp]]);
      } else {
        sh.appendRow([k, JSON.stringify(c.v), c.t, body.by || '', stamp]);
        rowOf[k] = sh.getLastRow();
      }
    });
    return json_({ ok: true, data: readAll_(), now: Date.now() });
  } finally {
    lock.releaseLock();
  }
}

/** סטטוס טיסה מלוח הטיסות של רשות שדות התעופה (data.gov.il) */
function flight_(code) {
  if (!code) return { ok: false };
  const m = String(code).match(/^([A-Z0-9]{2})(\d+)$/);
  if (!m) return { ok: false };
  const cache = CacheService.getScriptCache();
  const hit = cache.get('f:' + code);
  if (hit) return JSON.parse(hit);
  try {
    const url = 'https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=20&q=' +
      encodeURIComponent(m[1] + ' ' + m[2]);
    const res = JSON.parse(UrlFetchApp.fetch(url, { muteHttpExceptions: true }).getContentText());
    const recs = ((res.result || {}).records || []).filter(r => r.CHOPER === m[1] && String(r.CHFLTN) === m[2]);
    const out = { ok: true, records: recs.map(r => ({
      scheduled: r.CHSTOL, estimated: r.CHPTOL, terminal: r.CHTERM, checkin: r.CHCINT,
      status: r.CHRMINH || r.CHRMINE, statusEn: r.CHRMINE, direction: r.CHAORD
    })) };
    cache.put('f:' + code, JSON.stringify(out), 600);
    return out;
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}
