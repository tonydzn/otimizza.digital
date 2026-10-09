// Cardápio IA: conversa de demonstração e comparação sem/com.
(() => {
  const page = document.body;
  page.classList.add('js');

  // Cliques no WhatsApp vão para o dataLayer (GTM) como conversão de contato.
  // Exceção: links com data-track="teste" (número de teste da IA) mandam bot_teste_click, que NÃO deve virar conversão no Meta.
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href*="wa.me/"], a[href*="api.whatsapp.com"]');
    if (!link) return;
    try {
      window.dataLayer = window.dataLayer || [];
      const teste = link.dataset.track === 'teste';
      window.dataLayer.push({ event: teste ? 'bot_teste_click' : 'whatsapp_click', content_name: teste ? 'Teste da IA' : 'Cardápio IA', link_text: (link.textContent || '').trim().slice(0, 80), page_path: location.pathname });
    } catch { /* rastreamento nunca quebra a página */ }
  }, { capture: true });
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Conversa que se escreve sozinha quando entra na tela.
  const chat = page.querySelector('[data-chat]');
  if (chat) {
    const messages = [...chat.querySelectorAll('[data-msg]')];
    const typing = chat.querySelector('[data-typing]');
    const list = chat.querySelector('.ci-messages');
    let timer = null, index = 0, started = false;
    const showAll = () => { messages.forEach(m => m.classList.add('is-shown')); typing.classList.remove('is-shown'); list.scrollTop = list.scrollHeight; };
    const next = () => {
      clearTimeout(timer);
      if (index >= messages.length) { typing.classList.remove('is-shown'); return; }
      const message = messages[index];
      const isBot = message.classList.contains('ci-msg-out');
      if (isBot) { typing.classList.add('is-shown'); list.appendChild(typing); list.scrollTop = list.scrollHeight; }
      timer = setTimeout(() => {
        typing.classList.remove('is-shown');
        message.classList.add('is-shown');
        index += 1;
        list.scrollTop = list.scrollHeight;
        timer = setTimeout(next, isBot ? 1100 : 700);
      }, isBot ? 900 : 350);
    };
    const restart = () => { clearTimeout(timer); index = 0; messages.forEach(m => m.classList.remove('is-shown')); list.scrollTop = 0; if (reduced) showAll(); else next(); };
    const start = () => { if (started) return; started = true; if (reduced) showAll(); else next(); };
    chat.querySelector('[data-chat-replay]').addEventListener('click', restart);
    chat.addEventListener('click', event => { if (!event.target.closest('button') && !reduced && index < messages.length) next(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries, observer) => { if (entries.some(e => e.isIntersecting)) { start(); observer.disconnect(); } }, { threshold: .4 }).observe(chat);
    } else start();
  }

  // Comutador sem / com Cardápio IA.
  const stage = page.querySelector('[data-compare-stage]');
  if (stage) {
    const tabs = [...page.querySelectorAll('[data-compare]')];
    const panels = { sem: stage.querySelector('#panel-sem'), com: stage.querySelector('#panel-com') };
    const select = (key, focus = false) => {
      tabs.forEach(tab => { const on = tab.dataset.compare === key; tab.setAttribute('aria-selected', String(on)); tab.tabIndex = on ? 0 : -1; if (on && focus) tab.focus(); });
      Object.entries(panels).forEach(([k, panel]) => { panel.hidden = k !== key; panel.classList.toggle('is-entering', k === key); });
    };
    tabs.forEach(tab => {
      tab.addEventListener('click', () => select(tab.dataset.compare));
      tab.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const i = tabs.indexOf(tab);
        const to = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (i + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        select(tabs[to].dataset.compare, true);
      });
    });
    select('sem');
  }
})();

// Aviso de cookies: a escolha fica no navegador; "aceito" libera Google (Consent Mode) e Meta Pixel.
(function () {
  var aviso = document.getElementById('aviso-cookies'); if (!aviso) return;
  var ler = function () { try { return localStorage.getItem('consentimento'); } catch (e) { return null; } };
  var aplicar = function (v) {
    var ok = v === 'aceito';
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(['consent', 'update', { analytics_storage: ok ? 'granted' : 'denied', ad_storage: ok ? 'granted' : 'denied', ad_user_data: ok ? 'granted' : 'denied', ad_personalization: ok ? 'granted' : 'denied' }]);
    window.dataLayer.push({ event: ok ? 'consent_granted' : 'consent_denied' });
  };
  var mostrar = function () { aviso.hidden = false; };
  if (!ler()) mostrar();
  aviso.querySelectorAll('[data-consent]').forEach(function (b) { b.addEventListener('click', function () { var v = b.getAttribute('data-consent'); try { localStorage.setItem('consentimento', v); } catch (e) {} aplicar(v); aviso.hidden = true; }); });
  document.querySelectorAll('[data-cookie-prefs]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); try { localStorage.removeItem('consentimento'); } catch (err) {} mostrar(); aviso.scrollIntoView({ block: 'end' }); }); });
})();
