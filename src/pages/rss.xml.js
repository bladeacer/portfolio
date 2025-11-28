import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'bladeacer\'s Portfolio | Digital Garden',
    description: 'bladeacer details their experience with software',
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
    customData: `<language>en-gb</language>`,
  });
}
