// Guards standalone key handlers from firing when a Keystrokes sequence
// is in progress. Keystrokes fires single-key handlers BEFORE combo
// handlers, so "g, l" fires both the "l" highlight handler and the "g, l"
// GitLab handler. This file sets up capture-phase listeners that suppress
// the standalone handler when a matching prefix has been pressed.
//
// Prefix keys tracked: z, g, e

var seqPrefixTimeout: ReturnType<typeof setTimeout> | null = null;

function clearSeqPrefix() {
  window.__seqPrefixKey = null;
}

function setSeqPrefix(key: string) {
  if (seqPrefixTimeout !== null) clearTimeout(seqPrefixTimeout);
  window.__seqPrefixKey = key;
  seqPrefixTimeout = setTimeout(clearSeqPrefix, 1000);
}

function clearSeqPrefixNow() {
  if (seqPrefixTimeout !== null) clearTimeout(seqPrefixTimeout);
  window.__seqPrefixKey = null;
}

// Capture-phase listeners for prefix keys (z, g, e)
document.addEventListener(
  "keydown",
  function (e) {
    if (e.repeat) return;
    if (e.key === "z" || e.key === "g" || e.key === "e") {
      setSeqPrefix(e.key);
    }
  },
  true,
);

// Expose for use by sequence handlers (z b / z t / z z / g l / g h / e m)
window.__clearSeqPrefix = clearSeqPrefixNow;
window.__setSeqPrefix = setSeqPrefix;
