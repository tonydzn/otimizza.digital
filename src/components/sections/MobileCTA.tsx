import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { BRAND, EASE, LINKS, brl } from "@/lib/content";

/** Sticky bottom conversion bar for phones. Hides while the lead form is on screen. */
export function MobileCTA() {
  const [pastHero, setPastHero] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 720);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = document.getElementById("contato");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), {
      threshold: 0.15,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show = pastHero && !formVisible;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed inset-x-3 bottom-3 z-40 md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="glass flex items-center justify-between gap-3 rounded-full py-2 pl-5 pr-2 shadow-[0_20px_50px_-12px_rgb(10_21_17/0.45)]">
            <p className="leading-tight">
              <span className="block font-display text-sm font-extrabold text-ink">Cardápio IA</span>
              <span className="text-xs text-muted">{brl(BRAND.price, 2)}/mês · plano único</span>
            </p>
            <Button href={LINKS.signup} className="h-11">
              Teste grátis
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
