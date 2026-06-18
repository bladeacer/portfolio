// Keystrokes shortcut bindings — tested with createTestKeystrokes
import { describe, it, expect } from "vitest";
import { createTestKeystrokes, setGlobalKeystrokes, type TestKeystrokes } from "@rwh/keystrokes";

// Helper: simulate a series of key presses/releases
function pressKeys(ks: TestKeystrokes<any, any, any>, keys: string[]) {
  for (const key of keys) {
    ks.press({ key });
    ks.release({ key });
  }
}

describe("navigation shortcuts", () => {
  it("single key j fires", () => {
    const ks = createTestKeystrokes();
    let fired = false;
    ks.bindKey("j", () => {
      fired = true;
    });
    ks.press({ key: "j" });
    expect(fired).toBe(true);
  });

  it("sequence g, g fires", () => {
    const ks = createTestKeystrokes();
    let fired = false;
    ks.bindKeyCombo("g, g", () => {
      fired = true;
    });
    pressKeys(ks, ["g", "g"]);
    expect(fired).toBe(true);
  });

  it("sequence g, h fires", () => {
    const ks = createTestKeystrokes();
    let fired = false;
    ks.bindKeyCombo("g, h", () => {
      fired = true;
    });
    pressKeys(ks, ["g", "h"]);
    expect(fired).toBe(true);
  });

  it("sequence z, z fires", () => {
    const ks = createTestKeystrokes();
    let fired = false;
    ks.bindKeyCombo("z, z", () => {
      fired = true;
    });
    pressKeys(ks, ["z", "z"]);
    expect(fired).toBe(true);
  });

  it("single key G fires", () => {
    const ks = createTestKeystrokes();
    let fired = false;
    ks.bindKey("G", () => {
      fired = true;
    });
    ks.press({ key: "G" });
    expect(fired).toBe(true);
  });

  it("combo ctrl+p fires", () => {
    const ks = createTestKeystrokes({ keyRemap: { control: "ctrl" } });
    let fired = false;
    ks.bindKeyCombo("ctrl+p", () => {
      fired = true;
    });
    ks.press({ key: "Control" });
    ks.press({ key: "p" });
    ks.release({ key: "p" });
    ks.release({ key: "Control" });
    expect(fired).toBe(true);
  });

  it("escape key fires", () => {
    const ks = createTestKeystrokes();
    let fired = false;
    ks.bindKey("escape", () => {
      fired = true;
    });
    ks.press({ key: "Escape" });
    expect(fired).toBe(true);
  });

  it("sequence e, m fires", () => {
    const ks = createTestKeystrokes();
    let fired = false;
    ks.bindKeyCombo("e, m", () => {
      fired = true;
    });
    pressKeys(ks, ["e", "m"]);
    expect(fired).toBe(true);
  });

  it("sequence l, i fires", () => {
    const ks = createTestKeystrokes();
    let fired = false;
    ks.bindKeyCombo("l, i", () => {
      fired = true;
    });
    pressKeys(ks, ["l", "i"]);
    expect(fired).toBe(true);
  });

  it("number key 5 fires handler", () => {
    const ks = createTestKeystrokes();
    let fired = false;
    ks.bindKey("5", () => {
      fired = true;
    });
    ks.press({ key: "5" });
    expect(fired).toBe(true);
  });

  it("does not fire when keys released out of sequence", () => {
    const ks = createTestKeystrokes();
    let fired = false;
    ks.bindKeyCombo("g, g", () => {
      fired = true;
    });
    // Only press g once, not twice
    ks.press({ key: "g" });
    ks.release({ key: "g" });
    expect(fired).toBe(false);
  });
});
