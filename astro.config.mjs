// @ts-check
import { readFileSync, readdirSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Dominio público del sitio, usado en URL canónicas, Open Graph, sitemap,
// robots.txt y RSS. Con un dominio propio, se define en SITE_URL.
const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://uneti-web.vercel.app');

/**
 * Fecha de última modificación de cada guía y noticia, leída del frontmatter
 * (`updated` o, si no hay, `date`), para el <lastmod> del sitemap.
 */
function contentLastmod() {
  const map = new Map();
  for (const [dir, route] of [
    ['src/content/guias', 'guias'],
    ['src/content/noticias', 'noticias'],
  ]) {
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
      const text = readFileSync(`${dir}/${file}`, 'utf8');
      const date = text.match(/^updated:\s*(\S+)/m)?.[1] ?? text.match(/^date:\s*(\S+)/m)?.[1];
      if (date) map.set(`/${route}/${file.replace(/\.md$/, '')}/`, new Date(date).toISOString());
    }
  }
  return map;
}

const lastmod = contentLastmod();

// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    sitemap({
      serialize(item) {
        const date = lastmod.get(new URL(item.url).pathname);
        return date ? { ...item, lastmod: date } : item;
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
