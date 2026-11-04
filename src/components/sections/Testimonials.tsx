import { Quote } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { spotlightMove } from "@/lib/spotlight";
import { cn } from "@/utils/cn";

/**
 * ⚠️ Relatos ILUSTRATIVOS, baseados em situações comuns de balcão.
 * Substitua por depoimentos reais (com autorização) assim que houver clientes
 * dispostos a assinar. O aviso na página deve sair junto.
 */
const FEATURED = {
  quote:
    "Antes eu largava a chapa para responder cliente. Agora o pedido chega no painel já anotado, com observação e tudo. A equipe só prepara.",
  name: "Ricardo M.",
  role: "Dono de lanchonete de bairro",
  tag: "Painel da cozinha",
  initials: "RM",
};

const OTHERS = [
  {
    quote:
      "Cliente mandando áudio de um minuto no meio do rush era o pior. Agora a IA transcreve e anota. Eu só confiro no painel.",
    name: "Camila S.",
    role: "Dona de pizzaria",
    tag: "Pedidos por áudio",
    initials: "CS",
    tone: "from-sun-400 to-sun-600",
  },
  {
    quote:
      "O resumo do dia virou meu fechamento: sei o que vendeu e quais perguntas ficaram sem resposta. Dá uma tranquilidade enorme.",
    name: "Marcos T.",
    role: "Dono de marmitaria",
    tag: "Resumo diário",
    initials: "MT",
    tone: "from-brand-400 to-brand-700",
  },
];

function Tag({ children, dark }: { children: string; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        dark
          ? "bg-white/10 text-brand-200 ring-1 ring-white/15"
          : "bg-brand-50 text-brand-800 ring-1 ring-brand-200/70",
      )}
    >
      {children}
    </span>
  );
}

function Illustrative({ dark }: { dark?: boolean }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-wider",
        dark ? "bg-white/10 text-white/70" : "bg-ink/5 text-subtle",
      )}
    >
      Relato ilustrativo
    </span>
  );
}

export function Testimonials() {
  return (
    <section id="relatos" aria-labelledby="relatos-title" className="relative py-20 sm:py-28">
      <Container>
        <SectionHeader
          id="relatos-title"
          eyebrow="Na prática"
          title={
            <>
              Quem vive o balcão <span className="text-gradient-brand">entende a diferença.</span>
            </>
          }
          description="Situações que todo dono de lanchonete conhece, e como o atendimento muda quando a IA assume o WhatsApp."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-5 lg:gap-6" stagger={0.12}>
          {/* featured */}
          <StaggerItem as="article" className="lg:col-span-3">
            <figure
              onMouseMove={spotlightMove}
              className="on-dark grain-dark relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-900 via-ink-2 to-ink p-7 text-white shadow-lift sm:p-10"
            >
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 size-72 animate-drift rounded-full bg-brand-500/30 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-24 -left-16 size-64 animate-drift-2 rounded-full bg-sun-500/15 blur-3xl"
              />
              <div className="relative flex items-center justify-between gap-3">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-500/20 text-brand-300 ring-1 ring-brand-400/30">
                  <Quote className="size-6" aria-hidden="true" />
                </span>
                <Illustrative dark />
              </div>
              <blockquote className="relative mt-8 font-display text-[1.45rem] font-bold leading-snug tracking-tight sm:text-[1.9rem] sm:leading-[1.25]">
                “{FEATURED.quote}”
              </blockquote>
              <figcaption className="relative mt-10 flex flex-wrap items-center gap-4">
                <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-brand-300 to-brand-600 font-display text-sm font-extrabold text-ink">
                  {FEATURED.initials}
                </span>
                <span className="leading-tight">
                  <span className="block font-display font-bold">{FEATURED.name}</span>
                  <span className="text-sm text-white/65">{FEATURED.role}</span>
                </span>
                <span className="ml-auto">
                  <Tag dark>{FEATURED.tag}</Tag>
                </span>
              </figcaption>
            </figure>
          </StaggerItem>

          {/* others */}
          <div className="grid grid-cols-1 gap-5 lg:col-span-2 lg:gap-6">
            {OTHERS.map((t) => (
              <StaggerItem key={t.name} as="article">
                <figure
                  onMouseMove={spotlightMove}
                  className="spotlight group flex h-full flex-col justify-between rounded-[2rem] border border-line bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift sm:p-7"
                >
                  <div className="flex items-center justify-between gap-3">
                    <Tag>{t.tag}</Tag>
                    <Illustrative />
                  </div>
                  <blockquote className="mt-5 text-[1.02rem] leading-relaxed text-ink">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span
                      className={cn(
                        "grid size-11 place-items-center rounded-full bg-gradient-to-br font-display text-sm font-extrabold text-white",
                        t.tone,
                      )}
                    >
                      {t.initials}
                    </span>
                    <span className="leading-tight">
                      <span className="block font-display font-bold text-ink">{t.name}</span>
                      <span className="text-sm text-muted">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </div>
        </Stagger>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-subtle">
          Relatos ilustrativos, baseados em situações comuns de balcão. Nomes fictícios. Os
          resultados variam conforme a operação de cada restaurante.
        </p>
      </Container>
    </section>
  );
}
