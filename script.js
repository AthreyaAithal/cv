/* ============================================
   ATHREYA KR — CV WEBSITE
   script.js — Interactions & Animations
   ============================================ */

(function () {
  'use strict';

  /* ── Animated Background Canvas ─────────── */
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animFrame;

  function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.reset();
  }

  Particle.prototype.reset = function () {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 1.2 + 0.2;
    this.vx = (Math.random() - 0.5) * 0.18;
    this.vy = (Math.random() - 0.5) * 0.18;
    this.alpha = Math.random() * 0.6 + 0.1;
    this.color = Math.random() > 0.6
      ? `rgba(0, 229, 200, ${this.alpha})`
      : `rgba(129, 140, 248, ${this.alpha})`;
  };

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  function initParticles() {
    const count = Math.floor((W * H) / 14000);
    particles = Array.from({ length: Math.min(count, 100) }, () => new Particle());
  }

  function connectParticles() {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 229, 200, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    animFrame = requestAnimationFrame(animate);
  }

  function initCanvas() {
    resizeCanvas();
    initParticles();
    animate();
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  initCanvas();


  /* ── Navigation ─────────────────────────── */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-links a');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  const sections = document.querySelectorAll('section[id]');

  // Scrolled state
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightNav();
    toggleScrollTop();
  }, { passive: true });

  // Hamburger
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // Active nav highlight
  function highlightNav() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }


  /* ── Scroll Reveal ──────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ── Timeline Toggle ────────────────────── */
  window.toggleTimeline = function (header) {
    const card = header.closest('.timeline-card');
    const body = card.querySelector('.timeline-body');
    const btn = card.querySelector('.timeline-expand-btn');

    const isOpen = body.classList.contains('open');
    body.classList.toggle('open', !isOpen);
    btn.classList.toggle('open', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
  };

  // Auto-open the first timeline card (current role)
  const firstCard = document.querySelector('.timeline-card');
  if (firstCard) {
    const body = firstCard.querySelector('.timeline-body');
    const btn = firstCard.querySelector('.timeline-expand-btn');
    body.classList.add('open');
    btn.classList.add('open');
  }


  /* ── Skills Filter ──────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const expertiseCards = document.querySelectorAll('.expertise-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      expertiseCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(-10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 350);
        }
      });
    });
  });


  /* ── Scroll To Top ──────────────────────── */
  const scrollTopBtn = document.getElementById('scroll-top');

  function toggleScrollTop() {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ── Hero Stat Counter Animation ───────── */
  function animateCounters() {
    const counters = document.querySelectorAll('.hero-stat-num');

    counters.forEach(counter => {
      const text = counter.textContent;
      const numMatch = text.match(/\d+/);
      if (!numMatch) return;

      const target = parseInt(numMatch[0]);
      const sup = counter.querySelector('sup');
      const suffix = sup ? sup.textContent : '';
      let start = 0;
      const duration = 1800;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);

        counter.textContent = current;
        if (sup) {
          const newSup = document.createElement('sup');
          newSup.textContent = suffix;
          counter.appendChild(newSup);
        }

        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    });
  }

  // Trigger counter animation when hero is in view
  const heroSection = document.getElementById('hero');
  const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setTimeout(animateCounters, 600);
      heroObserver.unobserve(heroSection);
    }
  }, { threshold: 0.3 });

  heroObserver.observe(heroSection);


  /* ── Resume Download Placeholder ───────── */
  const resumeBtn = document.getElementById('resume-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Check if resume file exists; otherwise show message
      const link = document.createElement('a');
      link.href = 'assets/resume.pdf';
      link.download = 'Athreya_KR_Resume.pdf';
      link.click();
    });
  }


  /* ── Keyboard Navigation ────────────────── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });


  /* ── Smooth hover effect on skill chips ── */
  document.querySelectorAll('.skill-chip').forEach(chip => {
    chip.addEventListener('mouseenter', () => {
      chip.style.transform = 'translateY(-2px)';
    });
    chip.addEventListener('mouseleave', () => {
      chip.style.transform = '';
    });
  });


  /* ── Subtle cursor glow (desktop only) ─── */
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0,229,200,0.04) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -50%);
      transition: left 0.3s ease, top 0.3s ease;
    `;
    document.body.appendChild(glow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function updateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(updateGlow);
    }

    updateGlow();
  }

  console.log(
    '%c AKR CV — Built with precision. ',
    'background: #00E5C8; color: #05080F; font-size: 14px; font-weight: bold; padding: 8px 16px; border-radius: 4px;'
  );

})();
