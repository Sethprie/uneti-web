/** Funciones de ayuda para leer y presentar el contenido. */
import { getCollection, type CollectionEntry } from 'astro:content';
import { GUIDE_CATEGORIES } from '../content.config';

export type Noticia = CollectionEntry<'noticias'>;
export type Guia = CollectionEntry<'guias'>;

const isPublished = ({ data }: { data: { draft: boolean } }) =>
  import.meta.env.DEV || !data.draft;

/** Noticias publicadas, de la más reciente a la más antigua. */
export async function getNoticias(): Promise<Noticia[]> {
  const items = await getCollection('noticias', isPublished);
  return items.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Guías publicadas, ordenadas por categoría y orden. */
export async function getGuias(): Promise<Guia[]> {
  const items = await getCollection('guias', isPublished);
  return items.sort(
    (a, b) =>
      GUIDE_CATEGORIES.indexOf(a.data.category) - GUIDE_CATEGORIES.indexOf(b.data.category) ||
      a.data.order - b.data.order ||
      a.data.title.localeCompare(b.data.title, 'es'),
  );
}

/** Todas las etiquetas usadas, con cuántas entradas tienen cada una. */
export async function getTags(): Promise<{ tag: string; count: number }[]> {
  const all = [...(await getNoticias()), ...(await getGuias())];
  const counts = new Map<string, number>();
  for (const entry of all) {
    for (const tag of entry.data.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'es'));
}

/** Convierte una etiqueta en un trozo de URL: "Vida universitaria" → "vida-universitaria". */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Color de acento de cada categoría de guía, tomado de la franja del logo. */
export const CATEGORY_COLORS: Record<Guia['data']['category'], string> = {
  'Primeros pasos': 'var(--brand-orange)',
  Trámites: 'var(--brand-purple)',
  Estudio: 'var(--brand-teal)',
  'Vida universitaria': 'var(--brand-green)',
};

const dateFormat = new Intl.DateTimeFormat('es', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(date: Date): string {
  return dateFormat.format(date);
}

/** Minutos de lectura aproximados (200 palabras por minuto). */
export function readingTime(markdown = ''): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
