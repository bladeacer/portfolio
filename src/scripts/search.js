import FlexSearch from 'flexsearch';

(function() {
  var Mousetrap = window.Mousetrap;
  var overlay = document.getElementById("search-overlay");
  var input = document.getElementById("search-input");
  var list = document.getElementById("search-results");
  var noResults = document.getElementById("search-no-results");
  if (!overlay || !input || !list) return;

  var index = null;
  var pages = [];
  var selectedIdx = -1;

  function close() {
    overlay.style.display = "none";
    input.value = "";
    list.innerHTML = "";
    if (noResults) noResults.style.display = "none";
    selectedIdx = -1;
  }

  function buildIndex() {
    // Collect page data from links in navigation and content
    var docId = 0;
    var docs = [];
    var navLinks = document.querySelectorAll('.nav-links a, .content-wrapper a[href^="/portfolio/"]');
    var seen = {};
    navLinks.forEach(function(a) {
      var href = a.getAttribute("href");
      if (!href || href.indexOf("/portfolio/") !== 0) return;
      if (seen[href]) return;
      seen[href] = true;
      var text = a.textContent.replace(/\[.*?\]/g, "").trim();
      docs.push({ id: docId++, title: text || "Page", url: href, content: text });
    });

    // Index current page content
    var contentEl = document.querySelector(".content-wrapper");
    if (contentEl) {
      var text = contentEl.textContent || "";
      text = text.replace(/\s+/g, " ").trim().substring(0, 5000);
      var title = document.title || "";
      docs.push({ id: docId++, title: title, url: window.location.pathname, content: text });
    }

    pages = docs;
    index = new FlexSearch.Document({
      document: {
        id: "id",
        index: ["title", "content"],
        store: ["title", "url"]
      }
    });
    docs.forEach(function(d) { index.add(d); });
  }

  function render(results) {
    list.innerHTML = "";
    if (noResults) noResults.style.display = "none";
    if (!results || results.length === 0) {
      if (noResults) noResults.style.display = "block";
      selectedIdx = -1;
      return;
    }
    results.forEach(function(r, i) {
      var li = document.createElement("li");
      li.className = "search-result-item" + (i === 0 ? " search-selected" : "");
      li.innerHTML = '<a href="' + r.url + '">' + r.title + "</a>";
      li.dataset.url = r.url;
      li.addEventListener("click", function() { navigate(r.url); });
      li.addEventListener("mouseenter", function() {
        document.querySelectorAll(".search-selected").forEach(function(el) { el.classList.remove("search-selected"); });
        li.classList.add("search-selected");
        selectedIdx = i;
      });
      list.appendChild(li);
    });
    selectedIdx = 0;
  }

  function navigate(url) {
    close();
    window.location.href = url;
  }

  function doSearch() {
    var q = input.value.trim();
    if (!q || !index) {
      render([]);
      return;
    }
    var raw = index.search(q, { limit: 10 });
    var results = [];
    var seenUrls = {};
    // Flatten results from multi-field search
    if (raw && raw.length) {
      raw.forEach(function(fieldRes) {
        if (fieldRes.result) {
          fieldRes.result.forEach(function(id) {
            var p = pages[id];
            if (p && !seenUrls[p.url]) {
              seenUrls[p.url] = true;
              results.push({ title: p.title, url: p.url });
            }
          });
        }
      });
    }
    // Also search by direct string matching as fallback
    if (results.length === 0) {
      var lower = q.toLowerCase();
      pages.forEach(function(p) {
        if (p.title.toLowerCase().indexOf(lower) > -1 && !seenUrls[p.url]) {
          seenUrls[p.url] = true;
          results.push({ title: p.title, url: p.url });
        }
      });
    }
    render(results.slice(0, 10));
  }

  input.addEventListener("input", doSearch);

  input.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      if (window.showStatus) window.showStatus('Esc', 'Cancelled');
    } else if (e.key === "Enter") {
      e.preventDefault();
      var items = list.querySelectorAll(".search-result-item");
      if (selectedIdx >= 0 && items[selectedIdx]) {
        navigate(items[selectedIdx].dataset.url);
      } else if (items[0]) {
        navigate(items[0].dataset.url);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      var items = list.querySelectorAll(".search-result-item");
      if (items.length === 0) return;
      var next = (selectedIdx + 1) % items.length;
      document.querySelectorAll(".search-selected").forEach(function(el) { el.classList.remove("search-selected"); });
      if (items[next]) items[next].classList.add("search-selected");
      selectedIdx = next;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      var items = list.querySelectorAll(".search-result-item");
      if (items.length === 0) return;
      var prev = (selectedIdx - 1 + items.length) % items.length;
      document.querySelectorAll(".search-selected").forEach(function(el) { el.classList.remove("search-selected"); });
      if (items[prev]) items[prev].classList.add("search-selected");
      selectedIdx = prev;
    }
  });

  // Stop propagation to prevent vimlike/shortcuts from firing
  input.addEventListener("keydown", function(e) {
    e.stopPropagation();
  }, true);

  overlay.addEventListener("click", function(e) {
    if (e.target === overlay) close();
  });

  window.openSearch = function() {
    if (!index) buildIndex();
    overlay.style.display = "flex";
    input.value = "";
    list.innerHTML = "";
    if (noResults) noResults.style.display = "none";
    selectedIdx = -1;
    setTimeout(function() { input.focus(); }, 50);
  };

  window.closeSearch = close;

  // Bind / to open search
  Mousetrap.bind('/', function() {
    var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    window.openSearch();
    return false;
  });

  // Search icon button click handler
  document.getElementById("search-icon-btn")?.addEventListener("click", function(e) {
    e.preventDefault();
    window.openSearch();
  });
})();
