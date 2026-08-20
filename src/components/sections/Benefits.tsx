import { BENEFITS } from '@/lib/content';
import { Icon } from '@/components/Icon';

export function Benefits() {
  return (
    <section id="benefits" className="section border-y border-ink-800 bg-ink-900/30">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Давуу тал</span>
          <h2 className="mt-5 h2">{BENEFITS.title}</h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.items.map((b, i) => (
            <article
              key={b.title}
              className={
                i === 0
                  ? 'card p-6 sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:flex lg:flex-col lg:justify-center'
                  : 'card p-6'
              }
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-200">
                <Icon name={b.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{b.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
