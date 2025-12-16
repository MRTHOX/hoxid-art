'use client';

import React, { useEffect } from 'react';
import MediaWithFallback from '@/components/MediaWithFallback';
import { Work } from '@/data/content';
import { normalizeVideoUrl, safeVideoAttributes } from '@/utils/media';
import { typography } from '@/utils/typography';

interface ModalProps {
  work: Work;
  onClose: () => void;
}

export default function Modal({ work, onClose }: ModalProps) {
  const normalizedUrl = work.videoUrl ? normalizeVideoUrl(work.videoUrl) : undefined;
  const videoUrl =
    normalizedUrl && normalizedUrl.includes('assets.objkt.media')
      ? `/api/stream?url=${encodeURIComponent(normalizedUrl)}`
      : normalizedUrl;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const fallback = (
    <div
      className={`w-full aspect-video bg-[rgba(255,255,255,0.08)] flex items-center justify-center ${typography.meta}`}
    >
      Media unavailable
    </div>
  );

  const renderMedia =
    !videoUrl ? (
      fallback
    ) : (
      <MediaWithFallback
        kind="video"
        src={videoUrl}
        className="w-full"
        videoProps={{
          ...safeVideoAttributes,
        }}
        fallback={fallback}
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
