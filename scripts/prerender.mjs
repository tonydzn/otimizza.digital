// Pré-renderiza a home e as páginas por segmento e gera o sitemap.xml.
import { readFile, writeFile, rm } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ORIGIN = "https://otimizza.digital";
const TODAY = new Date().toISOString().slice(0, 10);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const ssrDir = resolve(root, "dist-ssr");
const { render, renderSegment, SEGMENTS } = await import(pathToFileURL(resolve(ssrDir, "entry-server.js")).href);

const esc = (v) => String(v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const marker = (slug) => (slug ? `<div id="root" data-segment="${slug}"></div>` : '<div id="root"></div>');

async function inject(file, slug, html, head = "") {
  let page = await readFile(file, "utf8");
  if (!page.includes(marker(slug))) throw new Error(`${file}: marcador do root não encontrado`);
  page = page.replace(marker(slug), marker(slug).replace("></div>", `>${html}</div>`));
  if (head) page = page.replace("<!--seo-head-->", head);
  await writeFile(file, page);
}

// Home
await inject(resolve(dist, "index.html"), null, render());

// Segmentos
for (const s of SEGMENTS) {
  const url = `${ORIGIN}/${s.slug}/`;
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: s.metaTitle,
        description: s.metaDescription,
        inLanguage: "pt-BR",
        dateModified: TODAY,
        isPartOf: { "@id": `${ORIGIN}/#website` },
        about: { "@id": `${url}#service` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: s.label, item: url },
        ],
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `Cardápio IA para ${s.plural}`,
        serviceType: "Atendimento automático e pedidos pelo WhatsApp",
        description: s.metaDescription,
        provider: { "@type": "Organization", "@id": `${ORIGIN}/#organization`, name: "Otimizza Digital", url: `${ORIGIN}/` },
        areaServed: { "@type": "Country", name: "Brasil" },
        audience: { "@type": "BusinessAudience", audienceType: s.plural },
        isRelatedTo: { "@id": `${ORIGIN}/#software` },
        offers: { "@type": "Offer", price: "49.90", priceCurrency: "BRL", url: `${url}#precos`, description: "Plano único por número de WhatsApp, pagamento mensal." },
      },
    ],
  };
  const head = [
    `<title>${esc(s.metaTitle)}</title>`,
    `<meta name="description" content="${esc(s.metaDescription)}" />`,
    `<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:site_name" content="Otimizza Digital" />`,
    `<meta property="og:title" content="${esc(s.ogTitle)}" />`,
    `<meta property="og:description" content="${esc(s.metaDescription)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${ORIGIN}/social-cover.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${JSON.stringify(ld)}</script>`,
  ].join("\n    ");
  await inject(resolve(dist, s.slug, "index.html"), s.slug, renderSegment(s.slug), head);
}

// Sitemap
const pages = [
  ["/", "weekly", "1.0"],
  ...SEGMENTS.map((s) => [`/${s.slug}/`, "monthly", "0.9"]),
  ["/ajuda/", "monthly", "0.6"],
  ["/privacidade/", "yearly", "0.3"],
];
await writeFile(
  resolve(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map(([p, f, pr]) => `  <url><loc>${ORIGIN}${p}</loc><lastmod>${TODAY}</lastmod><changefreq>${f}</changefreq><priority>${pr}</priority></url>`)
    .join("\n")}\n</urlset>\n`
);

await rm(ssrDir, { recursive: true, force: true });
console.log(`Pré-renderizadas: home + ${SEGMENTS.length} segmentos. Sitemap com ${pages.length} URLs.`);
