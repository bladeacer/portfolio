(function() {
  var Mousetrap = window.Mousetrap;
  var registry = window.__shortcutsRegistry || [];
  var overlay = document.getElementById("command-mode-overlay");
  var input = document.getElementById("command-mode-input");
  var list = document.getElementById("command-mode-list");
  if (!overlay || !input || !list) return;

  var filtered = [];
  var selectedIdx = -1;

  function close() {
    overlay.classList.remove("is-active");
    overlay.style.display = "";
    input.value = "";
    list.innerHTML = "";
    selectedIdx = -1;
    if (window.setMode) window.setMode('NOR');
  }

  function render() {
    var q = input.value.toLowerCase().trim();
    if (!q) {
      filtered = registry.slice();
    } else {
      filtered = registry.filter(function(s) {
        return s.chord.toLowerCase().indexOf(q) > -1 || s.desc.toLowerCase().indexOf(q) > -1;
      });
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
      li.innerHTML = '<span class="cm-chord">' + s.chord + '</span><span class="cm-desc">' + s.desc + '</span>';
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

  function execute(idx) {
    if (idx < 0 || idx >= filtered.length) return;
    var s = filtered[idx];
    close();
    if (Mousetrap && s.chord !== ':') {
      Mousetrap.trigger(s.chord);
      if (window.showStatus) {
        window.showStatus(s.chord, s.desc);
      }
    }
  }

  input.addEventListener("input", render);

  input.addEventListener("keydown", function(e) {
    // Stop propagation so Mousetrap doesn't also fire
    e.stopPropagation();
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      if (window.showStatus) window.showStatus('Esc', 'Cancelled');
    } else if (e.key === "Enter") {
      e.preventDefault();
      execute(selectedIdx >= 0 ? selectedIdx : 0);
    } else if (e.key === "ArrowDown" || (e.key === "n" && e.ctrlKey)) {
      e.preventDefault();
      if (filtered.length === 0) return;
      var next = (selectedIdx + 1) % filtered.length;
      document.querySelectorAll(".cm-selected").forEach(function(el) { el.classList.remove("cm-selected"); });
      var items = list.querySelectorAll(".cm-item");
      if (items[next]) items[next].classList.add("cm-selected");
      selectedIdx = next;
    } else if (e.key === "ArrowUp" || (e.key === "p" && e.ctrlKey)) {
      e.preventDefault();
      if (filtered.length === 0) return;
      var prev = (selectedIdx - 1 + filtered.length) % filtered.length;
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
    overlay.style.display = "";
    input.value = "";
    render();
    input.focus();
    if (window.setMode) window.setMode('CMD');
  };

  window.closeCommandMode = close;

  // Bind : to open command mode
  Mousetrap.bind(':', function() {
    var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    window.openCommandMode();
    return false;
  });
})();
