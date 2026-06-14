(function() {
  var el = document.getElementById("key-status");
  if (!el) return;
  var chordEl = document.getElementById("key-status-chord");
  var descEl = document.getElementById("key-status-desc");

  // Restore status from sessionStorage if we navigated here
  try {
    var saved = sessionStorage.getItem("portfolio-last-status");
    if (saved) {
      var parsed = JSON.parse(saved);
      if (parsed.chord) {
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
  } catch(e) {}

  window.showStatus = function(chord, desc, persistNav) {
    if (!el || !chordEl || !descEl) return;
    chordEl.textContent = chord;
    descEl.textContent = desc ? " " + desc : "";
    el.style.display = "block";
    clearTimeout(el._hideTimeout);
    el._hideTimeout = setTimeout(function() {
      el.style.display = "none";
    }, 5000);
    // If this navigation will reload the page, persist status
    if (persistNav) {
      try {
        sessionStorage.setItem("portfolio-last-status", JSON.stringify({chord: chord, desc: desc}));
      } catch(e) {}
    }
  };
})();
