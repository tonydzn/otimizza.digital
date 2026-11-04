/* Medição via Google Tag Manager (GTM-MBMG5FC8). GA4 e Meta Pixel são configurados dentro do GTM.
   Os nomes de evento e a chave de consentimento são os mesmos do site principal (otimizza.digital). */
import { WA_TEST } from "@/lib/content";

type Consent = "aceito" | "recusado";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = "consentimento";
export const CONSENT_RESET_EVENT = "otimizza:cookie-prefs";

function dl(): unknown[] {
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

// gtag precisa empurrar o objeto `arguments`; um array comum não é lido como comando de consentimento.
function gtag(..._args: unknown[]) {
  // eslint-disable-next-line prefer-rest-params
  dl().push(arguments);
}

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "aceito" || v === "recusado" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* navegação privada: vale só para esta visita */
  }
  const v = value === "aceito" ? "granted" : "denied";
  gtag("consent", "update", {
    analytics_storage: v,
    ad_storage: v,
    ad_user_data: v,
    ad_personalization: v,
  });
  dl().push({ event: value === "aceito" ? "consent_granted" : "consent_denied" });
}

export function resetConsent() {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(CONSENT_RESET_EVENT));
}

/** Cliques em links de WhatsApp e no teste grátis viram eventos no dataLayer.
 *  O número de teste da IA manda `bot_teste_click`, que NÃO deve virar conversão no Meta. */
export function initClickTracking() {
  const onClick = (event: MouseEvent) => {
    const link = (event.target as Element | null)?.closest?.<HTMLAnchorElement>(
      'a[href*="wa.me/"], a[href*="api.whatsapp.com"], a[href*="app.otimizza.digital/cadastro"]'
    );
    if (!link) return;
    try {
      if (link.href.includes("/cadastro")) {
        dl().push({ event: "signup_click", content_name: "Teste grátis", link_text: (link.textContent || "").trim().slice(0, 80), page_path: location.pathname });
        return;
      }
      const teste = link.href.includes(WA_TEST);
      dl().push({
        event: teste ? "bot_teste_click" : "whatsapp_click",
        content_name: teste ? "Teste da IA" : "Cardápio IA",
        link_text: (link.textContent || "").trim().slice(0, 80),
        page_path: location.pathname,
      });
    } catch {
      /* rastreamento nunca quebra a página */
    }
  };
  document.addEventListener("click", onClick, { capture: true });
  return () => document.removeEventListener("click", onClick, { capture: true });
}
