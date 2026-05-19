/* ===================================================
   ADUNOLA BABADIYA — FULL STACK DEVELOPER PORTFOLIO
   Script v2.0
   =================================================== */

// === HERO CANVAS — Node graph background ===
(function() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], mouse = { x: -1000, y: -1000 };

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Node {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.size = Math.random() * 1.5 + 0.5;
      this.opacity = Math.random() * 0.6 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
      // Mouse repel
      const dx = this.x - mouse.x, dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        this.x += (dx / dist) * 1.2;
        this.y += (dy / dist) * 1.2;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(61,139,255,${this.opacity * 0.8})`;
      ctx.fill();
    }
  }

  function initNodes() {
    nodes = [];
    const count = Math.min(120, Math.floor((W * H) / 12000));
    for (let i = 0; i < count; i++) nodes.push(new Node());
  }

  function drawLines() {
    const maxDist = 150;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.25;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(61,139,255,${alpha})`;
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

  resize();
  initNodes();
  animate();

  window.addEventListener('resize', () => { resize(); initNodes(); });
  document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
})();

// === CUSTOM CURSOR ===
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

if (cursor && cursorDot) {
  let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

function reattachCursorHovers() {
  const targets = document.querySelectorAll('a, button, .work-card, .uiux-card, .mindset-card, .stack-col');
  targets.forEach(el => {
    el.addEventListener('mouseenter', () => cursor && cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor && cursor.classList.remove('hovering'));
  });
}
reattachCursorHovers();

// === NAV SCROLL ===
const mainNav = document.getElementById('mainNav');
if (mainNav) {
  window.addEventListener('scroll', () => {
    mainNav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// === MOBILE NAV ===
const mobileToggle = document.getElementById('mobileToggle');
const mobileNav = document.getElementById('mobileNav');

if (mobileToggle && mobileNav) {
  mobileToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
  mobileNav.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// === PAGE TRANSITIONS ===
function navigateTo(url) {
  const overlay = document.getElementById('pageOverlay');
  if (overlay) {
    overlay.classList.add('active');
    setTimeout(() => { window.location.href = url; }, 420);
  } else {
    window.location.href = url;
  }
}

window.addEventListener('load', () => {
  const overlay = document.getElementById('pageOverlay');
  if (overlay) overlay.classList.remove('active');
  document.body.classList.add('loaded');
});

// === SCROLL REVEAL ===
const revealEls = document.querySelectorAll('.reveal, .reveal-delay, .reveal-delay-2, .reveal-delay-3');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObs.observe(el));

// === STACK BAR REVEAL (animate bars on scroll) ===
const stackCols = document.querySelectorAll('.stack-col');
const stackObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      stackObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
stackCols.forEach(col => stackObs.observe(col));

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// === MARQUEE PAUSE ===
const marquee = document.querySelector('.marquee-inner');
if (marquee) {
  marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
  marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
}

// === WORK CARD TILT ===
document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 4}deg) rotateX(${-y * 2}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// === HERO HEADLINE GLITCH ON LOAD ===
window.addEventListener('load', () => {
  const accentLine = document.querySelector('.accent-line');
  if (accentLine) {
    setTimeout(() => {
      accentLine.style.opacity = '0.6';
      setTimeout(() => { accentLine.style.opacity = '1'; }, 80);
      setTimeout(() => { accentLine.style.opacity = '0.8'; }, 160);
      setTimeout(() => { accentLine.style.opacity = '1'; }, 240);
    }, 800);
  }
});
