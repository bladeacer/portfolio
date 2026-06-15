// Build-time search index: collects all page content for client-side FlexSearch
function stripMarkdown(text) {
  return text
    .replace(/^---[\s\S]*?---\n/, '') // frontmatter
    .replace(/!\[.*?\]\(.*?\)/g, '') // images
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1') // links
    .replace(/[#*`>|~_\-]/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTitle(raw) {
  var match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return '';
  var frontmatter = match[1];
  var t = frontmatter.match(/title:\s*"(.+?)"/);
  return t ? t[1] : '';
}

export async function GET() {
  // Get all markdown posts
  var postModules = import.meta.glob('./posts/**/*.md', { query: '?raw', import: 'default' });
  var staticPages = [
    { title: 'Home', url: '/portfolio/', content: 'Home page. About bladeacer. Personal portfolio and blog. Tech stack: CSS, Vim, Linux, Python, JavaScript. Current projects, social links GitHub GitLab Codeberg LinkedIn Gravatar email. Download resume. RSS feed. Keyboard shortcuts reference. Theme toggle. Site search. All content sections and navigation links.' },
    { title: 'About', url: '/portfolio/about/', content: 'About bladeacer. Keyboard shortcuts reference documentation. Site features and usage guide. Keybindings for scrolling j k arrow keys gg G, page navigation h a d c s r, toggles t f o colonslash questionmark escape. External link shortcuts em li gh gl b gr. All keyboard shortcut categories and descriptions.' },
    { title: 'Credits', url: '/portfolio/credits/', content: 'Credits and acknowledgements. Tools, fonts, icons, and libraries used to build this site. Cascadia Code, Maple Mono, DepartureMono fonts. Lucide icons. Astro framework. FlexSearch. Shiki syntax highlighting. Mousetrap keyboard library. Open source licenses and attributions.' },
    { title: 'Settings', url: '/portfolio/settings/', content: 'Site settings and customisation page. Configure active theme light dark system preference. Grid background toggle. Font family selection CascadiaCode Maple Mono Medium DepartureMono for sans fallback monospace. Font sizes in pixels. Heading sizes H1 H2 H3 H4 in em units. Heading colours. Accent colours for dark and light mode. Reset defaults button. Preview panel shows live changes.' },
    { title: 'Digital Garden', url: '/portfolio/digital-garden/', content: 'Digital garden index page. Collection of notes and writings covering Linux commands and tips, programming concepts, software development tools, PDF processing and extraction, text editors and Vim motions, CSS and theming, open source projects, Python scripting, operating systems, and other technical topics. Blog posts archive.' },
    { title: 'Resume', url: '/portfolio/resume/', content: 'Resume and CV page. Download PDF or view online resume of bladeacer. Skills, experience, education, projects. Software developer skilled in Python JavaScript TypeScript CSS HTML Linux system administration Vim Git. Professional background and qualifications. Contact information.' },
    { title: 'Tags', url: '/portfolio/tags/', content: 'All tags index page. Browse and filter posts by topic tags. Available tags: CSS, GNU, Linux, Nuitka, Obsidian, PDF, PDF text extraction, PDF table extraction, PDF image extraction, Pacman, Prolang, Python, SCSS, Scripting, Text editor, Theme, Unix, Vim, Vim motions, Open source, OS, Programming. Click any tag to see related content.' },
  ];

  var entries = [];

  // Process markdown posts
  for (var path in postModules) {
    try {
      var raw = await postModules[path]();
      var title = extractTitle(raw);
      var content = stripMarkdown(raw);
      // Build URL from path: ./posts/my-post.md -> /portfolio/posts/my-post
      var url = '/portfolio/' + path.replace(/^\.\//, '').replace(/\.md$/, '/');
      if (title) {
        entries.push({ title: title, url: url, content: content.substring(0, 3000) });
      }
    } catch(e) {}
  }

  // Add static pages
  staticPages.forEach(function(p) { entries.push(p); });

  return new Response(JSON.stringify(entries), {
    headers: { 'Content-Type': 'application/json' },
  });
}
