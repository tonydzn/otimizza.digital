/* Usado só no build: gera o HTML das páginas para o Google ler sem precisar rodar JavaScript. */
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { SegmentPage } from "@/components/pages/SegmentPage";
import { SEGMENTS, segmentBySlug } from "@/lib/segments";

export { SEGMENTS };

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

export function renderSegment(slug: string) {
  const s = segmentBySlug(slug);
  if (!s) throw new Error(`Segmento desconhecido: ${slug}`);
  return renderToString(
    <StrictMode>
      <SegmentPage s={s} />
    </StrictMode>
  );
}
