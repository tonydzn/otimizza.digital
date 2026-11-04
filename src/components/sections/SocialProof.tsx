import type { ReactNode } from "react";
import {
  Beef,
  ChefHat,
  Croissant,
  Fish,
  IceCreamBowl,
  MapPin,
  Pizza,
  Sandwich,
  Soup,
  Store,
  UtensilsCrossed,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { lanche, pizza, marmita, acai } from "@/assets/images";

const SEGMENTS: { label: string; icon: LucideIcon }[] = [
  { label: "Lanchonetes", icon: Sandwich },
  { label: "Hamburguerias", icon: Beef },
  { label: "Pizzarias", icon: Pizza },
  { label: "Marmitarias", icon: Soup },
  { label: "Açaiterias", icon: IceCreamBowl },
  { label: "Pastelarias", icon: UtensilsCrossed },
  { label: "Sushi", icon: Fish },
  { label: "Padarias com delivery", icon: Croissant },
  { label: "Restaurantes à la carte", icon: Store },
  { label: "Dark kitchens", icon: ChefHat },
];

const STATS = [
  { node: <Counter to={24} suffix="h" />, label: "de atendimento no seu WhatsApp, inclusive no rush" },
  { node: <Counter to={0} />, label: "apps para o seu cliente instalar" },
  { node: <Counter to={3} />, label: "passos do cardápio ao primeiro pedido" },
  { node: <Counter to={149} prefix="R$ " />, label: "por mês, plano único por número de WhatsApp" },
];

const INTEGRATIONS: { label: string; icon: ReactNode }[] = [
  { label: "WhatsApp", icon: <WhatsAppIcon className="size-4 text-brand-600" /> },
  { label: "Open Delivery (Abrasel)", icon: <Store className="size-4 text-brand-600" /> },
  { label: "Webhook e PDV", icon: <Webhook className="size-4 text-brand-600" /> },
  { label: "Presidente Prudente e todo o Brasil", icon: <MapPin className="size-4 text-brand-600" /> },
];

const CARDS = [
  { href: "/hamburgueria/", title: "Lanchonetes", text: "Lanches, porções e combos com observação por item.", img: lanche, alt: "Foto de um X-bacon com cheddar e batata frita numa tábua de madeira." },
  { href: "/pizzaria/", title: "Pizzarias", text: "Sabores, tamanhos, meio a meio e borda recheada.", img: pizza, alt: "Foto de uma pizza com tomate, azeitona e manjericão na caixa de entrega." },
  { href: "/marmitaria/", title: "Marmitarias", text: "Cardápio do dia, tamanhos e horário de corte dos pedidos.", img: marmita, alt: "Foto de uma marmita para entrega com arroz, frango grelhado, brócolis e tomate." },
  { href: "/acaiteria/", title: "Açaiterias", text: "Tamanhos, acompanhamentos e adicionais sem confusão.", img: acai, alt: "Foto de um copo de açaí com morango, banana e mirtilo." },
];

function Chip({ label, Icon }: { label: string; Icon: LucideIcon }) {
  return (
    <li className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-white/80 px-4 py-2.5 text-[0.95rem] font-semibold text-ink shadow-[0_1px_2px_rgb(10_21_17/0.04)]">
      <Icon className="size-[18px] text-brand-600" aria-hidden="true" />
      {label}
    </li>
  );
}

export function SocialProof() {
  return (
    <section id="para-quem" aria-labelledby="para-quem-title" className="relative py-16 sm:py-24">
      <Container>
        <Reveal>
          <h2
            id="para-quem-title"
            className="text-center text-sm font-semibold uppercase tracking-[0.14em] text-subtle"
          >
            Feito para quem vende pelo WhatsApp todo dia
          </h2>
        </Reveal>
      </Container>

      {/* segments marquee */}
      <Reveal delay={0.1} blur={false}>
        <div className="marquee mask-fade-x mt-8 overflow-hidden py-1">
          <div className="marquee-track flex w-max animate-marquee gap-3 pr-3">
            <ul className="flex gap-3" aria-label="Tipos de negócio atendidos">
              {SEGMENTS.map((s) => (
                <Chip key={s.label} label={s.label} Icon={s.icon} />
              ))}
            </ul>
            <ul className="flex gap-3" aria-hidden="true">
              {SEGMENTS.map((s) => (
                <Chip key={s.label} label={s.label} Icon={s.icon} />
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <Container className="mt-14 sm:mt-20">
        {/* stats */}
        <Stagger className="glass grid grid-cols-2 overflow-hidden rounded-[2rem] lg:grid-cols-4">
          {STATS.map((s, i) => (
            <StaggerItem
              key={i}
              className={`relative px-5 py-8 sm:px-8 sm:py-10 ${
                i % 2 === 1 ? "border-l border-ink/[0.07]" : ""
              } ${i > 0 ? "lg:border-l lg:border-ink/[0.07]" : ""} ${
                i > 1 ? "border-t border-ink/[0.07] lg:border-t-0" : ""
              }`}
            >
              <p className="font-display text-[2.6rem] font-extrabold leading-none tracking-tight text-ink tabular-nums sm:text-6xl">
                <span className="text-gradient-brand">{s.node}</span>
              </p>
              <p className="mt-3 max-w-[16rem] text-sm leading-snug text-muted sm:text-[0.95rem]">
                {s.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        {/* integrations */}
        <Reveal delay={0.1}>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
            <li className="w-full text-center text-sm font-medium text-subtle sm:w-auto">
              Funciona com o que você já usa:
            </li>
            {INTEGRATIONS.map((i) => (
              <li
                key={i.label}
                className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-2 text-sm font-semibold text-brand-800 ring-1 ring-brand-200/70"
              >
                {i.icon}
                {i.label}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* illustrated segments */}
        <Stagger className="mt-14 grid grid-cols-2 gap-4 sm:mt-20 lg:grid-cols-4 lg:gap-5">
          {CARDS.map((c) => (
            <StaggerItem key={c.title} as="article">
              <a
                href={c.href}
                className="group block h-full overflow-hidden rounded-3xl border border-line bg-white p-3 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift sm:p-4"
              >
                <div className="overflow-hidden rounded-2xl bg-white">
                  <img
                    src={c.img}
                    alt={c.alt}
                    width={360}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-rotate-1"
                  />
                </div>
                <h3 className="mt-4 px-1 font-display text-lg font-bold text-ink sm:text-xl">
                  {c.title}
                </h3>
                <p className="mt-1.5 px-1 pb-1 text-[0.92rem] leading-snug text-muted">{c.text}</p>
                <span className="mt-2 inline-flex items-center gap-1 px-1 pb-1 text-sm font-semibold text-brand-700">
                  Ver como funciona <span aria-hidden="true">→</span>
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
