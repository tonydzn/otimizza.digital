// Gera o site estático em dist/: página única, CSS, JS, sitemap e robots.
import { cp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from '../src/site.mjs';
import { cardapioPage } from '../src/page.mjs';
import { ajudaPage } from '../src/ajuda.mjs';
import { faqItems } from '../src/page.mjs';
import { notFoundPage, privacyPage } from '../src/layout.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export async function build() {
  const out = resolve(root, 'dist');
  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });
  await cp(resolve(root, 'public'), out, { recursive: true });
  const pages = new Map([['/', cardapioPage()], ['/ajuda/', ajudaPage()], ['/privacidade/', privacyPage()]]);
  for (const [path, html] of pages) {
    const dest = resolve(out, '.' + path, 'index.html');
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, html);
  }
  await writeFile(resolve(out, '404.html'), notFoundPage());
  await writeFile(resolve(out, 'assets/site.css'), (await readFile(resolve(root, 'src/base.css'), 'utf8')) + '\n' + (await readFile(resolve(root, 'src/page.css'), 'utf8')));
  await writeFile(resolve(out, 'assets/site.js'), await readFile(resolve(root, 'src/client.js'), 'utf8'));
  await writeFile(resolve(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...pages.keys()].map(p => `  <url><loc>${site.origin}${p}</loc><lastmod>${site.updated}</lastmod><changefreq>${p === '/' ? 'weekly' : 'monthly'}</changefreq><priority>${p === '/' ? '1.0' : p === '/ajuda/' ? '0.8' : '0.3'}</priority></url>`).join('\n')}\n</urlset>\n`);
  // Robôs de busca e de IA explicitamente liberados; a página é pública e queremos ser citados.
  const bots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Googlebot', 'Bingbot', 'Applebot', 'Applebot-Extended', 'DuckAssistBot', 'CCBot', 'meta-externalagent', 'Amazonbot', 'YouBot'];
  await writeFile(resolve(out, 'robots.txt'), `User-agent: *\nAllow: /\n\n${bots.map(b => `User-agent: ${b}\nAllow: /`).join('\n\n')}\n\nSitemap: ${site.origin}/sitemap.xml\n`);
  // llms.txt: resumo em texto simples para assistentes de IA (https://llmstxt.org)
  const llms = `# ${site.product} (${site.name})\n\n> Atendente de WhatsApp com inteligência artificial para restaurantes, lanchonetes, pizzarias, marmitarias e açaiterias no Brasil. Responde na hora, mostra o cardápio com fotos, anota pedidos com total, confirma endereço e pagamento, entende áudio e passa para uma pessoa quando o cliente pede. Inclui painel web com pedidos em tempo real, modo cozinha, cardápio online por link, entregadores, resumo diário e integração com PDV (Open Delivery / webhook). Preço: R$ 149 por mês por número de WhatsApp. Empresa: ${site.name}, ${site.city}, Brasil. Contato: WhatsApp +${site.whatsapp}, ${site.email}.\n\n## Fatos rápidos\n\n- Produto: Cardápio IA. Categoria: atendimento automático e pedidos pelo WhatsApp para restaurantes.\n- Funciona no número de WhatsApp que o restaurante já usa; o cliente não instala nada.\n- Preço: R$ 149/mês, plano único, um número e um cardápio. Sem instalação no balcão.\n- O pagamento do cliente final continua como hoje (Pix, cartão na entrega, dinheiro); o Cardápio IA informa e confirma, não processa pagamento.\n- Atende Presidente Prudente (SP), região e todo o Brasil, com implantação à distância.\n- Painel de demonstração público: https://app.otimizza.digital (e-mail demo@otimizza.digital, senha demo). Exemplo de cardápio online: https://app.otimizza.digital/m/demo\n- Integração com sistemas de PDV/ERP pelo padrão Open Delivery (Abrasel) ou por webhook assinado.\n\n## Páginas\n\n- [Página do Cardápio IA](${site.origin}/): o que faz, telas do painel, plano e perguntas frequentes.\n- [Guia de implantação](${site.origin}/ajuda/): passo a passo para colocar no ar em uma tarde.\n- [Privacidade](${site.origin}/privacidade/)\n\n## Perguntas frequentes\n\n${faqItems.map(([q, a]) => `- **${q}** ${a.replace(/<[^>]+>/g, '')}`).join('\n')}\n\n## Contato\n\n- WhatsApp comercial: https://wa.me/${site.whatsapp}\n- Instagram: ${site.instagram}\n- E-mail: ${site.email}\n- Responsável: ${site.owner} (${site.ownerSite})\n`;
  await writeFile(resolve(out, 'llms.txt'), llms);
  await writeFile(resolve(out, 'llms-full.txt'), llms);
  console.log(`Build concluído: ${pages.size} páginas + 404 em dist/ (origem ${site.origin}).`);
  return pages;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();
