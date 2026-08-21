import clsx from 'clsx';
import { Check, CheckCheck } from 'lucide-react';

export type Bubble = { from: 'user' | 'bot'; text: string; meta?: string };

/** Messenger-style conversation used across the hero and product showcase. */
export function ChatMockup({
  bubbles,
  title = 'Хэрэглэгч',
  subtitle = 'Messenger',
  animate = true,
  className,
}: {
  bubbles: Bubble[];
  title?: string;
  subtitle?: string;
  animate?: boolean;
  className?: string;
}) {
  return (
    <div className={clsx('overflow-hidden rounded-[26px] border border-ink-200 bg-white shadow-card', className)}>
      <div className="flex items-center gap-3 border-b border-ink-200 bg-ink-50 px-4 py-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-aqua-400 text-xs font-bold text-white">
          {title.slice(0, 1)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{title}</p>
          <p className="text-[11px] text-ink-500">{subtitle}</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 rounded-full border border-mint-500/30 bg-mint-500/10 px-2.5 py-1 text-[10px] font-semibold text-mint-600">
          <span className="h-1.5 w-1.5 rounded-full bg-mint-500" />
          PayBot идэвхтэй
        </span>
      </div>

      <div className={clsx('space-y-3 p-4', animate && 'stagger')}>
        {bubbles.map((b, i) => (
          <div
            key={i}
            className={clsx('flex flex-col', b.from === 'user' ? 'items-start' : 'items-end')}
          >
            <div
              className={clsx(
                'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                b.from === 'user'
                  ? 'rounded-bl-md bg-ink-100 text-ink-900'
                  : 'rounded-br-md bg-gradient-to-br from-brand-500 to-brand-600 text-white',
              )}
            >
              {b.text}
            </div>
            {b.meta && (
              <span className="mt-1 flex items-center gap-1 px-1 text-[10px] text-ink-500">
                {b.from === 'bot' ? (
                  <CheckCheck className="h-3 w-3 text-aqua-600" />
                ) : (
                  <Check className="h-3 w-3" />
                )}
                {b.meta}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Wraps any mockup in a device frame so screenshots read as a real product. */
export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[330px]">
      <div className="rounded-[38px] border border-ink-200 bg-ink-50 p-2.5 shadow-[0_30px_60px_-28px_rgba(16,40,64,0.45)]">
        <div className="relative overflow-hidden rounded-[30px] bg-white">
          <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink-50" />
          <div className="pt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
