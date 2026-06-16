(function() {
  var el = document.getElementById("key-status");
  var chordEl = document.getElementById("key-status-chord");
  var descEl = document.getElementById("key-status-desc");
  var modeEl = document.getElementById("mode-indicator");
  var scrollEl = document.getElementById("status-scroll");
  var pathEl = document.getElementById("status-path");
  var wordsEl = document.getElementById("status-words");
  var platformEl = document.getElementById("status-platform");

  // Detect platform from user agent
  if (platformEl) {
    var ua = navigator.userAgent;
    var name = '?';
    if (ua.indexOf('Linux') > -1 && ua.indexOf('Android') === -1) name = 'Linux';
    else if (ua.indexOf('Android') > -1) name = 'Android';
    else if (ua.indexOf('Windows') > -1) name = 'Windows';
    else if (ua.indexOf('Mac OS X') > -1 || ua.indexOf('macOS') > -1) name = 'macOS';
    else if (ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) name = 'iOS';
    else if (ua.indexOf('FreeBSD') > -1) name = 'FreeBSD';
    platformEl.textContent = name;
  }

  // Set page path
  if (pathEl) {
    pathEl.textContent = window.location.pathname.replace(/\/portfolio/, '').replace(/\/$/, '') || '/';
  }

  // Set word count
  if (wordsEl) {
    var bodyText = document.body.innerText || document.body.textContent || '';
    var wordCount = bodyText.trim().split(/\s+/).filter(Boolean).length;
    wordsEl.textContent = wordCount + ' words';
  }

  // Update scroll percentage on scroll
  function updateScroll() {
    if (!scrollEl) return;
    var scrollTop = window.scrollY;
    var docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    var winHeight = window.innerHeight;
    var maxScroll = docHeight - winHeight;
    var pct = maxScroll > 0 ? Math.round((scrollTop / maxScroll) * 100) : 0;
    scrollEl.textContent = pct + '%';
  }

  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  // Restore status from sessionStorage
  try {
    var saved = sessionStorage.getItem("portfolio-last-status");
    if (saved) {
      var parsed = JSON.parse(saved);
      if (parsed.chord && el && chordEl && descEl) {
        chordEl.textContent = parsed.chord;
        descEl.textContent = parsed.desc ? " " + parsed.desc : "";
        el.style.display = "";
        clearTimeout(el._hideTimeout);
        el._hideTimeout = setTimeout(function() {
          el.style.display = "none";
        }, 4000);
      }
      sessionStorage.removeItem("portfolio-last-status");
    }
  } catch {}

  window.showStatus = function(chord, desc, persistNav) {
    if (!el || !chordEl || !descEl) return;
    chordEl.textContent = chord;
    descEl.textContent = desc ? " " + desc : "";
    el.style.display = "";
    clearTimeout(el._hideTimeout);
    el._hideTimeout = setTimeout(function() {
      el.style.display = "none";
    }, 5000);
    if (persistNav) {
      try {
        sessionStorage.setItem("portfolio-last-status", JSON.stringify({chord: chord, desc: desc}));
      } catch {}
    }
  };

  window.setMode = function(mode) {
    if (!modeEl) return;
    modeEl.textContent = mode;
  };

  if (modeEl) modeEl.textContent = 'NORMAL';
})();
