import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Headset, Mic, ShieldCheck, type LucideIcon } from "lucide-react";
import { EASE } from "@/lib/content";
import { Container, SectionHeader } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { MiniBubble, MiniChat } from "@/components/ui/MiniChat";
import { spotlightMove } from "@/lib/spotlight";
import { cn } from "@/utils/cn";
import { menu, motoboy, dona } from "@/assets/images";

function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      onMouseMove={spotlightMove}
      className={cn(
        "spotlight group h-full overflow-hidden rounded-[2rem] border border-line bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Index({ n }: { n: string }) {
  return (
    <span className="inline-flex h-7 items-center rounded-full bg-brand-50 px-3 font-display text-xs font-bold tracking-wider text-brand-700 ring-1 ring-brand-200/70">
      {n}
    </span>
  );
}

function CardTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight text-ink sm:text-[1.7rem]">
      {children}
    </h3>
  );
}

function CardText({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-[1rem] leading-relaxed text-muted">{children}</p>;
}

const TOP_ITEMS = [
  { name: "X-Bacon", qty: 41 },
  { name: "X-Salada", qty: 27 },
  { name: "Batata média", qty: 22 },
];

const MINI: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Mic,
    title: "Entende áudio",
    text: "O cliente manda áudio, a IA transcreve e anota como se fosse texto. Só pede para escrever se estiver inaudível.",
  },
  {
    icon: Headset,
    title: "Passa para uma pessoa",
    text: "Cliente pediu alguém? Você recebe um aviso e a IA pausa. Ninguém fica preso com o robô.",
  },
  {
    icon: ShieldCheck,
    title: "Não inventa resposta",
    text: "Responde a partir do cardápio e das regras que você definiu. O que não sabe, encaminha para você.",
  },
];

export function Features() {
  return (
    <section id="recursos" aria-labelledby="recursos-title" className="relative py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-brand-50/70 to-transparent"
      />
      <Container>
        <SectionHeader
          id="recursos-title"
          eyebrow="O que a IA faz"
          title={
            <>
              Tudo acontece <span className="text-gradient-brand">dentro da conversa.</span>
            </>
          }
          description="Nada de aplicativo novo para o cliente baixar. Tudo acontece no WhatsApp que ele já usa, no número do seu restaurante."
        />

        <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 lg:grid-cols-12" stagger={0.1}>
          {/* 01 — Menu */}
          <StaggerItem className="lg:col-span-7">
            <Card>
              <div className="grid h-full grid-cols-1 items-center gap-8 sm:grid-cols-[1fr_0.8fr]">
                <div>
                  <Index n="01" />
                  <CardTitle>Mostra o cardápio</CardTitle>
                  <CardText>
                    O cliente pergunta e recebe o cardápio atualizado: itens, preços, combos e o que
                    está em falta hoje.
                  </CardText>
                  <MiniChat className="mt-6">
                    <MiniBubble from="user">Tem lanche sem cebola?</MiniBubble>
                    <MiniBubble from="ai">
                      Tem sim. O <strong>X-Salada</strong> e o <strong>X-Bacon</strong> podem vir
                      sem cebola. Quer que eu anote assim?
                    </MiniBubble>
                  </MiniChat>
                </div>
                <div className="relative mx-auto w-full max-w-[300px] sm:max-w-none">
                  <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-100 to-sun-100/60 blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-70" />
                  <img
                    src={menu}
                    alt="Ilustração: mão segurando celular com cardápio digital de lanche, pizza, açaí e marmita."
                    width={700}
                    height={928}
                    loading="lazy"
                    decoding="async"
                    className="w-full rounded-3xl border border-line bg-white object-cover transition-transform duration-700 ease-out group-hover:-rotate-2 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </Card>
          </StaggerItem>

          {/* 02 — Order */}
          <StaggerItem className="lg:col-span-5">
            <Card>
              <Index n="02" />
              <CardTitle>Anota o pedido</CardTitle>
              <CardText>
                Item por item, com quantidade, observações e total. Sem “pera aí que eu anoto” no
                meio do rush.
              </CardText>
              <MiniChat className="mt-6">
                <MiniBubble from="user">2 x-bacon sem cebola e 1 batata</MiniBubble>
                <MiniBubble from="ai">
                  Anotado: <strong>2 X-Bacon sem cebola</strong> e <strong>1 Batata média</strong>.
                  Total <strong>R$ 66</strong>. Entrega ou retirada?
                </MiniBubble>
              </MiniChat>
              <ul className="mt-5 divide-y divide-line rounded-2xl border border-line bg-paper/60 text-sm">
                {[
                  ["2× X-Bacon", "sem cebola", "R$ 52"],
                  ["1× Batata média", "", "R$ 14"],
                ].map(([name, note, price]) => (
                  <li key={name} className="flex items-center justify-between gap-3 px-4 py-2.5">
                    <span className="font-semibold text-ink">
                      {name}
                      {note && <span className="ml-2 font-medium text-sun-700">{note}</span>}
                    </span>
                    <span className="tabular-nums text-muted">{price}</span>
                  </li>
                ))}
                <li className="flex items-center justify-between px-4 py-2.5 font-display font-extrabold text-ink">
                  <span>Total</span>
                  <span className="tabular-nums text-brand-700">R$ 66</span>
                </li>
              </ul>
            </Card>
          </StaggerItem>

          {/* 03 — Delivery */}
          <StaggerItem className="lg:col-span-5">
            <Card>
              <div className="relative overflow-hidden rounded-3xl border border-line bg-white">
                <img
                  src={motoboy}
                  alt="Ilustração: entregador de moto com mochila térmica verde deixando um rastro de balões de mensagem."
                  width={700}
                  height={700}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-6">
                <Index n="03" />
                <CardTitle>Confirma entrega e pagamento</CardTitle>
                <CardText>
                  Endereço, previsão de entrega e forma de pagamento confirmados na mesma conversa.
                  O pedido vai para a cozinha.
                </CardText>
                <MiniChat className="mt-5">
                  <MiniBubble from="user">Rua das Flores, 120. Pix</MiniBubble>
                  <MiniBubble from="ai">
                    Pedido <strong>#128</strong> confirmado. Previsão: <strong>40 min</strong>.
                    Chave Pix enviada.
                  </MiniBubble>
                </MiniChat>
              </div>
            </Card>
          </StaggerItem>

          {/* 04 — Day summary */}
          <StaggerItem className="lg:col-span-7">
            <Card className="flex flex-col justify-between gap-8">
              <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-[0.8fr_1fr]">
                <div className="relative order-2 mx-auto w-full max-w-[300px] sm:order-1 sm:max-w-none">
                  <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-sun-100/70 to-brand-100 blur-2xl sm:opacity-70" />
                  <img
                    src={dona}
                    alt="Ilustração: dona de restaurante sentada à mesa no fim do expediente, olhando um gráfico no celular, com café e um gato dormindo na cadeira ao lado."
                    width={700}
                    height={869}
                    loading="lazy"
                    decoding="async"
                    className="w-full rounded-3xl border border-line bg-white object-cover transition-transform duration-700 ease-out group-hover:rotate-2 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="order-1 sm:order-2">
                  <Index n="04" />
                  <CardTitle>Fecha o dia com você</CardTitle>
                  <CardText>
                    No fim da noite, um resumo dos pedidos, dos itens mais vendidos e das perguntas
                    que a IA não soube responder.
                  </CardText>
                  <MiniChat className="mt-6" label="resumo de hoje · exemplo simulado">
                    <MiniBubble from="ai">
                      <strong>38 pedidos, R$ 1.812.</strong> Mais vendido: X-Bacon (41). 2 perguntas
                      ficaram para você responder.
                    </MiniBubble>
                  </MiniChat>
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-paper/60 p-5">
                <p className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-subtle">
                  Mais vendidos hoje
                  <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[10px] normal-case tracking-normal">
                    exemplo
                  </span>
                </p>
                <ul className="mt-4 space-y-3.5">
                  {TOP_ITEMS.map((item, i) => (
                    <li key={item.name} className="grid grid-cols-[7.5rem_1fr_2rem] items-center gap-3 text-sm">
                      <span className="truncate font-semibold text-ink">{item.name}</span>
                      <span className="h-2.5 overflow-hidden rounded-full bg-brand-100">
                        <motion.span
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(item.qty / TOP_ITEMS[0].qty) * 100}%` }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 1, delay: 0.3 + i * 0.12, ease: EASE }}
                          className="block h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400"
                        />
                      </span>
                      <span className="text-right font-display font-extrabold tabular-nums text-ink">
                        {item.qty}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </StaggerItem>

          {/* mini features */}
          {MINI.map((m) => (
            <StaggerItem key={m.title} className="lg:col-span-4">
              <div
                onMouseMove={spotlightMove}
                className="spotlight group flex h-full gap-4 rounded-[1.75rem] border border-line bg-white/70 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-lift"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-b from-brand-50 to-brand-100 text-brand-700 ring-1 ring-brand-200/70 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <m.icon className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">{m.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{m.text}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
