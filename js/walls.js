/* Maze wall styles. Every style draws on the same wall lines, so collision is unchanged. */
(function (BM) {
  'use strict';
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[Math.random() * arr.length | 0];

  // Calls fn(px, py, nx, ny) every `gap` pixels along each segment (n = unit normal).
  function along(segs, gap, fn) {
    segs.forEach(([x1, y1, x2, y2]) => {
      const len = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / len, uy = (y2 - y1) / len;
      for (let d = 0; d <= len; d += gap) fn(x1 + ux * d, y1 + uy * d, -uy, ux);
    });
  }
  function stroke(x, segs, color, width, cap = 'round') {
    x.strokeStyle = color; x.lineWidth = width; x.lineCap = cap;
    x.beginPath();
    segs.forEach(([a, b, c, d]) => { x.moveTo(a, b); x.lineTo(c, d); });
    x.stroke();
  }
  const dot = (x, px, py, r, color) => { x.fillStyle = color; x.beginPath(); x.arc(px, py, r, 0, 7); x.fill(); };

  const STYLES = {
    solid(x, segs, lw) { stroke(x, segs, '#2f6b1f', lw); },

    hedge(x, segs, lw) {
      stroke(x, segs, '#2f6b1f', lw);
      along(segs, lw * 0.3, (px, py, nx, ny) => {
        const o = rnd(-0.3, 0.3) * lw;
        dot(x, px + nx * o, py + ny * o, lw * rnd(0.25, 0.42), pick(['#3c8a26', '#4fa32f', '#2f7a1c', '#5cb83a']));
        if (Math.random() < 0.05) {
          const s = Math.random() < 0.5 ? 1 : -1;
          x.strokeStyle = '#7a4a1e'; x.lineWidth = Math.max(2, lw * 0.12); x.lineCap = 'round';
          x.beginPath(); x.moveTo(px, py); x.lineTo(px + nx * s * lw * 0.75, py + ny * s * lw * 0.75); x.stroke();
        }
      });
    },

    rose(x, segs, lw) {
      stroke(x, segs, '#5a3a1e', lw * 0.55);
      let side = 1;
      along(segs, lw * 0.5, (px, py, nx, ny) => {
        side = -side;
        x.fillStyle = '#5a3a1e';
        x.beginPath();
        x.moveTo(px - ny * lw * 0.12, py + nx * lw * 0.12);
        x.lineTo(px + ny * lw * 0.12, py - nx * lw * 0.12);
        x.lineTo(px + nx * side * lw * 0.5, py + ny * side * lw * 0.5);
        x.fill();
        if (Math.random() < 0.5) dot(x, px - nx * side * lw * 0.3, py - ny * side * lw * 0.3, lw * 0.22, pick(['#3c8a26', '#4fa32f']));
      });
      along(segs, lw * 1.6, (px, py) => {
        if (Math.random() < 0.45) return;
        const c = pick(['#e8302a', '#ff7aa8', '#ffd23f']);
        for (let i = 0; i < 5; i++) {
          const a = i * 1.2566;
          dot(x, px + Math.cos(a) * lw * 0.22, py + Math.sin(a) * lw * 0.22, lw * 0.2, c);
        }
        dot(x, px, py, lw * 0.12, '#fff3a0');
      });
    },

    brick(x, segs, lw) {
      stroke(x, segs, '#e8d8c0', lw * 1.05, 'square');
      const bl = lw * 0.9, h = lw / 2;
      segs.forEach(([x1, y1, x2, y2]) => {
        const len = Math.hypot(x2 - x1, y2 - y1);
        x.save();
        x.translate(x1, y1);
        x.rotate(Math.atan2(y2 - y1, x2 - x1));
        [0, 1].forEach((row) => {
          for (let d = -h - (row ? bl / 2 : 0); d < len + h; d += bl) {
            const s = Math.max(d, -h), e = Math.min(d + bl, len + h);
            x.fillStyle = pick(['#b5532f', '#c4623a', '#a84a28', '#bf5a34']);
            x.fillRect(s + 1, -h + row * h + 1, e - s - 2, h - 2);
          }
        });
        x.restore();
      });
    },

    stream(x, segs, lw) {
      stroke(x, segs, '#1f6aa8', lw * 1.1);
      stroke(x, segs, '#4fb0f0', lw * 0.75);
      x.setLineDash([lw * 0.35, lw * 0.9]);
      x.lineDashOffset = rnd(0, lw);
      stroke(x, segs, 'rgba(255,255,255,.75)', Math.max(2, lw * 0.1));
      x.setLineDash([]);
    },
  };

  BM.Walls = {
    styles: Object.keys(STYLES),
    draw(x, segs, lw, style) { if (lw > 0) STYLES[style](x, segs, lw); },
  };
})(window.BugMaze = window.BugMaze || {});
