/**
 * Configuración general del sitio: nombre, descripción y navegación.
 * Para añadir una sección nueva al menú, basta con añadirla a `nav`.
 */

export const site = {
  name: 'UNETI Estudiantil',
  shortName: 'UNETI',
  description:
    'Guías, noticias y recursos de la UNETI, hechos por estudiantes y para estudiantes.',
  locale: 'es',
  /** Web oficial de la universidad. Déjalo vacío para no mostrar el enlace. */
  officialUrl: '',
  /** Repositorio del proyecto, para la página "Participa". Vacío = no se muestra. */
  repoUrl: '',
  /** Correo o formulario de contacto del equipo. Vacío = no se muestra. */
  contact: '',
};

export const nav = [
  { href: '/', label: 'Inicio' },
  { href: '/guias', label: 'Guías' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/recursos', label: 'Recursos' },
  { href: '/sobre', label: 'Sobre el proyecto' },
] as const;

/** Botón destacado a la derecha del menú. */
export const navCta = { href: '/participa', label: 'Participa' } as const;

/** Número de noticias por página en el listado. */
export const NEWS_PER_PAGE = 9;
