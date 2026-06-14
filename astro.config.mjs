// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import flexcyonDark from './src/themes/flexcyon-dark.json' with { type: 'json' };

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
          theme: flexcyonDark,
        },
    },
});
