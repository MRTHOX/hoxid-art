'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import MediaWithFallback from '@/components/MediaWithFallback';
import { Work } from '@/data/content';
import { normalizeVideoUrl, safeVideoAttributes } from '@/utils/media';
import { typography } from '@/utils/typography';

interface ModalProps {
  work: Work;
  onClose: () => void;
}

export default function Modal({ work, onClose }: ModalProps) {
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState({ current: 0, duration: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(false);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pendingSoundPref = useRef(false);
  const hasSound = Boolean(work.hasSound);

  const normalizedUrl = work.videoUrl ? normalizeVideoUrl(work.videoUrl) : undefined;
  const videoUrl = normalizedUrl;


  useEffect(() => {
    setIsPlaying(true);
    setProgress({ current: 0, duration: 0 });
    setMuted(true);
    pendingSoundPref.current = false;
    if (hasSound) {
      setShowSoundHint(true);
      if (typeof window !== 'undefined') {
        pendingSoundPref.current = window.localStorage.getItem('hoxid_soundEnabled') === 'true';
      }
    } else {
      setShowSoundHint(false);
    }
  }, [videoUrl, hasSound]);

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
    setIsPlaying(false);
    onClose();
  }, [cleanupVideo, exitFullscreen, onClose]);

  const showControls = useCallback(() => {
    setControlsVisible(true);
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
    }
    hideTimer.current = setTimeout(() => {
      setControlsVisible(false);
      hideTimer.current = null;
    }, 1400);
  }, []);

  const hideControls = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setControlsVisible(false);
  }, []);

  const enableSound = useCallback(() => {
    if (!hasSound) return;
    setMuted(false);
    setShowSoundHint(false);
    pendingSoundPref.current = false;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('hoxid_soundEnabled', 'true');
    }
    const playPromise = videoRef.current?.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise.catch(() => null);
    }
  }, [hasSound]);

  const disableSound = useCallback(() => {
    setMuted(true);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('hoxid_soundEnabled', 'false');
    }
  }, []);

  const toggleSound = useCallback(() => {
    if (!hasSound) return;
    if (muted) {
      enableSound();
    } else {
      disableSound();
    }
  }, [disableSound, enableSound, hasSound, muted]);

  const handlePointerActivity = useCallback(() => {
    showControls();
    if (hasSound && pendingSoundPref.current && muted) {
      enableSound();
    }
  }, [enableSound, hasSound, muted, showControls]);

  const toggleFullscreen = useCallback(async () => {
    if (!mediaRef.current) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await mediaRef.current.requestFullscreen();
    }
  }, []);

  const togglePlayPause = useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = videoRef.current.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => null);
      }
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const updateProgress = useCallback(() => {
    if (!videoRef.current) return;
    setProgress({
      current: videoRef.current.currentTime,
      duration: videoRef.current.duration || 0,
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    showControls();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
      cleanupVideo();
      setIsPlaying(false);
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
    };
  }, [cleanupVideo, handleClose, showControls]);

  useEffect(() => {
    const syncFullscreen = () => {
      setIsFullscreen(document.fullscreenElement === mediaRef.current);
    };
    document.addEventListener('fullscreenchange', syncFullscreen);
    return () => document.removeEventListener('fullscreenchange', syncFullscreen);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => null);
      }
    } else {
      video.pause();
    }
  }, [isPlaying]);

  const fallback = (
    <div
      className={`flex h-full w-full items-center justify-center bg-white/5 text-xs uppercase tracking-[0.4em] text-white/60 ${typography.meta}`}
    >
      Media unavailable
    </div>
  );

  const progressRatio = progress.duration ? Math.min(progress.current / progress.duration, 1) : 0;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black overflow-hidden ${controlsVisible ? '' : 'cursor-none'}`}
      onClick={handleClose}
      onMouseMove={handlePointerActivity}
      onTouchStart={handlePointerActivity}
    >
      <div
        className="flex min-h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden px-6 py-6 md:px-12 md:py-12 lg:px-24"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative w-full" onMouseLeave={hideControls}>
          <button
            type="button"
            aria-label="Close"
            className={`absolute -top-8 right-0 text-white/70 transition hover:text-white ${
              controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={handleClose}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
            </svg>
          </button>
          <div
            ref={mediaRef}
            className="mx-auto flex h-[clamp(420px,78vh,900px)] max-h-[88vh] max-w-[92vw] aspect-video items-center justify-center bg-black overflow-hidden"
          >
            {videoUrl ? (
              <MediaWithFallback
                kind="video"
                src={videoUrl}
                className="h-full w-full object-contain"
                videoRef={videoRef}
                videoProps={{
                  ...safeVideoAttributes,
                  muted,
                  controls: false,
                  preload: 'none',
                  onLoadedMetadata: updateProgress,
                  onTimeUpdate: updateProgress,
                }}
                fallback={fallback}
              />
            ) : (
              fallback
            )}
          </div>
          <div
            className={`mx-auto mt-3 flex w-full max-w-[92vw] items-center gap-3 text-white/70 transition-opacity duration-200 ${
              controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <button
              type="button"
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="px-2 py-1 text-white/70 transition hover:text-white"
              onClick={togglePlayPause}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" className="mx-auto h-3 w-3" fill="currentColor">
                  <rect x="7" y="5" width="3" height="14" rx="1" />
                  <rect x="14" y="5" width="3" height="14" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="mx-auto h-3 w-3" fill="currentColor">
                  <path d="M8 5l9 7-9 7z" />
                </svg>
              )}
            </button>
            <div className="flex-1">
              <div className="relative h-px bg-white/20 transition hover:bg-white/40">
                <div
                  className="absolute inset-y-0 bg-white/80"
                  style={{ width: `${progressRatio * 100}%` }}
                />
              </div>
            </div>
            {hasSound && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label={muted ? 'Unmute' : 'Mute'}
                  className="px-2 py-1 text-white/70 transition hover:text-white"
                  onClick={toggleSound}
                >
                  {muted ? (
                    <svg viewBox="0 0 24 24" className="mx-auto h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.4}>
                      <path d="M10 9L6.5 12H4v0l0 0h2.5L10 15V9z" fill="currentColor" stroke="none" />
                      <path d="M15 9l4 4m0-4l-4 4" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="mx-auto h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.4}>
                      <path d="M10 9L6.5 12H4v0l0 0h2.5L10 15V9z" fill="currentColor" stroke="none" />
                      <path d="M15 9c2 1 3 3 3 5s-1 4-3 5m2-12c3 2 4 5 4 7s-1 5-4 7" strokeLinecap="round" />
                    </svg>
                  )}
                </button>
                {showSoundHint && muted && (
                  <span className="text-[0.55rem] uppercase tracking-[0.3em] text-white/50">enable sound</span>
                )}
              </div>
            )}
            <button
              type="button"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              className="px-2 py-1 text-white/70 transition hover:text-white"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <svg viewBox="0 0 24 24" className="mx-auto h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.4}>
                  <path d="M9 9L5 5m0 0v4m0-4h4" strokeLinecap="round" />
                  <path d="M15 9l4-4m0 0v4m0-4h-4" strokeLinecap="round" />
                  <path d="M15 15l4 4m0 0v-4m0 4h-4" strokeLinecap="round" />
                  <path d="M9 15l-4 4m0 0v-4m0 4h4" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="mx-auto h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.4}>
                  <path d="M9 5H5v4M15 5h4v4M19 15v4h-4M5 15v4h4" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
          <div className="mx-auto mt-2 flex w-full max-w-[92vw] items-center justify-between text-white/75">
            <span className="font-sans text-sm tracking-tight">{work.title}</span>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.35em] text-white/60">{work.year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
