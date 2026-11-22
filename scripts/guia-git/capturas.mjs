/**
 * Capturas reales de páginas públicas para la guía de Git y GitHub.
 * Abre Microsoft Edge (o Chrome) sin ventana, carga cada página, resalta el
 * elemento importante con un recuadro numerado y guarda un PNG en
 * src/assets/guias/git/.
 *
 * Uso: node scripts/guia-git/capturas.mjs
 * Variable opcional BROWSER con la ruta del navegador.
 *
 * Las capturas de VS Code y las que requieren sesión en GitHub (vsc-*,
 * verificacion-dos-pasos, abrir-pull-request, pull-request-abierto,
 * registro-github) se tomaron a mano; este script no las regenera.
 * instalador-git.png viene del proyecto Git Credential Manager (licencia MIT).
 */
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const OUT = 'src/assets/guias/git';
mkdirSync(OUT, { recursive: true });

const candidates = [
  process.env.BROWSER,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);
const browserPath = candidates.find((p) => existsSync(p));
if (!browserPath) throw new Error('No se encontró Edge ni Chrome. Define BROWSER con su ruta.');

const PORT = 9333;
const profile = mkdtempSync(join(tmpdir(), 'guia-git-'));
const browser = spawn(browserPath, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  '--no-first-run',
  '--hide-scrollbars',
  '--lang=es-ES',
  '--force-color-profile=srgb',
  'about:blank',
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function connect() {
  for (let i = 0; i < 50; i++) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
      const page = targets.find((t) => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(200);
  }
  throw new Error('El navegador no respondió.');
}

const ws = new WebSocket(await connect());
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0;
const pending = new Map();
ws.addEventListener('message', (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
});
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const n = ++id;
    pending.set(n, (msg) => (msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result)));
    ws.send(JSON.stringify({ id: n, method, params }));
  });
const evaluate = async (expression) =>
  (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.value;

await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }] });

/** Dibuja un recuadro naranja con un número sobre el elemento indicado. */
const MARK = `
window.__mark = (el, n) => {
  const r = el.getBoundingClientRect();
  const box = document.createElement('div');
  Object.assign(box.style, {
    position: 'absolute', zIndex: 99999, pointerEvents: 'none',
    left: (r.left + scrollX - 6) + 'px', top: (r.top + scrollY - 6) + 'px',
    width: (r.width + 12) + 'px', height: (r.height + 12) + 'px',
    border: '4px solid #f4570c', borderRadius: '10px',
    boxShadow: '0 0 0 4px rgba(244,87,12,.25)'
  });
  const badge = document.createElement('div');
  badge.textContent = n;
  Object.assign(badge.style, {
    position: 'absolute', zIndex: 100000, pointerEvents: 'none',
    left: (r.right + scrollX - 8) + 'px', top: (r.top + scrollY - 22) + 'px',
    width: '30px', height: '30px', borderRadius: '50%',
    background: '#f4570c', color: '#fff', font: '700 17px/30px system-ui, sans-serif',
    textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,.3)'
  });
  document.body.append(box, badge);
};
/* El elemento visible más pequeño cuyo texto empiece por "text" o cuya
   aria-label lo contenga. */
window.__find = (selector, text) => {
  const norm = (t) => (t || '').trim().replace(/\\s+/g, ' ').toLowerCase();
  const area = (e) => { const r = e.getBoundingClientRect(); return r.width * r.height; };
  const q = (text || '').toLowerCase();
  return [...document.querySelectorAll(selector)]
    .filter((e) => area(e) > 0)
    .filter((e) => !q || norm(e.textContent).startsWith(q) || norm(e.getAttribute('aria-label')).includes(q))
    .sort((a, b) => area(a) - area(b))[0];
};`;

async function capture({ file, url, prepare = '', marks = [], clip }) {
  await send('Page.navigate', { url });
  await sleep(3500);
  await evaluate(MARK);
  // Oculta avisos de cookies y banners que tapan el contenido
  await evaluate(`document.querySelectorAll('#ghcc, cookie-consent-banner, .js-cookie-consent-banner').forEach(e => e.remove())`);
  if (prepare) {
    await evaluate(prepare);
    await sleep(1200);
  }
  for (const [i, [selector, text]] of marks.entries()) {
    const ok = await evaluate(`(() => { const el = __find(${JSON.stringify(selector)}, ${JSON.stringify(text ?? '')}); if (!el) return false; __mark(el, ${i + 1}); return true; })()`);
    if (!ok) console.warn(`  ⚠ ${file}: no se encontró ${selector} ${text ?? ''}`);
  }
  const { data } = await send('Page.captureScreenshot', {
    format: 'png',
    clip: { scale: 1, ...(clip ?? { x: 0, y: 0, width: 1280, height: 800 }) },
    captureBeyondViewport: true,
  });
  writeFileSync(join(OUT, file), Buffer.from(data, 'base64'));
  console.log(`✓ ${join(OUT, file)}`);
}

try {
  await capture({
    file: 'descarga-git.png',
    url: 'https://git-scm.com/install/windows',
    marks: [['a', 'Click here to download']],
    clip: { x: 0, y: 0, width: 1280, height: 720 },
  });

  await capture({
    file: 'descarga-vscode.png',
    url: 'https://code.visualstudio.com/download',
    // El recuadro del botón Download se añadió después con sharp
    clip: { x: 0, y: 0, width: 1280, height: 640 },
  });
} finally {
  ws.close();
  browser.kill();
}
