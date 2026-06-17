import { bindKey, bindKeyCombo } from "@rwh/keystrokes";
if (!window.__handlers) window.__handlers = {};

(function() {
  var registry = window.__shortcutsRegistry || [];
  var overlay = document.getElementById("command-mode-overlay");
  var input = document.getElementById("command-mode-input");
  var list = document.getElementById("command-mode-list");
  if (!overlay || !input || !list) return;

  var filtered = [];
  var selectedIdx = -1;
  var history = [];
  var historyIdx = -1;

  function close() {
    overlay.classList.remove("is-active");
    input.value = "";
    input.blur();
    list.innerHTML = "";
    selectedIdx = -1;
    historyIdx = -1;
    if (window.setMode) window.setMode('NORMAL');
  }

  function render() {
    var q = input.value.toLowerCase().trim();
    if (!q) {
      filtered = registry.slice();
    } else {
      var bareNum = parseInt(q.replace(/^:/, ''), 10);
      var isLineNav = !isNaN(bareNum) && bareNum > 0;
      if (isLineNav) {
        filtered = q.indexOf(':') === 0
          ? [{ chord: q, desc: 'Go to line ' + bareNum }]
          : [{ chord: ':' + bareNum, desc: 'Go to line ' + bareNum }];
      } else {
        filtered = registry.filter(function(s) {
          return s.chord.toLowerCase().indexOf(q) > -1 || s.desc.toLowerCase().indexOf(q) > -1;
        });
      }
    }
    list.innerHTML = "";
    if (filtered.length === 0) {
      list.innerHTML = '<li class="cm-empty">No matching shortcuts</li>';
      selectedIdx = -1;
      return;
    }
    filtered.forEach(function(s, i) {
      var li = document.createElement("li");
      li.className = "cm-item" + (i === 0 ? " cm-selected" : "");
      var chordText = s.chord + ' ';
      var descText = s.desc;
      var q = input.value.toLowerCase().trim();
      if (q) {
        var cl = chordText.toLowerCase();
        var ci = cl.indexOf(q);
        if (ci > -1) {
          chordText = chordText.substring(0, ci) + '<mark class="search-highlight">' + chordText.substring(ci, ci + q.length) + '</mark>' + chordText.substring(ci + q.length);
        }
        var dl = descText.toLowerCase();
        var di = dl.indexOf(q);
        if (di > -1) {
          descText = descText.substring(0, di) + '<mark class="search-highlight">' + descText.substring(di, di + q.length) + '</mark>' + descText.substring(di + q.length);
        }
      }
      li.innerHTML = '<span class="cm-chord">' + chordText + '</span><span class="cm-desc">' + descText + '</span>';
      li.dataset.index = i;
      li.addEventListener("click", function() { execute(i); });
      li.addEventListener("mouseenter", function() {
        document.querySelectorAll(".cm-selected").forEach(function(el) { el.classList.remove("cm-selected"); });
        li.classList.add("cm-selected");
        selectedIdx = i;
      });
      list.appendChild(li);
    });
    selectedIdx = 0;
  }

  function processCommand(raw) {
    var parts = raw.trim().split(/\s+/);
    var cmd = parts[0];
    var arg = parts.slice(1).join(' ');

    if (cmd === ':q' || cmd === ':x' || cmd === 'q' || cmd === 'x') {
      close();
      ['shortcuts-popup-overlay', 'search-overlay', 'command-mode-overlay'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.classList.remove('is-active');
      });
      document.body.classList.remove('body-scroll-locked');
      if (window.setMode) window.setMode('NORMAL');
      if (window.showStatus) window.showStatus(cmd, 'Closed all overlays');
      return true;
    }

    if (cmd === ':theme' || cmd === 'theme') {
      if (arg === 'light' || arg === 'dark') {
        localStorage.setItem('theme', arg);
        document.body.className = 'theme-' + arg;
        if (window.showStatus) window.showStatus(cmd, 'Theme set to ' + arg);
      } else {
        if (window.showStatus) window.showStatus(cmd, 'Usage: theme light|dark');
      }
      return true;
    }

    if ((cmd === ':edit' || cmd === 'edit') && arg === 'settings') {
      window.location.href = '/portfolio/settings';
      return true;
    }

    var num = parseInt(raw.replace(/^:/, ''), 10);
    if (!isNaN(num) && num > 0) {
      var candidates = Array.from(document.querySelectorAll(window.__CANDIDATE_SELECTOR || '.content-wrapper > p, .content-wrapper > h1, .content-wrapper > h2, .content-wrapper > h3, .content-wrapper > h4, .content-wrapper > ul > li, .content-wrapper > ol > li, .content-wrapper > blockquote, .content-wrapper > pre, .content-wrapper > table'))
        .filter(function(el) { return el.getBoundingClientRect().height > 0; });
      if (num <= candidates.length) {
        var target = candidates[num - 1];
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (window.showStatus) window.showStatus(':' + num, 'Go to line ' + num);
      } else {
        if (window.showStatus) window.showStatus(':' + num, 'Only ' + candidates.length + ' elements');
      }
      return true;
    }

    return false;
  }

  function execute(idx) {
    if (idx < 0 || idx >= filtered.length) return;
    var s = filtered[idx];
    if (!processCommand(s.chord)) {
      close();
      var handlers = window.__handlers || {};
      if (s.chord !== ':' && handlers[s.chord]) {
        handlers[s.chord]();
        if (window.showStatus) {
          window.showStatus(s.chord, s.desc);
        }
      }
    }
  }

  function pushHistory(val) {
    if (!val) return;
    history.unshift(val);
    if (history.length > 50) history.pop();
    historyIdx = -1;
  }

  input.addEventListener("input", render);

  input.addEventListener("keydown", function(e) {
    e.stopPropagation();
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      if (window.showStatus) window.showStatus('Esc', 'Closed command palette');
    } else if (e.key === "Enter") {
      e.preventDefault();
      var raw = input.value;
      if (processCommand(raw)) {
        pushHistory(raw);
        close();
        return;
      }
      execute(selectedIdx >= 0 ? selectedIdx : 0);
      pushHistory(raw);
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (filtered.length > 0) {
        var target = filtered[selectedIdx >= 0 ? selectedIdx : 0];
        input.value = target.chord;
        render();
      }
    } else if (e.key === "ArrowDown" || (e.key === "n" && e.altKey)) {
      e.preventDefault();
      if (filtered.length === 0) return;
      var next = (selectedIdx + 1) % filtered.length;
      document.querySelectorAll(".cm-selected").forEach(function(el) { el.classList.remove("cm-selected"); });
      var items = list.querySelectorAll(".cm-item");
      if (items[next]) items[next].classList.add("cm-selected");
      selectedIdx = next;
    } else if (e.key === "ArrowUp" || (e.key === "p" && e.altKey)) {
      e.preventDefault();
      if (selectedIdx <= 0 && history.length > 0) {
        historyIdx = (historyIdx + 1) % history.length;
        input.value = history[historyIdx];
        render();
        return;
      }
      var prev = selectedIdx > 0 ? selectedIdx - 1 : filtered.length - 1;
      document.querySelectorAll(".cm-selected").forEach(function(el) { el.classList.remove("cm-selected"); });
      var items = list.querySelectorAll(".cm-item");
      if (items[prev]) items[prev].classList.add("cm-selected");
      selectedIdx = prev;
    }
  });

  overlay.addEventListener("click", function(e) {
    if (e.target === overlay) close();
  });

  window.openCommandMode = function() {
    overlay.classList.add("is-active");
    input.value = "";
    historyIdx = -1;
    render();
    input.focus();
    if (window.setMode) window.setMode('COMMAND');
    if (window.showStatus) window.showStatus(':', 'Opened command palette');
  };

  window.closeCommandMode = close;

  var colonHandler = function() {
    var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    window.openCommandMode();
  };

  window.__handlers[':'] = colonHandler;
  window.__handlers['ctrl+p'] = colonHandler;

  bindKey(':', window.__handlers[':']);
  bindKeyCombo('ctrl+p', window.__handlers['ctrl+p']);
})();
