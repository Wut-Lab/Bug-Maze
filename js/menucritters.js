/* Main menu critters: colorful ladybugs wander the grass, and found Bug Buddies
   and Flowers pop up here and there. Tap one and it wiggles. */
(function (BM) {
  'use strict';
  const COLORS = [
    ['#ff7a5c', '#e8402f', '#9e1f14'], ['#7ab8ff', '#2f7de8', '#14449e'], ['#fff27a', '#f2c81f', '#a8820a'],
    ['#ffb3d6', '#ff6fae', '#b8336f'], ['#ffb066', '#f57c1f', '#a84a0a'], ['#c99bff', '#8e4fe0', '#53209e'],
  ];
  const rnd = (a, b) => a + Math.random() * (b - a);
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  let M, bugs = [], items = [], wantBugs = 1, wantItems = 2, seq = 0, last = 0;

  const svgEl = (html) => new DOMParser().parseFromString(html, 'image/svg+xml').documentElement;

  function makeBug() {
    const k = 'mb' + seq++, c = COLORS[Math.random() * COLORS.length | 0];
    let html = document.getElementById('bug').outerHTML.replace(/ id="bug"/, '').replace(/ style="[^"]*"/, '').replace(/url\(#sh\)/g, `url(#${k})`);
    html = html.replace('>', `><defs><radialGradient id="${k}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="${c[0]}"/><stop offset=".55" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></radialGradient></defs>`);
    const el = svgEl(html.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" '));
    el.setAttribute('class', 'critter mb walk');
    el.setAttribute('width', 54); el.setAttribute('height', 54);
    const W = M.clientWidth, H = M.clientHeight, side = Math.random() < 0.5;
    const b = { el, bug: true, x: side ? -40 : W + 40, y: rnd(40, H - 40), ang: 0, pause: 0, leaving: false };
    target(b);
    M.appendChild(el);
    bugs.push(b);
  }
  function target(b) { b.tx = rnd(30, M.clientWidth - 30); b.ty = rnd(30, M.clientHeight - 30); }

  function makeItem() {
    const D = BM.data, pool = [
      ...BM.Buddies.filter((q) => (D.buddies || {})[q.id]),
      ...BM.Flowers.filter((q) => (D.flowers || {})[q.id]),
    ];
    if (!pool.length) return;
    const q = pool[Math.random() * pool.length | 0];
    const el = svgEl(BM.uid(q.svg, 'mi' + seq++));
    el.setAttribute('class', 'critter mi');
    el.setAttribute('width', 62); el.setAttribute('height', 62);
    const it = { el, x: rnd(40, M.clientWidth - 40), y: rnd(50, M.clientHeight - 40), until: performance.now() + rnd(7000, 12000) };
    el.style.left = it.x - 31 + 'px'; el.style.top = it.y - 31 + 'px';
    M.appendChild(el);
    items.push(it);
  }

  function wiggle(c) {
    BM.Sound.play('soft');
    c.el.classList.remove('wig'); void c.el.getBoundingClientRect(); c.el.classList.add('wig');
    if (c.bug) { c.pause = performance.now() + 500; c.el.classList.remove('walk'); }
  }

  function frame(t) {
    requestAnimationFrame(frame);
    if (!M.clientWidth) return;
    if (t - last > 10000) { last = t; wantBugs = 1 + (Math.random() < 0.5); wantItems = 2 + (Math.random() * 3 | 0); }
    const live = bugs.filter((b) => !b.leaving);
    if (live.length < wantBugs) makeBug();
    if (live.length > wantBugs) { const b = live[0]; b.leaving = true; b.tx = b.x < M.clientWidth / 2 ? -60 : M.clientWidth + 60; b.ty = b.y; }
    if (items.length < wantItems && Math.random() < 0.02) makeItem();
    items = items.filter((it) => { if (t < it.until) return true; it.el.classList.add('bye'); setTimeout(() => it.el.remove(), 400); return false; });

    bugs = bugs.filter((b) => {
      if (t < b.pause) return true;
      b.el.classList.add('walk');
      const dx = b.tx - b.x, dy = b.ty - b.y, L = Math.hypot(dx, dy), v = reduced() ? 0.6 : 1.6;
      if (L < 4) { if (b.leaving) { b.el.remove(); return false; } target(b); return true; }
      b.x += dx / L * Math.min(v, L); b.y += dy / L * Math.min(v, L);
      b.ang = Math.atan2(dx, -dy) * 180 / Math.PI;
      b.el.style.transform = `translate(${b.x - 27}px,${b.y - 27}px) rotate(${b.ang}deg)`;
      return true;
    });
  }

  BM.MenuCritters = {
    start(menu) {
      M = menu;
      M.addEventListener('pointerdown', (e) => {
        const c = [...bugs, ...items].find((q) => q.el === e.target.closest('.critter'));
        if (c) wiggle(c);
      });
      requestAnimationFrame(frame);
    },
  };
})(window.BugMaze = window.BugMaze || {});
