'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Work } from '@/data/content';
import { normalizeVideoUrl, safeVideoAttributes } from '@/utils/media';

interface WorkCardProps {
  work: Work;
  onClick: () => void;
}

export default function WorkCard({ work, onClick }: WorkCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl = normalizeVideoUrl(work.videoUrl);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasError) return;

    const controlPlayback = async () => {
      try {
        if (isHovered) {
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
  }, [hasError, isHovered, work.title]);

  const renderMedia = hasError || !videoUrl ? (
    <div className="w-full aspect-video bg-[rgba(255,255,255,0.08)] flex items-center justify-center text-xs font-mono text-secondary">
      Media unavailable
    </div>
  ) : (
    <video
      ref={videoRef}
      src={videoUrl}
      className="w-full aspect-video object-cover"
      onError={() => setHasError(true)}
      {...safeVideoAttributes}
    />
  );

  return (
    <div
      className="relative border border-[var(--text-secondary)] cursor-pointer transition-all duration-200 hover:border-red-600"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {renderMedia}
      <div className="p-4 bg-[var(--background)]">
        <h3 className="text-sm font-medium">{work.title}</h3>
        <p className="text-xs font-mono text-secondary mt-1">{work.year}</p>
        {work.tags && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {work.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono text-muted">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
