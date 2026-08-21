import clsx from 'clsx';
import { ArrowDown, Bot, User } from 'lucide-react';
import { BEFORE_AFTER } from '@/lib/content';

function Column({
  label,
  steps,
  variant,
}: {
  label: string;
  steps: string[];
  variant: 'before' | 'after';
}) {
  const isAfter = variant === 'after';
  return (
    <div
      className={clsx(
        'rounded-2xl border p-6 sm:p-7',
        isAfter
          ? 'border-brand-300 bg-gradient-to-b from-brand-500/10 to-transparent shadow-glow'
          : 'border-ink-200 bg-ink-50',
      )}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={clsx(
            'grid h-9 w-9 place-items-center rounded-xl',
            isAfter ? 'bg-brand-100 text-brand-700' : 'bg-ink-100 text-ink-500',
          )}
        >
          {isAfter ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
        </span>
        <h3 className={clsx('text-lg font-semibold', isAfter && 'text-brand-700')}>{label}</h3>
        {isAfter && (
          <span className="ml-auto rounded-full bg-mint-500/10 px-2.5 py-1 text-[11px] font-semibold text-mint-600">
            Автомат
          </span>
        )}
      </div>

      <ol className="mt-6 space-y-1">
        {steps.map((step, i) => (
          <li key={step}>
            <div
              className={clsx(
                'rounded-xl border px-4 py-3 text-sm',
                isAfter
                  ? 'border-brand-200 bg-white text-ink-800'
                  : 'border-ink-200 bg-white text-ink-600',
              )}
            >
              {step}
            </div>
            {i < steps.length - 1 && (
              <div className="flex justify-center py-1">
                <ArrowDown
                  className={clsx('h-3.5 w-3.5', isAfter ? 'text-brand-400' : 'text-ink-400')}
                  aria-hidden="true"
                />
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function BeforeAfter() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Before / After</span>
          <h2 className="mt-5 h2">Ялгаа нь юунд байна вэ?</h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Column
            label={BEFORE_AFTER.before.label}
            steps={BEFORE_AFTER.before.steps}
            variant="before"
          />
          <Column
            label={BEFORE_AFTER.after.label}
            steps={BEFORE_AFTER.after.steps}
            variant="after"
          />
        </div>

        <p className="mx-auto mt-10 max-w-2xl key-message">{BEFORE_AFTER.keyMessage}</p>
      </div>
    </section>
  );
}
