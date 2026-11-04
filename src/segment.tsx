import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import { SegmentPage } from "@/components/pages/SegmentPage";
import { segmentBySlug } from "@/lib/segments";

const root = document.getElementById("root")!;
const s = segmentBySlug(root.dataset.segment ?? "");
if (s) {
  const app = (
    <StrictMode>
      <SegmentPage s={s} />
    </StrictMode>
  );
  if (root.hasChildNodes()) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
