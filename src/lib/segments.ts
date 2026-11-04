/* Páginas por segmento (/pizzaria/, /hamburgueria/, /marmitaria/, /acaiteria/).
   Cada página tem busca-alvo, exemplos e perguntas próprios. Só descreva recursos que o produto tem
   (ver /ajuda/ e o painel): tamanhos e adicionais com preço, apelidos, fotos, esgotado,
   horários e dias especiais, horário de corte, dias de cada prato, bairros com taxa, Pix, áudio,
   painel com alarme e comanda, entregadores, resumo do dia, Open Delivery/webhook. */
import { lanche, pizza, marmita, acai } from "@/assets/images";
import { FAQ_ITEMS } from "@/lib/content";

export type Bubble = { from: "user" | "ai"; text: string };
export type Card = { title: string; text: string };

export type Segment = {
  slug: string;
  /** valor do campo "Tipo de negócio" no formulário */
  type: string;
  /** "pizzarias", usado em listas e links */
  plural: string;
  /** nome curto no singular, usado em links ("Pizzaria") */
  label: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  eyebrow: string;
  h1: string;
  h1Highlight: string;
  lead: string;
  waText: string;
  img: string;
  imgAlt: string;
  chat: Bubble[];
  painsTitle: string;
  pains: Card[];
  featuresTitle: string;
  features: Card[];
  faqTitle: string;
  faq: { q: string; a: string }[];
};

const general = [FAQ_ITEMS[0], FAQ_ITEMS[1], FAQ_ITEMS[9]].map((f) => ({ q: f.q, a: f.a }));

export const SEGMENTS: Segment[] = [
  {
    slug: "pizzaria",
    type: "Pizzaria",
    plural: "pizzarias",
    label: "Pizzaria",
    metaTitle: "Atendimento automático no WhatsApp para pizzaria | Cardápio IA",
    metaDescription:
      "Robô de WhatsApp com IA para pizzaria: anota sabores, meio a meio, tamanho e borda, confirma endereço e pagamento e manda o pedido para a cozinha. R$ 149/mês.",
    ogTitle: "Sua pizzaria atendendo todo mundo no WhatsApp, até na sexta à noite.",
    eyebrow: "Cardápio IA para pizzarias",
    h1: "Atendimento automático no WhatsApp para",
    h1Highlight: "pizzaria",
    lead:
      "Sexta à noite o WhatsApp não para, e cada pedido tem sabor, tamanho, meio a meio e borda. O Cardápio IA responde todo mundo na hora, anota tudo certinho e manda o pedido para a cozinha, no número que a sua pizzaria já usa.",
    waText: "Olá! Tenho uma pizzaria e quero o Cardápio IA. Pode me explicar como funciona?",
    img: pizza,
    imgAlt: "Foto de uma pizza com tomate, azeitona e manjericão na caixa de entrega.",
    chat: [
      { from: "user", text: "Boa noite! Quero uma pizza grande meio calabresa meio portuguesa" },
      { from: "ai", text: "Boa noite! Anotado: 1 pizza grande, meio calabresa e meio portuguesa. Quer borda recheada?" },
      { from: "user", text: "Quero de catupiry. E uma coca 2 litros" },
      { from: "ai", text: "Fechado: pizza grande meio a meio com borda de catupiry e Coca-Cola 2 L. É para entrega ou retirada?" },
    ],
    painsTitle: "O que trava uma pizzaria no WhatsApp",
    pains: [
      { title: "Fila de mensagens no rush", text: "Entre 19h e 22h chegam dezenas de conversas ao mesmo tempo. Quem espera muito desiste e pede no aplicativo." },
      { title: "Erro de sabor, tamanho e borda", text: "Meio a meio anotado às pressas vira pizza errada, reclamação e prejuízo na volta do motoboy." },
      { title: "Atendente preso no celular", text: "Quem deveria ajudar no forno passa a noite digitando cardápio, preço e chave Pix." },
    ],
    featuresTitle: "Feito para o pedido de pizza",
    features: [
      { title: "Meio a meio e sabores", text: "O cliente escreve do jeito dele e a IA anota os sabores de cada metade, conferindo com o seu cardápio." },
      { title: "Tamanhos e bordas com preço", text: "Broto, média, grande e família, cada um com seu preço. Borda recheada e adicionais somam no total." },
      { title: "Bebidas e combos", text: "A IA oferece bebida e acompanhamento no momento certo, sem empurrar e sem esquecer." },
      { title: "Taxa por bairro", text: "Você cadastra os bairros atendidos com a taxa de cada um. Fora da área, a IA oferece retirada." },
      { title: "Pix, cartão ou dinheiro", text: "A IA confirma a forma de pagamento e envia a sua chave Pix quando o pedido é confirmado." },
      { title: "Direto para o forno", text: "O pedido chega no painel com alarme e comanda para imprimir. O cliente recebe o status a cada etapa." },
    ],
    faqTitle: "Dúvidas de quem tem pizzaria",
    faq: [
      { q: "O Cardápio IA entende pizza meio a meio?", a: "Sim. O cliente pode pedir “meio calabresa, meio portuguesa” do jeito que costuma escrever, e a IA anota os dois sabores conferindo com o seu cardápio antes de fechar o pedido." },
      { q: "Consigo cadastrar tamanhos e bordas com preços diferentes?", a: "Sim. Cada pizza pode ter tamanhos com preço próprio, e as bordas e outros adicionais entram com o valor que você definir. O total sai do seu cadastro, nunca é inventado pela IA." },
      { q: "E se acabar um sabor no meio da noite?", a: "Um toque em “esgotado” no painel e a IA para de oferecer aquele sabor na hora. Quando voltar, você reativa com outro toque." },
      { q: "Aguenta o movimento de sexta e sábado?", a: "Aguenta. A IA responde várias conversas ao mesmo tempo, então ninguém fica esperando enquanto a equipe cuida do forno e das entregas." },
      { q: "Como o pedido chega na cozinha?", a: "No painel, que abre no celular ou num tablet na cozinha: pedido novo toca um alarme e já tem comanda para imprimir. Se você usa PDV, também dá para enviar o pedido para ele." },
      ...general,
    ],
  },
  {
    slug: "hamburgueria",
    type: "Hamburgueria",
    plural: "hamburguerias",
    label: "Hamburgueria",
    metaTitle: "Atendimento automático no WhatsApp para hamburgueria e lanchonete | Cardápio IA",
    metaDescription:
      "Robô de WhatsApp com IA para hamburgueria e lanchonete: entende “xbacon”, anota adicionais e observações como “sem cebola” e manda o pedido para a chapa. R$ 149/mês.",
    ogTitle: "Sua hamburgueria atendendo no WhatsApp enquanto a chapa trabalha.",
    eyebrow: "Cardápio IA para hamburguerias e lanchonetes",
    h1: "Atendimento automático no WhatsApp para",
    h1Highlight: "hamburgueria",
    lead:
      "X-bacon sem cebola, cheddar extra, batata grande e a bebida. O Cardápio IA anota cada detalhe, mostra a foto do lanche, confirma endereço e pagamento e manda tudo para a chapa, no número da sua hamburgueria ou lanchonete.",
    waText: "Olá! Tenho uma hamburgueria e quero o Cardápio IA. Pode me explicar como funciona?",
    img: lanche,
    imgAlt: "Foto de um X-bacon com cheddar e batata frita numa tábua de madeira.",
    chat: [
      { from: "user", text: "Quero 2 xbacon, um sem cebola" },
      { from: "ai", text: "Anotado: 2 X-Bacon, um deles sem cebola. Quer batata ou bebida para acompanhar?" },
      { from: "user", text: "Uma batata grande e bacon extra no outro" },
      { from: "ai", text: "Pronto: 2 X-Bacon (um sem cebola, um com bacon extra) e batata grande. Entrega ou retirada?" },
    ],
    painsTitle: "O que atrapalha a hamburgueria no WhatsApp",
    pains: [
      { title: "Observação que se perde", text: "“Sem cebola”, “ponto da carne”, “maionese à parte”. Anotado no papel às pressas, chega errado na chapa." },
      { title: "Adicional que não é cobrado", text: "Bacon extra e cheddar esquecidos no total viram prejuízo silencioso todo dia." },
      { title: "Resposta demorada à noite", text: "Com a chapa cheia, ninguém consegue responder rápido, e o cliente fecha a conversa." },
    ],
    featuresTitle: "Feito para o pedido de lanche",
    features: [
      { title: "Observação por item", text: "“Sem cebola” fica no lanche certo, não no pedido inteiro. A cozinha vê exatamente o que montar." },
      { title: "Adicionais com preço", text: "Bacon, cheddar, ovo, carne extra: cada adicional tem o seu valor e entra no total automaticamente." },
      { title: "Entende o jeito do cliente", text: "Você cadastra os apelidos (“xbacon”, “x bacon”, “xbac”) e a IA reconhece todos." },
      { title: "Foto do lanche na conversa", text: "Quando o cliente pede, a IA manda a foto do lanche ou do cardápio completo." },
      { title: "Combos e acompanhamentos", text: "Batata, bebida e sobremesa oferecidas no momento certo, sem empurrar." },
      { title: "Da chapa à entrega", text: "Painel com alarme, comanda para imprimir e entregador avisado no WhatsApp com endereço e pagamento." },
    ],
    faqTitle: "Dúvidas de quem tem hamburgueria",
    faq: [
      { q: "A IA entende “xbacon”, “x bacon” e outros apelidos?", a: "Sim. Para cada lanche você cadastra os apelidos que os clientes costumam escrever, e a IA reconhece todos como o mesmo item." },
      { q: "Observações como “sem cebola” chegam na cozinha?", a: "Chegam, e no lanche certo. A observação fica ligada ao item, então num pedido com dois X-Bacon a cozinha sabe qual é o sem cebola." },
      { q: "Consigo vender adicionais pagos?", a: "Sim. Cada lanche pode ter adicionais com preço, como bacon, cheddar ou carne extra. Eles somam no total sem você precisar calcular." },
      { q: "Serve para lanchonete e dark kitchen também?", a: "Serve. Lanchonetes, hamburguerias e operações só de delivery usam do mesmo jeito: o atendimento acontece no WhatsApp e os pedidos chegam no painel." },
      { q: "Posso mandar a foto dos lanches?", a: "Pode. Você coloca uma foto por item no painel e, quando o cliente pede, ela vai junto na conversa. Também dá para subir uma foto do cardápio completo." },
      ...general,
    ],
  },
  {
    slug: "marmitaria",
    type: "Marmitaria",
    plural: "marmitarias",
    label: "Marmitaria",
    metaTitle: "Atendimento automático no WhatsApp para marmitaria | Cardápio IA",
    metaDescription:
      "Robô de WhatsApp com IA para marmitaria: informa o cardápio do dia, anota tamanho e prato, respeita o horário de corte e organiza as entregas do almoço. R$ 149/mês.",
    ogTitle: "Sua marmitaria fechando os pedidos do almoço sem ficar presa no celular.",
    eyebrow: "Cardápio IA para marmitarias",
    h1: "Atendimento automático no WhatsApp para",
    h1Highlight: "marmitaria",
    lead:
      "Das 10h ao meio-dia todo mundo pergunta “qual a marmita de hoje?”. O Cardápio IA responde com o cardápio do dia, anota tamanho e prato, respeita o seu horário de corte e organiza as entregas, enquanto a cozinha monta as marmitas.",
    waText: "Olá! Tenho uma marmitaria e quero o Cardápio IA. Pode me explicar como funciona?",
    img: marmita,
    imgAlt: "Foto de uma marmita para entrega com arroz, frango grelhado, brócolis e tomate.",
    chat: [
      { from: "user", text: "Bom dia! Qual a marmita de hoje?" },
      { from: "ai", text: "Bom dia! Hoje tem bife acebolado e frango grelhado, com arroz, feijão e salada. Prefere a P ou a G?" },
      { from: "user", text: "Uma G de bife pra entregar no centro" },
      { from: "ai", text: "Anotado: 1 marmita G de bife acebolado, entrega no Centro. Vai pagar no Pix ou em dinheiro?" },
    ],
    painsTitle: "O que pesa na marmitaria todo dia",
    pains: [
      { title: "A mesma pergunta cem vezes", text: "“Qual o prato de hoje?” chega de todo mundo, na mesma hora em que a cozinha mais precisa de gente." },
      { title: "Pedido depois da hora", text: "Pedido que chega tarde demais atrasa a rota inteira ou vira cliente decepcionado." },
      { title: "Rota de entrega bagunçada", text: "Endereços espalhados em conversas diferentes, anotados no papel, na correria do almoço." },
    ],
    featuresTitle: "Feito para o pedido de marmita",
    features: [
      { title: "Cardápio de cada dia", text: "Você marca em quais dias cada prato sai, e a IA oferece só o cardápio do dia." },
      { title: "Horário de corte", text: "Defina até que horas aceita pedidos para o almoço. Depois disso a IA avisa o cliente, sem você precisar responder." },
      { title: "Tamanhos e adicionais", text: "Marmita P, M e G com preço de cada uma, mais bebida, sobremesa e adicionais." },
      { title: "Bairros e taxas", text: "A IA confere se o bairro é atendido, soma a taxa e confirma o endereço completo." },
      { title: "Entregadores no WhatsApp", text: "Cada entregador recebe endereço, telefone e forma de pagamento, e confirma quando pega e quando entrega." },
      { title: "Resumo no fim do dia", text: "Pedidos, faturamento, ticket médio e pratos mais vendidos chegam no seu WhatsApp." },
    ],
    faqTitle: "Dúvidas de quem tem marmitaria",
    faq: [
      { q: "Consigo ter um cardápio diferente em cada dia da semana?", a: "Sim. Em cada prato você marca os dias em que ele é servido, e a IA oferece apenas o que sai naquele dia." },
      { q: "Dá para parar de aceitar pedidos antes de fechar?", a: "Dá. No horário de funcionamento você define um horário de corte, por exemplo 10h30. Depois dele a IA para de aceitar pedidos para aquele turno e avisa o cliente." },
      { q: "E em feriado ou dia que vou fechar mais cedo?", a: "Em Configurações, em Dias especiais, você informa a data e o horário daquele dia, ou marca como fechado. Vale só para aquela data." },
      { q: "Funciona com marmita de tamanhos diferentes?", a: "Funciona. Cada prato pode ter tamanhos com preço próprio, como P, M e G, além de adicionais." },
      { q: "Muita gente pede ao mesmo tempo perto do almoço. A IA dá conta?", a: "Dá. Ela responde várias conversas ao mesmo tempo, e os pedidos entram no painel em ordem, com alarme, para a cozinha não perder nenhum." },
      ...general,
    ],
  },
  {
    slug: "acaiteria",
    type: "Açaiteria",
    plural: "açaiterias",
    label: "Açaiteria",
    metaTitle: "Atendimento automático no WhatsApp para açaiteria | Cardápio IA",
    metaDescription:
      "Robô de WhatsApp com IA para açaiteria: anota tamanho, acompanhamentos e adicionais, avisa quando um item acabou e manda o pedido para o balcão. R$ 149/mês.",
    ogTitle: "Sua açaiteria montando cada copo certo, direto do WhatsApp.",
    eyebrow: "Cardápio IA para açaiterias",
    h1: "Atendimento automático no WhatsApp para",
    h1Highlight: "açaiteria",
    lead:
      "Tamanho, cinco acompanhamentos, dois adicionais e uma calda. O Cardápio IA anota cada copo do jeito que o cliente pediu, soma os adicionais, avisa quando um item acabou e manda tudo para o balcão, no número da sua açaiteria.",
    waText: "Olá! Tenho uma açaiteria e quero o Cardápio IA. Pode me explicar como funciona?",
    img: acai,
    imgAlt: "Foto de um copo de açaí com morango, banana e mirtilo.",
    chat: [
      { from: "user", text: "Quero um açaí de 500 com banana, granola e leite ninho" },
      { from: "ai", text: "Anotado: açaí 500 ml com banana, granola e leite Ninho. Quer mais algum adicional?" },
      { from: "user", text: "Põe morango também" },
      { from: "ai", text: "O morango acabou por hoje. Posso trocar por kiwi ou manga?" },
    ],
    painsTitle: "O que complica a açaiteria no WhatsApp",
    pains: [
      { title: "Copo montado errado", text: "Muitos acompanhamentos por pedido. Um item esquecido já vira reclamação." },
      { title: "Adicional sem cobrança", text: "Leite Ninho, Nutella e frutas extras que não entram no total pesam no fim do mês." },
      { title: "Pico no fim da tarde", text: "Calor, fim de semana e noite cheia: o WhatsApp lota justo quando o balcão está apertado." },
    ],
    featuresTitle: "Feito para o pedido de açaí",
    features: [
      { title: "Tamanhos com preço", text: "300, 500 e 700 ml, ou os tamanhos que você vende, cada um com o seu valor." },
      { title: "Acompanhamentos e adicionais", text: "Defina o que é incluído e o que é cobrado à parte. A IA soma no total sem errar a conta." },
      { title: "Acabou? A IA já sabe", text: "Marque um item como esgotado e a IA para de oferecer na hora, sugerindo outra opção." },
      { title: "Fotos que dão vontade", text: "Quando o cliente pede, a foto do copo ou do cardápio vai junto na conversa." },
      { title: "Horários e dias especiais", text: "Horário estendido no verão ou fechado num feriado: a IA segue o que você cadastrar." },
      { title: "Pedido no balcão e na rua", text: "Painel com alarme e comanda, e entregador avisado no WhatsApp com endereço e pagamento." },
    ],
    faqTitle: "Dúvidas de quem tem açaiteria",
    faq: [
      { q: "Consigo cadastrar vários tamanhos de açaí?", a: "Sim. Cada produto pode ter tamanhos com preço próprio, como 300, 500 e 700 ml." },
      { q: "Dá para separar acompanhamento incluso de adicional pago?", a: "Dá. Os adicionais são cadastrados com preço e entram no total do pedido. O que é incluso fica na descrição do produto, que é o que a IA usa para explicar ao cliente." },
      { q: "E quando acaba uma fruta ou um adicional?", a: "Um toque em “esgotado” no painel e a IA para de oferecer aquele item na hora, até você reativar." },
      { q: "A açaiteria abre em horários diferentes no fim de semana. Funciona?", a: "Funciona. Você define o horário de cada dia da semana, inclusive com dois turnos, e cadastra datas especiais como feriados." },
      { q: "O cliente consegue ver foto do açaí?", a: "Consegue. Você coloca uma foto por produto no painel e, quando o cliente pede, ela vai junto na conversa." },
      ...general,
    ],
  },
];

export const segmentBySlug = (slug: string) => SEGMENTS.find((s) => s.slug === slug);
