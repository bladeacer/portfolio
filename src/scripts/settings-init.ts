(function () {
  var KEY = "portfolio-settings";
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var s = JSON.parse(raw);
        // Migrate old fontFallback key
        if (s.fontFallback !== undefined && s.fontCJK === undefined)
          s.fontCJK = s.fontFallback;
        return s;
      }
    } catch {}
    return null;
  }
  function apply() {
    if (window.location.pathname.indexOf("/settings") !== -1) return;
    try {
      var s = load();
      if (!s) return;
      var gen =
        'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"';
      var monogen =
        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      var sansChain = '"' + (s.fontSans || "CascadiaCode") + '", ' + gen;
      var monoChain = '"' + (s.fontMono || "DepartureMono") + '", ' + monogen;
      var headingChain = '"' + (s.fontHeading || "DepartureMono") + '", ' + gen;
      var sz = (s.sizeSans || 16) + "px";
      var szm = (s.sizeMono || 16) + "px";

      if (s.fontCJK) {
        sansChain = '"CJK",' + sansChain;
        monoChain = '"CJK",' + monoChain;
        headingChain = '"CJK",' + headingChain;
      }

      var css = "";
      css +=
        "body{font-family:" +
        sansChain +
        " !important;font-size:" +
        sz +
        " !important;}";
      css +=
        "p,div,em,ul,pre.astro-code,blockquote,hr,figcaption,li{font-size:" +
        sz +
        " !important;}";
      css +=
        "code,pre,kbd,samp,.setting-select,.setting-size{font-family:" +
        monoChain +
        " !important;}";
      css += "code{font-size:" + szm + " !important;}";
      css +=
        "pre.astro-code,.setting-select,.setting-size{font-size:" +
        szm +
        " !important;}";
      css += "h1,h2,h3,h4{font-family:" + headingChain + " !important;}";
      if (s.h1Size) css += "h1{font-size:" + s.h1Size + "em !important;}";
      if (s.h2Size) css += "h2{font-size:" + s.h2Size + "em !important;}";
      if (s.h3Size) css += "h3{font-size:" + s.h3Size + "em !important;}";
      if (s.h4Size) css += "h4{font-size:" + s.h4Size + "em !important;}";
      if (s.h1Color && s.h1Color !== "custom")
        css += "h1{color:" + s.h1Color + " !important;}";
      if (s.h2Color && s.h2Color !== "custom")
        css += "h2{color:" + s.h2Color + " !important;}";
      if (s.h3Color && s.h3Color !== "custom")
        css += "h3{color:" + s.h3Color + " !important;}";
      if (s.h4Color && s.h4Color !== "custom")
        css += "h4{color:" + s.h4Color + " !important;}";
      if (s.accentLight && s.accentLight !== "custom")
        css +=
          "body.theme-light{--user-accent-light:" +
          s.accentLight +
          " !important;}";
      if (s.accentDark && s.accentDark !== "custom")
        css +=
          "body.theme-dark{--user-accent-dark:" +
          s.accentDark +
          " !important;}";
      if (s.showGrid === false)
        css += "body{background-image:none !important;}";
      if (s.fontCJK) {
        css +=
          '@font-face{font-family:"CJK";src:local("' +
          s.fontCJK +
          '");unicode-range:U+4E00-9FFF,U+3000-303F,U+FF00-FFEF,U+2E80-2EFF,U+3100-312F,U+3400-4DBF,U+F900-FAFF;}';
      }

      var old = document.getElementById("settings-style");
      if (old) old.remove();
      var style = document.createElement("style");
      style.id = "settings-style";
      style.textContent = css;
      document.head.appendChild(style);

      if (s.themePreference === "light") {
        localStorage.setItem("theme", "light");
      } else if (s.themePreference === "dark") {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.removeItem("theme");
      }
    } catch {}
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }
})();
