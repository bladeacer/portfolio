// @ts-check
import { defineConfig } from 'astro/config';
import { tableOfContents } from 'astro-table-of-contents';

export default defineConfig({
    outDir: 'public',
    publicDir: 'static',
    site: 'https://bladeacer.gitlab.io',
    base: '/portfolio',
    integrations: [
        tableOfContents({
            title: 'Table Of Contents',
        }),
    ],
    markdown: {
        shikiConfig: {
          theme: 'night-owl',
        },
    },
});
