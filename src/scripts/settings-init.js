(function() {
  var KEY = "portfolio-settings";
  try {
    var raw = localStorage.getItem(KEY);
    if (!raw) return;
    var s = JSON.parse(raw);
    var root = document.documentElement;
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
    if (s.fontSans && SANS[s.fontSans]) root.style.setProperty("--font-sans", SANS[s.fontSans]);
    if (s.fontFallback && SANS[s.fontFallback]) root.style.setProperty("--font-fallback", SANS[s.fontFallback]);
    if (s.fontMono && MONO[s.fontMono]) root.style.setProperty("--font-mono", MONO[s.fontMono]);
    if (s.sizeSans) root.style.setProperty("--font-size-sans", s.sizeSans + "px");
    if (s.sizeFallback) root.style.setProperty("--font-size-fallback", s.sizeFallback + "px");
    if (s.sizeMono) root.style.setProperty("--font-size-mono", s.sizeMono + "px");
    if (s.h1Size) root.style.setProperty("--h1-size", s.h1Size + "em");
    if (s.h2Size) root.style.setProperty("--h2-size", s.h2Size + "em");
    if (s.h3Size) root.style.setProperty("--h3-size", s.h3Size + "em");
    if (s.h4Size) root.style.setProperty("--h4-size", s.h4Size + "em");
    if (s.h1Color) root.style.setProperty("--h1-color", s.h1Color);
    if (s.h2Color) root.style.setProperty("--h2-color", s.h2Color);
    if (s.h3Color) root.style.setProperty("--h3-color", s.h3Color);
    if (s.h4Color) root.style.setProperty("--h4-color", s.h4Color);
    if (s.accentColor) root.style.setProperty("--user-accent", s.accentColor);
  } catch(e) {}
})();
