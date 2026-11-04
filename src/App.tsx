import { MotionConfig } from "motion/react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Features } from "@/components/sections/Features";
import { Showcase } from "@/components/sections/Showcase";
import { Benefits } from "@/components/sections/Benefits";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { MobileCTA } from "@/components/sections/MobileCTA";
import { CookieNotice } from "@/components/ui/CookieNotice";

export default function App() {
  return (
    // reducedMotion="user": transforms/layout animations are disabled for people who ask for less motion
    <MotionConfig reducedMotion="user">
      <a
        href="#conteudo"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>

      <Navbar />

      <main id="conteudo">
        <Hero />
        <SocialProof />
        <BeforeAfter />
        <Features />
        <Showcase />
        <Benefits />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
      <MobileCTA />
      <CookieNotice />
    </MotionConfig>
  );
}
