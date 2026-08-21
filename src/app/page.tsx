import { Navbar } from '@/components/Navbar';
import { Reveal } from '@/components/Reveal';
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
        {/* Hero нь өөрийн CSS entrance хөдөлгөөнтэй тул Reveal-д ороогүй. */}
        <Hero />
        <Reveal>
          <Problem />
        </Reveal>
        <Reveal>
          <BeforeAfter />
        </Reveal>
        <Reveal>
          <HowItWorks />
        </Reveal>
        <Reveal>
          <ProductShowcase />
        </Reveal>
        <Reveal>
          <Features />
        </Reveal>
        <Reveal>
          <UseCases />
        </Reveal>
        <Reveal>
          <Benefits />
        </Reveal>
        <Reveal>
          <EarlyAccess />
        </Reveal>
        <Reveal>
          <EarlyAccessPerks />
        </Reveal>
        <Reveal>
          <Faq />
        </Reveal>
        <Reveal>
          <FinalCta />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
