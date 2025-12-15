import React from 'react';
import { WORK_PAGE_PADDING, WORK_PAGE_CONTAINER } from '@/utils/layout';

interface PageShellProps {
  children: React.ReactNode;
  outerClassName?: string;
  innerClassName?: string;
}

export default function PageShell({
  children,
  outerClassName = '',
  innerClassName = '',
}: PageShellProps) {
  return (
    <div className={`min-h-screen bg-[var(--background)] text-[var(--foreground)] pb-20 ${WORK_PAGE_PADDING} ${outerClassName}`}>
      <div className={`${WORK_PAGE_CONTAINER} ${innerClassName}`}>{children}</div>
    </div>
  );
}
