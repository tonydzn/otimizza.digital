// Gera o site estático em dist/: página única, CSS, JS, sitemap e robots.
import { cp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../src/site.mjs';
import { cardapioPage } from '../src/page.mjs';
import { notFoundPage, privacyPage } from '../src/layout.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export async function build() {
  const out = resolve(root, 'dist');
  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });
  await cp(resolve(root, 'public'), out, { recursive: true });
  const pages = new Map([['/', cardapioPage()], ['/privacidade/', privacyPage()]]);
  for (const [path, html] of pages) {
    const dest = resolve(out, '.' + path, 'index.html');
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, html);
  }
  await writeFile(resolve(out, '404.html'), notFoundPage());
  await writeFile(resolve(out, 'assets/site.css'), (await readFile(resolve(root, 'src/base.css'), 'utf8')) + '\n' + (await readFile(resolve(root, 'src/page.css'), 'utf8')));
  await writeFile(resolve(out, 'assets/site.js'), await readFile(resolve(root, 'src/client.js'), 'utf8'));
  await writeFile(resolve(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...pages.keys()].map(p => `  <url><loc>${site.origin}${p}</loc></url>`).join('\n')}\n</urlset>\n`);
  await writeFile(resolve(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.origin}/sitemap.xml\n`);
  console.log(`Build concluído: ${pages.size} páginas + 404 em dist/ (origem ${site.origin}).`);
  return pages;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();
