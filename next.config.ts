import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Shorten build output paths to avoid Windows MAX_PATH issues in deep folders.
  distDir: ".n",
  turbopack: {
    // Force the app root to this repo to avoid wrong lockfile auto-detection.
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
