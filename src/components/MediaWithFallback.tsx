'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { buildFallbackUrls } from '@/utils/ipfsMedia';

type BaseProps = {
  src?: string;
  className?: string;
  fallback?: React.ReactNode;
  pauseOnHover?: boolean;
};

type VideoProps = React.VideoHTMLAttributes<HTMLVideoElement>;
type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

type MediaWithFallbackProps =
  | (BaseProps & {
      kind: 'video';
      videoProps?: Omit<VideoProps, 'src' | 'className' | 'onError'>;
      videoRef?: React.Ref<HTMLVideoElement>;
    })
  | (BaseProps & {
      kind: 'image';
      imageProps?: Omit<ImageProps, 'src' | 'className' | 'onError'>;
      imageRef?: React.Ref<HTMLImageElement>;
    });

const defaultFallback = (
  <div className="w-full h-full flex items-center justify-center bg-white/5 text-white/50 text-xs uppercase tracking-[0.3em]">
    Media unavailable
  </div>
);

export default function MediaWithFallback(props: MediaWithFallbackProps) {
  const { src, className, fallback, pauseOnHover = false } = props;
  const sources = useMemo(() => buildFallbackUrls(src), [src]);
  const [index, setIndex] = useState(0);
  const currentSrc = sources[index];
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIndex(0);
  }, [src]);

  const handleError = () => {
    setIndex((prev) => (prev < sources.length - 1 ? prev + 1 : prev));
  };

  if (!currentSrc) {
    return <>{fallback ?? defaultFallback}</>;
  }

  const hoverHandlers = pauseOnHover
    ? {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
      }
    : {};

  if (props.kind === 'video') {
    const { videoProps, videoRef } = props;
    const { onError, autoPlay = true, ...rest } = videoProps ?? {};
    return (
      <video
        key={`${currentSrc}-${index}`}
        ref={videoRef}
        data-current-src={currentSrc}
        className={className}
        src={currentSrc}
        autoPlay={autoPlay}
        muted
        playsInline
        loop
        preload="metadata"
        onError={(event) => {
          onError?.(event);
          handleError();
        }}
        {...hoverHandlers}
        {...rest}
      />
    );
  }

  const { imageProps, imageRef } = props;
  const { className: imageClassName, onError, ...restImg } = imageProps ?? {};
  const combinedClassName = [className, imageClassName].filter(Boolean).join(' ') || undefined;

  return (
    <img
      key={`${currentSrc}-${index}`}
      ref={imageRef}
      data-current-src={currentSrc}
      className={combinedClassName}
      src={currentSrc}
      onError={(event) => {
        onError?.(event);
        handleError();
      }}
      loading="lazy"
      {...restImg}
    />
  );
}
