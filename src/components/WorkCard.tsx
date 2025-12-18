'use client';

import DesktopWorkCard from './DesktopWorkCard';
import MobileWorkCard from './MobileWorkCard';
import { Work } from '@/data/content';

interface WorkCardProps {
  work: Work;
  onClick?: () => void;
  cta?: React.ReactNode;
}

export default function WorkCard(props: WorkCardProps) {
  return (
    <>
      <div className="hidden md:block">
        <DesktopWorkCard {...props} />
      </div>
      <div className="block md:hidden">
        <MobileWorkCard {...props} />
      </div>
    </>
  );
}
