// Theme toggle. The initial theme is set by an inline script in <head>
// before first paint; this only handles the button.
(function () {
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  var meta = document.getElementById('theme-meta');
  if (!button) return;

  function label() {
    var dark = root.dataset.theme !== 'light';
    button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    if (meta) meta.content = dark ? '#0a0a0b' : '#f7f5f1';
  }

  button.hidden = false; // useless without JS, so hidden until now
  label();

  button.addEventListener('click', function () {
    var next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
    label();
  });
})();

// Top nav: mark the section currently in view.
(function () {
  var links = document.querySelectorAll('.site-nav a[href^="#"]');
  if (!links.length || !('IntersectionObserver' in window)) return;

  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });

  var ids = Object.keys(byId);
  var lastId = ids[ids.length - 1];

  function setActive(id) {
    links.forEach(function (a) {
      var active = a === byId[id];
      a.classList.toggle('active', active);
      if (active) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  // The last section can sit below the observer band and never trigger,
  // because the page runs out of scroll before it gets there. Once we are
  // at the bottom, the last section is what you are looking at.
  function atBottom() {
    return window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;
  }

  var observer = new IntersectionObserver(function (entries) {
    if (atBottom()) return;
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      setActive(entry.target.id);
    });
  }, { rootMargin: '-25% 0px -65% 0px' });

  ids.forEach(function (id) {
    var section = document.getElementById(id);
    if (section) observer.observe(section);
  });

  window.addEventListener('scroll', function () {
    if (atBottom()) setActive(lastId);
  }, { passive: true });
})();
