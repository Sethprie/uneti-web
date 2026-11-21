# UNETI Estudiantil

Web informativa de la UNETI hecha por estudiantes y para estudiantes: guías, noticias y recursos para la comunidad universitaria.

Es un [proyecto de código abierto](https://github.com/Sethprie/uneti-web) y **no es la web oficial de la universidad**. La web oficial es [www.uneti.edu.ve](https://www.uneti.edu.ve/).

Está construida con [Astro](https://astro.build) y genera HTML estático. Por eso es rápida, se indexa bien en buscadores y puede alojarse sin coste.

## Requisitos

- [pnpm](https://pnpm.io) 12 o superior.
- No hace falta instalar una versión concreta de Node: el proyecto declara Node 24 en `devEngines` y pnpm lo descarga solo para este proyecto.

## Desarrollo local

```sh
git clone https://github.com/Sethprie/uneti-web.git
cd uneti-web
pnpm install
pnpm dev       # servidor local en http://localhost:4321
pnpm build     # genera la web en dist/
pnpm preview   # sirve dist/ para revisar la compilación
```

## Estructura

```
src/
├── config/site.ts        Nombre, descripción, menú, web oficial y canales de la comunidad
├── content.config.ts     Esquema de las colecciones y categorías de guías
├── content/
│   ├── guias/            Una guía = un archivo .md
│   └── noticias/         Una noticia = un archivo .md
├── data/recursos.ts      Enlaces de la página Recursos
├── components/
│   ├── brand/Logo.astro  Logo de la UNETI en SVG (se adapta al modo oscuro)
│   ├── layout/           Barra de la web oficial, cabecera, pie y selector de tema
│   ├── home/             Bloques de la portada y de la comunidad
│   └── ui/               Tarjetas, etiquetas, migas de pan…
├── layouts/              Plantilla base y plantilla de artículo
├── pages/                Cada archivo es una ruta de la web
├── styles/global.css     Colores (claro y oscuro), tipografía y utilidades
└── utils/content.ts      Lectura y orden del contenido, fechas y etiquetas
plantillas/               Plantillas para escribir guías y noticias
public/                   Archivos servidos tal cual: favicon y logo-uneti.svg
```

## Configuración

| Qué | Dónde |
| --- | --- |
| Web oficial, repositorio y contacto | `site` en `src/config/site.ts` |
| Enlaces de Discord y WhatsApp | `community` en `src/config/site.ts` (sin URL se muestran como "Próximamente") |
| Menú principal | `nav` en `src/config/site.ts` |
| Categorías de guías y sus colores | `GUIDE_CATEGORIES` en `src/content.config.ts` y `CATEGORY_COLORS` en `src/utils/content.ts` |
| Colores del tema | Variables de `src/styles/global.css`: `:root` para el modo claro y `[data-theme='dark']` para el oscuro |

## Contribuir

Las contribuciones son bienvenidas, tanto de contenido (guías, noticias, recursos) como de código. El proceso está en [CONTRIBUTING.md](CONTRIBUTING.md).

## Despliegue

La web se publica en Vercel mediante una GitHub Action, y solo con los commits que la persona dueña del repositorio sube a `master`. El proceso y la configuración inicial están en [DEPLOY.md](DEPLOY.md).

## Licencia

- **Código:** [MIT](LICENSE).
- **Contenido** (guías, noticias, plantillas y textos): [CC BY 4.0](LICENSE-CONTENT.md).
- El nombre y el logo de la UNETI pertenecen a la universidad y no están cubiertos por estas licencias.
