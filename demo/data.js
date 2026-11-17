// תוכן הטיול – גרסה לדוגמה
window.TRIP = {
  start: "2026-12-02T12:05:00+02:00",
  hotel: { name: "המלון", address: "Kurfürstendamm, Berlin" },
  maps: [],
  tickets: {
  },
  flights: {
    out: { code: "", airline: "", date: "2026-12-02", dep: "12:05", arr: "15:30",
           from: "נתב\"ג · טרמינל 3", to: "ברלין BER", ticket: "flightOut", dir: "D", bags: "מזוודה 23 ק\"ג + תיק גב לכל אחד", seats: "" },
    back: { code: "", airline: "", date: "2026-12-09", dep: "14:50", arr: "20:10",
            from: "ברלין BER · טרמינל 1", to: "נתב\"ג", ticket: "flightBack", dir: "A", bags: "מזוודה 20 ק\"ג לכל אחד", seats: "" }
  },
  days: [
    {
      date: "2026-12-02", name: "יום רביעי", title: "נוחתים בברלין!", art: "plane", transport: "ABC",
      transportNote: "Berlin WelcomeCard ABC ל-6 ימים – קונים היום",
      items: [
        { id: "d1-flight", title: "טיסה לברלין", time: "12:05", hard: true, icon: "✈️",
          },
        { id: "d1-hotel", title: "צ'ק-אין במלון", icon: "🏨", maps: "Kurfürstendamm Berlin" },
        { id: "d1-super", title: "סופר – אוכל לכמה ימים", icon: "🛒",
          notes: ["פירות, ירקות, יוגורטים, גרנולה, חלב וקורנפלקס"], maps: "Supermarkt near Augsburger Str. 41 Berlin" },
        { id: "d1-alex", title: "שוק חג המולד באלכסנדרפלאץ + החלקה על הקרח", icon: "⛸️", slot: "אחה\"צ",
          notes: ["25 דק' מהמלון"], maps: "Weihnachtsmarkt Alexanderplatz Berlin" },
        { id: "d1-gate", title: "שער ברנדנבורג", icon: "🏛️", notes: ["אפשר לעבור בדרך – 10 דק' ברכבת"], maps: "Brandenburger Tor Berlin" }
      ]
    },
    {
      date: "2026-12-03", name: "יום חמישי", title: "חיות ואורות", art: "penguin", transport: "AB",
      tips: ["מומלץ לבוקר שמשי"],
      items: [
        { id: "d2-zoo", title: "גן החיות + האקווריום", icon: "🐧", slot: "בוקר",
          notes: ["7 דק' הליכה מהמלון", "פתוח מ-9:00", "לקנות כרטיס משולב גן חיות + אקווריום", "🐍 באקווריום: קומת הזוחלים – נחשים, תנינים וצבים", "האקווריום פתוח עד 18:00 (כניסה אחרונה 17:00)", "לברר זמני האכלות לפני"],
          maps: "Zoologischer Garten Berlin", book: "https://www.zoo-berlin.de", bookLabel: "🎟️ לקנות כרטיס" },
        { id: "d2-lunch", title: "ארוחת צהריים", icon: "🍽️" },
        { id: "d2-anime", title: "חנויות אנימה ב-Bikini Berlin", icon: "🎌",
          notes: ["Kyun-Labo – מרצ'נדייז אנימה", "Figuya x Konsolenkost – אנימה, מנגה, פיגורות וגיימינג", "צמוד לגן החיות"], maps: "Bikini Berlin Budapester Straße 38" },
        { id: "d2-garden", title: "Christmas Garden – הגן הבוטני", time: "16:20", hard: true, icon: "✨",
          notes: ["כניסה בין 16:20 ל-16:40", "40 דק' נסיעה – לצאת ב-15:40", "לקנות כרטיסים מראש"],
          maps: "Botanischer Garten Berlin Königin-Luise-Straße 6-8" },
        { id: "d2-market", title: "שוק חג המולד ליד המלון", icon: "🎄", slot: "ערב",
          notes: ["Breitscheidplatz – כמה דקות מהמלון"], maps: "Weihnachtsmarkt Breitscheidplatz Berlin" }
      ]
    },
    {
      date: "2026-12-04", name: "יום שישי", title: "גרפיטי, אורות ושוק אבירים", art: "spray", transport: "AB",
      items: [
        { id: "d3-esg", title: "East Side Gallery", icon: "🎨", slot: "בוקר", maps: "East Side Gallery Berlin" },
        { id: "d3-oberbaum", title: "גשר אוברבאום", icon: "🌉", notes: ["צמוד ל-East Side Gallery", "הגשר הכי יפה בברלין, עם צריחים אדומים"], maps: "Oberbaumbrücke Berlin" },
        { id: "d3-dark", title: "מוזיאון Dark Matter", icon: "🌌",
          notes: ["21 דק' נסיעה", "פתוח 12:00–23:00 (סגור בשני ושלישי)", "⛸️ החלקה על הקרח ב-Winterlights – יער של 600 עצי אשוח תלויים הפוך", "לקנות כרטיס משולב: התערוכה + Winterlights + החלקה", "יש השכרת מחליקיים"],
          maps: "Dark Matter Köpenicker Chaussee 46 Berlin", book: "https://www.darkmatter.berlin", bookLabel: "🎟️ לקנות כרטיס" },
        { id: "d3-maclarens", title: "MacLaren's Pub – הפאב של HIMYM", icon: "🍻", slot: "אחה\"צ",
          notes: ["להזמין מקום!", "פתוח מ-18:00, סגור בשני", "כ-20 דק' נסיעה מ-Dark Matter (ליד Ostkreuz)"], maps: "MacLaren's Pub Boxhagener Straße 16 Berlin",
          book: "https://www.maclarens.de" },
        { id: "d3-urbanspree", title: "Urban Spree – גלריה לאמנות רחוב", icon: "🖼️", notes: ["בתוך מתחם RAW, כ-10 דק' הליכה מהפאב", "גלריה וחנות לאמנות רחוב – לבדוק שעות פתיחה"], maps: "Urban Spree Revaler Straße 99 Berlin" },
        { id: "d3-raw", title: "שוק חג המולד מימי הביניים ב-RAW", icon: "🏰", slot: "ערב",
          notes: ["באותו מתחם, ליד הפאב", "לפידים, נפחים, גלגל ענק וקרוסלת עץ", "פתוח בשישי עד 23:00 · כניסה 3–4 €"], maps: "RAW Gelände Revaler Straße 99 Berlin" }
      ]
    },
    {
      date: "2026-12-05", name: "שבת", title: "יום בפוטסדאם", art: "palace", transport: "ABC",
      transportNote: "S-Bahn ישירה בקו S7 – כ-35 עד 40 דק'",
      tips: ["מומלץ ליום שמש"],
      items: [
        { id: "d4-bio", title: "Biosphäre Potsdam", icon: "🦋", notes: ["שעה נסיעה מהמלון"], maps: "Biosphäre Potsdam" },
        { id: "d4-dutch", title: "הרובע ההולנדי והמדרחוב", icon: "🧱", slot: "13:00–15:30",
          notes: ["רבע שעה מהביוספרה", "חלונות ראווה של בוטיקים וגלריות"], maps: "Holländisches Viertel Potsdam" },
        { id: "d4-sanssouci", title: "ארמון סנסוסי והגנים", icon: "🏰",
          notes: ["20 דק' הליכה מהרובע", "לראות באור יום"], maps: "Schloss Sanssouci Potsdam" },
        { id: "d4-blue", title: "שוק \"הזוהר הכחול\" – היום Potsdamer Weihnachtszauber", icon: "💙", slot: "מ-16:00",
          notes: ["במדרחוב Brandenburger Straße", "יש משטח החלקה וגלגל ענק!", "פתוח בשבת עד 22:00"], maps: "Potsdamer Weihnachtszauber Brandenburger Straße Potsdam" },
        { id: "d4-dutchmarket", title: "שוק חג המולד ברובע ההולנדי", icon: "🎄",
          notes: ["שוק סינטרקלאס מתקיים רק בסופ\"ש אחד בדצמבר – לבדוק תאריכים"], maps: "Holländisches Viertel Potsdam" },
        { id: "d4-back", title: "חזרה למלון בברלין", icon: "🚆", notes: ["שעה נסיעה"] }
      ]
    },
    {
      date: "2026-12-06", name: "יום ראשון", title: "דינוזאורים ומופע", art: "dino", transport: "AB",
      tips: ["המוזיאון והמופע 15 דק' הליכה זה מזה"],
      items: [
        { id: "d5-museum", title: "מוזיאון הטבע Museum für Naturkunde", time: "11:00", hard: true, icon: "🦕",
          notes: ["חצי שעה מהמלון", "כדאי שעתיים", "פתוח 10:00–18:00, סגור בשני"], maps: "Museum für Naturkunde Berlin" },
        { id: "d5-cowei", title: "מסעדת Cowei – אוכל יפני", time: "13:30", hard: true, icon: "🍜",
          notes: ["להזמין מקום!", "ליד Hackescher Markt", "פתוח 12:00–22:00"], maps: "Cowei James-Simon-Park 152 Berlin",
          book: "https://www.cowei-berlin.de", call: "+493060051647" },
        { id: "d5-show", title: "Blinded by Delight – Friedrichstadt-Palast", time: "15:30", hard: true, icon: "🎭",
          notes: ["להגיע ב-15:15", "25 דק' נסיעה", "לקנות כרטיסים מראש"], maps: "Friedrichstadt-Palast Berlin" }
      ]
    },
    {
      date: "2026-12-07", name: "יום שני", title: "מרססים על החומה!", art: "wall", transport: "AB",
      tips: ["רוב המוזיאונים סגורים היום"],
      items: [
        { id: "d6-graffiti", title: "סדנת גרפיטי פרטית על החומה", time: "10:00", hard: true, icon: "🖌️",
          notes: ["40 דק' מהמלון", "להזמין סדנה מראש"], maps: "East Side Gallery Berlin" },
        { id: "d6-neotokyo", title: "חנות Neo Tokyo", icon: "🎌", notes: ["19 דק' ברכבת"], maps: "Neo Tokyo Berlin" },
        { id: "d6-modulor", title: "Modulor – חנות ענקית לחומרי ציור ויצירה", icon: "✏️",
          notes: ["2 קומות של חומרי יצירה", "במוריצפלאץ, קרויצברג (U8)", "לבדוק שעות פתיחה לפני – במקורות יש שעות שונות"], maps: "Modulor Prinzenstraße 85 Berlin" },
        { id: "d6-schwarzenberg", title: "רחוב הגרפיטי Haus Schwarzenberg", icon: "🎨",
          notes: ["14 דק' נסיעה או הליכה", "יש שם בית קפה באווירת גרפיטי"], maps: "Haus Schwarzenberg Berlin" },
        { id: "d6-avocado", title: "אוכל: Avocado Club", icon: "🥑", notes: ["ממש ליד יש מסעדת סטייקים שווה!"], maps: "Avocado Club Berlin" }
      ]
    },
    {
      date: "2026-12-08", name: "יום שלישי", title: "פארק מים טרופי", art: "palm", transport: "RE2",
      transportNote: "כרטיס רכבת בין-עירוני הלוך-חזור, RE2 – קונים מראש ב-DB Navigator",
      tips: ["אסור להכניס אוכל מבחוץ – להכין כריך לרכבת", "לא לשכוח בגדי ים!"],
      items: [
        { id: "d7-train", title: "רכבת RE2 לפארק", icon: "🚆", notes: ["כרטיס מראש באפליקציית DB Navigator"], book: "https://www.bahn.de", bookLabel: "🎟️ DB / bahn.de" },
        { id: "d7-park", title: "Tropical Islands", icon: "🌴",
          notes: ["פתוח 8:00–23:30", "לקנות באתר כרטיס Reduce – מלווה חינם", "יש צמיד פטור מתור", "השכרת מגבות במקום"],
          maps: "Tropical Islands Krausnick", book: "https://www.tropical-islands.de", bookLabel: "🎟️ לקנות כרטיס" },
        { id: "d7-lunch", title: "ארוחת צהריים במסעדה בפארק", icon: "🍽️" }
      ]
    },
    {
      date: "2026-12-09", name: "יום רביעי", title: "חוזרים הביתה", art: "suitcase", transport: "ABC",
      transportNote: "כרטיס ABC בודד לשדה התעופה",
      items: [
        { id: "d8-checkout", title: "צ'ק-אאוט מהמלון", icon: "🧳" },
        { id: "d8-train", title: "יוצאים לשדה ברכבת", time: "10:50", hard: true, icon: "🚆",
          notes: ["שתי רכבות – שעה", "דרך Hauptbahnhof או Ostkreuz"] },
        { id: "d8-airport", title: "מגיעים לשדה", time: "11:50", hard: true, icon: "🛫", maps: "BER Airport" },
        { id: "d8-flight", title: "טיסה הביתה", time: "14:50", hard: true, icon: "✈️" }
      ]
    }
  ],
  // "מקומות ששווה לראות" – מתחילים כאן
  extras: [
    { id: "x-spy", title: "מוזיאון הריגול", icon: "🕵️", notes: ["10 דק' הליכה מאנדרטת השואה"], maps: "Deutsches Spionagemuseum Berlin" },
    { id: "x-kadewe", title: "KaDeWe", icon: "🛍️", notes: ["12 דק' הליכה מהמלון"], maps: "KaDeWe Berlin" },
    { id: "x-icebar", title: "Ice Bar", icon: "🧊", notes: ["6 דק' הליכה מ-Haus Schwarzenberg"], maps: "Icebar Berlin" },
    { id: "x-illusions", title: "מוזיאון האשליות", icon: "🌀", notes: ["ליד Haus Schwarzenberg"], maps: "Museum of Illusions Berlin" },
    { id: "x-urbannation", title: "מוזיאון Urban Nation – אמנות רחוב", icon: "🎨", notes: ["כניסה חינם", "ה׳–א׳ 12:00–20:00 · ג׳–ד׳ 10:00–18:00 · סגור בשני", "בשונברג, ליד תחנת Nollendorfplatz", "גם הבניינים ברחוב מצוירים"], maps: "Urban Nation Museum Bülowstraße 7 Berlin" },
    { id: "x-computer", title: "מוזיאון משחקי המחשב", icon: "🕹️", notes: ["ליד Haus Schwarzenberg"], maps: "Computerspielemuseum Berlin" }
  ],
  suitcase: [
    { g: "חשמל", items: ["מטענים", "מתאם חשמל"] },
    { g: "פארק המים", items: ["בגד ים", "2 מגבות מיקרופייבר"] },
    { g: "אוכל", items: ["קופסאות אוכל לכל השבוע", "סכין", "קרש חיתוך", "ערכת תה"] },
    { g: "חורף", items: ["כובע צמר", "צעיף", "כפפות", "5 חולצות גוף מחממות", "5 מכנסי גוף מחממים", "מעיל"] },
    { g: "בגדים", items: ["4 מכנסיים", "5 חולצות", "3 סוודרים", "7 גרביים", "7 תחתונים", "שקית לבגדים מלוכלכים"] },
    { g: "רחצה", items: ["מסרק", "מברשת שיניים", "משחת שיניים"] }
  ],
  backpack: [
    { g: "אסור לשכוח", items: ["דרכון", "כרטיס ביטוח לאומי", "תרופות וויטמינים", "כסף"] },
    { g: "בדרך", items: ["בקבוקי מים נינג'ה", "אוזניות", "מטען נייד + כבל", "כרטיס סים", "תכנון טיול מודפס"] }
  ]
};

/* גרסה לדוגמה: הטיול מתחיל תמיד ביום רביעי הקרוב, החל ממחר */
(() => {
  const T = window.TRIP, base = new Date("2026-12-02T12:00:00"), t = new Date();
  t.setHours(12, 0, 0, 0); t.setDate(t.getDate() + 1);
  while (t.getDay() !== base.getDay()) t.setDate(t.getDate() + 1);
  const off = Math.round((t - base) / 864e5);
  const sh = s => { const x = new Date(s.slice(0, 10) + "T12:00:00"); x.setDate(x.getDate() + off); const p = n => String(n).padStart(2, "0"); return `${x.getFullYear()}-${p(x.getMonth() + 1)}-${p(x.getDate())}`; };
  T.days.forEach(d => d.date = sh(d.date));
  Object.values(T.flights).forEach(f => f.date = sh(f.date));
  T.start = sh(T.start) + T.start.slice(10);
  window.TRIP_SHIFT = off;
})();
