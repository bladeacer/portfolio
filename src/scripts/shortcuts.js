var Mousetrap = window.Mousetrap;
function showStatus(chord, desc, persistNav) {
  if (window.showStatus) window.showStatus(chord, desc, persistNav);
}

Mousetrap.bind('t', () => {
    window.toggleTheme();
    showStatus('t', 'Toggled theme');
    return false; 
});

Mousetrap.bind('?', () => {
    if (window.toggleShortcutsPopup) {
        window.toggleShortcutsPopup();
        showStatus('?', 'Opened shortcuts popup');
    }
    return false;
});

Mousetrap.bind('9', function() {
    var btn = document.getElementById("toc-mobile-toggle");
    // On mobile (<1000px) the button is visible; click it to toggle the drawer
    if (btn && btn.offsetParent !== null) {
        btn.click();
    } else {
        // On desktop, use inline style (avoids !important conflict with component CSS)
        var toc = document.querySelector('.stron-toc.toc');
        if (toc) {
            toc.style.display = toc.style.display === 'none' ? '' : 'none';
        }
    }
    showStatus('9', 'Toggled table of contents');
    return false;
}, 'keydown');

Mousetrap.bind('s', () => {
    window.location.href = "/portfolio/settings";
    showStatus('s', 'Opened settings', true);
    return false;
});

Mousetrap.bind('e m', () => {
    const url = "mailto:wg.nick.exe@gmail.com";
    const target = '_blank';
    const features = 'noopener,noreferrer'; 
    window.open(url, target, features);
    showStatus('em', 'Opened email link');
    return false;
});

Mousetrap.bind('g h', () => {
    const url = "https://github.com/bladeacer";
    const target = '_blank';
    const features = 'noopener,noreferrer'; 
    window.open(url, target, features);
    showStatus('gh', 'Opened GitHub');
    return false;
});

Mousetrap.bind('g l', () => {
    const url = "https://gitlab.com/bladeacer";
    const target = '_blank';
    const features = 'noopener,noreferrer'; 
    window.open(url, target, features);
    showStatus('gl', 'Opened GitLab');
    return false;
});

Mousetrap.bind('b', () => {
    const url = "https://codeberg.org/bladeacer";
    const target = '_blank';
    const features = 'noopener,noreferrer'; 
    window.open(url, target, features);
    showStatus('b', 'Opened Codeberg');
    return false; 
});

Mousetrap.bind('g r', () => {
    const url = "https://gravatar.com/objectoriginal8f1e7ecf6f";
    const target = '_blank';
    const features = 'noopener,noreferrer'; 
    window.open(url, target, features);
    showStatus('gr', 'Opened Gravatar');
    return false;
});

Mousetrap.bind('l i', () => {
    const url = "https://www.linkedin.com/in/nicholas-wen-a525832b2/";
    const target = '_blank';
    const features = 'noopener,noreferrer'; 
    window.open(url, target, features);
    showStatus('li', 'Opened LinkedIn');
    return false;
});

Mousetrap.bind('h', () => {
    window.location.href = "/portfolio";
    showStatus('h', 'Navigated home', true);
    return false; 
});

Mousetrap.bind('a', () => {
    window.location.href = "/portfolio/about";
    showStatus('a', 'Navigated to about', true);
    return false; 
});

Mousetrap.bind('d', () => {
    window.location.href = "/portfolio/digital-garden";
    showStatus('d', 'Navigated to digital garden', true);
    return false; 
});

Mousetrap.bind('c', () => {
    window.location.href = "/portfolio/credits";
    showStatus('c', 'Navigated to credits', true);
    return false; 
});

Mousetrap.bind('8', () => {
    window.location.href = "/portfolio/tags";
    showStatus('8', 'Navigated to tags', true);
    return false; 
});

Mousetrap.bind('r', function(e) {
    if (e.ctrlKey || e.metaKey) return;
    const url = "/portfolio/resume";
    const target = '_blank';
    const features = 'noopener,noreferrer'; 
    window.open(url, target, features);
    showStatus('r', 'Opened resume');
    return false;
});

Mousetrap.bind('<', () => {
    history.back();
    showStatus('<', 'History back');
    return false;
});

Mousetrap.bind('>', () => {
    history.forward();
    showStatus('>', 'History forward');
    return false;
});

Mousetrap.bind('f', () => {
    window.location.href = "/portfolio/rss.xml";
    showStatus('f', 'Opened RSS feed');
    return false; 
});

Mousetrap.bind('esc', function() {
    // Close popup if open (command mode and search handle their own Esc)
    if (window.toggleShortcutsPopup) {
        var popupOverlay = document.getElementById("shortcuts-popup-overlay");
        if (popupOverlay && popupOverlay.style.display === "grid") {
            popupOverlay.style.display = "none";
            showStatus('Esc', 'Closed popup');
            return false;
        }
    }
    if (window.closeCommandMode) {
        var cmdOverlay = document.getElementById("command-mode-overlay");
        if (cmdOverlay && cmdOverlay.classList.contains("is-active")) {
            window.closeCommandMode();
            showStatus('Esc', 'Cancelled');
            return false;
        }
    }
    if (window.closeSearch) {
        var searchOverlay = document.getElementById("search-overlay");
        if (searchOverlay && searchOverlay.style.display === "flex") {
            window.closeSearch();
            showStatus('Esc', 'Closed search');
            return false;
        }
    }
    showStatus('Esc', 'Cancelled');
    return false;
});
