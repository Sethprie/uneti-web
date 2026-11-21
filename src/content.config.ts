/**
 * Colecciones de contenido. Cada entrada es un archivo Markdown en
 * src/content/<colección>/. El esquema valida el frontmatter al compilar,
 * así un campo mal escrito falla en el build en vez de romper la web.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Categorías de las guías. Añade aquí una nueva y aparecerá en /guias. */
export const GUIDE_CATEGORIES = [
  'Primeros pasos',
  'Trámites',
  'Estudio',
  'Vida universitaria',
] as const;

const noticias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/noticias' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('Equipo UNETI Estudiantil'),
    tags: z.array(z.string()).default([]),
    /** Las entradas con draft: true no se publican. */
    draft: z.boolean().default(false),
  }),
});

const guias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guias' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(GUIDE_CATEGORIES),
    /** Orden dentro de su categoría (menor = primero). */
    order: z.number().default(100),
    updated: z.coerce.date(),
    author: z.string().default('Equipo UNETI Estudiantil'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { noticias, guias };
