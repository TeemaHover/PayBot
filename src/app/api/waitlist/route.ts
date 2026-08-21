import { NextResponse } from 'next/server';
import { addEntry, countEntries, normalizePhone } from '@/lib/waitlist';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json({ count: await countEntries() });
  } catch (err) {
    console.error('[waitlist] count failed', err);
    return NextResponse.json({ error: 'Өгөгдлийн сантай холбогдож чадсангүй.' }, { status: 503 });
  }
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, string> | null;
  if (!body) {
    return NextResponse.json({ error: 'Хүсэлт буруу байна.' }, { status: 400 });
  }

  const name = (body.name ?? '').trim();
  const socialPage = (body.socialPage ?? '').trim();
  const phone = normalizePhone(body.phone ?? '');

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = 'Нэрээ бүрэн бичнэ үү.';
  if (socialPage.length < 3) errors.socialPage = 'Бизнесийн хуудасны хаягаа бичнэ үү.';
  if (!phone.valid) errors.phone = 'Утасны дугаар 8 оронтой байх ёстой.';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Мэдээллээ шалгана уу.', errors }, { status: 400 });
  }

  try {
    const result = await addEntry({ name, socialPage, phone: phone.value });

    if (result.duplicate) {
      return NextResponse.json(
        { error: 'Энэ утасны дугаараар аль хэдийн бүртгүүлсэн байна.' },
        { status: 409 },
      );
    }

    return NextResponse.json({ ok: true, position: result.position }, { status: 201 });
  } catch (err) {
    console.error('[waitlist] insert failed', err);
    return NextResponse.json({ error: 'Серверийн алдаа. Дахин оролдоно уу.' }, { status: 500 });
  }
}
