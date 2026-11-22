import type { APIRoute } from 'astro';
import { site } from '../config/site';

/** Manifest web: nombre, colores e iconos al guardar el sitio en el móvil. */
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      {
        name: site.name,
        short_name: site.name,
        description: site.description,
        lang: site.locale,
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0d1f4f',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
      null,
      2,
    ),
    { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } },
  );
