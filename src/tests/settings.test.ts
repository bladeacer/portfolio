import { describe, it, expect, beforeEach } from "vitest";
import {
  type Settings,
  DEFAULTS,
  buildFontChains,
  buildSettingsCss,
  buildFontFaceCss,
  migrateSettings,
  loadSettings,
  saveSettings,
} from "../lib/settings";

describe("settings DEFAULTS", () => {
  it("has CJK default set to Maple Mono Medium", () => {
    expect(DEFAULTS.fontCJK).toBe("Maple Mono Medium");
  });

  it("has sans default set to CascadiaCode", () => {
    expect(DEFAULTS.fontSans).toBe("CascadiaCode");
  });

  it("has mono default set to DepartureMono", () => {
    expect(DEFAULTS.fontMono).toBe("DepartureMono");
  });

  it("has heading default set to DepartureMono", () => {
    expect(DEFAULTS.fontHeading).toBe("DepartureMono");
  });
});

describe("buildFontChains", () => {
  it("builds sans chain with default font", () => {
    var chains = buildFontChains({});
    expect(chains.sansChain).toContain('"CascadiaCode"');
    expect(chains.sansChain).toContain("ui-sans-serif");
  });

  it("builds mono chain with default font", () => {
    var chains = buildFontChains({});
    expect(chains.monoChain).toContain('"DepartureMono"');
    expect(chains.monoChain).toContain("ui-monospace");
  });

  it("builds heading chain with default font", () => {
    var chains = buildFontChains({});
    expect(chains.headingChain).toContain('"DepartureMono"');
    expect(chains.headingChain).toContain("ui-sans-serif");
  });

  it("uses custom fontSans when provided", () => {
    var chains = buildFontChains({ fontSans: "CustomFont" });
    expect(chains.sansChain).toContain('"CustomFont"');
  });

  it("uses custom fontMono when provided", () => {
    var chains = buildFontChains({ fontMono: "CustomMono" });
    expect(chains.monoChain).toContain('"CustomMono"');
  });

  it("uses custom fontHeading when provided", () => {
    var chains = buildFontChains({ fontHeading: "CustomHeading" });
    expect(chains.headingChain).toContain('"CustomHeading"');
  });

  it("prepends CJK to all chains when fontCJK is set", () => {
    var chains = buildFontChains({ fontCJK: "NotoSansSC" });
    expect(chains.sansChain).toMatch(/^"CJK",/);
    expect(chains.monoChain).toMatch(/^"CJK",/);
    expect(chains.headingChain).toMatch(/^"CJK",/);
  });

  it("does not prepend CJK when fontCJK is empty", () => {
    var chains = buildFontChains({ fontCJK: "" });
    expect(chains.sansChain).not.toMatch(/^"CJK",/);
    expect(chains.monoChain).not.toMatch(/^"CJK",/);
    expect(chains.headingChain).not.toMatch(/^"CJK",/);
  });
});

describe("buildSettingsCss", () => {
  it("includes body font-family with !important", () => {
    var css = buildSettingsCss({});
    expect(css).toContain("body{font-family:");
    expect(css).toContain("!important");
  });

  it("sets body font-size from sizeSans", () => {
    var css = buildSettingsCss({ sizeSans: 18 });
    expect(css).toContain("font-size:18px !important");
  });

  it("sets code font-size from sizeMono", () => {
    var css = buildSettingsCss({ sizeMono: 14 });
    expect(css).toContain("code{font-size:14px !important");
  });

  it("includes heading font-family with headingChain", () => {
    var css = buildSettingsCss({ fontHeading: "HeadingFont" });
    expect(css).toContain("h1,h2,h3,h4{font-family:");
    expect(css).toContain('"HeadingFont"');
  });

  it("includes h1 font-size when set", () => {
    var css = buildSettingsCss({ h1Size: 2 });
    expect(css).toContain("h1{font-size:2em !important");
  });

  it("includes h1 color when set to a hex value", () => {
    var css = buildSettingsCss({ h1Color: "#ff0000" });
    expect(css).toContain("h1{color:#ff0000 !important");
  });

  it("skips h1 color when set to custom", () => {
    var css = buildSettingsCss({ h1Color: "custom" });
    expect(css).not.toContain("h1{color:");
  });

  it("includes accent colors when set", () => {
    var css = buildSettingsCss({ accentLight: "#123456", accentDark: "#654321" });
    expect(css).toContain("--user-accent-light:#123456");
    expect(css).toContain("--user-accent-dark:#654321");
  });

  it("hides grid when showGrid is false", () => {
    var css = buildSettingsCss({ showGrid: false });
    expect(css).toContain("background-image:none");
  });

  it("does not hide grid when showGrid defaults to true", () => {
    var css = buildSettingsCss({});
    expect(css).not.toContain("background-image:none");
  });

  it("includes CJK @font-face CSS separately", () => {
    var faceCss = buildFontFaceCss("Maple Mono Medium");
    expect(faceCss).toContain('font-family:"CJK"');
    expect(faceCss).toContain('src:local("Maple Mono Medium")');
    expect(faceCss).toContain("unicode-range:U+4E00-9FFF");
  });

  it("generates stable CSS for full DEFAULTS", () => {
    var css = buildSettingsCss(DEFAULTS);
    expect(css).toContain("body{font-family:");
    expect(css).toContain("h1,h2,h3,h4{font-family:");
    expect(css).toContain("code,pre,kbd,samp");
    expect(css).not.toContain("background-image:none");
    expect(css).not.toContain("h1{color:");
  });
});

describe("migrateSettings", () => {
  it("migrates fontFallback to fontCJK when fontCJK is undefined", () => {
    var result = migrateSettings({ fontFallback: "OldCJK" });
    expect(result.fontCJK).toBe("OldCJK");
  });

  it("does not overwrite fontCJK when already set", () => {
    var result = migrateSettings({ fontFallback: "OldCJK", fontCJK: "NewCJK" });
    expect(result.fontCJK).toBe("NewCJK");
  });

  it("handles empty input gracefully", () => {
    var result = migrateSettings({});
    expect(result.fontCJK).toBeUndefined();
  });
});

describe("loadSettings", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns defaults when localStorage is empty", () => {
    var s = loadSettings("test-key");
    expect(s.fontSans).toBe("CascadiaCode");
    expect(s.fontCJK).toBe("Maple Mono Medium");
  });

  it("merges saved values with defaults", () => {
    localStorage.setItem("test-key", JSON.stringify({ fontSans: "CustomSans" }));
    var s = loadSettings("test-key");
    expect(s.fontSans).toBe("CustomSans");
    expect(s.fontCJK).toBe("Maple Mono Medium");
  });

  it("migrates fontFallback from saved data", () => {
    localStorage.setItem("test-key", JSON.stringify({ fontFallback: "LegacyCJK" }));
    var s = loadSettings("test-key");
    expect(s.fontCJK).toBe("LegacyCJK");
  });

  it("handles corrupted localStorage gracefully", () => {
    localStorage.setItem("test-key", "{invalid json}");
    var s = loadSettings("test-key");
    expect(s.fontSans).toBe("CascadiaCode");
  });
});

describe("saveSettings", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("persists settings to localStorage", () => {
    saveSettings("test-key", { fontSans: "SavedFont" });
    var raw = localStorage.getItem("test-key");
    expect(raw).toBeTruthy();
    var parsed = JSON.parse(raw!);
    expect(parsed.fontSans).toBe("SavedFont");
  });

  it("roundtrips correctly with loadSettings", () => {
    var original: Partial<Settings> = { fontSans: "RoundTrip", sizeMono: 12 };
    saveSettings("test-key", original);
    var loaded = loadSettings("test-key");
    expect(loaded.fontSans).toBe("RoundTrip");
    expect(loaded.sizeMono).toBe(12);
  });
});
