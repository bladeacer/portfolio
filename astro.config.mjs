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
            dark: flexcyonDark,
            light: flexcyonLight,
          },
        },
    },
});
