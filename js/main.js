/* ═══════════════════════════════════════════════════════════
   main.js — carousels, live clock, mobile menu
   (matches the reference: no load/scroll animations,
    interaction transitions only)
   ═══════════════════════════════════════════════════════════ */

(function () {

  /* ─── smooth scroll (Lenis) ────────────────────────────── */

  const lenis = typeof Lenis !== 'undefined'
    ? new Lenis({ autoRaf: true, anchors: true, lerp: 0.1 })
    : null;

  /* ─── data (placeholder content — TBD) ─────────────────── */

  // featured projects — carousel + detail modal (copy is placeholder, TBD)
  const WORK = [
    {
      title: 'Stormbit', date: '2025', tag: 'DEFI',
      logo: 'public/featured-project/Stormbit.png',
      thumb: 'public/featured-project/thumbnail/Stormbit.jpg',
      blurb: 'Liquidation-free crypto lending.',
      industry: 'DeFi · Lending · Derivatives',
      statement: 'Borrow USDC against BTC or ETH — without the risk of liquidation.',
      dev: ['BACKEND', 'FRONTEND', 'SMART CONTRACTS', 'DEVOPS'],
      design: ['BRANDING', 'UX STRATEGY', 'UI DESIGN'],
      url: 'https://github.com/Quantum3-Labs',
      overview: 'Stormbit is a decentralized lending protocol that enables users to borrow USDC against BTC or ETH collateral without the risk of liquidation. Instead of paying traditional interest, borrowers cap a portion of their upside, while lenders earn that capped upside as a premium through embedded options strategies.',
      challenge: 'Traditional crypto lending platforms expose borrowers to liquidations during periods of high market volatility, creating uncertainty and forcing users to closely monitor their positions.',
      solution: 'Stormbit automatically hedges every loan at origination by combining call and put options. Borrowers exchange part of their upside for borrowing costs that can approach 0%, while protective puts eliminate the need for liquidations and margin calls. Once funded, loans remain active until the selected expiry date.',
    },
    {
      title: 'Qash', date: '2025', tag: 'FINTECH',
      logo: 'public/featured-project/Qash.png',
      thumb: 'public/featured-project/thumbnail/Qash.jpg',
      blurb: 'Private business banking, on-chain.',
      industry: 'Payments · Financial Infrastructure · Privacy',
      statement: 'A self-custodial business account with on-chain privacy by default.',
      dev: ['BACKEND', 'FRONTEND', 'SMART CONTRACTS', 'DEVOPS'],
      design: ['BRANDING', 'UX STRATEGY', 'UI DESIGN'],
      url: 'https://github.com/Quantum3-Labs',
      overview: 'Qash is a self-custodial business account that enables companies in emerging markets to manage payments, payroll, and treasury operations with on-chain financial privacy by default. Built on Miden, it replaces fragmented workflows with a single platform for custody, invoicing, and payouts.',
      challenge: 'Crypto companies lack financial privacy and operational efficiency. Traditional on-chain payments expose salaries, treasury balances, and business relationships, while existing workflows require multiple disconnected tools for custody, accounting, and payroll.',
      solution: 'Qash combines embedded wallets, multi-owner accounts, payroll, invoicing, and bill payments into one seamless platform. Users can sign up with email and instantly access self-custodial accounts without seed phrases or browser extensions. Every transaction settles privately on Miden, allowing companies to operate securely and efficiently.',
    },
    {
      title: 'Prism', date: '2025', tag: 'ANALYTICS',
      logo: 'public/featured-project/Prism.png',
      thumb: 'public/featured-project/thumbnail/Prism.jpg',
      blurb: 'Scan-to-pay for foreigners in Vietnam.',
      industry: 'Wallet · QR Payments · Fintech',
      statement: 'Pay any Vietnamese QR code — without a local bank account.',
      dev: ['BACKEND', 'FRONTEND', 'SMART CONTRACTS', 'DEVOPS'],
      design: ['BRANDING', 'UX STRATEGY', 'UI DESIGN'],
      url: 'https://github.com/Quantum3-Labs',
      overview: "Prism is a mobile wallet that enables foreigners in Vietnam to pay any merchant by scanning local bank QR codes, without needing a Vietnamese bank account. Users can top up from crypto or bank accounts in more than 70 countries, hold their balance in USD, and spend seamlessly in Vietnam.",
      challenge: "QR codes have become the standard payment method in Vietnam, but accessing the system typically requires a local bank account — something many foreigners cannot easily obtain. As a result, expats and travelers face significant friction when making everyday purchases.",
      solution: "Prism bridges the gap between global users and Vietnam's QR payment infrastructure. The app allows foreigners to fund their wallet from crypto or international bank accounts and instantly pay any merchant that accepts Vietnamese bank QR codes, eliminating the need for a local bank account.",
    },
    {
      title: 'Pact Network', date: '2025', tag: 'PROTOCOL',
      logo: 'public/featured-project/Pact.png',
      thumb: 'public/featured-project/thumbnail/Pact.jpg',
      blurb: 'Chargebacks for agent payments.',
      industry: 'AI Agents · Agentic Payments · Infrastructure',
      statement: 'A risk layer that refunds AI agents when paid API calls fail.',
      dev: ['BACKEND', 'DEVOPS', 'BRANDING'],
      design: [],
      url: 'https://github.com/pactnetwork',
      overview: 'Pact is a risk layer for agent payments that automatically refunds AI agents when paid API calls fail. Built for protocols such as x402 and Multi-Payment Protocol (MPP), Pact brings chargeback-like protections to autonomous transactions.',
      challenge: 'As agent payments become more common, there is no recourse mechanism when a paid API request fails. Whether due to server errors, timeouts, or invalid responses, agents bear the full cost of failed interactions, with no equivalent to traditional payment chargebacks.',
      solution: 'Pact sits beneath the payment layer, monitoring transactions between agents and service providers. When a failure is detected, the protocol automatically settles refunds on-chain through a coverage pool, returning funds to the agent without disputes or manual intervention.',
    },
  ];

  // other projects — list rows (titles verbatim from quantum3labs.com)
  const OTHER_PROJECTS = [
    { title: 'Brove',          link: 'https://brove.io/' },
    { title: 'Solder',         link: 'https://solder.build/' },
    { title: 'Scaffold-Stark', link: 'https://scaffoldstark.com/' },
    { title: 'Scaffold-Stylus',link: 'https://www.scaffoldstylus.com/' },
    { title: 'scaffold-iCP',   link: 'https://github.com/Quantum3-Labs/scaffold-icp' },
    { title: 'Aztec q3x',      link: 'https://github.com/Quantum3-Labs/aztec-cross-chain-multisig' },
    { title: 'ICP q3x',        link: 'https://github.com/Quantum3-Labs/q3x-icp-app' },
    { title: 'The Marquis',    link: 'https://x.com/TheMarquisOnX' },
    { title: 'Arbuilder',      link: 'https://arbuilder.app/' },
    { title: 'iCP coder',      link: 'https://github.com/Quantum3-Labs/icp-coder' },
    { title: 'stacks-builder', link: 'https://github.com/Quantum3-Labs/stacks-builder' },
    { title: 'Polypay',        link: 'https://github.com/Poly-pay' },
  ];

  // handles verbatim from quantum3labs.com — "open-source contributions"
  const OSS_DIR = 'public/open-source contributions/';
  const LABS = [
    { title: '@Scaffold-Stark',  tag: 'OPEN SOURCE', img: 'Scaffold-stark.png', link: 'https://github.com/Scaffold-Stark/scaffold-stark-2' },
    { title: '@buidlguidl',      tag: 'OPEN SOURCE', img: 'BuidlGuidl.png', link: 'https://github.com/BuidlGuidl' },
    { title: '@themarquis',      tag: 'OPEN SOURCE', img: 'The marquis.png', link: 'https://github.com/The-Marquis-Gaming' },
    { title: '@uniswap',         tag: 'OPEN SOURCE', img: 'Uniswap.png', link: 'https://github.com/Uniswap' },
    { title: '@foundry',         tag: 'OPEN SOURCE', img: 'Foundry.png', link: 'https://github.com/foundry-rs' },
    { title: '@polypay',         tag: 'OPEN SOURCE', img: 'Polypay.png', link: 'https://github.com/Poly-pay' },
    { title: '@humanprotocol',   tag: 'OPEN SOURCE', img: 'Human protocol.png', link: 'https://github.com/humanprotocol' },
    { title: '@dojo',            tag: 'OPEN SOURCE', img: 'Dojo.png', link: 'https://github.com/dojoengine' },
    { title: '@Futaba Labs',     tag: 'OPEN SOURCE', img: 'Futaba labs.png', link: 'https://github.com/Futaba-Labs' },
    { title: '@Scaffold-eth',    tag: 'OPEN SOURCE', img: 'Scaffold ETH.png', link: 'https://github.com/scaffold-eth' },
    { title: '@WTFAcademy',      tag: 'OPEN SOURCE', img: 'WTFACADEMY.png', link: 'https://github.com/WTFAcademy' },
    { title: '@scaffold-stylus', tag: 'OPEN SOURCE', img: 'Scaffold Stylus.png', link: 'https://github.com/Arb-Stylus' },
    { title: '@solder',          tag: 'OPEN SOURCE', img: 'Solder.png', link: 'https://github.com/pactnetwork/solder' },
    { title: '@pact-network',    tag: 'OPEN SOURCE', img: 'Pact network.png', link: 'https://github.com/pactnetwork' },
    { title: '@arbuilder',       tag: 'OPEN SOURCE', img: 'Arbuilder.png', link: 'https://github.com/Quantum3-Labs/ARBuilder' },
    { title: '@Openzeppelin',    tag: 'OPEN SOURCE', img: 'Openzeppelin.png', link: 'https://github.com/OpenZeppelin' },
  ];

  /* ─── build carousels ──────────────────────────────────── */

  function buildWorkCards() {
    const track = document.querySelector('#work-carousel [data-carousel-track]');
    WORK.forEach((item, i) => {
      const card = document.createElement('a');
      card.href = '#';
      card.className = 'card';
      const media = item.thumb
        ? `<img class="card_img" src="${encodeURI(item.thumb)}" alt="${item.title}" loading="lazy" draggable="false" />`
        : '<div class="ph"></div>';
      card.innerHTML = `
        <div class="card_media">${media}</div>
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
      <div class="pmodal_side" data-lenis-prevent>
        <p class="eyebrow"><span class="square"></span>FEATURED PROJECTS</p>
        <ul class="pmodal_list">
          ${WORK.map((p, i) => `
            <li class="pmodal_item" data-index="${i}">
              ${p.logo
                ? `<img class="pmodal_thumb" src="${encodeURI(p.logo)}" alt="${p.title}" draggable="false" />`
                : '<span class="pmodal_thumb ph"></span>'}
              <span class="pmodal_item-meta">
                <span class="pmodal_item-title">${p.title}</span>
                <span class="pmodal_item-blurb">${p.blurb}</span>
              </span>
            </li>`).join('')}
        </ul>
      </div>
      <div class="pmodal_main" data-lenis-prevent>
        <div class="pmodal_head">
          <h3 class="pmodal_title"></h3>
          <a class="text-link pmodal_visit" target="_blank" rel="noopener">VISIT SITE <span class="text-link_arrow">↳</span></a>
          <button class="pmodal_close" aria-label="Close">✕</button>
        </div>
        <p class="pmodal_industry mono-block dim" data-text="industry"></p>
        <p class="pmodal_statement headline"></p>
        <div class="pmodal_cols">
          <div>
            <p class="footer_col-head">[DEVELOPMENT]</p>
            <ul class="pmodal_tags" data-list="dev"></ul>
          </div>
          <div data-col="design">
            <p class="footer_col-head">[BRANDING &amp; DESIGN]</p>
            <ul class="pmodal_tags" data-list="design"></ul>
          </div>
        </div>
        <div class="pmodal_media ph"></div>
        <div class="pmodal_story">
          <div class="pmodal_block">
            <h4 class="pmodal_block-title">Overview</h4>
            <p class="pmodal_block-text" data-text="overview"></p>
          </div>
          <div class="pmodal_block">
            <h4 class="pmodal_block-title">Challenge</h4>
            <p class="pmodal_block-text" data-text="challenge"></p>
          </div>
          <div class="pmodal_block">
            <h4 class="pmodal_block-title">Q3labs Solutions</h4>
            <p class="pmodal_block-text" data-text="solution"></p>
          </div>
        </div>
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
    modal.querySelector('[data-text="industry"]').textContent = p.industry || '';
    modal.querySelector('.pmodal_statement').textContent = p.statement;
    modal.querySelector('[data-list="dev"]').innerHTML = p.dev.map(t => `<li>${t}</li>`).join('');
    modal.querySelector('[data-list="design"]').innerHTML = p.design.map(t => `<li>${t}</li>`).join('');
    modal.querySelector('[data-col="design"]').style.display = p.design.length ? '' : 'none';
    modal.querySelector('[data-text="overview"]').textContent = p.overview;
    modal.querySelector('[data-text="challenge"]').textContent = p.challenge;
    modal.querySelector('[data-text="solution"]').textContent = p.solution;
    const media = modal.querySelector('.pmodal_media');
    if (p.thumb) {
      media.classList.remove('ph');
      media.style.backgroundImage = `url("${encodeURI(p.thumb)}")`;
    } else {
      media.classList.add('ph');
      media.style.backgroundImage = '';
    }
    modal.querySelector('.pmodal_main').scrollTop = 0;
  }

  function openProjectModal(i) {
    if (!modal) buildProjectModal();
    selectProject(i);
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  }

  function buildLabsCards() {
    const track = document.querySelector('#labs-carousel [data-carousel-track]');
    LABS.forEach(item => {
      const card = document.createElement('a');
      card.href = item.link || '#';
      card.target = '_blank';
      card.rel = 'noopener';
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
    OTHER_PROJECTS.forEach((item, i) => {
      const row = document.createElement('li');
      row.className = 'services_row';
      row.innerHTML = `
        <span class="services_index">[${String(i + 1).padStart(2, '0')}]</span>
        <a class="services_title is-project" href="${item.link}" target="_blank" rel="noopener">${item.title}</a>
        <p class="services_desc mono-block">2025</p>
        <span class="services_arrow">↳</span>`;
      list.appendChild(row);
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
      // no trail over the roles column (it has its own interactions)
      if (e.target.closest('.careers_right')) return;
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

  /* ─── quote: scroll-to-reveal words ────────────────────── */

  function initQuoteReveal() {
    const block = document.querySelector('[data-quote-reveal]');
    if (!block) return;

    // wrap every word in a span
    block.querySelectorAll('p').forEach(p => {
      p.innerHTML = p.textContent.trim().split(/\s+/)
        .map(w => `<span class="word">${w}</span>`)
        .join(' ');
    });
    const words = [...block.querySelectorAll('.word')];

    function update() {
      const r = block.getBoundingClientRect();
      const vh = innerHeight;
      // progress 0 → 1 while the block travels from 85% to 35% of the viewport
      const progress = Math.max(0, Math.min(1,
        (vh * 0.85 - r.top) / (r.height + vh * 0.5)
      ));
      const lit = Math.floor(progress * words.length);
      words.forEach((w, i) => w.classList.toggle('is-on', i < lit));
    }
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update, { passive: true });
    update();
  }

  /* ─── open-source: pin + horizontal scroll ─────────────── */

  function initLabsPin() {
    const section = document.querySelector('[data-labs-pin]');
    if (!section) return;
    const sticky = section.querySelector('.labs-sticky');
    const viewport = section.querySelector('.labs-viewport');
    const track = section.querySelector('[data-labs-track]');
    const desktop = matchMedia('(min-width: 1024px)');

    let distance = 0;

    function measure() {
      if (!desktop.matches) {
        section.style.height = '';
        track.style.transform = '';
        distance = 0;
        return;
      }
      // extra 10% of viewport as lead-in/out breathing room
      distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      section.style.height = (innerHeight + distance) + 'px';
      render();
    }

    function render() {
      if (!desktop.matches || distance === 0) return;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - innerHeight;
      const p = Math.max(0, Math.min(1, -rect.top / scrollable));
      track.style.transform = `translate3d(${-p * distance}px, 0, 0)`;
    }

    addEventListener('scroll', render, { passive: true });
    addEventListener('resize', measure);
    desktop.addEventListener('change', measure);
    // recompute once images/layout settle
    requestAnimationFrame(measure);
    addEventListener('load', measure);
  }

  /* ─── globe: pinned orbit-in + text reveal ─────────────── */

  function initGlobePin() {
    const section = document.querySelector('[data-globe-pin]');
    if (!section) return;
    const orbit = section.querySelector('[data-globe-orbit]');
    const text = section.querySelector('[data-globe-text]');
    const satLayer = section.querySelector('[data-globe-satellites]');
    const canvas = document.getElementById('globe-canvas');
    const desktop = matchMedia('(min-width: 1024px)');
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const easeIn = t => t * t;
    const easeInOut = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const clamp01 = t => Math.max(0, Math.min(1, t));
    let vw = innerWidth, vh = innerHeight;
    let globeR = 240;
    let satProgress = 0;  // phase-3 reveal, read by the orbit loop
    let lineProgress = 0; // phase-4 line-up, read by the orbit loop

    // ── build the orbiting open-source satellites ──
    const sats = LABS.map((item, i) => {
      const el = document.createElement('div');
      el.className = 'globe-sat';
      el.innerHTML = `<img src="${encodeURI(OSS_DIR + item.img)}" alt="" loading="lazy" draggable="false" />`;
      satLayer.appendChild(el);
      return {
        el,
        R: 0.98 + (i % 4) * 0.17,                          // ring, ×globeR
        incl: ((i * 41) % 90 - 45) * Math.PI / 180,        // orbit tilt
        node: (i * 57) * Math.PI / 180,                    // plane orientation
        phase: (i * 47) * Math.PI / 180,                   // start angle
        speed: (0.5 + (i % 5) * 0.13) * (i % 2 ? -1 : 1),  // rad/s, alternating dir
      };
    });

    function measure() {
      if (!desktop.matches) {
        section.style.height = '';
        orbit.style.transform = ''; orbit.style.opacity = '';
        text.style.transform = ''; text.style.opacity = '';
        return;
      }
      vw = innerWidth; vh = innerHeight;
      globeR = (canvas.getBoundingClientRect().width || 480) / 2;
      section.style.height = Math.round(vh * 4.2) + 'px'; // room for four phases
      render();
    }

    // phase boundaries (fractions of total scroll)
    const P1 = 0.18;      // globe orbits in
    const P2 = 0.30;      // text reveals
    const P3 = 0.42;      // text scrolls up & out
    const SAT_IN = 0.56;  // satellites faded in & orbiting
    const LINE = 0.68;    // satellites start lining up

    function render() {
      if (!desktop.matches) return;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - vh;
      const p = clamp01(-rect.top / scrollable);

      const q = easeOut(clamp01(p / P1));                          // globe in
      const rin = easeOut(clamp01((p - P1) / (P2 - P1)));          // text rise-in
      const rout = easeIn(clamp01((p - P2) / (P3 - P2)));          // text rise-out
      satProgress = easeOut(clamp01((p - P3) / (SAT_IN - P3)));    // satellites appear
      lineProgress = easeInOut(clamp01((p - LINE) / (1 - LINE)));  // satellites line up

      // globe: quadratic-bezier orbit-in, holds centre, then fades as icons line up
      const p0 = { x: vw * 0.05, y: vh * 0.46 };
      const p1 = { x: vw * 0.28, y: vh * 0.06 };
      const t = q, mt = 1 - t;
      const ox = mt * mt * p0.x + 2 * mt * t * p1.x;
      const oy = mt * mt * p0.y + 2 * mt * t * p1.y;
      orbit.style.transform = `translate3d(${ox.toFixed(1)}px, ${oy.toFixed(1)}px, 0) scale(${(0.74 + 0.26 * q).toFixed(3)})`;
      orbit.style.opacity = ((0.55 + 0.45 * q) * (1 - 0.75 * lineProgress)).toFixed(3);

      // text: rises into place (phase 2), then scrolls up and out (phase 3a)
      const ty = (1 - rin) * vh * 0.26 - rout * vh * 0.34;
      text.style.transform = `translate3d(0, ${ty.toFixed(1)}px, 0)`;
      text.style.opacity = (rin * (1 - rout)).toFixed(3);
    }

    // ── continuous 3D orbit of the satellites ──
    let satsHidden = false;
    function orbitFrame(now) {
      if (desktop.matches && satProgress > 0.001) {
        satsHidden = false;
        const time = now * 0.001;
        const spread = 0.35 + 0.65 * satProgress;
        const L = lineProgress;
        // horizontal-row target: evenly spaced across the viewport, scaled up
        const N = sats.length;
        const gap = Math.min((vw * 0.86) / (N - 1), 104);
        const rowScale = 1.55;
        for (let i = 0; i < N; i++) {
          const s = sats[i];
          const th = s.phase + time * s.speed;
          // circle in the orbit's own plane
          let x = Math.cos(th) * s.R * globeR;
          let z = Math.sin(th) * s.R * globeR;
          let y = 0;
          // tilt around X
          const y1 = y * Math.cos(s.incl) - z * Math.sin(s.incl);
          const z1 = y * Math.sin(s.incl) + z * Math.cos(s.incl);
          // orient plane around Y
          const x2 = x * Math.cos(s.node) + z1 * Math.sin(s.node);
          const z2 = -x * Math.sin(s.node) + z1 * Math.cos(s.node);
          const depth = (z2 / (s.R * globeR) + 1) / 2;        // 0 back → 1 front
          const oScale = (0.55 + 0.55 * depth) * (0.5 + 0.5 * satProgress);
          const oOpacity = (0.35 + 0.65 * depth) * satProgress;

          // phase 4: lerp orbit → horizontal row
          const rowX = (i - (N - 1) / 2) * gap;
          const px = (x2 * spread) * (1 - L) + rowX * L;
          const py = (y1 * spread) * (1 - L);
          const sc = oScale * (1 - L) + rowScale * L;
          const op = oOpacity * (1 - L) + L;

          s.el.style.transform =
            `translate3d(calc(-50% + ${px.toFixed(1)}px), calc(-50% + ${py.toFixed(1)}px), 0) scale(${sc.toFixed(3)})`;
          s.el.style.opacity = op.toFixed(3);
          s.el.style.zIndex = L > 0.5 ? 5 : (depth > 0.5 ? 6 : 2);
        }
      } else if (!satsHidden) {
        satsHidden = true;
        for (const s of sats) s.el.style.opacity = '0';
      }
      requestAnimationFrame(orbitFrame);
    }
    requestAnimationFrame(orbitFrame);

    addEventListener('scroll', render, { passive: true });
    addEventListener('resize', measure);
    desktop.addEventListener('change', measure);
    measure();
    requestAnimationFrame(measure);
    addEventListener('load', measure);
  }

  buildWorkCards();
  buildLabsCards();
  buildOtherProjects();
  initImageTrail();
  initQuoteReveal();
  initGlobePin();
  initLabsPin();

  // footer Work links open the project detail modal
  document.querySelectorAll('[data-open-project]').forEach(link =>
    link.addEventListener('click', e => {
      e.preventDefault();
      openProjectModal(+link.dataset.openProject);
    })
  );
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
