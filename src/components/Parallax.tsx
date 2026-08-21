'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';

/**
 * Хулганы хөдөлгөөнийг дагаж маш бага зэрэг хазайх (parallax) эффект.
 * Зөвхөн чимэглэл тул `prefers-reduced-motion` болон хүрэлтийн (touch)
 * төхөөрөмж дээр огт ажиллахгүй — агуулга хэвийн байрандаа хэвээр байна.
 */
export function Parallax({
  children,
  className,
  strength = 10,
}: {
  children: React.ReactNode;
  className?: string;
  /** Хамгийн их хазайлт (px) */
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (reduced || !fine) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;

    const apply = () => {
      frame = 0;
      el.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
    };

    const onMove = (e: MouseEvent) => {
      // Дэлгэцийн төвөөс хазайсан хэмжээг -1..1 болгож хэмжинэ.
      const dx = (e.clientX / window.innerWidth) * 2 - 1;
      const dy = (e.clientY / window.innerHeight) * 2 - 1;
      targetX = -dx * strength;
      targetY = -dy * strength;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
      el.style.transform = '';
    };
  }, [strength]);

  return (
    <div ref={ref} className={clsx('parallax', className)}>
      {children}
    </div>
  );
}
