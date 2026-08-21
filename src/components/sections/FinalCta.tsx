import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FINAL_CTA } from '@/lib/content';

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-ink-200">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(59,155,224,0.28),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="container-x relative py-24 text-center sm:py-28">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
          {FINAL_CTA.title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl lead">{FINAL_CTA.description}</p>
        <Link href="#early-access" className="btn-primary mt-9">
          {FINAL_CTA.cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
