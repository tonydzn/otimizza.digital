import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight, Check, ChefHat, ClipboardList, MessagesSquare, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { LINKS, EASE } from "@/lib/content";
import { cn } from "@/utils/cn";
import {
  pedidosDesktop as pedidos,
  cozinhaDesktop as cozinha,
  atendimentoDesktop as atendimento,
  cardapioDesktop as cardapio,
  pedidosMobile,
  cardapioPublicoMobile as cardapioMobile,
  entregadorMobile,
} from "@/assets/images";

type Screen = {
  id: string;
  label: string;
  icon: LucideIcon;
  title: string;
  text: string;
  bullets: string[];
  img: string;
  ratio: number; // visible width / height
  alt: string;
};

const SCREENS: Screen[] = [
  {
    id: "pedidos",
    label: "Pedidos",
    icon: ClipboardList,
    title: "O pedido chega pronto para a cozinha",
    text: "Cada pedido confirmado no WhatsApp aparece aqui com alarme sonoro: itens, observações em destaque, endereço, pagamento e troco. Um toque passa de “novo” para “em preparo”, “saiu” e “entregue”, e o cliente recebe aviso a cada etapa.",
    bullets: [
      "Alarme que só para quando alguém dá ciência",
      "Arraste o cartão entre colunas no computador",
      "Comanda para imprimir em um clique",
    ],
    img: pedidos,
    ratio: 1400 / 818,
    alt: "Quadro de pedidos do painel com as colunas Novos, Em preparo, Prontos e na rua e Finalizados.",
  },
  {
    id: "cozinha",
    label: "Modo cozinha",
    icon: ChefHat,
    title: "Modo cozinha para o tablet da chapa",
    text: "Tela cheia, letras grandes, só o que importa: o que entrou, o que está no fogo e as observações do cliente em vermelho. Um botão para aceitar, outro para avisar que ficou pronto.",
    bullets: [
      "Pedido parado fica vermelho e pisca",
      "Mantém o tablet aceso",
      "Atualiza sozinho a cada 5 segundos",
    ],
    img: cozinha,
    ratio: 1400 / 474,
    alt: "Modo cozinha em tela cheia, com pedidos novos e em preparo em letras grandes.",
  },
  {
    id: "atendimento",
    label: "Atendimento",
    icon: MessagesSquare,
    title: "Quando a IA chama você, está tudo à mão",
    text: "O cliente pediu uma pessoa ou perguntou algo que a IA não sabe? Você recebe um aviso, abre a conversa com o histórico completo e responde pelo painel como o restaurante. Ao lado, pedidos anteriores, endereço e notas internas.",
    bullets: [
      "A IA pausa sozinha enquanto você responde",
      "Perguntas sem resposta viram conhecimento da IA em um clique",
      "Ficha do cliente com gasto, ticket médio e favoritos",
    ],
    img: atendimento,
    ratio: 1400 / 1000,
    alt: "Caixa de entrada de atendimento: lista de conversas, chat com o cliente e ficha do cliente ao lado.",
  },
  {
    id: "cardapio",
    label: "Cardápio",
    icon: UtensilsCrossed,
    title: "Cardápio com fotos, que a IA envia na conversa",
    text: "Itens, tamanhos, adicionais e fotos. Marcou “esgotado”, a IA para de oferecer na hora. Quando o cliente pede um item, a foto vai junto com nome e preço.",
    bullets: [
      "Edição em janela, sem sair da página",
      "Apelidos: “xbacon”, “x bacon” e “bacon” acham o item",
      "Cardápio do dia por dia da semana",
    ],
    img: cardapio,
    ratio: 1400 / 894,
    alt: "Cadastro do cardápio em cartões com foto, preço e interruptor de disponível.",
  },
];

const PHONES = [
  {
    title: "Cardápio online por link",
    text: "O mesmo cadastro vira uma página para o Instagram, o Google e o balcão, com botão que abre o WhatsApp já com o pedido.",
    img: cardapioMobile,
    alt: "Cardápio público do restaurante no celular, com fotos e botão Pedir pelo WhatsApp.",
    link: { href: LINKS.demoMenu, label: "Ver exemplo" },
    offset: "lg:mt-0",
  },
  {
    title: "Tudo cabe no celular",
    text: "Dono que vive no balcão acompanha pedidos, atendimento e cardápio pelo celular, sem computador.",
    img: pedidosMobile,
    alt: "Quadro de pedidos no celular.",
    offset: "lg:mt-12",
  },
  {
    title: "Página do entregador",
    text: "Ao despachar, o entregador recebe endereço, telefone e pagamento no WhatsApp e confirma “peguei” e “entreguei” pelo celular. O cliente é avisado em cada etapa.",
    img: entregadorMobile,
    alt: "Página do entregador no celular com endereço, botão de mapa e botão Entreguei.",
    offset: "lg:mt-0",
  },
];

/* Browser window with subtle 3D tilt that follows the pointer */
function BrowserStage({ screen }: { screen: Screen }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-4, 4]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [3, -3]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative grid min-h-[240px] w-full place-items-center [perspective:1400px] sm:min-h-[400px] lg:min-h-[600px]"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-0 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/25 blur-[90px]"
      />
      <AnimatePresence mode="wait" initial={false}>
        <motion.figure
          key={screen.id}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.98, transition: { duration: 0.2 } }}
          transition={{ duration: 0.55, ease: EASE }}
          className="relative z-10 w-full"
        >
          <motion.div
            style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_50px_100px_-30px_rgb(0_0_0/0.8),0_0_0_1px_rgb(255_255_255/0.05)]"
          >
            <div className="flex items-center gap-3 border-b border-ink/10 bg-[#f4f4f1] px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                <span className="size-2.5 rounded-full bg-[#febc2e]" />
                <span className="size-2.5 rounded-full bg-[#28c840]" />
              </span>
              <span className="mx-auto flex h-6 w-full max-w-[260px] items-center justify-center rounded-md bg-white text-[11px] font-medium text-subtle ring-1 ring-ink/5">
                app.otimizza.digital
              </span>
              <span className="w-10" aria-hidden="true" />
            </div>
            <div style={{ aspectRatio: screen.ratio }} className="w-full overflow-hidden bg-white">
              <img
                src={screen.img}
                alt={screen.alt}
                width={1400}
                height={Math.round(1400 / screen.ratio)}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </motion.div>
        </motion.figure>
      </AnimatePresence>
    </div>
  );
}

export function Showcase() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const screen = SCREENS[active];

  const onKey = (e: KeyboardEvent) => {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    let next = active;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (active + 1) % SCREENS.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (active - 1 + SCREENS.length) % SCREENS.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = SCREENS.length - 1;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section
      id="painel"
      aria-labelledby="painel-title"
      className="on-dark grain-dark relative mx-2 overflow-hidden rounded-[2rem] bg-ink py-20 text-white sm:mx-4 sm:rounded-[3rem] sm:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid-dark mask-fade-radial absolute inset-0 opacity-80" />
        <div className="absolute left-1/2 top-[-260px] size-[760px] -translate-x-1/2 animate-drift rounded-full bg-brand-500/25 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 size-[520px] animate-drift-2 rounded-full bg-sun-500/10 blur-[120px]" />
      </div>

      <Container className="relative">
        <SectionHeader
          dark
          id="painel-title"
          eyebrow="O painel"
          title={
            <>
              A conversa é no WhatsApp.{" "}
              <span className="text-gradient-light">A operação é aqui.</span>
            </>
          }
          description="O painel abre no celular, no tablet da cozinha ou no computador. Nada para instalar. Estas são telas reais do sistema, com um restaurante de demonstração."
        />

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-8 lg:mt-16 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
          {/* tabs */}
          <Reveal className="lg:col-start-1 lg:row-start-1">
            <div
              role="tablist"
              aria-label="Telas do painel"
              aria-orientation="horizontal"
              onKeyDown={onKey}
              className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 lg:flex-col lg:flex-nowrap"
            >
              {SCREENS.map((s, i) => {
                const selected = i === active;
                return (
                  <button
                    key={s.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    id={`painel-tab-${s.id}`}
                    aria-selected={selected}
                    aria-controls="painel-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={cn(
                      "group relative flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-left font-display text-[0.98rem] font-bold transition-colors duration-300 lg:px-5 lg:py-4",
                      selected ? "text-white" : "text-white/60 hover:text-white",
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="painel-tab-bg"
                        className="glass-dark absolute inset-0 -z-0 rounded-2xl ring-1 ring-brand-400/40"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span
                      className={cn(
                        "relative grid size-9 place-items-center rounded-xl transition-colors",
                        selected ? "bg-brand-500 text-ink" : "bg-white/10 text-white/70 group-hover:bg-white/15",
                      )}
                    >
                      <s.icon className="size-[18px]" aria-hidden="true" />
                    </span>
                    <span className="relative">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* stage */}
          <Reveal delay={0.1} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <BrowserStage screen={screen} />
          </Reveal>

          {/* description */}
          <div
            id="painel-panel"
            role="tabpanel"
            aria-labelledby={`painel-tab-${screen.id}`}
            className="lg:col-start-1 lg:row-start-2"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={screen.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <h3 className="font-display text-2xl font-extrabold leading-tight text-white sm:text-[1.75rem]">
                  {screen.title}
                </h3>
                <p className="mt-3 text-[1rem] leading-relaxed text-white/70">{screen.text}</p>
                <ul className="mt-5 space-y-3">
                  {screen.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[0.97rem] text-white/90">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-500/20 text-brand-300 ring-1 ring-brand-400/40">
                        <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* mobile screens */}
        <Stagger className="mt-20 grid grid-cols-1 gap-5 sm:mt-28 md:grid-cols-3 lg:gap-8" stagger={0.12}>
          {PHONES.map((p) => (
            <StaggerItem key={p.title} as="article" className={p.offset}>
              <div className="glass-dark group h-full overflow-hidden rounded-[2rem] p-5 transition-all duration-500 hover:-translate-y-2 hover:border-brand-400/40 sm:p-6">
                <div className="relative mx-auto h-[300px] w-[190px] overflow-hidden rounded-[1.75rem] border-[5px] border-ink-3 bg-white shadow-[0_24px_50px_-20px_rgb(0_0_0/0.8)] transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:h-[340px] sm:w-[210px]">
                  <img
                    src={p.img}
                    alt={p.alt}
                    width={520}
                    height={1014}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent"
                  />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-white">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-white/65">{p.text}</p>
                {p.link && (
                  <a
                    href={p.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 underline-offset-4 transition-colors hover:text-brand-200 hover:underline"
                  >
                    {p.link.label}
                    <ArrowUpRight
                      className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
