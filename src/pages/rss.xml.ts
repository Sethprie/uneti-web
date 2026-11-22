import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { site } from '../config/site';
import { getNoticias } from '../utils/content';

/** Feed RSS con las noticias, para seguir el sitio desde un lector de feeds. */
export const GET: APIRoute = async (context) => {
  const noticias = await getNoticias();
  return rss({
    title: `Noticias de ${site.name}`,
    description: site.description,
    site: context.site!,
    customData: `<language>${site.locale}</language>`,
    items: noticias.map((n) => ({
      title: n.data.title,
      description: n.data.description,
      pubDate: n.data.date,
      link: `/noticias/${n.id}/`,
      categories: n.data.tags,
    })),
  });
};
