'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AvailableWork } from '@/data/content';

interface Props {
  work: AvailableWork;
}

export default function AvailableWorkCard({ work }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  return (
    <div
      className="border border-black transition-all duration-200 hover:border-red-600"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        src={work.videoUrl}
        className="w-full aspect-video object-cover"
        muted
        loop
        playsInline
      />
      <div className="p-4 bg-white">
        <h3 className="text-sm font-medium">{work.title}</h3>
        <p className="text-xs font-mono text-gray-600 mt-1">
          {work.year} {work.edition && `• ${work.edition}`}
        </p>
        
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
