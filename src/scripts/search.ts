import FlexSearch from 'flexsearch';

(function() {
  var overlay = document.getElementById("search-overlay");
  var input = document.getElementById("search-input");
  var list = document.getElementById("search-results");
  var noResults = document.getElementById("search-no-results");
  if (!overlay || !input || !list) return;

  var index = null;
  var pages = [];
  var selectedIdx = -1;
  var loaded = false;

  function close() {
    overlay.classList.remove("is-active");
    input.value = "";
    list.innerHTML = "";
    if (noResults) noResults.style.display = "none";
    selectedIdx = -1;
    if (window.setMode) window.setMode('NORMAL');
  }

  function loadIndex(callback) {
    if (loaded) { if (callback) callback(); return; }
    fetch('/portfolio/search-index.json')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        pages = data || [];
        index = new FlexSearch.Document({
          document: {
            id: 'id',
            index: [{
              field: 'title',
              tokenize: 'forward',
              resolution: 9,
              cache: true,
            }, {
              field: 'content',
              tokenize: 'full',
              resolution: 5,
              cache: true,
            }],
            store: ['title', 'url']
          },
          cache: true,
        });
        pages.forEach(function(p, i) {
          index.add({ id: i, title: p.title, content: p.content, url: p.url });
        });
        loaded = true;
        if (callback) callback();
      })
      .catch(function() {
        // Fallback: use basic local data
        pages = [{ title: 'Home', url: '/portfolio/', content: '' }];
        if (callback) callback();
      });
  }

  function render(results) {
    list.innerHTML = '';
    if (noResults) noResults.style.display = 'none';
    if (!results || results.length === 0) {
      if (noResults) noResults.style.display = 'block';
      selectedIdx = -1;
      return;
    }
    var q = input.value.trim().toLowerCase();
    results.forEach(function(r, i) {
      var li = document.createElement('li');
      li.className = 'search-result-item' + (i === 0 ? ' search-selected' : '');
      var displayLabel = r.breadcrumb ? r.breadcrumb + ' > ' + r.title : r.title;
      var displayLower = displayLabel.toLowerCase();
      if (q && displayLower.indexOf(q) > -1) {
        var idx = displayLower.indexOf(q);
        displayLabel = displayLabel.substring(0, idx) + '<mark class="search-highlight">' + displayLabel.substring(idx, idx + q.length) + '</mark>' + displayLabel.substring(idx + q.length);
      }
      var snippetHtml = '';
      if (q && r.snippet) {
        var sLower = r.snippet.toLowerCase();
        var sIdx = sLower.indexOf(q);
        if (sIdx > -1) {
          snippetHtml = r.snippet.substring(0, sIdx) + '<mark class="search-highlight">' + r.snippet.substring(sIdx, sIdx + q.length) + '</mark>' + r.snippet.substring(sIdx + q.length);
        }
      }
      // If title matched but no content snippet, show first chars as preview
      if (!snippetHtml && r.title && r.title.toLowerCase().indexOf(q) > -1 && r.preview) {
        snippetHtml = r.preview;
      }
      li.innerHTML = '<a href="' + r.url + '">' + displayLabel + '</a>' + (snippetHtml ? '<div class="search-snippet">' + snippetHtml + '</div>' : '');
      li.dataset.url = r.url;
      li.addEventListener('click', function() { navigate(r.url); });
      li.addEventListener('mouseenter', function() {
        document.querySelectorAll('.search-selected').forEach(function(el) { el.classList.remove('search-selected'); });
        li.classList.add('search-selected');
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

  function extractSnippet(content, query, maxLen) {
    maxLen = maxLen || 120;
    var lower = content.toLowerCase();
    var idx = lower.indexOf(query.toLowerCase());
    if (idx === -1) return '';
    var start = Math.max(0, idx - Math.floor((maxLen - query.length) / 2));
    var end = Math.min(content.length, start + maxLen);
    var snippet = content.substring(start, end);
    if (start > 0) snippet = '...' + snippet;
    if (end < content.length) snippet = snippet + '...';
    return snippet;
  }

  function doSearch() {
    var q = input.value.trim();
    if (!q || !index) {
      render([]);
      return;
    }
    var results = [];
    var seenUrls = {};
    var lower = q.toLowerCase();
    // FlexSearch index search (with try/catch so fallback still runs)
    try {
      var raw = index.search(q, { limit: 20 });
      if (raw && raw.length) {
        raw.forEach(function(fieldRes) {
          if (fieldRes.result) {
            fieldRes.result.forEach(function(id) {
              var p = pages[id];
              if (p && !seenUrls[p.url]) {
                seenUrls[p.url] = true;
                var bc = p.url.indexOf('/posts/') > -1 ? 'Posts' : '';
                var rank = (p.title && p.title.toLowerCase().indexOf(lower) > -1) ? 0 : 1;
                var preview = (p.content || '').substring(0, 120);
                results.push({ title: p.title, url: p.url, breadcrumb: bc, snippet: extractSnippet(p.content || '', q), preview: preview, rank: rank });
              }
            });
          }
        });
      }
    } catch {} // FlexSearch error non-fatal; fallback below still runs
    // Always run fallback for substring matching (catches partial-word matches)
    pages.forEach(function(p) {
      if (seenUrls[p.url]) return;
      if ((p.title && p.title.toLowerCase().indexOf(lower) > -1) ||
          (p.content && p.content.toLowerCase().indexOf(lower) > -1)) {
        seenUrls[p.url] = true;
        var bc = p.url.indexOf('/posts/') > -1 ? 'Posts' : '';
        var rank = (p.title && p.title.toLowerCase().indexOf(lower) > -1) ? 0 : 1;
        var preview = (p.content || '').substring(0, 120);
        results.push({ title: p.title, url: p.url, breadcrumb: bc, snippet: extractSnippet(p.content || '', q), preview: preview, rank: rank });
      }
    });
    // Sort: title matches first, then content matches
    results.sort(function(a, b) { return a.rank - b.rank; });
    render(results.slice(0, 10));
  }

  input.addEventListener('input', doSearch);

  input.addEventListener('keydown', function(e) {
    // Stop propagation so Keystrokes doesn't also fire
    e.stopPropagation();
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      if (window.showStatus) window.showStatus('Esc', 'Closed search');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      var items = list.querySelectorAll('.search-result-item');
      if (selectedIdx >= 0 && items[selectedIdx]) {
        navigate(items[selectedIdx].dataset.url);
      } else if (items[0]) {
        navigate(items[0].dataset.url);
      }
    } else if (e.key === 'ArrowDown' || (e.key === 'n' && e.altKey)) {
      e.preventDefault();
      var items = list.querySelectorAll('.search-result-item');
      if (items.length === 0) return;
      var next = (selectedIdx + 1) % items.length;
      document.querySelectorAll('.search-selected').forEach(function(el) { el.classList.remove('search-selected'); });
      if (items[next]) items[next].classList.add('search-selected');
      selectedIdx = next;
    } else if (e.key === 'ArrowUp' || (e.key === 'p' && e.altKey)) {
      e.preventDefault();
      var items = list.querySelectorAll('.search-result-item');
      if (items.length === 0) return;
      var prev = (selectedIdx - 1 + items.length) % items.length;
      document.querySelectorAll('.search-selected').forEach(function(el) { el.classList.remove('search-selected'); });
      if (items[prev]) items[prev].classList.add('search-selected');
      selectedIdx = prev;
    }
  });

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) close();
  });

  window.openSearch = function() {
    loadIndex(function() {
      overlay.classList.add("is-active");
      input.value = '';
      list.innerHTML = '';
      if (noResults) noResults.style.display = 'none';
      selectedIdx = -1;
      if (window.setMode) window.setMode('COMMAND');
      if (window.showStatus) window.showStatus('f', 'Opened search');
      setTimeout(function() { input.focus(); }, 50);
    });
  };

  window.closeSearch = close;

  // Search icon button click handler
  document.getElementById('search-icon-btn')?.addEventListener('click', function(e) {
    e.preventDefault();
    window.openSearch();
  });
})();
