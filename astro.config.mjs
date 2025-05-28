// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightThemeFlexoki from 'starlight-theme-flexoki'

export default defineConfig({
    outDir: 'public',
    publicDir: 'static',
    integrations: [
        starlight({
            plugins: [starlightThemeFlexoki()],
            title: 'bladeacer\'s Portfolio',
        }),
    ],
});
