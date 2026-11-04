import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { LogIn, Menu, X } from "lucide-react";
import { Logo, WhatsAppIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { LINKS, NAV_ITEMS, EASE } from "@/lib/content";
import { cn } from "@/utils/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (y < 300) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy
  useEffect(() => {
    const els = NAV_ITEMS.map((i) => document.getElementById(i.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Close on Escape + lock scroll while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left bg-gradient-to-r from-brand-500 via-brand-300 to-sun-500"
      />

      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="px-3 pt-3 sm:px-6"
      >
        <nav
          aria-label="Principal"
          className={cn(
            "mx-auto flex h-[60px] max-w-6xl items-center justify-between rounded-full border pl-4 pr-2 transition-all duration-500 sm:pl-5",
            scrolled || open
              ? "glass border-white/80 shadow-[0_12px_40px_-12px_rgb(10_21_17/0.25)]"
              : "border-transparent bg-transparent",
          )}
        >
          <a
            href="#topo"
            aria-label="Otimizza Digital — voltar ao topo"
            className="rounded-lg transition-opacity hover:opacity-80"
            onClick={() => setOpen(false)}
          >
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors",
                      isActive ? "text-brand-800" : "text-muted hover:text-ink",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-brand-100/80"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1 sm:gap-2">
            <a
              href={LINKS.login}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Acessar o painel do Cardápio IA (abre em nova aba)"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white/70 px-4 text-[0.92rem] font-semibold text-ink transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:bg-white"
            >
              <LogIn className="size-4 text-brand-700" aria-hidden="true" />
              Acessar
            </a>
            <Button
              href={LINKS.start}
              size="md"
              icon={<WhatsAppIcon className="size-[18px]" />}
              className="hidden h-10 sm:inline-flex"
            >
              Falar no WhatsApp
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5 lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "m"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                  className="grid place-items-center"
                >
                  {open ? <X className="size-5" /> : <Menu className="size-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="menu-mobile"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="glass mx-auto mt-2 max-w-6xl origin-top rounded-3xl p-3 lg:hidden"
            >
              <ul className="grid gap-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.045, duration: 0.35, ease: EASE }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-semibold transition-colors hover:bg-brand-50",
                        active === item.id ? "bg-brand-50 text-brand-800" : "text-ink",
                      )}
                    >
                      {item.label}
                      <span aria-hidden="true" className="text-subtle">
                        →
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-2 grid gap-2 p-1">
                <Button
                  href={LINKS.start}
                  size="lg"
                  icon={<WhatsAppIcon />}
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Quero o Cardápio IA
                </Button>
                <Button
                  href={LINKS.test}
                  variant="secondary"
                  size="lg"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Testar a IA no WhatsApp
                </Button>
                <Button
                  href={LINKS.login}
                  variant="secondary"
                  size="lg"
                  icon={<LogIn className="size-[18px]" />}
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Acessar o painel
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
