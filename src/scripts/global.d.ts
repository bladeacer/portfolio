interface ShortcutEntry {
  chord: string;
  desc: string;
  category?: string;
}

interface Window {
  __handlers: Record<string, () => void>;
  __shortcutsRegistry: ShortcutEntry[];
  __seqPrefixKey: string | null;
  __clearSeqPrefix: () => void;
  __setSeqPrefix: (key: string) => void;
  toggleTheme: () => void;
  toggleShortcutsPopup?: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openCommandMode: () => void;
  closeCommandMode: () => void;
  showStatus: (chord: string, desc: string, persistNav?: boolean) => void;
  setMode: (mode: string) => void;
  __checkOverlayLock: () => void;
  __CANDIDATE_SELECTOR?: string;
}

interface HTMLElement {
  _hideTimeout?: ReturnType<typeof setTimeout>;
}
