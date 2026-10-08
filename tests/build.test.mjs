import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { build } from '../scripts/build.mjs';

test('O build gera a página do Cardápio IA com preço, WhatsApp e sem referências ao site anterior', async () => {
  const pages = await build();
  const html = pages.get('/');
  assert.ok(html.includes('ci-hero'));
  assert.ok(html.includes('R$ 99'));
  assert.ok(html.includes('https://wa.me/5518981034411?text='));
  assert.ok(!html.includes('TA Consulting | '));
  assert.ok(html.includes('"@type":"Product"'));
  const css = await readFile(new URL('../dist/assets/site.css', import.meta.url), 'utf8');
  assert.ok(css.includes('.ci-hero') && css.includes('.site-header'));
  const js = await readFile(new URL('../dist/assets/site.js', import.meta.url), 'utf8');
  assert.ok(js.includes('data-chat'));
});
