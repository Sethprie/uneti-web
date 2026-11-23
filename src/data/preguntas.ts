/**
 * Preguntas frecuentes, agrupadas por tema. Se muestran en /preguntas-frecuentes.
 *
 * - `respuesta` admite HTML sencillo: <p>, <ul>, <ol>, <li>, <strong>, <em> y <a>.
 * - Los enlaces externos se abren solos en una pestaña nueva.
 * - Si una respuesta depende de la universidad (fechas, requisitos), di de
 *   dónde sale y cuándo se comprobó, y actualiza `actualizado`.
 */

export const actualizado = new Date('2026-11-23');

export interface Pregunta {
  /** Identificador para enlazar directo a la pregunta (#id). Sin tildes ni espacios. */
  id: string;
  pregunta: string;
  respuesta: string;
}

export interface GrupoPreguntas {
  id: string;
  titulo: string;
  preguntas: Pregunta[];
}

export const preguntas: GrupoPreguntas[] = [
  {
    id: 'practicas',
    titulo: 'Prácticas profesionales',
    preguntas: [
      {
        id: 'pasantias',
        pregunta: '¿Cuándo empiezan las pasantías?',
        respuesta: `
          <p>En la UNETI no hay pasantías: lo que hay son <strong>prácticas profesionales</strong>, y van unidas a la UC <strong>Proyecto Socio Tecnológico</strong> (PST), desde el trayecto 1.</p>
          <ul>
            <li><strong>Tramo 1:</strong> inscripción y planificación. Aquí ya debes ir buscando dónde hacerlas.</li>
            <li><strong>Tramo 2:</strong> realizas las prácticas.</li>
          </ul>
          <p>Si un periodo ya cerró, toca esperar al siguiente periodo académico.</p>`,
      },
      {
        id: 'como-funcionan-las-practicas',
        pregunta: '¿Cómo consigo dónde hacer las prácticas?',
        respuesta: `
          <p>Lo buscas tú. El proceso es:</p>
          <ol>
            <li>Encuentra una <strong>empresa, comunidad o negocio</strong> que te acepte para realizar un proyecto con ellos.</li>
            <li>Envía sus datos por el canal que indiquen en el grupo de Proyecto Socio Tecnológico (normalmente, un formulario).</li>
            <li>La universidad te envía la <strong>carta de postulación</strong> con todos los datos para presentarla.</li>
          </ol>
          <p>El proyecto tiene que ser factible y estar aprobado por tu profesor, y la empresa debe darte permiso, espacio y recursos para hacerlo. Estate pendiente del grupo de PST para no perderte los formularios.</p>`,
      },
      {
        id: 'practicas-en-el-interior',
        pregunta: 'Vivo fuera de Caracas. ¿Dónde hago las prácticas?',
        respuesta: `
          <p>En tu propio estado. Cada estudiante busca la empresa, comunidad o negocio en el estado donde vive o donde prefiera, y la universidad le envía la carta de postulación igual.</p>`,
      },
      {
        id: 'empresa-privada',
        pregunta: '¿Puede ser una empresa privada? ¿Y si ya trabajo en una?',
        respuesta: `
          <p>Sí, puede ser privada. Si ya trabajas en un lugar, también puedes proponerlo, siempre que el proyecto sea factible y lo apruebe tu profesor.</p>
          <p>En informática no importa el tipo de empresa: el proyecto se puede hacer donde haya equipos para realizarlo.</p>`,
      },
      {
        id: 'cantv',
        pregunta: '¿Cómo hago las prácticas en CANTV?',
        respuesta: `
          <p>Para CANTV se suele pasar un formulario por el grupo de Proyecto Socio Tecnológico. Las cartas quedan directamente en CANTV, y allí te asignan el proyecto. Revisa bien cuál es cada formulario y llénalo a tiempo.</p>
          <p>A veces otras instituciones piden pasantes a la universidad; en ese caso lo anuncian por los grupos.</p>`,
      },
    ],
  },
  {
    id: 'carnet',
    titulo: 'Carnet estudiantil',
    preguntas: [
      {
        id: 'como-sacar-el-carnet',
        pregunta: '¿Cómo saco el carnet estudiantil?',
        respuesta: `
          <p>Se saca en las <strong>jornadas de carnetización</strong>:</p>
          <ol>
            <li>Envías tus datos por el medio que indiquen.</li>
            <li>Haces el pago.</li>
            <li>Se coordina el envío del carnet a tu ubicación.</li>
          </ol>
          <p>Después del trámite, el envío tarda un tiempo.</p>`,
      },
      {
        id: 'cuando-hay-carnetizacion',
        pregunta: '¿Cuándo es la próxima jornada de carnetización?',
        respuesta: `
          <p>Todavía no hay fechas oficiales. Se anunciarán por los <a href="/#canales-oficiales">canales oficiales</a> y por la comunidad de estudiantes.</p>
          <p>Si estás en el <strong>Trayecto Inicial</strong>, lo recomendable es esperar y sacarlo más adelante.</p>`,
      },
    ],
  },
  {
    id: 'clases',
    titulo: 'Clases y plataforma',
    preguntas: [
      {
        id: 'actividad-en-grupo',
        pregunta: 'Una actividad pide mínimo 2 personas y no encuentro compañeros. ¿La hago solo?',
        respuesta: `
          <p>Primero sigue preguntando en el grupo de tu sección: es normal que tarden en responder. Si no aparece nadie, <strong>habla con el profesor de la UC</strong>, explícale la situación y él te dirá si puedes hacerla solo.</p>`,
      },
      {
        id: 'falta-una-materia',
        pregunta: 'Me falta una materia en la plataforma. ¿Qué hago?',
        respuesta: `
          <p>Repórtalo con un ticket del tema <em>Plataforma Educativa</em> en el Centro de Atención al Estudiante. Te explicamos cómo en <a href="/guias/tramites-con-tickets">Trámites en el Centro de Atención al Estudiante</a>.</p>`,
      },
      {
        id: 'estudiar-desde-otro-pais',
        pregunta: '¿Puedo seguir estudiando si me voy del país?',
        respuesta: `
          <p>Sí. Si en algún momento hace falta ir a la sede, notifícalo a <strong>Control de Estudio</strong> para resolverlo.</p>`,
      },
    ],
  },
  {
    id: 'canales',
    titulo: 'Canales y comunidad',
    preguntas: [
      {
        id: 'telegram-oficial',
        pregunta: '¿Cuál es el Telegram oficial de la UNETI?',
        respuesta: `
          <p>Es <a href="https://t.me/+MfCEPPeXrxA4NzMx">este canal</a>, el que publicó la universidad en su Instagram. Entra al canal y, dentro, a su sección de <strong>comentarios</strong>: los dos son oficiales.</p>
          <p>Hay muchos grupos que se presentan como oficiales y no lo son. Revisa siempre de quién viene la información; la lista completa de canales oficiales está en la <a href="/#canales-oficiales">página de inicio</a>.</p>`,
      },
    ],
  },
];
