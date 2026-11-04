import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, CheckCircle2, Lock, MessageCircleHeart } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { EASE, LINKS, waLink } from "@/lib/content";
import { cn } from "@/utils/cn";

const TYPES = [
  "Lanchonete",
  "Hamburgueria",
  "Pizzaria",
  "Marmitaria",
  "Açaiteria",
  "Pastelaria",
  "Restaurante",
  "Outro",
];

const POINTS = [
  "Você vê a IA atendendo antes de decidir",
  "Conversa direta no WhatsApp, sem formulário longo",
  "Implantação à distância, em qualquer cidade do Brasil",
];

function maskPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

type Values = { name: string; phone: string; business: string; type: string };
type Errors = Partial<Record<keyof Values, string>>;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Como podemos te chamar?";
  const digits = v.phone.replace(/\D/g, "");
  if (digits.length < 10) e.phone = "Informe um WhatsApp com DDD, ex.: (18) 98186-8701";
  if (v.business.trim().length < 2) e.business = "Qual o nome do seu negócio?";
  return e;
}

const inputBase =
  "peer h-14 w-full rounded-2xl border bg-white/[0.07] px-4 pt-6 text-base text-white placeholder-transparent outline-none transition-all duration-300 focus:border-brand-300 focus:bg-white/[0.11] focus:ring-4 focus:ring-brand-400/20";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="relative">
        {children}
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-1/2 origin-left -translate-y-1/2 text-base text-white/60 transition-all duration-200 peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:scale-[0.78] peer-focus:text-brand-200 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:scale-[0.78]"
        >
          {label}
        </label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden pl-1 pt-1.5 text-[0.82rem] font-medium text-sun-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function LeadForm({ defaultType = "Lanchonete" }: { defaultType?: string }) {
  const [values, setValues] = useState<Values>({ name: "", phone: "", business: "", type: defaultType });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<string | null>(null);
  const refs = {
    name: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    business: useRef<HTMLInputElement>(null),
  };

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = (["name", "phone", "business"] as const).find((k) => found[k]);
    if (first) {
      refs[first].current?.focus();
      return;
    }
    const msg = `Olá! Sou ${values.name.trim()}, da ${values.business.trim()} (${values.type.toLowerCase()}). Quero conhecer o Cardápio IA. Meu WhatsApp: ${values.phone}.`;
    const url = waLink(msg);
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(url);
  };

  const err = (k: keyof Values) =>
    errors[k] ? { "aria-invalid": true as const, "aria-describedby": `${k}-error` } : {};

  return (
    <div className="glass-dark relative overflow-hidden rounded-[2rem] p-6 sm:p-9">
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-20 size-60 rounded-full bg-brand-400/25 blur-3xl"
      />
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <motion.div
            key="done"
            role="status"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative flex min-h-[420px] flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
              className="grid size-20 place-items-center rounded-full bg-brand-400 text-ink shadow-[0_0_60px_rgb(56_201_122/0.6)]"
            >
              <CheckCircle2 className="size-10" aria-hidden="true" />
            </motion.span>
            <h3 className="mt-6 font-display text-2xl font-extrabold text-white sm:text-3xl">
              Quase lá, {values.name.trim().split(" ")[0]}!
            </h3>
            <p className="mt-3 max-w-sm text-white/75">
              Abrimos o WhatsApp com a sua mensagem pronta. É só tocar em enviar e a gente responde
              por lá.
            </p>
            <Button href={sent} variant="glow" size="lg" icon={<WhatsAppIcon />} className="mt-7">
              Abrir o WhatsApp
            </Button>
            <button
              type="button"
              onClick={() => setSent(null)}
              className="mt-4 text-sm font-medium text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Editar meus dados
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            aria-labelledby="form-title"
            className="relative"
          >
            <h3 id="form-title" className="font-display text-2xl font-extrabold text-white">
              Quero ver no meu restaurante
            </h3>
            <p className="mt-1.5 text-[0.95rem] text-white/65">
              Deixe seus dados e abrimos a conversa no WhatsApp já com tudo preenchido.
            </p>

            <div className="mt-7 grid gap-4">
              <Field id="name" label="Seu nome" error={errors.name}>
                <input
                  ref={refs.name}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Seu nome"
                  required
                  value={values.name}
                  onChange={(e) => set("name", e.target.value)}
                  className={cn(inputBase, errors.name ? "border-sun-400" : "border-white/15")}
                  {...err("name")}
                />
              </Field>

              <Field id="phone" label="Seu WhatsApp (com DDD)" error={errors.phone}>
                <input
                  ref={refs.phone}
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="Seu WhatsApp"
                  required
                  value={values.phone}
                  onChange={(e) => set("phone", maskPhone(e.target.value))}
                  className={cn(inputBase, errors.phone ? "border-sun-400" : "border-white/15")}
                  {...err("phone")}
                />
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1.3fr_1fr]">
                <Field id="business" label="Nome do negócio" error={errors.business}>
                  <input
                    ref={refs.business}
                    id="business"
                    name="business"
                    type="text"
                    autoComplete="organization"
                    placeholder="Nome do negócio"
                    required
                    value={values.business}
                    onChange={(e) => set("business", e.target.value)}
                    className={cn(inputBase, errors.business ? "border-sun-400" : "border-white/15")}
                    {...err("business")}
                  />
                </Field>

                <div className="relative">
                  <select
                    id="type"
                    name="type"
                    value={values.type}
                    onChange={(e) => set("type", e.target.value)}
                    className="peer h-14 w-full appearance-none rounded-2xl border border-white/15 bg-white/[0.07] px-4 pt-6 text-base text-white outline-none transition-all duration-300 focus:border-brand-300 focus:bg-white/[0.11] focus:ring-4 focus:ring-brand-400/20"
                  >
                    {TYPES.map((t) => (
                      <option key={t} value={t} className="text-ink">
                        {t}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor="type"
                    className="pointer-events-none absolute left-4 top-2.5 origin-left scale-[0.78] text-base text-white/60"
                  >
                    Tipo de negócio
                  </label>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/60"
                  >
                    ▾
                  </span>
                </div>
              </div>
            </div>

            <Button type="submit" variant="glow" size="lg" icon={<WhatsAppIcon />} arrow className="mt-6 w-full">
              Falar com a Otimizza
            </Button>

            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-white/55">
              <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              Ao enviar, você abre uma conversa no WhatsApp com a Otimizza Digital. Usamos seus
              dados apenas para retornar o contato.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FinalCTA({ defaultType }: { defaultType?: string } = {}) {
  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="on-dark grain-dark relative mx-2 mb-2 overflow-hidden rounded-[2rem] bg-ink py-20 text-white sm:mx-4 sm:mb-4 sm:rounded-[3rem] sm:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid-dark mask-fade-radial absolute inset-0" />
        <div className="absolute -left-32 top-0 size-[620px] animate-drift rounded-full bg-brand-500/25 blur-[120px]" />
        <div className="absolute -right-32 bottom-[-120px] size-[560px] animate-drift-2 rounded-full bg-sun-500/15 blur-[120px]" />
      </div>

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <Reveal>
              <span className="glass-dark inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-brand-200">
                <MessageCircleHeart className="size-4" aria-hidden="true" />
                Vamos conversar
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="contato-title"
                className="mt-6 text-[2.5rem] font-extrabold leading-[1.03] sm:text-6xl lg:text-[4rem]"
              >
                A próxima noite de rush{" "}
                <span className="text-gradient-light">pode ser mais tranquila.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/70 lg:mx-0">
                Chama no WhatsApp, conta como é o seu atendimento hoje e a gente te mostra como o
                Cardápio IA ficaria no seu restaurante.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <ul className="mx-auto mt-8 grid max-w-xl gap-3 text-left lg:mx-0">
                {POINTS.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[0.98rem] text-white/85">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-500/20 text-brand-300 ring-1 ring-brand-400/40">
                      <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.32}>
              <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
                <Button href={LINKS.start} variant="glow" size="lg" icon={<WhatsAppIcon />} arrow>
                  Falar com a gente no WhatsApp
                </Button>
                <a
                  href={LINKS.test}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-14 items-center justify-center gap-2 rounded-full px-5 text-base font-semibold text-white/80 transition-colors hover:text-white"
                >
                  Testar a IA primeiro
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                  <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} x={24}>
            <LeadForm defaultType={defaultType} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
