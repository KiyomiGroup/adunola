/* ===================================================
   ADUNOLA BABADIYA — Full Stack Developer Portfolio
   script.js v3.0
   =================================================== */

// Pre-init theme accent so canvas uses correct color from first frame
window._themeAccent = (function() {
  const saved = (typeof localStorage !== 'undefined' && localStorage.getItem('adunola-theme')) || 'dark';
  const map = { dark:[61,139,255], light:[29,111,232], neon:[0,255,180], glass:[167,139,250] };
  return map[saved] || [61,139,255];
})();

// === HERO CANVAS — animated node graph ===
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [];
  const mouse = { x: -9999, y: -9999 };

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Node {
    constructor() { this.reset(true); }
    reset(init) {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 1.4 + 0.5;
      this.alpha = Math.random() * 0.55 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
      const dx = this.x - mouse.x, dy = this.y - mouse.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 110) { this.x += dx / d * 1.4; this.y += dy / d * 1.4; }
    }
    draw() {
      const [r, g, b] = window._themeAccent || [61, 139, 255];
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${this.alpha * 0.75})`;
      ctx.fill();
    }
  }

  function init() {
    nodes = [];
    const n = Math.min(130, Math.floor((W * H) / 11000));
    for (let i = 0; i < n; i++) nodes.push(new Node());
  }

  function drawLines() {
    const max = 145;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < max) {
          ctx.beginPath();
          const [lr, lg, lb] = window._themeAccent || [61, 139, 255];
          ctx.strokeStyle = `rgba(${lr},${lg},${lb},${(1 - d / max) * 0.22})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    nodes.forEach(n => { n.update(); n.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }

  resize(); init(); animate();
  window.addEventListener('resize', () => { resize(); init(); });
  document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
})();


// === CUSTOM CURSOR ===
const cursorEl = document.getElementById('cursor');
const dotEl = document.getElementById('cursorDot');
if (cursorEl && dotEl) {
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dotEl.style.left = mx + 'px';
    dotEl.style.top = my + 'px';
  });
  (function animateCursor() {
    cx += (mx - cx) * 0.1;
    cy += (my - cy) * 0.1;
    cursorEl.style.left = cx + 'px';
    cursorEl.style.top = cy + 'px';
    requestAnimationFrame(animateCursor);
  })();

  function attachHovers() {
    document.querySelectorAll('a, button, .work-card, .uiux-card, .mindset-card, .stack-col, .process-step').forEach(el => {
      el.addEventListener('mouseenter', () => cursorEl.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursorEl.classList.remove('hovering'));
    });
  }
  attachHovers();
}


// === NAV SCROLL ===
const mainNav = document.getElementById('mainNav');
if (mainNav) {
  const onScroll = () => mainNav.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}


// === MOBILE NAV ===
const mobileToggle = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileClose');

function openMobileNav() {
  if (!mobileNav) return;
  mobileNav.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  if (!mobileNav) return;
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

if (mobileToggle) mobileToggle.addEventListener('click', openMobileNav);
if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
if (mobileNav) {
  mobileNav.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMobileNav));
  // Close on backdrop click
  mobileNav.addEventListener('click', e => { if (e.target === mobileNav) closeMobileNav(); });
}


// === PAGE TRANSITIONS ===
function navigateTo(url) {
  const overlay = document.getElementById('pageOverlay');
  if (overlay) {
    overlay.classList.add('active');
    setTimeout(() => { window.location.href = url; }, 400);
  } else {
    window.location.href = url;
  }
}

window.addEventListener('load', () => {
  const overlay = document.getElementById('pageOverlay');
  if (overlay) {
    requestAnimationFrame(() => overlay.classList.remove('active'));
  }
  document.body.classList.add('loaded');
});


// === SCROLL REVEAL ===
const revealEls = document.querySelectorAll('.reveal, .reveal-delay, .reveal-delay-2, .reveal-delay-3');
if (revealEls.length) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
  revealEls.forEach(el => obs.observe(el));
}


// === STACK BARS ANIMATION ===
const stackCols = document.querySelectorAll('.stack-col');
if (stackCols.length) {
  const stackObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        stackObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  stackCols.forEach(c => stackObs.observe(c));
}


// === SMOOTH SCROLL for anchor links ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});


// === MARQUEE PAUSE ===
const marquee = document.querySelector('.marquee-inner');
if (marquee) {
  marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
  marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
}


// === CARD 3D TILT ===
document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 2}deg) translateY(-5px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});


// === HERO GLITCH on load ===
window.addEventListener('load', () => {
  const al = document.querySelector('.accent-line');
  if (al) {
    setTimeout(() => {
      [0, 80, 160, 240].forEach((t, i) => {
        setTimeout(() => { al.style.opacity = i % 2 === 0 ? '0.5' : '1'; }, t);
      });
    }, 900);
  }
});


// ===================== THEME SWITCHER =====================
const THEME_KEY = 'adunola-theme';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);

  // Update active button
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
  });

  // Update canvas behavior for light theme
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    if (theme === 'light') {
      canvas.style.filter = 'invert(1) hue-rotate(180deg)';
      canvas.style.opacity = '0.06';
    } else if (theme === 'neon') {
      canvas.style.filter = 'none';
      canvas.style.opacity = '0.5';
    } else if (theme === 'glass') {
      canvas.style.filter = 'none';
      canvas.style.opacity = '0.2';
    } else {
      canvas.style.filter = 'none';
      canvas.style.opacity = '0.3';
    }
  }

  // Re-color node graph accent for neon/glass themes
  window._themeAccent = {
    dark:  [61, 139, 255],
    light: [29, 111, 232],
    neon:  [0, 255, 180],
    glass: [167, 139, 250],
  }[theme] || [61, 139, 255];
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(saved);
}

document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    applyTheme(btn.getAttribute('data-theme'));
  });
});

initTheme();
