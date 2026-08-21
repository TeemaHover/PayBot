# PayBot — Website

**PayBot Website Structure & Content Brief (2026)** баримтын дагуу бүтээсэн early-access / waitlist
landing page. Бүх агуулга, section-ий дараалал brief-тэй яг тохирно.

Технологи: **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS 3**.
Гадны үйлчилгээ шаардахгүй — бүрэн офлайн ажиллана.

---

## Ажиллуулах

```bash
npm install
```

```bash
npm run dev
```

<http://localhost:3000> хаягаар нээнэ.

Production:

```bash
npm run build && npm start
```

---

## Section-ий бүтэц (brief-ийн flow)

```
NAVBAR → HERO → PROBLEM → BEFORE/AFTER → HOW IT WORKS → PRODUCT SHOWCASE →
FEATURES → USE CASES → BENEFITS → EARLY ACCESS → EARLY ACCESS PERKS → FAQ → FINAL CTA → FOOTER
```

| # | Section | Тайлбар |
| --- | --- | --- |
| 1 | Navbar | Logo, 4 цэс, үндсэн CTA. Scroll хийхэд background нь blur болно. Мобайл цэстэй. |
| 2 | Hero | Гол гарчиг, тайлбар, 2 CTA + Messenger чатны бодит mockup (анимацтай) |
| 3 | Problem | 6 давтагддаг ажлын жагсаалт + гол message |
| 4 | Before / After | Хоёр багана — гараар vs PayBot-той урсгал |
| 5 | How It Works | 5 алхмын timeline |
| 6 | Product Showcase | A/B/C/D таб — чат, захиалга, QPay төлбөр, dashboard mockup |
| 7 | Features | 01–06 боломж |
| 8 | Use Cases | 6 төрлийн бизнес |
| 9 | Benefits | 5 давуу тал |
| 10 | Early Access | **Ажиллаж буй** waitlist форм |
| 11 | Early Access-ийн давуу тал | 3 карт |
| 12 | FAQ | 6 асуулт, accordion |
| 13 | Final CTA | Төгсгөлийн уриалга |
| 14 | Footer | Цэс, холбоо барих, эрхийн мэдэгдэл |

Brief дэх гол чиглэл — "Messenger дээр ирсэн хэрэглэгч → AI харилцаа → захиалга → QPay → төлбөр
баталгаажсан" гэсэн нэг story-г Hero-гийн чат mockup, Before/After, How It Works, Product Showcase
дөрвүүлээ дахин дахин харуулж өгсөн.

---

## Waitlist форм (жинхэнэ ажиллагаатай)

Форм **гурван талбартай**: Нэр, Бизнесийн сошиал хуудас, Утасны дугаар.

`POST /api/waitlist` — `{ name, socialPage, phone }`

- Талбар бүрийг серверт шалгаж, **монгол хэл дээр** алдааг талбар бүрийн доор харуулна
- Утасны дугаар: 8 орон. `+976`, зай, зураас бүгдийг зөв танина (`+976 8811 4455` → `88114455`)
- Нэг утасны дугаараар давхар бүртгүүлэхийг хориглоно (409 — `phone` баганад UNIQUE)
- Амжилттай бол бүртгэлийн дугаартай баталгаажуулах мессеж харуулна

`GET /api/waitlist` нь зөвхөн нийт тоог буцаана.

**Хувийн мэдээлэл:** бүртгэлийн жагсаалтыг харуулах хуудас нэмэх бол заавал нэвтрэлтээр хамгаална
(тиймээс энэ хувилбарт admin хуудас **зориудаар** ороогүй).

---

## Өгөгдлийн сан (PostgreSQL)

Бүртгэлүүд PostgreSQL-ийн **`WAIT_LIST`** хүснэгтэд хадгалагдана:

| Багана | Төрөл | Тайлбар |
| --- | --- | --- |
| `id` | `BIGSERIAL` | primary key |
| `name` | `TEXT NOT NULL` | Нэр |
| `social_page` | `TEXT NOT NULL` | Бизнесийн сошиал хуудас |
| `phone` | `TEXT NOT NULL UNIQUE` | Утас (8 орон, цэвэрлэгдсэн) |
| `created_at` | `TIMESTAMPTZ` | бүртгүүлсэн огноо |

> Postgres-д хашилтгүй нэр жижиг үсэг рүү хувирдаг тул хүснэгт нь бодитоор `wait_list` нэртэй
> үүснэ. `SELECT * FROM WAIT_LIST` бас `SELECT * FROM wait_list` хоёул адилхан ажиллана.

Хүснэгтийг апп эхний хүсэлт дээрээ автоматаар үүсгэнэ (`src/lib/db.ts` → `ensureSchema`),
тиймээс migration гараар ажиллуулах шаардлагагүй. Гараар үүсгэх бол `db/init.sql`.

Ганц тохиргоо шаардана:

```
DATABASE_URL=postgres://user:password@host:5432/dbname
```

Локал docker-compose орчинд: `postgres://paybot:paybot@localhost:5433/paybot`
(хостоос), контейнер дотроос `postgres://paybot:paybot@db:5432/paybot`.

---

## Docker-оор ажиллуулах

```bash
docker compose up -d --build
```

- `db` — `postgres:16-alpine`, өгөгдөл нь `paybot-pgdata` volume-д үлдэнэ
- `web` — Next.js (standalone build), http://localhost:3000

### DBeaver / GUI хэрэгслээс холбогдох

| Талбар | Утга |
| --- | --- |
| Host | `localhost` |
| Port | **`5433`** |
| Database | `paybot` |
| Username | `paybot` |
| Password | `paybot` |

> **Яагаад 5433 гэж?** Windows дээр native PostgreSQL service суулгасан бол 5432 портыг тэр
> эзэлчихсэн байдаг. Docker порт map хийж чадсан мэт харагдавч холболт native сервер рүү ордог
> тул `password authentication failed for user "paybot"` алдаа гарна. Тиймээс контейнерийн
> портыг хостын **5433** руу гаргасан. Апп нь дотоод сүлжээгээр `db:5432`-оор холбогддог
> учир энэ өөрчлөлт түүнд нөлөөлөхгүй.

Хүснэгтээ шалгах:

```bash
docker exec paybot-db psql -U paybot -d paybot -c "SELECT * FROM WAIT_LIST;"
```

Зогсоох (өгөгдөл хэвээр үлдэнэ): `docker compose down` — өгөгдлийг нь ч устгах бол
`docker compose down -v`.

---

## Railway-д deploy хийх

1. Railway дээр төслөө үүсгээд **New → Database → PostgreSQL** нэмнэ.
2. Repo-гоо service болгож холбоно. Root-д `Dockerfile` байгаа тул Railway түүгээр build хийнэ
   (`railway.json` дотор `builder: DOCKERFILE` заасан).
3. Web service-ийн **Variables** хэсэгт:

   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   ```

   (Railway-ийн reference хувьсагч — Postgres service-ийнхээ нэрийг тааруулна.)
4. **Networking → Generate Domain** дээр target port-ыг **8080** гэж өгнө.
5. Deploy. Эхний хүсэлт дээр `WAIT_LIST` хүснэгт автоматаар үүснэ.

> **Порт (чухал):** Railway контейнерт `PORT=8080` гэж өөрөө оруулдаг ба энэ нь Dockerfile доторх
> `ENV PORT=3000`-г дарж бичнэ. Тиймээс апп 8080 дээр сонсоно. Домэйны target port-ыг 3000 гэж
> үлдээвэл `502 Application failed to respond` алдаа гарна. Локал docker-compose дээр PORT
> дарагдахгүй тул 3000 хэвээр ажиллана.

Одоогийн deploy: https://paybot-production-c1ef.up.railway.app

---

## Файлын бүтэц

```
src/
  app/
    page.tsx              бүх section-ийг brief-ийн дарааллаар угсарна
    layout.tsx            lang="mn", Inter (кирилл subset-тэй), SEO meta
    api/waitlist/route.ts waitlist бүртгэлийн API
  components/
    Navbar.tsx, Logo.tsx, Icon.tsx
    sections/             14 section тус бүр тусдаа файл
    mockups/              чат, захиалга, QPay, dashboard-ийн UI mockup
  lib/
    content.ts            brief-ийн БҮХ текст (өөрчлөх бол зөвхөн энэ файл)
    db.ts                 Postgres pool + WAIT_LIST хүснэгтийн schema
    waitlist.ts           бүртгэл хадгалах, утас шалгах логик
db/init.sql               WAIT_LIST хүснэгтийг гараар үүсгэх SQL
Dockerfile                production image (Next.js standalone)
docker-compose.yml        web + postgres локал орчин
railway.json              Railway-д Dockerfile-аар build хийх тохиргоо
```

Текст засах бол `src/lib/content.ts` — component-д гар хүрэх шаардлагагүй.

---

## Дизайн

- Сэдэв: цагаан (light) — цагаан суурь дээр `ink-50` өнгөт хэсгүүд ээлжилнэ
- Өнгө: логоны цэнхэр `#3B9BE0` (`brand`) + туслах цэнхэр (`aqua`) + ногоон (`mint`, төлбөр баталгаажсан төлөв)
- Текст: `ink` саарал шатлал (900 гарчиг, 600 бие, 500 туслах) — WCAG AA хангасан
- Фонт: Inter, кирилл subset-тэй тул монгол текст зөв харагдана
- Бүх хэсэг responsive; мобайл дээр хэвтээ гүйлгэлт байхгүй (0px шалгасан)
- `prefers-reduced-motion` тохиргоог хүндэтгэнэ

---

## Шалгасан зүйлс

- `tsc --noEmit` алдаагүй, production build амжилттай, landing page бүрэн статик
- Waitlist: зөв бүртгэл (201), `+976` угтвар, давхардсан утас (409), талбар бүрийн алдаа (400)
  — Docker дотор ажиллаж буй жинхэнэ Postgres дээр API болон формоор хоёуланг нь туршсан
- Монгол кирилл текст өгөгдлийн санд UTF-8-аар зөв хадгалагдаж байгааг шалгасан
- Product Showcase-ийн 4 таб тус бүр зөв mockup харуулж байгааг браузераар шалгасан
- Мобайл (375px) цэс нээгдэж хаагдана, overflow байхгүй

---

## Тэмдэглэл

- `archive/dropship-benchmark/` — өмнөх benchmark (dropship.io) бүтээц. Устгаагүй, зөвхөн
  архивласан бөгөөд build-д ороогүй (`tsconfig.json` дотор exclude хийсэн). Хэрэггүй бол
  бүтэн folder-ийг устгаж болно.
- QPay интеграц энэ хувилбарт **дүрслэл** байгаа (mockup). Жинхэнэ нэхэмжлэх үүсгэхийн тулд QPay-ийн
  merchant данс, API түлхүүр шаардлагатай.
- Имэйл илгээх үйлчилгээ холбоогүй — бүртгэл зөвхөн хадгалагдана.
- Өмнөх хувилбарын `data/waitlist.json` файлыг апп ашиглахаа больсон (одоо Postgres). Хуучин
  бүртгэл байгаа бол шилжүүлээд файлыг нь устгаж болно.
