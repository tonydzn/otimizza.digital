import { LogIn } from "lucide-react";
import { Logo, WhatsAppIcon } from "@/components/ui/Icons";
import { LINKS } from "@/lib/content";

/** Cabeçalho simples das páginas internas (privacidade, guia, 404). */
export function SubHeader() {
  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Principal"
        className="glass mx-auto flex h-[60px] max-w-6xl items-center justify-between rounded-full border border-white/80 pl-4 pr-2 shadow-[0_12px_40px_-12px_rgb(10_21_17/0.25)] sm:pl-5"
      >
        <a href="/" aria-label="Otimizza Digital, início">
          <Logo />
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href="/ajuda/"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-ink sm:inline-flex"
          >
            Guia
          </a>
          <a
            href={LINKS.login}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Acessar o painel do Cardápio IA (abre em nova aba)"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white/70 px-4 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:bg-white"
          >
            <LogIn className="size-4 text-brand-700" aria-hidden="true" />
            Acessar
          </a>
          <a
            href={LINKS.start}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-brand-400"
          >
            <WhatsAppIcon className="size-[18px]" />
            <span className="hidden sm:inline">Falar no WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
