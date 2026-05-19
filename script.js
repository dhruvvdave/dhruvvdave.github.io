/* ================================================
   Dhruv Dave — Portfolio Scripts
   ================================================ */

// ── Theme Toggle ──
(function () {
  const html   = document.documentElement;
  const btn    = document.getElementById('theme-btn');
  const meta   = document.getElementById('theme-meta');

  function getPreference() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function apply(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (meta) meta.content = theme === 'dark' ? '#0a0a0a' : '#ffffff';
  }

  apply(getPreference());

  if (btn) {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      apply(current === 'dark' ? 'light' : 'dark');
    });
  }
})();

// ── Mobile Nav ──
(function () {
  const toggle  = document.getElementById('nav-toggle');
  const links   = document.getElementById('nav-links');
  if (!toggle || !links) return;

  function close() {
    toggle.classList.remove('open');
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  links.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !links.contains(e.target)) close();
  });
})();

// ── Scroll Progress Bar ──
(function () {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;

  function update() {
    const max  = document.documentElement.scrollHeight - window.innerHeight;
    const pct  = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = pct + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ── Scroll to Top ──
(function () {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  function toggle() {
    btn.classList.toggle('visible', window.scrollY > 400);
  }

  window.addEventListener('scroll', toggle, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ── Active nav link on scroll ──
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(a => {
          const matches = a.getAttribute('href') === '#' + id;
          a.style.color   = matches ? 'var(--text)' : '';
          a.style.fontWeight = matches ? '500' : '';
        });
      }
    });
  }, { rootMargin: '-35% 0px -60% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
})();

// ── Reveal on scroll ──
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.05 });

  els.forEach(el => observer.observe(el));
})();

// ── Hide hero scroll indicator on scroll ──
(function () {
  const indicator = document.querySelector('.hero-scroll');
  if (!indicator) return;
  window.addEventListener('scroll', () => {
    indicator.style.opacity = window.scrollY > 60 ? '0' : '1';
  }, { passive: true });
})();
