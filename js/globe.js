/* ═══════════════════════════════════════════════════════════
   globe.js — rotating orthographic wireframe globe
   markers pulse in brand #4D58FF
   ═══════════════════════════════════════════════════════════ */

(function () {
  const BRAND = '#4D58FF';

  // Quantum3 Labs hubs — live: true marks the Singapore HQ
  const LOCATIONS = [
    { name: 'SINGAPORE',    lat: 1.2841,   lon: 103.8493, live: true },
    { name: 'KUALA LUMPUR', lat: 3.1390,   lon: 101.6869, live: false },
    { name: 'HO CHI MINH',  lat: 10.8231,  lon: 106.6297, live: false },
    { name: 'LIMA',         lat: -12.0464, lon: -77.0428, live: false },
  ];

  const canvas = document.getElementById('globe-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const SIZE = canvas.width;           // square canvas
  const R = SIZE * 0.42;
  const CX = SIZE / 2, CY = SIZE / 2;

  let rotation = 0;
  let filter = 'all';
  let markerIndex = 0;
  let lastSwitch = 0;

  document.querySelectorAll('.globe_filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.globe_filter-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      filter = btn.dataset.filter;
    });
  });

  // lat/lon (deg) -> 3D point on rotated sphere
  function project(lat, lon, rot) {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = (lon + rot) * Math.PI / 180;
    const x = R * Math.sin(phi) * Math.sin(theta);
    const y = -R * Math.cos(phi);
    const z = R * Math.sin(phi) * Math.cos(theta);
    return { x: CX + x, y: CY + y, z };
  }

  function drawArc(points) {
    let started = false;
    ctx.beginPath();
    for (const p of points) {
      if (p.z < 0) { started = false; continue; }   // back hemisphere hidden
      if (!started) { ctx.moveTo(p.x, p.y); started = true; }
      else ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
  }

  function frame(t) {
    rotation = t * 0.004;   // slow spin
    ctx.clearRect(0, 0, SIZE, SIZE);

    // sphere outline
    ctx.strokeStyle = 'rgba(17,18,20,0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.stroke();

    // graticule
    ctx.strokeStyle = 'rgba(17,18,20,0.16)';
    for (let lat = -75; lat <= 75; lat += 15) {
      const pts = [];
      for (let lon = -180; lon <= 180; lon += 4) pts.push(project(lat, lon, rotation));
      drawArc(pts);
    }
    for (let lon = -180; lon < 180; lon += 15) {
      const pts = [];
      for (let lat = -90; lat <= 90; lat += 4) pts.push(project(lat, lon, rotation));
      drawArc(pts);
    }

    // markers
    const now = performance.now();
    const visible = LOCATIONS.filter(l => filter === 'all' || l.live);
    visible.forEach((loc, i) => {
      const p = project(loc.lat, loc.lon, rotation);
      if (p.z < 0) return;
      const pulse = 0.6 + 0.4 * Math.sin(now * 0.004 + i * 1.7);
      ctx.fillStyle = BRAND;
      ctx.globalAlpha = pulse;
      const s = 7;
      ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
      ctx.globalAlpha = 1;
      // halo ring
      ctx.strokeStyle = BRAND;
      ctx.globalAlpha = (1 - pulse) * 0.6;
      ctx.strokeRect(p.x - s, p.y - s, s * 2, s * 2);
      ctx.globalAlpha = 1;
    });

    // rotate the LAT/LON readout through locations every 3s
    if (now - lastSwitch > 3000) {
      lastSwitch = now;
      markerIndex = (markerIndex + 1) % visible.length;
      const loc = visible[markerIndex];
      const latEl = document.getElementById('globe-lat');
      const lonEl = document.getElementById('globe-lon');
      if (latEl && loc) {
        latEl.textContent = Math.abs(loc.lat).toFixed(4) + '° ' + (loc.lat >= 0 ? 'N' : 'S');
        lonEl.textContent = Math.abs(loc.lon).toFixed(4) + '° ' + (loc.lon >= 0 ? 'E' : 'W');
      }
    }

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
})();
