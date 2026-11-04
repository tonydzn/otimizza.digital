import { motion } from "motion/react";
import { Bot, Camera, Zap, type LucideIcon } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { EASE, LINKS } from "@/lib/content";

const STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Camera,
    title: "Você manda o cardápio",
    text: "Foto, PDF, planilha ou print. A gente organiza itens, preços, tamanhos e observações.",
  },
  {
    icon: Bot,
    title: "A IA aprende o seu jeito",
    text: "Horário de funcionamento, área de entrega, formas de pagamento, tempo médio e as perguntas que mais chegam.",
  },
  {
    icon: Zap,
    title: "Liga no seu WhatsApp",
    text: "O atendimento começa no número do restaurante. Dali em diante, preço, item esgotado, horário e fotos você mesmo ajusta no painel, em um toque.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="como-funciona-title"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-paper-2/70 to-transparent"
      />
      <Container>
        <SectionHeader
          id="como-funciona-title"
          eyebrow="Como funciona"
          title={
            <>
              Três passos <span className="text-gradient-brand">e está atendendo.</span>
            </>
          }
          description="Sem instalar nada no balcão. Sem treinar equipe. Você continua recebendo os pedidos como hoje, só que anotados."
        />

        <div className="relative mt-16">
          {/* connector line (desktop) */}
          <div
            aria-hidden="true"
            className="absolute left-[16.6%] right-[16.6%] top-[66px] z-0 hidden h-[2px] rounded-full bg-line md:block"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
              className="h-full origin-left bg-gradient-to-r from-brand-500 via-brand-400 to-sun-500"
            />
          </div>

          <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6" stagger={0.15}>
            {STEPS.map((s, i) => (
              <StaggerItem key={s.title} as="article">
                <div className="group relative h-full rounded-[2rem] border border-line bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-lift sm:p-8 md:border-transparent md:bg-transparent md:hover:bg-white">
                  <div className="flex items-center justify-between md:block">
                    <span className="relative z-10 grid size-[68px] place-items-center rounded-full border border-brand-200 bg-gradient-to-b from-white to-brand-50 text-brand-700 shadow-[0_8px_24px_-10px_rgb(11_134_67/0.5)] ring-8 ring-paper transition-all duration-500 group-hover:scale-105 group-hover:bg-brand-600 group-hover:from-brand-600 group-hover:to-brand-700 group-hover:text-white md:mx-auto">
                      <s.icon className="size-7" aria-hidden="true" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-display text-6xl font-extrabold leading-none text-ink/[0.07] md:absolute md:right-6 md:top-5 md:text-7xl"
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-extrabold text-ink md:text-center sm:text-2xl">
                    <span className="sr-only">Passo {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[1rem] leading-relaxed text-muted md:text-center">
                    {s.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1} className="mt-12 flex flex-col items-center gap-3">
          <Button href={LINKS.start} size="lg" icon={<WhatsAppIcon />} arrow>
            Quero começar
          </Button>
          <p className="text-sm text-subtle">A contratação é combinada por WhatsApp, sem formulário longo.</p>
        </Reveal>
      </Container>
    </section>
  );
}
