// תוכן הטיול – מתוך מסמך התכנון של יעל
window.TRIP = {
  start: "2026-12-02T12:05:00+02:00",
  hotel: { name: "Dorint Kurfürstendamm", address: "Augsburger Str. 41, Berlin" },
  maps: [
    { label: "המפה הכללית", url: "https://maps.app.goo.gl/wwiqPrzfR1BvZ9H99", icon: "🗺️" },
    { label: "מפת חג המולד", url: "https://maps.app.goo.gl/cYkxga89CEkDdjvY9", icon: "🎄" },
    { label: "מפת ההחלקות", url: "https://maps.app.goo.gl/D88Gh1F2RjTbVpYa7", icon: "⛸️" }
  ],
  tickets: {
    flightOut: { title: "טיסה הלוך 6H255", icon: "✈️", flight: "out", note: "אין קובץ כרטיס – אפשר להעלות כרטיס עלייה למטוס אם יהיה" },
    garden: { title: "Christmas Garden", icon: "✨", note: "הכרטיס של נועם · יעל נכנסת חינם כמלווה" },
    show: { title: "Blinded by Delight", icon: "🎭", note: "2 כרטיסים בקובץ אחד" },
    graffiti: { title: "סדנת גרפיטי", icon: "🖌️", note: "אין כרטיס – האישור במייל. המדריך: Sylvain", whatsapp: "491776277221" },
    flightBack: { title: "טיסה חזור BZ271", icon: "✈️", flight: "back", note: "כרטיס לכל אחד מכם" }
  },
  flights: {
    out: { code: "6H255", airline: "ישראייר", date: "2026-12-02", dep: "12:05", arr: "15:30",
           from: "נתב\"ג · טרמינל 3", to: "ברלין BER", ticket: "flightOut", dir: "D", bags: "מזוודה 23 ק\"ג + תיק גב לכל אחד", seats: "עוד לא שובצו" },
    back: { code: "BZ271", airline: "Blue Bird", date: "2026-12-09", dep: "14:50", arr: "20:10",
            from: "ברלין BER · טרמינל 1", to: "נתב\"ג", ticket: "flightBack", dir: "A", bags: "מזוודה 20 ק\"ג לכל אחד", seats: "יעל 11A (חלון) · נועם 11B" }
  },
  days: [
    {
      date: "2026-12-02", name: "יום רביעי", title: "נוחתים בברלין!", art: "plane", transport: "ABC",
      transportNote: "Berlin WelcomeCard ABC ל-6 ימים – קונים היום",
      items: [
        { id: "d1-flight", title: "טיסה הלוך 6H255", time: "12:05", hard: true, icon: "✈️",
          notes: ["ישראייר, טרמינל 3 – לבדוק לפני", "נחיתה 15:30"], flight: "out", ticket: "flightOut" },
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
      tips: ["מומלץ לבוקר שמשי"],
      items: [
        { id: "d2-zoo", title: "גן החיות + האקווריום", icon: "🐧", slot: "בוקר",
          notes: ["7 דק' הליכה מהמלון", "פתוח מ-9:00", "לקנות כרטיס משולב גן חיות + אקווריום", "🐍 באקווריום: קומת הזוחלים – נחשים, תנינים וצבים", "האקווריום פתוח עד 18:00 (כניסה אחרונה 17:00)", "לברר זמני האכלות לפני"],
          maps: "Zoologischer Garten Berlin", book: "https://www.zoo-berlin.de", bookLabel: "🎟️ לקנות כרטיס" },
        { id: "d2-lunch", title: "ארוחת צהריים", icon: "🍽️" },
        { id: "d2-anime", title: "חנויות אנימה ב-Bikini Berlin", icon: "🎌",
          notes: ["Kyun-Labo – מרצ'נדייז אנימה", "Figuya x Konsolenkost – אנימה, מנגה, פיגורות וגיימינג", "צמוד לגן החיות"], maps: "Bikini Berlin Budapester Straße 38" },
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
          notes: ["21 דק' נסיעה", "פתוח 12:00–23:00 (סגור בשני ושלישי)", "⛸️ החלקה על הקרח ב-Winterlights – יער של 600 עצי אשוח תלויים הפוך", "לקנות כרטיס משולב: התערוכה + Winterlights + החלקה", "יש השכרת מחליקיים"],
          maps: "Dark Matter Köpenicker Chaussee 46 Berlin", book: "https://www.darkmatter.berlin", bookLabel: "🎟️ לקנות כרטיס" },
        { id: "d3-maclarens", title: "MacLaren's Pub – הפאב של HIMYM", icon: "🍻", slot: "אחה\"צ",
          notes: ["להזמין מקום!", "פתוח מ-18:00, סגור בשני", "כ-20 דק' נסיעה מ-Dark Matter (ליד Ostkreuz)"], maps: "MacLaren's Pub Boxhagener Straße 16 Berlin",
          book: "https://www.maclarens.de" },
        { id: "d3-pride", title: "שוק חג המולד הלהט\"בי Regenbogen", icon: "🏳️‍🌈",
          notes: ["כ-35 דק' נסיעה מהפאב", "בנולנדורפפלאץ, מתחת לרכבת העילית (Christmas Avenue)"], maps: "Christmas Avenue Nollendorfplatz Berlin" },
        { id: "d3-books", title: "חנות הספרים Prinz Eisenherz", icon: "📚", notes: ["פתוחה עד 20:00", "ליד השוק"], maps: "Prinz Eisenherz Buchladen Berlin" },
        { id: "d3-cafe", title: "בית הקפה רומיאו ורומיאו", icon: "☕", notes: ["פתוח עד 20:00", "ליד השוק"], maps: "Romeo und Romeo Café Berlin" },
        { id: "x-boardroom", title: "Boardroom – קפה משחקי קופסה", icon: "🎲", slot: "ערב", notes: ["כמה דק' הליכה מהשוק", "אפשר להזמין שולחן מראש באינטרנט"], maps: "Boardroom Brettspielcafé Hohenstaufenstraße 69 Berlin" }
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
          notes: ["⚠️ שוק סינטרקלאס מתקיים השנה רק ב-12–13.12, אחרי הטיול"], maps: "Holländisches Viertel Potsdam" },
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
    { id: "x-urbannation", title: "מוזיאון Urban Nation – אמנות רחוב", icon: "🎨", notes: ["כניסה חינם", "ה׳–א׳ 12:00–20:00 · ג׳–ד׳ 10:00–18:00 · סגור בשני", "ליד נולנדורפפלאץ והשוק הלהט\"בי", "גם הבניינים ברחוב מצוירים"], maps: "Urban Nation Museum Bülowstraße 7 Berlin" },
    { id: "x-computer", title: "מוזיאון משחקי המחשב", icon: "🕹️", notes: ["ליד Haus Schwarzenberg"], maps: "Computerspielemuseum Berlin" },
    { id: "x-lego", title: "חנות LEGO", icon: "🧱", notes: ["כ-7 דק' הליכה מהמלון", "ב׳–שבת 10:00–20:00 · סגור בראשון", "2–3.12 בין 15:00 ל-17:00: בונים קופסת מתנה מלגו בחנות"], maps: "LEGO Store Berlin Tauentzienstraße 8" },
    { id: "x-kpop", title: "Seoulstation – חנות קיי-פופ", icon: "💜", notes: ["ב׳–שבת 13:00–19:00 · סגור בראשון", "כ-15 דק' מהמלון באוטובוס M49 / X34", "באותו רחוב: J-Store – אנימה, מנגה וממתקים מיפן"], maps: "Seoulstation Berlin Kantstraße 103" },
    { id: "x-technik", title: "מוזיאון הטכנולוגיה", icon: "✈️", notes: ["סגור בשני", "עד גיל 18 – חינם", "כ-20 דק' מהמלון ב-U1 / U3"], maps: "Deutsches Technikmuseum Trebbiner Straße 9 Berlin" },
    { id: "x-katzen", title: "Katzentempel – קפה חתולים", icon: "🐈", notes: ["כ-20 דק' מהמלון (S-Bahn עד Friedrichstraße)", "כדאי להזמין מקום מראש"], maps: "Katzentempel Berlin Mitte Friedrichstraße 153" },
    { id: "x-2d", title: "2D Cafe Always Together – קפה קומיקס", icon: "✏️", notes: ["כ-5 דק' הליכה מהמלון"], maps: "2D Cafe Always Together Marburger Str. 17 Berlin" },
    { id: "x-elbenwald", title: "Elbenwald – מרצ'נדייז של פנטזיה ומשחקים", icon: "🧙", notes: ["🎁 לקנות מתנה לכפיר!", "בקניון Alexa, ליד שוק חג המולד באלכסנדרפלאץ"], maps: "Elbenwald ALEXA Grunerstraße 20 Berlin" },
    { id: "x-sushi", title: "Secret Garden – סושי טבעוני", icon: "🍣", notes: ["10 דק' הליכה מחומת ברלין (איסט סייד גלרי)", "ליד שוק ימי הביניים ב-RAW"], maps: "Secret Garden Vegan Sushi Warschauer Straße 33 Berlin" }
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
