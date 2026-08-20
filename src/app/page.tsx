import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { BeforeAfter } from '@/components/sections/BeforeAfter';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { ProductShowcase } from '@/components/sections/ProductShowcase';
import { Features } from '@/components/sections/Features';
import { UseCases } from '@/components/sections/UseCases';
import { Benefits } from '@/components/sections/Benefits';
import { EarlyAccess } from '@/components/sections/EarlyAccess';
import { EarlyAccessPerks } from '@/components/sections/EarlyAccessPerks';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';
import { Footer } from '@/components/sections/Footer';

/**
 * Page order follows the brief exactly:
 * NAVBAR → HERO → PROBLEM → BEFORE/AFTER → HOW IT WORKS → PRODUCT SHOWCASE →
 * FEATURES → USE CASES → BENEFITS → EARLY ACCESS → FAQ → FINAL CTA → FOOTER
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <BeforeAfter />
        <HowItWorks />
        <ProductShowcase />
        <Features />
        <UseCases />
        <Benefits />
        <EarlyAccess />
        <EarlyAccessPerks />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
