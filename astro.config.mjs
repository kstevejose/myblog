// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://stevekundukulangara.com',
  integrations: [sitemap()],

  // Chirpy routes that no longer exist. Post URLs are unchanged, so they
  // need no redirect — these are only the theme's index pages.
  redirects: {
    '/archives': '/posts',
    '/archives/': '/posts',
    '/categories': '/posts',
    '/categories/': '/posts',
    '/categories/blog': '/posts',
    '/categories/blog/': '/posts',
    '/tags': '/posts',
    '/tags/': '/posts',
    '/tags/api': '/posts',
    '/tags/concepts': '/posts',
    '/tags/docassystem': '/posts',
    '/tags/how-to': '/posts',
    '/tags/tutorials': '/posts',
    '/page2': '/posts',
    '/page2/': '/posts',
  },

  markdown: {
    shikiConfig: {
      theme: 'github-dark-default',
      wrap: false,
    },
  },
  build: { inlineStylesheets: 'auto' },
});
