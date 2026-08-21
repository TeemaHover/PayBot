import { USE_CASES } from '@/lib/content';
import { Icon } from '@/components/Icon';

export function UseCases() {
  return (
    <section id="use-cases" className="section">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Хэнд зориулсан бэ?</span>
          <h2 className="mt-5 h2">Хэрэглэгчтэй онлайнаар харилцдаг бүх бизнест</h2>
        </div>

        <div className="mt-12 stagger-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((u) => (
            <article
              key={u.title}
              className="card card-lift flex gap-4 p-6 hover:bg-ink-50"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500/25 to-aqua-400/10 text-brand-700">
                <Icon name={u.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold">{u.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{u.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
