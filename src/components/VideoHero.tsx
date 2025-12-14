'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { heroVideos } from '@/data/content';
import { normalizeVideoUrl, safeVideoAttributes } from '@/utils/media';

const DISPLAY_DURATION_MS = 3000;
const OVERLAY_MIN_MS = 150;
const OVERLAY_MAX_MS = 400;
const LOAD_FAIL_TIMEOUT_MS = 2200;

const isDev = process.env.NODE_ENV !== 'production';
const debugLog = (...args: unknown[]) => {
  if (isDev) {
    console.log('[VideoHero]', ...args);
  }
};

export default function VideoHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(heroVideos.length > 1 ? 1 : 0);
  const [activeSlot, setActiveSlot] = useState<0 | 1>(0);
  const [overlayVisible, setOverlayVisible] = useState(heroVideos.length > 0);
  const [bufferReady, setBufferReady] = useState(false);
  const [waitingForBuffer, setWaitingForBuffer] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [sources, setSources] = useState<string[]>([
    normalizeVideoUrl(heroVideos[0]?.videoUrl ?? ''),
    normalizeVideoUrl(heroVideos[1]?.videoUrl ?? ''),
  ]);

  const primaryRef = useRef<HTMLVideoElement>(null);
  const secondaryRef = useRef<HTMLVideoElement>(null);
  const videoRefs = useMemo(() => [primaryRef, secondaryRef] as const, []);
  const overlayStartRef = useRef<number | null>(null);
  const loadFailTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startFailTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showOverlay = useCallback(() => {
    if (overlayVisible) return;
    overlayStartRef.current = Date.now();
    setOverlayVisible(true);
  }, [overlayVisible]);

  const hideOverlay = useCallback(() => {
    if (!overlayVisible) return;
    const start = overlayStartRef.current;
    const elapsed = start ? Date.now() - start : 0;
    const delay = Math.min(
      Math.max(OVERLAY_MIN_MS - elapsed, 0),
      Math.max(OVERLAY_MAX_MS - elapsed, 0)
    );

    const timeout = setTimeout(() => {
      setOverlayVisible(false);
      overlayStartRef.current = null;
    }, delay);

    return () => clearTimeout(timeout);
  }, [overlayVisible]);

  const skipToFollowingVideo = useCallback(
    (reason?: string) => {
      debugLog('Skipping to following video', { reason });
      if (startFailTimerRef.current) {
        clearTimeout(startFailTimerRef.current);
        startFailTimerRef.current = null;
      }
      setBufferReady(false);
      setWaitingForBuffer(false);
      setOverlayVisible(false);
      overlayStartRef.current = null;
      setNextIndex((prev) => (prev + 1) % heroVideos.length);
    },
    []
  );

  const performSwap = useCallback(() => {
    showOverlay();
    const nextSlot: 0 | 1 = activeSlot === 0 ? 1 : 0;
    setActiveSlot(nextSlot);
    setCurrentIndex(nextIndex);
    setNextIndex((prev) => (prev + 1) % heroVideos.length);
  }, [activeSlot, nextIndex, showOverlay]);

  const clearStartTimeout = useCallback(() => {
    if (startFailTimerRef.current) {
      clearTimeout(startFailTimerRef.current);
      startFailTimerRef.current = null;
    }
  }, []);

  const handleBufferReady = useCallback(
    (slot: 0 | 1) => {
      if (slot === activeSlot) return;
      clearTimeout(loadFailTimerRef.current as ReturnType<typeof setTimeout>);
      setBufferReady(true);
      debugLog('Marked buffer ready', { slot });
      if (waitingForBuffer) {
        setWaitingForBuffer(false);
        performSwap();
      } else {
        hideOverlay();
      }
    },
    [activeSlot, hideOverlay, performSwap, waitingForBuffer]
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReduceMotion(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (overlayVisible && overlayStartRef.current === null) {
      overlayStartRef.current = Date.now();
    }
  }, [overlayVisible]);

  useEffect(() => {
    clearStartTimeout();

    if (!heroVideos.length) return;

    startFailTimerRef.current = setTimeout(() => {
      debugLog('Active start timeout, skipping');
      skipToFollowingVideo('active start timeout');
    }, LOAD_FAIL_TIMEOUT_MS);

    return () => clearStartTimeout();
  }, [activeSlot, clearStartTimeout, skipToFollowingVideo]);

  useEffect(() => {
    const activeVideo = videoRefs[activeSlot].current;
    const source = sources[activeSlot];

    if (!activeVideo || !source) return;

    const playVideo = async () => {
      try {
        await activeVideo.play();
      } catch (error) {
        debugLog('Autoplay blocked', error);
      }
    };

    const handleLoadedMetadata = () => {
      playVideo();
    };

    if (activeVideo.readyState >= HTMLMediaElement.HAVE_METADATA) {
      playVideo();
    } else {
      activeVideo.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      activeVideo.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [activeSlot, sources, videoRefs]);

  useEffect(() => {
    if (heroVideos.length <= 1) return;

    const timer = setTimeout(() => {
      if (bufferReady) {
        performSwap();
      } else {
        setWaitingForBuffer(true);
        showOverlay();
      }
    }, DISPLAY_DURATION_MS);

    return () => clearTimeout(timer);
  }, [bufferReady, currentIndex, performSwap, showOverlay]);

  useEffect(() => {
    if (heroVideos.length <= 1) return;
    const bufferSlot: 0 | 1 = activeSlot === 0 ? 1 : 0;
    const bufferVideo = videoRefs[bufferSlot].current;
    const nextVideo = heroVideos[nextIndex];

    if (!nextVideo) return;

    clearTimeout(loadFailTimerRef.current as ReturnType<typeof setTimeout>);

    let cleanupReadiness: (() => void) | null = null;

    const frame = requestAnimationFrame(() => {
      setBufferReady(false);
      setSources((prev) => {
        const updated = [...prev];
        updated[bufferSlot] = normalizeVideoUrl(nextVideo.videoUrl);
        return updated;
      });

      if (!bufferVideo) return;

      bufferVideo.load();

      let readinessAchieved = false;
      let progressCheckId: number | null = null;
      let readinessEventHandlers: { eventName: keyof HTMLMediaElementEventMap; handler: () => void }[] = [];

      const markReady = (signal: string) => {
        if (readinessAchieved) return;
        readinessAchieved = true;
        debugLog('Buffer ready', { bufferSlot, signal, nextIndex });
        handleBufferReady(bufferSlot as 0 | 1);
        if (cleanupReadiness) {
          cleanupReadiness();
        }
      };

      const onPlaying = () => markReady('playing');
      const onTimeUpdate = () => {
        markReady('timeupdate');
      };

      const readinessEvents: (keyof HTMLMediaElementEventMap)[] = [
        'loadedmetadata',
        'loadeddata',
        'canplay',
        'canplaythrough',
      ];

      const cleanup = () => {
        readinessEventHandlers.forEach(({ eventName, handler }) => {
          bufferVideo.removeEventListener(eventName, handler);
        });
        bufferVideo.removeEventListener('playing', onPlaying);
        bufferVideo.removeEventListener('timeupdate', onTimeUpdate);
        if (progressCheckId) {
          cancelAnimationFrame(progressCheckId);
        }
      };

      cleanupReadiness = cleanup;

      readinessEventHandlers = readinessEvents.map((eventName) => {
        const handler = () => markReady(eventName);
        bufferVideo.addEventListener(eventName, handler);
        return { eventName, handler };
      });

      bufferVideo.addEventListener('playing', onPlaying);
      bufferVideo.addEventListener('timeupdate', onTimeUpdate);

      const attemptPlay = async () => {
        try {
          await bufferVideo.play();
          debugLog('Attempted play on buffer slot', { bufferSlot });
        } catch (error) {
          debugLog('Buffer play blocked', error);
        }
      };

      const monitorProgress = () => {
        if (readinessAchieved) return;
        if (bufferVideo.currentTime > 0) {
          markReady('currentTime-progress');
          return;
        }
        progressCheckId = requestAnimationFrame(monitorProgress);
      };

      attemptPlay().then(() => {
        progressCheckId = requestAnimationFrame(monitorProgress);
      });

      loadFailTimerRef.current = setTimeout(() => {
        debugLog('Buffer timeout, skipping');
        cleanup();
        skipToFollowingVideo('buffer timeout');
      }, LOAD_FAIL_TIMEOUT_MS);
    });

    return () => {
      cancelAnimationFrame(frame);
      if (cleanupReadiness) {
        cleanupReadiness();
      }
      clearTimeout(loadFailTimerRef.current as ReturnType<typeof setTimeout>);
    };
  }, [activeSlot, handleBufferReady, nextIndex, skipToFollowingVideo, videoRefs]);

  const handleError = (slot: 0 | 1) => {
    clearStartTimeout();
    debugLog('Video error', { slot });
    if (slot === activeSlot) {
      setCurrentIndex((prev) => (prev + 1) % heroVideos.length);
      setNextIndex((prev) => (prev + 1) % heroVideos.length);
      hideOverlay();
    } else {
      skipToFollowingVideo('error event');
    }
  };

  const handlePlaying = (slot: 0 | 1) => {
    clearStartTimeout();
    if (slot === activeSlot) {
      hideOverlay();
    }
  };

  if (!heroVideos.length) {
    return null;
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {[0, 1].map((slot) => (
        <video
          key={`hero-video-${slot}`}
          ref={videoRefs[slot]}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-0 ${
            slot === activeSlot ? 'opacity-100' : 'opacity-0'
          }`}
          src={sources[slot]}
          onCanPlay={() => handleBufferReady(slot as 0 | 1)}
          onLoadedData={() => handleBufferReady(slot as 0 | 1)}
          onError={() => handleError(slot as 0 | 1)}
          onPlaying={() => handlePlaying(slot as 0 | 1)}
          {...safeVideoAttributes}
        />
      ))}

      {overlayVisible && (
        <div className="absolute inset-0 bg-black text-white pointer-events-none">
          <div className="absolute inset-0 opacity-70">
            <div className={`absolute inset-0 ${reduceMotion ? '' : 'animate-glitch-lines'}`}></div>
            <div className={`absolute inset-0 mix-blend-screen ${reduceMotion ? '' : 'animate-glitch-noise'}`}></div>
          </div>
          <div className="absolute top-4 left-4 flex flex-col items-start space-y-1 font-mono text-[10px] tracking-[0.18em] uppercase">
            <span className="px-2 py-1 border border-white/40 bg-black/60">HOXID</span>
            <span className="text-white/60">SYNC / BUFFER / FRAME</span>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-glitch-lines {
          background: repeating-linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.05) 0px,
            rgba(255, 255, 255, 0.05) 1px,
            transparent 2px,
            transparent 4px
          );
          animation: scan 1.4s linear infinite;
        }

        .animate-glitch-noise {
          background: radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.08), transparent 20%),
            radial-gradient(circle at 80% 40%, rgba(255, 255, 255, 0.06), transparent 18%),
            radial-gradient(circle at 50% 80%, rgba(255, 255, 255, 0.04), transparent 22%);
          animation: flicker 1.1s steps(2) infinite;
        }

        @keyframes scan {
          0% {
            transform: translateY(-4%);
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(4%);
            opacity: 0.4;
          }
        }

        @keyframes flicker {
          0%,
          100% {
            opacity: 0.45;
          }
          50% {
            opacity: 0.6;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-glitch-lines,
          .animate-glitch-noise {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
