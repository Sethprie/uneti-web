# Cómo contribuir

UNETI Estudiantil se construye con los aportes de la comunidad. Se puede contribuir de dos formas:

- **Contenido:** guías, noticias o recursos. No hace falta saber programar.
- **Código:** mejoras de diseño, accesibilidad o funcionalidades.

## Antes de empezar

- La información que dependa de la universidad (fechas, requisitos, normativas) debe enlazar la fuente oficial, preferiblemente [www.uneti.edu.ve](https://www.uneti.edu.ve/), e indicar cuándo se comprobó.
- El tono es cercano y claro: frases cortas, pasos numerados y sin jerga innecesaria.
- No se publican datos personales de terceros.

## Proponer contenido sin programar

Las propuestas pueden enviarse por los canales de la comunidad (Discord o WhatsApp, enlazados en la web) o abriendo un [*issue* en GitHub](https://github.com/Sethprie/uneti-web/issues/new). El equipo las revisa, sugiere ajustes si hacen falta y las publica con el nombre de quien las escribió.

## Añadir una guía o una noticia

1. Copiar la plantilla correspondiente:
   - `plantillas/guia.md` → `src/content/guias/`
   - `plantillas/noticia.md` → `src/content/noticias/`
2. Renombrar el archivo en minúsculas y con guiones. El nombre será la URL: `inscripcion.md` → `/guias/inscripcion`.
3. Rellenar los datos del encabezado (título, descripción, fecha o categoría, autor y etiquetas) y escribir el texto debajo, en Markdown.
4. Cambiar `draft: true` a `draft: false` cuando esté lista para publicarse.
5. Comprobar el resultado con `pnpm dev`. Los borradores también se ven en local.

Si algún campo del encabezado está mal escrito, `pnpm build` falla e indica cuál es, así nada roto llega a publicarse.

### Categorías de guías

`Primeros pasos`, `Trámites`, `Estudio` y `Vida universitaria`. Para añadir una nueva, ver la sección de configuración del [README](README.md#configuración).

## Añadir un recurso

Los enlaces de la página Recursos están en `src/data/recursos.ts`, agrupados por tema. Cada recurso es un objeto `{ title, url, description }`, y la URL debe apuntar a la fuente oficial de la herramienta.

## Contribuir con código

1. Hacer un *fork* de [Sethprie/uneti-web](https://github.com/Sethprie/uneti-web) y crear una rama para el cambio.
2. Instalar y arrancar el proyecto según el [README](README.md#desarrollo-local).
3. Verificar que `pnpm build` termina sin errores y que la web se ve bien en modo claro, en modo oscuro y en móvil.
4. Abrir un *pull request* contra `master` con una descripción breve del cambio.

Los *pull requests* no despliegan nada: la web solo se publica cuando el cambio llega a `master` (ver [DEPLOY.md](DEPLOY.md)).

### Convenciones

- Colores y tamaños se toman de las variables de `src/styles/global.css`, sin valores sueltos en los componentes, para que el modo oscuro siga funcionando.
- Los textos de la web van en español. Los nombres de archivos de contenido, sin tildes ni espacios.

## Licencia de las contribuciones

Al contribuir, se acepta que el código se publique bajo la licencia [MIT](LICENSE) y el contenido bajo [CC BY 4.0](LICENSE-CONTENT.md). Solo deben enviarse textos e imágenes propios o con una licencia compatible, indicando su fuente.
