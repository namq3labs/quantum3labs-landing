/* ═══════════════════════════════════════════════════════════
   main.js — carousels, live clock, mobile menu
   (matches the reference: no load/scroll animations,
    interaction transitions only)
   ═══════════════════════════════════════════════════════════ */

(function () {

  /* ─── data (placeholder content — TBD) ─────────────────── */

  // featured projects — carousel
  const WORK = [
    { title: 'Stormbit',     date: '2025' },
    { title: 'Qash',         date: '2025' },
    { title: 'Prism',        date: '2025' },
    { title: 'Polypay',      date: '2025' },
    { title: 'Pact Network', date: '2025' },
  ];

  // other projects — list rows (titles verbatim from quantum3labs.com)
  const OTHER_PROJECTS = [
    'Brove', 'Solder', 'Scaffold-Stark', 'Scaffold-Stylus', 'scaffold-iCP',
    'Aztec q3x', 'ICP q3x', 'The Marquis', 'Arbuilder', 'iCP coder',
    'stacks-builder',
  ];

  // handles verbatim from quantum3labs.com — "open-source contributions"
  const OSS_DIR = 'public/open-source contributions/';
  const LABS = [
    { title: '@Scaffold-Stark',  tag: 'OPEN SOURCE', img: 'Scaffold-stark.png' },
    { title: '@buidlguidl',      tag: 'OPEN SOURCE', img: 'BuidlGuidl.png' },
    { title: '@themarquis',      tag: 'OPEN SOURCE', img: 'The marquis.png' },
    { title: '@uniswap',         tag: 'OPEN SOURCE', img: 'Uniswap.png' },
    { title: '@foundry',         tag: 'OPEN SOURCE', img: 'Foundry.png' },
    { title: '@polypay',         tag: 'OPEN SOURCE', img: 'Polypay.png' },
    { title: '@humanprotocol',   tag: 'OPEN SOURCE', img: 'Human protocol.png' },
    { title: '@dojo',            tag: 'OPEN SOURCE', img: 'Dojo.png' },
    { title: '@Futaba Labs',     tag: 'OPEN SOURCE', img: 'Futaba labs.png' },
    { title: '@Scaffold-eth',    tag: 'OPEN SOURCE', img: 'Scaffold ETH.png' },
    { title: '@WTFAcademy',      tag: 'OPEN SOURCE', img: 'WTFACADEMY.png' },
    { title: '@scaffold-stylus', tag: 'OPEN SOURCE', img: 'Scaffold Stylus.png' },
    { title: '@solder',          tag: 'OPEN SOURCE', img: 'Solder.png' },
    { title: '@pact-network',    tag: 'OPEN SOURCE', img: 'Pact network.png' },
    { title: '@arbuilder',       tag: 'OPEN SOURCE', img: 'Arbuilder.png' },
    { title: '@Openzeppelin',    tag: 'OPEN SOURCE', img: 'Openzeppelin.png' },
  ];

  /* ─── build carousels ──────────────────────────────────── */

  function buildWorkCards() {
    const track = document.querySelector('#work-carousel [data-carousel-track]');
    WORK.forEach((item, i) => {
      const card = document.createElement('a');
      card.href = '#footer';
      card.className = 'card';
      card.innerHTML = `
        <div class="card_media"><div class="ph"></div></div>
        <div class="card_meta">
          <span class="card_index">[${String(i + 1).padStart(2, '0')}]</span>
          <span>
            <span class="card_title">${item.title}</span>
            <span class="card_date">${item.date}</span>
          </span>
        </div>`;
      track.appendChild(card);
    });
  }

  function buildLabsCards() {
    const track = document.querySelector('#labs-carousel [data-carousel-track]');
    LABS.forEach(item => {
      const card = document.createElement('a');
      card.href = '#footer';
      card.className = 'card';
      const media = item.img
        ? `<img class="product_img" src="${encodeURI(OSS_DIR + item.img)}" alt="${item.title}" loading="lazy" draggable="false" />`
        : '<div class="ph"></div>';
      card.innerHTML = `
        <div class="product_frame">
          <span class="product_plus is-l">+</span>
          ${media}
          <span class="product_plus is-r">+</span>
        </div>
        <div class="product_meta">
          <span class="card_title">${item.title}</span>
          <span class="product_tag">${item.tag}</span>
        </div>`;
      track.appendChild(card);
    });
  }

  function initCarousel(root) {
    const track = root.querySelector('[data-carousel-track]');
    const section = root.closest('.section');
    const prev = section.querySelector('[data-carousel-prev]');
    const next = section.querySelector('[data-carousel-next]');
    const ticksWrap = section.querySelector('[data-carousel-ticks]');
    const cards = [...track.children];

    // tick progress bar
    cards.forEach(() => {
      const tick = document.createElement('span');
      tick.className = 'carousel_tick';
      ticksWrap.appendChild(tick);
    });
    const ticks = [...ticksWrap.children];

    function cardStep() {
      return cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.offsetWidth;
    }
    function updateTicks() {
      const i = Math.min(cards.length - 1, Math.round(track.scrollLeft / cardStep()));
      ticks.forEach((t, k) => t.classList.toggle('is-active', k === i));
    }
    track.addEventListener('scroll', updateTicks, { passive: true });
    updateTicks();

    prev.addEventListener('click', () => track.scrollBy({ left: -cardStep(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: cardStep(), behavior: 'smooth' }));

    // drag to scroll
    let isDown = false, startX = 0, startScroll = 0, moved = false;
    track.addEventListener('pointerdown', e => {
      isDown = true; moved = false;
      startX = e.clientX; startScroll = track.scrollLeft;
      track.classList.add('is-dragging');
    });
    addEventListener('pointermove', e => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 5) moved = true;
      track.scrollLeft = startScroll - dx;
    });
    addEventListener('pointerup', () => {
      isDown = false;
      track.classList.remove('is-dragging');
    });
    // suppress link click after drag
    track.addEventListener('click', e => { if (moved) e.preventDefault(); }, true);
  }

  function buildOtherProjects() {
    const list = document.getElementById('other-projects-list');
    OTHER_PROJECTS.forEach((title, i) => {
      const row = document.createElement('li');
      row.className = 'services_row';
      row.innerHTML = `
        <span class="services_index">[${String(i + 1).padStart(2, '0')}]</span>
        <h3 class="services_title is-project">${title}</h3>
        <p class="services_desc mono-block">2025</p>
        <span class="services_arrow">↳</span>`;
      list.appendChild(row);
    });
  }

  /* ─── pixel shimmer on card hover ──────────────────────── */

  function initPixelHover() {
    const COLORS = ['#4D58FF', '#8f96ff', '#c3c8ff', '#e9eaf5'];
    const GAP = 10; // cell grid pitch in px

    document.querySelectorAll('.card_media, .product_frame').forEach(frame => {
      const canvas = document.createElement('canvas');
      canvas.className = 'pixel-canvas';
      frame.appendChild(canvas);
      const ctx = canvas.getContext('2d');
      let cells = [], raf = null, progress = 0, target = 0, last = 0;

      function build() {
        const w = canvas.width = frame.offsetWidth;
        const h = canvas.height = frame.offsetHeight;
        cells = [];
        for (let y = 0; y < h; y += GAP) {
          for (let x = 0; x < w; x += GAP) {
            cells.push({
              x, y,
              delay: Math.random(),
              phase: Math.random() * Math.PI * 2,
              color: COLORS[(Math.random() * COLORS.length) | 0],
              size: 3 + Math.random() * 6,
            });
          }
        }
      }

      function loop(t) {
        const dt = Math.min(0.05, (t - last) / 1000);
        last = t;
        progress = Math.max(0, Math.min(1, progress + (target ? 1 : -1) * dt * 2.4));
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (progress <= 0) { raf = null; return; }
        for (const c of cells) {
          const local = Math.max(0, Math.min(1, (progress - c.delay * 0.6) / 0.4));
          if (!local) continue;
          const twinkle = 0.65 + 0.35 * Math.sin(t * 0.006 + c.phase);
          ctx.globalAlpha = local * twinkle;
          ctx.fillStyle = c.color;
          const s = c.size * local;
          ctx.fillRect(c.x, c.y, s, s);
        }
        ctx.globalAlpha = 1;
        raf = requestAnimationFrame(loop);
      }

      function ensureLoop() {
        if (!raf) { last = performance.now(); raf = requestAnimationFrame(loop); }
      }

      const card = frame.closest('.card') || frame;
      card.addEventListener('pointerenter', () => { build(); target = 1; ensureLoop(); });
      card.addEventListener('pointerleave', () => { target = 0; ensureLoop(); });
    });
  }

  /* ─── scrambled-text on title hover (0.7s resolve) ─────── */

  function initScramble() {
    const CHARS = '!<>-_\\/[]{}=+*^?#';
    const DURATION = 700;

    function scramble(el) {
      if (el.dataset.scrambling) return;
      const original = el.dataset.original || (el.dataset.original = el.textContent);
      el.dataset.scrambling = '1';
      const start = performance.now();
      (function tick(now) {
        const p = Math.min(1, (now - start) / DURATION);
        const solved = Math.floor(p * original.length);
        let out = original.slice(0, solved);
        for (let i = solved; i < original.length; i++) {
          out += original[i] === ' ' ? ' ' : CHARS[(Math.random() * CHARS.length) | 0];
        }
        el.textContent = out;
        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = original;
          delete el.dataset.scrambling;
        }
      })(start);
    }

    [
      ['.card', '.card_title'],
      ['.services_row', '.services_title'],
      ['.careers_row', '.careers_role'],
    ].forEach(([rowSel, titleSel]) => {
      document.querySelectorAll(rowSel).forEach(row => {
        const title = row.querySelector(titleSel);
        if (title) row.addEventListener('pointerenter', () => scramble(title));
      });
    });
  }

  buildWorkCards();
  buildLabsCards();
  buildOtherProjects();
  initPixelHover();
  initScramble();
  document.querySelectorAll('.carousel').forEach(initCarousel);

  /* ─── live clock — Singapore HQ time (GMT+8) ───────────── */

  function tickClock() {
    const timeEl = document.getElementById('local-time');
    if (!timeEl) return;
    timeEl.textContent = new Date().toLocaleTimeString('en-GB', {
      timeZone: 'Asia/Singapore',
      hour12: false,
    });
  }
  tickClock();
  setInterval(tickClock, 1000);

  /* ─── mobile menu ──────────────────────────────────────── */

  const burger = document.getElementById('nav-burger');
  const overlay = document.getElementById('menu-overlay');
  burger.addEventListener('click', () => overlay.classList.toggle('is-open'));
  overlay.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => overlay.classList.remove('is-open'))
  );
})();
