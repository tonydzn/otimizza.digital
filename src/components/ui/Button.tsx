import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";

type Variant = "primary" | "secondary" | "dark" | "light" | "glow" | "ghost-dark";
type Size = "md" | "lg";

type Common = {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type AnchorProps = Common &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof Common> & { href: string };
type NativeButtonProps = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof Common> & { href?: undefined };

const variants: Record<Variant, string> = {
  primary:
    "shine bg-gradient-to-b from-brand-600 to-brand-700 text-white shadow-[0_10px_28px_-10px_rgb(11_134_67/0.75),inset_0_1px_0_rgb(255_255_255/0.28)] hover:shadow-[0_14px_36px_-10px_rgb(11_134_67/0.85),inset_0_1px_0_rgb(255_255_255/0.28)] hover:-translate-y-0.5",
  secondary:
    "glass text-ink hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgb(10_21_17/0.28)]",
  dark: "shine bg-ink text-white shadow-[0_10px_28px_-12px_rgb(10_21_17/0.7)] hover:bg-ink-3 hover:-translate-y-0.5",
  light:
    "shine bg-white text-ink shadow-[0_10px_28px_-12px_rgb(0_0_0/0.6)] hover:-translate-y-0.5 hover:bg-brand-50",
  glow: "shine bg-brand-400 text-[#04140b] shadow-[0_0_0_1px_rgb(110_221_159/0.5),0_12px_40px_-8px_rgb(56_201_122/0.65)] hover:bg-brand-300 hover:-translate-y-0.5",
  "ghost-dark":
    "glass-dark text-white hover:bg-white/15 hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

export function Button(props: AnchorProps | NativeButtonProps) {
  const {
    variant = "primary",
    size = "md",
    icon,
    arrow = false,
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    "group/btn relative inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-semibold tracking-tight",
    "transition-all duration-300 ease-out active:translate-y-0 active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-60",
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
        />
      )}
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, target, rel, ...anchorRest } = rest as AnchorProps;
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        target={target ?? (external ? "_blank" : undefined)}
        rel={rel ?? (external ? "noopener noreferrer" : undefined)}
        className={classes}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonRest } = rest as NativeButtonProps;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
