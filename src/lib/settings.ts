export interface Settings {
  fontSans: string;
  fontCJK: string;
  fontMono: string;
  fontHeading: string;
  sizeSans: number;
  sizeMono: number;
  h1Size: number;
  h2Size: number;
  h3Size: number;
  h4Size: number;
  h1Color: string;
  h2Color: string;
  h3Color: string;
  h4Color: string;
  accentLight: string;
  accentDark: string;
  themePreference: string;
  showGrid: boolean;
  yankUnit: string;
  statusCount: string;
  fontFallback?: string;
}

export const DEFAULTS: Settings = {
  fontSans: "CascadiaCode",
  fontCJK: "Maple Mono Medium",
  fontMono: "DepartureMono",
  fontHeading: "DepartureMono",
  sizeSans: 16,
  sizeMono: 16,
  h1Size: 1.81803,
  h2Size: 1.61803,
  h3Size: 1.41803,
  h4Size: 1.21803,
  h1Color: "",
  h2Color: "",
  h3Color: "",
  h4Color: "",
  accentLight: "",
  accentDark: "",
  themePreference: "",
  showGrid: true,
  yankUnit: "words",
  statusCount: "words",
};

const FALLBACK_SANS = `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`;
const FALLBACK_MONO = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";

export interface FontChains {
  sansChain: string;
  monoChain: string;
  headingChain: string;
}

export function buildFontChains(s: Partial<Settings>): FontChains {
  var sansChain = '"' + (s.fontSans || "CascadiaCode") + '", ' + FALLBACK_SANS;
  var monoChain = '"' + (s.fontMono || "DepartureMono") + '", ' + FALLBACK_MONO;
  var headingChain = '"' + (s.fontHeading || "DepartureMono") + '", ' + FALLBACK_SANS;

  if (s.fontCJK) {
    sansChain = '"CJK",' + sansChain;
    monoChain = '"CJK",' + monoChain;
    headingChain = '"CJK",' + headingChain;
  }

  return { sansChain, monoChain, headingChain };
}

export function buildSettingsCss(s: Partial<Settings>): string {
  var chains = buildFontChains(s);
  var sz = (s.sizeSans || 16) + "px";
  var szm = (s.sizeMono || 16) + "px";
  var sansChain = chains.sansChain;
  var monoChain = chains.monoChain;
  var headingChain = chains.headingChain;

  var css = "";
  css += "body{font-family:" + sansChain + " !important;font-size:" + sz + " !important;}";
  css += "p,div,em,ul,pre.astro-code,blockquote,hr,figcaption,li{font-size:" + sz + " !important;}";
  css += "code,pre,kbd,samp,.setting-select,.setting-size{font-family:" + monoChain + " !important;}";
  css += "code{font-size:" + szm + " !important;}";
  css += "pre.astro-code,.setting-select,.setting-size{font-size:" + szm + " !important;}";
  css += "h1,h2,h3,h4{font-family:" + headingChain + " !important;}";

  if (s.h1Size) css += "h1{font-size:" + s.h1Size + "em !important;}";
  if (s.h2Size) css += "h2{font-size:" + s.h2Size + "em !important;}";
  if (s.h3Size) css += "h3{font-size:" + s.h3Size + "em !important;}";
  if (s.h4Size) css += "h4{font-size:" + s.h4Size + "em !important;}";
  if (s.h1Color && s.h1Color !== "custom") css += "h1{color:" + s.h1Color + " !important;}";
  if (s.h2Color && s.h2Color !== "custom") css += "h2{color:" + s.h2Color + " !important;}";
  if (s.h3Color && s.h3Color !== "custom") css += "h3{color:" + s.h3Color + " !important;}";
  if (s.h4Color && s.h4Color !== "custom") css += "h4{color:" + s.h4Color + " !important;}";
  if (s.accentLight && s.accentLight !== "custom")
    css += "body.theme-light{--user-accent-light:" + s.accentLight + " !important;}";
  if (s.accentDark && s.accentDark !== "custom")
    css += "body.theme-dark{--user-accent-dark:" + s.accentDark + " !important;}";
  if (s.showGrid === false) css += "body{background-image:none !important;}";

  return css;
}

export function buildFontFaceCss(fontName: string): string {
  return '@font-face{font-family:"CJK";src:local("' + fontName + '");unicode-range:U+4E00-9FFF,U+3000-303F,U+FF00-FFEF,U+2E80-2EFF,U+3100-312F,U+3400-4DBF,U+F900-FAFF;}';
}

export function migrateSettings(raw: Partial<Settings>): Partial<Settings> {
  if (raw.fontFallback !== undefined && raw.fontCJK === undefined) {
    raw.fontCJK = raw.fontFallback;
  }
  return raw;
}

export function loadSettings(storageKey: string, defaults: Partial<Settings> = DEFAULTS): Partial<Settings> {
  try {
    var raw = localStorage.getItem(storageKey);
    if (raw) {
      var parsed = JSON.parse(raw);
      migrateSettings(parsed);
      return Object.assign({}, defaults, parsed);
    }
  } catch {}
  return Object.assign({}, defaults);
}

export function saveSettings(storageKey: string, s: Partial<Settings>): void {
  localStorage.setItem(storageKey, JSON.stringify(s));
}
