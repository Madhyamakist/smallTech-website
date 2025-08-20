import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === 'production';
const nextConfig: NextConfig = {
  output: "export",
  assetPrefix: isProd ? '/smallTech-website' : '',
  basePath: isProd ? '/smallTech-website' : '',
  images: { unoptimized: true },
};

export default nextConfig;
