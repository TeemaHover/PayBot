import fs from 'node:fs';
import path from 'node:path';

export type WaitlistEntry = {
  id: string;
  name: string;
  business: string;
  phone: string;
  email: string;
  businessType: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE = path.join(DATA_DIR, 'waitlist.json');

function readAll(): WaitlistEntry[] {
  try {
    if (!fs.existsSync(FILE)) return [];
    return JSON.parse(fs.readFileSync(FILE, 'utf8')) as WaitlistEntry[];
  } catch {
    return [];
  }
}

function writeAll(rows: WaitlistEntry[]) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(rows, null, 2));
}

export const listEntries = () => readAll();

export const countEntries = () => readAll().length;

/** Mongolian mobile numbers are 8 digits, optionally prefixed with +976. */
export function normalizePhone(raw: string) {
  const digits = raw.replace(/\D/g, '');
  const local = digits.startsWith('976') && digits.length > 8 ? digits.slice(3) : digits;
  return { valid: local.length === 8, value: local };
}

export function addEntry(input: Omit<WaitlistEntry, 'id' | 'createdAt'>) {
  const rows = readAll();
  const email = input.email.trim().toLowerCase();

  if (rows.some((r) => r.email.toLowerCase() === email)) {
    return { duplicate: true as const, position: rows.findIndex((r) => r.email.toLowerCase() === email) + 1 };
  }

  const entry: WaitlistEntry = {
    ...input,
    email,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  rows.push(entry);
  writeAll(rows);
  return { duplicate: false as const, entry, position: rows.length };
}
