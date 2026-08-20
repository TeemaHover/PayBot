import Link from 'next/link';

export function Logo({ href = '#top' }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5" aria-label="PayBot нүүр хуудас">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-300 via-brand-500 to-aqua-500 shadow-glow">
        <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" fill="none">
          <path
            d="M4 7.5A3.5 3.5 0 0 1 7.5 4h9A3.5 3.5 0 0 1 20 7.5v6a3.5 3.5 0 0 1-3.5 3.5H12l-4.6 3.2A.6.6 0 0 1 6.5 20v-3.2A3.5 3.5 0 0 1 4 13.5v-6Z"
            fill="#0B0B18"
          />
          <circle cx="9.5" cy="10.5" r="1.35" fill="#8F73FF" />
          <circle cx="14.5" cy="10.5" r="1.35" fill="#38D6F5" />
        </svg>
      </span>
      <span className="text-[17px] font-bold tracking-tight">
        Pay<span className="text-brand-300">Bot</span>
      </span>
    </Link>
  );
}
