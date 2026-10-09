// Dados do site. A origem vem da Vercel no build; defina SITE_ORIGIN quando o domínio próprio estiver ligado.
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
export const site = {
  name: 'Otimizza Digital',
  product: 'Cardápio IA',
  origin: (process.env.SITE_ORIGIN || (vercelHost ? `https://${vercelHost}` : 'https://otimizzadigital.vercel.app')).replace(/\/$/, ''),
  owner: 'Tony Ananias',
  ownerSite: 'https://tonyananias.com.br',
  email: 'tony.ananias@gmail.com',
  whatsapp: '5518981868701',
  whatsappDisplay: '(18) 98186-8701',
  whatsappText: 'Olá! Quero o Cardápio IA no meu restaurante. Pode me explicar como funciona?',
  city: 'Presidente Prudente, SP',
  cityName: 'Presidente Prudente',
  region: 'SP',
  country: 'BR',
  updated: '2026-10-09',
  instagram: 'https://www.instagram.com/otimizza_digital/',
  facebook: '',   // URL da página do Facebook: preencher quando tiver
  get sameAs() { return [this.instagram, this.facebook].filter(Boolean); },
};
