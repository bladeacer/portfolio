interface ShortcutEntry {
  chord: string;
  desc: string;
}

interface Window {
  __handlers: Record<string, () => void>;
  __shortcutsRegistry: ShortcutEntry[];
  __seqPrefixKey: string | null;
  __clearSeqPrefix: () => void;
  __setSeqPrefix: (key: string) => void;
  toggleTheme: () => void;
  toggleShortcutsPopup: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openCommandMode: () => void;
  closeCommandMode: () => void;
  showStatus: (chord: string, desc: string) => void;
  setMode: (mode: string) => void;
}

interface HTMLElement {
  _hideTimeout?: ReturnType<typeof setTimeout>;
}
