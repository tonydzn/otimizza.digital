import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Reveal } from "./Reveal";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

export function Eyebrow({
  children,
  dark = false,
  className,
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em]",
        dark
          ? "glass-dark text-brand-200"
          : "border border-brand-200/70 bg-brand-50/80 text-brand-700",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("size-1.5 rounded-full", dark ? "bg-brand-300" : "bg-brand-500")}
      />
      {children}
    </span>
  );
}

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  dark?: boolean;
  id?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
  id,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      <Reveal>
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          id={id}
          className={cn(
            "mt-5 text-[2.2rem] font-extrabold leading-[1.05] sm:text-5xl lg:text-[3.4rem]",
            dark ? "text-white" : "text-ink",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-5 text-[1.05rem] leading-relaxed sm:text-lg",
              align === "center" && "mx-auto max-w-2xl",
              dark ? "text-white/70" : "text-muted",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
