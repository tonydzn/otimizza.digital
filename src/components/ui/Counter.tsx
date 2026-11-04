import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type CounterProps = {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  /** casas decimais (ex.: 2 para centavos) */
  decimals?: number;
  className?: string;
};

/** Counts up from 0 when it scrolls into view. Respects reduced motion. */
export function Counter({ to, prefix = "", suffix = "", duration = 1.6, decimals = 0, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const write = (v: number) => {
      const n = decimals ? v : Math.round(v);
      el.textContent = `${prefix}${n.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
    };
    if (reduce) {
      write(to);
      return;
    }
    if (!inView) return;
    const controls = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: write });
    return () => controls.stop();
  }, [inView, reduce, to, prefix, suffix, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {(0).toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
