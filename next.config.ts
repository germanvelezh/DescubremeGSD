import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build-time safety: surface TypeScript errors instead of silently shipping
  // broken code. (Next 16 dropped the `eslint` block in favor of running
  // lint as a separate `next lint` step.)
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
