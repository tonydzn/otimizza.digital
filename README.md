# otimizza.digital

Site da Otimizza Digital e do **Cardápio IA**: atendente de WhatsApp com IA para restaurantes e lanchonetes.

Vite + React + Tailwind. A home é pré-renderizada no build (HTML completo para o Google); `/privacidade/` e `/ajuda/` são HTML estático com cabeçalho e rodapé em React.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/ (publicado pela Vercel)
```

- **Medição:** Google Tag Manager `GTM-MBMG5FC8`, injetado em todas as páginas por `vite.config.ts`. GA4 e Meta Pixel ficam dentro do GTM, com Consent Mode v2 (tudo negado até o aceite no aviso de cookies).
- **Eventos no dataLayer:** `whatsapp_click` (conversão) e `bot_teste_click` (número de teste da IA, não é conversão), em `src/lib/tracking.ts`.
- **Contatos e links:** `src/lib/content.ts`.
- **SEO:** metadados e JSON-LD em `index.html`; `public/` tem `robots.txt`, `sitemap.xml` e `llms.txt`.
