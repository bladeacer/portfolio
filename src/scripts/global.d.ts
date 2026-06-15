interface ShortcutEntry {
  chord: string;
  desc: string;
}

interface Window {
  Mousetrap: Mousetrap.MousetrapInstance;
  __shortcutsRegistry: ShortcutEntry[];
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
