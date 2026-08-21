'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { SHOWCASE, type ShowcaseKey } from '@/lib/content';
import { ChatMockup, type Bubble } from '@/components/mockups/ChatMockup';
import { OrderPanel, PaymentPanel, DashboardPanel } from '@/components/mockups/Panels';

const SUPPORT_CHAT: Bubble[] = [
  { from: 'user', text: 'Ажлын цаг хэдэн цаг хүртэл вэ?' },
  { from: 'bot', text: 'Даваа–Баасан 10:00–20:00, Бямба 11:00–18:00 хүртэл ажиллана.' },
  { from: 'user', text: 'Хүргэлт хэдэн төгрөг вэ?' },
  {
    from: 'bot',
    text: 'УБ хотод 5,000₮, 150,000₮-өөс дээш захиалгад үнэгүй. Орон нутагт унаагаар илгээнэ.',
    meta: 'бизнесийн мэдээллээс хариулсан',
  },
];

const ORDER_CHAT: Bubble[] = [
  { from: 'user', text: '2ш авъя. Нэр Ариунаа, утас 9911-2233.' },
  {
    from: 'bot',
    text: 'Баярлалаа! Захиалга #PB-10428 үүслээ. Нийт 178,000₮.',
    meta: 'захиалга системд бүртгэгдлээ',
  },
];

export function ProductShowcase() {
  const [active, setActive] = useState<ShowcaseKey>('support');
  const item = SHOWCASE.find((s) => s.key === active)!;

  return (
    <section id="product" className="section">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Бүтээгдэхүүн</span>
          <h2 className="mt-5 h2">Нэг систем, дөрвөн алхам</h2>
          <p className="mt-5 lead">
            Хэрэглэгчийн эхний мессежээс баталгаажсан захиалга хүртэл — бүгд PayBot дотор.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2" role="tablist">
          {SHOWCASE.map((s) => (
            <button
              key={s.key}
              role="tab"
              aria-selected={s.key === active}
              onClick={() => setActive(s.key)}
              className={clsx(
                'flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition',
                s.key === active
                  ? 'border-brand-400 bg-brand-50 text-brand-700'
                  : 'border-ink-200 bg-ink-50 text-ink-600 hover:border-ink-300 hover:text-ink-900',
              )}
            >
              <span
                className={clsx(
                  'grid h-5 w-5 place-items-center rounded-md text-[11px] font-bold',
                  s.key === active ? 'bg-brand-700 text-white' : 'bg-ink-100 text-ink-500',
                )}
              >
                {s.letter}
              </span>
              {s.tab}
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
            <p className="mt-4 max-w-lg leading-relaxed text-ink-600">{item.body}</p>

            <ul className="mt-8 space-y-2.5">
              {DETAILS[item.key].map((d) => (
                <li key={d} className="flex items-start gap-2.5 text-sm text-ink-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-4 rounded-3xl bg-brand-50 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative">
              {item.key === 'support' && (
                <ChatMockup bubbles={SUPPORT_CHAT} title="Болд" subtitle="Messenger чат" />
              )}
              {item.key === 'orders' && (
                <div className="space-y-4">
                  <ChatMockup
                    bubbles={ORDER_CHAT}
                    title="Ариунаа"
                    subtitle="Messenger чат"
                    animate={false}
                  />
                  <OrderPanel />
                </div>
              )}
              {item.key === 'payment' && <PaymentPanel />}
              {item.key === 'dashboard' && <DashboardPanel />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const DETAILS: Record<ShowcaseKey, string[]> = {
  support: [
    'Бүтээгдэхүүн, үнэ, үлдэгдэл, хүргэлтийн мэдээллээр хариулна',
    'FAQ болон бизнесийн дүрмээ системд оруулна',
    'Хариу өгөх хугацаа секундээр хэмжигдэнэ',
  ],
  orders: [
    'Ярианаас нэр, утас, бүтээгдэхүүн, тоо ширхгийг цуглуулна',
    'Захиалга автоматаар бүртгэгдэж дугаар авна',
    'Дутуу мэдээллийг PayBot өөрөө тодруулж асууна',
  ],
  payment: [
    'QPay нэхэмжлэхийг чат дотор шууд илгээнэ',
    'Төлбөр орсон эсэхийг автоматаар шалгана',
    'Гараар шалгах, баталгаажуулах ажил шаардлагагүй',
  ],
  dashboard: [
    'Нийт захиалга, төлөгдсөн, төлөгдөөгүй тоо нэг дэлгэцэнд',
    'Өдөр тутмын орлого, шинэ захиалгын хандлага',
    'Хэрэглэгчийн мэдээлэл болон захиалгын түүх',
  ],
};
