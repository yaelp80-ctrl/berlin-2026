// איורים קטנים בסגנון האייקון: לילה כחול, אורות חמים, שלג
const C = { navy: "#0A2B63", blue: "#1E5AA8", snow: "#EAF4FF", gold: "#FFD36E", amber: "#FDB447",
  red: "#E24C4B", wood: "#8A5233", woodD: "#6B3E26", green: "#2F8F5B", greenL: "#46B174", cream: "#F6E3C0", pink: "#FF8FB1" };

const snowGround = `<path d="M0 82 Q30 74 60 80 T120 78 V90 H0Z" fill="${C.snow}"/>`;
const flakes = `<g fill="${C.snow}" opacity=".8"><circle cx="12" cy="14" r="1.6"/><circle cx="104" cy="10" r="1.3"/><circle cx="92" cy="30" r="1"/><circle cx="24" cy="38" r="1.1"/><circle cx="60" cy="8" r="1.2"/></g>`;
const wrap = inner => `<svg viewBox="0 0 120 90" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${flakes}${inner}</svg>`;

window.ART = {
  plane: wrap(`
    <path d="M14 70 Q40 58 70 62" stroke="${C.snow}" stroke-width="2" stroke-dasharray="3 4" fill="none" opacity=".6"/>
    <g transform="translate(58 30) rotate(-12)">
      <ellipse cx="22" cy="12" rx="26" ry="8" fill="${C.snow}"/>
      <path d="M14 12 L4 -6 L12 -6 L28 10Z" fill="${C.red}"/>
      <path d="M16 14 L6 30 L14 30 L30 16Z" fill="${C.blue}"/>
      <path d="M-2 10 L-6 0 L2 0 L6 9Z" fill="${C.red}"/>
      <g fill="${C.blue}"><circle cx="28" cy="10" r="1.8"/><circle cx="34" cy="10" r="1.8"/><circle cx="40" cy="10" r="1.8"/></g>
    </g>
    <g transform="translate(14 46)"><rect x="0" y="4" width="4" height="34" fill="#C9D3DF"/><circle cx="2" cy="6" r="7" fill="#C9D3DF"/><rect x="-3" y="-14" width="10" height="14" rx="2" fill="${C.red}"/><circle cx="2" cy="6" r="3" fill="${C.gold}"/></g>
    ${snowGround}`),

  penguin: wrap(`
    <g transform="translate(40 18)">
      <ellipse cx="20" cy="38" rx="20" ry="26" fill="#1B2440"/>
      <ellipse cx="20" cy="42" rx="13" ry="19" fill="${C.snow}"/>
      <circle cx="14" cy="24" r="3" fill="#fff"/><circle cx="26" cy="24" r="3" fill="#fff"/>
      <circle cx="14.5" cy="24.5" r="1.6" fill="#1B2440"/><circle cx="25.5" cy="24.5" r="1.6" fill="#1B2440"/>
      <path d="M17 29 L23 29 L20 33Z" fill="${C.amber}"/>
      <path d="M2 12 Q20 -6 38 12 L36 16 Q20 4 4 16Z" fill="${C.red}"/><circle cx="20" cy="0" r="4" fill="${C.snow}"/>
      <path d="M4 30 Q20 38 36 30 L36 34 Q20 42 4 34Z" fill="${C.green}"/>
      <ellipse cx="12" cy="63" rx="6" ry="3" fill="${C.amber}"/><ellipse cx="28" cy="63" rx="6" ry="3" fill="${C.amber}"/>
    </g>${snowGround}`),

  spray: wrap(`
    <g transform="translate(18 40)">
      <rect width="84" height="38" rx="4" fill="#9AA9BC"/>
      <path d="M6 28 Q16 6 28 22 T50 18 T78 24" stroke="${C.pink}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M8 12 Q22 2 34 12" stroke="${C.gold}" stroke-width="4" fill="none" stroke-linecap="round"/>
      <circle cx="64" cy="10" r="5" fill="${C.greenL}"/>
    </g>
    <g transform="translate(76 8) rotate(18)">
      <rect x="0" y="10" width="16" height="30" rx="5" fill="${C.red}"/><rect x="3" y="4" width="10" height="7" rx="2" fill="#C9D3DF"/>
      <rect x="0" y="20" width="16" height="6" fill="${C.snow}" opacity=".8"/>
      <g fill="${C.pink}"><circle cx="-6" cy="4" r="1.6"/><circle cx="-10" cy="0" r="1.2"/><circle cx="-12" cy="7" r="1.3"/></g>
    </g>`),

  palace: wrap(`
    <g transform="translate(14 34)">
      <rect x="6" y="18" width="80" height="30" fill="${C.cream}"/>
      <path d="M0 20 L46 2 L92 20Z" fill="${C.snow}"/>
      <ellipse cx="46" cy="14" rx="14" ry="10" fill="${C.greenL}"/><rect x="44" y="0" width="4" height="6" fill="${C.gold}"/>
      <g fill="${C.gold}">${[14,26,38,54,66,78].map(x=>`<rect x="${x}" y="26" width="6" height="10" rx="3"/>`).join("")}</g>
      <rect x="40" y="32" width="12" height="16" rx="6" fill="${C.woodD}"/>
    </g>${snowGround}`),

  dino: wrap(`
    <g transform="translate(16 18)" fill="#E8DCC4" stroke="#C7B595" stroke-width="1.2">
      <path d="M10 46 Q30 20 52 34 Q64 10 80 8 Q92 6 90 16 Q84 18 78 18 Q70 26 68 40 Q66 54 50 54 L46 64 L40 64 L42 54 L28 54 L24 64 L18 64 L20 52 Q8 54 0 60 Q4 50 10 46Z"/>
      <circle cx="84" cy="12" r="1.5" fill="#1B2440" stroke="none"/>
      <path d="M30 38 L30 50 M38 36 L38 50 M46 36 L46 50" stroke="#C7B595"/>
    </g>
    <path d="M82 22 L86 14 L92 22Z" fill="${C.red}"/><circle cx="87" cy="12" r="2.5" fill="${C.snow}"/>
    ${snowGround}`),

  wall: wrap(`
    <g transform="translate(6 30)">
      <rect width="108" height="48" fill="#A9B6C6"/>
      ${[0,27,54,81].map(x=>`<rect x="${x}" y="0" width="1.5" height="48" fill="#8D9AAA"/>`).join("")}
      <rect x="0" y="-6" width="108" height="8" rx="4" fill="#C3CEDA"/>
      <path d="M8 36 Q20 8 34 30 T60 24" stroke="${C.red}" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M58 16 L72 40 L86 14 L98 38" stroke="${C.gold}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="26" cy="12" r="5" fill="${C.greenL}"/><circle cx="90" cy="8" r="4" fill="${C.pink}"/>
    </g>${snowGround}`),

  palm: wrap(`
    <circle cx="96" cy="20" r="10" fill="${C.gold}"/>
    <path d="M0 70 Q30 62 60 70 T120 68 V90 H0Z" fill="#3FA9D6"/>
    <path d="M0 78 Q30 72 60 78 T120 76" stroke="#8ED6F2" stroke-width="2" fill="none"/>
    <g transform="translate(40 16)">
      <path d="M12 58 Q10 30 16 10" stroke="${C.wood}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M16 10 Q0 0 -10 12 Q4 6 16 12Z M16 10 Q32 -2 44 10 Q30 6 16 12Z M16 10 Q8 -10 22 -14 Q16 -2 18 10Z M16 10 Q30 8 36 24 Q26 14 16 12Z M16 10 Q2 12 -2 26 Q8 14 16 12Z" fill="${C.greenL}"/>
    </g>`),

  suitcase: wrap(`
    <g transform="translate(36 22)">
      <rect x="16" y="0" width="16" height="10" rx="4" fill="none" stroke="${C.woodD}" stroke-width="4"/>
      <rect x="0" y="8" width="48" height="48" rx="8" fill="${C.red}"/>
      <rect x="10" y="8" width="5" height="48" fill="${C.cream}"/><rect x="33" y="8" width="5" height="48" fill="${C.cream}"/>
      <circle cx="10" cy="60" r="4" fill="#333"/><circle cx="38" cy="60" r="4" fill="#333"/>
      <rect x="18" y="26" width="12" height="9" rx="2" fill="${C.gold}"/>
    </g>${snowGround}`),

  tree: wrap(`
    <g transform="translate(42 10)">
      <path d="M18 0 L36 30 L28 30 L40 52 L-4 52 L8 30 L0 30Z" fill="${C.green}"/>
      <path d="M18 0 L23 9 L13 9Z" fill="${C.snow}"/>
      <g fill="${C.gold}"><circle cx="12" cy="24" r="2.5"/><circle cx="24" cy="36" r="2.5"/><circle cx="8" cy="44" r="2.5"/><circle cx="30" cy="46" r="2.5"/></g>
      <g fill="${C.red}"><circle cx="20" cy="20" r="2.2"/><circle cx="14" cy="38" r="2.2"/></g>
      <rect x="14" y="52" width="8" height="8" fill="${C.woodD}"/>
    </g>${snowGround}`),

  snake: wrap(`
    <g transform="translate(18 26)">
      <path d="M4 44 Q20 20 40 40 T76 36" stroke="${C.greenL}" stroke-width="14" fill="none" stroke-linecap="round"/>
      <path d="M4 44 Q20 20 40 40 T76 36" stroke="${C.gold}" stroke-width="3" stroke-dasharray="2 8" fill="none" stroke-linecap="round"/>
      <circle cx="80" cy="32" r="11" fill="${C.greenL}"/>
      <circle cx="78" cy="29" r="3" fill="#fff"/><circle cx="85" cy="29" r="3" fill="#fff"/>
      <circle cx="78.5" cy="29.5" r="1.6" fill="#1B2440"/><circle cx="85.5" cy="29.5" r="1.6" fill="#1B2440"/>
      <path d="M90 36 L97 36 L100 33 M97 36 L100 39" stroke="${C.red}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <path d="M70 24 Q80 2 92 22 Z" fill="${C.red}"/><circle cx="82" cy="8" r="3.5" fill="${C.snow}"/>
      <rect x="70" y="20" width="22" height="5" rx="2.5" fill="${C.snow}"/>
    </g>`),

  backpack: wrap(`
    <g transform="translate(38 16)">
      <path d="M14 6 Q22 -4 30 6" stroke="${C.woodD}" stroke-width="4" fill="none"/>
      <rect x="0" y="6" width="44" height="56" rx="14" fill="${C.blue}"/>
      <rect x="8" y="34" width="28" height="20" rx="6" fill="#3F7FD0"/>
      <rect x="18" y="38" width="8" height="3" rx="1.5" fill="${C.gold}"/>
      <path d="M0 20 Q22 30 44 20" stroke="${C.snow}" stroke-width="3" fill="none"/>
    </g>${snowGround}`)
};
