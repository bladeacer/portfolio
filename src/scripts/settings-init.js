(function() {
  var KEY = "portfolio-settings";
  function apply() {
    if (window.location.pathname.indexOf('/settings') !== -1) return;
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return;
      var s = JSON.parse(raw);
      var SANS = {
        CascadiaCode: '"CascadiaCode", "Maple Mono Medium", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        "Maple Mono Medium": '"Maple Mono Medium", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        DepartureMono: '"DepartureMono", "Maple Mono Medium", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      };
      var MONO = {
        CascadiaCode: '"CascadiaCode", "Maple Mono Medium", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        "Maple Mono Medium": '"Maple Mono Medium", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        DepartureMono: '"DepartureMono", "Maple Mono Medium", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
      };
      var sansChain = SANS[s.fontSans] || SANS["CascadiaCode"];
      var fallbackChain = SANS[s.fontFallback] || SANS["CascadiaCode"];
      var monoChain = MONO[s.fontMono] || MONO["DepartureMono"];
      var sz = (s.sizeSans || 16) + "px";
      var szm = (s.sizeMono || 16) + "px";
      var szf = (s.sizeFallback || 16) + "px";

      var css = "";
      css += "body{font-family:" + sansChain + " !important;font-size:" + sz + " !important;}";
      css += "p,div,em,ul,pre.astro-code,blockquote,hr,figcaption,li{font-size:" + sz + " !important;}";
      css += "code{font-size:" + szm + " !important;}";
      if (s.h1Size) css += "h1{font-size:" + s.h1Size + "em !important;}";
      if (s.h2Size) css += "h2{font-size:" + s.h2Size + "em !important;}";
      if (s.h3Size) css += "h3{font-size:" + s.h3Size + "em !important;}";
      if (s.h4Size) css += "h4{font-size:" + s.h4Size + "em !important;}";
      if (s.h1Color && s.h1Color !== "custom") css += "h1{color:" + s.h1Color + " !important;}";
      if (s.h2Color && s.h2Color !== "custom") css += "h2{color:" + s.h2Color + " !important;}";
      if (s.h3Color && s.h3Color !== "custom") css += "h3{color:" + s.h3Color + " !important;}";
      if (s.h4Color && s.h4Color !== "custom") css += "h4{color:" + s.h4Color + " !important;}";
      if (s.accentLight && s.accentLight !== "custom") css += "body.theme-light{--user-accent-light:" + s.accentLight + " !important;}";
      if (s.accentDark && s.accentDark !== "custom") css += "body.theme-dark{--user-accent-dark:" + s.accentDark + " !important;}";
      if (s.showGrid === false) css += "body{background-image:none !important;}";

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
    } catch(e) {}
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();