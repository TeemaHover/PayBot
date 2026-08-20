import { RotateCw } from 'lucide-react';
import { PROBLEM } from '@/lib/content';

export function Problem() {
  return (
    <section id="problem" className="section border-t border-ink-800 bg-ink-900/30">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Асуудал</span>
          <h2 className="mt-5 h2">{PROBLEM.title}</h2>
          <p className="mt-5 lead">{PROBLEM.intro}</p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2">
          {PROBLEM.items.map((item, i) => (
            <li
              key={item}
              className="flex items-center gap-3 rounded-xl border border-ink-700 bg-ink-850/70 px-4 py-4"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-rose-500/10 text-rose-300">
                <RotateCw className="h-4 w-4" />
              </span>
              <span className="text-sm text-white/75">{item}</span>
              <span className="ml-auto text-[11px] font-semibold tabular-nums text-white/25">
                {String(i + 1).padStart(2, '0')}
              </span>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-10 max-w-2xl key-message">{PROBLEM.keyMessage}</p>
      </div>
    </section>
  );
}
