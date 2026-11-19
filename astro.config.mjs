// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import sitemap from '@astrojs/sitemap';

// GitHub Pages serves this repository at https://ygoc95.github.io/ygoc-blog/.
// Keep this in sync with SITE.url in src/consts.ts.
const base = '/ygoc-blog';

/**
 * Astro prefixes its own routes and bundled assets with `base`, but a path
 * written in Markdown such as `/images/foo.png` is passed through untouched.
 * Add the base to root-relative links and image sources in post content.
 */
const basePathPlugin = {
  name: 'base-paths',
  element: {
    filter: ['a', 'img'],
    /**
     * @param {import('hast').Element} node
     * @param {import('satteri').HastVisitorContext} ctx
     */
    visit(node, ctx) {
      const attribute = node.tagName === 'img' ? 'src' : 'href';
      const value = node.properties?.[attribute];
      if (
        typeof value === 'string' &&
        value.startsWith('/') &&
        !value.startsWith('//') &&
        value !== base &&
        !value.startsWith(`${base}/`)
      ) {
        ctx.setProperty(
          node,
          attribute,
          value === '/' ? `${base}/` : `${base}${value}`,
        );
      }
    },
  },
};

export default defineConfig({
  site: 'https://ygoc95.github.io',
  base,
  integrations: [sitemap()],
  markdown: {
    processor: satteri({ hastPlugins: [basePathPlugin] }),
    shikiConfig: {
      // Two themes so code blocks follow the site's light/dark toggle.
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      wrap: true,
    },
  },
});
