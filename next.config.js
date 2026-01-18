/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import("next").NextConfig} */
const config = {
  eslint: {
    // Only run ESLint on these directories during production builds
    dirs: ["src/app", "src/components", "src/lib"],
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Dangerously allow production builds even if there are type errors
    // Set to true only if you want to ignore TypeScript errors during build
    ignoreBuildErrors: false,
  },
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "ebqqc80v6n.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "hmrvazaoddsexmrgydqx.supabase.co",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },

      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "ebqqc80v6n.ufs.sh",
      },
    ],
  },
  experimental: {},
  compiler: {
    removeConsole: true,
    styledComponents: true,
  },
  webpack(config) {
    return config;
  },
};

export default withBundleAnalyzer(config);
