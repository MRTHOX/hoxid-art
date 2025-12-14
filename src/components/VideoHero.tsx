'use client';

import React, { useState, useEffect, useRef } from 'react';
import { heroVideos } from '@/data/content';

export default function VideoHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (err) {
        console.log('Autoplay blocked');
      }
    };

    playVideo();
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroVideos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleClick = async () => {
    if (!isPlaying && videoRef.current) {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.error('Play failed');
      }
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <video
        ref={videoRef}
        key={heroVideos[currentIndex].id}
        className="absolute inset-0 w-full h-full object-cover"
        src={heroVideos[currentIndex].videoUrl}
        muted
        loop
        playsInline
        autoPlay
      />
      
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 cursor-pointer"
          onClick={handleClick}
        >
          <button className="text-white text-sm tracking-wider border border-white px-8 py-3 hover:bg-white hover:text-black transition-colors duration-200">
            TAP TO START
          </button>
        </div>
      )}
      
      <div className="absolute bottom-8 left-8 text-white text-sm font-mono">
        hoxid.art
      </div>
    </div>
  );
}