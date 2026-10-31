/* Bug Buddies: 10 hidden friends, drawn in the ladybug's style
   (thick dark outline, soft radial shading, big eyes, white shine). */
(function (BM) {
  'use strict';
  const O = 'stroke="#2b2b2b" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"';
  const g = (id, a, b, c) => `<radialGradient id="${id}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></radialGradient>`;
  const eyes = (x1, x2, y, r = 8) => `<circle cx="${x1}" cy="${y}" r="${r}" fill="#fff"/><circle cx="${x2}" cy="${y}" r="${r}" fill="#fff"/><circle cx="${x1 + 1}" cy="${y + 1}" r="${r / 2}" fill="#2b2b2b"/><circle cx="${x2 + 1}" cy="${y + 1}" r="${r / 2}" fill="#2b2b2b"/>`;
  const shine = (x, y, rx, ry, a = -30) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" opacity=".5" transform="rotate(${a} ${x} ${y})"/>`;
  const svg = (id, defs, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs>${defs.replace(/id="/g, `id="${id}-`)}</defs>${body.replace(/url\(#/g, `url(#${id}-`)}</svg>`;

  const LIST = [
    ['snail', 'Sammy the Snail', g('a', '#ffe0a8', '#f2b25c', '#a8661a') + g('b', '#d6f7a0', '#9ad65f', '#5a9a2c'),
      `<g ${O}><path d="M30 160 H170 Q182 160 176 146 L150 120 Q140 150 100 150 H44 Q24 150 30 160Z" fill="url(#b)"/><path d="M150 120 V80 M168 120 V86" fill="none"/><circle cx="150" cy="78" r="6" fill="#2b2b2b"/><circle cx="168" cy="84" r="6" fill="#2b2b2b"/><circle cx="96" cy="104" r="50" fill="url(#a)"/><path d="M96 104 m0 -10 a10 10 0 1 1 -10 10 a20 20 0 1 1 20 20 a30 30 0 1 1 -30 -30" fill="none" stroke-width="5"/></g>${eyes(150, 166, 130, 7)}${shine(74, 76, 12, 6)}`],
    ['bee', 'Bea the Bee', g('a', '#fff3a0', '#ffd23f', '#d99a00') + g('w', '#ffffff', '#e8f6ff', '#b8dcf2'),
      `<g ${O}><ellipse cx="72" cy="62" rx="26" ry="36" fill="url(#w)" opacity=".9" transform="rotate(-25 72 62)"/><ellipse cx="128" cy="62" rx="26" ry="36" fill="url(#w)" opacity=".9" transform="rotate(25 128 62)"/><ellipse cx="100" cy="120" rx="62" ry="50" fill="url(#a)"/><path d="M76 76 Q70 120 76 166 M112 72 Q120 120 112 168" fill="none" stroke-width="14"/><path d="M162 120 L184 120" fill="none"/></g>${eyes(54, 76, 112)}${shine(66, 90, 14, 7)}`],
    ['firefly', 'Flick the Firefly', g('a', '#8a8aa8', '#4a4a6a', '#1e1e32') + g('l', '#ffffd0', '#ffef5a', '#e0b800'),
      `<circle cx="100" cy="150" r="46" fill="#fff36b" opacity=".35"/><g ${O}><path d="M84 40 Q74 18 62 20 M116 40 Q126 18 138 20" fill="none"/><ellipse cx="100" cy="150" rx="34" ry="30" fill="url(#l)"/><ellipse cx="100" cy="100" rx="44" ry="50" fill="url(#a)"/><circle cx="100" cy="56" r="26" fill="#ff8a5c"/></g>${eyes(90, 110, 54, 7)}${shine(82, 86, 12, 6)}`],
    ['caterpillar', 'Cody the Caterpillar', g('a', '#d6f7a0', '#7cd04a', '#3c8a1a'),
      `<g ${O}>${[30, 62, 94, 126].map((x) => `<circle cx="${x}" cy="130" r="24" fill="url(#a)"/>`).join('')}<path d="M152 72 L144 46 M172 74 L180 48" fill="none"/><circle cx="160" cy="104" r="34" fill="url(#a)"/></g>${eyes(150, 172, 98)}<path d="M150 120 Q161 128 172 120" fill="none" ${O} stroke-width="4"/>${shine(146, 86, 10, 5)}`],
    ['butterfly', 'Bella the Butterfly', g('a', '#ffd0ec', '#ff7aa8', '#c23a72') + g('b', '#c8e8ff', '#6ec6ff', '#2a7ec2'),
      `<g ${O}><path d="M100 96 C60 20 10 40 26 90 C34 112 70 108 100 100Z" fill="url(#a)"/><path d="M100 96 C140 20 190 40 174 90 C166 112 130 108 100 100Z" fill="url(#a)"/><path d="M100 104 C70 110 40 150 70 166 C90 174 98 140 100 108Z" fill="url(#b)"/><path d="M100 104 C130 110 160 150 130 166 C110 174 102 140 100 108Z" fill="url(#b)"/><path d="M92 46 Q82 22 70 22 M108 46 Q118 22 130 22" fill="none"/><ellipse cx="100" cy="110" rx="12" ry="56" fill="#3a3a4a"/></g><circle cx="58" cy="70" r="9" fill="#fff" opacity=".7"/><circle cx="142" cy="70" r="9" fill="#fff" opacity=".7"/>${eyes(94, 106, 66, 5)}`],
    ['ant', 'Andy the Ant', g('a', '#c2724a', '#8a3f1e', '#4a1e0c'),
      `<g ${O}><path d="M70 120 L44 150 M100 120 V160 M130 120 L156 150 M84 50 Q70 24 56 26 M116 50 Q130 24 144 26" fill="none"/><circle cx="56" cy="26" r="6" fill="#2b2b2b"/><circle cx="144" cy="26" r="6" fill="#2b2b2b"/><ellipse cx="100" cy="150" rx="40" ry="34" fill="url(#a)"/><circle cx="100" cy="110" r="22" fill="url(#a)"/><circle cx="100" cy="68" r="34" fill="url(#a)"/></g>${eyes(88, 112, 64)}${shine(84, 136, 12, 6)}`],
    ['grasshopper', 'Gus the Grasshopper', g('a', '#e4ffb0', '#a6e05a', '#5a9a1c'),
      `<g ${O}><path d="M96 130 L130 80 L170 160 M70 140 L56 172 M110 140 L118 172 M40 92 Q24 50 40 30 M56 86 Q50 44 70 26" fill="none"/><path d="M48 120 Q48 92 82 96 L170 112 Q182 128 160 138 L80 146 Q48 146 48 120Z" fill="url(#a)"/><circle cx="56" cy="100" r="28" fill="url(#a)"/></g>${eyes(48, 66, 94)}${shine(110, 114, 22, 5, 5)}`],
    ['dragonfly', 'Dot the Dragonfly', g('a', '#a8f0ff', '#3cc6e0', '#16788a') + g('w', '#ffffff', '#e0f8ff', '#a8e0f0'),
      `<g ${O}><ellipse cx="62" cy="70" rx="48" ry="16" fill="url(#w)" opacity=".85" transform="rotate(-15 62 70)"/><ellipse cx="138" cy="70" rx="48" ry="16" fill="url(#w)" opacity=".85" transform="rotate(15 138 70)"/><ellipse cx="66" cy="104" rx="42" ry="14" fill="url(#w)" opacity=".85" transform="rotate(12 66 104)"/><ellipse cx="134" cy="104" rx="42" ry="14" fill="url(#w)" opacity=".85" transform="rotate(-12 134 104)"/><rect x="90" y="70" width="20" height="116" rx="10" fill="url(#a)"/><circle cx="100" cy="54" r="26" fill="url(#a)"/></g>${eyes(88, 112, 50, 10)}`],
    ['rolypoly', 'Rolo the Roly-Poly', g('a', '#c8ccd8', '#8a90a6', '#4a4e62'),
      `<g ${O}><path d="M60 156 L52 172 M84 162 L80 178 M116 162 L120 178 M140 156 L148 172 M44 120 Q24 108 22 92 M52 108 Q40 84 46 70" fill="none"/><path d="M30 140 Q30 60 110 60 Q176 60 176 140Z" fill="url(#a)"/><path d="M62 70 Q74 104 70 140 M94 62 Q102 100 100 140 M126 62 Q130 100 130 140 M154 74 Q158 108 156 140" fill="none" stroke-width="4"/></g>${eyes(48, 66, 116, 7)}${shine(92, 80, 18, 7, -10)}`],
    ['moth', 'Milo the Moth', g('a', '#fff4dc', '#e8cfa0', '#a8885a') + g('b', '#d8c0ff', '#a07ae0', '#5a3a9a'),
      `<g ${O}><path d="M100 90 C60 40 14 60 22 110 C30 140 76 130 100 110Z" fill="url(#b)"/><path d="M100 90 C140 40 186 60 178 110 C170 140 124 130 100 110Z" fill="url(#b)"/><path d="M88 48 Q60 20 52 36 Q70 40 88 56 M112 48 Q140 20 148 36 Q130 40 112 56" fill="none"/><ellipse cx="100" cy="112" rx="26" ry="58" fill="url(#a)"/><path d="M80 132 H120 M82 152 H118" fill="none" stroke-width="4"/></g><circle cx="56" cy="96" r="12" fill="#fff" opacity=".6"/><circle cx="144" cy="96" r="12" fill="#fff" opacity=".6"/>${eyes(90, 110, 80, 8)}`],
  ];

  BM.Buddies = LIST.map(([id, name, defs, body]) => ({ id, name, svg: svg(id, defs, body) }));
})(window.BugMaze = window.BugMaze || {});
