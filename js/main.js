/* ═══════════════════════════════════════════════════════════
   main.js — carousels, live clock, mobile menu
   (matches the reference: no load/scroll animations,
    interaction transitions only)
   ═══════════════════════════════════════════════════════════ */

(function () {

  /* ─── data (placeholder content — TBD) ─────────────────── */

  // featured projects — carousel + detail modal (copy is placeholder, TBD)
  const WORK = [
    {
      title: 'Stormbit', date: '2025', tag: 'DEFI',
      blurb: 'Decentralized lending infrastructure.',
      statement: 'A LENDING PROTOCOL THAT TURNS IDLE LIQUIDITY INTO OPPORTUNITY FOR BUILDERS AND FUNDS.',
      dev: ['PROTOCOL DESIGN', 'SMART CONTRACTS', 'SECURITY AUDIT'],
      design: ['PRODUCT DESIGN', 'WEB DESIGN', 'BRAND'],
      url: 'https://github.com/quantum3labs',
    },
    {
      title: 'Qash', date: '2025', tag: 'FINTECH',
      blurb: 'Payments that move at market speed.',
      statement: 'A PAYMENTS STACK THAT MAKES MOVING MONEY FEEL LIKE MOVING DATA.',
      dev: ['FULLSTACK BUILD', 'INFRASTRUCTURE', 'CMS SETUP'],
      design: ['CREATIVE DEVELOPMENT', 'WEBSITE DESIGN', 'MOTION'],
      url: 'https://github.com/quantum3labs',
    },
    {
      title: 'Prism', date: '2025', tag: 'ANALYTICS',
      blurb: 'Seeing on-chain data in full spectrum.',
      statement: 'AN ANALYTICS SURFACE THAT SPLITS RAW ON-CHAIN NOISE INTO SIGNALS TEAMS CAN ACT ON.',
      dev: ['DATA PIPELINE', 'API DESIGN', 'DASHBOARDS'],
      design: ['DATA VISUALIZATION', 'UI/UX', 'DESIGN SYSTEM'],
      url: 'https://github.com/quantum3labs',
    },
    {
      title: 'Polypay', date: '2025', tag: 'PAYMENTS',
      blurb: 'One checkout for every chain.',
      statement: 'A CHECKOUT LAYER THAT LETS ANY BUSINESS ACCEPT ANY ASSET ON ANY CHAIN.',
      dev: ['SDK & INTEGRATIONS', 'SMART CONTRACTS', 'INFRA'],
      design: ['PRODUCT DESIGN', 'BRAND', 'WEBSITE'],
      url: 'https://github.com/quantum3labs',
    },
    {
      title: 'Pact Network', date: '2025', tag: 'PROTOCOL',
      blurb: 'Agreements that enforce themselves.',
      statement: 'A COORDINATION NETWORK WHERE COMMITMENTS ARE CODE AND TRUST IS THE DEFAULT.',
      dev: ['PROTOCOL DESIGN', 'NODE INFRASTRUCTURE', 'AUDITS'],
      design: ['BRAND & IDENTITY', 'WEBSITE DESIGN', 'DOCS'],
      url: 'https://github.com/quantum3labs',
    },
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
      card.href = '#';
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
      card.addEventListener('click', e => {
        e.preventDefault();
        openProjectModal(i);
      });
      track.appendChild(card);
    });
  }

  /* ─── featured project detail modal ────────────────────── */

  let modal = null;

  function buildProjectModal() {
    modal = document.createElement('div');
    modal.className = 'pmodal';
    modal.innerHTML = `
      <div class="pmodal_side">
        <p class="eyebrow"><span class="square"></span>FEATURED PROJECTS</p>
        <ul class="pmodal_list">
          ${WORK.map((p, i) => `
            <li class="pmodal_item" data-index="${i}">
              <span class="pmodal_thumb ph"></span>
              <span class="pmodal_item-meta">
                <span class="pmodal_item-title">${p.title}</span>
                <span class="pmodal_item-blurb">${p.blurb}</span>
              </span>
            </li>`).join('')}
        </ul>
      </div>
      <div class="pmodal_main">
        <div class="pmodal_head">
          <h3 class="pmodal_title"></h3>
          <a class="text-link pmodal_visit" target="_blank" rel="noopener">VISIT SITE <span class="text-link_arrow">↳</span></a>
          <button class="pmodal_close" aria-label="Close">✕</button>
        </div>
        <p class="pmodal_statement headline"></p>
        <div class="pmodal_cols">
          <div>
            <p class="footer_col-head">[DEVELOPMENT]</p>
            <ul class="pmodal_tags" data-list="dev"></ul>
          </div>
          <div>
            <p class="footer_col-head">[BRANDING &amp; DESIGN]</p>
            <ul class="pmodal_tags" data-list="design"></ul>
          </div>
        </div>
        <div class="pmodal_media ph"></div>
      </div>`;
    document.body.appendChild(modal);

    modal.querySelector('.pmodal_close').addEventListener('click', closeProjectModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeProjectModal(); });
    addEventListener('keydown', e => { if (e.key === 'Escape') closeProjectModal(); });
    modal.querySelectorAll('.pmodal_item').forEach(item =>
      item.addEventListener('click', () => selectProject(+item.dataset.index))
    );
  }

  function selectProject(i) {
    const p = WORK[i];
    modal.querySelectorAll('.pmodal_item').forEach((el, k) =>
      el.classList.toggle('is-active', k === i)
    );
    modal.querySelector('.pmodal_title').textContent = p.title;
    modal.querySelector('.pmodal_visit').href = p.url;
    modal.querySelector('.pmodal_statement').textContent = p.statement;
    modal.querySelector('[data-list="dev"]').innerHTML = p.dev.map(t => `<li>${t}</li>`).join('');
    modal.querySelector('[data-list="design"]').innerHTML = p.design.map(t => `<li>${t}</li>`).join('');
    modal.querySelector('.pmodal_main').scrollTop = 0;
  }

  function openProjectModal(i) {
    if (!modal) buildProjectModal();
    selectProject(i);
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
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

  /* ─── image trail in the Careers section ───────────────── */

  function initImageTrail() {
    const section = document.getElementById('careers');
    if (!section || !matchMedia('(pointer: fine)').matches) return;

    const IMAGES = [
      'Gallery.png', 'Gallery-1.png', 'Gallery-2.png', 'Gallery-3.png',
      'Gallery-4.png', 'Gallery-5.png', 'Gallery-6.png',
    ].map(f => encodeURI('public/Careers/' + f));
    IMAGES.forEach(src => { const i = new Image(); i.src = src; });

    const layer = document.createElement('div');
    layer.className = 'trail-layer';
    section.appendChild(layer);

    const THRESHOLD = 70;   // px of cursor travel between spawns
    const MAX_LIVE = 10;    // concurrent images cap
    let lastX = -1e4, lastY = -1e4, idx = 0;

    section.addEventListener('pointermove', e => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dx = x - lastX, dy = y - lastY;
      if (Math.hypot(dx, dy) < THRESHOLD) return;

      // drift direction follows cursor motion for continuity
      const len = Math.hypot(dx, dy) || 1;
      const driftX = (dx / len) * 46, driftY = (dy / len) * 46;
      lastX = x; lastY = y;

      const img = document.createElement('img');
      img.className = 'trail-img';
      img.src = IMAGES[idx++ % IMAGES.length];
      img.draggable = false;
      layer.appendChild(img);
      while (layer.children.length > MAX_LIVE) layer.firstChild.remove();

      const rot = (Math.random() - 0.5) * 12;
      img.style.left = x + 'px';
      img.style.top = y + 'px';
      img.animate([
        { transform: `translate(-50%, -50%) scale(0.8) rotate(${rot}deg)`, opacity: 0 },
        { transform: `translate(-50%, -50%) scale(1) rotate(${rot}deg)`, opacity: 1, offset: 0.28 },
        { transform: `translate(calc(-50% + ${driftX}px), calc(-50% + ${driftY}px)) scale(1.02) rotate(${rot}deg)`, opacity: 1, offset: 0.55 },
        { transform: `translate(calc(-50% + ${driftX * 1.8}px), calc(-50% + ${driftY * 1.8}px)) scale(0.94) rotate(${rot}deg)`, opacity: 0 },
      ], { duration: 1300, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' })
        .onfinish = () => img.remove();
    });
  }

  buildWorkCards();
  buildLabsCards();
  buildOtherProjects();
  initPixelHover();
  initImageTrail();
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
