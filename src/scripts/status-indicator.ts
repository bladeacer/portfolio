(function() {
  var el = document.getElementById("key-status");
  var chordEl = document.getElementById("key-status-chord");
  var descEl = document.getElementById("key-status-desc");
  var modeEl = document.getElementById("mode-indicator");

  // Restore status from sessionStorage
  try {
    var saved = sessionStorage.getItem("portfolio-last-status");
    if (saved) {
      var parsed = JSON.parse(saved);
      if (parsed.chord && el && chordEl && descEl) {
        chordEl.textContent = parsed.chord;
        descEl.textContent = parsed.desc ? " " + parsed.desc : "";
        el.style.display = "block";
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
    el.style.display = "block";
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

  // Mode indicator
  window.setMode = function(mode) {
    if (!modeEl) return;
    modeEl.textContent = mode;
  };

  if (modeEl) modeEl.textContent = 'NORMAL';
})();
