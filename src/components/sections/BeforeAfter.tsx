import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/utils/cn";
import { EASE } from "@/lib/content";
import { rush } from "@/assets/images";

type Mode = "sem" | "com";

const TIMELINE: Record<Mode, { time: string; title: string; text: string }[]> = {
  sem: [
    { time: "19:42", title: "“Tem cardápio?” fica no vácuo", text: "A mensagem chega, mas você está na chapa e só vê depois." },
    { time: "19:51", title: "Tudo apita ao mesmo tempo", text: "Telefone, WhatsApp e fila no balcão. Alguém precisa parar o que está fazendo." },
    { time: "20:03", title: "O cliente cansa de esperar", text: "Quem espera demais pede em outro lugar. Pedido perdido, sem você saber." },
    { time: "20:30", title: "“Era sem cebola…”", text: "Anotado no papel, na pressa. A observação se perde no caminho até a chapa." },
    { time: "23:40", title: "Fecha o caixa no escuro", text: "Quantas mensagens ficaram sem resposta? Ninguém sabe dizer." },
  ],
  com: [
    { time: "19:42", title: "A IA responde na hora", text: "Cardápio atualizado, com fotos e preços, sem ninguém parar de trabalhar." },
    { time: "19:44", title: "Pedido anotado do jeito certo", text: "Itens, observações, endereço, previsão e forma de pagamento na mesma conversa." },
    { time: "19:45", title: "Cai no painel da cozinha", text: "Com alarme sonoro e observações em destaque. A equipe só prepara." },
    { time: "20:30", title: "O cliente acompanha tudo", text: "Aviso a cada etapa: em preparo, saiu para entrega, entregue." },
    { time: "23:40", title: "Resumo do dia no seu celular", text: "Pedidos, itens mais vendidos e as perguntas que a IA deixou para você." },
  ],
};

const TABS: { id: Mode; label: string }[] = [
  { id: "sem", label: "Sem Cardápio IA" },
  { id: "com", label: "Com Cardápio IA" },
];

export function BeforeAfter() {
  const [mode, setMode] = useState<Mode>("sem");
  const refs = useRef<Record<Mode, HTMLButtonElement | null>>({ sem: null, com: null });
  const isWith = mode === "com";

  const onKey = (e: KeyboardEvent) => {
    if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
      e.preventDefault();
      const next: Mode = e.key === "ArrowLeft" || e.key === "Home" ? "sem" : "com";
      setMode(next);
      refs.current[next]?.focus();
    }
  };

  return (
    <section id="antes-depois" aria-labelledby="antes-depois-title" className="relative py-20 sm:py-28">
      <Container>
        <SectionHeader
          id="antes-depois-title"
          eyebrow="Antes e depois"
          title={
            <>
              O mesmo balcão.{" "}
              <span className="text-gradient-brand">Duas noites diferentes.</span>
            </>
          }
          description="Quem está atendendo o balcão e o telefone não consegue responder o WhatsApp ao mesmo tempo. O cliente que espera demais pede em outro lugar."
        />

        {/* segmented control */}
        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Comparar a noite sem e com o Cardápio IA"
            onKeyDown={onKey}
            className="glass relative inline-flex rounded-full p-1.5"
          >
            {TABS.map((t) => {
              const selected = mode === t.id;
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    refs.current[t.id] = el;
                  }}
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls="panel-antes-depois"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setMode(t.id)}
                  className={cn(
                    "relative z-10 rounded-full px-4 py-2.5 text-[0.9rem] font-semibold transition-colors sm:px-7 sm:text-base",
                    selected ? "text-white" : "text-muted hover:text-ink",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="ba-pill"
                      className={cn(
                        "absolute inset-0 -z-10 rounded-full",
                        t.id === "com"
                          ? "bg-gradient-to-b from-brand-600 to-brand-700 shadow-[0_8px_20px_-8px_rgb(11_134_67/0.8)]"
                          : "bg-ink shadow-[0_8px_20px_-8px_rgb(10_21_17/0.7)]",
                      )}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {t.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          id="panel-antes-depois"
          role="tabpanel"
          aria-labelledby={`tab-${mode}`}
          className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:mt-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8"
        >
          {/* illustration */}
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-[2rem] border border-line bg-white p-3 shadow-soft sm:p-4">
              <div className="relative h-full min-h-[280px] overflow-hidden rounded-[1.5rem] bg-white">
                <img
                  src={rush}
                  alt="Lanchonete lotada à noite: chapeiro na chapa, atendente entregando uma sacola no balcão, fila de clientes no celular e mochila de entrega sobre o balcão."
                  width={1200}
                  height={755}
                  loading="lazy"
                  decoding="async"
                  className={cn(
                    "h-full w-full object-cover transition-all duration-1000 ease-out",
                    isWith ? "scale-100 saturate-100" : "scale-[1.04] grayscale saturate-0 contrast-[0.95]",
                  )}
                />
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-0 transition-opacity duration-1000",
                    isWith ? "opacity-0" : "opacity-100",
                    "bg-gradient-to-t from-ink/30 via-transparent to-transparent",
                  )}
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 14, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="glass absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl p-3.5 sm:inset-x-4 sm:bottom-4 sm:p-4"
                  >
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-xl text-white",
                        isWith ? "bg-brand-600" : "bg-red-600",
                      )}
                    >
                      {isWith ? <Check className="size-5" strokeWidth={3} /> : <X className="size-5" strokeWidth={3} />}
                    </span>
                    <p className="text-sm font-semibold leading-snug text-ink sm:text-[0.95rem]">
                      {isWith
                        ? "Pedido anotado, cozinha avisada e noite sob controle."
                        : "Cliente perdido, equipe sobrecarregada e noite sem controle."}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>

          {/* timeline */}
          <Reveal delay={0.1}>
            <div className="glass h-full rounded-[2rem] p-5 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.ol
                  key={mode}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
                  className="relative space-y-1"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute bottom-6 left-[19px] top-6 w-px",
                      isWith ? "bg-brand-300" : "bg-red-200",
                    )}
                  />
                  {TIMELINE[mode].map((step) => (
                    <motion.li
                      key={step.time + step.title}
                      variants={{
                        hidden: { opacity: 0, x: isWith ? 18 : -18 },
                        show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
                      }}
                      className="relative flex gap-4 rounded-2xl p-2.5 transition-colors hover:bg-white/60"
                    >
                      <span
                        className={cn(
                          "relative z-10 grid size-[38px] shrink-0 place-items-center rounded-full ring-4 ring-paper",
                          isWith ? "bg-brand-100 text-brand-700" : "bg-red-50 text-red-600",
                        )}
                      >
                        {isWith ? <Check className="size-4" strokeWidth={3} /> : <X className="size-4" strokeWidth={3} />}
                      </span>
                      <div className="pb-1">
                        <p className="flex flex-wrap items-baseline gap-x-2.5">
                          <time className="font-display text-sm font-bold tabular-nums text-subtle">
                            {step.time}
                          </time>
                          <span className="font-display text-[1.02rem] font-bold text-ink sm:text-lg">
                            {step.title}
                          </span>
                        </p>
                        <p className="mt-1 text-[0.93rem] leading-relaxed text-muted">{step.text}</p>
                      </div>
                    </motion.li>
                  ))}
                </motion.ol>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>

      </Container>
    </section>
  );
}
