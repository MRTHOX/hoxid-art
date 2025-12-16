'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import MediaWithFallback from '@/components/MediaWithFallback';
import { Work } from '@/data/content';
import { normalizeVideoUrl, safeVideoAttributes } from '@/utils/media';
import { typography } from '@/utils/typography';

const CONTROL_HIDE_DELAY = 1500;

const aspectClassMap: Record<NonNullable<Work['aspect']>, string> = {
  portrait: 'aspect-[9/16]',
  square: 'aspect-square',
  landscape: 'aspect-video',
};

interface ModalProps {
  work: Work;
  onClose: () => void;
}

export default function Modal({ work, onClose }: ModalProps) {
  const hasSound = Boolean(work.hasSound);
  const [isMuted, setIsMuted] = useState(!hasSound);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const normalizedUrl = work.videoUrl ? normalizeVideoUrl(work.videoUrl) : undefined;
  const videoUrl =
    normalizedUrl && normalizedUrl.includes('assets.objkt.media')
      ? `/api/stream?url=${encodeURIComponent(normalizedUrl)}`
      : normalizedUrl;

  const aspectClass = useMemo(() => {
    if (!work.aspect) return 'aspect-video';
    return aspectClassMap[work.aspect] ?? 'aspect-video';
  }, [work.aspect]);

  const cleanupTimers = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const cleanupVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
  }, []);

  const handleClose = useCallback(async () => {
    await exitFullscreen();
    cleanupVideo();
    onClose();
  }, [cleanupVideo, exitFullscreen, onClose]);

  const showControls = useCallback(() => {
    setControlsVisible(true);
    cleanupTimers();
    hideTimer.current = setTimeout(() => {
      setControlsVisible(false);
    }, CONTROL_HIDE_DELAY);
  }, [cleanupTimers]);

  const handlePointerActivity = useCallback(() => {
    showControls();
  }, [showControls]);

  const toggleFullscreen = useCallback(async () => {
    if (!mediaRef.current) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await mediaRef.current.requestFullscreen();
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (!hasSound) return;
    setIsMuted((prev) => !prev);
  }, [hasSound]);

  useEffect(() => {
    showControls();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
      cleanupTimers();
      cleanupVideo();
    };
  }, [cleanupTimers, cleanupVideo, handleClose, showControls]);

  useEffect(() => {
    const syncFullscreen = () => {
      setIsFullscreen(document.fullscreenElement === mediaRef.current);
    };
    document.addEventListener('fullscreenchange', syncFullscreen);
    return () => document.removeEventListener('fullscreenchange', syncFullscreen);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !hasSound || isMuted;
    }
  }, [hasSound, isMuted]);

  const fallback = (
    <div
      className={`flex aspect-video w-full items-center justify-center bg-white/5 text-xs uppercase tracking-[0.4em] text-white/60 ${typography.meta}`}
    >
      Media unavailable
    </div>
  );

  const controlsClass = `pointer-events-none absolute top-6 right-6 flex items-center gap-3 transition-opacity duration-200 ${
    controlsVisible ? 'opacity-100' : 'opacity-0'
  }`;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/90 ${controlsVisible ? '' : 'cursor-none'}`}
      onClick={handleClose}
      onMouseMove={handlePointerActivity}
      onTouchStart={handlePointerActivity}
    >
      <div
        ref={stageRef}
        className="flex min-h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden px-6 py-6 md:px-12 md:py-12 lg:px-24"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative w-full">
          <div className={controlsClass}>
            <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-white">
              {hasSound && (
                <button
                  type="button"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  className="h-8 w-8 rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6}>
                      <path d="M9 9L5 12h-2v0l0 0v0h2l4 3v-6z" fill="currentColor" stroke="none" />
                      <path d="M15 9l6 6m0-6l-6 6" stroke="currentColor" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6}>
                      <path d="M9 9L5 12H3l0 0h2l4 3V9z" fill="currentColor" stroke="none" />
                      <path d="M15 9c2 1 3 3 3 5s-1 4-3 5m2-12c3 2 4 5 4 7s-1 5-4 7" strokeLinecap="round" />
                    </svg>
                  )}
                </button>
              )}
              <button
                type="button"
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                className="h-8 w-8 rounded-full bg-white/10 text-white transition hover:bg-white/20"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6}>
                    <path d="M9 9L5 5m0 0v4m0-4h4" strokeLinecap="round" />
                    <path d="M15 9l4-4m0 0v4m0-4h-4" strokeLinecap="round" />
                    <path d="M15 15l4 4m0 0v-4m0 4h-4" strokeLinecap="round" />
                    <path d="M9 15l-4 4m0 0v-4m0 4h4" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6}>
                    <path d="M9 5H5v4M15 5h4v4M19 15v4h-4M5 15v4h4" strokeLinecap="round" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                aria-label="Close"
                className="h-8 w-8 rounded-full bg-white/10 text-white transition hover:bg-white/20"
                onClick={handleClose}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6}>
                  <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          <div
            ref={mediaRef}
            className={`mx-auto flex max-h-[88vh] max-w-[92vw] items-center justify-center ${aspectClass} overflow-hidden`}
            onClick={handlePointerActivity}
          >
            {videoUrl ? (
              <MediaWithFallback
                kind="video"
                src={videoUrl}
                className="h-full w-full object-contain"
                videoRef={videoRef}
                videoProps={{
                  ...safeVideoAttributes,
                  muted: !hasSound || isMuted,
                  controls: false,
                }}
                fallback={fallback}
              />
            ) : (
              fallback
            )}
          </div>
        </div>

        <div className="text-center text-white/80">
          <h2 className="font-sans text-2xl font-medium tracking-tight">{work.title}</h2>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.4em] text-white/60">{work.year}</p>
          {work.tags && work.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-white/50">
              {work.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
