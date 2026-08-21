'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { EARLY_ACCESS, BUSINESS_TYPES } from '@/lib/content';

type FieldErrors = Partial<Record<'name' | 'business' | 'phone' | 'email' | 'businessType', string>>;

export function EarlyAccess() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState('');
  const [position, setPosition] = useState<number | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form)) as Record<string, string>;

    setStatus('sending');
    setErrors({});
    setMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors ?? {});
        setMessage(data.error ?? 'Алдаа гарлаа. Дахин оролдоно уу.');
        setStatus('idle');
        return;
      }

      setPosition(data.position ?? null);
      setStatus('done');
      form.reset();
    } catch {
      setMessage('Сүлжээний алдаа. Дахин оролдоно уу.');
      setStatus('idle');
    }
  }

  return (
    <section id="early-access" className="relative overflow-hidden section">
      <div className="pointer-events-none absolute inset-0 aurora" aria-hidden="true" />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <span className="eyebrow">Early Access</span>
          <h2 className="mt-5 h2">{EARLY_ACCESS.title}</h2>
          <p className="mt-5 lead">{EARLY_ACCESS.description}</p>

          <p className="mt-8 flex items-start gap-2.5 text-sm text-ink-500">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
            {EARLY_ACCESS.note}
          </p>
        </div>

        {status === 'done' ? (
          <div className="card grid place-items-center p-10 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-mint-500/10 text-mint-600">
              <CheckCircle2 className="h-7 w-7" />
            </span>
            <h3 className="mt-5 text-xl font-bold">Бүртгэл амжилттай!</h3>
            <p className="mt-2 max-w-sm text-sm text-ink-600">
              Та waitlist-д бүртгэгдлээ{position ? ` — ${position}-р дугаартай` : ''}. PayBot-ийн
              нээлтийн мэдээллийг таны үлдээсэн холбоо барих мэдээллээр хүргэнэ.
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="btn-ghost btn-sm mt-6"
            >
              Өөр бизнес бүртгүүлэх
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="card space-y-4 p-6 sm:p-8" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="name"
                label={EARLY_ACCESS.fields.name}
                placeholder="Б. Ариунаа"
                error={errors.name}
              />
              <Field
                id="business"
                label={EARLY_ACCESS.fields.business}
                placeholder="Ариун Шоп"
                error={errors.business}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="phone"
                label={EARLY_ACCESS.fields.phone}
                placeholder="9911-2233"
                type="tel"
                inputMode="tel"
                error={errors.phone}
              />
              <Field
                id="email"
                label={EARLY_ACCESS.fields.email}
                placeholder="ariunaa@shop.mn"
                type="email"
                error={errors.email}
              />
            </div>

            <div>
              <label className="label" htmlFor="businessType">
                {EARLY_ACCESS.fields.businessType}
              </label>
              <select
                id="businessType"
                name="businessType"
                defaultValue=""
                className={clsx('input', errors.businessType && 'border-rose-400')}
                aria-invalid={Boolean(errors.businessType)}
              >
                <option value="" disabled>
                  Сонгоно уу
                </option>
                {BUSINESS_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {errors.businessType && (
                <p className="mt-1.5 text-xs text-rose-600">{errors.businessType}</p>
              )}
            </div>

            {message && <p className="text-sm text-rose-600">{message}</p>}

            <button type="submit" disabled={status === 'sending'} className="btn-primary w-full">
              {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" />}
              {EARLY_ACCESS.cta}
            </button>

            <p className="text-center text-xs text-ink-500">
              Бүртгүүлснээр таны мэдээллийг зөвхөн PayBot-ийн нээлтийн мэдээлэл хүргэхэд ашиглана.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  placeholder,
  type = 'text',
  inputMode,
  error,
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  inputMode?: 'tel' | 'text' | 'email';
  error?: string;
}) {
  return (
    <div>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={clsx('input', error && 'border-rose-400')}
      />
      {error && <p className="mt-1.5 text-xs text-rose-600">{error}</p>}
    </div>
  );
}
