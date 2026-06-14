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
    { title: 'Home', url: '/portfolio/', content: 'Home page - About Me' },
    { title: 'About', url: '/portfolio/about/', content: 'About bladeacer' },
    { title: 'Credits', url: '/portfolio/credits/', content: 'Credits and acknowledgements' },
    { title: 'Settings', url: '/portfolio/settings/', content: 'Site settings and customisation' },
    { title: 'Digital Garden', url: '/portfolio/digital-garden/', content: 'Digital garden index' },
    { title: 'Resume', url: '/portfolio/resume/', content: 'Resume and CV' },
    { title: 'Tags', url: '/portfolio/tags/', content: 'All tags index' },
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
