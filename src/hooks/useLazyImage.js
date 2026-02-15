// src/hooks/useLazyImage.js
import { useEffect, useRef, useState } from "react";

/**
 * Custom Hook for Lazy Loading Images
 * Uses IntersectionObserver to load images only when visible
 *
 * Usage:
 * const { ref, src } = useLazyImage();
 * <img ref={ref} data-src="actual-image.jpg" src="placeholder.jpg" />
 */
export function useLazyImage(options = {}) {
  const { rootMargin = "50px", threshold = 0.01 } = options;

  const [src, setSrc] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const currentImg = imgRef.current;
    if (!currentImg) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const actualSrc = entry.target.dataset.src;
          if (actualSrc) {
            setSrc(actualSrc);
            observer.unobserve(entry.target);
          }
        }
      },
      {
        rootMargin,
        threshold,
      },
    );

    observer.observe(currentImg);

    return () => {
      observer.unobserve(currentImg);
    };
  }, [rootMargin, threshold]);

  return { ref: imgRef, src };
}

export default useLazyImage;
