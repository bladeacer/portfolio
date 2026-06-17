var Mousetrap = window.Mousetrap;
// Scoped selectors: only direct-list-item children + specific class-based targets
const CANDIDATE_SELECTOR = '.content-wrapper > p:not(.foot):not(.cta):not(.cta2):not(.cta3), .content-wrapper > h1, .content-wrapper > h2, .content-wrapper > h3, .content-wrapper > h4, .content-wrapper > ul > li, .content-wrapper > ol > li, .content-wrapper > blockquote, .content-wrapper > pre, .content-wrapper > table, .content-wrapper .markdown-content p, .content-wrapper .markdown-content h1, .content-wrapper .markdown-content h2, .content-wrapper .markdown-content h3, .content-wrapper .markdown-content h4, .content-wrapper .markdown-content li, .content-wrapper .markdown-content pre, .content-wrapper .markdown-content table, .content-wrapper .markdown-content blockquote, .content-wrapper .blog-card';

const HIGHLIGHT_DURATION = 2000;
const HIGHLIGHT_CLASS = 'active-line-highlight';
const ACCELERATION_MAX_FACTOR = 0.15;
const BASE_SCROLL_DURATION = 350;

let lastHighlightedElement = null;
let highlightTimeout = null;
let animationFrame = null;
let keyHoldStartTime = 0;
let scrollStartTimestamp = 0;
let startPosition = 0;
let distanceToScroll = 0;

let numericPrefix = 1;
let numericPrefixTimeout = null; 
let lastModifiedLink = null;

function removeHighlight() {
    if (lastHighlightedElement) {
        lastHighlightedElement.classList.remove(HIGHLIGHT_CLASS);
        lastHighlightedElement = null;
    }
}

function startHighlightTimer() {
    clearTimeout(highlightTimeout);
    highlightTimeout = setTimeout(removeHighlight, HIGHLIGHT_DURATION);
}

// --- Easing Function (Smoother scroll transition) ---
// Cubic easing out function
function easeOutCubic(t) {
    return (--t) * t * t + 1;
}

// --- Highlight Function ---
function highlightActiveLine() {
    const candidates = document.querySelectorAll(CANDIDATE_SELECTOR);
    const viewportCenterY = window.innerHeight / 2;
    let closestElement = null;
    let closestDistance = Infinity;

    // Find new closest element
    candidates.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.height > 0) {
            const distance = Math.abs(rect.top + rect.height / 2 - viewportCenterY);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestElement = el;
            }
        }
    });

    // Apply highlight only if a new closest element is found AND it's different from the last one.
    if (closestElement && closestElement !== lastHighlightedElement) {
        // 1. Remove highlight from the old element
        if (lastHighlightedElement) {
            lastHighlightedElement.classList.remove(HIGHLIGHT_CLASS);
        }
        
        // 2. Apply highlight to the new element
        closestElement.classList.add(HIGHLIGHT_CLASS);
        lastHighlightedElement = closestElement;
        
        // 3. Reset the timer
        startHighlightTimer(); 
    }
}

function animateScroll(timestamp) {
    if (!scrollStartTimestamp) {
        scrollStartTimestamp = timestamp;
    }
    
    const elapsedTime = timestamp - scrollStartTimestamp;
    
    let accelerationFactor = 0;
    
    if (numericPrefix > 1 || keyHoldStartTime > 0) {
        const totalKeyHoldTime = timestamp - keyHoldStartTime; 
        const maxHoldTimeForAccel = 1500;
        
        if (totalKeyHoldTime > 0) {
            const t = Math.min(1, totalKeyHoldTime / maxHoldTimeForAccel);
            accelerationFactor = ACCELERATION_MAX_FACTOR * t;
        }
    }
    
    // Adjust duration based on acceleration (Keep this block the same)
    const actualDuration = BASE_SCROLL_DURATION / (1 + accelerationFactor);
    
    const progress = Math.min(1, elapsedTime / actualDuration);
    const easedProgress = easeOutCubic(progress);

    // Calculate new scroll position (Keep this block the same)
    const newPosition = startPosition + distanceToScroll * easedProgress;
    window.scrollTo(0, newPosition);
    
    // Update highlight during the scroll (Keep this block the same)
    highlightActiveLine(); 

    if (progress < 1) {
        animationFrame = requestAnimationFrame(animateScroll);
    } else {
        // Animation finished, reset state
        scrollStartTimestamp = 0;
        lastScrollTime = timestamp;
        numericPrefix = 1;
        keyHoldStartTime = 0;
    }
}

// --- Utility: Find Next/Previous Heading Index ---
function findNextHeadingIndex(currentIndex, direction, candidates, count) {
  count = count || 1;
  var found = 0;
  var idx = currentIndex + direction;

  while (idx >= 0 && idx < candidates.length) {
    if (candidates[idx].tagName.toLowerCase().match(/^h[1-4]$/)) {
      found++;
      if (found >= count) return idx;
    }
    idx += direction;
  }

  return (direction === 1) ? candidates.length - 1 : 0;
}

 
// --- Main Jump Function (FIXED G/gg and J/K/{} scroll calculation) ---
function jumpToElement(direction, command, count) {
  count = count || 1;
  var raw = Array.from(document.querySelectorAll(CANDIDATE_SELECTOR))
    .filter(function(el) { return el.getBoundingClientRect().height > 0; });
  // Collapse: skip children of <li> (e.g. <p> inside markdown <li>)
  // and collapse consecutive <li> siblings into one entry
  var candidates = [];
  for (var i = 0; i < raw.length; i++) {
    var el = raw[i];
    // Skip elements whose parent is an <li> (handles markdown <li><p> patterns)
    if (el.parentElement && el.parentElement.tagName === 'LI') continue;
    candidates.push(el);
    if (el.tagName === 'LI') {
      var listParent = el.parentNode;
      while (i + 1 < raw.length && raw[i + 1].parentNode === listParent) {
        i++;
      }
    }
  }

  if (candidates.length === 0) return;

  var targetElement;
  var currentIndex = -1;
  var bestDistance = Infinity;
  var viewportCenterY = window.innerHeight / 2;

  var maxScrollY = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  ) - window.innerHeight;

  candidates.forEach(function(el, index) {
    var rect = el.getBoundingClientRect();
    var elementCenterY = rect.top + rect.height / 2;
    var distance = Math.abs(elementCenterY - viewportCenterY);
    if (distance < bestDistance) {
      bestDistance = distance;
      currentIndex = index;
    }
  });

  var nextIndex = currentIndex;
  var targetScrollTop;

  if (command === 'top') {
    nextIndex = 0;
    targetScrollTop = 0;
  } else if (command === 'bottom') {
    nextIndex = candidates.length - 1;
    targetScrollTop = maxScrollY;
  } else if (command === 'heading') {
    nextIndex = findNextHeadingIndex(currentIndex, direction, candidates, count);
    targetElement = candidates[nextIndex];
    var targetRect = targetElement.getBoundingClientRect();
    targetScrollTop = window.scrollY + targetRect.top + (targetRect.height / 2) - viewportCenterY;
  } else {
    nextIndex = currentIndex + direction * count;
    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex >= candidates.length) nextIndex = candidates.length - 1;
    targetElement = candidates[nextIndex];
    var targetRect = targetElement.getBoundingClientRect();
    targetScrollTop = window.scrollY + targetRect.top + (targetRect.height / 2) - viewportCenterY;
  }

  if (!targetElement && nextIndex !== -1) {
    targetElement = candidates[nextIndex];
  }

  if (!targetElement || nextIndex === currentIndex) return;

  startPosition = window.scrollY;
  distanceToScroll = targetScrollTop - startPosition;

  if (Math.abs(distanceToScroll) < 1) return;

  if (animationFrame) cancelAnimationFrame(animationFrame);
  scrollStartTimestamp = 0;
  animationFrame = requestAnimationFrame(animateScroll);
}


// --- Mousetrap Bindings ---

// Utility to handle numeric prefixes before a command
function handleNumberKey(event) {
    const number = parseInt(event.key, 10);
    if (!isNaN(number)) {
        clearTimeout(numericPrefixTimeout);
        numericPrefix = (numericPrefix === 1 ? 0 : numericPrefix) * 10 + number;
        numericPrefixTimeout = setTimeout(() => {
            numericPrefix = 1;
        }, 1000);
    }
}
// Bind number keys 0-9 for prefix capture
for (let i = 0; i <= 9; i++) {
    Mousetrap.bind(String(i), handleNumberKey, 'keydown');
}

function handleKeydown(direction, command = null) {
    clearTimeout(numericPrefixTimeout);

    if (keyHoldStartTime === 0) {
        keyHoldStartTime = performance.now();
    }
    
    const count = numericPrefix;
    numericPrefix = 1;

    jumpToElement(direction, command, count);
    return count;
}

function navigateToNearestLink() {
    if (!lastHighlightedElement) {
        lastHighlightedElement = document.querySelector(`.${HIGHLIGHT_CLASS}`);
        if (!lastHighlightedElement) return;
    }

    let targetLink = null;
    let navigationUrl = null;

    // 1. GLOBAL ANCHOR CHECK
    // First, check if the highlight itself is a link, OR is inside a link, OR contains a link
    targetLink = lastHighlightedElement.closest('a') || lastHighlightedElement.querySelector('a');

    // 2. IMAGE FALLBACK (Only if no anchor was found above or inside)
    if (!targetLink) {
        const isImg = lastHighlightedElement.tagName.toLowerCase() === 'img';
        const imgInside = isImg ? lastHighlightedElement : lastHighlightedElement.querySelector('img');

        if (imgInside) {
            // Check if the image found is wrapped in a link (redundancy check)
            const imgParentAnchor = imgInside.closest('a');
            if (imgParentAnchor) {
                targetLink = imgParentAnchor;
            } else if (imgInside.src) {
                navigationUrl = imgInside.src;
            }
        }
    }

    // 3. EXECUTION
    if (targetLink) {
        // LRU Style Management
        if (lastModifiedLink && lastModifiedLink !== targetLink) {
            lastModifiedLink.style.outline = '';
            lastModifiedLink.style.boxShadow = '';
        }

        targetLink.style.outline = '2px solid var(--flexcyon-orange)';
        lastModifiedLink = targetLink;

        // Force target="_blank"
        const originalTarget = targetLink.getAttribute('target');
        targetLink.setAttribute('target', '_blank');
        targetLink.click();
        
        // Restore target state
        setTimeout(() => {
            if (originalTarget) {
                targetLink.setAttribute('target', originalTarget);
            } else {
                targetLink.removeAttribute('target');
            }
        }, 0);
        
        const href = targetLink.getAttribute('href');
        if (href && href.startsWith('#')) {
            setTimeout(highlightActiveLine, 100);
        }

    } else if (navigationUrl) {
        // Direct image navigation if no anchor exists anywhere in the hierarchy
        window.open(navigationUrl, '_blank');
    }
}

function showStatus(chord, desc) {
  if (window.showStatus) window.showStatus(chord, desc);
}

// J/K Bindings
// --- Yank Functionality ---
var yPending = false;
var yPendingTimer = null;

function getYankUnit() {
  try {
    var raw = localStorage.getItem('portfolio-settings');
    if (raw) {
      var s = JSON.parse(raw);
      return s.yankUnit || 'words';
    }
  } catch {}
  return 'words';
}

function formatYankCount(text) {
  var unit = getYankUnit();
  var count;
  switch (unit) {
    case 'words':
      count = text.split(/\s+/).filter(Boolean).length;
      break;
    case 'sentences':
      count = text.split(/[.!?]+/).filter(Boolean).length;
      break;
    case 'paragraphs':
      count = text.split(/\n\s*\n/).filter(Boolean).length;
      break;
    default:
      count = text.length;
  }
  return count + ' ' + unit;
}

function yankToClipboard(text, label) {
  navigator.clipboard.writeText(text).then(function() {
    showStatus(label || 'yank', 'Copied ' + formatYankCount(text));
  }).catch(function() {
    showStatus(label || 'yank', 'Clipboard write failed');
  });
}

function yankCurrentElement() {
  var el = document.querySelector('.' + HIGHLIGHT_CLASS) || lastHighlightedElement;
  if (!el) return;
  var count = numericPrefix > 1 ? numericPrefix : 1;
  numericPrefix = 1;
  if (count > 1) {
    var cs = Array.from(document.querySelectorAll(CANDIDATE_SELECTOR));
    var idx = cs.indexOf(el);
    if (idx !== -1) {
      var endIdx = Math.min(idx + count, cs.length);
      var texts = cs.slice(idx, endIdx).map(function(e) { return e.textContent.trim(); });
      yankToClipboard(texts.join('\n'), count + 'yy');
      return;
    }
  }
  yankToClipboard(el.textContent.trim(), 'yy');
}

function yankWholePage() {
  numericPrefix = 1;
  var text = document.body.innerText || document.body.textContent || '';
  yankToClipboard(text.trim(), 'Y');
}

function yankToHeading(direction) {
  var el = document.querySelector('.' + HIGHLIGHT_CLASS) || lastHighlightedElement;
  if (!el) return;
  var cs = Array.from(document.querySelectorAll(CANDIDATE_SELECTOR));
  var idx = cs.indexOf(el);
  if (idx === -1) return;
  var headingIdx = findNextHeadingIndex(idx, direction, cs);
  if (headingIdx === idx) {
    // No heading found in that direction; yank to boundary
    headingIdx = direction === 1 ? cs.length - 1 : 0;
  }
  var start = direction === 1 ? idx : headingIdx;
  var end = direction === 1 ? headingIdx + 1 : idx + 1;
  var texts = cs.slice(start, end).map(function(e) { return e.textContent.trim(); });
  yankToClipboard(texts.join('\n'), 'y' + (direction === 1 ? '}' : '{'));
}

// Capture-phase keydown for yank state machine (intercepts before Mousetrap)
document.addEventListener('keydown', function(e) {
  var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
  if (e.repeat) return;
  if (e.ctrlKey || e.altKey || e.metaKey) return;

  if (yPending) {
    if (e.key === 'y') {
      e.stopPropagation();
      e.preventDefault();
      yPending = false;
      clearTimeout(yPendingTimer);
      yankCurrentElement();
      return;
    }
    if (e.key === '}') {
      e.stopPropagation();
      e.preventDefault();
      yPending = false;
      clearTimeout(yPendingTimer);
      yankToHeading(1);
      return;
    }
    if (e.key === '{') {
      e.stopPropagation();
      e.preventDefault();
      yPending = false;
      clearTimeout(yPendingTimer);
      yankToHeading(-1);
      return;
    }
    // Any other key cancels yank prompt
    yPending = false;
    clearTimeout(yPendingTimer);
  }

  if (e.key === 'y' && !e.shiftKey) {
    yPending = true;
    yPendingTimer = setTimeout(function() { yPending = false; }, 1000);
    return;
  }

  if (e.key === 'Y') {
    e.stopPropagation();
    e.preventDefault();
    yankWholePage();
    return;
  }
}, true);

// Update shortcuts registry for yank commands
if (window.__shortcutsRegistry) {
  window.__shortcutsRegistry.push(
    { chord: 'yy', desc: 'Yank current element' },
    { chord: 'Y', desc: 'Yank entire page' },
    { chord: 'y}', desc: 'Yank from current to next heading' },
    { chord: 'y{', desc: 'Yank from current to previous heading' },
    { chord: 'zz', desc: 'Center active line in viewport' },
    { chord: 'zt', desc: 'Scroll active line to top' },
    { chord: 'zb', desc: 'Scroll active line to bottom' }
  );
}

Mousetrap.bind('j', () => {
  var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
  var c = handleKeydown(1);
  showStatus(c > 1 ? c + 'j' : 'j', 'Scrolled down');
}, 'keydown');
Mousetrap.bind('k', () => {
  var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
  var c = handleKeydown(-1);
  showStatus(c > 1 ? c + 'k' : 'k', 'Scrolled up');
}, 'keydown');

// Heading Jumps
Mousetrap.bind('{', () => {
  var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
  var c = handleKeydown(-1, 'heading');
  showStatus(c > 1 ? c + '{' : '{', 'Previous heading');
});
Mousetrap.bind('}', () => {
  var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
  var c = handleKeydown(1, 'heading');
  showStatus(c > 1 ? c + '}' : '}', 'Next heading');
});

// GG/G Bindings (Full top/bottom scroll)
Mousetrap.bind('g g', () => {
  var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
  var c = handleKeydown(0, 'top');
  showStatus(c > 1 ? c + 'gg' : 'gg', 'Top of page');
});
Mousetrap.bind('G', () => {
  var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
  var c = handleKeydown(0, 'bottom');
  showStatus(c > 1 ? c + 'G' : 'G', 'Bottom of page');
});

Mousetrap.bind('l', () => {
  var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
  highlightActiveLine();
  showStatus('l', 'Highlighted active line');
}, 'keydown');

// zz / zt / zb: scroll active line to center / top / bottom
function scrollActiveLine(block) {
  var el = document.querySelector('.' + HIGHLIGHT_CLASS) || lastHighlightedElement;
  if (!el) {
    // Fall back to closest element to viewport center
    highlightActiveLine();
    el = lastHighlightedElement;
  }
  if (!el) return;
  if (block === 'end') {
    // Account for status bar height at the bottom of the viewport
    var statusBar = document.querySelector('.status-bar');
    var offset = statusBar ? statusBar.offsetHeight : 0;
    var rect = el.getBoundingClientRect();
    var targetY = window.scrollY + rect.bottom - window.innerHeight + offset;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: block });
  }
}

Mousetrap.bind('z z', function() {
  scrollActiveLine('center');
  showStatus('zz', 'Centered active line');
  return false;
});
Mousetrap.bind('z t', function() {
  scrollActiveLine('start');
  showStatus('zt', 'Scrolled active line to top');
  return false;
});
Mousetrap.bind('z b', function() {
  scrollActiveLine('end');
  showStatus('zb', 'Scrolled active line to bottom');
  return false;
});

Mousetrap.bind('enter', (e) => {
    // Don't intercept Enter when focused on form fields
    var tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
    // Prevent default behavior (like form submission) if we're navigating
    if (lastHighlightedElement) {
        e.preventDefault();
        navigateToNearestLink();
        showStatus('Enter', 'Opened link');
    }
});
