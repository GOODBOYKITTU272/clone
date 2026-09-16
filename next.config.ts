import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingIncludes: {
    '/*': ['./public/**/*'],
  },
};

export default nextConfig;
