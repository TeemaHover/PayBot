import { FEATURES } from '@/lib/content';
import { Icon } from '@/components/Icon';

export function Features() {
  return (
    <section id="features" className="section border-y border-ink-800 bg-ink-900/30">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Боломжууд</span>
          <h2 className="mt-5 h2">Үндсэн боломжууд</h2>
          <p className="mt-5 lead">
            Харилцаанаас төлбөр хүртэлх бүх алхмыг нэг системд нэгтгэсэн.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article
              key={f.no}
              className="card group relative overflow-hidden p-6 transition hover:border-brand-500/40"
            >
              <span
                className="pointer-events-none absolute -right-6 -top-8 text-7xl font-bold text-white/[0.035] transition group-hover:text-brand-400/10"
                aria-hidden="true"
              >
                {f.no}
              </span>

              <span className="grid h-11 w-11 place-items-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-200">
                <Icon name={f.icon} className="h-5 w-5" />
              </span>

              <h3 className="mt-5 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
