/* ============================================================
   REXACLOUD — script.js  (Lenis smooth scroll + all interactions)
   ============================================================ */

// ── STARFIELD ────────────────────────────────────────────────────
(function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [], W, H;
  const N = 180, DIST = 110;
  function mkStar() {
    return { x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.5 + 0.3, vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28, o: Math.random() * .55 + .15 };
  }
  function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
  function init() { resize(); stars = Array.from({ length: N }, mkStar); }
  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < stars.length; i++) {
      let conn = 0;
      for (let j = i + 1; j < stars.length && conn < 3; j++) {
        const dx = stars[i].x - stars[j].x, dy = stars[i].y - stars[j].y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < DIST) { ctx.beginPath(); ctx.moveTo(stars[i].x, stars[i].y); ctx.lineTo(stars[j].x, stars[j].y); ctx.strokeStyle = `rgba(140,100,255,${(1 - d / DIST) * .12})`; ctx.lineWidth = .7; ctx.stroke(); conn++; }
      }
    }
    stars.forEach(s => {
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(210,195,255,${s.o})`; ctx.fill();
      s.x += s.vx; s.y += s.vy;
      if (s.x < -4) s.x = W + 4; if (s.x > W + 4) s.x = -4;
      if (s.y < -4) s.y = H + 4; if (s.y > H + 4) s.y = -4;
    });
    requestAnimationFrame(tick);
  }
  window.addEventListener('resize', () => { resize(); stars = Array.from({ length: N }, mkStar); });
  init(); tick();
})();


// ── LENIS SMOOTH SCROLL (LordCloud style) ─────────────────────────
let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  // Sync navbar via Lenis scroll event
  lenis.on('scroll', ({ scroll }) => {
    navEl.classList.toggle('scrolled', scroll > 60);
  });

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -90, duration: 1.4 }); }
    });
  });
} else {
  // Fallback if Lenis fails to load
  window.addEventListener('scroll', () => {
    navEl.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}


// ── ANNOUNCEMENT BAR ─────────────────────────────────────────────
const annEl = document.getElementById('ann');
const annClose = document.getElementById('annClose');
const navEl = document.getElementById('nav');
if (annClose && annEl) {
  annClose.addEventListener('click', () => {
    annEl.style.display = 'none';
    navEl.classList.remove('ann-visible');
    navEl.style.top = '0';
  });
}


// ── MOBILE MENU ──────────────────────────────────────────────────
const hbg = document.getElementById('hamburger');
const mob = document.getElementById('mobMenu');
function closeMob() { hbg.classList.remove('active'); mob.classList.remove('active'); document.body.style.overflow = ''; if (lenis) lenis.start(); }
window.closeMob = closeMob;
if (hbg && mob) {
  hbg.addEventListener('click', () => {
    const open = mob.classList.toggle('active');
    hbg.classList.toggle('active');
    document.body.style.overflow = open ? 'hidden' : '';
    if (lenis) { if (open) lenis.stop(); else lenis.start(); }
  });
}


// ── SCROLL REVEAL ────────────────────────────────────────────────
const ro = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); ro.unobserve(e.target); } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('[data-r]').forEach(el => ro.observe(el));


// ── PERFORMANCE BARS ─────────────────────────────────────────────
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.pb-fill[data-w]').forEach(b => {
        setTimeout(() => { b.style.width = b.dataset.w + '%'; }, 300);
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
const perfSec = document.getElementById('performance');
if (perfSec) barObs.observe(perfSec);


// ── PANEL TABS (EnderCloud style) ────────────────────────────────
document.querySelectorAll('.ptab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.panel-view').forEach(v => v.classList.remove('active'));
    tab.classList.add('active');
    const view = document.getElementById('pv-' + tab.dataset.panel);
    if (view) view.classList.add('active');
  });
});
let panelIdx = 0;
const panelOrder = ['dashboard', 'console', 'files', 'plugins', 'props'];
setInterval(() => {
  const ps = document.getElementById('panel');
  if (!ps) return;
  const rect = ps.getBoundingClientRect();
  if (rect.top < innerHeight && rect.bottom > 0) {
    panelIdx = (panelIdx + 1) % panelOrder.length;
    document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.panel-view').forEach(v => v.classList.remove('active'));
    const tab = document.querySelector(`[data-panel="${panelOrder[panelIdx]}"]`);
    const view = document.getElementById('pv-' + panelOrder[panelIdx]);
    if (tab) tab.classList.add('active');
    if (view) view.classList.add('active');
  }
}, 4000);


// ── PRICING TOGGLE ───────────────────────────────────────────────
const ptog = document.getElementById('ptog');
const mlbl = document.getElementById('mlbl');
const albl = document.getElementById('albl');
if (ptog) {
  ptog.addEventListener('change', () => {
    const annual = ptog.checked;
    mlbl.classList.toggle('active', !annual);
    albl.classList.toggle('active', annual);
    document.querySelectorAll('.plan-amt').forEach(el => {
      const val = annual ? el.dataset.a : el.dataset.m;
      if (!val) return;
      el.style.transform = 'scale(0.82)'; el.style.opacity = '.35';
      setTimeout(() => { el.textContent = val; el.style.transform = 'scale(1)'; el.style.opacity = '1'; }, 180);
    });
  });
}
const _ps = document.createElement('style');
_ps.textContent = '.plan-amt{transition:transform .2s ease,opacity .2s ease;}';
document.head.appendChild(_ps);


// ── PLAN CALCULATOR ──────────────────────────────────────────────
(function () {
  const playersR = document.getElementById('playersRange');
  const ramR = document.getElementById('ramRange');
  const playV = document.getElementById('playersVal');
  const ramV = document.getElementById('ramVal');
  const ckMods = document.getElementById('ckMods');
  const ckCustom = document.getElementById('ckCustom');
  const ckPri = document.getElementById('ckPriority');
  const crName = document.getElementById('crName');
  const crWhy = document.getElementById('crWhy');
  const crPrice = document.getElementById('crPrice');
  if (!playersR) return;
  const plans = [
    { name: '👾 Pixel', price: 50, why: 'Perfect for a tiny vanilla server.' },
    { name: '🎋 Sugarcane Growth', price: 100, why: 'Good for small groups with a few plugins.' },
    { name: '🔨 Hammer Forge', price: 150, why: 'Ideal for medium friend groups.' },
    { name: '🛒 Store Pro', price: 200, why: 'Great for small communities.' },
    { name: '📝 Paper Elite', price: 310, why: 'Excellent for growing communities.' },
    { name: '❤️ Heart Infinity', price: 450, why: 'Maximum budget performance.' },
    { name: '🟫 Powerhouse — Dirt', price: 119, why: 'Entry AMD EPYC performance.' },
    { name: '🟩 Powerhouse — Grass', price: 249, why: 'Solid baseline for active servers.' },
    { name: '🪨 Powerhouse — Stone', price: 399, why: 'Great for established communities.' },
    { name: '⚫ Powerhouse — Coal', price: 549, why: 'High player cap with mods.' },
    { name: '⚪ Powerhouse — Iron', price: 699, why: 'Seamless heavy modpack experience.' },
    { name: '🔴 Powerhouse — Redstone', price: 899, why: 'For massive player bases.' },
    { name: '🟡 Powerhouse — Gold', price: 1099, why: 'Enterprise-grade community hosting.' },
    { name: '💎 Powerhouse — Diamond', price: 1299, why: 'Uncompromised top-tier performance.' },
    { name: '🟢 Powerhouse — Emerald', price: 1499, why: 'Extreme traffic and massive worlds.' },
    { name: '⬛ Powerhouse — Netherite', price: 1699, why: 'The absolute best for mega-networks.' }
  ];
  function calc() {
    const players = +playersR.value, ram = +ramR.value;
    const needsExtra = (ckMods && ckMods.checked) || (ckCustom && ckCustom.checked) || (ckPri && ckPri.checked);
    playV.textContent = players; ramV.textContent = ram;

    let planIndex = 0;
    if (needsExtra || players > 100 || ram > 16) {
      if (ram <= 4 && players <= 20) planIndex = 6;
      else if (ram <= 8 && players <= 40) planIndex = 8;
      else if (ram <= 12 && players <= 60) planIndex = 9;
      else if (ram <= 16 && players <= 80) planIndex = 10;
      else if (ram <= 20 && players <= 120) planIndex = 11;
      else if (ram <= 24 && players <= 150) planIndex = 13;
      else if (ram <= 28) planIndex = 14;
      else planIndex = 15;
    } else {
      if (ram <= 4 && players <= 15) planIndex = 0;
      else if (ram <= 8 && players <= 30) planIndex = 1;
      else if (ram <= 12 && players <= 50) planIndex = 2;
      else if (ram <= 16 && players <= 70) planIndex = 3;
      else if (ram <= 32 && players <= 100) planIndex = 4;
      else planIndex = 5;
    }

    let plan = plans[planIndex];
    crName.textContent = plan.name; crWhy.textContent = plan.why; crPrice.textContent = plan.price;
  }
  [playersR, ramR].forEach(el => el.addEventListener('input', calc));
  [ckMods, ckCustom, ckPri].forEach(el => { if (el) el.addEventListener('change', calc); });
  calc();
})();


// ── FAQ ACCORDION ────────────────────────────────────────────────
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => { o.classList.remove('open'); o.querySelector('.faq-ans').style.maxHeight = '0'; });
    if (!open) { item.classList.add('open'); item.querySelector('.faq-ans').style.maxHeight = item.querySelector('.faq-ans').scrollHeight + 'px'; }
  });
});


// ── GAME CARD TILT ───────────────────────────────────────────────
document.querySelectorAll('.game-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `translateY(-7px) rotateY(${x * 9}deg) rotateX(${-y * 7}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});


// ── BUTTON RIPPLE ────────────────────────────────────────────────
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const r = btn.getBoundingClientRect(), sz = Math.max(r.width, r.height);
    const rip = document.createElement('span');
    Object.assign(rip.style, { position: 'absolute', borderRadius: '50%', width: sz + 'px', height: sz + 'px', left: (e.clientX - r.left - sz / 2) + 'px', top: (e.clientY - r.top - sz / 2) + 'px', background: 'rgba(255,255,255,0.22)', transform: 'scale(0)', animation: 'rip .55s ease-out', pointerEvents: 'none' });
    btn.appendChild(rip); setTimeout(() => rip.remove(), 600);
  });
});
const rs = document.createElement('style');
rs.textContent = '@keyframes rip{to{transform:scale(2.8);opacity:0;}}';
document.head.appendChild(rs);


// ── PARALLAX on hero glows ───────────────────────────────────────
window.addEventListener('mousemove', e => {
  const mx = (e.clientX / innerWidth - .5) * 30, my = (e.clientY / innerHeight - .5) * 30;
  document.querySelectorAll('.hero-glow').forEach((g, i) => {
    const d = i === 0 ? 1 : -1;
    g.style.transform = `translate(${mx * d * .4}px, ${my * d * .4}px)`;
  });
}, { passive: true });


// ── DISCORD CARD hover glow ──────────────────────────────────────
const dc = document.querySelector('.discord-card');
if (dc) {
  dc.addEventListener('mouseenter', () => { dc.style.boxShadow = '0 0 60px rgba(88,101,242,0.3)'; });
  dc.addEventListener('mouseleave', () => { dc.style.boxShadow = ''; });
}
