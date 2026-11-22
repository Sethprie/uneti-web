/**
 * Genera las imágenes PNG del sitio a partir de los SVG del logo:
 * - public/og.png: imagen para compartir en redes (1200×630).
 * - public/icon-192.png, public/icon-512.png: iconos del manifest.
 * - public/apple-touch-icon.png (180×180) y public/favicon-32.png.
 *
 * Uso: pnpm images
 * Solo hace falta volver a ejecutarlo si cambia el logo o el texto de la imagen.
 */
import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const NAVY = '#0d1f4f';
const ORANGE = '#f4570c';

const logoSvg = readFileSync('public/logo-uneti.svg');
const markSvg = readFileSync('public/favicon.svg');

/** El isotipo centrado sobre fondo blanco, con margen. */
async function icon(size, file, padding = 0.12) {
  const inner = Math.round(size * (1 - padding * 2));
  const mark = await sharp(markSvg, { density: 600 }).resize(inner, inner).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } })
    .composite([{ input: mark, gravity: 'center' }])
    .png()
    .toFile(file);
  console.log(`✓ ${file}`);
}

async function ogImage() {
  const width = 1200;
  const height = 630;
  const background = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <rect x="0" y="0" width="${width}" height="14" fill="${ORANGE}"/>
      <circle cx="1130" cy="600" r="200" fill="#00a9b7" fill-opacity="0.08"/>
      <rect x="560" y="132" rx="20" ry="20" width="300" height="44" fill="${NAVY}"/>
      <text x="710" y="162" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#ffffff">POR Y PARA ESTUDIANTES</text>
      <text x="556" y="270" font-family="Arial Narrow, Segoe UI, Arial, sans-serif" font-size="92" font-weight="700" fill="${NAVY}">UNETI</text>
      <text x="556" y="360" font-family="Arial Narrow, Segoe UI, Arial, sans-serif" font-size="92" font-weight="700" fill="${ORANGE}">Estudiantil</text>
      <text x="560" y="418" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="#4b587a">Guías, noticias y recursos de la UNETI</text>
      <text x="560" y="490" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#4b587a">Sitio estudiantil, no oficial · uneti-web.vercel.app</text>
    </svg>`);

  const logo = await sharp(logoSvg, { density: 600 }).resize({ height: 470 }).png().toBuffer();

  await sharp(background)
    .composite([{ input: logo, left: 110, top: 80 }])
    .png()
    .toFile('public/og.png');
  console.log('✓ public/og.png');
}

await ogImage();
await icon(512, 'public/icon-512.png');
await icon(192, 'public/icon-192.png');
await icon(180, 'public/apple-touch-icon.png', 0.1);
await icon(32, 'public/favicon-32.png', 0.04);
