import { useEffect, useState } from "react";
import { CONSENT_RESET_EVENT, initClickTracking, readConsent, setConsent } from "@/lib/tracking";

export const PRIVACY_URL = "https://otimizza.digital/privacidade/";

/** Aviso de cookies (LGPD). Até a escolha, o Consent Mode mantém GA4 e Meta Pixel sem cookies. */
export function CookieNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(readConsent() === null);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_RESET_EVENT, reopen);
    const stopTracking = initClickTracking();
    return () => {
      window.removeEventListener(CONSENT_RESET_EVENT, reopen);
      stopTracking();
    };
  }, []);

  if (!open) return null;

  const choose = (v: "aceito" | "recusado") => {
    setConsent(v);
    setOpen(false);
  };

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-4 bottom-24 z-50 mx-auto flex max-w-[720px] flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl bg-ink px-5 py-4 text-[0.9rem] leading-relaxed text-white shadow-2xl md:bottom-4"
    >
      <p className="m-0 flex-[1_1_320px]">
        Usamos cookies de medição (Google Analytics) e de anúncios (Meta Pixel) para entender o uso
        do site e divulgar o Cardápio IA. Você escolhe.{" "}
        <a
          href={PRIVACY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-300 underline underline-offset-2"
        >
          Saiba mais
        </a>
        .
      </p>
      <div className="flex w-full gap-2 sm:ml-auto sm:w-auto">
        <button
          type="button"
          onClick={() => choose("recusado")}
          className="min-h-10 flex-1 cursor-pointer rounded-full border border-white/25 px-4 font-semibold text-white transition-colors hover:bg-white/10 sm:flex-none"
        >
          Só o essencial
        </button>
        <button
          type="button"
          onClick={() => choose("aceito")}
          className="min-h-10 flex-1 cursor-pointer rounded-full bg-brand-500 px-4 font-semibold text-ink transition-colors hover:bg-brand-400 sm:flex-none"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
