'use client';

import React, { useEffect, useRef, useState } from 'react';
import { heroVideos } from '@/data/content';
import { normalizeVideoUrl, safeVideoAttributes } from '@/utils/media';

export default function VideoHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentVideo = heroVideos[currentIndex];
  const videoUrl = normalizeVideoUrl(currentVideo?.videoUrl ?? '');

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
        setHasError(false);
      } catch (error) {
        console.log('Autoplay blocked', error);
      }
    };

    playVideo();
  }, [videoUrl]);

  useEffect(() => {
    if (!isPlaying || heroVideos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroVideos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleClick = async () => {
    const video = videoRef.current;
    if (!isPlaying && video) {
      try {
        await video.play();
        setIsPlaying(true);
        setHasError(false);
      } catch (error) {
        console.error('Play failed', error);
      }
    }
  };

  const handleError = () => {
    setHasError(true);
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % heroVideos.length);
  };

  if (!heroVideos.length) {
    return null;
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {!hasError && videoUrl ? (
        <video
          ref={videoRef}
          key={currentVideo.id}
          className="absolute inset-0 w-full h-full object-cover"
          src={videoUrl}
          onError={handleError}
          {...safeVideoAttributes}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-white bg-black">
          <span className="text-sm font-mono">Media unavailable</span>
        </div>
      )}

      {!isPlaying && !hasError && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 cursor-pointer"
          onClick={handleClick}
        >
          <button className="text-white text-sm tracking-wider border border-white px-8 py-3 hover:bg-white hover:text-black transition-colors duration-200">
            TAP TO START
          </button>
        </div>
      )}

      <div className="absolute bottom-8 left-8 text-white text-sm font-mono">hoxid.art</div>
    </div>
  );
}
