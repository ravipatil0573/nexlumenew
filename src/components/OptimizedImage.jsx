// src/components/OptimizedImage.jsx
import React from "react";

/**
 * OptimizedImage Component
 * Serves multiple image formats (AVIF, WebP, JPG)
 * with lazy loading and responsive sizing
 *
 * Usage:
 * <OptimizedImage
 *   src="image.jpg"
 *   alt="Description"
 *   width={300}
 *   height={300}
 * />
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  generateSources = true,
  ...props
}) {
  // Avoid extra alternate-format requests for external URLs
  const isExternal = /^https?:\/\//i.test(src);

  // Extract base name without extension
  const baseName = src.replace(/\.[^.]+$/, "");
  const shouldGenerateSources = generateSources && !priority && !isExternal;

  return (
    <picture>
      {/* AVIF - Best compression (modern browsers) */}
      {shouldGenerateSources && (
        <source srcSet={`${baseName}.avif`} type="image/avif" />
      )}

      {/* WebP - Good compression (widely supported) */}
      {shouldGenerateSources && (
        <source srcSet={`${baseName}.webp`} type="image/webp" />
      )}

      {/* JPG/PNG Fallback */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...props}
      />
    </picture>
  );
}

export default OptimizedImage;
