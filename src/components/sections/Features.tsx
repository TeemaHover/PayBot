import { FEATURES } from '@/lib/content';
import { Icon } from '@/components/Icon';

export function Features() {
  return (
    <section id="features" className="section border-y border-ink-200 bg-ink-50">
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
              className="card group relative overflow-hidden p-6 transition hover:border-brand-300"
            >
              <span
                className="pointer-events-none absolute -right-6 -top-8 text-7xl font-bold text-ink-100 transition group-hover:text-brand-100"
                aria-hidden="true"
              >
                {f.no}
              </span>

              <span className="grid h-11 w-11 place-items-center rounded-xl border border-brand-200 bg-brand-50 text-brand-700">
                <Icon name={f.icon} className="h-5 w-5" />
              </span>

              <h3 className="mt-5 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
