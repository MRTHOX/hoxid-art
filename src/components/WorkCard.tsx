'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Work } from '@/data/content';
import { normalizeVideoUrl, safeVideoAttributes } from '@/utils/media';
import { typography } from '@/utils/typography';
import {
  WORK_MEDIA_ASPECT,
  WORK_CARD_TITLE_SPACING,
  WORK_CARD_META_MARGIN,
  WORK_CARD_CTA_MARGIN,
  WORK_CARD_META_OPACITY,
} from '@/utils/layout';

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
  const hasVideo = Boolean(work.videoUrl);
  const videoUrl = hasVideo && work.videoUrl ? normalizeVideoUrl(work.videoUrl) : '';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(hover: hover)');
    const handleChange = (event: MediaQueryListEvent) => setHoverCapable(event.matches);
    setHoverCapable(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!hasVideo) return;
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
  }, [hasError, hasVideo, hoverCapable, isHovered, work.title]);

  const renderMedia = () => {
    if (hasVideo) {
      if (hasError || !videoUrl) {
        return (
          <div className={`absolute inset-0 flex items-center justify-center bg-white/[0.04] ${typography.meta}`}>
            Media unavailable
          </div>
        );
      }
      return (
        <video
          ref={videoRef}
          src={videoUrl}
          className={`absolute inset-0 h-full w-full object-cover transition duration-200 ${
            hoverCapable ? 'group-hover:opacity-85 group-hover:contrast-[1.03] group-hover:scale-[1.015]' : ''
          }`}
          onError={() => setHasError(true)}
          {...safeVideoAttributes}
          autoPlay={false}
        />
      );
    }

    if (work.imageUrl) {
      return (
        <img
          src={work.imageUrl}
          alt={work.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-200"
          loading="lazy"
        />
      );
    }

    return (
      <div className={`absolute inset-0 flex items-center justify-center bg-white/[0.04] ${typography.meta}`}>
        Media unavailable
      </div>
    );
  };

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
        className={`relative w-full overflow-hidden bg-black/70 transition duration-200 ${WORK_MEDIA_ASPECT}`}
      >
        {renderMedia()}
      </div>
      <div className="flex flex-col">
        <h3
          className={`font-sans text-lg font-medium leading-tight tracking-tight text-foreground line-clamp-2 ${WORK_CARD_TITLE_SPACING}`}
        >
          {work.title}
        </h3>
        <div
          className={`flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.28em] ${WORK_CARD_META_OPACITY} ${WORK_CARD_META_MARGIN} ${
            hoverCapable ? 'group-hover:text-white/80' : ''
          }`}
        >
          <span className="text-white/80">{work.year}</span>
          {formattedTags && <span>{formattedTags}</span>}
        </div>
        {cta && <div className={`${WORK_CARD_CTA_MARGIN} text-white/70`}>{cta}</div>}
      </div>
    </article>
  );
}
