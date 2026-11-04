import { ArrowDown, ChefHat, Mic, ReceiptText, type LucideIcon } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { spotlightMove } from "@/lib/spotlight";
import { cn } from "@/utils/cn";

/**
 * Situações do dia a dia (antes / com o Cardápio IA). Não são depoimentos: sem nomes, sem aspas.
 * Quando houver depoimentos reais (com autorização do cliente), dá para voltar ao formato de citação.
 */
type Scene = { tag: string; who: string; before: string; after: string; icon: LucideIcon };

const FEATURED: Scene = {
  tag: "Painel da cozinha",
  who: "Lanchonete de bairro",
  before: "O dono larga a chapa para responder cliente e anota o pedido no papel, na pressa.",
  after: "O pedido chega no painel já anotado, com observação e tudo. A equipe só prepara.",
  icon: ChefHat,
};

const OTHERS: (Scene & { tone: string })[] = [
  {
    tag: "Pedidos por áudio",
    who: "Pizzaria",
    before: "Áudio de um minuto no meio do rush, e ninguém tem tempo de ouvir.",
    after: "A IA transcreve o áudio e anota o pedido. O dono só confere no painel.",
    icon: Mic,
    tone: "from-sun-400 to-sun-600",
  },
  {
    tag: "Resumo diário",
    who: "Marmitaria",
    before: "O caixa fecha sem saber o que mais vendeu nem quem ficou sem resposta.",
    after: "O resumo do dia chega no WhatsApp: vendas, mais vendidos e perguntas pendentes.",
    icon: ReceiptText,
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

function BeforeAfterText({ s, dark, big }: { s: Scene; dark?: boolean; big?: boolean }) {
  return (
    <div className="relative">
      <p className={cn("text-xs font-semibold uppercase tracking-wider", dark ? "text-white/50" : "text-subtle")}>
        Antes
      </p>
      <p className={cn("mt-1.5 leading-relaxed", dark ? "text-white/70" : "text-muted", big ? "text-lg" : "text-[0.98rem]")}>
        {s.before}
      </p>
      <ArrowDown
        className={cn("my-4 size-5", dark ? "text-brand-300" : "text-brand-600")}
        aria-hidden="true"
      />
      <p className={cn("text-xs font-semibold uppercase tracking-wider", dark ? "text-brand-300" : "text-brand-700")}>
        Com o Cardápio IA
      </p>
      <p
        className={cn(
          "mt-1.5 font-display font-bold",
          dark ? "text-white" : "text-ink",
          big ? "text-[1.45rem] leading-snug tracking-tight sm:text-[1.8rem] sm:leading-[1.25]" : "text-[1.08rem] leading-snug",
        )}
      >
        {s.after}
      </p>
    </div>
  );
}

export function Testimonials() {
  const F = FEATURED.icon;
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
            <div
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
                  <F className="size-6" aria-hidden="true" />
                </span>
                <Tag dark>{FEATURED.tag}</Tag>
              </div>
              <div className="relative mt-8">
                <BeforeAfterText s={FEATURED} dark big />
              </div>
              <p className="relative mt-10 text-sm font-semibold text-white/65">{FEATURED.who}</p>
            </div>
          </StaggerItem>

          {/* others */}
          <div className="grid grid-cols-1 gap-5 lg:col-span-2 lg:gap-6">
            {OTHERS.map((t) => {
              const I = t.icon;
              return (
                <StaggerItem key={t.tag} as="article">
                  <div
                    onMouseMove={spotlightMove}
                    className="spotlight group flex h-full flex-col justify-between rounded-[2rem] border border-line bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift sm:p-7"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <Tag>{t.tag}</Tag>
                      <span
                        className={cn(
                          "grid size-10 place-items-center rounded-full bg-gradient-to-br text-white",
                          t.tone,
                        )}
                      >
                        <I className="size-5" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="mt-5">
                      <BeforeAfterText s={t} />
                    </div>
                    <p className="mt-6 text-sm font-semibold text-muted">{t.who}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </div>
        </Stagger>
      </Container>
    </section>
  );
}
