/* Bug Maze sounds: all made in the browser with Web Audio, no files. */
(function (BM) {
  'use strict';
  let A = null, musicTimer = null, beat = 0;
  const ctx = () => {
    try { A = A || new AudioContext(); if (A.state === 'suspended') A.resume(); } catch (e) { A = null; }
    return A;
  };
  function tone(f1, f2, dur, type, vol, delay = 0) {
    const a = ctx(); if (!a) return;
    const t = a.currentTime + delay, o = a.createOscillator(), g = a.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f1, t);
    o.frequency.exponentialRampToValueAtTime(f2, t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(a.destination);
    o.start(t); o.stop(t + dur + 0.02);
  }
  const SFX = {
    tap: () => tone(660, 330, 0.1, 'sine', 0.15),
    wrong: () => tone(220, 140, 0.15, 'sine', 0.15),
    step: () => tone(150, 110, 0.06, 'triangle', 0.12),
    bump: () => { tone(120, 50, 0.18, 'sine', 0.4); tone(80, 40, 0.12, 'triangle', 0.2); },
    leaf: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, f * 1.01, 0.18, 'triangle', 0.18, i * 0.09)),
    buddy: () => [784, 988, 1175, 988, 1319].forEach((f, i) => tone(f, f * 1.05, 0.12, 'square', 0.06, i * 0.07)),
    flower: () => [659, 831, 988, 1319].forEach((f, i) => tone(f, f, 0.3, 'sine', 0.1, i * 0.05)),
    soft: () => tone(520, 380, 0.07, 'sine', 0.08),
    yay: () => {
      // A real "Yay!" where the browser can speak; a cheerful whoop otherwise.
      try {
        const u = new SpeechSynthesisUtterance('Yay!');
        u.pitch = 1.8; u.rate = 1.1; u.volume = 0.9;
        speechSynthesis.speak(u);
      } catch (e) { tone(500, 900, 0.3, 'triangle', 0.15); }
    },
    star: () => [1047, 1319, 1568, 2093].forEach((f, i) => tone(f, f, 0.15, 'sine', 0.12, i * 0.06)),
  };
  BM.Sound = { play: (name) => SFX[name] && SFX[name]() };

  // Simple, bouncy loop in C major: melody on eighths, bass on the beat.
  const MEL = [523, 659, 784, 659, 698, 880, 784, 0, 659, 784, 1047, 784, 698, 587, 523, 0];
  const BASS = [131, 0, 196, 0, 175, 0, 196, 0, 131, 0, 196, 0, 147, 0, 131, 0];
  function tick() {
    const i = beat++ % MEL.length;
    if (MEL[i]) tone(MEL[i], MEL[i], 0.16, 'triangle', 0.05);
    if (BASS[i]) tone(BASS[i], BASS[i], 0.22, 'sine', 0.09);
  }
  BM.Music = {
    on: () => !!musicTimer,
    start() { if (!musicTimer && ctx()) musicTimer = setInterval(tick, 190); },
    stop() { clearInterval(musicTimer); musicTimer = null; },
  };
})(window.BugMaze = window.BugMaze || {});
