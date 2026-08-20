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

`POST /api/waitlist` — Нэр, Бизнесийн нэр, Утас, Имэйл, Бизнесийн төрөл.

- Талбар бүрийг серверт шалгаж, **монгол хэл дээр** алдааг талбар бүрийн доор харуулна
- Утасны дугаар: 8 орон. `+976`, зай, зураас бүгдийг зөв танина (`+976 8811 4455` → `88114455`)
- Нэг имэйлээр давхар бүртгүүлэхийг хориглоно (409)
- Амжилттай бол бүртгэлийн дугаартай баталгаажуулах мессеж харуулна

Бүртгэлүүд `data/waitlist.json` файлд хадгалагдана (git-д оруулаагүй).
`GET /api/waitlist` нь зөвхөн нийт тоог буцаана.

**Production-д гаргахын өмнө:** энэ файлын оронд жинхэнэ өгөгдлийн сан (Postgres, Supabase гэх мэт)
ашиглах хэрэгтэй — serverless орчинд файл систем тогтвортой хадгалагддаггүй. Мөн хувийн мэдээлэл
агуулдаг тул бүртгэлийн жагсаалтыг харуулах ямар ч хуудас нэмэх бол заавал нэвтрэлтээр хамгаална
(тиймээс энэ хувилбарт admin хуудас **зориудаар** ороогүй).

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
    waitlist.ts           бүртгэл хадгалах, утас шалгах логик
```

Текст засах бол `src/lib/content.ts` — component-д гар хүрэх шаардлагагүй.

---

## Дизайн

- Өнгө: гүн ягаан-индиго (`brand`) + цэнхэр (`aqua`) + ногоон (`mint`, төлбөр баталгаажсан төлөв)
- Фонт: Inter, кирилл subset-тэй тул монгол текст зөв харагдана
- Бүх хэсэг responsive; мобайл дээр хэвтээ гүйлгэлт байхгүй (0px шалгасан)
- `prefers-reduced-motion` тохиргоог хүндэтгэнэ

---

## Шалгасан зүйлс

- `tsc --noEmit` алдаагүй, production build амжилттай, landing page бүрэн статик
- Waitlist: зөв бүртгэл (201), `+976` угтвар, давхардсан имэйл (409), талбар бүрийн алдаа (400),
  7 оронтой утас татгалзсан — API болон формоор хоёуланг нь туршсан
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
