import { ensureSchema, query } from '@/lib/db';

export type WaitlistEntry = {
  id: string;
  name: string;
  socialPage: string;
  phone: string;
  createdAt: string;
};

type Row = {
  id: string;
  name: string;
  social_page: string;
  phone: string;
  created_at: Date;
};

const toEntry = (row: Row): WaitlistEntry => ({
  id: String(row.id),
  name: row.name,
  socialPage: row.social_page,
  phone: row.phone,
  createdAt: row.created_at.toISOString(),
});

/** Mongolian mobile numbers are 8 digits, optionally prefixed with +976. */
export function normalizePhone(raw: string) {
  const digits = raw.replace(/\D/g, '');
  const local = digits.startsWith('976') && digits.length > 8 ? digits.slice(3) : digits;
  return { valid: local.length === 8, value: local };
}

export async function listEntries(): Promise<WaitlistEntry[]> {
  await ensureSchema();
  const { rows } = await query<Row>(
    'SELECT id, name, social_page, phone, created_at FROM WAIT_LIST ORDER BY id ASC',
  );
  return rows.map(toEntry);
}

export async function countEntries(): Promise<number> {
  await ensureSchema();
  const { rows } = await query<{ count: string }>('SELECT COUNT(*)::text AS count FROM WAIT_LIST');
  return Number(rows[0]?.count ?? 0);
}

export async function addEntry(input: Omit<WaitlistEntry, 'id' | 'createdAt'>) {
  await ensureSchema();

  const { rows } = await query<{ id: string }>(
    `INSERT INTO WAIT_LIST (name, social_page, phone)
     VALUES ($1, $2, $3)
     ON CONFLICT (phone) DO NOTHING
     RETURNING id`,
    [input.name, input.socialPage, input.phone],
  );

  if (rows.length === 0) {
    return { duplicate: true as const };
  }

  // Position = хэдэн дэх бүртгэл болсон бэ.
  const { rows: posRows } = await query<{ position: string }>(
    'SELECT COUNT(*)::text AS position FROM WAIT_LIST WHERE id <= $1',
    [rows[0].id],
  );

  return { duplicate: false as const, id: rows[0].id, position: Number(posRows[0].position) };
}
