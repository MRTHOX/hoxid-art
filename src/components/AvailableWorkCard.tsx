'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AvailableWork } from '@/data/content';
import { normalizeVideoUrl, safeVideoAttributes } from '@/utils/media';

interface Props {
  work: AvailableWork;
}

export default function AvailableWorkCard({ work }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl = normalizeVideoUrl(work.videoUrl);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasError) return;

    const togglePlayback = async () => {
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

    togglePlayback();
  }, [hasError, isHovered, work.title]);

  const renderMedia = hasError || !videoUrl ? (
    <div className="w-full aspect-video bg-gray-100 flex items-center justify-center text-xs font-mono text-gray-500">
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
      className="border border-black transition-all duration-200 hover:border-red-600"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {renderMedia}
      <div className="p-4 bg-white">
        <h3 className="text-sm font-medium">{work.title}</h3>
        <p className="text-xs font-mono text-gray-600 mt-1">
          {work.year} {work.edition && `• ${work.edition}`}
        </p>
        <a
          href={work.viewCollectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-xs tracking-wider hover:text-red-600 transition-colors duration-200"
        >
          VIEW / COLLECT →
        </a>
      </div>
    </div>
  );
}
