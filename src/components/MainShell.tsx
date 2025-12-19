'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { HEADER_OFFSET_CLASS } from '@/utils/layout';

export default function MainShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <main className={isHome ? 'h-[100dvh] overflow-hidden' : HEADER_OFFSET_CLASS}>
      {children}
    </main>
  );
}
