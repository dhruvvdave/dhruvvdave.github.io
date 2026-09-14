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

  // A callback only carries the sections whose state just changed, so track
  // them all and re-derive the active one every time; reading the entries
  // alone leaves the highlight stale when a section leaves the band and its
  // neighbour was already sitting in it.
  //
  // Projects is several screens tall, so it overlaps the band long after the
  // next section has reached it. When several overlap, the furthest down the
  // page is the one just scrolled into, so walk the list backwards.
  var visible = {};

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      visible[entry.target.id] = entry.isIntersecting;
    });
    if (atBottom()) return;
    for (var i = ids.length - 1; i >= 0; i--) {
      if (visible[ids[i]]) {
        setActive(ids[i]);
        return;
      }
    }
  }, { rootMargin: '-25% 0px -65% 0px' });

  ids.forEach(function (id) {
    var section = document.getElementById(id);
    if (section) observer.observe(section);
  });

  window.addEventListener('scroll', function () {
    if (atBottom()) setActive(lastId);
  }, { passive: true });
})();
