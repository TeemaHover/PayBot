-- PayBot waitlist. Апп ажиллах үедээ энэ хүснэгтийг автоматаар үүсгэдэг
-- (src/lib/db.ts → ensureSchema), энэ файл нь гараар үүсгэх/шалгах зориулалттай.
CREATE TABLE IF NOT EXISTS WAIT_LIST (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT        NOT NULL,
  social_page TEXT        NOT NULL,
  phone       TEXT        NOT NULL UNIQUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
