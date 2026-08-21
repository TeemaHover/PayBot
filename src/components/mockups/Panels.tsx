import clsx from 'clsx';
import { ArrowUpRight, CheckCircle2, Clock3, Package, Wallet } from 'lucide-react';

const mnt = (n: number) => `${new Intl.NumberFormat('en-US').format(n)}₮`;

/** B — Order Management: a Messenger conversation turned into a structured order. */
export function OrderPanel({ className }: { className?: string }) {
  return (
    <div className={clsx('rounded-2xl border border-ink-200 bg-white p-5 shadow-card', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-ink-500">Захиалга</p>
          <p className="text-sm font-semibold">#PB-10428</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-600">
          <Clock3 className="h-3 w-3" /> Төлбөр хүлээгдэж буй
        </span>
      </div>

      <div className="mt-4 space-y-2.5 border-t border-ink-200 pt-4">
        {[
          ['Хэрэглэгч', 'Б. Ариунаа'],
          ['Утас', '9911-2233'],
          ['Бүтээгдэхүүн', 'Ноосон цамц — Хар, M'],
          ['Тоо ширхэг', '2'],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4 text-sm">
            <span className="text-ink-500">{k}</span>
            <span className="font-medium text-ink-900">{v}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-ink-200 pt-4">
        <span className="text-sm text-ink-500">Нийт дүн</span>
        <span className="text-xl font-bold text-brand-700">{mnt(178000)}</span>
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-[11px] text-ink-400">
        <Package className="h-3.5 w-3.5" />
        Мессежийн ярианаас автоматаар үүсгэсэн
      </p>
    </div>
  );
}

/** C — Payment: the QPay step, with the order status flipping to paid. */
export function PaymentPanel({ className }: { className?: string }) {
  return (
    <div className={clsx('rounded-2xl border border-ink-200 bg-white p-5 shadow-card', className)}>
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-aqua-500/10 text-aqua-600">
          <Wallet className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold">QPay төлбөр</p>
          <p className="text-[11px] text-ink-500">Захиалга #PB-10428</p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-5">
        <QrArt />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-wider text-ink-500">Төлөх дүн</p>
          <p className="text-2xl font-bold">{mnt(178000)}</p>
          <p className="mt-2 text-xs text-ink-500">
            Банкны аппаараа уншуулж төлнө. Төлбөр орсныг PayBot автоматаар шалгана.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-2 border-t border-ink-200 pt-4">
        {[
          { label: 'Нэхэмжлэх үүссэн', done: true },
          { label: 'Хэрэглэгч төлбөр төлсөн', done: true },
          { label: 'Захиалга баталгаажсан', done: true },
        ].map((row) => (
          <div key={row.label} className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-mint-600" />
            <span className="text-ink-800">{row.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** D — Dashboard: the merchant overview named in the brief. */
export function DashboardPanel({ className }: { className?: string }) {
  const stats = [
    { label: 'Нийт захиалга', value: '1,284', trend: '+12%' },
    { label: 'Төлөгдсөн', value: '1,097', trend: '+9%' },
    { label: 'Төлөгдөөгүй', value: '187', trend: '−4%' },
    { label: 'Орлого', value: '48.2сая₮', trend: '+18%' },
  ];
  const bars = [42, 58, 47, 71, 63, 88, 76, 94, 82, 69, 91, 100];

  return (
    <div className={clsx('rounded-2xl border border-ink-200 bg-white p-5 shadow-card', className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Merchant Dashboard</p>
        <span className="chip rounded-full border border-ink-200 px-2.5 py-1 text-[11px] text-ink-500">
          Сүүлийн 30 хоног
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-2.5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-ink-200 bg-ink-50 p-3">
            <dt className="text-[10px] uppercase tracking-wide text-ink-500">{s.label}</dt>
            <dd className="mt-1 flex items-baseline gap-2">
              <span className="text-lg font-bold">{s.value}</span>
              <span className="text-[11px] font-semibold text-mint-600">{s.trend}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 rounded-xl border border-ink-200 bg-ink-50 p-3">
        <p className="text-[10px] uppercase tracking-wide text-ink-500">Өдрийн захиалга</p>
        <div className="mt-3 flex h-20 items-end gap-1.5">
          {bars.map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className="flex-1 rounded-sm bg-gradient-to-t from-brand-600 to-brand-300"
            />
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {[
          ['#PB-10428', 'Төлөгдсөн', true],
          ['#PB-10427', 'Хүлээгдэж буй', false],
        ].map(([id, status, paid]) => (
          <div
            key={id as string}
            className="flex items-center justify-between rounded-lg border border-ink-200 px-3 py-2 text-sm"
          >
            <span className="text-ink-700">{id as string}</span>
            <span
              className={clsx(
                'flex items-center gap-1 text-xs font-semibold',
                paid ? 'text-mint-600' : 'text-amber-600',
              )}
            >
              {status as string}
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Deterministic QR-looking artwork — no external image, no real payment data. */
function QrArt() {
  const cells = Array.from({ length: 49 }, (_, i) => {
    const x = i % 7;
    const y = Math.floor(i / 7);
    return (x * 7 + y * 3 + ((x * y) % 5)) % 3 !== 0;
  });

  return (
    <div
      aria-hidden="true"
      className="grid h-24 w-24 shrink-0 grid-cols-7 gap-[3px] rounded-xl border border-ink-200 bg-white p-2"
    >
      {cells.map((on, i) => (
        <span key={i} className={clsx('rounded-[2px]', on ? 'bg-ink-900' : 'bg-transparent')} />
      ))}
    </div>
  );
}
