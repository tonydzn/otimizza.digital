/* Shared constants & helpers. Keep contact data in ONE place. */

export const BRAND = {
  name: "Otimizza Digital",
  product: "Cardápio IA",
  city: "Presidente Prudente, SP",
  phoneLabel: "(18) 98186-8701",
  price: 149,
} as const;

const WA_MAIN = "5518981868701";
export const WA_TEST = "5518981034411";

export function waLink(text: string, number: string = WA_MAIN) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export const LINKS = {
  start: waLink("Olá! Quero o Cardápio IA no meu restaurante. Pode me explicar como funciona?"),
  test: waLink("Oi! Quero ver o cardápio", WA_TEST),
  question: waLink("Olá! Tenho uma dúvida sobre o Cardápio IA."),
  demoMenu: "https://app.otimizza.digital/m/demo",
  login: "https://app.otimizza.digital/",
} as const;

export const NAV_ITEMS = [
  { id: "recursos", label: "Recursos" },
  { id: "painel", label: "Painel" },
  { id: "como-funciona", label: "Como funciona" },
  { id: "precos", label: "Preço" },
  { id: "faq", label: "Dúvidas" },
] as const;

export const brl = (value: number, fractionDigits = 0) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);

export const EASE = [0.22, 1, 0.36, 1] as const;

export const FAQ_ITEMS = [
  {
    q: "Funciona no número de WhatsApp que eu já uso?",
    a: "Sim. O atendimento é ligado ao número da sua lanchonete. Seus clientes continuam chamando no mesmo contato de sempre, sem baixar nada.",
  },
  {
    q: "E se o cliente quiser falar com uma pessoa?",
    a: "A IA percebe quando o cliente pede uma pessoa, avisa você e deixa a conversa aberta para a equipe responder. Ninguém fica preso com o robô.",
  },
  {
    q: "Como eu mudo um preço ou tiro um item do cardápio?",
    a: "No painel, pelo celular. Um toque em “esgotado” e a IA para de oferecer o item na hora. Preço, foto, tamanhos e adicionais também são editados ali.",
  },
  {
    q: "Meus clientes mandam muito áudio. Funciona?",
    a: "Funciona. A IA transcreve o áudio e anota o pedido como se fosse texto. Só pede para o cliente escrever se o áudio estiver inaudível.",
  },
  {
    q: "A IA pode responder algo errado?",
    a: "Ela responde a partir do cardápio e das regras que você informa. O que não sabe, encaminha para você em vez de inventar. O resumo diário lista essas perguntas para ajustarmos.",
  },
  {
    q: "Preciso de computador ou de um sistema de pedidos?",
    a: "Não. O painel abre no celular ou em um tablet na cozinha e mostra os pedidos em tempo real. Se você já usa PDV, enviamos os pedidos para ele pelo padrão Open Delivery (Abrasel) ou por webhook.",
  },
  {
    q: "Como fica a entrega?",
    a: "Você cadastra seus entregadores no painel. Ao despachar o pedido, o entregador recebe endereço, telefone do cliente e forma de pagamento no WhatsApp, e confirma pelo celular quando pega e quando entrega. O cliente é avisado em cada etapa.",
  },
  {
    q: "Funciona com iFood ou outros aplicativos de entrega?",
    a: "O Cardápio IA cuida dos pedidos que chegam pelo WhatsApp da sua lanchonete. Pedidos de iFood e similares continuam no sistema deles. Se o seu PDV recebe tudo, podemos enviar os pedidos do WhatsApp para ele.",
  },
  {
    q: "Tem fidelidade ou taxa de instalação?",
    a: "Essas condições são combinadas na conversa de contratação pelo WhatsApp. O valor do plano é R$ 149 por mês.",
  },
  {
    q: "Atende fora de Presidente Prudente?",
    a: "Sim. O Cardápio IA funciona em qualquer cidade do Brasil, porque tudo acontece no WhatsApp e no painel online. A implantação é feita à distância.",
  },
  {
    q: "O Cardápio IA é um chatbot ou robô de WhatsApp?",
    a: "É um atendente com inteligência artificial, mas não é aquele robô de menu com “digite 1”. O cliente escreve ou manda áudio do jeito dele e a IA entende, mostra o cardápio digital com fotos e anota o pedido. Quando precisa, passa a conversa para uma pessoa da equipe.",
  },
] as const;
