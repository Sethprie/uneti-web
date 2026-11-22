/**
 * Genera los SVG de la guía de Git y GitHub en src/assets/guias/git/:
 * - Diagramas de conceptos (historial, flujo, ramas, fork...).
 * - Ventanas de terminal con la salida real de los comandos.
 * - Recuadros "captura pendiente" para las capturas que faltan.
 *
 * Uso: node scripts/guia-git/diagramas.mjs
 * Los diagramas llevan su propio fondo claro para leerse igual en modo oscuro.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'src/assets/guias/git';
mkdirSync(OUT, { recursive: true });

const C = {
  navy: '#0d1f4f',
  orange: '#f4570c',
  teal: '#00a9b7',
  tealDark: '#00727c',
  yellow: '#ffbb00',
  purple: '#641556',
  green: '#00a01a',
  muted: '#4b587a',
  border: '#dfe4ef',
  soft: '#f4f6fb',
  white: '#ffffff',
};
const SANS = "'Segoe UI', Inter, system-ui, Arial, sans-serif";
const MONO = "'Cascadia Mono', Consolas, 'DejaVu Sans Mono', Menlo, monospace";

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function save(name, width, height, body, { card = true } = {}) {
  const bg = card
    ? `<rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="18" fill="${C.soft}" stroke="${C.border}" stroke-width="2"/>`
    : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" font-family="${SANS}">
<defs>
  <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.navy}"/></marker>
  <marker id="arrow-o" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.orange}"/></marker>
  <marker id="arrow-t" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.tealDark}"/></marker>
</defs>
${bg}
${body}
</svg>
`;
  writeFileSync(join(OUT, name), svg);
  console.log(`✓ ${join(OUT, name)}`);
}

const text = (x, y, s, { size = 16, weight = 400, color = C.navy, anchor = 'start', family } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}"${family ? ` font-family="${family}"` : ''}>${esc(s)}</text>`;
const box = (x, y, w, h, { fill = C.white, stroke = C.border, sw = 2, r = 14 } = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const arrow = (x1, y1, x2, y2, { color = C.navy, marker = 'arrow', dash } = {}) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="3"${dash ? ` stroke-dasharray="${dash}"` : ''} marker-end="url(#${marker})"/>`;
const pill = (x, y, s, { fill = C.navy, color = C.white, size = 15, family = MONO } = {}) => {
  const w = s.length * size * 0.62 + 24;
  return `<rect x="${x - w / 2}" y="${y - size - 4}" width="${w}" height="${size + 16}" rx="${(size + 16) / 2}" fill="${fill}"/>${text(x, y + 2, s, { size, weight: 600, color, anchor: 'middle', family })}`;
};
const commit = (x, y, color = C.orange, r = 13) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" stroke="${C.white}" stroke-width="4"/>`;

/* ---------- 1. Historial de commits ---------- */
{
  const W = 900, H = 290;
  const items = [
    ['a1f3c09', 'Crea la guía del campus'],
    ['7be2d41', 'Añade cómo entrar'],
    ['c90e5aa', 'Corrige el enlace de tickets'],
    ['ec84d4c', 'Añade horario de la biblioteca'],
  ];
  let b = text(40, 52, 'El historial de un proyecto con Git', { size: 22, weight: 700 });
  b += text(40, 80, 'Cada punto es un commit: una foto del proyecto con un mensaje que explica qué cambió.', { size: 15, color: C.muted });
  b += `<line x1="90" y1="160" x2="${W - 90}" y2="160" stroke="${C.navy}" stroke-width="4" stroke-linecap="round"/>`;
  items.forEach(([hash, msg], i) => {
    const x = 125 + i * 215;
    b += commit(x, 160, i === items.length - 1 ? C.orange : C.navy, 15);
    b += text(x, 205, hash, { size: 14, color: C.tealDark, anchor: 'middle', family: MONO, weight: 600 });
    b += text(x, 230, msg, { size: 15, anchor: 'middle', weight: 600 });
  });
  b += pill(770, 122, 'tu versión actual', { fill: C.orange, family: SANS, size: 13 });
  b += text(120, 122, 'más antiguo', { size: 13, color: C.muted, anchor: 'middle' });
  b += text(W / 2, 268, 'Puedes volver a cualquier punto, ver quién cambió qué y cuándo.', { size: 14, color: C.muted, anchor: 'middle' });
  save('historial.svg', W, H, b);
}

/* ---------- 2. Git y GitHub ---------- */
{
  const W = 900, H = 340;
  let b = text(40, 52, 'Git y GitHub no son lo mismo', { size: 22, weight: 700 });
  b += box(40, 90, 330, 200, { stroke: C.navy });
  b += text(205, 128, 'Tu computadora', { size: 18, weight: 700, anchor: 'middle' });
  b += pill(205, 162, 'Git', { fill: C.orange, family: SANS, size: 15 });
  b += text(205, 205, 'La herramienta que guarda', { size: 15, color: C.muted, anchor: 'middle' });
  b += text(205, 227, 'el historial de tu carpeta.', { size: 15, color: C.muted, anchor: 'middle' });
  b += text(205, 262, 'Funciona sin internet.', { size: 15, color: C.muted, anchor: 'middle' });

  b += box(530, 90, 330, 200, { stroke: C.tealDark });
  b += text(695, 128, 'Internet', { size: 18, weight: 700, anchor: 'middle' });
  b += pill(695, 162, 'GitHub  ·  GitLab', { fill: C.tealDark, family: SANS, size: 15 });
  b += text(695, 205, 'Sitios que guardan una copia', { size: 15, color: C.muted, anchor: 'middle' });
  b += text(695, 227, 'del proyecto para compartirlo', { size: 15, color: C.muted, anchor: 'middle' });
  b += text(695, 249, 'y colaborar con otras personas.', { size: 15, color: C.muted, anchor: 'middle' });

  b += arrow(385, 165, 515, 165);
  b += text(450, 152, 'subir', { size: 14, weight: 700, anchor: 'middle' });
  b += arrow(515, 215, 385, 215, { color: C.tealDark, marker: 'arrow-t' });
  b += text(450, 240, 'traer', { size: 14, weight: 700, anchor: 'middle', color: C.tealDark });
  b += text(W / 2, 320, 'Lo que aprendas de Git te sirve igual en GitHub, GitLab o cualquier otro sitio.', { size: 14, color: C.muted, anchor: 'middle' });
  save('git-y-github.svg', W, H, b);
}

/* ---------- 3. El flujo de trabajo ---------- */
{
  const W = 1000, H = 400;
  const cols = [
    ['Tu carpeta', 'Los archivos', 'que estás editando'],
    ['Preparados', 'Lo que irá en', 'el próximo commit'],
    ['Historial', 'Tus commits,', 'en tu computadora'],
    ['GitHub', 'La copia', 'en internet'],
  ];
  const cmds = ['git add', 'git commit', 'git push'];
  let b = text(40, 52, 'El camino de un cambio', { size: 22, weight: 700 });
  b += text(40, 80, 'De izquierda a derecha: así llega lo que editas hasta GitHub.', { size: 15, color: C.muted });
  const bw = 180, gap = 60, x0 = 40, y0 = 130;
  cols.forEach(([t, l1, l2], i) => {
    const x = x0 + i * (bw + gap);
    const last = i === cols.length - 1;
    b += box(x, y0, bw, 130, { stroke: last ? C.tealDark : C.navy, sw: last ? 3 : 2 });
    b += text(x + bw / 2, y0 + 40, t, { size: 18, weight: 700, anchor: 'middle', color: last ? C.tealDark : C.navy });
    b += text(x + bw / 2, y0 + 76, l1, { size: 15, color: C.muted, anchor: 'middle' });
    b += text(x + bw / 2, y0 + 98, l2, { size: 15, color: C.muted, anchor: 'middle' });
    if (i < cmds.length) {
      const ax = x + bw + 6;
      b += arrow(ax, y0 + 65, ax + gap - 12, y0 + 65, { color: C.orange, marker: 'arrow-o' });
      b += pill(ax + (gap - 6) / 2, y0 - 14, cmds[i], { fill: C.orange, size: 14 });
    }
  });
  // vuelta: git pull
  const yb = y0 + 190;
  const xr = x0 + 3 * (bw + gap) + bw / 2;
  const xl = x0 + bw / 2;
  b += `<path d="M${xr},${y0 + 136} V${yb} H${xl + 8}" fill="none" stroke="${C.tealDark}" stroke-width="3" marker-end="url(#arrow-t)"/>`;
  b += `<line x1="${xl}" y1="${yb}" x2="${xl}" y2="${y0 + 140}" stroke="${C.tealDark}" stroke-width="3" marker-end="url(#arrow-t)"/>`;
  b += pill(W / 2, yb + 6, 'git pull', { fill: C.tealDark, size: 14 });
  b += text(W / 2, yb + 44, 'Trae a tu carpeta los cambios nuevos que haya en GitHub.', { size: 14, color: C.muted, anchor: 'middle' });
  save('flujo.svg', W, H, b);
}

/* ---------- 4. Ramas ---------- */
{
  const W = 940, H = 330;
  let b = text(40, 52, 'Las ramas', { size: 22, weight: 700 });
  b += text(40, 80, 'Una rama es una línea de trabajo aparte: pruebas sin tocar la versión principal.', { size: 15, color: C.muted });
  const ym = 250, yr = 150;
  b += `<line x1="70" y1="${ym}" x2="${W - 60}" y2="${ym}" stroke="${C.navy}" stroke-width="5" stroke-linecap="round"/>`;
  b += `<path d="M250,${ym} C300,${ym} 300,${yr} 360,${yr} H600 C660,${yr} 660,${ym} 720,${ym}" fill="none" stroke="${C.orange}" stroke-width="5"/>`;
  [110, 250, 720, 860].forEach((x) => (b += commit(x, ym, C.navy)));
  [420, 560].forEach((x) => (b += commit(x, yr, C.orange)));
  b += pill(150, ym + 46, 'master', { fill: C.navy, size: 14 });
  b += text(260, ym + 52, 'la versión principal (la que está publicada)', { size: 14, color: C.muted });
  b += pill(490, yr - 34, 'guia-horario-biblioteca', { fill: C.orange, size: 14 });
  b += text(236, ym - 22, 'git switch -c', { size: 13, color: C.orange, anchor: 'end', family: MONO, weight: 600 });
  b += text(738, ym - 22, 'pull request aceptado', { size: 13, color: C.tealDark, weight: 700 });
  save('ramas.svg', W, H, b);
}

/* ---------- 5. Fork ---------- */
{
  const W = 940, H = 440;
  let b = text(40, 52, 'Cómo se contribuye a un proyecto ajeno', { size: 22, weight: 700 });
  b += text(40, 80, 'No puedes escribir directo en el proyecto original, así que trabajas en tu copia (fork).', { size: 15, color: C.muted });
  // original
  b += box(40, 120, 340, 110, { stroke: C.navy, sw: 3 });
  b += text(210, 158, 'Proyecto original', { size: 17, weight: 700, anchor: 'middle' });
  b += text(210, 190, 'Sethprie/uneti-web', { size: 15, color: C.tealDark, anchor: 'middle', family: MONO, weight: 600 });
  b += text(210, 214, 'en GitHub', { size: 14, color: C.muted, anchor: 'middle' });
  // fork
  b += box(560, 120, 340, 110, { stroke: C.orange, sw: 3 });
  b += text(730, 158, 'Tu copia (fork)', { size: 17, weight: 700, anchor: 'middle' });
  b += text(730, 190, 'tu-usuario/uneti-web', { size: 15, color: C.tealDark, anchor: 'middle', family: MONO, weight: 600 });
  b += text(730, 214, 'en GitHub', { size: 14, color: C.muted, anchor: 'middle' });
  // computer
  b += box(560, 320, 340, 90, { stroke: C.navy });
  b += text(730, 358, 'Tu computadora', { size: 17, weight: 700, anchor: 'middle' });
  b += text(730, 386, 'donde editas y haces commits', { size: 14, color: C.muted, anchor: 'middle' });

  b += arrow(390, 150, 548, 150);
  b += pill(470, 136, '1. Fork', { fill: C.navy, family: SANS, size: 13 });
  b += arrow(690, 240, 690, 310);
  b += text(680, 282, '2. git clone', { size: 14, anchor: 'end', family: MONO, weight: 600 });
  b += arrow(770, 310, 770, 240, { color: C.orange, marker: 'arrow-o' });
  b += text(780, 282, '3. git push', { size: 14, color: C.orange, family: MONO, weight: 600 });
  b += arrow(548, 205, 390, 205, { color: C.tealDark, marker: 'arrow-t' });
  b += pill(470, 232, '4. Pull request', { fill: C.tealDark, family: SANS, size: 13 });
  b += text(210, 300, 'Quien mantiene el proyecto', { size: 14, color: C.muted, anchor: 'middle' });
  b += text(210, 322, 'revisa tu propuesta y, si está', { size: 14, color: C.muted, anchor: 'middle' });
  b += text(210, 344, 'bien, la une al original.', { size: 14, color: C.muted, anchor: 'middle' });
  save('fork.svg', W, H, b);
}

/* ---------- 6. git pull no es pull request ---------- */
{
  const W = 940, H = 300;
  let b = text(W / 2, 52, 'Se parecen en el nombre, pero no tienen nada que ver', { size: 21, weight: 700, anchor: 'middle' });
  const panel = (x, title, color, from, to, l1, l2) => {
    let p = box(x, 82, 420, 190, { stroke: color, sw: 3 });
    p += pill(x + 210, 122, title, { fill: color, size: 15, family: title.startsWith('git') ? MONO : SANS });
    p += text(x + 90, 172, from, { size: 15, weight: 700, anchor: 'middle' });
    p += arrow(x + 160, 167, x + 250, 167, { color, marker: color === C.orange ? 'arrow-o' : 'arrow-t' });
    p += text(x + 330, 172, to, { size: 15, weight: 700, anchor: 'middle' });
    p += text(x + 210, 220, l1, { size: 15, color: C.muted, anchor: 'middle' });
    p += text(x + 210, 244, l2, { size: 15, color: C.muted, anchor: 'middle' });
    return p;
  };
  b += panel(40, 'git pull', C.tealDark, 'GitHub', 'Tu computadora', 'Traes cambios a tu computadora.', 'Lo haces tú, con un comando.');
  b += panel(480, 'Pull request', C.orange, 'Tu copia', 'Proyecto original', 'Pides que acepten tus cambios.', 'Lo revisa otra persona, en GitHub.');
  save('pull-vs-pull-request.svg', W, H, b);
}

/* ---------- Terminales ---------- */

/**
 * Ventana de Git Bash. Cada línea es un string (salida) o un objeto:
 * { cmd, dir, branch } para un comando con su prompt de dos líneas,
 * { t, color } para salida coloreada, y `note` (número) para marcarla.
 */
function terminal(name, title, lines, notes = []) {
  const size = 15, lh = 22, cw = size * 0.6;
  const rows = [];
  for (const l of lines) {
    if (typeof l === 'object' && l.cmd !== undefined) {
      rows.push({ prompt: l });
      rows.push({ cmd: l.cmd, note: l.note });
    } else rows.push(typeof l === 'string' ? { t: l } : l);
  }
  const W = 980;
  const H = 54 + rows.length * lh + 24;
  let b = `<rect x="0" y="0" width="${W}" height="${H}" rx="12" fill="#0c0c0c"/>`;
  b += `<rect x="0" y="0" width="${W}" height="36" rx="12" fill="#2b2b2b"/><rect x="0" y="24" width="${W}" height="12" fill="#2b2b2b"/>`;
  b += text(16, 23, title, { size: 13, color: '#d0d0d0' });
  b += text(W - 100, 24, '—', { size: 14, color: '#bbb' }) + text(W - 66, 24, '☐', { size: 14, color: '#bbb' }) + text(W - 32, 24, '✕', { size: 14, color: '#bbb' });
  rows.forEach((r, i) => {
    const y = 60 + i * lh;
    if (r.prompt) {
      const p = r.prompt;
      b += `<text x="18" y="${y}" font-size="${size}" font-family="${MONO}"><tspan fill="#16c60c">ana@PC-ANA</tspan> <tspan fill="#b148c6">MINGW64</tspan> <tspan fill="#f9f1a5">${esc(p.dir ?? '~')}</tspan>${p.branch ? ` <tspan fill="#61d6d6">(${esc(p.branch)})</tspan>` : ''}</text>`;
    } else if (r.cmd !== undefined) {
      b += `<text x="18" y="${y}" font-size="${size}" font-family="${MONO}" fill="#f2f2f2" xml:space="preserve">$ ${esc(r.cmd)}</text>`;
    } else {
      b += `<text x="18" y="${y}" font-size="${size}" font-family="${MONO}" fill="${r.color ?? '#cccccc'}" xml:space="preserve">${esc(r.t)}</text>`;
    }
    if (r.note) {
      const len = (r.cmd !== undefined ? r.cmd.length + 2 : (r.t ?? '').length);
      b += `<rect x="16" y="${y - 16}" width="${len * cw + 6}" height="${lh}" rx="4" fill="none" stroke="${C.orange}" stroke-width="2"/>`;
      // Si la línea es muy larga, la nota va en la fila siguiente
      let x = 18 + len * cw + 22, ny = y;
      if (x > W - 300) {
        const next = rows[i + 1];
        const nlen = next ? (next.cmd !== undefined ? next.cmd.length + 2 : (next.t ?? '').length) : 0;
        x = 18 + nlen * cw + 30;
        ny = y + lh;
      }
      b += `<circle cx="${x}" cy="${ny - 5}" r="12" fill="${C.orange}"/>` + text(x, ny, String(r.note), { size: 14, weight: 700, color: C.white, anchor: 'middle' });
      const n = notes[r.note - 1];
      if (n) b += text(x + 20, ny, n, { size: 14, weight: 600, color: '#ffd0b8' });
    }
  });
  save(name, W, H, b, { card: false });
}

terminal('terminal-configurar.svg', 'MINGW64:/c/Users/ana', [
  { cmd: 'git --version', note: 1 },
  'git version 2.56.1.windows.1',
  '',
  { cmd: 'git config --global user.name "Ana Pérez"', note: 2 },
  '',
  { cmd: 'git config --global user.email "ana@ejemplo.com"', note: 3 },
  '',
  { cmd: '' },
], ['Comprueba que Git está instalado', 'Tu nombre, tal como aparecerá en los commits', 'El mismo correo de tu cuenta de GitHub']);

terminal('terminal-clonar.svg', 'MINGW64:/c/Users/ana', [
  { cmd: 'git clone https://github.com/tu-usuario/uneti-web.git', note: 1 },
  "Cloning into 'uneti-web'...",
  'remote: Enumerating objects: 250, done.',
  'remote: Counting objects: 100% (250/250), done.',
  'remote: Compressing objects: 100% (145/145), done.',
  'Receiving objects: 100% (250/250), 183.17 KiB | 699.00 KiB/s, done.',
  'Resolving deltas: 100% (100/100), done.',
  '',
  { cmd: 'cd uneti-web', note: 2 },
  '',
  { dir: '~/uneti-web', branch: 'master', cmd: 'git switch -c guia-horario-biblioteca', note: 3 },
  "Switched to a new branch 'guia-horario-biblioteca'",
  '',
  { dir: '~/uneti-web', branch: 'guia-horario-biblioteca', cmd: '' },
], ['Descarga tu copia', 'Entra en la carpeta', 'Crea tu rama y cámbiate a ella']);

terminal('terminal-status.svg', 'MINGW64:/c/Users/ana/uneti-web', [
  { dir: '~/uneti-web', branch: 'guia-horario-biblioteca', cmd: 'git status' },
  { t: 'On branch guia-horario-biblioteca', note: 1 },
  { t: 'Changes not staged for commit:', note: 2 },
  '  (use "git add <file>..." to update what will be committed)',
  '  (use "git restore <file>..." to discard changes in working directory)',
  { t: '        modified:   src/content/guias/campus-virtual.md', color: '#e74856', note: 3 },
  '',
  'no changes added to commit (use "git add" and/or "git commit -a")',
], ['En qué rama estás', 'Hay cambios sin preparar', 'El archivo que modificaste']);

terminal('terminal-commit.svg', 'MINGW64:/c/Users/ana/uneti-web', [
  { dir: '~/uneti-web', branch: 'guia-horario-biblioteca', cmd: 'git add src/content/guias/campus-virtual.md', note: 1 },
  '',
  { dir: '~/uneti-web', branch: 'guia-horario-biblioteca', cmd: 'git commit -m "Añade horario de la biblioteca a la guía del campus"', note: 2 },
  '[guia-horario-biblioteca ec84d4c] Añade horario de la biblioteca a la guía del campus',
  ' 1 file changed, 4 insertions(+)',
  '',
  { dir: '~/uneti-web', branch: 'guia-horario-biblioteca', cmd: 'git status', note: 3 },
  'On branch guia-horario-biblioteca',
  'nothing to commit, working tree clean',
], ['Prepara el archivo', 'Guarda el commit', 'Todo guardado']);

terminal('terminal-push.svg', 'MINGW64:/c/Users/ana/uneti-web', [
  { dir: '~/uneti-web', branch: 'guia-horario-biblioteca', cmd: 'git push -u origin guia-horario-biblioteca', note: 1 },
  'Enumerating objects: 11, done.',
  'Counting objects: 100% (11/11), done.',
  'Delta compression using up to 8 threads',
  'Compressing objects: 100% (5/5), done.',
  'Writing objects: 100% (6/6), 702 bytes | 702.00 KiB/s, done.',
  'Total 6 (delta 4), reused 0 (delta 0), pack-reused 0 (from 0)',
  'remote: Resolving deltas: 100% (4/4), completed with 4 local objects.',
  'remote:',
  "remote: Create a pull request for 'guia-horario-biblioteca' on GitHub by visiting:",
  { t: 'remote:      https://github.com/tu-usuario/uneti-web/pull/new/guia-horario-biblioteca', color: '#61d6d6', note: 2 },
  'remote:',
  'To https://github.com/tu-usuario/uneti-web.git',
  ' * [new branch]      guia-horario-biblioteca -> guia-horario-biblioteca',
  "branch 'guia-horario-biblioteca' set up to track 'origin/guia-horario-biblioteca'.",
], ['Sube tu rama a tu copia en GitHub', 'Enlace directo para abrir el pull request']);

/* ---------- Capturas pendientes ---------- */

function pendiente(name, title, desc) {
  const W = 960, H = 400;
  let b = `<rect x="2" y="2" width="${W - 4}" height="${H - 4}" rx="18" fill="${C.soft}" stroke="${C.muted}" stroke-width="3" stroke-dasharray="14 10"/>`;
  b += `<g transform="translate(${W / 2 - 36},96)" fill="none" stroke="${C.muted}" stroke-width="5" stroke-linejoin="round"><rect x="0" y="14" width="72" height="50" rx="8"/><path d="M22,14 l6,-12 h16 l6,12"/><circle cx="36" cy="39" r="14"/></g>`;
  b += text(W / 2, 214, 'CAPTURA PENDIENTE', { size: 16, weight: 800, color: C.orange, anchor: 'middle' });
  b += text(W / 2, 252, title, { size: 22, weight: 700, anchor: 'middle' });
  desc.forEach((l, i) => (b += text(W / 2, 290 + i * 26, l, { size: 16, color: C.muted, anchor: 'middle' })));
  save(name, W, H, b, { card: false });
}

