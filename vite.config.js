import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteCompression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 10240, // Only compress files > 10KB
      deleteOriginFile: false,
    }),
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 10240,
      deleteOriginFile: false,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          "three-vendor": ["three", "@react-three/fiber", "@react-three/drei"],
          spline: ["@splinetool/react-spline", "@splinetool/runtime"],
          animations: ["gsap", "framer-motion"],
          "ui-vendor": ["react-router-dom", "react-dom"],
          bootstrap: ["bootstrap"], // Separate Bootstrap chunk
        },
      },
    },
    // Optimize chunks with strict CSS size limits
    chunkSizeWarningLimit: 500,
    // CSS minification and optimization
    cssCodeSplit: true,
    cssMinify: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Optimize asset handling
    assetsInlineLimit: 4096,
  },
  server: {
    host: "0.0.0.0", // Allow access from network
    port: 5173, // Default Vite port
    strictPort: false, // Allow other ports if 5173 is taken
    allowedHosts: [
      "nexlume-xyxr.onrender.com",
      "localhost",
      ".onrender.com", // Allow all Render.com subdomains
    ],
  },
});
