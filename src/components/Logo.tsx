import Link from 'next/link';

/**
 * PayBot mark — outlined wallet with a lightning bolt breaking out of the
 * top-right corner, matching the brand logo asset.
 */
export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <path
        d="M21.6 6.8H9.2A4.2 4.2 0 0 0 5 11v10.2a4.2 4.2 0 0 0 4.2 4.2h12.6a4.2 4.2 0 0 0 4.2-4.2v-4.4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9.4 11.6h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M9.6 19.8h3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M24.6 3.4 18.6 12.7h3.5l-1.4 6.6 6-9.3h-3.5z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ href = '#top' }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5" aria-label="PayBot нүүр хуудас">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-glow">
        <LogoMark className="h-[22px] w-[22px]" />
      </span>
      <span className="text-[17px] font-extrabold uppercase tracking-[0.02em]">PayBot</span>
    </Link>
  );
}
