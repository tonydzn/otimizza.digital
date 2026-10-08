// Estrutura comum: head, cabeçalho, rodapé, botão flutuante e páginas auxiliares.
import { site } from './site.mjs';

export const escape = (value = '') => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const arrow = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

const gtmId = 'GTM-MBMG5FC8';
const tagManagerHead = `<!-- Google Tag Manager --><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');</script><!-- End Google Tag Manager -->`;
const tagManagerBody = `<!-- Google Tag Manager (noscript) --><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><!-- End Google Tag Manager (noscript) -->`;

export const whatsappUrl = (text = site.whatsappText) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

// Marca: símbolo (balão com curva de crescimento) + nome. O símbolo é o mesmo do favicon.
export const mark = `<svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true"><path d="M16 6h32a12 12 0 0 1 12 12v22a12 12 0 0 1-12 12H26L13 61v-9.5A12 12 0 0 1 4 40V18A12 12 0 0 1 16 6z" fill="#1fb85a"/><path d="M16 38l10-10 8 8 14-14" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M39 22h9v9" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export const brand = `${mark}<span class="brand-name">otimizza<span>.digital</span></span>`;

const whatsappGlyph = `<svg viewBox="0 0 32 32" aria-hidden="true" fill="currentColor"><path d="M16 2a14 14 0 0 0-12.1 21L2 30l7.2-1.9A14 14 0 1 0 16 2Zm0 25.4a11.3 11.3 0 0 1-5.8-1.6l-.4-.2-4.2 1.1 1.1-4.1-.3-.5A11.4 11.4 0 1 1 16 27.4Zm6.3-8.5c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a9.3 9.3 0 0 1-4.5-3.9c-.3-.5.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.6-.5-.8-.5h-.6c-.2 0-.6.1-.8.4s-1.1 1.1-1.1 2.6 1.1 3 1.3 3.2 2.3 3.6 5.5 5c2 .8 2.8.9 3.8.7.6-.1 1.9-.8 2.2-1.5s.3-1.3.2-1.5-.2-.2-.5-.4Z"/></svg>`;

function header() {
  return `<a class="skip-link" href="#conteudo">Pular para o conteúdo</a><header class="site-header"><div class="container header-inner"><a class="brand" href="/" aria-label="Otimizza Digital — início">${brand}</a><nav class="site-nav" aria-label="Seções"><a href="#como-funciona">Como funciona</a><a href="#painel">Painel</a><a href="#plano">Plano</a><a href="#duvidas">Dúvidas</a><a href="/ajuda/">Guia</a></nav><a class="header-cta" href="${escape(whatsappUrl())}" target="_blank" rel="noopener noreferrer">${whatsappGlyph}<span>Falar no WhatsApp</span></a></div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="container footer-grid"><div class="footer-brand"><a class="brand" href="/" aria-label="Otimizza Digital — início">${brand}</a><p>Cardápio e atendimento com inteligência artificial no WhatsApp para restaurantes, lanchonetes e similares.</p></div><div class="footer-contact"><a href="/ajuda/">Guia de implantação</a><strong>Contato</strong><a href="${escape(whatsappUrl())}" target="_blank" rel="noopener noreferrer">WhatsApp ${site.whatsappDisplay}</a><a href="mailto:${site.email}">${site.email}</a><span>${site.city} · atendimento à cidade e região</span></div><div class="footer-about"><strong>Quem faz</strong><a href="${site.ownerSite}/" target="_blank" rel="noopener noreferrer">${site.owner} · TA Consulting</a><span>Mais de 15 anos em marketing digital, dados e automação.</span></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} ${site.name}</span><a href="/privacidade/">Privacidade</a><a href="#conteudo">Voltar ao início ${arrow}</a></div></div></footer>`;
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
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">${tagManagerHead}<meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(fullTitle)}</title><meta name="description" content="${escape(description)}"><meta name="author" content="${site.owner}"><meta name="theme-color" content="#ffffff"><meta name="color-scheme" content="light"><meta name="robots" content="${noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'}">${path === '/404/' ? '' : `<link rel="canonical" href="${site.origin}${path}">`}<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/assets/apple-touch-icon.png"><link rel="preload" href="/assets/fonts/barlow-semi-condensed-500.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/assets/fonts/manrope-400.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/assets/site.css"><meta property="og:type" content="website"><meta property="og:site_name" content="${site.name}"><meta property="og:locale" content="pt_BR"><meta property="og:title" content="${escape(fullTitle)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${site.origin}${path}"><meta property="og:image" content="${social}"><meta property="og:image:type" content="image/png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Cardápio IA, da Otimizza Digital: seu WhatsApp atende sozinho."><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escape(fullTitle)}"><meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="${social}"><script type="application/ld+json">${schema(path, fullTitle, description, extra)}</script><script src="/assets/site.js" defer></script></head><body>${tagManagerBody}${header()}<main id="conteudo">${body}</main>${footer()}${whatsappFloat()}</body></html>`;
}

export function privacyPage() {
  return layout({ path: '/privacidade/', title: 'Privacidade', description: 'Como o site da Otimizza Digital trata as informações de quem o visita.', body: `<section class="container simple-page"><h1>Privacidade, com clareza.</h1><p>Este site apresenta o Cardápio IA e leva o contato para o WhatsApp. Ele não tem formulário, não cria conta e não salva dados no seu navegador.</p><h2>Contato pelo WhatsApp</h2><p>Os botões abrem o WhatsApp com uma mensagem preparada. Você decide se envia. A conversa segue as práticas de privacidade do WhatsApp.</p><h2>Navegação</h2><p>Este site utiliza o Google Tag Manager para carregar e gerenciar tags de medição. Dependendo das tags configuradas, elas podem medir visitas e cliques e utilizar cookies. A hospedagem pode registrar dados técnicos de acesso para funcionamento e segurança.</p><h2>Dúvidas</h2><p>Escreva para <a href="mailto:${site.email}">${site.email}</a>. ${site.owner}, ${site.name}.</p></section>` });
}

export function notFoundPage() {
  return layout({ path: '/404/', title: 'Página não encontrada', description: 'Esta página não existe no site da Otimizza Digital.', noindex: true, body: `<section class="container simple-page"><h1>Essa página não existe.</h1><p>Volte ao <a href="/">início</a> ou fale com a gente pelo <a href="${escape(whatsappUrl())}" target="_blank" rel="noopener noreferrer">WhatsApp</a>.</p></section>` });
}
