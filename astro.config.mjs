// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import flexcyonDark from './src/themes/flexcyon-dark.json' with { type: 'json' };
import flexcyonLight from './src/themes/flexcyon-light.json' with { type: 'json' };

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
          themes: {
            /** @type {any} */
            dark: flexcyonDark,
            /** @type {any} */
            light: flexcyonLight,
          },
        },
    },
    vite: {
        build: {
            minify: true,
            cssMinify: true,
        },
    },
});
