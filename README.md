# UNETI Estudiantil

Web informativa de la UNETI hecha por estudiantes y para estudiantes. Está construida con [Astro](https://astro.build): genera HTML estático, así que es rápida, se indexa bien y se puede alojar gratis.

## Empezar

Requiere [pnpm](https://pnpm.io). El proyecto descarga solo su versión de Node (24) gracias a `devEngines` en `package.json`, así que no importa cuál tengas instalada.

```sh
pnpm install
pnpm dev       # servidor local en http://localhost:4321
pnpm build     # genera la web en dist/
pnpm preview   # sirve dist/ para revisarla antes de publicar
```

## Estructura

```
src/
├── config/site.ts        Nombre, descripción, menú y enlaces (web oficial, repo, contacto)
├── content.config.ts     Esquema de las colecciones y categorías de guías
├── content/
│   ├── guias/            Una guía = un archivo .md
│   └── noticias/         Una noticia = un archivo .md
├── data/recursos.ts      Enlaces de la página Recursos
├── components/
│   ├── brand/Logo.astro  Logo UNETI en SVG (se adapta al modo oscuro)
│   ├── layout/           Cabecera, pie y selector de tema
│   ├── home/             Bloques de la portada
│   └── ui/               Tarjetas, etiquetas, migas de pan…
├── layouts/              Plantilla base y plantilla de artículo
├── pages/                Cada archivo es una ruta de la web
├── styles/global.css     Colores (claro/oscuro), tipografía y utilidades
└── utils/content.ts      Lectura y orden del contenido, fechas, etiquetas
plantillas/               Plantillas para escribir guías y noticias
public/                   Archivos tal cual: favicon y logo-uneti.svg
```

## Publicar una guía o una noticia

1. Copia `plantillas/guia.md` a `src/content/guias/` (o `plantillas/noticia.md` a `src/content/noticias/`).
2. Ponle un nombre en minúsculas con guiones: será la URL (`inscripcion.md` → `/guias/inscripcion`).
3. Rellena los datos de arriba, escribe el texto y cambia `draft: true` a `false`.

Si un campo está mal escrito, `pnpm build` falla y dice cuál es. Así no se publica nada roto.

## Personalizar

- **Colores:** variables en `src/styles/global.css` (`:root` para el modo claro y `[data-theme='dark']` para el oscuro).
- **Menú:** `nav` en `src/config/site.ts`.
- **Categorías de guías:** `GUIDE_CATEGORIES` en `src/content.config.ts` y su color en `CATEGORY_COLORS` (`src/utils/content.ts`).

## Despliegue en Vercel

Se publica con una GitHub Action en una cuenta de Vercel aparte, y solo con los commits del dueño del repositorio. La configuración paso a paso está en [DEPLOY.md](DEPLOY.md).
