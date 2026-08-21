import { Pool } from 'pg';

/**
 * Single pooled connection, reused across hot reloads in dev so we don't leak
 * sockets every time a route file is recompiled.
 */
const globalForDb = globalThis as unknown as { paybotPool?: Pool };

function createPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL тохируулаагүй байна.');
  }

  return new Pool({
    connectionString,
    // Railway-ийн Postgres нь TLS-тэй ч дотоод сертификаттай тул шалгалтыг сулруулна.
    ssl: /sslmode=require|railway|render|supabase|neon/.test(connectionString)
      ? { rejectUnauthorized: false }
      : undefined,
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });
}

/**
 * Lazy — build үед DATABASE_URL байхгүй байж болох тул модуль ачаалагдах үед биш,
 * эхний хүсэлт ирэх үед л холболт үүсгэнэ.
 */
export function getPool() {
  globalForDb.paybotPool ??= createPool();
  return globalForDb.paybotPool;
}

export function query<T extends Record<string, unknown>>(text: string, params?: unknown[]) {
  return getPool().query<T>(text, params);
}

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS WAIT_LIST (
    id          BIGSERIAL PRIMARY KEY,
    name        TEXT        NOT NULL,
    social_page TEXT        NOT NULL,
    phone       TEXT        NOT NULL UNIQUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
  );
`;

let ready: Promise<void> | null = null;

/** Creates the WAIT_LIST table on first use. Safe to call on every request. */
export function ensureSchema() {
  ready ??= getPool()
    .query(SCHEMA)
    .then(() => undefined)
    .catch((err) => {
      ready = null;
      throw err;
    });
  return ready;
}
