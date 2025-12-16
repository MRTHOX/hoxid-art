'use client';

import React, { useEffect, useState } from 'react';
import { Work } from '@/data/content';
import { normalizeVideoUrl, proxifyMediaUrl, safeVideoAttributes } from '@/utils/media';
import { typography } from '@/utils/typography';

interface ModalProps {
  work: Work;
  onClose: () => void;
}

export default function Modal({ work, onClose }: ModalProps) {
  const [hasError, setHasError] = useState(false);
  const videoUrl = work.videoUrl ? proxifyMediaUrl(normalizeVideoUrl(work.videoUrl)) : undefined;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const renderMedia =
    !videoUrl || hasError ? (
      <div className={`w-full aspect-video bg-[rgba(255,255,255,0.08)] flex items-center justify-center ${typography.meta}`}>
        Media unavailable
      </div>
    ) : (
      <video
        src={videoUrl}
        className="w-full"
        onError={() => setHasError(true)}
        {...safeVideoAttributes}
      />
    );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="bg-[var(--background)] text-[var(--foreground)] max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl text-white hover:text-red-600 z-10 bg-black bg-opacity-50 w-10 h-10 rounded-full"
          >
            ✕
          </button>
          {renderMedia}
        </div>
        <div className="p-8 space-y-4">
          <h2 className={typography.h2}>{work.title}</h2>
          <p className={typography.meta}>{work.year}</p>
          {work.tags && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {work.tags.map((tag) => (
                <span key={tag} className={`${typography.meta} text-muted`}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
