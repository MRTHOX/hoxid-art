'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Work } from '@/data/content';
import { normalizeVideoUrl, safeVideoAttributes } from '@/utils/media';
import { typography } from '@/utils/typography';
import { WORK_MEDIA_ASPECT } from '@/utils/layout';

interface WorkCardProps {
  work: Work;
  onClick?: () => void;
  cta?: React.ReactNode;
}

export default function WorkCard({ work, onClick, cta }: WorkCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hoverCapable, setHoverCapable] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl = normalizeVideoUrl(work.videoUrl);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(hover: hover)');
    const handleChange = (event: MediaQueryListEvent) => setHoverCapable(event.matches);
    setHoverCapable(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasError) return;

    const controlPlayback = async () => {
      try {
        if (hoverCapable && isHovered) {
          await video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      } catch (error) {
        console.warn(`Video playback failed for ${work.title}`, error);
        setHasError(true);
      }
    };

    controlPlayback();
  }, [hasError, hoverCapable, isHovered, work.title]);

  const renderMedia = hasError || !videoUrl ? (
    <div className={`absolute inset-0 flex items-center justify-center bg-white/[0.04] ${typography.meta}`}>
      Media unavailable
    </div>
  ) : (
    <video
      ref={videoRef}
      src={videoUrl}
      className={`absolute inset-0 h-full w-full object-cover transition duration-300 ${
        hoverCapable ? 'group-hover:opacity-85 group-hover:contrast-[1.02]' : ''
      }`}
      onError={() => setHasError(true)}
      {...safeVideoAttributes}
      autoPlay={false}
    />
  );

  const formattedTags =
    work.tags && work.tags.length ? work.tags.map((tag) => tag.toUpperCase()).join(' / ') : null;

  return (
    <article
      className={`group flex flex-col gap-4 md:gap-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/30 ${
        onClick ? 'cursor-pointer' : 'cursor-default'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick?.()}
    >
      <div
        className={`relative w-full overflow-hidden bg-black/70 transition duration-300 ${WORK_MEDIA_ASPECT}`}
      >
        {renderMedia}
      </div>
      <div className="space-y-2">
        <h3 className="font-sans text-lg font-medium leading-tight tracking-tight text-foreground line-clamp-2">
          {work.title}
        </h3>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.28em] text-white/60">
          <span className="text-white/75">{work.year}</span>
          {formattedTags && <span>{formattedTags}</span>}
        </div>
        {cta && <div className="pt-1 text-white/70">{cta}</div>}
      </div>
    </article>
  );
}
