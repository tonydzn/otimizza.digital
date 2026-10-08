// Página única do Cardápio IA (Otimizza Digital): cardápio e atendimento automático
// no WhatsApp para restaurantes, lanchonetes e similares.
import { site } from './site.mjs';
import { escape, arrow, layout } from './layout.mjs';

const WA_TEXT = site.whatsappText;
export const cardapioWhatsapp = () => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(WA_TEXT)}`;

const waIcon = `<svg class="ci-wa" viewBox="0 0 32 32" aria-hidden="true" fill="currentColor"><path d="M16 2a14 14 0 0 0-12.1 21L2 30l7.2-1.9A14 14 0 1 0 16 2Zm0 25.4a11.3 11.3 0 0 1-5.8-1.6l-.4-.2-4.2 1.1 1.1-4.1-.3-.5A11.4 11.4 0 1 1 16 27.4Zm6.3-8.5c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0a9.3 9.3 0 0 1-4.5-3.9c-.3-.5.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.6-.5-.8-.5h-.6c-.2 0-.6.1-.8.4s-1.1 1.1-1.1 2.6 1.1 3 1.3 3.2 2.3 3.6 5.5 5c2 .8 2.8.9 3.8.7.6-.1 1.9-.8 2.2-1.5s.3-1.3.2-1.5-.2-.2-.5-.4Z"/></svg>`;
const check = `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`;

const cta = (label, extra = '') => `<a class="ci-button${extra ? ' ' + extra : ''}" href="${escape(cardapioWhatsapp())}" target="_blank" rel="noopener noreferrer">${waIcon}<span>${label}</span></a>`;

// Conversa de demonstração. Nomes, itens e valores são fictícios.
const chat = [
  ['in', 'Oi, tem cardápio?', '19:42'],
  ['out', 'Oi! Aqui é o atendimento da Lanchonete do Zé. Hoje temos:<br><strong>X-Salada</strong> R$ 22 · <strong>X-Bacon</strong> R$ 26<br><strong>Batata média</strong> R$ 14 · <strong>Refri lata</strong> R$ 6<br>O que vai querer?', '19:42'],
  ['in', '2 x-bacon e uma batata', '19:43'],
  ['out', 'Anotado: <strong>2 X-Bacon</strong> e <strong>1 Batata média</strong>. Total <strong>R$ 66</strong>.<br>É para entrega ou retirada?', '19:43'],
  ['in', 'Entrega. Rua das Flores, 120', '19:44'],
  ['out', 'Entrega na <strong>Rua das Flores, 120</strong>. Previsão de 40 min. Pagamento no Pix ou na entrega?', '19:44'],
  ['in', 'Pix', '19:44'],
  ['out', 'Pedido <strong>#128</strong> confirmado e enviado para a cozinha. Chave Pix: <strong>pix@lanchonetedoze.com.br</strong>. Qualquer coisa, é só chamar.', '19:45'],
];

function chatDemo() {
  return `<div class="ci-phone" data-chat><div class="ci-phone-top"><span class="ci-avatar" aria-hidden="true">Z</span><div><strong>Lanchonete do Zé</strong><span>Cardápio IA · responde na hora</span></div></div><ol class="ci-messages" aria-live="polite" aria-label="Conversa de demonstração">${chat.map(([dir, text, time]) => `<li class="ci-msg ci-msg-${dir}" data-msg><p>${text}</p><time>${time}</time></li>`).join('')}<li class="ci-typing" data-typing aria-hidden="true"><span></span><span></span><span></span></li></ol><div class="ci-phone-bar"><button type="button" class="ci-replay" data-chat-replay>Ver de novo ${arrow}</button><span>Demonstração simulada</span></div></div>`;
}

// Gráfico de barras: mensagens por hora em um dia típico de lanchonete. Simulação.
function hourChart() {
  const hours = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  const values = [14, 42, 56, 30, 12, 10, 14, 26, 58, 92, 100, 70, 28];
  const w = 680, h = 230, left = 10, bottom = 40, gap = 10;
  const bw = (w - left * 2 - gap * (hours.length - 1)) / hours.length;
  const bars = hours.map((hr, i) => {
    const x = left + i * (bw + gap);
    const bh = (values[i] / 100) * (h - bottom - 30);
    const rush = hr >= 19 && hr <= 21;
    return `<g class="${rush ? 'rush' : ''}${i % 2 ? ' odd' : ''}"><rect x="${x.toFixed(1)}" y="${(h - bottom - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="3"/><text x="${(x + bw / 2).toFixed(1)}" y="${h - bottom + 22}" text-anchor="middle">${hr}h</text></g>`;
  }).join('');
  const rx = left + 8 * (bw + gap) - gap / 2;
  const rw = 3 * (bw + gap);
  return `<figure class="ci-chart ci-chart-hours"><figcaption><strong>Mensagens que chegam por hora</strong><span>Simulação de um dia de lanchonete. Não são dados de clientes.</span></figcaption><svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Gráfico de barras simulado: as mensagens se concentram entre 19h e 21h, o horário de pico."><rect class="rush-band" x="${rx.toFixed(1)}" y="8" width="${rw.toFixed(1)}" height="${h - bottom - 8}" rx="6"/><text class="rush-label" x="${(rx + rw / 2).toFixed(1)}" y="26" text-anchor="middle">hora do rush</text>${bars}</svg></figure>`;
}

// Gráfico de tempo até a primeira resposta, por horário. Simulação.
function responseChart(kind) {
  const slots = ['18h', '19h', '20h', '21h', '22h'];
  const values = kind === 'sem' ? [4, 9, 16, 21, 11] : [0.2, 0.2, 0.2, 0.2, 0.2];
  const max = 24, w = 420, rowH = 34, labelW = 44;
  const rows = slots.map((s, i) => {
    const y = i * rowH;
    const len = (values[i] / max) * (w - labelW - 70);
    const label = kind === 'sem' ? `${values[i]} min` : 'segundos';
    return `<g transform="translate(0 ${y})"><text x="0" y="22" class="slot">${s}</text><rect x="${labelW}" y="7" width="${Math.max(len, 6).toFixed(1)}" height="20" rx="3"/><text x="${(labelW + Math.max(len, 6) + 10).toFixed(1)}" y="22" class="val">${label}</text></g>`;
  }).join('');
  return `<figure class="ci-chart ci-chart-response ci-${kind}"><figcaption><strong>Tempo até a primeira resposta</strong><span>Simulação por horário. ${kind === 'sem' ? 'Com uma pessoa atendendo balcão, telefone e WhatsApp.' : 'Com o Cardápio IA respondendo na hora.'}</span></figcaption><svg viewBox="0 0 ${w} ${slots.length * rowH}" role="img" aria-label="${kind === 'sem' ? 'Gráfico simulado: a espera pela primeira resposta sobe de 4 para 21 minutos no pico.' : 'Gráfico simulado: a primeira resposta chega em segundos em todos os horários.'}">${rows}</svg></figure>`;
}

function compare() {
  return `<section class="ci-compare" id="antes-depois"><div class="container"><div class="ci-heading"><h2>O mesmo balcão.<br><span>Duas noites diferentes.</span></h2><p>Quem está atendendo o balcão e o telefone não consegue responder o WhatsApp ao mesmo tempo. O cliente que espera demais pede em outro lugar.</p></div><div class="ci-switch" role="tablist" aria-label="Comparar sem e com Cardápio IA"><button type="button" role="tab" id="tab-sem" aria-selected="true" aria-controls="panel-sem" data-compare="sem">Sem Cardápio IA</button><button type="button" role="tab" id="tab-com" aria-selected="false" aria-controls="panel-com" data-compare="com">Com Cardápio IA</button></div><div class="ci-stage" data-compare-stage>
<article class="ci-panel ci-panel-sem" id="panel-sem" role="tabpanel" aria-labelledby="tab-sem"><figure class="ci-scene"><img src="/assets/illustrations/cardapio-antes-900.jpg" width="900" height="1117" alt="Ilustração: atendente de lanchonete com telefone no ombro, dois celulares vibrando e comandas caindo da bancada às 20h." loading="lazy" decoding="async"></figure><div class="ci-panel-copy"><h3>20h. Telefone no ombro, dois celulares vibrando.</h3><ul class="ci-points"><li>Mensagens ficam sem resposta enquanto o balcão está cheio.</li><li>Cardápio é enviado por foto, uma por uma, com preço desatualizado.</li><li>Pedido anotado de cabeça, endereço confirmado pela segunda vez.</li></ul>${responseChart('sem')}</div></article>
<article class="ci-panel ci-panel-com" id="panel-com" role="tabpanel" aria-labelledby="tab-com"><figure class="ci-scene"><img src="/assets/illustrations/cardapio-depois-900.jpg" width="900" height="1117" alt="Ilustração: atendente tranquilo montando um prato enquanto o celular no suporte recebe pedidos organizados e a impressora solta a comanda." loading="lazy" decoding="async"></figure><div class="ci-panel-copy"><h3>20h. O WhatsApp responde sozinho. Você cuida da comida.</h3><ul class="ci-points"><li>Cada mensagem recebe resposta na hora, com o cardápio do dia.</li><li>O pedido chega anotado: itens, total, endereço e pagamento.</li><li>Quando o cliente quer falar com alguém, a IA avisa e passa a conversa.</li></ul>${responseChart('com')}</div></article>
</div></div></section>`;
}

function flow() {
  const steps = [
    ['Mostra o cardápio', 'O cliente pergunta e recebe o cardápio atualizado: itens, preços, combos e o que está em falta hoje.', '/assets/illustrations/cardapio-menu-900.jpg', 900, 1193, 'Ilustração: mão segurando celular com cardápio digital de lanche, pizza, açaí e marmita.', 'Tem lanche sem cebola?', 'Tem sim. O X-Salada e o X-Bacon podem vir sem cebola. Quer que eu anote assim?'],
    ['Anota o pedido', 'Item por item, com quantidade, observações e total. Sem “pera aí que eu anoto” no meio do rush.', null, 0, 0, '', '2 x-bacon sem cebola e 1 batata', 'Anotado: 2 X-Bacon sem cebola e 1 Batata média. Total R$ 66. Entrega ou retirada?'],
    ['Confirma entrega e pagamento', 'Endereço, previsão de entrega e forma de pagamento confirmados na mesma conversa. O pedido vai para a cozinha.', '/assets/illustrations/cardapio-motoboy-900.jpg', 900, 900, 'Ilustração: entregador de moto com mochila térmica verde deixando um rastro de balões de mensagem.', 'Rua das Flores, 120. Pix', 'Pedido #128 confirmado. Previsão: 40 min. Chave Pix enviada.'],
    ['Fecha o dia com você', 'No fim da noite, um resumo dos pedidos, dos itens mais vendidos e das perguntas que a IA não soube responder.', '/assets/illustrations/cardapio-dona-900.jpg', 900, 1117, 'Ilustração: dona de restaurante sentada à mesa no fim do expediente, olhando um gráfico no celular, com café e um gato dormindo na cadeira ao lado.', 'resumo de hoje', '38 pedidos, R$ 1.812. Mais vendido: X-Bacon (41). 2 perguntas ficaram para você responder.'],
  ];
  return `<section class="ci-flow" id="como-funciona"><div class="container"><div class="ci-heading"><h2>O que a IA faz<br><span>dentro da conversa.</span></h2><p>Nada de aplicativo novo para o cliente baixar. Tudo acontece no WhatsApp que ele já usa, no número do seu restaurante.</p></div><ol class="ci-flow-list">${steps.map(([title, text, img, w, h, alt, q, a], i) => `<li class="ci-step${img ? '' : ' ci-step-chat'}"><div class="ci-step-visual">${img ? `<img src="${img}" width="${w}" height="${h}" alt="${escape(alt)}" loading="lazy" decoding="async">` : ''}<div class="ci-mini-chat" aria-label="Exemplo de conversa simulada"><p class="ci-msg ci-msg-in">${q}</p><p class="ci-msg ci-msg-out">${a}</p><small>exemplo simulado</small></div></div><div class="ci-step-copy"><span class="ci-step-num" aria-hidden="true">${i + 1}</span><h3>${title}</h3><p>${text}</p></div></li>`).join('')}</ol></div></section>`;
}

function painel() {
  const icon = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const items = [
    ['Pedidos em tempo real', 'Cada pedido confirmado aparece no quadro da cozinha com alarme sonoro. Um toque passa de “novo” para “em preparo”, “saiu” e “entregue”, e o cliente recebe aviso no WhatsApp a cada etapa.', icon('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h10M7 13h6"/>')],
    ['Cardápio com fotos', 'Itens, tamanhos, adicionais e fotos cadastrados no painel. Marcou “esgotado”, a IA para de oferecer na hora. Quando o cliente pede um item, a foto vai junto na conversa.', icon('<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-8 8"/>')],
    ['Entende áudio', 'Cliente mandou áudio? A IA transcreve e anota o pedido do mesmo jeito. Sem pedir para “escrever de novo”.', icon('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>')],
    ['Chat para assumir quando quiser', 'Quando o cliente pede uma pessoa, você recebe um aviso e responde pelo painel, com o histórico e os dados do cliente ao lado. Quando termina, devolve para a IA.', icon('<path d="M4 5h16v11H9l-5 4z"/>')],
    ['Entregadores', 'Cadastre quem entrega. Ao despachar, o entregador recebe endereço, telefone e pagamento no WhatsApp e confirma “peguei” e “entreguei” pelo celular. O cliente é avisado.', icon('<circle cx="7" cy="17" r="3"/><circle cx="17" cy="17" r="3"/><path d="M7 17h7l3-8h4M10 9h5l2 8"/>')],
    ['Integra com o seu sistema', 'Pedidos enviados ao seu PDV ou ERP pelo padrão Open Delivery (Abrasel) ou por webhook. Sem digitar o pedido duas vezes.', icon('<path d="M9 7H6a3 3 0 0 0 0 6h3M15 7h3a3 3 0 0 1 0 6h-3M8 10h8"/>')],
  ];
  return `<section class="ci-painel" id="painel"><div class="container"><div class="ci-heading"><h2>Um painel para a cozinha<br><span>e para você.</span></h2><p>A conversa acontece no WhatsApp; a operação acontece no painel, no celular, no tablet ou no computador. Sem instalar nada.</p></div><ul class="ci-painel-grid">${items.map(([t, d, i]) => `<li><span class="ci-painel-icon">${i}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ul><p class="ci-painel-note">E no fim do dia, o resumo chega no seu WhatsApp: pedidos, faturamento, mais vendidos e as perguntas que a IA não soube responder.</p><aside class="ci-demo-card" aria-labelledby="demo-titulo"><div class="ci-demo-copy"><p class="ci-demo-eyebrow">Experimente agora</p><h3 id="demo-titulo">Entre no painel de demonstração</h3><p>Um restaurante fictício já montado: pedidos em andamento, cardápio com fotos e adicionais, uma conversa esperando atendimento e entregadores. Mexa à vontade, os dados voltam ao padrão toda madrugada.</p></div><dl class="ci-demo-cred"><div><dt>Endereço</dt><dd><a href="https://app.otimizza.digital/login" target="_blank" rel="noopener noreferrer">app.otimizza.digital</a></dd></div><div><dt>E-mail</dt><dd><code>demo@otimizza.digital</code></dd></div><div><dt>Senha</dt><dd><code>demo</code></dd></div></dl><div class="ci-demo-actions"><a class="ci-button ci-button-big" href="https://app.otimizza.digital/login" target="_blank" rel="noopener noreferrer"><span>Abrir a demonstração</span></a><a class="ci-text-link" href="/ajuda/#demo">Como funciona a demonstração ${arrow}</a></div></aside></div></section>`;
}

function serve() {
  const kinds = [
    ['Lanchonetes', 'Lanches, porções e combos com observação por item.', 'cardapio-lanche-600.jpg', 'Ilustração de um hambúrguer com queijo, alface e tomate.'],
    ['Pizzarias', 'Sabores, tamanhos, meio a meio e borda recheada.', 'cardapio-pizza-600.jpg', 'Ilustração de uma pizza na caixa aberta com uma fatia levantada.'],
    ['Marmitarias', 'Cardápio do dia, tamanhos e horário de corte dos pedidos.', 'cardapio-marmita-600.jpg', 'Ilustração de uma marmita com arroz, feijão, bife e salada.'],
    ['Açaiterias', 'Tamanhos, acompanhamentos e adicionais sem confusão.', 'cardapio-acai-600.jpg', 'Ilustração de uma tigela de açaí com banana, granola e morango.'],
  ];
  return `<section class="ci-serve" id="para-quem"><div class="container"><div class="ci-heading"><h2>Feito para quem vende<br><span>pelo WhatsApp todo dia.</span></h2><p>Restaurantes, lanchonetes e similares de Presidente Prudente e região. Se o seu cliente pede por mensagem, o Cardápio IA se encaixa.</p></div><ul class="ci-kinds">${kinds.map(([name, text, file, alt]) => `<li><img src="/assets/illustrations/${file}" width="600" height="600" alt="${escape(alt)}" loading="lazy" decoding="async"><h3>${name}</h3><p>${text}</p></li>`).join('')}</ul><p class="ci-serve-more">Também: hamburguerias, pastelarias, sushi, padarias com delivery, restaurantes à la carte e dark kitchens.</p></div></section>`;
}

function setup() {
  const steps = [
    ['Você manda o cardápio', 'Foto, PDF, planilha ou print. A gente organiza itens, preços, tamanhos e observações.'],
    ['A IA aprende o seu jeito', 'Horário de funcionamento, área de entrega, formas de pagamento, tempo médio e as perguntas que mais chegam.'],
    ['Liga no seu WhatsApp', 'O atendimento começa no número do restaurante. Dali em diante, preço, item esgotado, horário e fotos você mesmo ajusta no painel, em um toque.'],
  ];
  return `<section class="ci-setup" id="implantacao"><div class="container ci-setup-grid"><div class="ci-heading"><h2>Três passos<br><span>e está atendendo.</span></h2><p>Sem instalar nada no balcão. Sem treinar equipe. Você continua recebendo os pedidos como hoje, só que anotados.</p>${cta('Quero começar')}</div><ol class="ci-setup-steps">${steps.map(([t, d], i) => `<li><span aria-hidden="true">${i + 1}</span><div><h3>${t}</h3><p>${d}</p></div></li>`).join('')}</ol></div></section>`;
}

function pricing() {
  const included = ['Cardápio com fotos respondido no WhatsApp, 24 horas, em texto ou áudio', 'Anotação do pedido com itens, observações e total', 'Confirmação de endereço, previsão e forma de pagamento', 'Painel com pedidos em tempo real, alarme de pedido novo e comanda', 'Cadastro de cardápio, horários, bairros e entregadores pelo painel', 'Chat para assumir a conversa e aviso no seu WhatsApp quando o cliente pede uma pessoa', 'Resumo diário de pedidos e perguntas sem resposta', 'Integração com PDV por Open Delivery ou webhook'];
  return `<section class="ci-price" id="plano"><div class="container ci-price-grid"><div class="ci-price-card"><p class="ci-price-value"><span class="ci-currency">R$</span><span class="ci-amount">99</span><span class="ci-period">/mês</span></p><p class="ci-price-note">Plano único: um número de WhatsApp e um cardápio. Pagamento mensal.</p>${cta('Quero o Cardápio IA', 'ci-button-big')}<p class="ci-price-foot">O botão abre uma conversa no WhatsApp com a Otimizza Digital. A contratação é combinada por lá.</p></div><div class="ci-price-list"><h2>O que está incluído<br><span>nos R$ 99.</span></h2><ul>${included.map(item => `<li>${check}<span>${item}</span></li>`).join('')}</ul><p class="ci-price-obs">O pagamento do cliente continua acontecendo como hoje: Pix, cartão na entrega ou dinheiro. O Cardápio IA informa e confirma, não processa o pagamento.</p></div></div></section>`;
}

function faq() {
  const items = [
    ['Funciona no número de WhatsApp que eu já uso?', 'Sim. O atendimento é ligado ao número do restaurante. Seus clientes continuam chamando no mesmo contato de sempre.'],
    ['E se o cliente quiser falar com uma pessoa?', 'A IA percebe quando o cliente pede uma pessoa, avisa você e deixa a conversa aberta para a equipe responder. Ninguém fica preso com o robô.'],
    ['Como eu mudo um preço ou tiro um item do cardápio?', 'No painel, pelo celular. Um toque em “esgotado” e a IA para de oferecer o item na hora; preço, foto, tamanhos e adicionais também são editados ali.'],
    ['Preciso de computador ou de um sistema de pedidos?', 'Não. O painel abre no celular ou em um tablet na cozinha e mostra os pedidos em tempo real. Se você já usa um sistema de pedidos ou PDV, o Cardápio IA envia os pedidos para ele pelo padrão Open Delivery ou por webhook.'],
    ['Meus clientes mandam muito áudio. Funciona?', 'Sim. A IA transcreve o áudio e anota o pedido como se fosse texto. Só pede para escrever se o áudio estiver inaudível.'],
    ['Como fica a entrega?', 'Você cadastra seus entregadores no painel. Ao despachar o pedido, o entregador recebe endereço, telefone do cliente e forma de pagamento no WhatsApp, e confirma pelo celular quando pega e quando entrega. O cliente é avisado em cada etapa.'],
    ['A IA pode responder algo errado?', 'Ela responde a partir do cardápio e das regras que você informa. O que não sabe, encaminha para você em vez de inventar. O resumo diário lista essas perguntas para ajustarmos.'],
    ['Tem fidelidade ou taxa de instalação?', 'Essas condições são combinadas na conversa de contratação pelo WhatsApp. O valor do plano é R$ 99 por mês.'],
  ];
  return `<section class="ci-faq" id="duvidas"><div class="container ci-faq-grid"><div class="ci-heading"><h2>Perguntas de quem<br><span>está no balcão.</span></h2><p>Não achou a sua? Chama no WhatsApp e pergunta direto.</p>${cta('Tirar uma dúvida')}</div><div class="ci-faq-list">${items.map(([q, a]) => `<details><summary>${q}<span aria-hidden="true">${arrow}</span></summary><p>${a}</p></details>`).join('')}</div></div></section>`;
}

export function cardapioPage() {
  const body = `
<section class="ci-hero" id="inicio"><div class="container ci-hero-grid"><div class="ci-hero-copy"><h1>Seu WhatsApp<br>atende sozinho.<br><span>Até na hora do rush.</span></h1><p class="ci-lead">O Cardápio IA responde na hora, mostra o cardápio com fotos, anota o pedido, confirma endereço e pagamento e manda tudo para o painel da cozinha. No número do seu restaurante, 24 horas por dia.</p><div class="ci-hero-offer"><p class="ci-hero-price"><strong>R$ 99</strong><span>por mês, plano único</span></p>${cta('Quero no meu restaurante', 'ci-button-big')}</div><a class="ci-text-link" href="#antes-depois">Ver o antes e depois ${arrow}</a></div><div class="ci-hero-visual"><figure class="ci-hero-scene"><img src="/assets/illustrations/cardapio-rush-1600.jpg" srcset="/assets/illustrations/cardapio-rush-900.jpg 900w, /assets/illustrations/cardapio-rush-1600.jpg 1600w" sizes="(max-width:960px) 100vw, 58vw" width="1600" height="1010" alt="Ilustração de uma lanchonete no horário de pico: chapeiro trabalhando, atendente entregando uma sacola, fila de clientes e mochila de entrega no balcão." fetchpriority="high" decoding="async"></figure>${chatDemo()}</div></div><div class="container ci-hero-chart">${hourChart()}</div></section>
${compare()}
${flow()}
${painel()}
${serve()}
${setup()}
${pricing()}
${faq()}
<section class="ci-final"><div class="container"><h2>A próxima noite de rush<br><span>pode ser mais tranquila.</span></h2><p>Chama no WhatsApp, conta como é o seu atendimento hoje e a gente te mostra como o Cardápio IA ficaria no seu restaurante.</p>${cta('Falar com a gente no WhatsApp', 'ci-button-big')}<p class="ci-final-note">Otimizza Digital · Presidente Prudente e região · (18) 98186-8701</p></div></section>
<div class="ci-sticky" aria-hidden="true"><span><strong>R$ 99</strong>/mês</span>${cta('Quero no meu restaurante')}</div>`;
  const faqSchema = { '@type': 'FAQPage', mainEntity: [
    ['Funciona no número de WhatsApp que eu já uso?', 'Sim. O atendimento é ligado ao número do restaurante. Seus clientes continuam chamando no mesmo contato de sempre.'],
    ['E se o cliente quiser falar com uma pessoa?', 'A IA percebe quando o cliente pede uma pessoa, avisa você e deixa a conversa aberta para a equipe responder.'],
    ['Como eu mudo um preço ou tiro um item do cardápio?', 'No painel, pelo celular: esgotado, preço, foto, tamanhos e adicionais são editados em um toque.'],
    ['Meus clientes mandam muito áudio. Funciona?', 'Sim. A IA transcreve o áudio e anota o pedido como se fosse texto.'],
  ].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
  const product = { '@type': 'Product', name: 'Cardápio IA', description: 'Cardápio e atendimento automático com inteligência artificial no WhatsApp para restaurantes, lanchonetes e similares.', brand: { '@type': 'Brand', name: 'Otimizza Digital' }, offers: { '@type': 'Offer', price: '99.00', priceCurrency: 'BRL', url: site.origin + '/', availability: 'https://schema.org/InStock', priceSpecification: { '@type': 'UnitPriceSpecification', price: '99.00', priceCurrency: 'BRL', billingIncrement: 1, unitCode: 'MON' } } };
  return layout({ path: '/', title: 'Cardápio IA: atendimento automático no WhatsApp para restaurantes', description: 'Cardápio com inteligência artificial no WhatsApp do seu restaurante ou lanchonete: responde, anota pedidos e confirma entrega 24h. Plano único de R$ 99/mês.', body, extra: [faqSchema, product] });
}
