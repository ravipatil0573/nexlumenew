// src/components/LazyVideo.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * LazyVideo Component
 * Lazy loads video only when scrolled into view
 * Shows poster image until video is loaded
 *
 * Usage:
 * <LazyVideo
 *   src="video.mp4"
 *   poster="poster.jpg"
 *   alt="Video description"
 * />
 */
export function LazyVideo({
  src,
  poster,
  alt,
  autoPlay = true,
  muted = true,
  loop = true,
  controls = true,
  className = "",
  rootMargin = "100px",
  ...props
}) {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile] = useState(() => {
    return typeof window !== "undefined" && window.innerWidth < 768;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (videoRef.current) {
            observer.unobserve(videoRef.current);
          }
        }
      },
      {
        rootMargin,
        threshold: 0.1,
      },
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [rootMargin]);

  // Don't autoplay on mobile for better performance
  const shouldAutoPlay = autoPlay && !isMobile;

  return (
    <div className={`lazy-video-container ${className}`}>
      <video
        ref={videoRef}
        poster={poster}
        autoPlay={shouldAutoPlay && isVisible}
        muted={muted}
        loop={loop}
        controls={controls}
        className="lazy-video"
        preload={isVisible ? "auto" : "none"}
        {...props}
      >
        <source src={src} type="video/mp4" />
        <img src={poster} alt={alt} loading="lazy" />
      </video>
    </div>
  );
}

export default LazyVideo;
