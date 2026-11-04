import { MotionConfig } from "motion/react";
import { ArrowRight, Check, CircleAlert } from "lucide-react";
import { SubHeader } from "@/components/layout/SubHeader";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { MobileCTA } from "@/components/sections/MobileCTA";
import { CookieNotice } from "@/components/ui/CookieNotice";
import { Container, Eyebrow, SectionHeader } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { MiniBubble, MiniChat } from "@/components/ui/MiniChat";
import { BRAND, LINKS, brl, waLink } from "@/lib/content";
import { SEGMENTS, type Segment } from "@/lib/segments";

function Breadcrumb({ s }: { s: Segment }) {
  return (
    <nav aria-label="Você está em" className="text-sm text-subtle">
      <ol className="flex flex-wrap items-center justify-center gap-1.5 lg:justify-start">
        <li>
          <a href="/" className="underline-offset-4 hover:text-brand-700 hover:underline">
            Início
          </a>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="font-medium text-ink">
          {s.label}
        </li>
      </ol>
    </nav>
  );
}

function SegmentHero({ s }: { s: Segment }) {
  return (
    <section id="topo" className="grain relative overflow-hidden pb-16 pt-12 sm:pt-16 lg:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-fade-radial absolute inset-0" />
        <div className="absolute -left-40 -top-40 size-[520px] rounded-full bg-brand-300/30 blur-3xl" />
        <div className="absolute -right-32 top-24 size-[420px] rounded-full bg-sun-400/20 blur-3xl" />
      </div>

      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <div className="text-center lg:text-left">
          <Breadcrumb s={s} />
          <div className="mt-6">
            <Eyebrow>{s.eyebrow}</Eyebrow>
          </div>
          <h1 className="mt-6 text-[2.35rem] font-extrabold leading-[1.05] text-ink sm:text-5xl lg:text-[3.3rem]">
            {s.h1} <span className="text-gradient-brand">{s.h1Highlight}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[1.06rem] leading-relaxed text-muted sm:text-lg lg:mx-0">
            {s.lead}
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            <Button href={waLink(s.waText)} size="lg" icon={<WhatsAppIcon />} arrow>
              Quero na minha {s.label.toLowerCase()}
            </Button>
            <Button href={LINKS.test} size="lg" variant="secondary">
              Testar a IA no WhatsApp
            </Button>
          </div>
          <ul className="mt-7 flex flex-col items-center gap-x-6 gap-y-2 text-sm font-medium text-muted sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
            {["Sem app para o cliente", "No número que você já usa", `${brl(BRAND.price)}/mês, plano único`].map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-brand-100 text-brand-700">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <img
            src={s.img}
            alt={s.imgAlt}
            width={360}
            height={360}
            fetchPriority="high"
            className="absolute -right-3 -top-12 z-10 w-28 rotate-6 rounded-3xl border border-line bg-white p-1.5 shadow-lift sm:-right-8 sm:w-36"
          />
          <div className="rounded-[2rem] border border-line bg-white p-3 shadow-lift">
            <div className="flex items-center gap-3 px-2 pb-3 pt-1">
              <span className="grid size-9 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">
                {s.label[0]}
              </span>
              <div className="text-left">
                <p className="text-sm font-semibold text-ink">{s.label} do bairro</p>
                <p className="text-xs text-subtle">Cardápio IA · responde na hora</p>
              </div>
            </div>
            <MiniChat label="conversa simulada · negócio fictício">
              {s.chat.map((b, i) => (
                <MiniBubble key={i} from={b.from}>
                  {b.text}
                </MiniBubble>
              ))}
            </MiniChat>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Pains({ s }: { s: Segment }) {
  return (
    <section aria-labelledby="dores-title" className="py-16 sm:py-24">
      <Container>
        <SectionHeader id="dores-title" eyebrow="O problema" title={s.painsTitle} />
        <Stagger className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {s.pains.map((p) => (
            <StaggerItem key={p.title} as="article">
              <div className="h-full rounded-3xl border border-line bg-white p-6 shadow-soft">
                <CircleAlert className="size-6 text-sun-600" aria-hidden="true" />
                <h3 className="mt-4 font-display text-xl font-bold text-ink">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

function Features({ s }: { s: Segment }) {
  return (
    <section id="recursos" aria-labelledby="recursos-title" className="py-16 sm:py-24">
      <Container>
        <SectionHeader
          id="recursos-title"
          eyebrow="A solução"
          title={s.featuresTitle}
          description={`Tudo o que o Cardápio IA faz pelas ${s.plural}, no WhatsApp e no painel.`}
        />
        <Stagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.features.map((f) => (
            <StaggerItem key={f.title} as="article">
              <div className="h-full rounded-3xl border border-line bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift">
                <span className="grid size-10 place-items-center rounded-2xl bg-brand-50 text-brand-700">
                  <Check className="size-5" strokeWidth={2.5} aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{f.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{f.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-10 text-center">
          <a href="/#recursos" className="inline-flex items-center gap-2 font-semibold text-brand-700 underline-offset-4 hover:underline">
            Ver todos os recursos do Cardápio IA
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}

function OtherSegments({ s }: { s: Segment }) {
  const others = SEGMENTS.filter((o) => o.slug !== s.slug);
  return (
    <section aria-labelledby="outros-title" className="pb-20 sm:pb-28">
      <Container>
        <h2 id="outros-title" className="text-center font-display text-2xl font-extrabold text-ink sm:text-3xl">
          O Cardápio IA também atende
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <a
                href={`/${o.slug}/`}
                className="group flex items-center gap-4 rounded-3xl border border-line bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft"
              >
                <img src={o.img} alt="" width={64} height={64} loading="lazy" decoding="async" className="size-14 shrink-0" />
                <span>
                  <span className="block font-display font-bold text-ink">{o.label}</span>
                  <span className="text-sm text-muted">Atendimento no WhatsApp para {o.plural}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function SegmentPage({ s }: { s: Segment }) {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#conteudo"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <SubHeader />
      <main id="conteudo">
        <SegmentHero s={s} />
        <Pains s={s} />
        <Features s={s} />
        <HowItWorks />
        <Pricing />
        <FAQ
          items={s.faq}
          title={
            <>
              {s.faqTitle.replace(/ \S+$/, "")}{" "}
              <span className="text-gradient-brand">{s.faqTitle.split(" ").pop()}</span>
            </>
          }
        />
        <OtherSegments s={s} />
        <FinalCTA defaultType={s.type} />
      </main>
      <Footer />
      <MobileCTA />
      <CookieNotice />
    </MotionConfig>
  );
}
