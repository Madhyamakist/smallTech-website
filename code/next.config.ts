import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === 'production';
const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? '/frontend-boilerplate-js' : '',
  assetPrefix: isProd ? '/frontend-boilerplate-js' : '',
  images: { unoptimized: true },
};

export default nextConfig;
