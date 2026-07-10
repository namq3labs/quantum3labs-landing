/* ═══════════════════════════════════════════════════════════
   main.js — preloader, hero canvas, carousels, reveals, clock
   ═══════════════════════════════════════════════════════════ */

(function () {
  const BRAND = '#4D58FF';

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

  /* ─── preloader ────────────────────────────────────────── */

  const pre = document.getElementById('preloader');
  const preCount = document.getElementById('preloader-count');
  let progress = 0;
  const preTimer = setInterval(() => {
    progress = Math.min(100, progress + Math.ceil(Math.random() * 14));
    preCount.textContent = '[' + String(progress).padStart(3, '0') + ']';
    if (progress >= 100) {
      clearInterval(preTimer);
      setTimeout(() => {
        pre.classList.add('is-done');
        startIntro();
      }, 250);
    }
  }, 90);

  /* ─── hero canvas: drifting particle field + brand glow ── */

  const heroCanvas = document.getElementById('hero-canvas');
  const hctx = heroCanvas.getContext('2d');
  let hw, hh, particles;

  function heroResize() {
    hw = heroCanvas.width = heroCanvas.offsetWidth * devicePixelRatio;
    hh = heroCanvas.height = heroCanvas.offsetHeight * devicePixelRatio;
    particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * hw,
      y: Math.random() * hh,
      r: (0.6 + Math.random() * 1.8) * devicePixelRatio,
      vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      tw: Math.random() * Math.PI * 2,
    }));
  }
  heroResize();
  addEventListener('resize', heroResize);

  let mouseX = 0.5, mouseY = 0.5;
  addEventListener('mousemove', e => {
    mouseX = e.clientX / innerWidth;
    mouseY = e.clientY / innerHeight;
  });

  function heroFrame(t) {
    hctx.clearRect(0, 0, hw, hh);

    // deep gradient backdrop, glow follows cursor slightly
    const gx = hw * (0.35 + mouseX * 0.3);
    const gy = hh * (0.4 + mouseY * 0.25);
    const g = hctx.createRadialGradient(gx, gy, 0, gx, gy, hw * 0.75);
    g.addColorStop(0, 'rgba(77,88,255,0.28)');
    g.addColorStop(0.5, 'rgba(30,34,90,0.18)');
    g.addColorStop(1, 'rgba(10,11,18,0)');
    hctx.fillStyle = g;
    hctx.fillRect(0, 0, hw, hh);

    // horizon grid (perspective lines, bottom third)
    hctx.strokeStyle = 'rgba(143,150,255,0.07)';
    hctx.lineWidth = 1;
    const horizon = hh * 0.68;
    for (let i = 0; i < 14; i++) {
      const y = horizon + Math.pow(i / 14, 1.8) * (hh - horizon);
      hctx.beginPath(); hctx.moveTo(0, y); hctx.lineTo(hw, y); hctx.stroke();
    }
    for (let i = -10; i <= 10; i++) {
      hctx.beginPath();
      hctx.moveTo(hw / 2 + i * hw * 0.06, horizon);
      hctx.lineTo(hw / 2 + i * hw * 0.28, hh);
      hctx.stroke();
    }

    // particles
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = hw; if (p.x > hw) p.x = 0;
      if (p.y < 0) p.y = hh; if (p.y > hh) p.y = 0;
      const a = 0.25 + 0.55 * Math.abs(Math.sin(t * 0.001 + p.tw));
      hctx.fillStyle = Math.random() > 0.985 ? BRAND : `rgba(220,224,255,${a})`;
      hctx.fillRect(p.x, p.y, p.r, p.r);
    }

    requestAnimationFrame(heroFrame);
  }
  requestAnimationFrame(heroFrame);

  /* ─── intro + scroll animations (GSAP) ─────────────────── */

  function startIntro() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.hero_logo', { opacity: 1, scale: 1.02, duration: 1.4, ease: 'power3.out' });
    gsap.from('.hero_bracket', { opacity: 0, duration: 1, stagger: 0.08, delay: 0.3 });
    gsap.from('.hero_bottom > *', { y: 30, opacity: 0, duration: 1, stagger: 0.15, delay: 0.5, ease: 'power3.out' });
    gsap.from('.nav', { y: -20, opacity: 0, duration: 0.9, delay: 0.4, ease: 'power3.out' });

    // masked line reveals for headlines
    document.querySelectorAll('.headline').forEach(headline => {
      gsap.to(headline.querySelectorAll('.line'), {
        y: 0,
        duration: 1.1,
        stagger: 0.09,
        ease: 'power4.out',
        scrollTrigger: { trigger: headline, start: 'top 82%' },
      });
    });

    // generic fade-up reveals
    document.querySelectorAll('.reveal').forEach(el => {
      gsap.from(el, {
        y: 26,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });

    // cards stagger in
    document.querySelectorAll('.carousel_track').forEach(track => {
      gsap.from(track.children, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: track, start: 'top 85%' },
      });
    });

    // hero logo subtle parallax out
    gsap.to('.hero_logo-wrap', {
      yPercent: -18,
      opacity: 0.25,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  /* ─── build carousels ──────────────────────────────────── */

  function buildWorkCards() {
    const track = document.querySelector('#work-carousel [data-carousel-track]');
    WORK.forEach((item, i) => {
      const card = document.createElement('a');
      card.href = '#footer';
      card.className = 'card';
      card.innerHTML = `
        <div class="card_media"><canvas></canvas></div>
        <div class="card_meta">
          <span class="card_index">[${String(i + 1).padStart(2, '0')}]</span>
          <span>
            <span class="card_title">${item.title}</span>
            <span class="card_date">${item.date}</span>
          </span>
        </div>`;
      track.appendChild(card);
      Q3Art.drawArt(card.querySelector('canvas'), i, 'wide');
    });
  }

  function buildLabsCards() {
    const track = document.querySelector('#labs-carousel [data-carousel-track]');
    LABS.forEach((item, i) => {
      const card = document.createElement('a');
      card.href = '#footer';
      card.className = 'card';
      card.innerHTML = `
        <div class="product_frame">
          <span class="product_plus is-l">+</span>
          <canvas></canvas>
          <span class="product_plus is-r">+</span>
        </div>
        <div class="product_meta">
          <span class="card_title">${item.title}</span>
          <span class="product_tag">${item.tag}</span>
        </div>`;
      track.appendChild(card);
      Q3Art.drawArt(card.querySelector('canvas'), i + 3, 'product');
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

  /* ─── hero "next up" thumb art ─────────────────────────── */

  const thumb = document.querySelector('.hero_next-thumb');
  if (thumb) {
    const c = document.createElement('canvas');
    thumb.appendChild(c);
    c.style.width = '100%'; c.style.height = '100%';
    Q3Art.drawArt(c, 7, 'wide');
  }

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
