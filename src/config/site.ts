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
  /** Web oficial de la universidad. Se destaca en la barra superior de todas las páginas. */
  officialUrl: 'https://www.uneti.edu.ve/',
  officialLabel: 'www.uneti.edu.ve',
  /** Repositorio del proyecto, para la página "Participa". Vacío = no se muestra. */
  repoUrl: '',
  /** Correo o formulario de contacto del equipo. Vacío = no se muestra. */
  contact: '',
};

/**
 * Canales de la comunidad. Mientras `url` esté vacío, se muestran como
 * "Próximamente" y sin enlace. Pega aquí la invitación cuando la tengas.
 */
export const community = [
  {
    id: 'discord',
    name: 'Servidor de Discord',
    description: 'Canales por carrera y materia, dudas, apuntes y salas de estudio.',
    cta: 'Entrar al Discord',
    url: '', // TODO: invitación de Discord, ej. https://discord.gg/xxxxxxx
    color: '#5865f2',
  },
  {
    id: 'whatsapp',
    name: 'Comunidad de WhatsApp',
    description: 'Avisos importantes y grupos por carrera, directo en tu teléfono.',
    cta: 'Unirme en WhatsApp',
    url: '', // TODO: enlace de la comunidad, ej. https://chat.whatsapp.com/xxxxxxx
    color: '#1faa59',
  },
] as const;

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
