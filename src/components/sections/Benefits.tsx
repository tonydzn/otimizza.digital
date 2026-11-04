import { BarChart3, CheckCheck, ChefHat, Clock, RefreshCw, Smartphone, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { Container, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { spotlightMove } from "@/lib/spotlight";
import { EASE } from "@/lib/content";
import { cn } from "@/utils/cn";

const BENEFITS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Clock,
    title: "Nenhum cliente esperando",
    text: "A IA responde na hora, no pico ou de madrugada. O cliente não troca de lanchonete por falta de resposta.",
  },
  {
    icon: ChefHat,
    title: "Equipe focada na chapa",
    text: "Ninguém para de preparar para atender o WhatsApp. O pedido já chega anotado na cozinha.",
  },
  {
    icon: CheckCheck,
    title: "Pedido anotado do jeito certo",
    text: "Item, observação, endereço e pagamento confirmados na conversa. Menos erro, menos retrabalho.",
  },
  {
    icon: RefreshCw,
    title: "Cardápio sempre atualizado",
    text: "Acabou o item? Um toque em “esgotado” e a IA para de oferecer na hora.",
  },
  {
    icon: BarChart3,
    title: "O dia fechado na sua mão",
    text: "Resumo diário com pedidos, itens mais vendidos e as perguntas que ficaram sem resposta.",
  },
  {
    icon: Smartphone,
    title: "Nada para instalar",
    text: "Sem app para o cliente, sem treinar equipe e sem trocar de número. Você segue como hoje.",
  },
];

const HOURS = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const VALUES = [3, 6, 13, 9, 4, 3, 5, 10, 22, 34, 27, 12, 4];
const MAX = Math.max(...VALUES);
const RUSH = new Set([19, 20, 21]);

function HoursChart() {
  return (
    <figure className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-20 size-64 rounded-full bg-sun-400/20 blur-3xl"
      />
      <figcaption className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">
          Simulação · um dia de lanchonete
        </p>
        <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight text-ink">
          Mensagens que chegam por hora
        </h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
          O pico das mensagens é justamente quando o balcão está mais cheio. É quando você menos
          consegue responder, e quando a IA mais trabalha.
        </p>
      </figcaption>

      <ul
        aria-label="Mensagens por hora, simulação de um dia de lanchonete"
        className="relative mt-8 flex h-56 items-end gap-1.5 sm:gap-2"
      >
        {HOURS.map((h, i) => {
          const v = VALUES[i];
          const rush = RUSH.has(h);
          return (
            <li
              key={h}
              tabIndex={0}
              aria-label={`${h} horas: ${v} mensagens${rush ? ", hora do rush" : ""}`}
              className="group relative flex h-full flex-1 flex-col justify-end rounded-md outline-offset-4"
            >
              <span
                className={cn(
                  "pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1 whitespace-nowrap rounded-lg bg-ink px-2 py-1 text-[11px] font-bold text-white opacity-0 shadow-lg transition-all duration-200 group-hover:-translate-y-2 group-hover:opacity-100 group-focus-visible:-translate-y-2 group-focus-visible:opacity-100",
                )}
                style={{ bottom: `calc(${(v / MAX) * 100}% + 6px)` }}
                aria-hidden="true"
              >
                {v} msgs
              </span>
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.05, ease: EASE }}
                style={{ height: `${(v / MAX) * 100}%`, transformOrigin: "bottom" }}
                className={cn(
                  "w-full rounded-t-lg transition-all duration-300 group-hover:brightness-110",
                  rush
                    ? "bg-gradient-to-t from-brand-600 to-brand-400 shadow-[0_8px_24px_-6px_rgb(23_183_94/0.6)]"
                    : "bg-gradient-to-t from-brand-200 to-brand-100 group-hover:from-brand-300",
                )}
              />
            </li>
          );
        })}
      </ul>

      <div className="relative mt-2 flex gap-1.5 sm:gap-2" aria-hidden="true">
        {HOURS.map((h, i) => (
          <span
            key={h}
            className={cn(
              "min-w-0 flex-1 text-center text-[10px] font-semibold tabular-nums sm:text-xs",
              i % 2 === 1 && "max-sm:invisible",
              RUSH.has(h) ? "text-brand-700" : "text-subtle",
            )}
          >
            {h}h
          </span>
        ))}
      </div>

      <div className="relative mt-5 flex items-center justify-center gap-2 rounded-2xl bg-brand-50/90 px-4 py-2.5 text-sm font-semibold text-brand-800 ring-1 ring-brand-200/70">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-brand-500" />
          <span className="relative inline-flex size-2 rounded-full bg-brand-600" />
        </span>
        Hora do rush: das 19h às 21h
      </div>

      <p className="relative mt-4 text-center text-xs text-subtle">
        Simulação de um dia de lanchonete. Não são dados de clientes.
      </p>
    </figure>
  );
}

export function Benefits() {
  return (
    <section id="beneficios" aria-labelledby="beneficios-title" className="relative py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <SectionHeader
              id="beneficios-title"
              align="left"
              eyebrow="Benefícios"
              title={
                <>
                  Menos correria no balcão.{" "}
                  <span className="text-gradient-brand">Mais pedido certo.</span>
                </>
              }
              description="Quem atende o WhatsApp no meio do rush perde tempo, pedido e paciência. O Cardápio IA tira essa fila da sua cabeça."
            />

            <Stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.08}>
              {BENEFITS.map((b) => (
                <StaggerItem key={b.title}>
                  <div
                    onMouseMove={spotlightMove}
                    className="spotlight group h-full rounded-3xl border border-line bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
                  >
                    <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-b from-brand-50 to-brand-100 text-brand-700 ring-1 ring-brand-200/70 transition-all duration-500 group-hover:rotate-[-6deg] group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white">
                      <b.icon className="size-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold leading-snug text-ink">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{b.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            <HoursChart />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
