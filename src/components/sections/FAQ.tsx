import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { EASE, FAQ_ITEMS, LINKS } from "@/lib/content";
import { cn } from "@/utils/cn";

function Item({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  const uid = useId();
  const btnId = `faq-btn-${uid}`;
  const panelId = `faq-panel-${uid}`;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl border bg-white transition-all duration-500",
        open
          ? "border-brand-200 shadow-lift"
          : "border-line shadow-soft hover:border-brand-200/70",
      )}
    >
      <h3>
        <button
          id={btnId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7 sm:py-6"
        >
          <span
            className={cn(
              "font-display text-[1.02rem] font-bold leading-snug transition-colors sm:text-[1.12rem]",
              open ? "text-brand-800" : "text-ink group-hover:text-brand-800",
            )}
          >
            {q}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-full transition-all duration-500",
              open
                ? "rotate-[135deg] bg-brand-600 text-white"
                : "bg-paper-2 text-ink group-hover:bg-brand-100 group-hover:text-brand-800",
            )}
          >
            <Plus className="size-[18px]" strokeWidth={2.5} />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-6 pr-14 text-[1rem] leading-relaxed text-muted sm:px-7 sm:pr-20">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type FaqItem = { q: string; a: string };

export function FAQ({
  items = FAQ_ITEMS,
  title,
}: { items?: readonly FaqItem[]; title?: ReactNode } = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative py-20 sm:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              id="faq-title"
              align="left"
              eyebrow="Dúvidas"
              title={
                title ?? (
                  <>
                    Perguntas de quem{" "}
                    <span className="text-gradient-brand">está no balcão.</span>
                  </>
                )
              }
              description="Não achou a sua? Chama no WhatsApp e pergunta direto."
            />
            <Reveal delay={0.2} className="mt-8">
              <Button href={LINKS.question} variant="dark" size="lg" icon={<WhatsAppIcon />} arrow>
                Tirar uma dúvida
              </Button>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 gap-3" stagger={0.06}>
            {items.map((f, i) => (
              <StaggerItem key={f.q}>
                <Item
                  q={f.q}
                  a={f.a}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
