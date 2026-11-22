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
  /** Código de verificación de Google Search Console (etiqueta HTML). Vacío = no se incluye. */
  googleSiteVerification: 'MVTbEzznz45i0qct1NNtF1nt3UQ_aoiSovj9DzPbChg',
};

export type IconName =
  | 'web'
  | 'campus'
  | 'help'
  | 'instagram'
  | 'telegram'
  | 'youtube'
  | 'facebook'
  | 'whatsapp'
  | 'discord';

/**
 * Canales oficiales, en dos grupos: los de la universidad y los de la
 * representación estudiantil. Se muestran en el inicio, en Recursos y en el pie.
 */
export const officialChannels = [
  {
    id: 'uneti',
    title: 'UNETI',
    kind: 'Canales institucionales',
    description: 'Información oficial de la universidad: anuncios, fechas y trámites.',
    color: 'var(--brand-orange)',
    links: [
      { icon: 'web', label: 'Web oficial', handle: 'www.uneti.edu.ve', url: 'https://www.uneti.edu.ve/' },
      {
        icon: 'campus',
        label: 'Campus virtual',
        handle: 'Aulas y cursos de cada PNF',
        url: 'https://www.uneti.edu.ve/campus/login/index.php',
      },
      {
        icon: 'help',
        label: 'Atención al Estudiante',
        handle: 'Trámites y consultas por ticket',
        url: 'https://ayuda.uneti.edu.ve/',
      },
      { icon: 'instagram', label: 'Instagram', handle: '@unetivzla', url: 'https://www.instagram.com/unetivzla/' },
      { icon: 'telegram', label: 'Telegram', handle: 'Canal de la UNETI', url: 'https://t.me/+MfCEPPeXrxA4NzMx' },
      { icon: 'youtube', label: 'YouTube', handle: 'UNETI Educativo', url: 'https://www.youtube.com/@UNETIEducativo' },
      { icon: 'facebook', label: 'Facebook', handle: 'Uneti Vzla', url: 'https://www.facebook.com/Uneti.Vzla/' },
    ],
  },
  {
    id: 'meu',
    title: 'MEU Código 200',
    kind: 'Representación estudiantil',
    description:
      'Comunidad oficial de estudiantes, creada tras la asamblea estudiantil. Abierta a todos los estudiantes de la UNETI, sin importar el trayecto o el PNF.',
    color: 'var(--brand-teal)',
    links: [
      {
        icon: 'whatsapp',
        label: 'Comunidad oficial de WhatsApp',
        handle: 'Para todos los estudiantes',
        url: 'https://chat.whatsapp.com/LRDAqoOEJiw2x86vnKTK2z',
      },
      { icon: 'instagram', label: 'Instagram', handle: '@meucodigo200', url: 'https://www.instagram.com/meucodigo200/' },
    ],
  },
] as const satisfies readonly {
  id: string;
  title: string;
  kind: string;
  description: string;
  color: string;
  links: readonly { icon: IconName; label: string; handle: string; url: string }[];
}[];

/**
 * Comunidad independiente de UNETI Estudiantil. No es oficial: la organizan y
 * administran estudiantes. Si `url` está vacío, se muestra como "Próximamente".
 */
export const community = [
  {
    id: 'whatsapp',
    icon: 'whatsapp',
    name: 'Comunidad de WhatsApp',
    description:
      'Nuestro espacio principal, ideal para avisos rápidos, recordatorios importantes y grupos divididos por secciones, con canales generales de las carreras para estar siempre al día.',
    cta: 'Unirme en WhatsApp',
    url: 'https://chat.whatsapp.com/HJ3j1rjGajX3ncninIkof9',
    color: '#1faa59',
  },
  {
    id: 'discord',
    icon: 'discord',
    name: 'Servidor de Discord',
    description:
      'Ideal para resolver dudas académicas, compartir apuntes, formar equipos de estudio y pasar el rato entre clases.',
    cta: 'Entrar al Discord',
    url: 'https://discord.gg/jfd25RE3Q2',
    color: '#5865f2',
  },
] as const;

/** Texto que presenta la comunidad independiente. */
export const communityAbout =
  'Este es un espacio independiente creado por y para estudiantes de la UNETI. No somos un canal oficial de la universidad, sino una iniciativa estudiantil diseñada para conectar, socializar y apoyarnos mutuamente a lo largo de la carrera.';

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
