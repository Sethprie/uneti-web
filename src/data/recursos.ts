/**
 * Recursos recomendados, agrupados por tema. Para añadir uno, copia un
 * objeto { title, url, description } dentro del grupo que corresponda.
 * Cada enlace debe llevar a la fuente oficial de la herramienta.
 */

export interface Recurso {
  title: string;
  url: string;
  description: string;
}

export interface GrupoRecursos {
  title: string;
  description: string;
  color: string;
  items: Recurso[];
}

export const recursos: GrupoRecursos[] = [
  {
    title: 'Universidad',
    description: 'Enlaces oficiales de la UNETI. Añade aquí la web, el sistema académico y las redes oficiales.',
    color: 'var(--brand-orange)',
    items: [],
  },
  {
    title: 'Investigar y citar',
    description: 'Para buscar fuentes fiables y citarlas bien en tus trabajos.',
    color: 'var(--brand-teal)',
    items: [
      {
        title: 'Google Académico',
        url: 'https://scholar.google.com/',
        description: 'Buscador de artículos científicos, tesis y libros.',
      },
      {
        title: 'Zotero',
        url: 'https://www.zotero.org/',
        description: 'Gestor de referencias gratuito: guarda fuentes y genera la bibliografía.',
      },
      {
        title: 'Normas APA',
        url: 'https://apastyle.apa.org/',
        description: 'Guía oficial del estilo APA para citas y referencias.',
      },
    ],
  },
  {
    title: 'Programar y aprender',
    description: 'Documentación y práctica para las materias técnicas.',
    color: 'var(--brand-purple)',
    items: [
      {
        title: 'MDN Web Docs',
        url: 'https://developer.mozilla.org/es/',
        description: 'Referencia de HTML, CSS y JavaScript, en español.',
      },
      {
        title: 'freeCodeCamp',
        url: 'https://www.freecodecamp.org/espanol/',
        description: 'Cursos gratuitos de programación con certificados.',
      },
      {
        title: 'GitHub Education',
        url: 'https://education.github.com/',
        description: 'Paquete de herramientas gratis para estudiantes.',
      },
    ],
  },
  {
    title: 'Organizarte',
    description: 'Para llevar al día clases, entregas y apuntes.',
    color: 'var(--brand-green)',
    items: [
      {
        title: 'Google Calendar',
        url: 'https://calendar.google.com/',
        description: 'Agenda tus clases y fechas de entrega con recordatorios.',
      },
      {
        title: 'Obsidian',
        url: 'https://obsidian.md/',
        description: 'Toma apuntes en Markdown y enlázalos entre sí.',
      },
    ],
  },
];
