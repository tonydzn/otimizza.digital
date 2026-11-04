import { Fragment, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { BarChart3, Bell, CheckCheck, ChefHat, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { LINKS, EASE } from "@/lib/content";

/* ------------------------------------------------------------------ */
/* Conversation script (mirrors the real Cardápio IA demo)            */
/* ------------------------------------------------------------------ */
type Msg = {
  from: "user" | "ai";
  time: string;
  text: string;
  menu?: { name: string; price: string }[];
  after?: string;
};

const MESSAGES: Msg[] = [
  { from: "user", time: "19:42", text: "Oi, tem cardápio?" },
  {
    from: "ai",
    time: "19:42",
    text: "Oi! Aqui é o atendimento da **Lanchonete do Zé**. Hoje temos:",
    menu: [
      { name: "X-Salada", price: "R$ 22" },
      { name: "X-Bacon", price: "R$ 26" },
      { name: "Batata média", price: "R$ 14" },
      { name: "Refri lata", price: "R$ 6" },
    ],
    after: "O que vai querer?",
  },
  { from: "user", time: "19:43", text: "2 x-bacon e uma batata" },
  {
    from: "ai",
    time: "19:43",
    text: "Anotado: **2 X-Bacon** e **1 Batata média**. Total **R$ 66**. É para entrega ou retirada?",
  },
  { from: "user", time: "19:44", text: "Entrega. Rua das Flores, 120" },
  {
    from: "ai",
    time: "19:44",
    text: "Entrega na **Rua das Flores, 120**. Previsão de 40 min. Pagamento no Pix ou na entrega?",
  },
  { from: "user", time: "19:44", text: "Pix" },
  {
    from: "ai",
    time: "19:45",
    text: "Pedido **#128** confirmado e enviado para a cozinha. Qualquer coisa, é só chamar.",
  },
];

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-semibold">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Phone                                                               */
/* ------------------------------------------------------------------ */
function TypingBubble() {
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 12, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.12 } }}
      className="flex w-fit items-center gap-1 rounded-2xl rounded-tl-md bg-white px-3.5 py-3 shadow-[0_1px_1px_rgb(0_0_0/0.08)]"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 animate-blink rounded-full bg-ink/50"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </motion.div>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const isAi = msg.from === "ai";
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 420, damping: 30 }}
      className={`flex ${isAi ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`max-w-[84%] px-3 pb-1.5 pt-2 text-[13.5px] leading-snug text-ink shadow-[0_1px_1px_rgb(0_0_0/0.08)] ${
          isAi ? "rounded-2xl rounded-tl-md bg-white" : "rounded-2xl rounded-tr-md bg-[#d9fdd3]"
        }`}
      >
        <p>
          <Rich text={msg.text} />
        </p>
        {msg.menu && (
          <ul className="my-1.5 space-y-1 rounded-xl bg-paper-2 p-2">
            {msg.menu.map((m) => (
              <li key={m.name} className="flex items-center justify-between gap-6 text-[12.5px]">
                <span className="font-semibold">{m.name}</span>
                <span className="tabular-nums text-muted">{m.price}</span>
              </li>
            ))}
          </ul>
        )}
        {msg.after && <p>{msg.after}</p>}
        <div className="mt-0.5 flex items-center justify-end gap-1 text-[10.5px] text-subtle">
          {msg.time}
          {!isAi && <CheckCheck className="size-3.5 text-[#34a7e0]" aria-hidden="true" />}
        </div>
      </div>
    </motion.div>
  );
}

function PhoneChat({
  count,
  typing,
  cycle,
}: {
  count: number;
  typing: boolean;
  cycle: number;
}) {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-[292px] rounded-[2.9rem] bg-ink p-[9px] shadow-[0_40px_80px_-24px_rgb(10_21_17/0.55),0_0_0_1.5px_rgb(255_255_255/0.08)_inset,0_0_0_1px_rgb(10_21_17/1)] sm:w-[320px]"
    >
      {/* side buttons */}
      <span className="absolute -left-[3px] top-28 h-10 w-[3px] rounded-l bg-ink-3" />
      <span className="absolute -left-[3px] top-44 h-16 w-[3px] rounded-l bg-ink-3" />
      <span className="absolute -right-[3px] top-36 h-20 w-[3px] rounded-r bg-ink-3" />

      <div className="relative flex h-[580px] flex-col overflow-hidden rounded-[2.3rem] bg-[#efe9df] sm:h-[620px]">
        {/* dynamic island */}
        <span className="absolute left-1/2 top-2.5 z-20 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-ink" />

        {/* header */}
        <div className="relative z-10 flex items-center gap-3 bg-[#0f3d2e] px-4 pb-3 pt-11 text-white">
          <div className="relative grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sun-400 to-sun-600 font-display text-sm font-extrabold">
            LZ
            <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-[#0f3d2e] bg-brand-400" />
          </div>
          <div className="min-w-0 leading-tight">
            <p className="truncate font-display text-[15px] font-bold">Lanchonete do Zé</p>
            <p className="truncate text-[11.5px] text-brand-200">Cardápio IA · responde na hora</p>
          </div>
        </div>

        {/* messages */}
        <motion.div
          key={cycle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative flex min-h-0 flex-1 flex-col justify-end gap-2 overflow-hidden px-3 pb-3 pt-6 [background-image:radial-gradient(rgb(10_21_17/0.05)_1px,transparent_1px)] [background-size:14px_14px] mask-fade-top"
        >
          {MESSAGES.slice(0, count).map((m, i) => (
            <Bubble key={i} msg={m} />
          ))}
          <AnimatePresence>{typing && <TypingBubble key="typing" />}</AnimatePresence>
        </motion.div>

        {/* composer */}
        <div className="flex items-center gap-2 bg-[#efe9df] px-3 pb-4 pt-1">
          <div className="flex h-10 flex-1 items-center rounded-full bg-white px-4 text-[13px] text-subtle shadow-[0_1px_1px_rgb(0_0_0/0.06)]">
            Mensagem
          </div>
          <div className="grid size-10 place-items-center rounded-full bg-brand-600 text-white">
            <WhatsAppIcon className="size-[18px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Phone + floating glass cards                                        */
/* ------------------------------------------------------------------ */
function HeroDemo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });
  const [count, setCount] = useState(reduce ? MESSAGES.length : 0);
  const [typing, setTyping] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduce) {
      setCount(MESSAGES.length);
      return;
    }
    if (!inView) return;
    let cancelled = false;

    (async () => {
      let start = count >= MESSAGES.length ? 0 : count;
      if (count >= MESSAGES.length) {
        setCount(0);
        setCycle((c) => c + 1);
      }
      if (start === 0) await sleep(900);
      while (!cancelled) {
        for (let i = start; i < MESSAGES.length; i++) {
          if (cancelled) return;
          const m = MESSAGES[i];
          if (m.from === "ai") {
            setTyping(true);
            await sleep(1150);
            if (cancelled) return;
            setTyping(false);
          } else {
            await sleep(850);
          }
          if (cancelled) return;
          setCount(i + 1);
          await sleep(450);
        }
        await sleep(5200);
        if (cancelled) return;
        setCount(0);
        setCycle((c) => c + 1);
        start = 0;
        await sleep(900);
      }
    })();

    return () => {
      cancelled = true;
      setTyping(false);
    };
    // `count` is intentionally read only once per (re)start
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  const confirmed = count >= MESSAGES.length;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -50]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[420px] sm:max-w-[560px] lg:max-w-none">
      {/* glow behind phone */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-300/60 via-brand-200/40 to-sun-400/30 blur-3xl sm:size-[520px]"
      />

      <motion.div style={reduce ? undefined : { y }} className="relative mx-auto w-fit">
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: EASE }}
        >
          <PhoneChat count={count} typing={typing} cycle={cycle} />
          <p className="sr-only">
            Demonstração: o cliente pede 2 X-Bacon e 1 batata no WhatsApp, a IA anota o
            pedido, confirma endereço e pagamento e envia o pedido número 128 para a cozinha.
          </p>
        </motion.div>

        {/* floating: new order */}
        <div className="pointer-events-none absolute -right-3 top-14 z-30 sm:-right-[150px] sm:top-24 lg:-right-12 xl:-right-[150px]">
          <AnimatePresence>
            {confirmed && (
              <motion.div
                key="order"
                initial={{ opacity: 0, scale: 0.7, y: 20, rotate: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="glass w-[196px] animate-float rounded-2xl p-3.5 sm:w-[212px]">
                  <div className="flex items-center gap-2.5">
                    <span className="relative grid size-9 place-items-center rounded-xl bg-sun-500 text-white">
                      <Bell className="size-[18px]" aria-hidden="true" />
                      <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-white">
                        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-sun-500" />
                      </span>
                    </span>
                    <div className="leading-tight">
                      <p className="font-display text-sm font-bold text-ink">Novo pedido #128</p>
                      <p className="text-xs text-muted">2 X-Bacon · 1 Batata</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-2.5 py-1 text-[11px] font-semibold text-brand-800">
                      <ChefHat className="size-3.5" aria-hidden="true" /> Na cozinha
                    </span>
                    <span className="font-display text-sm font-extrabold tabular-nums text-ink">
                      R$ 66,00
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* floating: day summary */}
        <motion.div
          initial={{ opacity: 0, x: -30, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, delay: 1.4, ease: EASE }}
          className="pointer-events-none absolute bottom-14 z-30 hidden md:-left-[188px] md:block lg:hidden xl:block"
        >
          <div className="glass w-[212px] animate-float-slow rounded-2xl p-3.5 [animation-delay:-3s]">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-subtle">
                <BarChart3 className="size-3.5 text-brand-600" aria-hidden="true" /> Resumo de hoje
              </span>
              <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[10px] font-medium text-subtle">
                exemplo
              </span>
            </div>
            <p className="mt-2 font-display text-2xl font-extrabold leading-none tabular-nums text-ink">
              38 pedidos
            </p>
            <p className="mt-1 text-xs text-muted">R$ 1.812 · mais vendido: X-Bacon</p>
            <div className="mt-3 flex h-9 items-end gap-1" aria-hidden="true">
              {[28, 40, 34, 55, 48, 72, 100, 84, 46].map((h, i) => (
                <motion.span
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 1.9 + i * 0.06, duration: 0.7, ease: EASE }}
                  className={`flex-1 rounded-sm ${h > 70 ? "bg-brand-500" : "bg-brand-200"}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
const col: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
};

const TRUST = [
  "Sem app para o cliente baixar",
  "No número que você já usa",
  "R$ 149/mês, plano único",
];

export function Hero() {
  return (
    <section id="topo" className="grain relative overflow-hidden pb-20 pt-32 sm:pt-40 lg:pb-28">
      {/* ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-fade-radial absolute inset-0" />
        <div className="absolute -left-40 -top-40 size-[560px] animate-drift rounded-full bg-brand-300/35 blur-3xl" />
        <div className="absolute -right-32 top-24 size-[460px] animate-drift-2 rounded-full bg-sun-400/20 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />
      </div>

      <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <motion.div variants={col} initial="hidden" animate="show" className="text-center lg:text-left">
          <motion.div variants={rise}>
            <a
              href="#como-funciona"
              className="group glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-4 text-[0.82rem] font-semibold text-ink transition-all hover:-translate-y-0.5"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-white">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-white" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-white" />
                </span>
                Novo
              </span>
              Atendimento automático no WhatsApp para restaurantes e lanchonetes
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </motion.div>

          <motion.h1
            variants={rise}
            className="mt-7 text-[2.65rem] font-extrabold leading-[1.02] sm:text-6xl lg:text-[3.6rem] xl:text-[4rem]"
          >
            Seu WhatsApp <span className="text-gradient-brand">atende sozinho.</span>{" "}
            Até na hora do{" "}
            <span className="relative inline-block">
              rush.
              <svg
                aria-hidden="true"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1.5 left-0 h-3 w-full text-sun-500 sm:-bottom-2"
              >
                <motion.path
                  d="M2 8 C 40 2, 90 2, 120 6 S 180 10, 198 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.2, duration: 0.9, ease: EASE }}
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mx-auto mt-7 max-w-xl text-[1.08rem] leading-relaxed text-muted sm:text-xl lg:mx-0"
          >
            O Cardápio IA é um atendente com inteligência artificial que responde na hora, mostra o
            cardápio com fotos, anota o pedido, confirma endereço e pagamento e manda tudo para o
            painel da cozinha.{" "}
            <span className="font-semibold text-ink">No número da sua lanchonete, 24 horas por dia.</span>
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start"
          >
            <Button href={LINKS.start} size="lg" icon={<WhatsAppIcon />} arrow>
              Quero o Cardápio IA
            </Button>
            <Button href={LINKS.test} size="lg" variant="secondary">
              Testar a IA no WhatsApp
            </Button>
          </motion.div>

          <motion.ul
            variants={rise}
            className="mt-8 flex flex-col items-center gap-x-6 gap-y-2.5 text-sm font-medium text-muted sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
          >
            {TRUST.map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-brand-100 text-brand-700">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <HeroDemo />
      </Container>
    </section>
  );
}
