Mousetrap.bind('0', () => {
    window.toggleTheme();
    return false; 
});

Mousetrap.bind('?', () => {
    const url = "/portfolio/about#shortcuts";
    const target = '_blank';
    const features = 'noopener,noreferrer'; 
    window.open(url, target, features);
    return false;
});

Mousetrap.bind('e m', () => {
    const url = "mailto:wg.nick.exe@gmail.com";
    const target = '_blank';
    const features = 'noopener,noreferrer'; 
    window.open(url, target, features);
    return false;
});

Mousetrap.bind('g h', () => {
    const url = "https://github.com/bladeacer";
    const target = '_blank';
    const features = 'noopener,noreferrer'; 
    window.open(url, target, features);
    return false;
});

Mousetrap.bind('g l', () => {
    const url = "https://gitlab.com/bladeacer";
    const target = '_blank';
    const features = 'noopener,noreferrer'; 
    window.open(url, target, features);
    return false;
});

Mousetrap.bind('b', () => {
    const url = "https://codeberg.org/bladeacer";
    const target = '_blank';
    const features = 'noopener,noreferrer'; 
    window.open(url, target, features);
    return false; 
});

Mousetrap.bind('g r', () => {
    const url = "https://gravatar.com/objectoriginal8f1e7ecf6f";
    const target = '_blank';
    const features = 'noopener,noreferrer'; 
    window.open(url, target, features);
    return false;
});

Mousetrap.bind('l i', () => {
    const url = "https://www.linkedin.com/in/nicholas-wen-a525832b2/";
    const target = '_blank';
    const features = 'noopener,noreferrer'; 
    window.open(url, target, features);
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

Mousetrap.bind('t', () => {
    window.location.href = "/portfolio/tags";
    return false; 
});

Mousetrap.bind('r', () => {
    const url = "/portfolio/resume";
    const target = '_blank';
    const features = 'noopener,noreferrer'; 
    window.open(url, target, features);
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

Mousetrap.bind('f', () => {
    window.location.href = "/portfolio/rss.xml";
    return false; 
});
