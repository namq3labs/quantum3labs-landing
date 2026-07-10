/* ═══════════════════════════════════════════════════════════
   art.js — deterministic generative placeholder art
   (real imagery will replace these; content TBD)
   ═══════════════════════════════════════════════════════════ */

(function () {
  const BRAND = '#4D58FF';

  // deterministic PRNG so art is stable between reloads
  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const PALETTES = [
    ['#0a0b12', BRAND, '#8f96ff', '#fcfcfa'],
    ['#e9eaf5', BRAND, '#111214', '#c3c8ff'],
    ['#10122b', '#8f96ff', BRAND, '#e9eaf5'],
    ['#fcfcfa', BRAND, '#111214', '#c3c8ff'],
  ];

  function drawArt(canvas, seed, mode) {
    const rnd = mulberry32(seed * 7919 + 13);
    const w = canvas.width = 640;
    const h = canvas.height = mode === 'product' ? 853 : 480;
    const ctx = canvas.getContext('2d');
    const pal = PALETTES[seed % PALETTES.length];

    // background
    ctx.fillStyle = pal[0];
    ctx.fillRect(0, 0, w, h);

    // soft radial glow
    const gx = w * (0.3 + rnd() * 0.4), gy = h * (0.3 + rnd() * 0.4);
    const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, w * 0.7);
    g.addColorStop(0, pal[1] + 'cc');
    g.addColorStop(1, pal[0] + '00');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // orbiting rings
    ctx.strokeStyle = pal[3];
    ctx.lineWidth = 1;
    const rings = 3 + Math.floor(rnd() * 4);
    for (let i = 0; i < rings; i++) {
      ctx.globalAlpha = 0.25 + rnd() * 0.4;
      ctx.beginPath();
      ctx.ellipse(
        w * (0.2 + rnd() * 0.6), h * (0.2 + rnd() * 0.6),
        30 + rnd() * w * 0.35, 12 + rnd() * h * 0.22,
        rnd() * Math.PI, 0, Math.PI * 2
      );
      ctx.stroke();
    }

    // scattered squares (brand motif)
    ctx.globalAlpha = 1;
    const squares = 6 + Math.floor(rnd() * 10);
    for (let i = 0; i < squares; i++) {
      const s = 3 + rnd() * 10;
      ctx.fillStyle = rnd() > 0.5 ? pal[1] : pal[2];
      ctx.globalAlpha = 0.5 + rnd() * 0.5;
      ctx.fillRect(rnd() * w, rnd() * h, s, s);
    }

    // wave lines
    ctx.globalAlpha = 0.6;
    ctx.strokeStyle = pal[2];
    const waves = 2 + Math.floor(rnd() * 3);
    for (let i = 0; i < waves; i++) {
      ctx.beginPath();
      const yBase = rnd() * h;
      const amp = 8 + rnd() * 34;
      const freq = 0.008 + rnd() * 0.02;
      for (let x = 0; x <= w; x += 4) {
        const y = yBase + Math.sin(x * freq + rnd() * 6) * amp;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // grid ticks along bottom
    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = pal[3];
    for (let x = 20; x < w - 20; x += 24) {
      ctx.beginPath();
      ctx.moveTo(x, h - 18);
      ctx.lineTo(x, h - 18 - (rnd() > 0.7 ? 10 : 5));
      ctx.stroke();
    }

    // corner brackets
    ctx.globalAlpha = 0.9;
    ctx.strokeStyle = pal[3];
    const b = 14, m = 16;
    [[m, m, 1, 1], [w - m, m, -1, 1], [m, h - m, 1, -1], [w - m, h - m, -1, -1]].forEach(([x, y, dx, dy]) => {
      ctx.beginPath();
      ctx.moveTo(x + b * dx, y);
      ctx.lineTo(x, y);
      ctx.lineTo(x, y + b * dy);
      ctx.stroke();
    });

    ctx.globalAlpha = 1;
  }

  window.Q3Art = { drawArt };
})();
