import { bindKey, bindKeyCombo } from "@rwh/keystrokes";

function showStatus(chord, desc, persistNav) {
  if (window.showStatus) window.showStatus(chord, desc, persistNav);
}

var BLANK_FEATURES = 'noopener,noreferrer';

if (!window.__handlers) window.__handlers = {};

function reg(chord, fn) {
  window.__handlers[chord] = fn;
}

function captureKeyWithGuard(key, prefixKey, fn) {
  document.addEventListener('keydown', function(e) {
    if (e.key !== key || e.ctrlKey || e.metaKey) return;
    var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    if (window.__seqPrefixKey === prefixKey) {
      window.__clearSeqPrefix();
      return;
    }
    fn();
  }, true);
}

reg('t', function() {
  window.toggleTheme();
  showStatus('t', 'Toggled theme');
});

bindKey('t', window.__handlers['t']);

reg('?', function() {
  if (window.toggleShortcutsPopup) {
    window.toggleShortcutsPopup();
    showStatus('?', 'Opened shortcuts popup');
  }
});

bindKey('?', window.__handlers['?']);

reg('o', function() {
  var btn = document.getElementById("toc-mobile-toggle");
  if (btn && btn.offsetParent !== null) {
    btn.click();
  } else {
    var wrapper = document.getElementById("toc-wrapper");
    if (wrapper) {
      if (wrapper.style.display === 'none') {
        wrapper.style.removeProperty('display');
      } else {
        wrapper.style.display = 'none';
      }
    }
  }
  showStatus('o', 'Toggled table of contents');
});

bindKey('o', window.__handlers['o']);

reg('s', function() {
  window.location.href = "/portfolio/settings";
  showStatus('s', 'Opened settings', true);
});

bindKey('s', window.__handlers['s']);

reg('ctrl+,', function() {
  window.location.href = "/portfolio/settings";
  showStatus('ctrl+,', 'Opened settings', true);
});

bindKeyCombo('ctrl+\\,', window.__handlers['ctrl+,']);

reg('e m', function() {
  window.open("mailto:wg.nick.exe@gmail.com", '_blank', BLANK_FEATURES);
  showStatus('em', 'Opened email link');
});

bindKeyCombo('e, m', window.__handlers['e m']);

reg('m', function() {
  window.open("https://matrix.to/#/@bladeacer:matrix.org", '_blank', BLANK_FEATURES);
  showStatus('m', 'Opened Matrix chat');
});

captureKeyWithGuard('m', 'e', window.__handlers['m']);

reg('g h', function() {
  window.open("https://github.com/bladeacer", '_blank', BLANK_FEATURES);
  showStatus('gh', 'Opened GitHub');
});

bindKeyCombo('g, h', window.__handlers['g h']);

reg('g l', function() {
  window.open("https://gitlab.com/bladeacer", '_blank', BLANK_FEATURES);
  showStatus('gl', 'Opened GitLab');
});

bindKeyCombo('g, l', window.__handlers['g l']);

reg('b', function() {
  window.open("https://codeberg.org/bladeacer", '_blank', BLANK_FEATURES);
  showStatus('b', 'Opened Codeberg');
});

bindKey('b', window.__handlers['b']);

reg('g r', function() {
  window.open("https://gravatar.com/objectoriginal8f1e7ecf6f", '_blank', BLANK_FEATURES);
  showStatus('gr', 'Opened Gravatar');
});

bindKeyCombo('g, r', window.__handlers['g r']);

reg('l i', function() {
  window.open("https://www.linkedin.com/in/nicholas-wen-a525832b2/", '_blank', BLANK_FEATURES);
  showStatus('li', 'Opened LinkedIn');
});

bindKeyCombo('l, i', window.__handlers['l i']);

reg('h', function() {
  window.location.href = "/portfolio";
  showStatus('h', 'Navigated home', true);
});

captureKeyWithGuard('h', 'g', window.__handlers['h']);

reg('a', function() {
  window.location.href = "/portfolio/about";
  showStatus('a', 'Navigated to about', true);
});

bindKey('a', window.__handlers['a']);

reg('d', function() {
  window.location.href = "/portfolio/digital-garden";
  showStatus('d', 'Navigated to digital garden', true);
});

bindKey('d', window.__handlers['d']);

reg('c', function() {
  window.location.href = "/portfolio/credits";
  showStatus('c', 'Navigated to credits', true);
});

bindKey('c', window.__handlers['c']);

reg('#', function() {
  window.location.href = "/portfolio/tags";
  showStatus('#', 'Navigated to tags', true);
});

bindKey('#', window.__handlers['#']);

reg('!', function() {
  window.open("/portfolio/rss.xml", '_blank', BLANK_FEATURES);
  showStatus('!', 'Opened RSS feed');
});

bindKey('!', window.__handlers['!']);

// r key — use capture-phase to check ctrlKey/metaKey
window.__handlers['r'] = function() {
  var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
  window.open("/portfolio/resume", '_blank', BLANK_FEATURES);
  showStatus('r', 'Opened resume');
};
document.addEventListener('keydown', function(e) {
  if (e.key !== 'r' || e.ctrlKey || e.metaKey) return;
  var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
  window.open("/portfolio/resume", '_blank', BLANK_FEATURES);
  showStatus('r', 'Opened resume');
}, true);

reg('<', function() {
  history.back();
  showStatus('<', 'History back', true);
});

bindKey('<', window.__handlers['<']);

reg('>', function() {
  history.forward();
  showStatus('>', 'History forward', true);
});

bindKey('>', window.__handlers['>']);

reg('f', function() {
  var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
  if (window.openSearch) window.openSearch();
  showStatus('f', 'Opened search');
});

bindKey('f', window.__handlers['f']);

reg('esc', function() {
  if (window.toggleShortcutsPopup) {
    var popupOverlay = document.getElementById("shortcuts-popup-overlay");
    if (popupOverlay && popupOverlay.classList.contains("is-active")) {
      popupOverlay.classList.remove("is-active");
      showStatus('Esc', 'Closed popup');
      return;
    }
  }
  if (window.closeCommandMode) {
    var cmdOverlay = document.getElementById("command-mode-overlay");
    if (cmdOverlay && cmdOverlay.classList.contains("is-active")) {
      window.closeCommandMode();
      showStatus('Esc', 'Closed command palette');
      return;
    }
  }
  if (window.closeSearch) {
    var searchOverlay = document.getElementById("search-overlay");
    if (searchOverlay && searchOverlay.classList.contains("is-active")) {
      window.closeSearch();
      showStatus('Esc', 'Closed search');
      return;
    }
  }
  showStatus('Esc', 'Cancelled');
});

bindKey('escape', window.__handlers['esc']);
