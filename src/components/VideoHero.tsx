'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Work, works } from '@/data/content';
import { buildFallbackUrls } from '@/utils/ipfsMedia';
import { normalizeVideoUrl } from '@/utils/media';

const SEGMENT_DURATION_MS = 3200;
const SEGMENT_LENGTH = 3.2;

type Candidate = {
  work: Work;
  sources: string[];
};

const videoCandidates: Candidate[] = works
  .filter((work) => Boolean(work.videoUrl))
  .map((work) => ({
    work,
    sources: buildFallbackUrls(normalizeVideoUrl(work.videoUrl ?? '')),
  }))
  .filter((candidate) => candidate.sources.length > 0);

const pickRandomIndex = () =>
  videoCandidates.length ? Math.floor(Math.random() * videoCandidates.length) : 0;

const pickNextIndex = (previousIndex: number | null) => {
  if (videoCandidates.length <= 1) return 0;
  if (previousIndex === null) {
    return pickRandomIndex();
  }
  let next = previousIndex;
  while (next === previousIndex) {
    next = Math.floor(Math.random() * videoCandidates.length);
  }
  return next;
};

export default function VideoHero() {
  const [mounted, setMounted] = useState(false);
  const [candidateIndex, setCandidateIndex] = useState<number | null>(null);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [segmentKey, setSegmentKey] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    if (videoCandidates.length) {
      setCandidateIndex(pickRandomIndex());
    }
  }, []);

  const currentCandidate = useMemo(
    () => (candidateIndex !== null ? videoCandidates[candidateIndex] : undefined),
    [candidateIndex]
  );
  const currentSrc = currentCandidate?.sources[sourceIndex];

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!currentCandidate) return;
    setOverlayVisible(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, [candidateIndex, currentCandidate, sourceIndex]);

  const scheduleNextSegment = () => {
    if (!currentCandidate) return;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      advanceWork();
    }, SEGMENT_DURATION_MS);
  };

  const advanceWork = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setSourceIndex(0);
    setSegmentKey((prev) => prev + 1);
    setCandidateIndex((prev) => pickNextIndex(prev));
  };

  const handleVideoError = () => {
    if (!currentCandidate) return;
    const hasMoreSources = sourceIndex < currentCandidate.sources.length - 1;
    if (hasMoreSources) {
      setSourceIndex((prev) => prev + 1);
      setSegmentKey((prev) => prev + 1);
    } else {
      advanceWork();
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
      handleVideoError();
      return;
    }

    const maxStart = Math.max(0, video.duration - SEGMENT_LENGTH);
    const randomStart = maxStart > 0 ? Math.random() * maxStart : 0;
    try {
      video.currentTime = randomStart;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => null);
      }
    } catch (error) {
      console.warn('Unable to seek hero video', error);
    }
    setOverlayVisible(false);
    scheduleNextSegment();
  };

  if (!videoCandidates.length) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/60">No works available</p>
      </section>
    );
  }

  const ready = mounted && Boolean(currentCandidate) && Boolean(currentSrc);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        {ready ? (
          <video
            key={`${currentCandidate?.work.id ?? 'hero'}-${sourceIndex}-${segmentKey}`}
            ref={videoRef}
            className="h-full w-full object-cover"
            src={currentSrc}
            muted
            playsInline
            autoPlay
            preload="metadata"
            onLoadedMetadata={handleLoadedMetadata}
            onError={handleVideoError}
          />
        ) : (
          <div className="h-full w-full bg-black" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-8 md:px-10 md:py-12">
        {ready && (
          <>
            <div className="flex items-center justify-end font-mono text-[0.65rem] uppercase tracking-[0.35em] text-white/60">
              <span>{currentCandidate?.work.year}</span>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-white/50">Selected fragment</p>
              <h1 className="font-mono text-xs uppercase tracking-[0.4em] text-white/50 text-right">
                {currentCandidate?.work.title}
              </h1>
            </div>
          </>
        )}
      </div>

      {ready && overlayVisible && (
        <div className="pointer-events-none absolute inset-0 bg-black/40 transition-opacity duration-300" />
      )}
    </section>
  );
}
