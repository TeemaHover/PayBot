import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Icon } from '@/components/Icon';
import { FOOTER, NAV_LINKS } from '@/lib/content';

export function Footer() {
  return (
    <footer className="border-t border-ink-800 bg-ink-950">
      <div className="container-x py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">{FOOTER.tagline}</p>
          </div>

          <nav aria-label="Хөлийн цэс">
            <h2 className="text-sm font-semibold">Цэс</h2>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/55 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold">{FOOTER.contactLabel}</h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white"
                    {...(s.href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    <Icon name={s.icon} className="h-4 w-4" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-ink-800 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/40">{FOOTER.copyright}</p>
          <Link href="#early-access" className="btn-primary btn-sm">
            Хүлээлгийн жагсаалтад нэгдэх
          </Link>
        </div>
      </div>
    </footer>
  );
}
