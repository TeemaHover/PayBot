import { EARLY_ACCESS_PERKS } from '@/lib/content';
import { Icon } from '@/components/Icon';

export function EarlyAccessPerks() {
  return (
    <section className="section border-y border-ink-800 bg-ink-900/30">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="h2">{EARLY_ACCESS_PERKS.title}</h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {EARLY_ACCESS_PERKS.items.map((p, i) => (
            <article key={p.title} className="card relative p-6">
              <span className="absolute right-5 top-5 text-xs font-bold tabular-nums text-white/15">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-200">
                <Icon name={p.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
