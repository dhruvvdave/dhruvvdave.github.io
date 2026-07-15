// Theme toggle. The initial theme is set by an inline script in <head>
// before first paint; this only handles the button.
(function () {
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  var meta = document.getElementById('theme-meta');
  if (!button) return;

  function label() {
    var dark = root.dataset.theme === 'dark';
    button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    if (meta) meta.content = dark ? '#111111' : '#fcfcfc';
  }

  button.hidden = false; // useless without JS, so hidden until now
  label();

  button.addEventListener('click', function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
    label();
  });
})();

// Sidebar nav: mark the section currently in view.
(function () {
  var links = document.querySelectorAll('.side-nav a[href^="#"]');
  if (!links.length || !('IntersectionObserver' in window)) return;

  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (a) {
        var active = a === byId[entry.target.id];
        a.classList.toggle('active', active);
        if (active) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  Object.keys(byId).forEach(function (id) {
    var section = document.getElementById(id);
    if (section) observer.observe(section);
  });
})();
