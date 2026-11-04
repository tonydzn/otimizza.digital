/* Entrada das páginas internas: o conteúdo já vem no HTML (bom para SEO);
   o React só monta cabeçalho, rodapé e aviso de cookies. */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { SubHeader } from "@/components/layout/SubHeader";
import { Footer } from "@/components/sections/Footer";
import { CookieNotice } from "@/components/ui/CookieNotice";

createRoot(document.getElementById("shell-header")!).render(
  <StrictMode>
    <SubHeader />
  </StrictMode>
);

createRoot(document.getElementById("shell-footer")!).render(
  <StrictMode>
    <Footer />
    <CookieNotice />
  </StrictMode>
);
