/* ===================================================
   ADUNOLA BABADIYA — PORTFOLIO SCRIPT
   =================================================== */

// === CUSTOM CURSOR ===
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

if (cursor && cursorDot) {
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverTargets = document.querySelectorAll('a, button, .work-card, .world-chip, .vibe-exp-card, .cs-next-card, .map-node, .map-center-node');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
}

// === NAV SCROLL STATE ===
const mainNav = document.getElementById('mainNav') || document.querySelector('.nav');
if (mainNav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
  });
}

// === SYSTEM MAP ===
const systemMap = document.getElementById('systemMap');
const openMapBtns = [
  document.getElementById('openSystemMap'),
  document.getElementById('ctaOpenMap')
];
const mapClose = document.getElementById('mapClose');

openMapBtns.forEach(btn => {
  if (btn) {
    btn.addEventListener('click', () => {
      systemMap.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
});

if (mapClose && systemMap) {
  mapClose.addEventListener('click', () => {
    systemMap.classList.remove('active');
    document.body.style.overflow = '';
  });

  systemMap.addEventListener('click', (e) => {
    if (e.target === systemMap) {
      systemMap.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      systemMap.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// === PAGE TRANSITION NAVIGATION ===
function navigateTo(url) {
  const overlay = document.getElementById('pageOverlay');
  if (overlay) {
    overlay.classList.add('active');
    setTimeout(() => {
      window.location.href = url;
    }, 400);
  } else {
    window.location.href = url;
  }
}

// Page enter animation
window.addEventListener('load', () => {
  const overlay = document.getElementById('pageOverlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
  document.body.classList.add('loaded');
});

// === SCROLL REVEAL ===
const revealElements = document.querySelectorAll('.reveal, .reveal-delay, .reveal-delay-2, .reveal-delay-3');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// === SMOOTH SCROLL ANCHOR ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// === MARQUEE PAUSE ON HOVER ===
const marquee = document.querySelector('.marquee-inner');
if (marquee) {
  marquee.addEventListener('mouseenter', () => {
    marquee.style.animationPlayState = 'paused';
  });
  marquee.addEventListener('mouseleave', () => {
    marquee.style.animationPlayState = 'running';
  });
}

// === WORK CARD HOVER TILT ===
document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 3}deg) rotateX(${-y * 2}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// === VIBE LAB INTERACTIVE BACKGROUND (if present) ===
const vibeCanvas = document.getElementById('vibeCanvas');
if (vibeCanvas) {
  const ctx = vibeCanvas.getContext('2d');
  let w = vibeCanvas.width = window.innerWidth;
  let h = vibeCanvas.height = window.innerHeight;
  let particles = [];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.color = `rgba(200,169,110,${this.opacity})`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < 120; i++) particles.push(new Particle());

  function animateVibe() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateVibe);
  }
  animateVibe();

  window.addEventListener('resize', () => {
    w = vibeCanvas.width = window.innerWidth;
    h = vibeCanvas.height = window.innerHeight;
  });

  vibeCanvas.addEventListener('mousemove', (e) => {
    particles.slice(0, 10).forEach(p => {
      p.x = e.clientX + (Math.random() - 0.5) * 100;
      p.y = e.clientY + (Math.random() - 0.5) * 100;
      p.speedX = (Math.random() - 0.5) * 1.5;
      p.speedY = (Math.random() - 0.5) * 1.5;
    });
  });
}

// === CURSOR HOVER REATTACH for dynamically-styled elements ===
function reattachCursorHovers() {
  const allInteractive = document.querySelectorAll('a, button, .work-card, .world-chip, .vibe-exp-card, .cs-next-card, .map-node, .map-center-node, .service-item, .exp-item');
  allInteractive.forEach(el => {
    el.addEventListener('mouseenter', () => cursor && cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('hovering'));
  });
}
reattachCursorHovers();
