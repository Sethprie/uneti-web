# Despliegue en Vercel

La web se publica en una **cuenta de Vercel aparte**, sin conectar Vercel a GitHub. Quien publica es una GitHub Action (`.github/workflows/deploy.yml`) que sube la web con un token.

Así:

- Esta web no comparte límites con los proyectos de tu otra cuenta de Vercel.
- **Solo se despliegan los commits que empujas tú** a `master`. Los pushes de otras personas y los pull requests desde forks no publican nada.

> El plan Hobby de Vercel no cobra por tráfico: si se superan los límites gratuitos, el proyecto se pausa en vez de facturar.

## Configuración (una sola vez)

### 1. Crea la cuenta de Vercel

En [vercel.com/signup](https://vercel.com/signup), regístrate **con un correo, no con GitHub**. Así no choca con tu otra cuenta, que ya tiene GitHub vinculado.

### 2. Crea el proyecto en Vercel desde tu equipo

En la carpeta del proyecto:

```sh
pnpm dlx vercel@latest login
pnpm dlx vercel@latest link
```

- En `login`, entra con el correo de la cuenta nueva.
- En `link`, elige **crear un proyecto nuevo** (por ejemplo `uneti-web`). Si pregunta si quieres conectar un repositorio de Git, responde **no**.

Esto crea el archivo `.vercel/project.json`, que ya está ignorado en Git. Ábrelo y copia dos valores:

- `orgId` → será el secreto `VERCEL_ORG_ID`
- `projectId` → será el secreto `VERCEL_PROJECT_ID`

### 3. Crea un token de Vercel

En Vercel, ve a **Account Settings → Tokens → Create**. Ponle un nombre (por ejemplo `github-actions`), elige el alcance de la cuenta nueva y copia el token. Solo se muestra una vez.

### 4. Guarda los tres secretos en GitHub

En tu repositorio de GitHub, ve a **Settings → Secrets and variables → Actions → New repository secret** y crea:

| Nombre | Valor |
| --- | --- |
| `VERCEL_TOKEN` | el token del paso 3 |
| `VERCEL_ORG_ID` | `orgId` de `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | `projectId` de `.vercel/project.json` |

Opcional: si conectas un dominio propio, crea en la pestaña **Variables** (no en Secrets) una variable `SITE_URL` con el dominio, por ejemplo `https://uneti-estudiantil.com`. Sin ella se usa el dominio `.vercel.app` del proyecto.

### 5. Publica

Haz push a `master`. En la pestaña **Actions** de GitHub verás el despliegue "Desplegar en Vercel". Al terminar, la web queda publicada en el dominio del proyecto en Vercel.

También puedes lanzarlo a mano desde **Actions → Desplegar en Vercel → Run workflow**.

## Quién puede desplegar

- El workflow solo se ejecuta si quien empuja (`github.actor`) es el **dueño del repositorio**. Si alguien con permiso de escritura hace push, el trabajo se salta.
- Si el repositorio está en una **organización** y no en tu cuenta personal, cambia en `deploy.yml` `github.repository_owner` por tu usuario entre comillas, por ejemplo `'tu-usuario'`.
- `vercel.json` desactiva los despliegues automáticos de Vercel por Git, por si algún día alguien conecta el repositorio desde Vercel.
- Si quieres además aprobar cada despliegue a mano, en GitHub ve a **Settings → Environments → production** y añade una regla de revisión obligatoria (*Required reviewers*).
