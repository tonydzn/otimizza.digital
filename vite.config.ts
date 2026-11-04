import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GTM_ID = "GTM-MBMG5FC8";

/** Injeta Consent Mode v2 + Google Tag Manager em TODAS as páginas.
 *  GA4 e Meta Pixel são configurados dentro do GTM; a chave "consentimento" é a mesma do site antigo. */
function googleTagManager(): Plugin {
  const consent = `(function(){var c=null;try{c=localStorage.getItem("consentimento")}catch(e){}window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=window.gtag||gtag;var v=c==="aceito"?"granted":"denied";gtag("consent","default",{analytics_storage:v,ad_storage:v,ad_user_data:v,ad_personalization:v,wait_for_update:500});})();`;
  const gtm = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;
  return {
    name: "google-tag-manager",
    transformIndexHtml: () => [
      { tag: "script", children: consent, injectTo: "head-prepend" },
      { tag: "script", children: gtm, injectTo: "head-prepend" },
      // sem JavaScript (alguns robôs de busca e de IA), o conteúdo animado aparece direto
      {
        tag: "noscript",
        children: `<style>[style*="opacity:0"]{opacity:1!important;transform:none!important;filter:none!important}</style>`,
        injectTo: "head",
      },
      {
        tag: "noscript",
        children: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        injectTo: "body-prepend",
      },
    ],
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), googleTagManager()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        privacidade: path.resolve(__dirname, "privacidade/index.html"),
        ajuda: path.resolve(__dirname, "ajuda/index.html"),
        notFound: path.resolve(__dirname, "404.html"),
        pizzaria: path.resolve(__dirname, "pizzaria/index.html"),
        hamburgueria: path.resolve(__dirname, "hamburgueria/index.html"),
        marmitaria: path.resolve(__dirname, "marmitaria/index.html"),
        acaiteria: path.resolve(__dirname, "acaiteria/index.html"),
      },
    },
  },
});
