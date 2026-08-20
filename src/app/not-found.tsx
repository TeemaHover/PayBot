import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-5 text-center">
      <div>
        <p className="text-sm font-semibold tracking-wider text-brand-300">404</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Хуудас олдсонгүй</h1>
        <p className="mt-3 text-white/50">
          Таны хайсан хуудас байхгүй эсвэл хаяг өөрчлөгдсөн байна.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Нүүр хуудас руу буцах
        </Link>
      </div>
    </div>
  );
}
