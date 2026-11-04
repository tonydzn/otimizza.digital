#!/usr/bin/env node
/**
 * Exporta os assets do projeto como arquivos reais, na pasta ./assets
 *
 *   node scripts/exportar-assets.mjs            -> otimizadas (WebP) + logo (SVG)
 *   node scripts/exportar-assets.mjs --originais -> também baixa os JPG originais do otimizza.digital
 *
 * Não precisa instalar nada. As imagens otimizadas saem de src/assets/images.ts
 * (que é o que o site realmente usa), então este script funciona mesmo que a
 * pasta assets/ seja apagada.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const saida = join(raiz, "assets");

// nome do export em images.ts -> [nome do arquivo, caminho do original no site]
const MAPA = {
  pedidosDesktop: ["pedidos-desktop", "screens/pedidos-desktop"],
  cozinhaDesktop: ["cozinha-desktop", "screens/cozinha-desktop"],
  atendimentoDesktop: ["atendimento-desktop", "screens/atendimento-desktop"],
  cardapioDesktop: ["cardapio-desktop", "screens/cardapio-desktop"],
  cardapioPublicoMobile: ["cardapio-publico-mobile", "screens/cardapio-publico-mobile"],
  entregadorMobile: ["entregador-mobile", "screens/entregador-mobile"],
  pedidosMobile: ["pedidos-mobile", "screens/pedidos-mobile"],
  rush: ["ilustracao-rush", "illustrations/cardapio-rush-1600"],
  menu: ["ilustracao-menu", "illustrations/cardapio-menu-900"],
  motoboy: ["ilustracao-motoboy", "illustrations/cardapio-motoboy-900"],
  dona: ["ilustracao-dona", "illustrations/cardapio-dona-900"],
  lanche: ["ilustracao-lanche", "illustrations/cardapio-lanche-600"],
  pizza: ["ilustracao-pizza", "illustrations/cardapio-pizza-600"],
  marmita: ["ilustracao-marmita", "illustrations/cardapio-marmita-600"],
  acai: ["ilustracao-acai", "illustrations/cardapio-acai-600"],
};

const LOGO_MARCA = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="256" height="256">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#38c97a"/>
      <stop offset="1" stop-color="#0b8643"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="9" fill="url(#g)"/>
  <path d="M7 9.5C7 8.67 7.67 8 8.5 8h15c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5H15l-4.5 4v-4h-2C7.67 20 7 19.33 7 18.5v-9Z" fill="#fff"/>
  <path d="M11.5 14l3 3 6-6" fill="none" stroke="#0b8643" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const log = (...a) => console.log(...a);
const kb = (n) => `${Math.round(n / 1024)} KB`;

async function otimizadas() {
  const src = await readFile(join(raiz, "src/assets/images.ts"), "utf8");
  const dir = join(saida, "otimizadas");
  await mkdir(dir, { recursive: true });
  let total = 0;
  let n = 0;
  for (const [exportName, [arquivo]] of Object.entries(MAPA)) {
    const m = src.match(new RegExp(`export const ${exportName} = "data:image/webp;base64,([A-Za-z0-9+/=]+)"`));
    if (!m) {
      log(`  ! não encontrei "${exportName}" em src/assets/images.ts`);
      continue;
    }
    const buf = Buffer.from(m[1], "base64");
    if (buf.subarray(0, 4).toString() !== "RIFF" || buf.subarray(8, 12).toString() !== "WEBP") {
      log(`  ! ${exportName} não é um WebP válido`);
      continue;
    }
    await writeFile(join(dir, `${arquivo}.webp`), buf);
    total += buf.length;
    n++;
    log(`  ✓ otimizadas/${arquivo}.webp  (${kb(buf.length)})`);
  }
  log(`  ${n} imagens otimizadas, ${kb(total)} no total\n`);
}

async function logos() {
  const dir = join(saida, "logo");
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "otimizza-marca.svg"), LOGO_MARCA);
  log("  ✓ logo/otimizza-marca.svg\n");
}

async function originais() {
  const dir = join(saida, "originais");
  await mkdir(dir, { recursive: true });
  let n = 0;
  let total = 0;
  for (const [, [arquivo, caminho]] of Object.entries(MAPA)) {
    const url = `https://otimizza.digital/assets/${caminho}.jpg`;
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const buf = Buffer.from(await r.arrayBuffer());
      await writeFile(join(dir, `${arquivo}.jpg`), buf);
      total += buf.length;
      n++;
      log(`  ✓ originais/${arquivo}.jpg  (${kb(buf.length)})`);
    } catch (e) {
      log(`  ! falhou ${url}: ${e.message}`);
    }
  }
  log(`  ${n}/${Object.keys(MAPA).length} originais baixados, ${kb(total)} no total\n`);
}

log("\nExportando assets para ./assets\n");
await otimizadas();
await logos();
if (process.argv.includes("--originais")) await originais();
else log("  (use --originais para baixar também os JPG originais do site)\n");
