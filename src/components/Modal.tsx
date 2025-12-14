'use client';

import React, { useEffect, useState } from 'react';
import { Work } from '@/data/content';
import { normalizeVideoUrl, safeVideoAttributes } from '@/utils/media';

interface ModalProps {
  work: Work;
  onClose: () => void;
}

export default function Modal({ work, onClose }: ModalProps) {
  const [hasError, setHasError] = useState(false);
  const videoUrl = normalizeVideoUrl(work.videoUrl);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const renderMedia = hasError || !videoUrl ? (
    <div className="w-full aspect-video bg-[rgba(255,255,255,0.08)] text-secondary flex items-center justify-center text-sm font-mono">
      Video unavailable
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
        <div className="p-8">
          <h2 className="text-2xl font-medium">{work.title}</h2>
          <p className="text-sm font-mono text-secondary mt-2">{work.year}</p>
          {work.tags && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {work.tags.map((tag) => (
                <span key={tag} className="text-xs font-mono text-muted">
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
