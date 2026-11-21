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
  /** Repositorio del proyecto (pie y página "Participa"). Vacío = no se muestra. */
  repoUrl: 'https://github.com/Sethprie/uneti-web',
  /** Correo o formulario de contacto del equipo. Vacío = no se muestra. */
  contact: '',
};

/**
 * Canales de la comunidad. No son oficiales: los organizan y administran
 * estudiantes. Si `url` está vacío, se muestran como "Próximamente" y sin enlace.
 */
export const community = [
  {
    id: 'discord',
    name: 'Servidor de Discord',
    description: 'Canales por carrera y materia, dudas, apuntes y salas de estudio.',
    cta: 'Entrar al Discord',
    url: 'https://discord.gg/jfd25RE3Q2',
    color: '#5865f2',
  },
  {
    id: 'whatsapp',
    name: 'Comunidad de WhatsApp',
    description: 'Avisos y grupos por carrera, directo en tu teléfono.',
    cta: 'Unirme en WhatsApp',
    url: 'https://chat.whatsapp.com/HJ3j1rjGajX3ncninIkof9',
    color: '#1faa59',
  },
] as const;

/** Aviso que acompaña a los canales de la comunidad. */
export const communityNotice =
  'Grupos no oficiales: los organizan, administran y moderan estudiantes, no la UNETI.';

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
