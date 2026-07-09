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
