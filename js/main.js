/* ═══════════════════════════════════════════════════════════
   main.js — carousels, live clock, mobile menu
   (matches the reference: no load/scroll animations,
    interaction transitions only)
   ═══════════════════════════════════════════════════════════ */

(function () {

  /* ─── data (placeholder content — TBD) ─────────────────── */

  // titles verbatim from quantum3labs.com — "other projects / 2025"
  const WORK = [
    { title: 'Brove',           date: '2025' },
    { title: 'Solder',          date: '2025' },
    { title: 'Scaffold-Stark',  date: '2025' },
    { title: 'Scaffold-Stylus', date: '2025' },
    { title: 'scaffold-iCP',    date: '2025' },
    { title: 'Aztec q3x',       date: '2025' },
    { title: 'ICP q3x',         date: '2025' },
    { title: 'The Marquis',     date: '2025' },
    { title: 'Arbuilder',       date: '2025' },
    { title: 'iCP coder',       date: '2025' },
    { title: 'stacks-builder',  date: '2025' },
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
    { title: '@solder',          tag: 'OPEN SOURCE' },                            // image TBD
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

  buildWorkCards();
  buildLabsCards();
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
