// Estrutura comum: head, cabeçalho, rodapé, botão flutuante e páginas auxiliares.
import { site } from './site.mjs';

export const escape = (value = '') => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const arrow = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

const consentHead = `<script>(function(){var c=null;try{c=localStorage.getItem('consentimento')}catch(e){}window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.__consent=c;gtag('consent','default',{analytics_storage:c==='aceito'?'granted':'denied',ad_storage:c==='aceito'?'granted':'denied',ad_user_data:c==='aceito'?'granted':'denied',ad_personalization:c==='aceito'?'granted':'denied',wait_for_update:500});})();</script>`;
const gtmId = 'GTM-MBMG5FC8';
const tagManagerHead = `<!-- Google Tag Manager --><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');</script><!-- End Google Tag Manager -->`;
const tagManagerBody = `<!-- Google Tag Manager (noscript) --><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><!-- End Google Tag Manager (noscript) -->`;

export const whatsappUrl = (text = site.whatsappText) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

// Marca: símbolo (balão com curva de crescimento) + nome. O símbolo é o mesmo do favicon.
export const mark = `<svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true"><path d="M16 6h32a12 12 0 0 1 12 12v22a12 12 0 0 1-12 12H26L13 61v-9.5A12 12 0 0 1 4 40V18A12 12 0 0 1 16 6z" fill="#1fb85a"/><path d="M16 38l10-10 8 8 14-14" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M39 22h9v9" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export const brand = `${mark}<span class="brand-name">otimizza<span>.digital</span></span>`;

const whatsappGlyph = `<svg viewBox="0 0 32 32" aria-hidden="true" fill="currentColor"><path d="M16 2a14 14 0 0 0-12.1 21L2 30l7.2-1.9A14 14 0 1 0 16 2Zm0 25.4a11.3 11.3 0 0 1-5.8-1.6l-.4-.2-4.2 1.1 1.1-4.1-.3-.5A11.4 11.4 0 1 1 16 27.4Zm6.3-8.5c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a9.3 9.3 0 0 1-4.5-3.9c-.3-.5.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.6-.5-.8-.5h-.6c-.2 0-.6.1-.8.4s-1.1 1.1-1.1 2.6 1.1 3 1.3 3.2 2.3 3.6 5.5 5c2 .8 2.8.9 3.8.7.6-.1 1.9-.8 2.2-1.5s.3-1.3.2-1.5-.2-.2-.5-.4Z"/></svg>`;

const igIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>`;
const fbIcon = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8z"/></svg>`;
function socialLinks() {
  const itens = [site.instagram && `<a href="${escape(site.instagram)}" target="_blank" rel="noopener noreferrer" aria-label="Instagram da Otimizza Digital">${igIcon}<span>@otimizza_digital</span></a>`, site.facebook && `<a href="${escape(site.facebook)}" target="_blank" rel="noopener noreferrer" aria-label="Facebook da Otimizza Digital">${fbIcon}<span>Facebook</span></a>`].filter(Boolean);
  return itens.length ? `<div class="footer-social">${itens.join('')}</div>` : '';
}
function header() {
  return `<a class="skip-link" href="#conteudo">Pular para o conteúdo</a><header class="site-header"><div class="container header-inner"><a class="brand" href="/" aria-label="Otimizza Digital — início">${brand}</a><nav class="site-nav" aria-label="Seções"><a href="#como-funciona">Como funciona</a><a href="#painel">Painel</a><a href="#plano">Plano</a><a href="#duvidas">Dúvidas</a><a href="/ajuda/">Guia</a></nav><a class="header-login" href="https://app.otimizza.digital/login" target="_blank" rel="noopener noreferrer" aria-label="Entrar no painel do Cardápio IA"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg><span>Entrar</span></a><a class="header-cta" href="${escape(whatsappUrl())}" target="_blank" rel="noopener noreferrer">${whatsappGlyph}<span>Falar no WhatsApp</span></a></div></header>`;
}

function cookieNotice() {
  return `<div class="cookie-notice" id="aviso-cookies" hidden role="region" aria-label="Aviso de cookies"><p>Usamos cookies de medição (Google Analytics) e de anúncios (Meta Pixel) para entender o uso do site e divulgar o Cardápio IA. Você escolhe. <a href="/privacidade/">Saiba mais</a>.</p><div class="cookie-actions"><button type="button" class="cookie-essencial" data-consent="recusado">Só o essencial</button><button type="button" class="cookie-aceitar" data-consent="aceito">Aceitar</button></div></div>`;
}
function footer() {
  return `<footer class="site-footer"><div class="container footer-grid"><div class="footer-brand"><a class="brand" href="/" aria-label="Otimizza Digital — início">${brand}</a><p>Cardápio e atendimento com inteligência artificial no WhatsApp para restaurantes, lanchonetes e similares.</p></div><div class="footer-contact"><a href="/ajuda/">Guia de implantação</a><a href="https://app.otimizza.digital/login" target="_blank" rel="noopener noreferrer">Entrar no painel</a><a href="#" data-cookie-prefs>Preferências de cookies</a><strong>Contato</strong><a href="${escape(whatsappUrl())}" target="_blank" rel="noopener noreferrer">WhatsApp ${site.whatsappDisplay}</a><a href="mailto:${site.email}">${site.email}</a><span>${site.city} · atendimento à cidade e região</span>${socialLinks()}</div><div class="footer-about"><strong>Quem faz</strong><a href="${site.ownerSite}/" target="_blank" rel="noopener noreferrer">${site.owner} · TA Consulting</a><span>Mais de 15 anos em marketing digital, dados e automação.</span></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} ${site.name}</span><a href="/privacidade/">Privacidade</a><a href="#conteudo">Voltar ao início ${arrow}</a></div></div></footer>`;
}

function whatsappFloat() {
  return `<a class="whatsapp-float" href="${escape(whatsappUrl())}" target="_blank" rel="noopener noreferrer" aria-label="Falar com a Otimizza Digital pelo WhatsApp (abre em nova aba)"><span>Falar agora<span>WhatsApp</span></span>${whatsappGlyph}</a>`;
}

function schema(path, title, description, extra) {
  const org = site.origin + '/#organization';
  const graph = [
    { '@type': 'Organization', '@id': org, name: site.name, legalName: site.name, url: site.origin + '/', logo: { '@type': 'ImageObject', url: site.origin + '/assets/logo-otimizza-digital.png' }, email: site.email, telephone: '+' + site.whatsapp,
      address: { '@type': 'PostalAddress', addressLocality: site.cityName, addressRegion: site.region, addressCountry: site.country }, areaServed: [{ '@type': 'City', name: site.cityName }, { '@type': 'Country', name: 'Brasil' }],
      founder: { '@type': 'Person', name: site.owner, url: site.ownerSite + '/sobre/' }, contactPoint: { '@type': 'ContactPoint', contactType: 'sales', telephone: '+' + site.whatsapp, availableLanguage: 'Portuguese' }, ...(site.sameAs.length ? { sameAs: site.sameAs } : {}) },
    { '@type': 'WebSite', '@id': site.origin + '/#website', url: site.origin + '/', name: site.name, publisher: { '@id': org }, inLanguage: 'pt-BR' },
    { '@type': 'WebPage', '@id': site.origin + path, url: site.origin + path, name: title, description, inLanguage: 'pt-BR', dateModified: site.updated, isPartOf: { '@id': site.origin + '/#website' },
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Início', item: site.origin + '/' }, ...(path !== '/' ? [{ '@type': 'ListItem', position: 2, name: title, item: site.origin + path }] : [])] } },
    ...extra,
  ];
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

export function layout({ path = '/', title, description, body, extra = [], noindex = false }) {
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const social = `${site.origin}/assets/social-cover.png`;
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">${consentHead}${tagManagerHead}<meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(fullTitle)}</title><meta name="description" content="${escape(description)}"><meta name="author" content="${site.owner}"><meta name="theme-color" content="#ffffff"><meta name="color-scheme" content="light"><meta name="robots" content="${noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'}">${path === '/404/' ? '' : `<link rel="canonical" href="${site.origin}${path}">`}<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/assets/apple-touch-icon.png"><link rel="preload" href="/assets/fonts/barlow-semi-condensed-500.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/manrope-400.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/assets/site.css"><meta property="og:type" content="website"><meta property="og:site_name" content="${site.name}"><meta property="og:locale" content="pt_BR"><meta property="og:title" content="${escape(fullTitle)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${site.origin}${path}"><meta property="og:image" content="${social}"><meta property="og:image:type" content="image/png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Cardápio IA, da Otimizza Digital: seu WhatsApp atende sozinho."><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(fullTitle)}"><meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="${social}"><script type="application/ld+json">${schema(path, fullTitle, description, extra)}</script><script src="/assets/site.js" defer></script></head><body>${tagManagerBody}${header()}<main id="conteudo">${body}</main>${cookieNotice()}${footer()}${whatsappFloat()}</body></html>`;
}

export function privacyPage() {
  const atualizado = '09/10/2026';
  return layout({ path: '/privacidade/', title: 'Privacidade e cookies', description: 'Como o site da Otimizza Digital usa cookies, Google Analytics e Meta Pixel, e quais são os seus direitos pela LGPD.', body: `<section class="container simple-page"><h1>Privacidade, com clareza.</h1><p>Este site apresenta o Cardápio IA e leva o contato para o WhatsApp. Não há formulário nem criação de conta. O que coletamos é o mínimo para medir o site e divulgar o produto, e você controla isso no aviso de cookies.</p>
<h2>Quem é o responsável</h2><p>${site.name}, ${site.city}. Responsável: ${site.owner}. Contato para assuntos de privacidade: <a href="mailto:${site.email}">${site.email}</a>.</p>
<h2>O que é coletado e para quê</h2><ul>
<li><strong>Dados técnicos de acesso</strong> (endereço IP, navegador, páginas visitadas), registrados pela hospedagem (Vercel) para funcionamento e segurança. Base legal: legítimo interesse.</li>
<li><strong>Medição de audiência</strong> com Google Analytics 4, carregado pelo Google Tag Manager: páginas vistas, origem da visita, cliques nos botões de WhatsApp. Usa cookies e identificadores anônimos. Só é ativado depois que você aceita no aviso de cookies. Base legal: consentimento.</li>
<li><strong>Medição de anúncios</strong> com o Meta Pixel (Facebook e Instagram): registra a visita e o clique em “falar no WhatsApp” para medir campanhas e formar públicos de anúncio. Também só é ativado após o seu aceite. Base legal: consentimento.</li>
<li><strong>Conversa no WhatsApp</strong>: os botões abrem o WhatsApp com uma mensagem preparada; você decide se envia. A partir daí valem as práticas do WhatsApp e a conversa é tratada pela Otimizza para atender o seu pedido de contato.</li></ul>
<h2>Cookies</h2><p>Sem o seu aceite, o site guarda apenas a sua escolha sobre cookies (no próprio navegador) e nada mais. Com o aceite, Google e Meta gravam cookies de medição pelos prazos definidos por eles (em geral até 13 meses no Google Analytics e 90 dias no Meta Pixel). Você pode mudar de ideia a qualquer momento: apague os cookies do site no navegador e o aviso aparece de novo, ou use o link “Preferências de cookies” no rodapé.</p>
<h2>Com quem os dados são compartilhados</h2><p>Google (Analytics e Tag Manager), Meta (Pixel) e Vercel (hospedagem), cada um sob as próprias políticas de privacidade, podendo envolver transferência internacional de dados com as garantias previstas na LGPD. Não vendemos dados.</p>
<h2>Seus direitos</h2><p>Pela Lei Geral de Proteção de Dados (Lei 13.709/2018) você pode pedir confirmação, acesso, correção, anonimização, portabilidade ou exclusão dos seus dados, e revogar o consentimento. Escreva para <a href="mailto:${site.email}">${site.email}</a>; respondemos em até 15 dias.</p>
<h2>Clientes do Cardápio IA</h2><p>Os dados das conversas e pedidos dos clientes finais de cada restaurante são tratados pela Otimizza como operadora, a serviço do restaurante, conforme o contrato de prestação do serviço. Esta página trata apenas do site.</p>
<p class="simple-updated">Atualizado em ${atualizado}.</p></section>` });
}

export function notFoundPage() {
  return layout({ path: '/404/', title: 'Página não encontrada', description: 'Esta página não existe no site da Otimizza Digital.', noindex: true, body: `<section class="container simple-page"><h1>Essa página não existe.</h1><p>Volte ao <a href="/">início</a> ou fale com a gente pelo <a href="${escape(whatsappUrl())}" target="_blank" rel="noopener noreferrer">WhatsApp</a>.</p></section>` });
}
