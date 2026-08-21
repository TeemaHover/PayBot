'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';

/**
 * Scroll reveal — хэсэг дэлгэцэнд орж ирэхэд нэг удаа fade-up хийнэ.
 *
 * Агуулга **анхнаасаа харагдана**. Зөвхөн JS ажиллаж эхэлсэн үед л
 * `html.js-anim` класс нэмэгдэж, дараа нь нуугдаад reveal хийгддэг.
 * Ингэснээр JS ажиллахгүй, эсвэл IntersectionObserver callback ирэхгүй
 * (жишээ нь background таб) тохиолдолд ч хуудас хоосон харагдахгүй.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  /** Секундээр илэрхийлсэн саатал (жишээ: 0.1) */
  delay?: number;
  as?: 'div' | 'li' | 'span';
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // JS ажиллаж байгаа нь батлагдсан үед л нуух горимыг асаана.
    document.documentElement.classList.add('js-anim');

    const show = () => el.classList.add('is-visible');

    if (typeof IntersectionObserver === 'undefined') {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    );

    observer.observe(el);

    // Аюулгүйн тор: observer ямар нэг шалтгаанаар ажиллахгүй бол
    // (background таб, throttling гэх мэт) агуулгыг заавал харуулна.
    const failsafe = window.setTimeout(show, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={clsx('reveal', className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}
