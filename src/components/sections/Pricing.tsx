import { useEffect, useRef, useState, type CSSProperties } from "react";
import { animate } from "motion/react";
import { Calculator, Check, Info, Sparkles } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Counter } from "@/components/ui/Counter";
import { BRAND, LINKS, brl } from "@/lib/content";

const INCLUDED = [
  "Cardápio com fotos respondido no WhatsApp, 24 horas, em texto ou áudio",
  "Anotação do pedido com itens, observações e total",
  "Confirmação de endereço, previsão e forma de pagamento",
  "Painel com pedidos em tempo real, alarme de pedido novo, modo cozinha e comanda",
  "Cadastro de cardápio, horários, bairros e entregadores pelo painel",
  "Chat para assumir a conversa e aviso no seu WhatsApp quando o cliente pede uma pessoa",
  "Resumo diário de pedidos e perguntas sem resposta",
  "Integração com PDV por Open Delivery ou webhook",
  "Cardápio online por link para Instagram e Google",
];

/** Tweens a currency value whenever it changes. */
function AnimatedBRL({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const controls = animate(prev.current, value, {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = brl(Math.round(v));
      },
      onComplete: () => {
        prev.current = value;
      },
    });
    return () => {
      prev.current = value;
      controls.stop();
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {brl(value)}
    </span>
  );
}

function Slider({
  id,
  label,
  hint,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  id: string;
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <label htmlFor={id} className="text-[0.95rem] font-semibold leading-snug text-ink">
          {label}
          <span className="block text-[0.82rem] font-normal text-subtle">{hint}</span>
        </label>
        <output
          htmlFor={id}
          className="shrink-0 rounded-xl bg-brand-50 px-3 py-1.5 font-display text-lg font-extrabold tabular-nums text-brand-800 ring-1 ring-brand-200/70"
        >
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range mt-4"
        style={{ "--fill": `${pct}%` } as CSSProperties}
      />
    </div>
  );
}

function Calculator_() {
  const [missed, setMissed] = useState(10);
  const [ticket, setTicket] = useState(35);

  const monthly = Math.round(missed * 4.33 * ticket);
  const ordersToPay = Math.ceil(BRAND.price / ticket);

  return (
    <div className="glass relative h-full overflow-hidden rounded-[2rem] p-6 sm:p-8">
      <div
        aria-hidden="true"
        className="absolute -left-16 -top-16 size-56 rounded-full bg-brand-300/30 blur-3xl"
      />
      <div className="relative">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-subtle">
          <Calculator className="size-4 text-brand-600" aria-hidden="true" /> Faça a conta
        </span>
        <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight text-ink sm:text-[1.7rem]">
          Quanto uma mensagem sem resposta custa?
        </h3>

        <div className="mt-8 space-y-8">
          <Slider
            id="missed"
            label="Mensagens sem resposta por semana"
            hint="Clientes que chamaram e ficaram esperando"
            value={missed}
            min={0}
            max={60}
            step={1}
            format={(v) => `${v}`}
            onChange={setMissed}
          />
          <Slider
            id="ticket"
            label="Ticket médio do pedido"
            hint="Quanto um pedido costuma render"
            value={ticket}
            min={10}
            max={120}
            step={1}
            format={(v) => brl(v)}
            onChange={setTicket}
          />
        </div>

        <div
          aria-live="polite"
          className="mt-8 overflow-hidden rounded-3xl bg-ink p-6 text-white shadow-[0_24px_48px_-20px_rgb(10_21_17/0.6)]"
        >
          <p className="text-sm text-white/65">Receita que pode estar escapando por mês</p>
          <p className="mt-1 font-display text-[2.6rem] font-extrabold leading-none tracking-tight tabular-nums text-brand-300 sm:text-5xl">
            <AnimatedBRL value={monthly} />
          </p>
          <div className="mt-5 flex items-start gap-3 rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10">
            <Sparkles className="mt-0.5 size-5 shrink-0 text-sun-400" aria-hidden="true" />
            <p className="text-[0.95rem] leading-snug text-white/90">
              Com ticket de <strong className="text-white">{brl(ticket)}</strong>, só{" "}
              <strong className="text-white">
                {ordersToPay} {ordersToPay === 1 ? "pedido" : "pedidos"} por mês
              </strong>{" "}
              já pagam os {brl(BRAND.price)} do plano.
            </p>
          </div>
        </div>

        <p className="mt-4 flex gap-2 text-xs leading-relaxed text-subtle">
          <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          Estimativa simples, feita com os números que você informou (4,33 semanas por mês). Não é
          promessa de resultado.
        </p>
      </div>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="precos" aria-labelledby="precos-title" className="relative py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_center,rgb(23_183_94/0.10),transparent_65%)]"
      />
      <Container>
        <SectionHeader
          id="precos-title"
          eyebrow="Preço"
          title={
            <>
              Um plano. <span className="text-gradient-brand">Tudo incluído.</span>
            </>
          }
          description="Plano único: um número de WhatsApp e um cardápio. Pagamento mensal, sem instalação no balcão."
        />

        <div className="mt-14 grid grid-cols-1 items-stretch gap-6 sm:mt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* plan */}
          <Reveal>
            <div className="border-beam relative h-full shadow-lift [--beam-bg:#ffffff]">
              <div className="p-7 sm:p-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                    <Sparkles className="size-3.5" aria-hidden="true" /> Plano único
                  </span>
                  <span className="text-sm font-medium text-subtle">Cardápio IA</span>
                </div>

                <p className="mt-6 flex items-end gap-2 font-display text-ink">
                  <span className="text-2xl font-bold text-muted sm:text-3xl">R$</span>
                  <span className="relative inline-block text-7xl font-extrabold leading-[0.85] tracking-tighter tabular-nums sm:text-8xl">
                    {/* invisible real value reserves width (and is what screen readers read) */}
                    <span className="invisible">{BRAND.price}</span>
                    <span aria-hidden="true" className="absolute inset-0 text-left">
                      <Counter to={BRAND.price} duration={1.4} />
                    </span>
                  </span>
                  <span className="pb-1 text-lg font-semibold text-muted">/mês</span>
                </p>
                <p className="mt-3 text-[0.95rem] text-muted">por número de WhatsApp · pagamento mensal</p>

                <div className="my-8 h-px bg-gradient-to-r from-brand-200 via-line to-transparent" />

                <p className="font-display text-sm font-bold uppercase tracking-wider text-ink">
                  O que está incluído
                </p>
                <Stagger as="ul" className="mt-5 grid gap-3.5" stagger={0.06}>
                  {INCLUDED.map((item) => (
                    <StaggerItem key={item} as="li" className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-700">
                        <Check className="size-3" strokeWidth={3.5} aria-hidden="true" />
                      </span>
                      <span className="text-[0.97rem] leading-snug text-ink/90">{item}</span>
                    </StaggerItem>
                  ))}
                </Stagger>

                <Button
                  href={LINKS.start}
                  size="lg"
                  icon={<WhatsAppIcon />}
                  arrow
                  className="mt-9 w-full"
                >
                  Quero o Cardápio IA
                </Button>
                <p className="mt-4 text-center text-[0.82rem] leading-relaxed text-subtle">
                  O botão abre uma conversa no WhatsApp com a Otimizza Digital. Fidelidade e taxa de
                  instalação são combinadas por lá.
                </p>
              </div>
            </div>
          </Reveal>

          {/* calculator + test */}
          <div className="flex flex-col gap-6">
            <Reveal delay={0.1} className="flex-1">
              <Calculator_ />
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-[2rem] border border-brand-200/70 bg-brand-50/70 p-6 sm:p-7">
                <p className="font-display text-lg font-bold text-ink">Quer ver antes de decidir?</p>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">
                  Chame no número de teste, peça um lanche e veja a IA responder. É um restaurante
                  fictício: nada é cobrado nem entregue.
                </p>
                <Button href={LINKS.test} variant="secondary" className="mt-4" arrow>
                  Testar a IA no WhatsApp
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-subtle">
          O pagamento do seu cliente continua como hoje: Pix, cartão na entrega ou dinheiro. O
          Cardápio IA informa e confirma, mas não processa o pagamento.
        </p>
      </Container>
    </section>
  );
}
