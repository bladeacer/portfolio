(function () {
  var el = document.getElementById("key-status");
  var chordEl = document.getElementById("key-status-chord");
  var descEl = document.getElementById("key-status-desc");
  var modeEl = document.getElementById("mode-indicator");
  var scrollEl = document.getElementById("status-scroll");
  var pathEl = document.getElementById("status-path");
  var wordsEl = document.getElementById("status-words");
  var platformEl = document.getElementById("status-platform");
  var timeEl = document.getElementById("status-time");

  function getSetting(key: string, def: any) {
    try {
      var raw = localStorage.getItem("portfolio-settings");
      if (raw) {
        var s = JSON.parse(raw);
        return s[key] !== undefined ? s[key] : def;
      }
    } catch {}
    return def;
  }

  function countWords(text: string) {
    return text.split(/\s+/).filter(Boolean).length;
  }
  function countChars(text: string) {
    return text.length;
  }
  function countSentences(text: string) {
    return text.split(/[.!?]+/).filter(Boolean).length;
  }
  function countParagraphs(text: string) {
    return text.split(/\n\s*\n/).filter(Boolean).length;
  }

  function updateCount() {
    if (!wordsEl) return;
    var bodyText = document.body.innerText || document.body.textContent || "";
    var wc = countWords(bodyText);
    var cc = countChars(bodyText);
    var sc = countSentences(bodyText);
    var pc = countParagraphs(bodyText);
    var mode = getSetting("statusCount", "words");

    var label;
    if (mode === "none") {
      label = "";
    } else {
      var val;
      switch (mode) {
        case "characters":
          val = cc;
          break;
        case "sentences":
          val = sc;
          break;
        case "paragraphs":
          val = pc;
          break;
        default:
          val = wc;
          break;
      }
      label = val + " " + mode;
    }
    wordsEl.textContent = label;
    wordsEl.title =
      wc +
      " words, " +
      cc +
      " chars, " +
      sc +
      " sentences, " +
      pc +
      " paragraphs";
  }

  // Update time every minute
  function updateTime() {
    if (!timeEl) return;
    var now = new Date();
    var h = String(now.getHours()).padStart(2, "0");
    var m = String(now.getMinutes()).padStart(2, "0");
    var tz = -now.getTimezoneOffset();
    var tzSign = tz >= 0 ? "+" : "-";
    var tzHours = String(Math.floor(Math.abs(tz) / 60)).padStart(2, "0");
    var tzMins = String(Math.abs(tz) % 60).padStart(2, "0");
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var dayName = days[now.getDay()];
    var month = months[now.getMonth()];
    var date = now.getDate();
    var year = now.getFullYear();
    timeEl.textContent =
      h +
      ":" +
      m +
      " UTC" +
      tzSign +
      tzHours +
      ":" +
      tzMins +
      "  " +
      dayName +
      " " +
      date +
      " " +
      month +
      " " +
      year;
  }
  updateTime();
  setInterval(updateTime, 60000);

  // Detect platform from user agent
  if (platformEl) {
    var ua = navigator.userAgent;
    var name = "?";
    if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1) name = "iOS";
    else if (ua.indexOf("Android") > -1) name = "Android";
    else if (ua.indexOf("Linux") > -1) name = "Linux";
    else if (ua.indexOf("Windows") > -1) name = "Windows";
    else if (ua.indexOf("Mac OS X") > -1 || ua.indexOf("macOS") > -1)
      name = "macOS";
    else if (ua.indexOf("FreeBSD") > -1) name = "FreeBSD";
    platformEl.textContent = name;
  }

  // Set page path
  if (pathEl) {
    pathEl.textContent =
      window.location.pathname.replace(/\/portfolio/, "").replace(/\/$/, "") ||
      "/";
  }

  // Set count
  updateCount();

  // Re-read count when settings change
  window.addEventListener("storage", function (e) {
    if (e.key === "portfolio-settings") updateCount();
  });

  // Also re-read every 2s on the settings page so live preview updates
  setInterval(function () {
    if (window.location.pathname.indexOf("/settings") > -1) updateCount();
  }, 500);

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
      document.documentElement.clientHeight,
    );
    var winHeight = window.innerHeight;
    var maxScroll = docHeight - winHeight;
    var pct = maxScroll > 0 ? Math.round((scrollTop / maxScroll) * 100) : 0;
    scrollEl.textContent = pct + "%";
  }

  window.addEventListener("scroll", updateScroll, { passive: true });
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
        el._hideTimeout = setTimeout(function () {
          el!.style.display = "none";
        }, 4000);
      }
      sessionStorage.removeItem("portfolio-last-status");
    }
  } catch {}

  window.showStatus = function (
    chord: string,
    desc: string,
    persistNav?: boolean,
  ) {
    if (!el || !chordEl || !descEl) return;
    chordEl.textContent = chord;
    descEl.textContent = desc ? " " + desc : "";
    el.style.display = "";
    clearTimeout(el._hideTimeout);
    el._hideTimeout = setTimeout(function () {
      el!.style.display = "none";
    }, 5000);
    if (persistNav) {
      try {
        sessionStorage.setItem(
          "portfolio-last-status",
          JSON.stringify({ chord: chord, desc: desc }),
        );
      } catch {}
    }
  };

  window.setMode = function (mode) {
    if (!modeEl) return;
    modeEl.textContent = mode;
  };

  if (modeEl) modeEl.textContent = "NORMAL";
})();
