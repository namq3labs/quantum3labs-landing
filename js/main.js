/* ═══════════════════════════════════════════════════════════
   main.js — carousels, live clock, mobile menu
   (matches the reference: no load/scroll animations,
    interaction transitions only)
   ═══════════════════════════════════════════════════════════ */

(function () {

  /* ─── data (placeholder content — TBD) ─────────────────── */

  const WORK = [
    { title: 'Q3 GENESIS PLATFORM',      date: 'JULY 18, 2026' },
    { title: 'ORBIT PAYMENTS PROTOCOL',  date: 'JULY 25, 2026' },
    { title: 'NIGHTSHIFT ANALYTICS',     date: 'AUGUST 02, 2026' },
    { title: 'HELIOS TRADING ENGINE',    date: 'AUGUST 15, 2026' },
    { title: 'PAPERTRAIL COMPLIANCE',    date: 'SEPTEMBER 04, 2026' },
    { title: 'ATLAS IDENTITY LAYER',     date: 'SEPTEMBER 21, 2026' },
    { title: 'SIGNAL RESEARCH DESK',     date: 'OCTOBER 09, 2026' },
  ];

  const LABS = [
    { title: 'Q3 STARTER KIT',        tag: 'OPEN SOURCE' },
    { title: 'CIPHER NOTEBOOK',       tag: 'RESEARCH' },
    { title: 'MESHVIEW EXPLORER',     tag: 'TOOLING' },
    { title: 'PULSE MONITOR 2026',    tag: 'INFRA' },
    { title: 'GLYPH DESIGN TOKENS',   tag: 'DESIGN' },
    { title: 'RELAY CLI 2025',        tag: 'TOOLING' },
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
      card.innerHTML = `
        <div class="product_frame">
          <span class="product_plus is-l">+</span>
          <div class="ph"></div>
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

  buildWorkCards();
  buildLabsCards();
  document.querySelectorAll('.carousel').forEach(initCarousel);

  /* ─── live clock ───────────────────────────────────────── */

  function tickClock() {
    const timeEl = document.getElementById('local-time');
    const zoneEl = document.getElementById('time-zone');
    if (!timeEl) return;
    const now = new Date();
    timeEl.textContent = now.toTimeString().slice(0, 8);
    const off = -now.getTimezoneOffset() / 60;
    const sign = off >= 0 ? '+' : '-';
    zoneEl.textContent = `GMT${sign}${Math.abs(off)} (UTC${sign}${Math.abs(off)})`;
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
