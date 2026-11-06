// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: change this to your real domain before deploying.
// It is used for canonical URLs, Open Graph tags, the RSS feed and the sitemap.
export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      // Two themes so code blocks follow the site's light/dark toggle.
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      wrap: true,
    },
  },
});
