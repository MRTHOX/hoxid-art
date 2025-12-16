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
  <div className="flex h-full w-full items-center justify-center bg-white/5 text-xs uppercase tracking-[0.3em] text-white/50">
    Media unavailable
  </div>
);

export default function MediaWithFallback(props: MediaWithFallbackProps) {
  const { src, className, fallback, pauseOnHover = false } = props;
  const sources = useMemo(() => buildFallbackUrls(src), [src]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [src]);

  const handleError = () => {
    setIndex((prev) => (prev < sources.length - 1 ? prev + 1 : prev));
  };

  const hoverHandlers = pauseOnHover
    ? {
        onMouseEnter: () => {},
        onMouseLeave: () => {},
      }
    : {};

  const activeSources = sources.slice(index);

  if (!activeSources.length) {
    return <>{fallback ?? defaultFallback}</>;
  }

  if (props.kind === 'video') {
    const { videoProps, videoRef } = props;
    const {
      autoPlay = true,
      loop = true,
      muted = true,
      playsInline = true,
      preload = 'metadata',
      ...rest
    } = videoProps ?? {};

    return (
      <video
        key={`${index}-${activeSources[0]}`}
        ref={videoRef}
        data-current-src={activeSources[0]}
        className={className}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload={preload}
        crossOrigin="anonymous"
        onError={handleError}
        {...hoverHandlers}
        {...rest}
      >
        {activeSources.map((source) => (
          <source key={source} src={source} type="video/mp4" />
        ))}
      </video>
    );
  }

  const { imageProps, imageRef } = props;
  const { className: imageClassName, onError, ...restImg } = imageProps ?? {};
  const combinedClassName = [className, imageClassName].filter(Boolean).join(' ') || undefined;

  return (
    <img
      key={`${activeSources[0]}-${index}`}
      ref={imageRef}
      data-current-src={activeSources[0]}
      className={combinedClassName}
      src={activeSources[0]}
      onError={(event) => {
        onError?.(event);
        handleError();
      }}
      loading="lazy"
      {...restImg}
    />
  );
}
