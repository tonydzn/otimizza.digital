import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Logo, WhatsAppIcon } from "@/components/ui/Icons";
import { BRAND, LINKS, NAV_ITEMS } from "@/lib/content";
import { resetConsent } from "@/lib/tracking";
import { PRIVACY_URL } from "@/components/ui/CookieNotice";
import { SEGMENTS } from "@/lib/segments";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative pb-28 pt-16 md:pb-10">
      <Container>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-muted">
              O <strong className="font-semibold text-ink">Cardápio IA</strong> é um atendente de
              WhatsApp com inteligência artificial que mostra o cardápio, anota pedidos e confirma
              entrega e pagamento no número do seu restaurante.
            </p>
            <a
              href={LINKS.start}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-soft"
            >
              <WhatsAppIcon className="size-[18px] text-brand-600" />
              Falar no WhatsApp
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>

          <nav aria-label="Rodapé">
            <p className="font-display text-sm font-bold uppercase tracking-wider text-ink">
              Navegue
            </p>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {NAV_ITEMS.map((i) => (
                <li key={i.id}>
                  <a
                    href={`/#${i.id}`}
                    className="text-muted underline-offset-4 transition-colors hover:text-brand-700 hover:underline"
                  >
                    {i.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/#contato"
                  className="text-muted underline-offset-4 transition-colors hover:text-brand-700 hover:underline"
                >
                  Fale com a gente
                </a>
              </li>
              <li>
                <a
                  href="/ajuda/"
                  className="text-muted underline-offset-4 transition-colors hover:text-brand-700 hover:underline"
                >
                  Guia de implantação
                </a>
              </li>
              <li>
                <a
                  href="https://app.otimizza.digital/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted underline-offset-4 transition-colors hover:text-brand-700 hover:underline"
                >
                  Entrar no painel
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Para o seu negócio">
            <p className="font-display text-sm font-bold uppercase tracking-wider text-ink">
              Para o seu negócio
            </p>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {SEGMENTS.map((s) => (
                <li key={s.slug}>
                  <a
                    href={`/${s.slug}/`}
                    className="text-muted underline-offset-4 transition-colors hover:text-brand-700 hover:underline"
                  >
                    WhatsApp para {s.label.toLowerCase()}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-display text-sm font-bold uppercase tracking-wider text-ink">
              Contato
            </p>
            <ul className="mt-5 space-y-3.5 text-[0.95rem] text-muted">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                <a
                  href={LINKS.start}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 transition-colors hover:text-brand-700 hover:underline"
                >
                  {BRAND.phoneLabel}
                  <span className="sr-only"> (WhatsApp, abre em nova aba)</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                <a
                  href="mailto:tony.ananias@gmail.com"
                  className="underline-offset-4 transition-colors hover:text-brand-700 hover:underline"
                >
                  tony.ananias@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden="true" />
                <span>
                  {BRAND.city}
                  <br />
                  <span className="text-subtle">Atendemos a região e todo o Brasil</span>
                </span>
              </li>
              <li>
                <a
                  href={LINKS.test}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-700 underline-offset-4 hover:underline"
                >
                  Testar a IA no WhatsApp →
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-subtle sm:flex-row">
          <p>
            © {year} {BRAND.name} · {BRAND.city} ·{" "}
            <a
              href={PRIVACY_URL}
              className="underline-offset-4 hover:text-brand-700 hover:underline"
            >
              Privacidade
            </a>{" "}
            ·{" "}
            <button
              type="button"
              onClick={resetConsent}
              className="cursor-pointer underline-offset-4 hover:text-brand-700 hover:underline"
            >
              Preferências de cookies
            </button>
          </p>
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-brand-300"
          >
            Voltar ao topo
            <ArrowUp
              className="size-4 transition-transform group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </Container>
    </footer>
  );
}
