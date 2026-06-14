(function() {
  var el = document.getElementById("key-status");
  if (!el) return;
  var chordEl = document.getElementById("key-status-chord");
  var descEl = document.getElementById("key-status-desc");

  window.showStatus = function(chord, desc) {
    if (!el || !chordEl || !descEl) return;
    chordEl.textContent = chord;
    descEl.textContent = desc ? " " + desc : "";
    el.style.display = "block";
    clearTimeout(el._hideTimeout);
    el._hideTimeout = setTimeout(function() {
      el.style.display = "none";
    }, 5000);
  };
})();
