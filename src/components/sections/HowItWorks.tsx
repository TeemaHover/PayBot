import { HOW_IT_WORKS } from '@/lib/content';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section border-y border-ink-200 bg-ink-50">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Хэрхэн ажилладаг вэ?</span>
          <h2 className="mt-5 h2">{HOW_IT_WORKS.title}</h2>
        </div>

        <ol className="relative mx-auto mt-14 max-w-3xl">
          <span
            className="absolute left-[22px] top-3 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-brand-400 via-brand-500/40 to-transparent sm:block"
            aria-hidden="true"
          />

          {HOW_IT_WORKS.steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
              <span className="z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-brand-300 bg-white text-sm font-bold text-brand-700">
                {i + 1}
              </span>
              <div className="pt-1.5">
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-600">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
