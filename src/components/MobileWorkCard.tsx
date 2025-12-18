'use client';

import React from 'react';
import MediaWithFallback from '@/components/MediaWithFallback';
import { Work } from '@/data/content';
import {
  WORK_MEDIA_ASPECT,
  WORK_CARD_TITLE_SPACING,
  WORK_CARD_META_MARGIN,
} from '@/utils/layout';

interface MobileWorkCardProps {
  work: Work;
  onClick?: () => void;
  cta?: React.ReactNode;
}

export default function MobileWorkCard({ work, onClick, cta }: MobileWorkCardProps) {  
  const imageSrc = work.coverWebp || work.imageUrl; // burada webp / cover kullanıyorsun

  return (
    <article
      className="relative flex flex-col gap-4 cursor-pointer"
      onClick={() => onClick?.()}
    >
      <div className={`relative w-full overflow-hidden bg-black/70 ${WORK_MEDIA_ASPECT}`}>
        {imageSrc ? (
          <MediaWithFallback
            kind="image"
            src={imageSrc}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-white/5 text-xs text-white/50">
            MEDIA MISSING
          </div>
        )}
      </div>

      <div>
        <h3 className={WORK_CARD_TITLE_SPACING}>{work.title}</h3>
        <div className={WORK_CARD_META_MARGIN}>
          <span>{work.year}</span>
        </div>
        {cta}
      </div>
    </article>
  );
}
