# Despliegue

La web se publica en [Vercel](https://vercel.com) mediante una GitHub Action (`.github/workflows/deploy.yml`). Vercel no se conecta al repositorio: la Action compila la web y la sube con un token.

Este documento es para quien mantiene el proyecto. Para contribuir no hace falta nada de esto (ver [CONTRIBUTING.md](CONTRIBUTING.md)).

## Cómo funciona

- Cada push a `master` hecho por la **persona dueña del repositorio** compila y publica la web en producción.
- Los pushes de otras personas, aunque tengan permiso de escritura, no despliegan: el trabajo se salta.
- Los *pull requests*, incluidos los de *forks*, no despliegan ni tienen acceso a los secretos.
- `vercel.json` desactiva los despliegues automáticos de Vercel por Git, por si alguien conecta el repositorio desde el panel de Vercel.
- Si llegan varios pushes seguidos, solo se publica el último.
- El despliegue también puede lanzarse a mano desde **Actions → Desplegar en Vercel → Run workflow**.

Se recomienda usar una **cuenta de Vercel dedicada al proyecto**. Los límites del plan gratuito (Hobby) son por cuenta, así que un pico de tráfico en esta web no afectará a otros proyectos. El plan Hobby no factura por exceso de uso: al superar los límites, el proyecto se pausa.

## Configuración inicial

Se hace una sola vez.

### 1. Cuenta de Vercel

Crear la cuenta en [vercel.com/signup](https://vercel.com/signup) **con correo electrónico, no con GitHub**. Una cuenta de GitHub solo puede vincularse a una cuenta de Vercel, y este flujo no necesita esa vinculación.

### 2. Proyecto en Vercel

Desde la carpeta del repositorio:

```sh
pnpm dlx vercel@latest login
pnpm dlx vercel@latest link
```

- En `login`, entrar con el correo de la cuenta del proyecto.
- En `link`, crear un proyecto nuevo (por ejemplo, `uneti-web`). Si pregunta por conectar un repositorio de Git, responder **no**.

El comando genera `.vercel/project.json` (ignorado por Git), con los valores `orgId` y `projectId`.

### 3. Token de Vercel

En Vercel, **Account Settings → Tokens → Create**. Asignarle un nombre descriptivo (por ejemplo, `github-actions`) y el alcance de la cuenta del proyecto. El token solo se muestra una vez.

### 4. Secretos en GitHub

En el repositorio, **Settings → Secrets and variables → Actions → New repository secret**:

| Secreto | Valor |
| --- | --- |
| `VERCEL_TOKEN` | Token del paso 3 |
| `VERCEL_ORG_ID` | `orgId` de `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | `projectId` de `.vercel/project.json` |

### 5. Dominio (opcional)

Sin configuración adicional, la web usa `https://uneti-web.vercel.app` para el sitemap, el RSS y las URL canónicas. Con un dominio propio, crear en **Settings → Secrets and variables → Actions → Variables** una variable `SITE_URL` con la dirección completa, por ejemplo `https://uneti-estudiantil.com`.

### 6. Primer despliegue

Hacer push a `master`. El progreso se ve en la pestaña **Actions** del repositorio y, al terminar, la web queda publicada en el dominio del proyecto.

## Ajustes

- **Repositorio en una organización:** `github.repository_owner` será el nombre de la organización, no una persona. En `deploy.yml`, sustituir la condición por el usuario autorizado, por ejemplo `github.actor == 'usuario-autorizado'`.
- **Varias personas pueden desplegar:** usar una lista, por ejemplo `contains(fromJSON('["usuario-1", "usuario-2"]'), github.actor)`.
- **Aprobación manual de cada despliegue:** en **Settings → Environments → production**, añadir *Required reviewers*.
