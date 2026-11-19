// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The custom domain serves the site from the root, so no base path is needed.
export default defineConfig({
  site: 'https://ygoc-blog.dev',
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
