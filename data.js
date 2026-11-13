// תוכן הטיול – מתוך מסמך התכנון של יעל
window.TRIP = {
  start: "2026-12-02T12:05:00+02:00",
  hotel: { name: "Dorint Kurfürstendamm", address: "Augsburger Str. 41, Berlin" },
  maps: [
    { label: "המפה הכללית", url: "https://maps.app.goo.gl/wwiqPrzfR1BvZ9H99", icon: "🗺️" },
    { label: "מפת חג המולד", url: "https://maps.app.goo.gl/cYkxga89CEkDdjvY9", icon: "🎄" },
    { label: "מפת ההחלקות", url: "https://maps.app.goo.gl/D88Gh1F2RjTbVpYa7", icon: "⛸️" }
  ],
  flights: {
    out: { code: "6H255", airline: "ישראייר", date: "2026-12-02", dep: "12:05", arr: "15:30",
           from: "נתב\"ג · טרמינל 3", to: "ברלין BER", bags: "מזוודה 23 ק\"ג + תיק גב לכל אחד", seats: "עוד לא שובצו" },
    back: { code: "BZ271", airline: "Blue Bird", date: "2026-12-09", dep: "14:50", arr: "20:10",
            from: "ברלין BER · טרמינל 1", to: "נתב\"ג", bags: "מזוודה 20 ק\"ג לכל אחד", seats: "יעל 11A (חלון) · נועם 11B" }
  },
  days: [
    {
      date: "2026-12-02", name: "יום רביעי", title: "נוחתים בברלין!", art: "plane", transport: "ABC",
      transportNote: "Berlin WelcomeCard ABC ל-6 ימים – קונים היום",
      items: [
        { id: "d1-flight", title: "טיסה הלוך 6H255", time: "12:05", hard: true, icon: "✈️",
          notes: ["ישראייר, טרמינל 3 – לבדוק לפני", "נחיתה 15:30"], flight: "out" },
        { id: "d1-hotel", title: "צ'ק-אין במלון Dorint", icon: "🏨", maps: "Dorint Kurfürstendamm Berlin Augsburger Str. 41" },
        { id: "d1-super", title: "סופר – אוכל לכמה ימים", icon: "🛒",
          notes: ["פירות, ירקות, יוגורטים, גרנולה, חלב וקורנפלקס"], maps: "Supermarkt near Augsburger Str. 41 Berlin" },
        { id: "d1-alex", title: "שוק חג המולד באלכסנדרפלאץ + החלקה על הקרח", icon: "⛸️", slot: "אחה\"צ",
          notes: ["25 דק' מהמלון"], maps: "Weihnachtsmarkt Alexanderplatz Berlin" },
        { id: "d1-gate", title: "שער ברנדנבורג", icon: "🏛️", notes: ["אפשר לעבור בדרך – 10 דק' ברכבת"], maps: "Brandenburger Tor Berlin" }
      ]
    },
    {
      date: "2026-12-03", name: "יום חמישי", title: "חיות ואורות", art: "penguin", transport: "AB",
      tips: ["מומלץ לבוקר שמש – אפשר להזיז את גן החיות ליום גשום"],
      items: [
        { id: "d2-zoo", title: "גן החיות של ברלין", icon: "🐧", slot: "בוקר",
          notes: ["7 דק' הליכה מהמלון", "פתוח מ-9:00", "להזמין מראש באתר", "לברר זמני האכלות לפני"],
          maps: "Zoologischer Garten Berlin", book: "https://www.zoo-berlin.de", bookLabel: "🎟️ לקנות כרטיס" },
        { id: "d2-lunch", title: "ארוחת צהריים", icon: "🍽️" },
        { id: "d2-garden", title: "Christmas Garden – הגן הבוטני", time: "16:20", hard: true, icon: "✨",
          notes: ["כניסה בין 16:20 ל-16:40", "40 דק' נסיעה – לצאת ב-15:40", "יש כרטיס לנועם · יעל נכנסת חינם כמלווה"],
          maps: "Botanischer Garten Berlin Königin-Luise-Straße 6-8", ticket: "garden" },
        { id: "d2-market", title: "שוק חג המולד ליד המלון", icon: "🎄", slot: "ערב",
          notes: ["Breitscheidplatz – כמה דקות מהמלון"], maps: "Weihnachtsmarkt Breitscheidplatz Berlin" }
      ]
    },
    {
      date: "2026-12-04", name: "יום שישי", title: "גרפיטי, אורות וגאווה", art: "spray", transport: "AB",
      items: [
        { id: "d3-esg", title: "East Side Gallery", icon: "🎨", slot: "בוקר", maps: "East Side Gallery Berlin" },
        { id: "d3-dark", title: "מוזיאון Dark Matter", icon: "🌌",
          notes: ["21 דק' נסיעה", "פתוח 12:00–23:00 (סגור בשני ושלישי)", "יש שם גם משטח החלקה עם אורות!"],
          maps: "Dark Matter Berlin Lichtenberg" },
        { id: "d3-maclarens", title: "MacLaren's Pub – הפאב של HIMYM", icon: "🍻", slot: "אחה\"צ",
          notes: ["להזמין מקום!", "פתוח מ-18:00, סגור בשני", "Boxhagener Str. 16, פרידריכסהיין"], maps: "MacLaren's Pub Boxhagener Straße 16 Berlin",
          book: "https://www.maclarens.de" },
        { id: "d3-pride", title: "שוק חג המולד הלהט\"בי Regenbogen", icon: "🏳️‍🌈",
          notes: ["4 דק' מהפאב"], maps: "Regenbogen Weihnachtsmarkt Berlin" },
        { id: "d3-books", title: "חנות הספרים Prinz Eisenherz", icon: "📚", notes: ["פתוחה עד 20:00"], maps: "Prinz Eisenherz Buchladen Berlin" },
        { id: "d3-cafe", title: "בית הקפה רומיאו ורומיאו", icon: "☕", notes: ["פתוח עד 20:00"], maps: "Romeo und Romeo Café Berlin" }
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
        { id: "d4-blue", title: "שוק \"הזוהר הכחול\" Blauer Lichterglanz", icon: "💙", slot: "מ-16:00",
          notes: ["במדרחוב"], maps: "Blauer Lichterglanz Potsdam Brandenburger Straße" },
        { id: "d4-dutchmarket", title: "שוק חג המולד ברובע ההולנדי", icon: "🎄", maps: "Holländisches Viertel Potsdam Weihnachtsmarkt" },
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
          notes: ["להגיע ב-15:15", "25 דק' נסיעה", "שולם מראש – 2 כרטיסים"], maps: "Friedrichstadt-Palast Berlin", ticket: "show" }
      ]
    },
    {
      date: "2026-12-07", name: "יום שני", title: "מרססים על החומה!", art: "wall", transport: "AB",
      tips: ["רוב המוזיאונים סגורים היום"],
      items: [
        { id: "d6-graffiti", title: "סדנת גרפיטי פרטית על החומה", time: "10:00", hard: true, icon: "🖌️",
          notes: ["40 דק' מהמלון", "המדריך: Sylvain – יהיה עם מכנסיים שחורים", "לכתוב לו בוואטסאפ כשמגיעים"],
          mapsUrl: "https://goo.gl/maps/WsqdzsNXC2xREccR7", whatsapp: "491776277221", ticket: "graffiti" },
        { id: "d6-neotokyo", title: "חנות Neo Tokyo", icon: "🎌", notes: ["19 דק' ברכבת"], maps: "Neo Tokyo Berlin" },
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
        { id: "d8-airport", title: "מגיעים לשדה", time: "11:50", hard: true, icon: "🛫", maps: "BER Airport Terminal 1" },
        { id: "d8-flight", title: "טיסה חזור BZ271", time: "14:50", hard: true, icon: "✈️",
          notes: ["טרמינל 1", "נחיתה בנתב\"ג 20:10"], flight: "back", ticket: "flightBack" }
      ]
    }
  ],
  // "מקומות ששווה לראות" – מתחילים כאן
  extras: [
    { id: "x-spy", title: "מוזיאון הריגול", icon: "🕵️", notes: ["10 דק' הליכה מאנדרטת השואה"], maps: "Deutsches Spionagemuseum Berlin" },
    { id: "x-kadewe", title: "KaDeWe", icon: "🛍️", notes: ["12 דק' הליכה מהמלון"], maps: "KaDeWe Berlin" },
    { id: "x-icebar", title: "Ice Bar", icon: "🧊", notes: ["6 דק' הליכה מ-Haus Schwarzenberg"], maps: "Icebar Berlin" },
    { id: "x-illusions", title: "מוזיאון האשליות", icon: "🌀", notes: ["ליד Haus Schwarzenberg"], maps: "Museum of Illusions Berlin" },
    { id: "x-computer", title: "מוזיאון משחקי המחשב", icon: "🕹️", notes: ["ליד Haus Schwarzenberg"], maps: "Computerspielemuseum Berlin" }
  ],
  suitcase: [
    { g: "חשמל", items: ["מטענים", "מתאם חשמל"] },
    { g: "פארק המים", items: ["בגד ים", "2 מגבות מיקרופייבר"] },
    { g: "אוכל", items: ["קופסאות אוכל לכל השבוע", "סכין", "קרש חיתוך"] },
    { g: "חורף", items: ["כובע צמר", "צעיף", "כפפות", "5 חולצות גוף מחממות", "5 מכנסי גוף מחממים", "מעיל"] },
    { g: "בגדים", items: ["4 מכנסיים", "5 חולצות", "3 סוודרים", "7 גרביים", "7 תחתונים", "שקית לבגדים מלוכלכים"] },
    { g: "רחצה", items: ["מסרק", "מברשת שיניים", "משחת שיניים"] }
  ],
  backpack: [
    { g: "אסור לשכוח", items: ["דרכון", "כרטיס ביטוח לאומי", "תרופות וויטמינים", "כסף"] },
    { g: "בדרך", items: ["בקבוקי מים נינג'ה", "אוזניות", "מטען נייד + כבל", "כרטיס סים", "תכנון טיול מודפס"] }
  ]
};
