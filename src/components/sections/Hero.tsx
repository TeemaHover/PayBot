import Link from 'next/link';
import { ArrowRight, MessageCircle, Bot, QrCode, CheckCircle2 } from 'lucide-react';
import { HERO } from '@/lib/content';
import { ChatMockup, PhoneFrame, type Bubble } from '@/components/mockups/ChatMockup';

const CONVERSATION: Bubble[] = [
  { from: 'user', text: 'Сайн байна уу? Энэ цамц M размертай юу?' },
  { from: 'bot', text: 'Сайн байна уу! Тийм ээ, M размер бэлэн байна. Үнэ 89,000₮.' },
  { from: 'user', text: '2ш авъя. Хүргэлттэй юу?' },
  {
    from: 'bot',
    text: 'Захиалга үүслээ: 2ш × 89,000₮ = 178,000₮. QPay-ээр төлөх холбоосыг илгээлээ.',
  },
  { from: 'user', text: 'Төллөө 👍' },
  {
    from: 'bot',
    text: 'Төлбөр баталгаажлаа. Захиалга #PB-10428 баталгаажсан, маргааш хүргэгдэнэ.',
    meta: 'автоматаар баталгаажсан',
  },
];

const FLOW_ICONS = [MessageCircle, Bot, QrCode, CheckCircle2];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 aurora" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 grid-lines" aria-hidden="true" />

      <div className="container-x relative grid items-center gap-14 pb-20 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-20">
        <div>
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-300" />
            Early access — тун удахгүй
          </span>

          <h1 className="mt-6 text-[2.6rem] font-bold leading-[1.1] tracking-tight sm:text-6xl">
            Мессеж бүрийг <span className="text-gradient">борлуулалт</span> болго.
          </h1>

          <p className="mt-6 max-w-xl lead">{HERO.description}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="#early-access" className="btn-primary">
              {HERO.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#how-it-works" className="btn-ghost">
              {HERO.secondaryCta}
            </Link>
          </div>

          <ol className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {HERO.flow.map((step, i) => {
              const StepIcon = FLOW_ICONS[i];
              return (
                <li
                  key={step}
                  className="rounded-xl border border-ink-700 bg-ink-850/60 px-3 py-3 text-center"
                >
                  <StepIcon
                    className={`mx-auto h-4 w-4 ${i === 3 ? 'text-mint-400' : 'text-brand-300'}`}
                    aria-hidden="true"
                  />
                  <span className="mt-2 block text-[11px] leading-tight text-white/60">{step}</span>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="relative">
          <div
            className="pointer-events-none absolute -inset-6 rounded-full bg-brand-500/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <PhoneFrame>
              <ChatMockup bubbles={CONVERSATION} title="Ариунаа" subtitle="Messenger чат" />
            </PhoneFrame>

            <div className="absolute -bottom-4 -left-2 hidden rounded-2xl border border-ink-600 bg-ink-850/95 px-4 py-3 shadow-card backdrop-blur sm:block lg:-left-8">
              <p className="text-[10px] uppercase tracking-wider text-white/40">Захиалга</p>
              <p className="text-sm font-bold text-brand-200">178,000₮</p>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-mint-400">
                <CheckCircle2 className="h-3 w-3" /> Төлбөр баталгаажсан
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
