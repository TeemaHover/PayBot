'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Plus } from 'lucide-react';
import { FAQS } from '@/lib/content';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-5 h2">Түгээмэл асуултууд</h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-ink-200 overflow-hidden rounded-2xl border border-ink-200 bg-ink-50">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-ink-50"
                >
                  <span className="text-sm font-semibold sm:text-base">{item.q}</span>
                  <Plus
                    className={clsx(
                      'h-4 w-4 shrink-0 text-ink-500 transition-transform',
                      isOpen && 'rotate-45 text-brand-600',
                    )}
                  />
                </button>
                {isOpen && (
                  <p className="px-5 pb-5 text-sm leading-relaxed text-ink-600">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
