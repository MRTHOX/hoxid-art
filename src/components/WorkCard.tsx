'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Work } from '@/data/content';

interface WorkCardProps {
  work: Work;
  onClick: () => void;
}

export default function WorkCard({ work, onClick }: WorkCardProps) {
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
      className="relative border border-black cursor-pointer transition-all duration-200 hover:border-red-600"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
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
        <p className="text-xs font-mono text-gray-600 mt-1">{work.year}</p>
        {work.tags && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {work.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono text-gray-500">#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}