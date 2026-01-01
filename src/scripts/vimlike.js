// --- Configuration ---
const CANDIDATE_SELECTOR = 'body > div > p, body > div > h1, body > div > h2, body > div > h3, body > div > h4, body > div > ul > li, body > div > blockquote, body > div > blockquote > ul > li, body > div > li, body > div > pre, body > div > table, body > div .post-item > .blog-card, body > div > .cards > .card-item > a > img, body > div > .cards > .card-item > p, body > div > .profile li, body > div > .profile > .profile-desc > a > p'; 
// RETAIN: Used for checking element type within jumpToElement
const HEADING_TYPE_SELECTOR = 'h1, h2, h3, h4'; 
const HIGHLIGHT_DURATION = 2000;
const HIGHLIGHT_CLASS = 'active-line-highlight';
const ACCELERATION_MAX_FACTOR = 0.15;
const BASE_SCROLL_DURATION = 350;

// --- State Variables ---
let lastHighlightedElement = null;
let highlightTimeout = null;
let animationFrame = null;
let lastScrollTime = 0;
let keyHoldTime = 0;
let keyHoldStartTime = 0;
let scrollStartTimestamp = 0;
let startPosition = 0;
let distanceToScroll = 0;

// NEW State for Numerical Prefixes
let numericPrefix = 1; // Default to 1
let numericPrefixTimeout = null; 
let lastModifiedLink = null;

// --- Utility Functions ---

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
        // Animation finished, reset animation state for the next jump
        scrollStartTimestamp = 0;
        lastScrollTime = timestamp;
        
        // If there's a numeric prefix remaining (2 or more), perform the next jump
        if (numericPrefix > 1) {
            numericPrefix--; // Decrement the count
            // Recalculate and start the next jump immediately
            const direction = distanceToScroll > 0 ? 1 : -1;
            // Pass the 'command' argument to preserve heading logic during chained jumps
            jumpToElement(direction, lastCommand); 
        } else {
            // If all jumps are done (numericPrefix is 1 or less):
            // 1. Reset the numericPrefix state
            numericPrefix = 1; 
            
            // 2. Reset the keyHoldStartTime
            keyHoldStartTime = 0;
        }
    }
}

// --- Utility: Find Next/Previous Heading Index ---
function findNextHeadingIndex(currentIndex, direction, candidates) {
    let nextIndex = currentIndex + direction;

    while (nextIndex >= 0 && nextIndex < candidates.length) {
        const tagName = candidates[nextIndex].tagName.toLowerCase();
        
        // Check if the element is an H1, H2, or H3
        if (tagName.match(/^h[1-4]$/)) {
            return nextIndex; 
        }
        nextIndex += direction;
    }
    
    // If no heading is found in that direction, return the boundary index
    return (direction === 1) ? candidates.length - 1 : 0;
}


// --- Global Variable to Store the Last Command ---
let lastCommand = null;

// --- Main Jump Function (FIXED G/gg and J/K/{} scroll calculation) ---
function jumpToElement(direction, command = null) {
    // 1. Get ALL scrollable candidates
    const candidates = Array.from(document.querySelectorAll(CANDIDATE_SELECTOR))
        .filter(el => el.getBoundingClientRect().height > 0);

    if (candidates.length === 0) return;

    let targetElement;
    let currentIndex = -1;
    let bestDistance = Infinity;
    const viewportCenterY = window.innerHeight / 2;
    
    // Max scroll calculation for G command
    const maxScrollY = Math.max(
        document.body.scrollHeight, 
        document.documentElement.scrollHeight, 
        document.body.offsetHeight, 
        document.documentElement.offsetHeight, 
        document.body.clientHeight, 
        document.documentElement.clientHeight
    ) - window.innerHeight; 

    // Find the element currently closest to the center
    candidates.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const elementCenterY = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenterY - viewportCenterY);
        if (distance < bestDistance) {
            bestDistance = distance;
            currentIndex = index;
        }
    });
    
    // 2. Determine the target index and calculate the target scroll position
    let nextIndex = currentIndex;
    let targetScrollTop; // This will hold the absolute pixel value to scroll to

    if (command === 'top') {
        nextIndex = 0;
        targetScrollTop = 0; // Absolute top of the page
    } else if (command === 'bottom') {
        nextIndex = candidates.length - 1;
        targetScrollTop = maxScrollY; // Absolute bottom of the page
    } else if (command === 'heading') {
        nextIndex = findNextHeadingIndex(currentIndex, direction, candidates);
        targetElement = candidates[nextIndex];

        // Calculate scroll-to-center for the heading
        const targetRect = targetElement.getBoundingClientRect();
        targetScrollTop = window.scrollY + targetRect.top + (targetRect.height / 2) - viewportCenterY;
        
    } else { // J/K Logic
        nextIndex = currentIndex + direction;
        
        // Boundary check
        if (nextIndex < 0) nextIndex = 0;
        if (nextIndex >= candidates.length) nextIndex = candidates.length - 1;
        
        targetElement = candidates[nextIndex];

        // Calculate scroll-to-center for J/K
        const targetRect = targetElement.getBoundingClientRect();
        targetScrollTop = window.scrollY + targetRect.top + (targetRect.height / 2) - viewportCenterY;
    }

    // Ensure targetElement is set for gg/G commands
    if (!targetElement && nextIndex !== -1) {
        targetElement = candidates[nextIndex];
    }
    
    // Stop if already at the boundary or if the new index is the same as the current one
    if (!targetElement || nextIndex === currentIndex) return;

    // 3. Set the scroll distance based on the calculated targetScrollTop
    startPosition = window.scrollY;
    distanceToScroll = targetScrollTop - startPosition;

    // If the distance is too small (e.g., at the boundary and trying to scroll further)
    if (Math.abs(distanceToScroll) < 1) return;

    // Store the command for multi-jumps (10j, etc.)
    lastCommand = command;

    // 4. Start the custom smooth scroll animation
    if (animationFrame) cancelAnimationFrame(animationFrame);
    scrollStartTimestamp = 0; // Reset timestamp for the new animation
    animationFrame = requestAnimationFrame(animateScroll);
}


// --- Mousetrap Bindings ---

// Utility to handle numeric prefixes before a command
function handleNumberKey(event) {
    const number = parseInt(event.key, 10);
    if (!isNaN(number)) {
        // Clear the old timeout
        clearTimeout(numericPrefixTimeout);
        // Build the prefix
        numericPrefix = (numericPrefix === 1 ? 0 : numericPrefix) * 10 + number;
        
        // Set a timeout to reset the prefix if no command follows
        numericPrefixTimeout = setTimeout(() => {
            numericPrefix = 1;
        }, 800);
    }
}
// Bind number keys for prefix capture
for (let i = 0; i <= 9; i++) {
    Mousetrap.bind(String(i), handleNumberKey, 'keydown');
}

function handleKeydown(direction, command = null) {
    // Prevent execution in input/textarea fields
    if (document.activeElement.tagName.toLowerCase() === 'input' || document.activeElement.tagName.toLowerCase() === 'textarea') {
        return;
    }
    clearTimeout(numericPrefixTimeout); // Stop number capture

    // Only initialize keyHoldStartTime if it hasn't been set (i.e., if it's the first keydown)
    if (keyHoldStartTime === 0) {
        keyHoldStartTime = performance.now();
    }
    
    const count = numericPrefix;
    numericPrefix = 1; // Reset prefix immediately

    // Perform the first jump
    jumpToElement(direction, command);
    
    // Set the remaining count for the animation loop to handle
    if (count > 1) {
        numericPrefix = count;
    }
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

// J/K Bindings
Mousetrap.bind('j', () => handleKeydown(1), 'keydown');
Mousetrap.bind('k', () => handleKeydown(-1), 'keydown');

// Heading Jumps
Mousetrap.bind('{', () => handleKeydown(-1, 'heading')); // Find previous heading (scroll up)
Mousetrap.bind('}', () => handleKeydown(1, 'heading')); // Find next heading (scroll down)

// GG/G Bindings (Full top/bottom scroll)
Mousetrap.bind('g g', () => handleKeydown(0, 'top'));
Mousetrap.bind('G', () => handleKeydown(0, 'bottom'));

Mousetrap.bind('l', () => { 
    highlightActiveLine(); 
}, 'keydown');

Mousetrap.bind('enter', (e) => {
    // Prevent default behavior (like form submission) if we're navigating
    if (lastHighlightedElement) {
        e.preventDefault();
        navigateToNearestLink();
    }
});
