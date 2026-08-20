import { NextResponse } from 'next/server';
import { addEntry, countEntries, normalizePhone } from '@/lib/waitlist';
import { BUSINESS_TYPES } from '@/lib/content';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({ count: countEntries() });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, string> | null;
  if (!body) {
    return NextResponse.json({ error: 'Хүсэлт буруу байна.' }, { status: 400 });
  }

  const name = (body.name ?? '').trim();
  const business = (body.business ?? '').trim();
  const email = (body.email ?? '').trim();
  const businessType = (body.businessType ?? '').trim();
  const phone = normalizePhone(body.phone ?? '');

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = 'Нэрээ бүрэн бичнэ үү.';
  if (business.length < 2) errors.business = 'Бизнесийн нэрээ бичнэ үү.';
  if (!phone.valid) errors.phone = 'Утасны дугаар 8 оронтой байх ёстой.';
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Зөв имэйл хаяг оруулна уу.';
  if (!BUSINESS_TYPES.includes(businessType)) errors.businessType = 'Бизнесийн төрлөө сонгоно уу.';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Мэдээллээ шалгана уу.', errors }, { status: 400 });
  }

  const result = addEntry({ name, business, phone: phone.value, email, businessType });

  if (result.duplicate) {
    return NextResponse.json(
      { error: 'Энэ имэйл хаягаар аль хэдийн бүртгүүлсэн байна.' },
      { status: 409 },
    );
  }

  return NextResponse.json({ ok: true, position: result.position }, { status: 201 });
}
