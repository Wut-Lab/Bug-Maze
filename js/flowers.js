/* Flowers: 10 collectible blooms, drawn in the ladybug's style. */
(function (BM) {
  'use strict';
  const O = 'stroke="#2b2b2b" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"';
  const g = (id, a, b, c) => `<radialGradient id="${id}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></radialGradient>`;
  const LEAF = g('lf', '#c6f08a', '#5cbf2e', '#2c7a16');
  const shine = (x, y, rx, ry) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" opacity=".5" transform="rotate(-30 ${x} ${y})"/>`;
  const stem = (x, y, top, s = 1) => `<g ${O}><path d="M${x} ${y} V${top}" fill="none"/><path d="M${x} ${y - 40 * s} q-34 -6 -40 -34 q34 4 40 34Z" fill="url(#lf)"/><path d="M${x} ${y - 60 * s} q30 -4 36 -30 q-30 2 -36 30Z" fill="url(#lf)"/></g>`;

  // Bloom shapes, centered at (x, y), scale s, gradient fill f.
  const rose = (x, y, s, f) => `<g ${O} transform="translate(${x} ${y}) scale(${s})"><path d="M-36 0 C-40 -36 -10 -44 0 -40 C10 -44 40 -36 36 0 C34 30 -34 30 -36 0Z" fill="${f}"/><path d="M-16 -10 C-14 -26 14 -26 14 -8 C12 4 -6 4 -6 -8 C-4 -16 6 -14 4 -8 M-28 8 C-16 22 16 22 28 8" fill="none" stroke-width="4"/></g>`;
  const tulip = (x, y, s, f) => `<g ${O} transform="translate(${x} ${y}) scale(${s})"><path d="M-34 -36 L-14 -18 L0 -44 L14 -18 L34 -36 C38 4 24 30 0 30 C-24 30 -38 4 -34 -36Z" fill="${f}"/><path d="M-14 -18 C-10 6 0 20 0 30 M14 -18 C10 6 0 20 0 30" fill="none" stroke-width="4"/></g>`;
  const marigold = (x, y, s, f) => `<g ${O} transform="translate(${x} ${y}) scale(${s})">${[...Array(10)].map((_, i) => { const a = i * Math.PI / 5; return `<circle cx="${(30 * Math.cos(a)).toFixed(1)}" cy="${(30 * Math.sin(a)).toFixed(1)}" r="15" fill="${f}"/>`; }).join('')}<circle r="26" fill="${f}"/><circle r="12" fill="#c25a00" stroke-width="4"/></g>`;

  const single = (shape, a, b, c) => [g('b', a, b, c) + LEAF, stem(100, 192, 80) + shape(100, 66, 1.3, 'url(#b)') + shine(78, 50, 10, 5)];
  const bouquet = (blooms, wrap) => [
    g('w', ...wrap) + LEAF + blooms.map((q, i) => g('b' + i, ...q[1])).join(''),
    `<g ${O}><path d="M64 96 Q40 70 52 52 M136 96 Q160 70 148 52" fill="none"/><path d="M60 92 q-30 -10 -40 -34 q34 0 40 34Z M140 92 q30 -10 40 -34 q-34 0 -40 34Z" fill="url(#lf)"/></g>` +
      blooms.map((q, i) => q[0](...[[60, 70], [140, 70], [100, 54]][i], 0.85, `url(#b${i})`)).join('') +
      `<g ${O}><path d="M44 96 H156 L112 190 H88Z" fill="url(#w)"/><path d="M78 140 Q100 128 122 140 L100 154Z" fill="#ff7aa8"/></g>` + shine(70, 110, 12, 5),
  ];

  const LIST = [
    ['rose-red', 'Red Rose', single(rose, '#ff8a7a', '#e8302a', '#9e1414')],
    ['rose-pink', 'Pink Rose', single(rose, '#ffd0e4', '#ff7aa8', '#c23a72')],
    ['rose-yellow', 'Yellow Rose', single(rose, '#fff6b0', '#ffd23f', '#d99a00')],
    ['tulip-red', 'Red Tulip', single(tulip, '#ff9a8a', '#f0402f', '#a01e14')],
    ['tulip-purple', 'Purple Tulip', single(tulip, '#e0c8ff', '#9a5ae8', '#5a2aa0')],
    ['tulip-yellow', 'Yellow Tulip', single(tulip, '#fffac0', '#ffe04a', '#d9a400')],
    ['marigold-orange', 'Orange Marigold', single(marigold, '#ffd09a', '#ff9a2a', '#c25a00')],
    ['marigold-gold', 'Gold Marigold', single(marigold, '#fff4b0', '#ffc81f', '#d08a00')],
    ['bouquet-rose', 'Rose Bouquet', bouquet([[rose, ['#ff8a7a', '#e8302a', '#9e1414']], [rose, ['#ffd0e4', '#ff7aa8', '#c23a72']], [rose, ['#fff6b0', '#ffd23f', '#d99a00']]], ['#ffffff', '#e8f6ff', '#9ec8e8'])],
    ['bouquet-spring', 'Spring Bouquet', bouquet([[tulip, ['#e0c8ff', '#9a5ae8', '#5a2aa0']], [tulip, ['#ff9a8a', '#f0402f', '#a01e14']], [marigold, ['#ffd09a', '#ff9a2a', '#c25a00']]], ['#fffaf0', '#ffe8b0', '#d8b070'])],
  ];

  BM.Flowers = LIST.map(([id, name, [defs, body]]) => ({
    id, name,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs>${defs.replace(/id="/g, `id="${id}-`)}</defs>${body.replace(/url\(#/g, `url(#${id}-`)}</svg>`,
  }));
})(window.BugMaze = window.BugMaze || {});
