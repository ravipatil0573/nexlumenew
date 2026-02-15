// src/utils/cloudinaryOptimizer.js
/**
 * Cloudinary URL Optimizer
 * Automatically optimizes Cloudinary image URLs for performance
 *
 * Usage:
 * const optimizedUrl = optimizeCloudinaryUrl(imageUrl);
 * const responsiveUrl = getCloudinaryResponsiveUrl(imageUrl, 400);
 */

/**
 * Optimize a Cloudinary URL with auto-compression and quality settings
 * @param {string} url - Original Cloudinary URL
 * @param {number} quality - Quality level (1-100, default 80)
 * @param {string} format - 'auto' converts to best format for browser
 * @returns {string} Optimized URL
 */
export function optimizeCloudinaryUrl(url, quality = 80, format = "auto") {
  if (!url || !url.includes("cloudinary")) {
    return url;
  }

  // Insert optimization parameters after /upload/
  const optimizedUrl = url.replace(
    "/upload/",
    `/upload/f_${format},q_${quality}/`,
  );

  return optimizedUrl;
}

/**
 * Generate responsive Cloudinary URL for different screen sizes
 * @param {string} url - Original Cloudinary URL
 * @param {number} width - Image width in pixels
 * @param {number} quality - Quality level (1-100, default 80)
 * @returns {string} Responsive URL
 */
export function getCloudinaryResponsiveUrl(url, width = "auto", quality = 80) {
  if (!url || !url.includes("cloudinary")) {
    return url;
  }

  const widthParam = width === "auto" ? "w_auto" : `w_${width}`;

  const optimizedUrl = url.replace(
    "/upload/",
    `/upload/f_auto,q_${quality},${widthParam}/`,
  );

  return optimizedUrl;
}

/**
 * Generate srcSet for responsive images
 * @param {string} url - Original Cloudinary URL
 * @param {array} widths - Array of widths [400, 800, 1200]
 * @param {number} quality - Quality level
 * @returns {string} srcSet string for img element
 */
export function generateCloudinarySrcSet(
  url,
  widths = [400, 800, 1200],
  quality = 80,
) {
  if (!url || !url.includes("cloudinary")) {
    return url;
  }

  return widths
    .map((width) => {
      const responsiveUrl = getCloudinaryResponsiveUrl(url, width, quality);
      return `${responsiveUrl} ${width}w`;
    })
    .join(", ");
}

/**
 * Get Cloudinary transformation string
 * Useful for advanced customization
 */
export function getCloudinaryTransform(options = {}) {
  const {
    quality = 80,
    format = "auto",
    width = null,
    height = null,
    crop = "fill",
    gravity = "auto",
    aspectRatio = null,
  } = options;

  let transform = `f_${format},q_${quality}`;

  if (width) transform += `,w_${width}`;
  if (height) transform += `,h_${height}`;
  if (width && height) transform += `,c_${crop}`;
  if (gravity) transform += `,g_${gravity}`;
  if (aspectRatio) transform += `,ar_${aspectRatio}`;

  return transform;
}

/**
 * Apply transformation to Cloudinary URL
 */
export function applyCloudinaryTransform(url, transform) {
  if (!url || !url.includes("cloudinary")) {
    return url;
  }

  return url.replace("/upload/", `/upload/${transform}/`);
}

export default {
  optimizeCloudinaryUrl,
  getCloudinaryResponsiveUrl,
  generateCloudinarySrcSet,
  getCloudinaryTransform,
  applyCloudinaryTransform,
};
