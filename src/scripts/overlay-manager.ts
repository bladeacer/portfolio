(function() {
  var overlays = [
    "search-overlay",
    "command-mode-overlay",
    "shortcuts-popup-overlay",
  ];

  var bodyScrollLocked = false;

  function checkLock() {
    var anyActive = overlays.some(function(id) {
      var el = document.getElementById(id);
      return el && el.classList.contains("is-active");
    });
    if (anyActive && !bodyScrollLocked) {
      document.body.classList.add("body-scroll-locked");
      bodyScrollLocked = true;
    } else if (!anyActive && bodyScrollLocked) {
      document.body.classList.remove("body-scroll-locked");
      bodyScrollLocked = false;
    }
  }

  // Watch class changes on overlay elements
  var observer = new MutationObserver(function() { checkLock(); });
  overlays.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el, { attributes: true, attributeFilter: ["class"] });
  });

  // Focus trap helper: returns a focusable children of active overlay
  function getFocusable(overlay) {
    if (!overlay) return [];
    return Array.from(overlay.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    ));
  }

  document.addEventListener("keydown", function(e) {
    if (e.key !== "Tab") return;
    var activeOverlay = null;
    for (var i = 0; i < overlays.length; i++) {
      var el = document.getElementById(overlays[i]);
      if (el && el.classList.contains("is-active")) {
        activeOverlay = el;
        break;
      }
    }
    if (!activeOverlay) return;
    var focusable = getFocusable(activeOverlay);
    if (focusable.length === 0) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // Expose helper for dynamic overlay toggling
  window.__checkOverlayLock = checkLock;
})();
