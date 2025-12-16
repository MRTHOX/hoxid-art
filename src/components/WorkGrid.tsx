import React from 'react';
import { WORK_GRID_GAP } from '@/utils/layout';

interface WorkGridProps {
  children: React.ReactNode;
  className?: string;
}

export default function WorkGrid({ children, className }: WorkGridProps) {
  const baseClass = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${WORK_GRID_GAP} supports-[hover:hover]:group/grid`;
  return <div className={className ? `${baseClass} ${className}` : baseClass}>{children}</div>;
}
