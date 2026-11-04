// Pré-renderiza a home: injeta o HTML do React em dist/index.html.
import { readFile, writeFile, rm } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ssrDir = resolve(root, "dist-ssr");
const { render } = await import(pathToFileURL(resolve(ssrDir, "entry-server.js")).href);

const file = resolve(root, "dist/index.html");
const html = await readFile(file, "utf8");
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error('dist/index.html sem <div id="root"></div>');
await writeFile(file, html.replace(marker, `<div id="root">${render()}</div>`));
await rm(ssrDir, { recursive: true, force: true });
console.log("Home pré-renderizada.");
