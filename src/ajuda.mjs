// Guia passo a passo para o restaurante que acabou de contratar o Cardápio IA.
import { escape, arrow, layout, whatsappUrl } from './layout.mjs';
import { site } from './site.mjs';

const PAINEL = 'https://app.otimizza.digital';
const passos = [
  ['Entrar no painel', [
    `Abra <a href="${PAINEL}" target="_blank" rel="noopener noreferrer">app.otimizza.digital</a> no celular, tablet ou computador. Não precisa instalar nada; no celular, use “Adicionar à tela inicial” para abrir como aplicativo.`,
    'Use o e-mail e a senha que a Otimizza enviou. Se perdeu, chame no WhatsApp que a gente gera uma senha nova.',
  ]],
  ['Configurações: como o restaurante funciona', [
    'Em <strong>Configurações</strong>, confira nome, endereço de retirada, cidade e telefone.',
    'Marque as <strong>formas de pagamento</strong> aceitas e, se usar Pix, informe a chave: a IA envia ao cliente quando o pedido é confirmado.',
    'Preencha os <strong>horários</strong> de cada dia no formato 18:00-23:30. Dois turnos: 11:00-14:00, 18:00-23:00. Turno que vira a noite: 18:00-01:00. Dia vazio = fechado.',
    'Cadastre os <strong>bairros atendidos</strong> com a taxa de entrega. Fora dessa lista a IA oferece retirada.',
    'Informe o <strong>telefone do dono</strong>: é para onde vão os avisos (cliente pediu atendimento, IA sem resposta, resumo do dia).',
  ]],
  ['Cardápio: o que a IA vai oferecer', [
    'Em <strong>Cardápio</strong>, crie as categorias (Lanches, Pizzas, Bebidas…) e depois os itens dentro de cada uma.',
    'Para cada item: nome, descrição com os ingredientes (a IA usa esse texto), preço único ou tamanhos (P, M, G com preço cada), adicionais com preço, e os apelidos que o cliente costuma escrever (“xbacon”, “x bacon”).',
    'Coloque uma <strong>foto</strong> por item: quando o cliente pede, a foto vai junto na conversa. Vale também subir uma foto do cardápio completo.',
    'Acabou um item? Toque em <strong>Disponível</strong> e ele vira “Esgotado” na hora; a IA para de oferecer até você reativar.',
  ]],
  ['Conectar o WhatsApp do restaurante', [
    'Em <strong>WhatsApp</strong>, clique em “Criar instância” na primeira vez. Aparece um QR code.',
    'No celular do restaurante: WhatsApp → Configurações → Aparelhos conectados → Conectar aparelho → aponte para o QR.',
    'O ícone do WhatsApp no menu fica verde quando está conectado. Se ficar vermelho, volte nessa tela e leia o QR de novo. Mantenha o celular com internet.',
  ]],
  ['Fazer o primeiro teste', [
    'De outro celular, mande “oi” para o número do restaurante. A IA deve cumprimentar e perguntar o que a pessoa quer.',
    'Peça o cardápio, faça um pedido de teste, confirme com “ok” e veja o pedido aparecer em <strong>Pedidos</strong> com alarme.',
    'Cancele o pedido de teste no quadro, informando o motivo. O cliente recebe o aviso.',
  ]],
  ['A rotina do dia: Pedidos', [
    'Deixe <strong>Pedidos</strong> aberto no tablet ou celular da cozinha. Pedido novo toca o alarme e aparece na coluna “Novos”; toque em <strong>Ciente</strong> para parar o som.',
    'Avance o pedido com o botão ou arrastando o cartão: “Aceitar e preparar” → “Saiu para entrega” (ou “Pronto” para retirada) → “Entregue”. A cada passo o cliente recebe uma mensagem.',
    'O ícone de impressora abre a comanda para imprimir. Pedido parado mais de 5 minutos em “Novos” fica com borda vermelha.',
  ]],
  ['Quando a IA chama você: Atendimento', [
    'Se o cliente pede para falar com uma pessoa, reclama ou pergunta algo que a IA não sabe, você recebe um aviso no WhatsApp e o item <strong>Atendimento</strong> ganha um balão.',
    'Abra a conversa, leia o histórico e responda pelo chat do painel. A IA fica em silêncio nessa conversa enquanto você atende e volta sozinha após 30 minutos sem resposta sua, ou quando você clicar em “Devolver à IA”.',
    'Perguntas que a IA não soube responder aparecem como cartão amarelo no chat e em <strong>Perguntas e respostas</strong>. Responda uma vez marcando “Ensinar à IA” e ela passa a saber.',
  ]],
  ['Entregadores', [
    'Em <strong>Entregadores</strong> (botão no quadro de pedidos), cadastre nome, WhatsApp e veículo de cada um, e envie o link de entregas pelo botão.',
    'Ao despachar um pedido de entrega, escolha quem leva. O entregador recebe endereço, telefone do cliente e forma de pagamento no WhatsApp, e confirma “Peguei” e “Entreguei” pela página dele. O cliente é avisado em cada etapa.',
  ]],
  ['Integração com PDV (opcional)', [
    'Se o restaurante usa um sistema de pedidos ou PDV, em <strong>Integrações</strong> ative o Open Delivery e copie URL, Client ID e Client Secret para o seu sistema. Os pedidos passam a entrar lá sozinhos.',
    'Para sistemas que não falam Open Delivery, use o webhook: informe a URL que vai receber os pedidos e teste com o botão “Enviar teste”.',
  ]],
  ['Fim do dia', [
    'No horário de fechamento o dono recebe o <strong>resumo do dia</strong> no WhatsApp: pedidos, faturamento, ticket médio, mais vendidos e as perguntas sem resposta. Em <strong>Resumo</strong> no painel você vê qualquer dia.',
  ]],
];
const dicas = [
  ['Descrição é o que a IA fala', 'Ela não inventa ingrediente: descreve o que está no cadastro. Capriche nas descrições e nos apelidos dos itens.'],
  ['Feriado ou fechar mais cedo', 'Em Configurações → Dias especiais, informe a data e o horário (ou “fechado”). Vale só para aquele dia.'],
  ['Marmitaria', 'Use o campo “corte” nos horários (ex.: 10:30) para parar de aceitar pedidos antes de fechar, e marque os dias de cada prato no item.'],
  ['Troque a senha', 'Peça uma senha nova pelo WhatsApp sempre que alguém sair da equipe.'],
];

export function ajudaPage() {
  const body = `<section class="container simple-page ci-ajuda"><p class="ci-ajuda-eyebrow">Guia de implantação</p><h1>Do zero ao primeiro pedido<br><span>em uma tarde.</span></h1><p class="ci-lead">Passo a passo para o restaurante que acabou de receber o acesso ao Cardápio IA. Leva mais ou menos uma hora, a maior parte cadastrando o cardápio.</p>
<nav class="ci-ajuda-nav" aria-label="Passos"><ol>${passos.map(([t], i) => `<li><a href="#passo-${i + 1}">${t}</a></li>`).join('')}</ol></nav>
<ol class="ci-ajuda-steps">${passos.map(([t, itens], i) => `<li id="passo-${i + 1}"><span class="ci-ajuda-num" aria-hidden="true">${i + 1}</span><h2>${t}</h2><ul>${itens.map(x => `<li>${x}</li>`).join('')}</ul></li>`).join('')}</ol>
<h2 class="ci-ajuda-h2">Dicas que evitam dor de cabeça</h2><dl class="ci-ajuda-dicas">${dicas.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join('')}</dl>
<div class="ci-ajuda-demo" id="demo"><h2>Quer ver antes de cadastrar?</h2><p>Entre no painel de demonstração com um restaurante fictício já montado: pedidos em andamento, cardápio com adicionais, uma conversa esperando atendimento e entregadores. Pode mexer à vontade; os dados voltam ao padrão toda madrugada.</p><p class="ci-ajuda-cred"><span>Endereço: <a href="${PAINEL}/login" target="_blank" rel="noopener noreferrer">app.otimizza.digital</a></span><span>E-mail: <code>demo@otimizza.digital</code></span><span>Senha: <code>demo</code></span></p><p class="ci-ajuda-obs">A demonstração não tem WhatsApp ligado, então as mensagens não saem para ninguém. Para testar a conversa de verdade, chame a IA no número de teste <a href="https://wa.me/${site.botWhatsapp}?text=${encodeURIComponent(site.botWhatsappText)}" target="_blank" rel="noopener noreferrer" data-track="teste">${site.botWhatsappDisplay}</a>: é um restaurante fictício, peça à vontade.</p></div>
<p class="ci-ajuda-cta"><a class="ci-button ci-button-big" href="${escape(whatsappUrl('Olá! Estou implantando o Cardápio IA e tenho uma dúvida.'))}" target="_blank" rel="noopener noreferrer">Dúvida na implantação? Chama no WhatsApp ${arrow}</a></p></section>`;
  const howTo = { '@type': 'HowTo', name: 'Como colocar o Cardápio IA no ar no seu restaurante', description: 'Passo a passo de implantação do atendente de WhatsApp com IA da Otimizza Digital.', totalTime: 'PT1H', inLanguage: 'pt-BR',
    step: passos.map(([t, itens], i) => ({ '@type': 'HowToStep', position: i + 1, name: t, url: `${site.origin}/ajuda/#passo-${i + 1}`, itemListElement: itens.map((x) => ({ '@type': 'HowToDirection', text: x.replace(/<[^>]+>/g, '') })) })) };
  return layout({ path: '/ajuda/', extra: [howTo], title: 'Guia de implantação do Cardápio IA', description: 'Passo a passo para colocar o Cardápio IA no ar no seu restaurante: configurações, cardápio, WhatsApp, pedidos, atendimento, entregadores e integração.', body });
}
