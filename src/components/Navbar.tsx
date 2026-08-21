'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { NAV_LINKS, CTA_LABEL } from '@/lib/content';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 border-b transition-colors',
        scrolled
          ? 'border-ink-200 bg-white/85 backdrop-blur-xl'
          : 'border-transparent bg-transparent',
      )}
    >
      <nav className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm text-ink-700 transition hover:text-ink-900"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link href="#early-access" className="btn-primary btn-sm hidden md:inline-flex">
          {CTA_LABEL}
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-ink-200 p-2 md:hidden"
          aria-label="Цэс нээх"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink-200 bg-white md:hidden">
          <div className="container-x space-y-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-ink-800 hover:bg-ink-100"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#early-access"
              onClick={() => setOpen(false)}
              className="btn-primary mt-3 w-full"
            >
              {CTA_LABEL}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
