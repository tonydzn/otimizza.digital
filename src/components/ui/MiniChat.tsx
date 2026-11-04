import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

/** Small static WhatsApp-style bubble used in feature cards. */
export function MiniBubble({
  from,
  children,
  className,
}: {
  from: "user" | "ai";
  children: ReactNode;
  className?: string;
}) {
  const ai = from === "ai";
  return (
    <div className={cn("flex", ai ? "justify-start" : "justify-end", className)}>
      <p
        className={cn(
          "max-w-[88%] px-3.5 py-2.5 text-[0.88rem] leading-snug text-ink shadow-[0_1px_1px_rgb(0_0_0/0.07)]",
          ai ? "rounded-2xl rounded-tl-md bg-white" : "rounded-2xl rounded-tr-md bg-[#d9fdd3]",
        )}
      >
        {children}
      </p>
    </div>
  );
}

/** Beige chat canvas that hosts MiniBubbles. */
export function MiniChat({
  children,
  label,
  className,
}: {
  children: ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative space-y-2 rounded-2xl bg-[#efe9df] p-3.5 [background-image:radial-gradient(rgb(10_21_17/0.05)_1px,transparent_1px)] [background-size:14px_14px]",
        className,
      )}
    >
      {children}
      {label && (
        <p className="pt-0.5 text-right text-[10.5px] font-medium uppercase tracking-wider text-subtle">
          {label}
        </p>
      )}
    </div>
  );
}
