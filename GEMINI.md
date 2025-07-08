# 🚀 Gemini CLI Prompt to Optimize Next.js + Drizzle + TailwindCSS + Shadcn + MagicUI App

This prompt will help Gemini CLI audit and optimize your Next.js app for performance, clean codebase, and improve loading speed. It’s based on best practices from:

- [10 Expert Tips for Speeding up Your Next.js Website (Amal H)](https://youtu.be/kdqL0zbA3xQ)
- [How to Make Your Website Fast (Dom, ThePrimeTime)](https://youtu.be/Ur1N4M2igfQ)

---

## ✅ Gemini CLI Optimization Prompt

```bash
gemini optimize \
  --project-root ./ \
  --framework nextjs \
  --orm drizzle \
  --auth better-auth \
  --ui-mix magicui,shadcn \
  --css tailwindcss \
  --tasks \
    enable-image-optimization \
    lazy-load-components \
    dynamic-imports \
    prefetch-links \
    optimize-package-imports \
    defer-scripts \
    run-bundle-analyzer \
    remove-unused-dependencies \
    remove-unused-files \
    enable-react-profiler \
    enable-swc-minifier \
    optimize-font-loading \
    enable-cache-busting \
  --flags \
    image-component=true \
    image-formats=webp,avif \
    dynamic-import-mode=ssr-false \
    script-load-strategy=afterInteractive \
    analyze-bundle=true \
    depcheck=true \
    experimental-lazyCompilation=true \
    minify-html=true \
    optimize-css=true
📦 Explanation of Each Option
🧠 Performance Enhancements
Task / Flag	What It Does
enable-image-optimization	Uses next/image with WebP/AVIF for better LCP
lazy-load-components	Uses next/dynamic to lazy load MagicUI, Shadcn, or any heavy UI component
dynamic-imports	Code splitting at component level
prefetch-links	Prefetches linked pages for snappy routing
defer-scripts	Defer non-critical JS (next/script) for FID boost
optimize-package-imports	Tree shakes unused code from libraries
enable-react-profiler	Helps find rendering bottlenecks
enable-swc-minifier	Uses faster JS minifier (SWC)
optimize-font-loading	Uses font-display: swap and avoids layout shifts
enable-cache-busting	Uses versioned filenames for static assets

🧼 Codebase Cleanup
Task / Flag	Purpose
remove-unused-dependencies	Uses depcheck to eliminate unused npm packages
remove-unused-files	Scans the filesystem for unreferenced files (JS, TS, CSS, test files)
minify-html	Removes whitespace and comments from HTML
optimize-css	Removes unused Tailwind classes

🔍 Add This to next.config.js
js
Copy
Edit
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  optimizePackageImports: true,
  experimental: {
    lazyCompilation: true,
  },
  compiler: {
    removeConsole: true,
    styledComponents: true,
  },
  webpack(config) {
    return config;
  },
});
🧪 After Optimization
Run Gemini CLI with above prompt

bash
Copy
Edit
ANALYZE=true gemini optimize ...
pnpm build && pnpm start
Analyze .next/analyze.html output (bundle size insights)

Clean up:

Dynamically import MagicUI/Shadcn heavy components

Remove test files, mock data, and unused routes

Refactor Drizzle queries to use server utilities only where needed

Apply loading="lazy" to all <img> and video tags

Measure with Lighthouse or Web Vitals

🎥 Video-Based Key Takeaways (Summarized)
From Video 1 (Amal H)
Remove large static assets from landing page

Avoid server components in unnecessary places

Lazy load third-party UI components (like Shadcn, MagicUI)

Defer analytics and chat scripts

Replace console.log in production builds

From Video 2 (ThePrimeTime)
Don't render videos/images above the fold until needed

Use preload and font-display: swap

Always use responsive images (<Image> with proper sizes)

Bundle analyze to discover expensive packages

Clean up old/unused code and folders

✅ You're Ready!
Your codebase will now be:

💨 Faster on load

🔥 Lighter on the bundle

🧼 Cleaner with removed bloat

🔍 Easier to maintain

📈 Higher Core Web Vitals score