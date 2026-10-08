# otimizza.digital

Site da Otimizza Digital com a página do Cardápio IA: cardápio e atendimento automático com inteligência artificial no WhatsApp para restaurantes, lanchonetes e similares.

Site estático gerado por Node, sem framework. Publicado na Vercel.

## Comandos

```
npm run build     # gera dist/
npm run preview   # serve dist/ em http://localhost:4321
npm test          # verifica o build
```

Requer Node 22 ou superior. Não há dependências.

## Estrutura

- `src/site.mjs` — nome, contato, WhatsApp e origem do site.
- `src/page.mjs` — a página do Cardápio IA (conteúdo, conversa de demonstração, gráficos).
- `src/layout.mjs` — head, cabeçalho, rodapé, marca, páginas de privacidade e 404.
- `src/base.css` e `src/page.css` — estilos; `src/client.js` — conversa animada e comparador.
- `public/` — fontes, ilustrações, logo, favicon e imagem social.

## Domínio

A origem usada em canonical, sitemap e Open Graph vem da Vercel (`VERCEL_PROJECT_PRODUCTION_URL`). Quando o domínio próprio estiver ligado ao projeto, defina `SITE_ORIGIN` (ex.: `https://otimizza.digital`) nas variáveis de ambiente da Vercel e faça um novo deploy.

## Logo

`public/assets/logo-otimizza-digital.svg` (marca completa), `public/assets/logo-otimizza-digital.png` e versão para fundo escuro, `public/assets/favicon.svg` (símbolo).
