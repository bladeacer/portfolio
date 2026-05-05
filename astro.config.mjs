// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
    outDir: 'public',
    publicDir: 'static',
    site: 'https://bladeacer.gitlab.io',
    base: '/portfolio',
    integrations: [
        icon(),
    ],
    markdown: {
        shikiConfig: {
          theme: 'night-owl',
        },
    },
});
