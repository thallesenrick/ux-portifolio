import { build } from 'vite';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Export-only adaptations keep the hosted application's routing unchanged.
const result = await build({
  base: './',
  publicDir: false,
  plugins: [{
    name: 'standalone-html',
    enforce: 'pre',
    transform(code, id) {
      if (id.endsWith('/src/App.tsx')) return code.replace('BrowserRouter as Router', 'HashRouter as Router');
      if (id.endsWith('/src/main.tsx')) return code.replace('if (import.meta.env.PROD', 'if (false');
      if (id.endsWith('/src/components/ConnectionGuard.tsx')) return code.replace('const connected = () => navigator.onLine;', 'const connected = () => true;');
    },
  }],
  build: {
    write: false,
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    cssCodeSplit: false,
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
const output = result.output;
const mime = { '.png': 'image/png', '.svg': 'image/svg+xml', '.pdf': 'application/pdf' };
async function embedPublic(text) {
  const paths = [...new Set(text.match(/\/(?:portfolio\/)?[a-zA-Z0-9_-]+\.(?:png|svg|pdf)/g) || [])];
  for (const asset of paths) {
    try {
      const bytes = await readFile(path.join('public', asset));
      text = text.split(asset).join(`data:${mime[path.extname(asset)]};base64,${bytes.toString('base64')}`);
    } catch { /* Not a public asset. */ }
  }
  return text;
}
let html = await readFile('index.html', 'utf8');
html = html.replace(/\s*<script type="module" src="\/src\/main.tsx"><\/script>/, '');
const css = output.filter(item => item.type === 'asset' && item.fileName.endsWith('.css')).map(item => item.source).join('\n');
const js = output.filter(item => item.type === 'chunk').map(item => item.code).join('\n');
const embeddedCss = await embedPublic(css);
const embeddedJs = (await embedPublic(js)).replace(/<\/script/gi, '<\\/script');
html = html.replace('</head>', () => `<style>${embeddedCss}</style></head>`);
html = html.replace('</body>', () => `<script type="module">${embeddedJs}</script></body>`);
html = await embedPublic(html);
await mkdir('output/html', { recursive: true });
await writeFile('output/html/portfolio.html', html);
console.log(`Exported output/html/portfolio.html (${(Buffer.byteLength(html) / 1024 / 1024).toFixed(1)} MB)`);
