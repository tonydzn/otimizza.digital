// Cardápio IA: conversa de demonstração e comparação sem/com.
(() => {
  const page = document.body;
  page.classList.add('js');
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
