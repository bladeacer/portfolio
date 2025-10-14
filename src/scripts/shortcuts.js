Mousetrap.bind('t', () => {
    window.toggleTheme();
    return false; 
});

Mousetrap.bind('?', () => {
    window.location.href = "/portfolio/about#shortcuts";
    return false; 
});

Mousetrap.bind('h', () => {
    window.location.href = "/portfolio";
    return false; 
});

Mousetrap.bind('a', () => {
    window.location.href = "/portfolio/about";
    return false; 
});

Mousetrap.bind('d', () => {
    window.location.href = "/portfolio/digital-garden";
    return false; 
});

Mousetrap.bind('c', () => {
    window.location.href = "/portfolio/credits";
    return false; 
});

Mousetrap.bind('#', () => {
    window.location.href = "/portfolio/tags";
    return false; 
});

Mousetrap.bind('r', () => {
    window.location.href = "/portfolio/resume";
    return false; 
});

Mousetrap.bind('<', () => {
    history.back();
    return false;
});

Mousetrap.bind('>', () => {
    history.forward();
    return false;
});
