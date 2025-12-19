'use client';

import { useEffect, useRef, useState } from 'react';
import { works, Work } from '@/data/content';
import { buildFallbackUrls } from '@/utils/ipfsMedia';
import { normalizeVideoUrl } from '@/utils/media';

const SEGMENT_DURATION_MS = 4000;
const SEGMENT_LENGTH = 4;
const FADE_MS = 700;

type Candidate = { work: Work; sources: string[] };

const candidates: Candidate[] = works
  .filter((w) => Boolean(w.videoUrl))
  .map((work) => ({
    work,
    sources: buildFallbackUrls(normalizeVideoUrl(work.videoUrl ?? '')),
  }))
  .filter((c) => c.sources.length > 0);

function tryPlay(video: HTMLVideoElement) {
  const p = video.play();
  if (p && typeof (p as Promise<void>).catch === 'function') (p as Promise<void>).catch(() => null);
}

function seekRandomSegment(video: HTMLVideoElement) {
  if (!Number.isFinite(video.duration) || video.duration <= 0) return;
  const maxStart = Math.max(0, video.duration - SEGMENT_LENGTH);
  const t = maxStart > 0 ? Math.random() * maxStart : 0;
  try {
    video.currentTime = t;
  } catch {
    // ignore seek issues
  }
}

export default function VideoHero() {
  const [mounted, setMounted] = useState(false);

  // ekranda gösterilen (meta/title) index
  const [shownIndex, setShownIndex] = useState(0);

  // hangi layer görünür
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);

  // preload hazır mı?
  const preloadReadyRef = useRef(false);
  const advanceRequestedRef = useRef(false);

  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const shown = candidates[shownIndex];
  const preloadIndex = candidates.length ? (shownIndex + 1) % candidates.length : 0;
  const toPreload = candidates[preloadIndex];

  const visibleVideo = activeLayer === 0 ? videoA : videoB;
  const hiddenVideo = activeLayer === 0 ? videoB : videoA;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Video’ya “source fallback + ready callback” bağlayan helper
  const primeVideo = (
    video: HTMLVideoElement,
    sources: string[],
    onReady: () => void,
    onAllFail: () => void
  ) => {
    let idx = 0;
    let resolved = false;

    const resolveReady = () => {
      if (resolved) return;
      resolved = true;
      cleanup();
      onReady();
    };

    const setSrc = () => {
      video.src = sources[idx];

      // iOS/Safari autoplay için garanti
      video.muted = true;
      video.playsInline = true;
      (video as any).autoplay = true;

      video.preload = 'auto';
      video.load();
    };

    const handleError = () => {
      idx += 1;
      if (idx < sources.length) {
        setSrc();
      } else {
        cleanup();
        onAllFail();
      }
    };

    const handlePlaying = () => {
      // playing bazen erken gelebilir, ama iyi bir sinyal
      resolveReady();
    };

    const handleTimeUpdate = () => {
      // asıl güvence: gerçekten ilerledi mi?
      if (video.currentTime > 0.15) {
        resolveReady();
      }
    };

    const handleLoadedMetadata = () => {
      seekRandomSegment(video);
      tryPlay(video);

      // çok hızlı ilerlediyse kaçırmayalım
      if (!resolved && video.currentTime > 0.15) {
        resolveReady();
      }
    };

    const cleanup = () => {
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };

    // aynı element reuse edildiği için önce temizle
    cleanup();

    video.addEventListener('error', handleError);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('timeupdate', handleTimeUpdate);

    setSrc();

    // “çok hızlı load” durumunda
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }
  };

  const doSwap = () => {
    if (!preloadReadyRef.current) return;

    advanceRequestedRef.current = false;
    preloadReadyRef.current = false;

    // fade: hidden görünür olur
    setActiveLayer((p) => (p === 0 ? 1 : 0));

    // meta/title da yeni videoya geçsin
    setShownIndex((i) => (i + 1) % candidates.length);
  };

  // görünen video (shown)
  useEffect(() => {
    if (!mounted || !shown || !visibleVideo.current) return;

    const v = visibleVideo.current;

    primeVideo(
      v,
      shown.sources,
      () => {
        // shown gerçekten başladı → timer başlat
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          advanceRequestedRef.current = true;
          if (preloadReadyRef.current) doSwap();
        }, SEGMENT_DURATION_MS);
      },
      () => {
        // shown candidate tamamen fail → sonraki work
        setShownIndex((i) => (i + 1) % candidates.length);
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, shownIndex, activeLayer]);

  // preload video (bir sonraki)
  useEffect(() => {
    if (!mounted || !toPreload || !hiddenVideo.current) return;

    preloadReadyRef.current = false;

    const v = hiddenVideo.current;

    primeVideo(
      v,
      toPreload.sources,
      () => {
        preloadReadyRef.current = true;
        if (advanceRequestedRef.current) doSwap();
      },
      () => {
        preloadReadyRef.current = false;
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, shownIndex, activeLayer]);

  if (!candidates.length) {
    return (
      <section className="flex h-[100dvh] items-center justify-center bg-black text-white">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/60">No works available</p>
      </section>
    );
  }

  const showMeta = mounted && shown;

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-black text-white">
      {/* Layer A */}
      <video
        ref={videoA}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover transition-opacity"
        style={{ opacity: activeLayer === 0 ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
      />

      {/* Layer B */}
      <video
        ref={videoB}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover transition-opacity"
        style={{ opacity: activeLayer === 1 ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
      />

      {/* Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25" />

      {/* Meta */}
      <div className="relative z-10 flex h-full flex-col justify-between px-6 py-8 md:px-10 md:py-12">
        {showMeta && (
          <>
            <div className="flex items-center justify-end font-mono text-[0.65rem] uppercase tracking-[0.35em] text-white/70">
              <span>{shown.work.year}</span>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-white/60">Selected fragment</p>
              <h1 className="font-mono text-xs uppercase tracking-[0.4em] text-white/60 text-right">
                {shown.work.title}
              </h1>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
